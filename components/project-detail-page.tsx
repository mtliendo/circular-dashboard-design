"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Plus, Edit, Trash2, Save, X } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@clerk/nextjs"

// Mock data structure
interface Task {
  id: number
  title: string
  description: string
  isCompleted: boolean
  createdAt: Date
}

interface Project {
  id: number
  name: string
  status: "active" | "archived" | "on-hold"
  description: string
  tasks: Task[]
  members: number
  createdAt: Date
}

// Mock projects data with tasks
const mockProjectsWithTasks: Project[] = [
  {
    id: 1,
    name: "Demo Project #1",
    status: "active",
    description: "A demonstration project showcasing our platform capabilities",
    tasks: [
      {
        id: 1,
        title: "Setup project structure",
        description: "Initialize the project with proper folder structure and configuration",
        isCompleted: true,
        createdAt: new Date("2024-01-15"),
      },
      {
        id: 2,
        title: "Design user interface",
        description: "Create wireframes and mockups for the main user interface",
        isCompleted: true,
        createdAt: new Date("2024-01-16"),
      },
      {
        id: 3,
        title: "Implement authentication",
        description: "Add user login and registration functionality",
        isCompleted: false,
        createdAt: new Date("2024-01-17"),
      },
      {
        id: 4,
        title: "Database integration",
        description: "Connect to database and implement data models",
        isCompleted: false,
        createdAt: new Date("2024-01-18"),
      },
      {
        id: 5,
        title: "API development",
        description: "Build RESTful API endpoints for data operations",
        isCompleted: false,
        createdAt: new Date("2024-01-19"),
      },
      {
        id: 6,
        title: "Frontend components",
        description: "Develop reusable UI components and layouts",
        isCompleted: false,
        createdAt: new Date("2024-01-20"),
      },
      {
        id: 7,
        title: "Testing implementation",
        description: "Write unit tests and integration tests for core functionality",
        isCompleted: false,
        createdAt: new Date("2024-01-21"),
      },
      {
        id: 8,
        title: "Deployment setup",
        description: "Configure production environment and deployment pipeline",
        isCompleted: false,
        createdAt: new Date("2024-01-22"),
      },
    ],
    members: 3,
    createdAt: new Date("2024-01-15"),
  },
]

export function ProjectDetailPage({ projectId }: { projectId: number }) {
  const router = useRouter()
  const { has } = useAuth()
  const [project, setProject] = useState<Project | null>(null)
  const [isEditingProject, setIsEditingProject] = useState(false)
  const [editedProject, setEditedProject] = useState<Partial<Project>>({})
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false)
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null)
  const [newTask, setNewTask] = useState({ title: "", description: "" })

  const canCreateTask = has?.({ permission: "tasks:write" })
  const canDeleteTask = has?.({ permission: "tasks:delete" })

  useEffect(() => {
    const foundProject = mockProjectsWithTasks.find((p) => p.id === projectId)
    if (foundProject) {
      setProject(foundProject)
      setEditedProject(foundProject)
    }
  }, [projectId])

  if (!project) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Project not found</h2>
          <p className="text-muted-foreground mb-4">The project you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/dashboard">Back to Dashboard</Link>
          </Button>
        </div>
      </div>
    )
  }

  const handleSaveProject = () => {
    if (editedProject.name && editedProject.status && editedProject.description) {
      setProject({ ...project, ...editedProject })
      setIsEditingProject(false)
    }
  }

  const handleCreateTask = () => {
    if (newTask.title.trim()) {
      const task: Task = {
        id: Date.now(),
        title: newTask.title,
        description: newTask.description,
        isCompleted: false,
        createdAt: new Date(),
      }
      setProject({ ...project, tasks: [...project.tasks, task] })
      setNewTask({ title: "", description: "" })
      setIsCreateTaskOpen(false)
    }
  }

  const handleUpdateTask = (taskId: number, updates: Partial<Task>) => {
    setProject({
      ...project,
      tasks: project.tasks.map((task) => (task.id === taskId ? { ...task, ...updates } : task)),
    })
  }

  const handleDeleteTask = (taskId: number) => {
    setProject({
      ...project,
      tasks: project.tasks.filter((task) => task.id !== taskId),
    })
  }

  const handleToggleTask = (taskId: number) => {
    handleUpdateTask(taskId, {
      isCompleted: !project.tasks.find((t) => t.id === taskId)?.isCompleted,
    })
  }

  const completedTasks = project.tasks.filter((task) => task.isCompleted).length
  const totalTasks = project.tasks.length
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/dashboard">
                  <ArrowLeft className="w-4 h-4" />
                </Link>
              </Button>
              {isEditingProject ? (
                <div className="flex items-center gap-2">
                  <Input
                    value={editedProject.name || ""}
                    onChange={(e) => setEditedProject({ ...editedProject, name: e.target.value })}
                    className="text-2xl font-semibold border-0 bg-transparent p-0 h-auto focus-visible:ring-0"
                  />
                  <Button size="icon" variant="ghost" onClick={handleSaveProject}>
                    <Save className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => setIsEditingProject(false)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-semibold text-balance">{project.name}</h1>
                  <Button size="icon" variant="ghost" onClick={() => setIsEditingProject(true)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={project.status === "active" ? "default" : "secondary"}>{project.status}</Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Project Info */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditingProject ? (
                  <>
                    <div>
                      <Label htmlFor="status">Status</Label>
                      <Select
                        value={editedProject.status}
                        onValueChange={(value) =>
                          setEditedProject({ ...editedProject, status: value as Project["status"] })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="on-hold">On Hold</SelectItem>
                          <SelectItem value="archived">Archived</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={editedProject.description || ""}
                        onChange={(e) => setEditedProject({ ...editedProject, description: e.target.value })}
                        rows={3}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <p className="text-sm font-medium">Description</p>
                      <p className="text-sm text-muted-foreground">{project.description}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Members</p>
                      <p className="text-sm text-muted-foreground">{project.members} team members</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Created</p>
                      <p className="text-sm text-muted-foreground">{project.createdAt.toLocaleDateString()}</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Completed</span>
                    <span>
                      {completedTasks}/{totalTasks}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${completionPercentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground text-center">{completionPercentage}% complete</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tasks */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Tasks</h2>
                <p className="text-sm text-muted-foreground">
                  {totalTasks} tasks • {completedTasks} completed
                </p>
              </div>
              {canCreateTask && (
                <Dialog open={isCreateTaskOpen} onOpenChange={setIsCreateTaskOpen}>
                  <DialogTrigger asChild>
                    <Button className="gap-2">
                      <Plus className="w-4 h-4" />
                      Add Task
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Task</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="task-title">Title</Label>
                        <Input
                          id="task-title"
                          value={newTask.title}
                          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                          placeholder="Enter task title..."
                        />
                      </div>
                      <div>
                        <Label htmlFor="task-description">Description</Label>
                        <Textarea
                          id="task-description"
                          value={newTask.description}
                          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                          placeholder="Enter task description..."
                          rows={3}
                        />
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setIsCreateTaskOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleCreateTask}>Create Task</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>

            <div className="space-y-3">
              {project.tasks.map((task) => (
                <Card key={task.id} className="transition-colors hover:bg-accent/50">
                  <CardContent className="p-4">
                    {editingTaskId === task.id ? (
                      <div className="space-y-3">
                        <Input
                          value={task.title}
                          onChange={(e) => handleUpdateTask(task.id, { title: e.target.value })}
                          className="font-medium"
                        />
                        <Textarea
                          value={task.description}
                          onChange={(e) => handleUpdateTask(task.id, { description: e.target.value })}
                          rows={2}
                        />
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="outline" onClick={() => setEditingTaskId(null)}>
                            Cancel
                          </Button>
                          <Button size="sm" onClick={() => setEditingTaskId(null)}>
                            Save
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start gap-3">
                        <Checkbox
                          checked={task.isCompleted}
                          onCheckedChange={() => handleToggleTask(task.id)}
                          className="mt-1"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className={`font-medium ${task.isCompleted ? "line-through text-muted-foreground" : ""}`}>
                            {task.title}
                          </h3>
                          {task.description && (
                            <p
                              className={`text-sm mt-1 ${task.isCompleted ? "line-through text-muted-foreground" : "text-muted-foreground"}`}
                            >
                              {task.description}
                            </p>
                          )}
                          <p className="text-xs text-muted-foreground mt-2">
                            Created {task.createdAt.toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => setEditingTaskId(task.id)}
                            className="h-8 w-8"
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                          {canDeleteTask && (
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => handleDeleteTask(task.id)}
                              className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}

              {project.tasks.length === 0 && (
                <Card className="border-dashed">
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <div className="text-center">
                      <h3 className="text-lg font-medium mb-2">No tasks yet</h3>
                      <p className="text-muted-foreground mb-4">
                        Get started by creating your first task for this project.
                      </p>
                      <Button onClick={() => setIsCreateTaskOpen(true)} className="gap-2">
                        <Plus className="w-4 h-4" />
                        Create First Task
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
