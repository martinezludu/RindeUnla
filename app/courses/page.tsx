import { createServerSupabaseClient } from "@/lib/supabase/server"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { BookOpen, Star, Users, Search, GraduationCap } from "lucide-react"
import Link from "next/link"

export default async function CoursesPage() {
  const supabase = await createServerSupabaseClient()

  // Fetch all courses with their summary data
  const { data: courses, error } = await supabase
    .from("course_summary")
    .select("*")
    .order("avg_overall_rating", { ascending: false, nullsLast: true })

  // Group courses by department
  const coursesByDepartment =
    courses?.reduce(
      (acc, course) => {
        const dept = course.department || "Sin Departamento"
        if (!acc[dept]) {
          acc[dept] = []
        }
        acc[dept].push(course)
        return acc
      },
      {} as Record<string, typeof courses>,
    ) || {}

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              RINDEUNLA
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/professors">
                <Button variant="outline">Ver Profesores</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Materias de UNLA</h1>
          <p className="text-xl text-gray-600 mb-6">
            Explora y califica las materias de la Universidad Nacional de Lanús
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input placeholder="Buscar materia por nombre o código..." className="pl-10" />
          </div>
        </div>

        {/* Courses by Department */}
        {Object.keys(coursesByDepartment).length > 0 ? (
          <div className="space-y-8">
            {Object.entries(coursesByDepartment).map(([department, departmentCourses]) => (
              <div key={department}>
                <div className="flex items-center space-x-2 mb-4">
                  <GraduationCap className="h-6 w-6 text-blue-600" />
                  <h2 className="text-2xl font-bold text-gray-900">{department}</h2>
                  <Badge variant="secondary">{departmentCourses.length} materias</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {departmentCourses.map((course) => (
                    <Card key={course.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div>
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{course.name}</h3>
                              <Badge variant="outline">{course.code}</Badge>
                            </div>

                            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                              <span>{course.credits} créditos</span>
                            </div>

                            {course.description && (
                              <p className="text-sm text-gray-600 line-clamp-3 mb-3">{course.description}</p>
                            )}
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              {course.avg_overall_rating > 0 ? (
                                <div className="flex items-center space-x-1">
                                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  <span className="text-sm font-medium">{course.avg_overall_rating.toFixed(1)}</span>
                                </div>
                              ) : (
                                <span className="text-sm text-gray-500">Sin calificaciones</span>
                              )}

                              <div className="flex items-center space-x-1">
                                <Users className="h-4 w-4 text-gray-400" />
                                <span className="text-sm text-gray-600">{course.total_ratings || 0}</span>
                              </div>
                            </div>

                            {course.recommendation_percentage > 0 && (
                              <Badge variant="secondary" className="text-green-600">
                                {course.recommendation_percentage.toFixed(0)}% recomendado
                              </Badge>
                            )}
                          </div>

                          <Link href={`/course/${course.id}`}>
                            <Button className="w-full" size="sm">
                              Ver Materia
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No hay materias registradas</h3>
            <p className="text-gray-600">Las materias aparecerán aquí una vez que se registren en el sistema.</p>
          </div>
        )}
      </div>
    </div>
  )
}
