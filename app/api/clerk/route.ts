import { auth, createClerkClient } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  const { orgId } = await auth()
  const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY! })
  const org = await clerk.organizations.getOrganization({ organizationId: orgId as string, includeMembersCount: true })


  return NextResponse.json({ org })
}