"use client"

import { SignIn } from '@clerk/nextjs'
import { dark } from "@clerk/themes"
import Link from "next/link"

export default function Page() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 hero-grid-bg animate-grid-pulse"></div>

      {/* Floating geometric shapes */}
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

      {/* Floating blur elements */}
      <div className="absolute top-20 left-10 animate-float">
        <div className="w-16 h-16 bg-primary/10 rounded-full blur-xl"></div>
      </div>
      <div className="absolute top-40 right-20 animate-float" style={{ animationDelay: "2s" }}>
        <div className="w-24 h-24 bg-accent/10 rounded-full blur-xl"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 border-b border-border/50 backdrop-blur-sm bg-background/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full border-2 border-primary bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
              </div>
              <span className="text-xl font-bold">Circular</span>
            </Link>
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Back to home
            </Link>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
            <p className="text-muted-foreground">
              Sign in to your Circular account to continue
            </p>
          </div>

          {/* Sign-in form */}
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 shadow-2xl">
            <SignIn
              appearance={{
                theme: dark,
                elements: {
                  formButtonPrimary: "bg-primary hover:bg-primary/90 text-primary-foreground",
                  card: "bg-transparent shadow-none border-none",
                  headerTitle: "hidden",
                  headerSubtitle: "hidden",
                  socialButtonsBlockButton: "border-border/50 hover:bg-muted/50",
                  formFieldInput: "bg-input border-border/50 focus:border-primary",
                  footerActionLink: "text-primary hover:text-primary/80",
                  identityPreviewText: "text-muted-foreground",
                  formFieldLabel: "text-foreground",
                  dividerLine: "bg-border/50",
                  dividerText: "text-muted-foreground",
                }
              }}
            />
          </div>

          {/* Footer */}
          <div className="text-center mt-8 text-sm text-muted-foreground">
            <p>
              Don't have an account?{" "}
              <Link href="/sign-up" className="text-primary hover:text-primary/80 transition-colors">
                Sign up for free
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}