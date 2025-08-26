"use client"

import type React from "react"

import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

interface AdminGuardProps {
  children: React.ReactNode
}

export function AdminGuard({ children }: AdminGuardProps) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!loading && user) {
        const supabase = createClient()

        // Check if user has admin role or is in admin list
        // For now, we'll use a simple email check - in production, use proper role management
        const adminEmails = ["admin@unla.edu.ar", "admin@rindeunla.com"]

        const userIsAdmin = adminEmails.includes(user.email || "") || user.email?.endsWith("@unla.edu.ar")

        setIsAdmin(userIsAdmin)

        if (!userIsAdmin) {
          router.push("/dashboard")
        }
      } else if (!loading && !user) {
        router.push("/login")
      }

      setChecking(false)
    }

    checkAdminStatus()
  }, [user, loading, router])

  if (loading || checking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
      </div>
    )
  }

  if (!user || !isAdmin) {
    return null
  }

  return <>{children}</>
}
