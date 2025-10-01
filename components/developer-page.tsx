"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Code, Crown, ArrowRight } from "lucide-react"
import Link from "next/link"

interface DeveloperPageProps {
  hasPermission?: boolean
}

export function DeveloperPage({ hasPermission = false }: DeveloperPageProps) {
  // Show upgrade message if user doesn't have permission
  if (!hasPermission) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-6 py-12">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto">
              <Crown className="w-8 h-8 text-white" />
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-bold">Developer Tools</h1>
              <p className="text-muted-foreground text-lg">
                Unlock powerful API access and developer tools with our Enterprise plan
              </p>
            </div>

            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">What you'll get with Enterprise:</h2>
                    <ul className="space-y-2 text-left">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span>Unlimited API keys and webhooks</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span>Advanced analytics and monitoring</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span>Priority support and SLA</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span>Custom integrations and white-labeling</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-4">
                    <Button asChild size="lg" className="w-full gap-2">
                      <Link href="/pricing">
                        Upgrade to Enterprise
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Circular API</h1>
          <p className="text-muted-foreground">Mock API reference for projects and tasks</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="w-5 h-5" />
              Authentication
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Authenticate using a Bearer token in the Authorization header.
            </p>
            <pre className="bg-muted p-4 rounded-md overflow-auto text-sm">
              {`GET /api/projects
Authorization: Bearer <your_api_key>`}
            </pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Projects</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <h3 className="font-medium">List Projects</h3>
              <pre className="bg-muted p-4 rounded-md overflow-auto text-sm">
                {`GET /api/projects
Response 200
[
  { "id": 1, "name": "Demo Project #1", "status": "active" }
]`}
              </pre>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Create Project</h3>
              <pre className="bg-muted p-4 rounded-md overflow-auto text-sm">
                {`POST /api/projects
Content-Type: application/json
{
  "name": "New Project",
  "status": "active"
}
Response 201
{ "id": 2, "name": "New Project", "status": "active" }`}
              </pre>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tasks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <h3 className="font-medium">List Tasks for Project</h3>
              <pre className="bg-muted p-4 rounded-md overflow-auto text-sm">
                {`GET /api/projects/:id/tasks
Response 200
[
  { "id": 1, "title": "Initial setup", "completed": false }
]`}
              </pre>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Create Task</h3>
              <pre className="bg-muted p-4 rounded-md overflow-auto text-sm">
                {`POST /api/projects/:id/tasks
Content-Type: application/json
{
  "title": "Design dashboard",
  "completed": false
}
Response 201
{ "id": 2, "title": "Design dashboard", "completed": false }`}
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
