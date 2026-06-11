import type { ComponentType } from 'react'

import { template as visitConfirmationTemplate } from './visit-confirmation'
import { template as visitStaffNotificationTemplate } from './visit-staff-notification'

export interface TemplateEntry {
  component: ComponentType<any>
  subject: string | ((data: Record<string, any>) => string)
  displayName?: string
  previewData?: Record<string, any>
  /** Fixed recipient — overrides caller-provided recipientEmail when set. */
  to?: string
  /** Optional reply-to address; serverside helpers may use this. */
  replyTo?: string | ((data: Record<string, any>) => string | undefined)
}

/**
 * Template registry — maps template names to their React Email components.
 * Import and register new templates here after creating them in this directory.
 */
export const TEMPLATES: Record<string, TemplateEntry> = {
  'visit-confirmation': visitConfirmationTemplate,
  'visit-staff-notification': visitStaffNotificationTemplate,
}
