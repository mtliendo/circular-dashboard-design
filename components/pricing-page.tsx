"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, ArrowRight, X, Minus } from "lucide-react"
import Link from "next/link"

export function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const plans = [
    {
      name: "Free",
      price: { monthly: 0, annual: 0 },
      description: "Perfect for individuals getting started",
      features: [
        { name: "1 team member", included: true },
        { name: "Unlimited projects", included: true },
        { name: "Basic analytics", included: true },
        { name: "Community support", included: true },
        { name: "Advanced workflows", included: false },
        { name: "Priority support", included: false },
        { name: "SSO integration", included: false },
        { name: "Custom fields", included: false },
      ],
    },
    {
      name: "Pro",
      price: { monthly: 10, annual: 8 },
      description: "Advanced features for growing teams",
      popular: true,
      features: [
        { name: "Up to 10 team members", included: true },
        { name: "Unlimited projects", included: true },
        { name: "Advanced analytics", included: true },
        { name: "Priority support", included: true },
        { name: "Advanced workflows", included: true },
        { name: "Custom fields", included: true },
        { name: "Time tracking", included: true },
        { name: "SSO integration", included: false },
      ],
    },
    {
      name: "Enterprise",
      price: { monthly: 200, annual: 160 },
      description: "Full control for large organizations",
      features: [
        { name: "Unlimited team members", included: true },
        { name: "Everything in Pro", included: true },
        { name: "SSO & advanced security", included: true },
        { name: "Dedicated support", included: true },
        { name: "Custom integrations", included: true },
        { name: "SLA guarantee", included: true },
        { name: "Audit logs", included: true },
        { name: "Advanced permissions", included: true },
      ],
    },
  ]

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

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span className={`text-sm ${!isAnnual ? "text-foreground" : "text-muted-foreground"}`}>Monthly</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isAnnual ? "bg-primary" : "bg-muted"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isAnnual ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span className={`text-sm ${isAnnual ? "text-foreground" : "text-muted-foreground"}`}>Annual</span>
            {isAnnual && (
              <Badge variant="secondary" className="ml-2">
                Save 20%
              </Badge>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-2xl border ${
                plan.popular ? "border-primary bg-card shadow-lg scale-105" : "border-border/50 bg-card/50"
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">Most Popular</Badge>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold mb-2">
                  {typeof plan.price.monthly === "number" ? (
                    <>
                      ${isAnnual ? plan.price.annual : plan.price.monthly}
                      <span className="text-lg text-muted-foreground font-normal">
                        {plan.name === "Free" ? "" : "/month"}
                      </span>
                    </>
                  ) : (
                    plan.price.monthly
                  )}
                </div>
                <p className="text-muted-foreground">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    {feature.included ? (
                      <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                    ) : (
                      <X className="h-5 w-5 text-muted-foreground mr-3 flex-shrink-0" />
                    )}
                    <span className={`text-sm ${feature.included ? "text-foreground" : "text-muted-foreground"}`}>
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>

              <Button className="w-full" variant={plan.popular ? "default" : "outline"} size="lg" asChild>
                <Link href="/dashboard">
                  {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <div className="bg-card/50 rounded-2xl border border-border/50 overflow-hidden">
          <div className="p-8 border-b border-border/50">
            <h2 className="text-2xl font-bold text-center">Compare all features</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left p-6 font-medium">Features</th>
                  <th className="text-center p-6 font-medium">Free</th>
                  <th className="text-center p-6 font-medium">Pro</th>
                  <th className="text-center p-6 font-medium">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Team members", free: "1", pro: "10", enterprise: "Unlimited" },
                  { name: "Projects", free: "Unlimited", pro: "Unlimited", enterprise: "Unlimited" },
                  { name: "Storage", free: "1GB", pro: "100GB", enterprise: "Unlimited" },
                  { name: "API access", free: false, pro: true, enterprise: true },
                  { name: "Advanced analytics", free: false, pro: true, enterprise: true },
                  { name: "Custom workflows", free: false, pro: true, enterprise: true },
                  { name: "Priority support", free: false, pro: true, enterprise: true },
                  { name: "SSO integration", free: false, pro: false, enterprise: true },
                  { name: "Audit logs", free: false, pro: false, enterprise: true },
                  { name: "SLA guarantee", free: false, pro: false, enterprise: true },
                ].map((feature, index) => (
                  <tr key={index} className="border-b border-border/50 last:border-b-0">
                    <td className="p-6 font-medium">{feature.name}</td>
                    <td className="p-6 text-center">
                      {typeof feature.free === "boolean" ? (
                        feature.free ? (
                          <CheckCircle className="h-5 w-5 text-primary mx-auto" />
                        ) : (
                          <Minus className="h-5 w-5 text-muted-foreground mx-auto" />
                        )
                      ) : (
                        feature.free
                      )}
                    </td>
                    <td className="p-6 text-center">
                      {typeof feature.pro === "boolean" ? (
                        feature.pro ? (
                          <CheckCircle className="h-5 w-5 text-primary mx-auto" />
                        ) : (
                          <Minus className="h-5 w-5 text-muted-foreground mx-auto" />
                        )
                      ) : (
                        feature.pro
                      )}
                    </td>
                    <td className="p-6 text-center">
                      {typeof feature.enterprise === "boolean" ? (
                        feature.enterprise ? (
                          <CheckCircle className="h-5 w-5 text-primary mx-auto" />
                        ) : (
                          <Minus className="h-5 w-5 text-muted-foreground mx-auto" />
                        )
                      ) : (
                        feature.enterprise
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
