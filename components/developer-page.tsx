"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Code, Key, Copy, Eye, EyeOff, Plus, Trash2 } from "lucide-react"
import { useState } from "react"

export function DeveloperPage() {
  const [showApiKey, setShowApiKey] = useState(false)
  const [newKeyName, setNewKeyName] = useState("")

  const mockApiKeys = [
    {
      id: "key_1",
      name: "Production API",
      key: "sk_live_51234567890abcdef",
      created: "Jan 15, 2025",
      lastUsed: "2 hours ago",
      status: "active",
    },
    {
      id: "key_2",
      name: "Development API",
      key: "sk_test_51234567890abcdef",
      created: "Jan 10, 2025",
      lastUsed: "1 day ago",
      status: "active",
    },
  ]

  const mockWebhooks = [
    {
      id: "wh_1",
      url: "https://myapp.com/webhooks/circular",
      events: ["project.created", "project.updated", "member.added"],
      status: "active",
      lastDelivery: "5 minutes ago",
    },
  ]

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key)
  }

  const handleCreateKey = () => {
    if (newKeyName) {
      console.log(`Creating API key: ${newKeyName}`)
      setNewKeyName("")
    }
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Developer Settings</h1>
          <p className="text-muted-foreground">Manage API keys, webhooks, and integrations</p>
        </div>

        {/* API Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="w-5 h-5" />
              API Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold">2</div>
                <p className="text-sm text-muted-foreground">Active API Keys</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold">1,247</div>
                <p className="text-sm text-muted-foreground">API Calls (30 days)</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold">99.9%</div>
                <p className="text-sm text-muted-foreground">Uptime</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* API Keys */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="w-5 h-5" />
              API Keys
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Create New Key */}
            <div className="flex gap-2">
              <Input placeholder="API key name" value={newKeyName} onChange={(e) => setNewKeyName(e.target.value)} />
              <Button onClick={handleCreateKey} disabled={!newKeyName} className="gap-2">
                <Plus className="w-4 h-4" />
                Create Key
              </Button>
            </div>

            {/* Existing Keys */}
            <div className="space-y-3">
              {mockApiKeys.map((apiKey) => (
                <div key={apiKey.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium">{apiKey.name}</p>
                      <Badge variant={apiKey.status === "active" ? "default" : "secondary"}>{apiKey.status}</Badge>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <code className="text-sm bg-muted px-2 py-1 rounded">
                        {showApiKey ? apiKey.key : `${apiKey.key.substring(0, 12)}...`}
                      </code>
                      <Button variant="ghost" size="sm" onClick={() => setShowApiKey(!showApiKey)}>
                        {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleCopyKey(apiKey.key)}>
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Created {apiKey.created} • Last used {apiKey.lastUsed}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Webhooks */}
        <Card>
          <CardHeader>
            <CardTitle>Webhooks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Webhook
            </Button>

            <div className="space-y-3">
              {mockWebhooks.map((webhook) => (
                <div key={webhook.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <code className="text-sm bg-muted px-2 py-1 rounded">{webhook.url}</code>
                    <Badge variant={webhook.status === "active" ? "default" : "secondary"}>{webhook.status}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Events: {webhook.events.join(", ")}</span>
                    <span>Last delivery: {webhook.lastDelivery}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* API Documentation */}
        <Card>
          <CardHeader>
            <CardTitle>API Documentation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Get started with the Circular API to integrate with your applications.
              </p>
              <div className="flex gap-2">
                <Button variant="outline">View Documentation</Button>
                <Button variant="outline">Download SDK</Button>
                <Button variant="outline">API Reference</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
