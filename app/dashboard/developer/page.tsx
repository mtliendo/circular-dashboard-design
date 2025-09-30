import { DeveloperPage } from "@/components/developer-page"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export default async function Developer() {
  const { has } = await auth()
  if (!has?.({ permission: "developer:read" })) {
    return redirect("/dashboard")
  }
  return <DeveloperPage />
}
