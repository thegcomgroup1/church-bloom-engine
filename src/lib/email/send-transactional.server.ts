/**
 * Internal helper for enqueuing transactional emails from server functions
 * that are themselves trusted (e.g., server-validated public form handlers).
 *
 * Mirrors the public /lovable/email/transactional/send route's logic, but
 * skips the JWT check — only import this from .server.ts files or inside
 * createServerFn handlers. Never expose to client code.
 */
import * as React from 'react'
import { render } from '@react-email/components'

import { supabaseAdmin } from '@/integrations/supabase/client.server'
import { TEMPLATES } from '@/lib/email-templates/registry'

const SITE_NAME = 'one-hope-church'
const SENDER_DOMAIN = 'notify.onehopeaz.com'
const FROM_DOMAIN = 'onehopeaz.com'

function generateToken(): string {
  const bytes = new Uint8Array(32)
  crypto.getRandomValues(bytes)
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export interface InternalSendArgs {
  templateName: string
  recipientEmail?: string
  templateData?: Record<string, any>
  idempotencyKey?: string
  /** Optional reply-to header value (e.g., a guest's email for staff alerts). */
  replyTo?: string
}

export type InternalSendResult =
  | { ok: true; queued: true; messageId: string }
  | { ok: false; reason: string }

/**
 * Enqueue a transactional email. Never throws; returns a result object so
 * the caller can decide whether to surface a failure to the end user.
 */
export async function sendTransactionalEmailInternal(
  args: InternalSendArgs,
): Promise<InternalSendResult> {
  try {
    const template = TEMPLATES[args.templateName]
    if (!template) {
      console.error('[email/internal] unknown template', { templateName: args.templateName })
      return { ok: false, reason: 'unknown_template' }
    }

    const effectiveRecipient = template.to || args.recipientEmail
    if (!effectiveRecipient) {
      return { ok: false, reason: 'no_recipient' }
    }

    const messageId = crypto.randomUUID()
    const idempotencyKey = args.idempotencyKey || messageId
    const normalizedEmail = effectiveRecipient.toLowerCase()

    // Suppression check
    const { data: suppressed, error: suppressionError } = await supabaseAdmin
      .from('suppressed_emails')
      .select('id')
      .eq('email', normalizedEmail)
      .maybeSingle()

    if (suppressionError) {
      console.error('[email/internal] suppression check failed', suppressionError)
      return { ok: false, reason: 'suppression_check_failed' }
    }
    if (suppressed) {
      await supabaseAdmin.from('email_send_log').insert({
        message_id: messageId,
        template_name: args.templateName,
        recipient_email: effectiveRecipient,
        status: 'suppressed',
      })
      return { ok: false, reason: 'email_suppressed' }
    }

    // Get or create unsubscribe token
    let unsubscribeToken: string
    const { data: existingToken } = await supabaseAdmin
      .from('email_unsubscribe_tokens')
      .select('token, used_at')
      .eq('email', normalizedEmail)
      .maybeSingle()

    if (existingToken && !existingToken.used_at) {
      unsubscribeToken = existingToken.token
    } else if (!existingToken) {
      const newToken = generateToken()
      await supabaseAdmin
        .from('email_unsubscribe_tokens')
        .upsert(
          { token: newToken, email: normalizedEmail },
          { onConflict: 'email', ignoreDuplicates: true },
        )
      const { data: stored } = await supabaseAdmin
        .from('email_unsubscribe_tokens')
        .select('token')
        .eq('email', normalizedEmail)
        .maybeSingle()
      if (!stored) return { ok: false, reason: 'token_storage_failed' }
      unsubscribeToken = stored.token
    } else {
      return { ok: false, reason: 'email_unsubscribed' }
    }

    // Render
    const templateData = args.templateData || {}
    const element = React.createElement(template.component, templateData)
    const html = await render(element)
    const plainText = await render(element, { plainText: true })

    const resolvedSubject =
      typeof template.subject === 'function'
        ? template.subject(templateData)
        : template.subject

    // Log pending then enqueue
    await supabaseAdmin.from('email_send_log').insert({
      message_id: messageId,
      template_name: args.templateName,
      recipient_email: effectiveRecipient,
      status: 'pending',
    })

    const payload: Record<string, any> = {
      message_id: messageId,
      to: effectiveRecipient,
      from: `${SITE_NAME} <noreply@${FROM_DOMAIN}>`,
      sender_domain: SENDER_DOMAIN,
      subject: resolvedSubject,
      html,
      text: plainText,
      purpose: 'transactional',
      label: args.templateName,
      idempotency_key: idempotencyKey,
      unsubscribe_token: unsubscribeToken,
      queued_at: new Date().toISOString(),
    }
    if (args.replyTo) payload.reply_to = args.replyTo

    const { error: enqueueError } = await supabaseAdmin.rpc('enqueue_email', {
      queue_name: 'transactional_emails',
      payload,
    })

    if (enqueueError) {
      console.error('[email/internal] enqueue failed', enqueueError)
      await supabaseAdmin.from('email_send_log').insert({
        message_id: messageId,
        template_name: args.templateName,
        recipient_email: effectiveRecipient,
        status: 'failed',
        error_message: 'Failed to enqueue email',
      })
      return { ok: false, reason: 'enqueue_failed' }
    }

    return { ok: true, queued: true, messageId }
  } catch (err) {
    console.error('[email/internal] unexpected error', err)
    return { ok: false, reason: 'unexpected_error' }
  }
}
