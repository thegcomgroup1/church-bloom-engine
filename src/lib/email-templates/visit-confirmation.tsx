import React from 'react'
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import type { TemplateEntry } from './registry'

interface Props {
  name?: string
}

const Email = ({ name }: Props) => {
  const greeting = name && name.trim().length > 0 ? `Hi ${name},` : 'Hi there,'
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>We can't wait to meet you Sunday at One Hope.</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>We can't wait to meet you.</Heading>
          <Text style={lead}>{greeting}</Text>
          <Text style={paragraph}>
            Thanks for letting us know you're coming. We'll be watching for
            you on Sunday — and we'll have someone ready to greet you by
            name and help you get settled.
          </Text>

          <Section style={card}>
            <Text style={cardLabel}>Service time</Text>
            <Text style={cardValue}>Sundays · 10:30 AM</Text>

            <Hr style={cardDivider} />

            <Text style={cardLabel}>Where to find us</Text>
            <Text style={cardValue}>
              Lawrence Primary School
              <br />
              4850 W Jeffrey Rd
              <br />
              Tucson, AZ 85746
            </Text>

            <Section style={{ marginTop: '14px' }}>
              <Button
                href="https://www.google.com/maps?q=4850+W+Jeffrey+Rd,+Tucson,+AZ+85746"
                style={button}
              >
                Get directions
              </Button>
            </Section>
          </Section>

          <Heading as="h2" style={h2}>
            A few things that might help
          </Heading>
          <Text style={paragraph}>
            <strong>Parking:</strong> Pull into the main school lot — there's
            plenty of room, and someone will be out front to point you in.
          </Text>
          <Text style={paragraph}>
            <strong>What to wear:</strong> Come exactly as you are. Jeans,
            t-shirt, whatever feels like you.
          </Text>
          <Text style={paragraph}>
            <strong>Kids are welcome:</strong> Bring the whole family. There's
            a place for everyone at this table.
          </Text>
          <Text style={paragraph}>
            <strong>How long:</strong> Service is about an hour. No spotlight,
            no pressure — just real teaching from the Bible and a family glad
            you're here.
          </Text>

          <Hr style={divider} />

          <Text style={paragraph}>
            If anything comes up before Sunday, just reply to this email or
            give us a call at{' '}
            <Link href="tel:+15209408464" style={link}>
              (520) 940-8464
            </Link>
            . We'd love to hear from you.
          </Text>

          <Text style={signoff}>
            See you Sunday,
            <br />
            The One Hope family
          </Text>

          <Text style={footer}>
            One Hope Church · Tucson, AZ
            <br />
            <Link href="https://onehopeaz.com" style={footerLink}>
              onehopeaz.com
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: Email,
  subject: "We can't wait to meet you at One Hope",
  displayName: 'Visit confirmation (guest)',
  previewData: { name: 'Sarah' },
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
  fontFamily: "'Fraunces', Georgia, 'Times New Roman', serif",
  fontSize: '28px',
  lineHeight: '1.2',
  fontWeight: 600,
  color: '#1c1917',
  margin: '0 0 18px',
}

const h2: React.CSSProperties = {
  fontFamily: "'Fraunces', Georgia, 'Times New Roman', serif",
  fontSize: '18px',
  lineHeight: '1.3',
  fontWeight: 600,
  color: '#1c1917',
  margin: '28px 0 10px',
}

const lead: React.CSSProperties = {
  fontSize: '16px',
  lineHeight: '1.5',
  color: '#1c1917',
  margin: '0 0 12px',
}

const paragraph: React.CSSProperties = {
  fontSize: '15px',
  lineHeight: '1.6',
  color: '#44403c',
  margin: '0 0 12px',
}

const card: React.CSSProperties = {
  marginTop: '24px',
  padding: '20px 22px',
  backgroundColor: '#faf8f4',
  border: '1px solid #ece7df',
  borderRadius: '12px',
}

const cardLabel: React.CSSProperties = {
  fontSize: '12px',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: '#78716c',
  margin: '0 0 4px',
  fontWeight: 600,
}

const cardValue: React.CSSProperties = {
  fontSize: '16px',
  lineHeight: '1.5',
  color: '#1c1917',
  margin: '0 0 6px',
  fontWeight: 500,
}

const cardDivider: React.CSSProperties = {
  borderColor: '#ece7df',
  margin: '16px 0',
}

const button: React.CSSProperties = {
  backgroundColor: '#1c1917',
  color: '#ffffff',
  fontSize: '14px',
  fontWeight: 600,
  padding: '12px 20px',
  borderRadius: '999px',
  textDecoration: 'none',
  display: 'inline-block',
}

const divider: React.CSSProperties = {
  borderColor: '#ece7df',
  margin: '28px 0 20px',
}

const link: React.CSSProperties = {
  color: '#1c1917',
  textDecoration: 'underline',
}

const signoff: React.CSSProperties = {
  fontSize: '15px',
  lineHeight: '1.6',
  color: '#1c1917',
  margin: '20px 0 0',
}

const footer: React.CSSProperties = {
  fontSize: '12px',
  color: '#a8a29e',
  lineHeight: '1.5',
  margin: '32px 0 0',
  textAlign: 'center',
}

const footerLink: React.CSSProperties = {
  color: '#a8a29e',
  textDecoration: 'underline',
}
