"use client"

import type React from "react"

import { Star, Users, ThumbsUp, BookOpen } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface ProfessorStatsProps {
  totalRatings: number
  avgOverallRating: number
  avgClarity: number
  avgOrganization: number
  avgExpertise: number
  avgFriendliness: number
  avgPunctuality: number
  avgDifficulty: number
  recommendationPercentage: number
  totalCourses: number
}

export function ProfessorStats({
  totalRatings,
  avgOverallRating,
  avgClarity,
  avgOrganization,
  avgExpertise,
  avgFriendliness,
  avgPunctuality,
  avgDifficulty,
  recommendationPercentage,
  totalCourses,
}: ProfessorStatsProps) {
  const StatCard = ({
    icon: Icon,
    title,
    value,
    subtitle,
  }: {
    icon: React.ElementType
    title: string
    value: string | number
    subtitle?: string
  }) => (
    <Card>
      <CardContent className="flex items-center p-6">
        <Icon className="h-8 w-8 text-blue-600 mr-4" />
        <div>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-sm text-gray-600">{title}</p>
          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
        </div>
      </CardContent>
    </Card>
  )

  const RatingBar = ({ label, value, maxValue = 5 }: { label: string; value: number; maxValue?: number }) => (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">{label}</span>
        <span className="font-medium">{value.toFixed(1)}/5</span>
      </div>
      <Progress value={(value / maxValue) * 100} className="h-2" />
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Star}
          title="Calificación General"
          value={avgOverallRating ? avgOverallRating.toFixed(1) : "N/A"}
          subtitle={totalRatings > 0 ? `${totalRatings} calificaciones` : "Sin calificaciones"}
        />
        <StatCard icon={Users} title="Estudiantes" value={totalRatings} subtitle="han calificado" />
        <StatCard
          icon={ThumbsUp}
          title="Recomendación"
          value={recommendationPercentage ? `${recommendationPercentage.toFixed(0)}%` : "N/A"}
          subtitle="lo recomiendan"
        />
        <StatCard icon={BookOpen} title="Materias" value={totalCourses} subtitle="que enseña" />
      </div>

      {/* Detailed Ratings */}
      {totalRatings > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Desglose de Calificaciones</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <RatingBar label="Claridad" value={avgClarity || 0} />
                <RatingBar label="Organización" value={avgOrganization || 0} />
                <RatingBar label="Conocimiento" value={avgExpertise || 0} />
              </div>
              <div className="space-y-4">
                <RatingBar label="Amabilidad" value={avgFriendliness || 0} />
                <RatingBar label="Puntualidad" value={avgPunctuality || 0} />
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Dificultad</span>
                    <span className="font-medium">{avgDifficulty ? avgDifficulty.toFixed(1) : "N/A"}/5</span>
                  </div>
                  <Progress value={avgDifficulty ? (avgDifficulty / 5) * 100 : 0} className="h-2" />
                  <p className="text-xs text-gray-500">
                    {avgDifficulty <= 2 ? "Fácil" : avgDifficulty <= 3 ? "Moderado" : "Difícil"}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
