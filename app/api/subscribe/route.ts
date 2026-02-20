import { NextResponse } from 'next/server'

const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY!
const MAILERLITE_GROUP_ID = process.env.MAILERLITE_GROUP_ID!
const EMAILLISTVERIFY_API_KEY = process.env.EMAILLISTVERIFY_API_KEY!

async function verifyEmail(email: string): Promise<boolean> {
  try {
    const res = await fetch(
      `https://apps.emaillistverify.com/api/verifyEmail?secret=${EMAILLISTVERIFY_API_KEY}&email=${encodeURIComponent(email)}`,
      { method: 'GET' }
    )
    const result = await res.text()
    // EmailListVerify returns: ok, fail, unknown, etc.
    return result.trim().toLowerCase() === 'ok'
  } catch {
    // If verification service is down, let it through
    return true
  }
}

async function addToMailerLite(email: string, name?: string): Promise<boolean> {
  try {
    const res = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${MAILERLITE_API_KEY}`,
      },
      body: JSON.stringify({
        email,
        fields: {
          name: name || undefined,
        },
        groups: [MAILERLITE_GROUP_ID],
      }),
    })
    
    const data = await res.json()
    return res.ok || data?.data?.id != null
  } catch {
    return false
  }
}

export async function POST(request: Request) {
  try {
    const { email, name } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }

    // Step 1: Verify email is real
    const isValid = await verifyEmail(email)
    if (!isValid) {
      return NextResponse.json({ error: 'Please enter a valid email address' }, { status: 400 })
    }

    // Step 2: Add to MailerLite group (triggers 9-day sequence)
    const added = await addToMailerLite(email, name)
    if (!added) {
      return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
