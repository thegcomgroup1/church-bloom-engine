import React from 'react'
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Text,
} from '@react-email/components'
import type { TemplateEntry } from './registry'

interface Props {
  name?: string
  email?: string
  phone?: string | null
  partySize?: number | null
  plannedDate?: string | null
  howHeard?: string | null
  note?: string | null
  submittedAt?: string
}

const fmtRow = (label: string, value: string | number | null | undefined) => (
  <Text style={row}>
    <span style={rowLabel}>{label}</span>
    <span style={rowValue}>{value !== undefined && value !== null && value !== '' ? String(value) : '—'}</span>
  </Text>
)

const Email = ({
  name,
  email,
  phone,
  partySize,
  plannedDate,
  howHeard,
  note,
  submittedAt,
}: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New visit request from {name || 'a guest'}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>New visit request</Heading>
        <Text style={subtle}>
          Someone just filled out the Plan a Visit form on onehopeaz.com.
        </Text>

        {fmtRow('Name', name)}
        {fmtRow(
          'Email',
          email ? (
            (<Link href={`mailto:${email}`} style={link as React.CSSProperties}>{email}</Link>) as any
          ) : null,
        )}
        {fmtRow(
          'Phone',
          phone ? (
            (<Link href={`tel:${phone}`} style={link as React.CSSProperties}>{phone}</Link>) as any
          ) : null,
        )}
        {fmtRow('Party size', partySize)}
        {fmtRow('Planned Sunday', plannedDate)}
        {fmtRow('How they heard', howHeard)}

        <Hr style={divider} />

        <Text style={rowLabel}>Note</Text>
        <Text style={noteBlock}>{note && note.trim().length > 0 ? note : '—'}</Text>

        <Hr style={divider} />

        <Text style={meta}>
          Submitted {submittedAt || new Date().toISOString()}
        </Text>
        <Text style={meta}>
          Reply directly to this email to message the guest.
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: (data: Record<string, any>) =>
    `New visit request — ${data?.name || 'guest'}`,
  displayName: 'Visit request (staff alert)',
  previewData: {
    name: 'Sarah Martinez',
    email: 'sarah@example.com',
    phone: '(520) 555-0142',
    partySize: 3,
    plannedDate: 'This Sunday',
    howHeard: 'Friend invited me',
    note: 'Looking forward to it — bringing my two kids.',
    submittedAt: new Date().toISOString(),
  },
} satisfies TemplateEntry

const main: React.CSSProperties = {
  backgroundColor: '#ffffff',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  color: '#1c1917',
}

const container: React.CSSProperties = {
  maxWidth: '560px',
  margin: '0 auto',
  padding: '32px 24px 48px',
}

const h1: React.CSSProperties = {
  fontSize: '20px',
  fontWeight: 600,
  color: '#1c1917',
  margin: '0 0 6px',
}

const subtle: React.CSSProperties = {
  fontSize: '14px',
  color: '#78716c',
  margin: '0 0 20px',
}

const row: React.CSSProperties = {
  fontSize: '14px',
  lineHeight: '1.5',
  margin: '0 0 8px',
  color: '#1c1917',
}

const rowLabel: React.CSSProperties = {
  display: 'inline-block',
  width: '130px',
  color: '#78716c',
  fontWeight: 500,
}

const rowValue: React.CSSProperties = {
  color: '#1c1917',
  fontWeight: 500,
}

const divider: React.CSSProperties = {
  borderColor: '#ece7df',
  margin: '20px 0',
}

const noteBlock: React.CSSProperties = {
  fontSize: '14px',
  lineHeight: '1.6',
  color: '#1c1917',
  whiteSpace: 'pre-wrap',
  backgroundColor: '#faf8f4',
  border: '1px solid #ece7df',
  borderRadius: '8px',
  padding: '12px 14px',
  margin: '4px 0 0',
}

const meta: React.CSSProperties = {
  fontSize: '12px',
  color: '#a8a29e',
  margin: '0 0 4px',
}

const link: React.CSSProperties = {
  color: '#1c1917',
  textDecoration: 'underline',
}
