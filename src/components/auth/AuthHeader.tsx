'use client'

import { useSession } from "next-auth/react"
import { UserProfile } from "./UserProfile"
import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"

export function AuthHeader() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <div className="flex items-center space-x-4">
        <div className="h-8 w-8 animate-pulse bg-gray-300 rounded-full"></div>
      </div>
    )
  }

  if (session?.user) {
    return <UserProfile />
  }

  return (
    <div className="flex items-center space-x-2">
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => signIn("google")}
      >
        تسجيل الدخول
      </Button>
    </div>
  )
}
