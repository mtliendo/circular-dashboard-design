import { DeveloperPage } from "@/components/developer-page"
import { auth } from "@clerk/nextjs/server"

export default async function Developer() {
  const { has } = await auth()
  const developerCanRead = has?.({ permission: "developer:read" })

  return <DeveloperPage hasPermission={!!developerCanRead} />
}
