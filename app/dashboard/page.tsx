import { AuthGuard } from "@/components/auth/auth-guard"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Users, MessageCircle, Settings } from "lucide-react"
import Link from "next/link"

export default async function DashboardPage() {
  const supabase = await createServerSupabaseClient()

  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Check if user is admin
  const isAdmin = user?.email?.endsWith("@unla.edu.ar") || user?.email === "admin@rindeunla.com"

  // Fetch user's ratings
  const { data: userRatings } = await supabase
    .from("ratings")
    .select(`
      *,
      professors (name),
      courses (name, code)
    `)
    .eq("user_id", user?.id)
    .order("created_at", { ascending: false })

  // Fetch recent activity
  const { data: recentRatings } = await supabase
    .from("ratings")
    .select(`
      *,
      professors (name),
      courses (name, code)
    `)
    .order("created_at", { ascending: false })
    .limit(5)

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="text-2xl font-bold text-blue-600">
                RINDEUNLA
              </Link>
              <div className="flex items-center space-x-4">
                {isAdmin && (
                  <Link href="/admin">
                    <Button variant="outline">
                      <Settings className="h-4 w-4 mr-2" />
                      Admin
                    </Button>
                  </Link>
                )}
                <Link href="/professors">
                  <Button variant="outline">Ver Profesores</Button>
                </Link>
                <Link href="/courses">
                  <Button variant="outline">Ver Materias</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">¡Bienvenido a RINDEUNLA!</h1>
            <p className="text-gray-600">Tu plataforma para calificar y descubrir los mejores profesores de UNLA</p>
          </div>

          {/* Quick Stats */}
          <div className="grid gap-6 md:grid-cols-3 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageCircle className="h-5 w-5 text-blue-600" />
                  <span>Mis Calificaciones</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600 mb-2">{userRatings?.length || 0}</div>
                <p className="text-sm text-gray-600">profesores calificados</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-green-600" />
                  <span>Explorar</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Link href="/professors">
                  <Button className="w-full mb-2">Ver Profesores</Button>
                </Link>
                <Link href="/courses">
                  <Button variant="outline" className="w-full bg-transparent">
                    Ver Materias
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-600" />
                  <span>Contribuir</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">Ayuda a otros estudiantes compartiendo tu experiencia</p>
                <Link href="/professors">
                  <Button className="w-full">Calificar Profesor</Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* My Ratings */}
          {userRatings && userRatings.length > 0 && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Mis Calificaciones Recientes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userRatings.slice(0, 5).map((rating) => (
                    <div key={rating.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">
                          {rating.professors?.name} - {rating.courses?.name}
                        </h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm">{rating.overall_rating.toFixed(1)}</span>
                          </div>
                          <Badge variant="secondary">{rating.courses?.code}</Badge>
                          <span className="text-xs text-gray-500">
                            {new Date(rating.created_at).toLocaleDateString("es-AR")}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Actividad Reciente en la Plataforma</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentRatings?.map((rating) => (
                  <div key={rating.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">
                        {rating.professors?.name} - {rating.courses?.name}
                      </h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{rating.overall_rating.toFixed(1)}</span>
                        </div>
                        <Badge variant="secondary">{rating.courses?.code}</Badge>
                        <span className="text-xs text-gray-500">
                          {new Date(rating.created_at).toLocaleDateString("es-AR")}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthGuard>
  )
}
