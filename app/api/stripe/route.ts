
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { clerkClient, createClerkClient } from '@clerk/nextjs/server'

// stripe listen --forward-to localhost:3000/api/stripe
// stripe trigger checkout.session.completed

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2025-08-27.basil' })
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

// Map Stripe price IDs -> your internal plans
const PLAN_BY_PRICE: Record<string, 'pro' | 'enterprise'> = {
  'price_1SB0sLEq3PQJrkWnYi6NMnCe': 'enterprise',
  'price_1SB0s8Eq3PQJrkWnTrxhGeBM': 'pro',
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

    // fetch the line items to get the purchased price ID
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id)
    const first = lineItems.data[0]
    const priceId = (first?.price as Stripe.Price | null)?.id
    const plan = priceId ? PLAN_BY_PRICE[priceId] ?? null : null

    if (!plan) {
      console.warn('No plan resolved for session', session.id)
      return NextResponse.json({ received: true })
    }

    // Figure out which organization to update by looking at the client reference id from  pricing table
    const orgId = session.client_reference_id!

    // Update Clerk org based on plan
    if (plan === 'pro') {
      // Raise member cap to 10 and tag metadata
      await clerk.organizations.updateOrganization(orgId, {
        maxAllowedMemberships: 10,
        privateMetadata: { plan: 'pro' },
      })
    }
    if (plan === 'enterprise') {
      await clerk.organizations.updateOrganization(orgId, {
        maxAllowedMemberships: 100, // TODO: set to infinity
        privateMetadata: { plan: 'enterprise' },
      })
    }


    return NextResponse.json({ received: true })
  }

  return NextResponse.json({ received: true })
}

/* todo:
- get ord id and pass to pricing table on frontend
- test webhook works using commands at top of file
-create the right roles sets
- gate content based on permissiosn
- figure out how to make member limit infinity
- 
*/