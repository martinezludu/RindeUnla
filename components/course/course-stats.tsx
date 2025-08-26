"use client"

import type React from "react"

import { Star, Users, ThumbsUp, GraduationCap, BookOpen } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface CourseStatsProps {
  totalRatings: number
  avgOverallRating: number
  avgClarity: number
  avgOrganization: number
  avgExpertise: number
  avgFriendliness: number
  avgPunctuality: number
  avgDifficulty: number
  recommendationPercentage: number
  credits: number
  department: string
}

export function CourseStats({
  totalRatings,
  avgOverallRating,
  avgClarity,
  avgOrganization,
  avgExpertise,
  avgFriendliness,
  avgPunctuality,
  avgDifficulty,
  recommendationPercentage,
  credits,
  department,
}: CourseStatsProps) {
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
      <CardContent className="flex items-center p-6">
        <Icon className={`h-8 w-8 ${color} mr-4`} />
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

  const getDifficultyLabel = (difficulty: number) => {
    if (difficulty <= 2) return { label: "Fácil", color: "text-green-600" }
    if (difficulty <= 3) return { label: "Moderado", color: "text-yellow-600" }
    return { label: "Difícil", color: "text-red-600" }
  }

  const difficultyInfo = getDifficultyLabel(avgDifficulty || 0)

  return (
    <div className="space-y-6">
      {/* Course Info */}
      <Card>
        <CardHeader>
          <CardTitle>Información del Curso</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Departamento</p>
                <p className="font-medium">{department}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Créditos</p>
                <p className="font-medium">{credits}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Dificultad</p>
                <p className={`font-medium ${difficultyInfo.color}`}>
                  {avgDifficulty ? `${avgDifficulty.toFixed(1)}/5 - ${difficultyInfo.label}` : "N/A"}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

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
          color="text-green-600"
        />
        <StatCard
          icon={BookOpen}
          title="Dificultad"
          value={avgDifficulty ? avgDifficulty.toFixed(1) : "N/A"}
          subtitle={avgDifficulty ? difficultyInfo.label : "Sin datos"}
          color={avgDifficulty ? difficultyInfo.color.replace("text-", "text-") : "text-gray-600"}
        />
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
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
