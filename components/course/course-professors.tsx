"use client"

import { User, Star, Users, Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface Professor {
  professor_id: string
  professor_name: string
  semester: string
  year: number
  total_ratings: number
  avg_overall_rating: number
  recommendation_percentage: number
}

interface CourseProfessorsProps {
  professors: Professor[]
  courseId: string
}

export function CourseProfessors({ professors, courseId }: CourseProfessorsProps) {
  if (professors.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No hay profesores registrados para esta materia.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-900">Profesores que Enseñan esta Materia</h3>
      <div className="grid gap-4">
        {professors.map((professor) => (
          <Card
            key={`${professor.professor_id}-${professor.semester}-${professor.year}`}
            className="hover:shadow-md transition-shadow"
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-white" />
                    </div>
                  </div>

                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{professor.professor_name}</h4>

                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {professor.semester} {professor.year}
                        </span>
                      </div>

                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{professor.total_ratings} calificaciones</span>
                      </div>

                      {professor.avg_overall_rating > 0 && (
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{professor.avg_overall_rating.toFixed(1)}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      {professor.recommendation_percentage > 0 && (
                        <Badge variant="secondary" className="text-green-600">
                          {professor.recommendation_percentage.toFixed(0)}% recomendado
                        </Badge>
                      )}

                      {professor.total_ratings === 0 && <Badge variant="outline">Sin calificaciones</Badge>}
                    </div>
                  </div>
                </div>

                <div className="ml-4 flex flex-col space-y-2">
                  <Link href={`/professor/${professor.professor_id}`}>
                    <Button variant="outline" size="sm">
                      Ver Perfil
                    </Button>
                  </Link>
                  <Link href={`/rate/${professor.professor_id}/${courseId}`}>
                    <Button size="sm">Calificar</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
