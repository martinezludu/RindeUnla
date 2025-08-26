"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { StarRating } from "@/components/ui/star-rating"
import { useAuth } from "@/contexts/auth-context"

interface RatingFormProps {
  professorId: string
  courseId: string
  professorName: string
  courseName: string
  onSuccess?: () => void
  onCancel?: () => void
}

interface RatingData {
  clarity: number
  organization: number
  expertise: number
  friendliness: number
  punctuality: number
  comment: string
  difficulty: number
  would_recommend: boolean
  semester: string
  year: number
}

export function RatingForm({ professorId, courseId, professorName, courseName, onSuccess, onCancel }: RatingFormProps) {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const [rating, setRating] = useState<RatingData>({
    clarity: 0,
    organization: 0,
    expertise: 0,
    friendliness: 0,
    punctuality: 0,
    comment: "",
    difficulty: 0,
    would_recommend: false,
    semester: "",
    year: new Date().getFullYear(),
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Validate required ratings
    if (
      rating.clarity === 0 ||
      rating.organization === 0 ||
      rating.expertise === 0 ||
      rating.friendliness === 0 ||
      rating.punctuality === 0
    ) {
      setError("Por favor, califica todos los criterios obligatorios")
      setLoading(false)
      return
    }

    if (rating.difficulty === 0) {
      setError("Por favor, indica el nivel de dificultad")
      setLoading(false)
      return
    }

    if (!rating.semester) {
      setError("Por favor, selecciona el cuatrimestre")
      setLoading(false)
      return
    }

    try {
      const response = await fetch("/api/ratings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          professor_id: professorId,
          course_id: courseId,
          user_id: user?.id,
          ...rating,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Error al enviar la calificación")
      }

      setSuccess(true)
      if (onSuccess) {
        onSuccess()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al enviar la calificación")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-green-600">¡Calificación Enviada!</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertDescription>
              Tu calificación para {professorName} en {courseName} ha sido enviada exitosamente. Gracias por contribuir
              a la comunidad de RINDEUNLA.
            </AlertDescription>
          </Alert>
          <div className="flex justify-center mt-4">
            <Button onClick={onCancel} variant="outline">
              Volver
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Calificar Profesor</CardTitle>
        <CardDescription>
          Califica a <strong>{professorName}</strong> en <strong>{courseName}</strong>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Rating Criteria */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Criterios de Evaluación</h3>

            <StarRating
              value={rating.clarity}
              onChange={(value) => setRating({ ...rating, clarity: value })}
              label="Claridad"
              description="¿Qué tan claro es el profesor al explicar los conceptos?"
            />

            <StarRating
              value={rating.organization}
              onChange={(value) => setRating({ ...rating, organization: value })}
              label="Organización"
              description="¿Qué tan bien organizadas están las clases y el material?"
            />

            <StarRating
              value={rating.expertise}
              onChange={(value) => setRating({ ...rating, expertise: value })}
              label="Conocimiento"
              description="¿Qué tan experto es el profesor en la materia?"
            />

            <StarRating
              value={rating.friendliness}
              onChange={(value) => setRating({ ...rating, friendliness: value })}
              label="Amabilidad"
              description="¿Qué tan accesible y amable es el profesor?"
            />

            <StarRating
              value={rating.punctuality}
              onChange={(value) => setRating({ ...rating, punctuality: value })}
              label="Puntualidad"
              description="¿Qué tan puntual es el profesor con horarios y entregas?"
            />
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Información Adicional</h3>

            <div className="space-y-2">
              <Label htmlFor="difficulty">Nivel de Dificultad</Label>
              <StarRating
                value={rating.difficulty}
                onChange={(value) => setRating({ ...rating, difficulty: value })}
                label="Dificultad"
                description="¿Qué tan difícil fue la materia? (1 = Muy Fácil, 5 = Muy Difícil)"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="semester">Cuatrimestre</Label>
                <Select value={rating.semester} onValueChange={(value) => setRating({ ...rating, semester: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el cuatrimestre" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1er Cuatrimestre">1er Cuatrimestre</SelectItem>
                    <SelectItem value="2do Cuatrimestre">2do Cuatrimestre</SelectItem>
                    <SelectItem value="Verano">Verano</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="year">Año</Label>
                <Select
                  value={rating.year.toString()}
                  onValueChange={(value) => setRating({ ...rating, year: Number.parseInt(value) })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el año" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="recommend"
                checked={rating.would_recommend}
                onCheckedChange={(checked) => setRating({ ...rating, would_recommend: checked as boolean })}
              />
              <Label
                htmlFor="recommend"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Recomendaría este profesor
              </Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="comment">Comentario (Opcional)</Label>
              <Textarea
                id="comment"
                value={rating.comment}
                onChange={(e) => setRating({ ...rating, comment: e.target.value })}
                placeholder="Comparte tu experiencia con otros estudiantes..."
                rows={4}
                maxLength={500}
              />
              <p className="text-xs text-gray-500">{rating.comment.length}/500 caracteres</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button type="submit" className="flex-1" disabled={loading}>
              {loading ? "Enviando..." : "Enviar Calificación"}
            </Button>
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel} className="flex-1 bg-transparent">
                Cancelar
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
