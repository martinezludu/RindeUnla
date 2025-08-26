"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, BookOpen, Star, MessageCircle, AlertTriangle } from "lucide-react"

interface AdminStatsProps {
  totalProfessors: number
  totalCourses: number
  totalRatings: number
  totalUsers: number
  avgRating: number
  recentRatings: number
  pendingReports?: number
}

export function AdminStats({
  totalProfessors,
  totalCourses,
  totalRatings,
  totalUsers,
  avgRating,
  recentRatings,
  pendingReports = 0,
}: AdminStatsProps) {
  const StatCard = ({
    icon: Icon,
    title,
    value,
    subtitle,
    color = "text-blue-600",
  }: {
    icon: React.ElementType
    title: string
    value: string | number
    subtitle?: string
    color?: string
  }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={`h-4 w-4 ${color}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </CardContent>
    </Card>
  )

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard icon={Users} title="Profesores" value={totalProfessors} subtitle="registrados en el sistema" />
      <StatCard icon={BookOpen} title="Materias" value={totalCourses} subtitle="disponibles" color="text-green-600" />
      <StatCard
        icon={MessageCircle}
        title="Calificaciones"
        value={totalRatings}
        subtitle={`${recentRatings} en los últimos 7 días`}
        color="text-purple-600"
      />
      <StatCard
        icon={Star}
        title="Promedio General"
        value={avgRating.toFixed(1)}
        subtitle="calificación promedio del sistema"
        color="text-yellow-600"
      />
      {pendingReports > 0 && (
        <StatCard
          icon={AlertTriangle}
          title="Reportes Pendientes"
          value={pendingReports}
          subtitle="requieren atención"
          color="text-red-600"
        />
      )}
    </div>
  )
}
