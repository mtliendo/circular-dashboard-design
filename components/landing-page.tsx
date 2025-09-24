"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
/* switching from Lucide to Heroicons for different icon style */
import {
  ArrowRightIcon,
  CheckCircleIcon,
  BoltIcon,
  UsersIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  StarIcon,
} from "@heroicons/react/24/outline"
import Link from "next/link"

export function LandingPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [showCheckmark, setShowCheckmark] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const timer = setTimeout(() => {
      setShowCheckmark(true)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full border-2 border-primary bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                </div>
                <span className="text-xl font-bold">Circular</span>
              </div>
              <div className="hidden md:flex space-x-6">
                <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                  Features
                </Link>
                <Link href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                  Pricing
                </Link>
                <Link href="#customers" className="text-muted-foreground hover:text-foreground transition-colors">
                  Customers
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                Log in
              </Link>
              <Button asChild>
                <Link href="/dashboard">Try for free</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden hero-grid-bg">
        <div className="absolute inset-0 hero-grid-bg animate-grid-pulse"></div>

        {/* Animated geometric shapes */}
        <div className="absolute top-20 left-20 animate-geometric-float">
          <div className="w-12 h-12 border-2 border-primary/30 rotate-45 bg-primary/5"></div>
        </div>
        <div className="absolute top-32 right-32 animate-geometric-float" style={{ animationDelay: "2s" }}>
          <div className="w-8 h-8 rounded-full bg-accent/20 border border-accent/40"></div>
        </div>
        <div className="absolute bottom-40 left-40 animate-geometric-float" style={{ animationDelay: "4s" }}>
          <div className="w-6 h-6 bg-primary/10 transform rotate-12"></div>
        </div>

        {/* Orbital animation */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="animate-orbital">
            <div className="w-2 h-2 bg-primary/40 rounded-full"></div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 relative z-10">
          <div className="text-center">
            <div
              className={`transition-all duration-1000 ${isVisible ? "animate-fade-in-up opacity-100" : "opacity-0"}`}
            >
              <Badge variant="secondary" className="mb-6 px-4 py-2">
                <span className="text-primary font-medium">New:</span>
                <span className="ml-2">Advanced Project Analytics</span>
                <span className="ml-2 text-primary">Learn more</span>
              </Badge>
            </div>

            <div
              className={`transition-all duration-1000 delay-200 ${isVisible ? "animate-fade-in-up opacity-100" : "opacity-0"}`}
            >
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-balance mb-8">
                Complete every project,
                <br />
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  every time
                </span>
              </h1>
            </div>

            <div
              className={`transition-all duration-1000 delay-300 ${isVisible ? "animate-fade-in-up opacity-100" : "opacity-0"}`}
            >
              <div className="flex justify-center mb-8">
                <div className="relative w-24 h-24">
                  {/* Background circle - very subtle */}
                  <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      stroke="hsl(var(--border))"
                      strokeWidth="2"
                      fill="none"
                      opacity="0.1"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      stroke="url(#completionGradient)"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray="283"
                      strokeDashoffset={isVisible ? "0" : "283"}
                      className="transition-all duration-3000 ease-out"
                    />
                    <defs>
                      <linearGradient id="completionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="hsl(var(--primary))" />
                        <stop offset="100%" stopColor="hsl(var(--accent))" />
                      </linearGradient>
                    </defs>
                  </svg>

                  <div
                    className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
                      showCheckmark ? "opacity-100 scale-100" : "opacity-0 scale-50"
                    }`}
                  >
                    <CheckCircleIcon className="w-10 h-10 text-primary" />
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`transition-all duration-1000 delay-400 ${isVisible ? "animate-fade-in-up opacity-100" : "opacity-0"}`}
            >
              <p className="text-xl text-muted-foreground text-balance mb-10 max-w-3xl mx-auto">
                Build momentum with the project management tool that adapts to your team's workflow. Track issues, plan
                sprints, and ship features faster than ever.
              </p>
            </div>

            <div
              className={`transition-all duration-1000 delay-600 ${isVisible ? "animate-fade-in-up opacity-100" : "opacity-0"}`}
            >
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button size="lg" className="px-8 py-4 text-lg" asChild>
                  <Link href="/dashboard">
                    Try Circular for free
                    <ArrowRightIcon className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="px-8 py-4 text-lg bg-transparent" asChild>
                  <Link href="#demo">Watch demo</Link>
                </Button>
              </div>
            </div>

            <div
              className={`transition-all duration-1000 delay-800 ${isVisible ? "animate-fade-in-up opacity-100" : "opacity-0"}`}
            >
              <p className="text-sm text-muted-foreground mt-8">
                Over 50,000 teams use Circular to build better products faster.
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced floating elements */}
        <div className="absolute top-20 left-10 animate-float">
          <div className="w-16 h-16 bg-primary/10 rounded-full blur-xl"></div>
        </div>
        <div className="absolute top-40 right-20 animate-float" style={{ animationDelay: "2s" }}>
          <div className="w-24 h-24 bg-accent/10 rounded-full blur-xl"></div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-muted-foreground">Trusted by teams at</p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {["Vercel", "Linear", "Stripe", "GitHub", "Figma", "Notion"].map((company) => (
              <div key={company} className="text-2xl font-semibold text-muted-foreground">
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 grid-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { value: "10x", label: "faster", sublabel: "issue resolution" },
              { value: "99%", label: "uptime", sublabel: "guaranteed SLA" },
              { value: "500%", label: "increase", sublabel: "in team velocity" },
              { value: "2min", label: "setup", sublabel: "time to value" },
            ].map((stat, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-card/50 border border-border/50">
                <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-lg font-medium text-foreground">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.sublabel}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="relative -mt-1">
        <svg className="w-full h-20 text-primary/20" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <defs>
            <linearGradient id="seamlessWave" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--background))" stopOpacity="1" />
              <stop offset="30%" stopColor="#0ea5e9" stopOpacity="0.15" />
              <stop offset="70%" stopColor="#06b6d4" stopOpacity="0.2" />
              <stop offset="100%" stopColor="hsl(var(--background))" stopOpacity="1" />
            </linearGradient>
          </defs>
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V120H0Z"
            fill="url(#seamlessWave)"
            className="animate-wave-flow"
          />
        </svg>
      </div>

      {/* Features Section */}
      <section id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Everything you need to ship faster</h2>
            <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto">
              Powerful features that scale with your team, from startup to enterprise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: BoltIcon,
                title: "Lightning Fast",
                description: "Built for speed with instant search, real-time updates, and keyboard shortcuts.",
              },
              {
                icon: UsersIcon,
                title: "Team Collaboration",
                description: "Comments, mentions, and notifications keep everyone in sync across projects.",
              },
              {
                icon: ChartBarIcon,
                title: "Advanced Analytics",
                description: "Track velocity, burndown charts, and team performance with detailed insights.",
              },
              {
                icon: ShieldCheckIcon,
                title: "Enterprise Security",
                description: "SOC 2 compliant with SSO, audit logs, and advanced permission controls.",
              },
              {
                icon: CheckCircleIcon,
                title: "Smart Automation",
                description: "Automate workflows with triggers, rules, and integrations to reduce manual work.",
              },
              {
                icon: StarIcon,
                title: "Loved by Teams",
                description: "Consistently rated #1 for user experience and customer satisfaction.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-card/50 border border-border/50 hover:bg-card/80 transition-colors"
              >
                <feature.icon className="h-12 w-12 text-primary mb-4 stroke-1" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section id="pricing" className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Simple, transparent pricing</h2>
            <p className="text-xl text-muted-foreground">Start free, scale as you grow</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Free",
                price: "$0",
                description: "Perfect for small teams getting started",
                features: ["Up to 5 team members", "Unlimited projects", "Basic analytics", "Community support"],
              },
              {
                name: "Pro",
                price: "$12",
                description: "Advanced features for growing teams",
                features: ["Unlimited team members", "Advanced analytics", "Priority support", "Custom workflows"],
                popular: true,
              },
              {
                name: "Enterprise",
                price: "Custom",
                description: "Full control for large organizations",
                features: ["SSO & advanced security", "Dedicated support", "Custom integrations", "SLA guarantee"],
              },
            ].map((plan, index) => (
              <div
                key={index}
                className={`p-8 rounded-xl border ${plan.popular ? "border-primary bg-card" : "border-border/50 bg-card/50"} relative`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">Most Popular</Badge>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                  <div className="text-3xl font-bold mb-2">
                    {plan.price}
                    {plan.price !== "Custom" && <span className="text-lg text-muted-foreground">/month</span>}
                  </div>
                  <p className="text-muted-foreground">{plan.description}</p>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <CheckCircleIcon className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full" variant={plan.popular ? "default" : "outline"} asChild>
                  <Link href="/pricing">{plan.price === "Custom" ? "Contact Sales" : "Get Started"}</Link>
                </Button>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link href="/pricing">
                View detailed pricing
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <div className="relative -mt-1">
        <svg className="w-full h-16 text-background" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <defs>
            <linearGradient id="seamlessFlow" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--muted))" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#14b8a6" stopOpacity="0.1" />
              <stop offset="100%" stopColor="hsl(var(--background))" stopOpacity="1" />
            </linearGradient>
          </defs>
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            fill="url(#seamlessFlow)"
            className="animate-curve-flow"
          />
        </svg>
      </div>

      {/* CTA Section */}
      <section className="py-24 grid-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to build at the speed of thought?</h2>
          <p className="text-xl text-muted-foreground mb-10">
            Join thousands of teams already shipping faster with Circular.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8 py-4 text-lg" asChild>
              <Link href="/dashboard">
                Start building for free
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-4 text-lg bg-transparent">
              Talk to sales
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 rounded-full border-2 border-primary bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
              </div>
              <span className="text-xl font-bold">Circular</span>
            </div>
            <div className="flex space-x-6 text-sm text-muted-foreground">
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">
                Terms
              </Link>
              <Link href="/security" className="hover:text-foreground transition-colors">
                Security
              </Link>
              <Link href="/contact" className="hover:text-foreground transition-colors">
                Contact
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
            © 2025 Circular. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
