"use client"

import { BookOpen, Users, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface Course {
  id: string
  name: string
  code: string
  department: string
  semester: string
  year: number
  total_ratings: number
  avg_overall_rating: number
  recommendation_percentage: number
}

interface ProfessorCoursesProps {
  courses: Course[]
  professorId: string
}

export function ProfessorCourses({ courses, professorId }: ProfessorCoursesProps) {
  if (courses.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No hay materias registradas para este profesor.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-900">Materias que Enseña</h3>
      <div className="grid gap-4">
        {courses.map((course) => (
          <Card key={course.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="text-lg font-semibold text-gray-900">{course.name}</h4>
                    <Badge variant="secondary">{course.code}</Badge>
                  </div>

                  <p className="text-sm text-gray-600 mb-3">{course.department}</p>

                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{course.total_ratings} calificaciones</span>
                    </div>

                    {course.avg_overall_rating > 0 && (
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{course.avg_overall_rating.toFixed(1)}</span>
                      </div>
                    )}

                    {course.recommendation_percentage > 0 && (
                      <div className="flex items-center space-x-1">
                        <span className="text-green-600">
                          {course.recommendation_percentage.toFixed(0)}% recomendado
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="mt-2">
                    <Badge variant="outline">
                      {course.semester} {course.year}
                    </Badge>
                  </div>
                </div>

                <div className="ml-4">
                  <Link href={`/rate/${professorId}/${course.id}`}>
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
