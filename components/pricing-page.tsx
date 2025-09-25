"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Script from "next/script"

// Declare the custom Stripe pricing table element
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'stripe-pricing-table': {
        'pricing-table-id': string
        'publishable-key': string
        'client-reference-id'?: string
      }
    }
  }
}

export function PricingPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/50 backdrop-blur-sm bg-background/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">C</span>
              </div>
              <span className="text-xl font-bold">Circular</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                ← Back to home
              </Link>
              <Button asChild>
                <Link href="/dashboard">Try for free</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Choose the perfect plan for your team</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Start free and scale as you grow. All plans include unlimited projects and 24/7 support.
          </p>
        </div>

        {/* Stripe Pricing Table -- needs to pass clerk org id to the pricing table */}
        <div className="mb-16">
          <Script src="https://js.stripe.com/v3/pricing-table.js" />
          <stripe-pricing-table
            pricing-table-id="prctbl_1SB0ydEq3PQJrkWnG2SnFUb2"
            publishable-key="pk_test_51SAxb9Eq3PQJrkWnffKNilKA8DTrZa4t4VRPKO88UzCZbgt83wawAEJN655a0F19dFQGhx3UXlsDE77ScHk7YCN700s9rtj8mj"
            client-reference-id={clerkOrgId}>
          </stripe-pricing-table>
        </div>

        {/* FAQ Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently asked questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                question: "Can I change plans anytime?",
                answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.",
              },
              {
                question: "Is there a free trial?",
                answer: "Our Free plan is available forever with no time limit. You can upgrade to Pro anytime.",
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards, PayPal, and can arrange invoicing for Enterprise customers.",
              },
              {
                question: "Do you offer refunds?",
                answer: "Yes, we offer a 30-day money-back guarantee for all paid plans, no questions asked.",
              },
            ].map((faq, index) => (
              <div key={index} className="p-6 rounded-xl bg-card/50 border border-border/50">
                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className="text-muted-foreground text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-24 p-12 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-muted-foreground mb-8">Join thousands of teams already building faster with Circular.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/dashboard">
                Start free trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg">
              Contact sales
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
