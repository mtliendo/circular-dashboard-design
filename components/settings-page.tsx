"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useSettings, type Plan, type RoleSet, type MemberType } from "@/contexts/settings-context"
import { Users, Plus } from "lucide-react"
import { useState } from "react"

export function SettingsPage() {
  const { plan, roleSet, memberType, setPlan, setRoleSet, setMemberType, getMemberLimit, getPlanPrice } = useSettings()

  const [inviteEmail, setInviteEmail] = useState("")
  const [currentMembers] = useState(1) // Mock current member count

  const memberLimit = getMemberLimit()
  const canInviteMore = memberLimit === Number.POSITIVE_INFINITY || currentMembers < memberLimit
  const remainingInvites = memberLimit === Number.POSITIVE_INFINITY ? "Unlimited" : memberLimit - currentMembers

  const handleInvite = () => {
    if (inviteEmail && canInviteMore) {
      // Mock invite functionality
      console.log(`Inviting ${inviteEmail}`)
      setInviteEmail("")
    }
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your organization settings and permissions</p>
        </div>

        {/* Plan Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Plan Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="plan">Current Plan</Label>
                <Select value={plan} onValueChange={(value: Plan) => setPlan(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Free">Free - $0/month</SelectItem>
                    <SelectItem value="Pro">Pro - $10/month</SelectItem>
                    <SelectItem value="Enterprise">Enterprise - $200/month</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="roleSet">Role Set</Label>
                <Select value={roleSet} onValueChange={(value: RoleSet) => setRoleSet(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Default">Default (Admin + Member)</SelectItem>
                    <SelectItem value="Enterprise">Enterprise (All Roles)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="memberType">Your Role</Label>
                <Select value={memberType} onValueChange={(value: MemberType) => setMemberType(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Member">Member</SelectItem>
                    {roleSet === "Enterprise" && (
                      <>
                        <SelectItem value="Developer">Developer</SelectItem>
                        <SelectItem value="Billing">Billing</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium">Current Plan: {plan}</p>
                <p className="text-sm text-muted-foreground">
                  ${getPlanPrice()}/month • {memberLimit === Number.POSITIVE_INFINITY ? "Unlimited" : memberLimit}{" "}
                  members
                </p>
              </div>
              <Badge variant={plan === "Enterprise" ? "default" : plan === "Pro" ? "secondary" : "outline"}>
                {plan}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Team Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Team Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium">Team Size</p>
                <p className="text-sm text-muted-foreground">
                  {currentMembers} of {memberLimit === Number.POSITIVE_INFINITY ? "unlimited" : memberLimit} members
                </p>
              </div>
              <Badge variant="outline">{remainingInvites} invites remaining</Badge>
            </div>

            {memberType === "Admin" && (
              <div className="space-y-3">
                <Label htmlFor="invite">Invite Team Member</Label>
                <div className="flex gap-2">
                  <Input
                    id="invite"
                    type="email"
                    placeholder="Enter email address"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    disabled={!canInviteMore}
                  />
                  <Button onClick={handleInvite} disabled={!inviteEmail || !canInviteMore} className="gap-2">
                    <Plus className="w-4 h-4" />
                    Invite
                  </Button>
                </div>
                {!canInviteMore && (
                  <p className="text-sm text-muted-foreground">
                    You've reached your member limit. Upgrade to invite more team members.
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Access Control Info */}
        <Card>
          <CardHeader>
            <CardTitle>Access Control</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium">Available Sections</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Projects</span>
                    <Badge variant="outline" className="text-xs">
                      Always
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Billing</span>
                    <Badge variant={plan === "Enterprise" ? "default" : "secondary"} className="text-xs">
                      {plan === "Enterprise" ? "Available" : "Enterprise Only"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Developer</span>
                    <Badge variant={plan === "Enterprise" ? "default" : "secondary"} className="text-xs">
                      {plan === "Enterprise" ? "Available" : "Enterprise Only"}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Your Permissions</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Create Projects</span>
                    <Badge variant={memberType === "Admin" ? "default" : "secondary"} className="text-xs">
                      {memberType === "Admin" ? "Yes" : "Admin Only"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Delete Projects</span>
                    <Badge variant={memberType === "Admin" ? "default" : "secondary"} className="text-xs">
                      {memberType === "Admin" ? "Yes" : "Admin Only"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>View Projects</span>
                    <Badge variant="default" className="text-xs">
                      Always
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
