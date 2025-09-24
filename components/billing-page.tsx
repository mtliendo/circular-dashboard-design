"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useSettings } from "@/contexts/settings-context"
import { CreditCard, Download, Calendar, DollarSign, TrendingUp } from "lucide-react"

export function BillingPage() {
  const { plan, getPlanPrice, getMemberLimit } = useSettings()

  const mockBillingData = {
    currentPeriod: {
      start: "Jan 1, 2025",
      end: "Jan 31, 2025",
      amount: getPlanPrice(),
      status: "paid",
    },
    usage: {
      members: 8,
      projects: 24,
      storage: "45GB",
    },
    invoices: [
      { id: "INV-001", date: "Jan 1, 2025", amount: getPlanPrice(), status: "paid" },
      { id: "INV-002", date: "Dec 1, 2024", amount: getPlanPrice(), status: "paid" },
      { id: "INV-003", date: "Nov 1, 2024", amount: getPlanPrice(), status: "paid" },
    ],
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Billing & Usage</h1>
          <p className="text-muted-foreground">Manage your subscription and view usage details</p>
        </div>

        {/* Billing Portal Access */}
        <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-2">Manage Your Subscription</h2>
                <p className="text-muted-foreground">
                  Update payment methods, view invoices, change plans, and manage your billing preferences.
                </p>
              </div>
              <Button asChild size="lg">
                <a
                  href="https://billing.stripe.com/p/login/test_14AbJ1d2HbAv4gO6RW2Ry00"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open Billing Portal
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Current Plan */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Current Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold">{plan} Plan</h3>
                <p className="text-muted-foreground">
                  ${getPlanPrice()}/month •{" "}
                  {getMemberLimit() === Number.POSITIVE_INFINITY ? "Unlimited" : getMemberLimit()} members
                </p>
              </div>
              <div className="text-right">
                <Badge variant="default" className="mb-2">
                  Active
                </Badge>
                <p className="text-sm text-muted-foreground">Next billing: Feb 1, 2025</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t">
              <Button asChild className="w-full">
                <a
                  href="https://billing.stripe.com/p/login/test_14AbJ1d2HbAv4gO6RW2Ry00"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Manage Billing & Subscription
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Usage Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Team Members
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockBillingData.usage.members}</div>
              <p className="text-xs text-muted-foreground">
                of {getMemberLimit() === Number.POSITIVE_INFINITY ? "unlimited" : getMemberLimit()} limit
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Active Projects
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockBillingData.usage.projects}</div>
              <p className="text-xs text-muted-foreground">Unlimited projects</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Storage Used
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockBillingData.usage.storage}</div>
              <p className="text-xs text-muted-foreground">
                {plan === "Enterprise" ? "Unlimited" : plan === "Pro" ? "of 100GB" : "of 1GB"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Current Period */}
        <Card>
          <CardHeader>
            <CardTitle>Current Billing Period</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium">
                  {mockBillingData.currentPeriod.start} - {mockBillingData.currentPeriod.end}
                </p>
                <p className="text-sm text-muted-foreground">Current billing cycle</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">${mockBillingData.currentPeriod.amount}</p>
                <Badge variant="default">Paid</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Invoice History */}
        <Card>
          <CardHeader>
            <CardTitle>Invoice History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockBillingData.invoices.map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{invoice.id}</p>
                    <p className="text-sm text-muted-foreground">{invoice.date}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-medium">${invoice.amount}</p>
                      <Badge variant={invoice.status === "paid" ? "default" : "secondary"}>{invoice.status}</Badge>
                    </div>
                    <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                      <Download className="w-4 h-4" />
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-6 bg-gradient-to-r from-blue-600 to-blue-400 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">VISA</span>
                </div>
                <div>
                  <p className="font-medium">•••• •••• •••• 4242</p>
                  <p className="text-sm text-muted-foreground">Expires 12/27</p>
                </div>
              </div>
              <Button variant="outline">Update</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
