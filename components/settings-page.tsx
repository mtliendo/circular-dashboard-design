"use client"

import { OrganizationProfile } from "@clerk/nextjs"
import { dark } from "@clerk/themes"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Bell, User } from "lucide-react"
import Link from "next/link"
import { UserButton } from "@clerk/nextjs"

export function SettingsPage() {

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 hero-grid-bg animate-grid-pulse"></div>

      <div className="absolute top-20 left-20 animate-geometric-float">
        <div className="w-12 h-12 border-2 border-primary/30 rotate-45 bg-primary/5"></div>
      </div>
      <div className="absolute top-32 right-32 animate-geometric-float" style={{ animationDelay: "2s" }}>
        <div className="w-8 h-8 rounded-full bg-accent/20 border border-accent/40"></div>
      </div>
      <div className="absolute bottom-40 left-40 animate-geometric-float" style={{ animationDelay: "4s" }}>
        <div className="w-6 h-6 bg-primary/10 transform rotate-12"></div>
      </div>

      <div className="absolute top-20 left-10 animate-float">
        <div className="w-16 h-16 bg-primary/10 rounded-full blur-xl"></div>
      </div>
      <div className="absolute top-40 right-20 animate-float" style={{ animationDelay: "2s" }}>
        <div className="w-24 h-24 bg-accent/10 rounded-full blur-xl"></div>
      </div>


      <header className="relative z-10 h-16 border-b border-border/50 backdrop-blur-sm bg-background/80 flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full border-2 border-primary bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-primary"></div>
            </div>
            <span className="text-xl font-bold">Circular</span>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search..." className="pl-10 w-64 bg-muted border-0" />
          </div>
          <Button variant="ghost" size="icon">
            <Bell className="w-4 h-4" />
          </Button>
          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-8 h-8",
                userButtonPopoverCard: "bg-card border-border/50",
                userButtonPopoverActionButton: "text-foreground hover:bg-muted/50",
                userButtonPopoverActionButtonText: "text-foreground",
                userButtonPopoverFooter: "hidden"
              }
            }}
          />
        </div>
      </header>

      <div className="relative z-10 p-6">
        <div className="max-w-4xl mx-auto">

          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Organization Settings</h1>
            <p className="text-muted-foreground">Manage your organization profile, members, and permissions</p>
          </div>


          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 shadow-2xl">
            <OrganizationProfile
              appearance={{
                theme: dark,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
