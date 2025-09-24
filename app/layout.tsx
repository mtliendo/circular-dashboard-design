import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { SettingsProvider } from "@/contexts/settings-context"
import { Suspense } from "react"
import "./globals.css"
import { ClerkProvider } from "@clerk/nextjs"

export const metadata: Metadata = {
  title: "Circular",
  description: "A Linear Clone",
  generator: "v0.app"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
          <Suspense fallback={null}>
            <SettingsProvider>{children}</SettingsProvider>
            <Analytics />
          </Suspense>
        </body>
      </html>
    </ClerkProvider>
  )
}
