import { AdminGuard } from "@/components/admin/admin-guard"
import { AdminStats } from "@/components/admin/admin-stats"
import { ProfessorManagement } from "@/components/admin/professor-management"
import { CourseManagement } from "@/components/admin/course-management"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Settings, Users, BookOpen, BarChart3 } from "lucide-react"
import Link from "next/link"

export default async function AdminPage() {
  const supabase = await createServerSupabaseClient()

  // Fetch admin statistics
  const [{ data: professors }, { data: courses }, { data: ratings }, { count: totalUsers }] = await Promise.all([
    supabase.from("professor_summary").select("*"),
    supabase.from("course_summary").select("*"),
    supabase.from("ratings").select("overall_rating, created_at"),
    supabase.from("auth.users").select("*", { count: "exact", head: true }),
  ])

  // Calculate statistics
  const totalProfessors = professors?.length || 0
  const totalCourses = courses?.length || 0
  const totalRatings = ratings?.length || 0
  const avgRating = ratings?.length ? ratings.reduce((sum, r) => sum + r.overall_rating, 0) / ratings.length : 0

  // Recent ratings (last 7 days)
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
  const recentRatings = ratings?.filter((r) => new Date(r.created_at) > sevenDaysAgo).length || 0

  return (
    <AdminGuard>
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link href="/" className="text-2xl font-bold text-red-600">
                  RINDEUNLA Admin
                </Link>
                <div className="flex items-center space-x-1">
                  <Settings className="h-5 w-5 text-gray-500" />
                  <span className="text-sm text-gray-600">Panel de Administración</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Link href="/professors">
                  <Button variant="outline">Ver Sitio Público</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Panel de Administración</h1>
            <p className="text-gray-600">Gestiona profesores, materias y calificaciones del sistema RINDEUNLA</p>
          </div>

          {/* Statistics */}
          <div className="mb-8">
            <AdminStats
              totalProfessors={totalProfessors}
              totalCourses={totalCourses}
              totalRatings={totalRatings}
              totalUsers={totalUsers || 0}
              avgRating={avgRating}
              recentRatings={recentRatings}
            />
          </div>

          {/* Quick Actions */}
          <div className="grid gap-6 md:grid-cols-3 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span>Gestión de Profesores</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Administra la información de los profesores registrados en el sistema.
                </p>
                <div className="text-2xl font-bold text-blue-600 mb-2">{totalProfessors}</div>
                <p className="text-xs text-gray-500">profesores registrados</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5 text-green-600" />
                  <span>Gestión de Materias</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Administra el catálogo de materias disponibles en la universidad.
                </p>
                <div className="text-2xl font-bold text-green-600 mb-2">{totalCourses}</div>
                <p className="text-xs text-gray-500">materias disponibles</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-purple-600" />
                  <span>Estadísticas</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">Monitorea la actividad y calidad de las calificaciones.</p>
                <div className="text-2xl font-bold text-purple-600 mb-2">{avgRating.toFixed(1)}</div>
                <p className="text-xs text-gray-500">promedio general</p>
              </CardContent>
            </Card>
          </div>

          {/* Management Sections */}
          <div className="space-y-8">
            <ProfessorManagement professors={professors || []} onRefresh={() => window.location.reload()} />
            <CourseManagement courses={courses || []} onRefresh={() => window.location.reload()} />
          </div>
        </div>
      </div>
    </AdminGuard>
  )
}
