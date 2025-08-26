import { createServerSupabaseClient } from "@/lib/supabase/server"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { User, Star, Users, Search } from "lucide-react"
import Link from "next/link"

export default async function ProfessorsPage() {
  const supabase = await createServerSupabaseClient()

  // Fetch all professors with their summary data
  const { data: professors, error } = await supabase
    .from("professor_summary")
    .select("*")
    .order("avg_overall_rating", { ascending: false, nullsLast: true })

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
              <Link href="/courses">
                <Button variant="outline">Ver Materias</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Profesores de UNLA</h1>
          <p className="text-xl text-gray-600 mb-6">
            Encuentra y califica a los profesores de la Universidad Nacional de Lanús
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input placeholder="Buscar profesor por nombre o departamento..." className="pl-10" />
          </div>
        </div>

        {/* Professors Grid */}
        {professors && professors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {professors.map((professor) => (
              <Card key={professor.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                        <User className="h-8 w-8 text-white" />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">{professor.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{professor.department}</p>

                      <div className="flex items-center space-x-3 mb-3">
                        {professor.avg_overall_rating > 0 ? (
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{professor.avg_overall_rating.toFixed(1)}</span>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">Sin calificaciones</span>
                        )}

                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{professor.total_ratings || 0}</span>
                        </div>
                      </div>

                      {professor.recommendation_percentage > 0 && (
                        <Badge variant="secondary" className="mb-3">
                          {professor.recommendation_percentage.toFixed(0)}% recomendado
                        </Badge>
                      )}

                      {professor.bio && <p className="text-sm text-gray-600 line-clamp-2 mb-3">{professor.bio}</p>}

                      <Link href={`/professor/${professor.id}`}>
                        <Button className="w-full" size="sm">
                          Ver Perfil
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No hay profesores registrados</h3>
            <p className="text-gray-600">Los profesores aparecerán aquí una vez que se registren en el sistema.</p>
          </div>
        )}
      </div>
    </div>
  )
}
