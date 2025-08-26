"use client"

import { useState } from "react"
import { MessageCircle, ChevronDown, ChevronUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RatingDisplay } from "@/components/rating/rating-display"

interface Rating {
  id: string
  clarity: number
  organization: number
  expertise: number
  friendliness: number
  punctuality: number
  overall_rating: number
  difficulty: number
  would_recommend: boolean
  comment?: string
  semester: string
  year: number
  created_at: string
  course_name: string
  course_code: string
}

interface ProfessorReviewsProps {
  ratings: Rating[]
}

export function ProfessorReviews({ ratings }: ProfessorReviewsProps) {
  const [showAll, setShowAll] = useState(false)
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "highest" | "lowest">("newest")

  const sortedRatings = [...ratings].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      case "oldest":
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      case "highest":
        return b.overall_rating - a.overall_rating
      case "lowest":
        return a.overall_rating - b.overall_rating
      default:
        return 0
    }
  })

  const displayedRatings = showAll ? sortedRatings : sortedRatings.slice(0, 5)

  if (ratings.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Aún no hay calificaciones para este profesor.</p>
          <p className="text-sm text-gray-500 mt-2">¡Sé el primero en calificarlo!</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900">Calificaciones de Estudiantes ({ratings.length})</h3>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="newest">Más recientes</option>
          <option value="oldest">Más antiguas</option>
          <option value="highest">Mejor calificadas</option>
          <option value="lowest">Peor calificadas</option>
        </select>
      </div>

      <div className="space-y-4">
        {displayedRatings.map((rating) => (
          <div key={rating.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">
                  {rating.course_name} ({rating.course_code})
                </span>
              </div>
            </div>
            <RatingDisplay rating={rating} showComment={true} />
          </div>
        ))}
      </div>

      {ratings.length > 5 && (
        <div className="text-center">
          <Button variant="outline" onClick={() => setShowAll(!showAll)} className="flex items-center space-x-2">
            {showAll ? (
              <>
                <ChevronUp className="h-4 w-4" />
                <span>Ver menos</span>
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4" />
                <span>Ver todas las calificaciones ({ratings.length - 5} más)</span>
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  )
}
