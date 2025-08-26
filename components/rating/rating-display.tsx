"use client"

import { Star, ThumbsUp, MessageCircle } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

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
}

interface RatingDisplayProps {
  rating: Rating
  showComment?: boolean
  compact?: boolean
}

export function RatingDisplay({ rating, showComment = true, compact = false }: RatingDisplayProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-AR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getDifficultyLabel = (difficulty: number) => {
    const labels = ["", "Muy Fácil", "Fácil", "Moderado", "Difícil", "Muy Difícil"]
    return labels[difficulty] || ""
  }

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 2) return "bg-green-100 text-green-800"
    if (difficulty <= 3) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  const StarDisplay = ({ value, label }: { value: number; label: string }) => (
    <div className={cn("flex items-center justify-between", compact ? "text-xs" : "text-sm")}>
      <span className="text-gray-600">{label}</span>
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              compact ? "h-3 w-3" : "h-4 w-4",
              star <= value ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200",
            )}
          />
        ))}
        <span className="ml-1 font-medium">{value}</span>
      </div>
    </div>
  )

  return (
    <Card className={cn("w-full", compact && "text-sm")}>
      <CardHeader className={cn("pb-3", compact && "pb-2")}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <Star className={cn("fill-yellow-400 text-yellow-400", compact ? "h-4 w-4" : "h-5 w-5")} />
              <span className={cn("font-bold", compact ? "text-lg" : "text-xl")}>
                {rating.overall_rating.toFixed(1)}
              </span>
            </div>
            {rating.would_recommend && (
              <div className="flex items-center space-x-1 text-green-600">
                <ThumbsUp className={cn(compact ? "h-3 w-3" : "h-4 w-4")} />
                <span className={cn("text-xs", compact ? "text-xs" : "text-sm")}>Recomendado</span>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className={getDifficultyColor(rating.difficulty)}>
              {getDifficultyLabel(rating.difficulty)}
            </Badge>
            <Badge variant="secondary">
              {rating.semester} {rating.year}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className={cn("space-y-3", compact && "space-y-2")}>
        <div className={cn("grid gap-2", compact ? "gap-1" : "gap-2")}>
          <StarDisplay value={rating.clarity} label="Claridad" />
          <StarDisplay value={rating.organization} label="Organización" />
          <StarDisplay value={rating.expertise} label="Conocimiento" />
          <StarDisplay value={rating.friendliness} label="Amabilidad" />
          <StarDisplay value={rating.punctuality} label="Puntualidad" />
        </div>

        {showComment && rating.comment && (
          <div className="pt-3 border-t">
            <div className="flex items-start space-x-2">
              <MessageCircle className={cn("text-gray-400 mt-1", compact ? "h-3 w-3" : "h-4 w-4")} />
              <div className="flex-1">
                <p className={cn("text-gray-700", compact ? "text-xs" : "text-sm")}>{rating.comment}</p>
                <p className={cn("text-gray-500 mt-1", compact ? "text-xs" : "text-xs")}>
                  {formatDate(rating.created_at)}
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
