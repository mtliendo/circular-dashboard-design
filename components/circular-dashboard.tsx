"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Home,
  FolderOpen,
  Code,
  Plus,
  Search,
  MoreHorizontal,
  Trash2,
  Settings,
  Bell,
  User,
} from "lucide-react"
import Link from "next/link"
import { OrganizationSwitcher, useAuth, UserButton, useUser } from "@clerk/nextjs"
// Mock data
const mockProjects = [{ id: 1, name: "Demo Project #1", status: "active", tasks: 8, members: 3 }]

export function CircularDashboard() {
  const [activeSection, setActiveSection] = useState("projects")
  const [projects, setProjects] = useState(mockProjects)
  const { has, } = useAuth()
  const { user } = useUser()

  useEffect(() => {
    const fetchOrg = async () => {
      const res = await fetch("/api/clerk")
      await res.json()
    }
    fetchOrg()
  }, [])

  const deleteProject = (projectId: number) => {

    setProjects(projects.filter((p) => p.id !== projectId))

  }

  const createProject = () => {

    const newProject = {
      id: Date.now(),
      name: `New Project ${projects.length + 1}`,
      status: "active" as const,
      tasks: 0,
      members: 1,
    }
    setProjects([...projects, newProject])

  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-sidebar-border">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-primary-foreground rounded-full" />
            </div>
            <span className="text-xl font-semibold text-sidebar-foreground">Circular</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <Button
            variant={activeSection === "home" ? "secondary" : "ghost"}
            className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent"
            onClick={() => setActiveSection("home")}
          >
            <Home className="w-4 h-4 mr-3" />
            Home
          </Button>

          <Button
            variant={activeSection === "projects" ? "secondary" : "ghost"}
            className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent"
            onClick={() => setActiveSection("projects")}
          >
            <FolderOpen className="w-4 h-4 mr-3" />
            Projects
          </Button>



          <Button
            variant={activeSection === "developer" ? "secondary" : "ghost"}
            className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent"
            asChild
          >
            <Link href="/dashboard/developer" className="flex items-center">
              <Code className="w-4 h-4 mr-3" />
              Developer
            </Link>
          </Button>
        </nav>

        {/* User Info */}
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">{user?.firstName}</p>
              <p className="text-xs text-muted-foreground truncate">Pro Plan</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 border-b border-border flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-semibold text-balance">
              {activeSection === "projects" && "Projects"}
              {activeSection === "home" && "Dashboard"}
              {activeSection === "billing" && "Billing"}
              {activeSection === "developer" && "Developer"}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search..." className="pl-10 w-64 bg-muted border-0" />
            </div>
            <Button variant="ghost" size="icon">
              <Bell className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="/dashboard/settings">
                <Settings className="w-4 h-4" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <OrganizationSwitcher />
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <UserButton />
            </Button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          {activeSection === "projects" && (
            <div className="space-y-6">
              {/* Projects Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-medium">Your Projects</h2>
                  <p className="text-sm text-muted-foreground">Manage and organize your work</p>
                </div>
                {has?.({ permission: "projects:write" }) && (
                  <Button onClick={createProject} className="gap-2">
                    <Plus className="w-4 h-4" />
                    Create Project
                  </Button>
                )}
              </div>

              {/* Projects Grid */}
              <div className="grid gap-4">
                {projects.map((project) => (
                  <Card key={project.id} className="hover:bg-accent/50 transition-colors">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Link href={`/dashboard/projects/${project.id}`}>
                            <CardTitle className="text-base hover:text-primary transition-colors cursor-pointer">
                              {project.name}
                            </CardTitle>
                          </Link>
                          <Badge variant={project.status === "active" ? "default" : "secondary"}>
                            {project.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          {has?.({ permission: "projects:delete" }) && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => deleteProject(project.id)}
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}

                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <span>{project.tasks} tasks</span>
                        <span>{project.members} members</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeSection === "home" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-balance">Welcome back, {user?.firstName}</h2>
                <p className="text-muted-foreground">Here's what's happening with your projects</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{projects.length}</div>
                    <p className="text-xs text-muted-foreground">
                      {projects.filter((p) => p.status === "active").length} active
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{projects.reduce((sum, p) => sum + p.tasks, 0)}</div>
                    <p className="text-xs text-muted-foreground">Across all projects</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Team Members</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{Math.max(...projects.map((p) => p.members))}</div>
                    <p className="text-xs text-muted-foreground">Largest team</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeSection === "billing" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-medium">Billing & Usage</h2>
                <p className="text-sm text-muted-foreground">Manage your subscription and usage</p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Current Plan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Pro Plan</p>
                      <p className="text-sm text-muted-foreground">$10/month</p>
                    </div>
                    <Badge>Active</Badge>
                  </div>
                  <div className="mt-4">
                    <Button asChild>
                      <Link href="/dashboard/billing">View Full Billing Details</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}


        </main>
      </div>
    </div>
  )
}
