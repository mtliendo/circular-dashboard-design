// app/api/webhook/stripe/route.ts
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { clerkClient, createClerkClient } from '@clerk/nextjs/server'

// Ensure Node runtime (not Edge)
export const runtime = 'nodejs'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2025-08-27.basil' })
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

// Map Stripe price IDs -> your internal plans
const PLAN_BY_PRICE: Record<string, 'free' | 'pro'> = {
  'price_123_PRO_MONTHLY': 'pro',
  'price_456_PRO_YEARLY': 'pro',
}

export async function POST(req: Request) {
  // ask Kyle when to use clerkClient and when to use createClerkClient
  // specifically why the clerkClient doens't take in options like createClerkClient does
  // https://clerk.com/docs/references/backend/overview#create-clerk-client-options
  const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY! })

  const sig = req.headers.get('stripe-signature')
  if (!sig) return new NextResponse('Missing stripe-signature', { status: 400 })

  let event: Stripe.Event
  try {
    const text = await req.text() // raw body
    event = stripe.webhooks.constructEvent(text, sig, endpointSecret)
  } catch (err: any) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    // Option A: read plan/org from metadata if you set it when creating the session
    const orgIdFromMeta = (session.metadata?.orgId as string) || null
    let plan: 'free' | 'pro' | null = (session.metadata?.plan as any) || null

    // Option B (robust): fetch the line items to get the purchased price ID
    if (!plan) {
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 5 })
      const first = lineItems.data[0]
      const priceId = (first?.price as Stripe.Price | null)?.id
      plan = priceId ? PLAN_BY_PRICE[priceId] ?? null : null
    }

    if (!plan) {
      console.warn('No plan resolved for session', session.id)
      return NextResponse.json({ received: true })
    }

    // Figure out which organization to update.
    // Prefer passing orgId in session.metadata when you created the session.
    const orgId = orgIdFromMeta ?? /* fallback: look up from customer or your DB */ null
    if (!orgId) {
      console.warn('No orgId available for session', session.id)
      return NextResponse.json({ received: true })
    }

    // Update Clerk org based on plan
    if (plan === 'pro') {
      // Raise member cap to 10 and tag metadata

      await clerk.organizations.updateOrganization(orgId, {
        maxAllowedMemberships: 10,
        privateMetadata: { plan: 'pro' },
      })
    } else if (plan === 'free') {
      await clerk.organizations.updateOrganization(orgId, {
        maxAllowedMemberships: 2,
        privateMetadata: { plan: 'free' },
      })
    }

    // (Optional) also store plan on the *membership* or user, if your app checks that too
    // await clerkClient.organizations.updateOrganizationMetadata(orgId, { entitlements: { members: plan === 'pro' ? 10 : 2 } })

    return NextResponse.json({ received: true })
  }

  return NextResponse.json({ received: true })
}
