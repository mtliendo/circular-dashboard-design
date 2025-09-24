"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type Plan = "Free" | "Pro" | "Enterprise"
export type RoleSet = "Default" | "Enterprise"
export type MemberType = "Admin" | "Member" | "Developer" | "Billing"

interface SettingsContextType {
  plan: Plan
  roleSet: RoleSet
  memberType: MemberType
  setPlan: (plan: Plan) => void
  setRoleSet: (roleSet: RoleSet) => void
  setMemberType: (memberType: MemberType) => void

  // Helper functions
  canSeeBilling: () => boolean
  canSeeDeveloper: () => boolean
  canCreateProject: () => boolean
  canDeleteProject: () => boolean
  canManageBilling: () => boolean
  canManageDeveloper: () => boolean
  getMemberLimit: () => number
  getPlanPrice: () => number
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<Plan>("Pro")
  const [roleSet, setRoleSet] = useState<RoleSet>("Enterprise")
  const [memberType, setMemberType] = useState<MemberType>("Admin")

  // Helper functions for access control
  const canSeeBilling = () => plan === "Enterprise"
  const canSeeDeveloper = () => plan === "Enterprise"

  const canCreateProject = () => memberType === "Admin"
  const canDeleteProject = () => memberType === "Admin"

  const canManageBilling = () =>
    plan === "Enterprise" && memberType === "Admin" && (roleSet === "Enterprise" || memberType === "Billing")

  const canManageDeveloper = () =>
    plan === "Enterprise" && memberType === "Admin" && (roleSet === "Enterprise" || memberType === "Developer")

  const getMemberLimit = () => {
    switch (plan) {
      case "Free":
        return 1
      case "Pro":
        return 10
      case "Enterprise":
        return Number.POSITIVE_INFINITY
      default:
        return 1
    }
  }

  const getPlanPrice = () => {
    switch (plan) {
      case "Free":
        return 0
      case "Pro":
        return 10
      case "Enterprise":
        return 200
      default:
        return 0
    }
  }

  return (
    <SettingsContext.Provider
      value={{
        plan,
        roleSet,
        memberType,
        setPlan,
        setRoleSet,
        setMemberType,
        canSeeBilling,
        canSeeDeveloper,
        canCreateProject,
        canDeleteProject,
        canManageBilling,
        canManageDeveloper,
        getMemberLimit,
        getPlanPrice,
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider")
  }
  return context
}
