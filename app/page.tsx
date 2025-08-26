import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Users, BookOpen, MessageCircle, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-blue-600">RINDEUNLA</div>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="outline">Iniciar Sesión</Button>
              </Link>
              <Link href="/signup">
                <Button>Registrarse</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Califica a tus Profesores</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            RINDEUNLA es la plataforma donde los estudiantes de la Universidad Nacional de Lanús pueden compartir sus
            experiencias y ayudar a otros a elegir los mejores profesores.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/professors">
              <Button size="lg" className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Ver Profesores</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/courses">
              <Button size="lg" variant="outline" className="flex items-center space-x-2 bg-transparent">
                <BookOpen className="h-5 w-5" />
                <span>Ver Materias</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid gap-8 md:grid-cols-3 mb-16">
          <Card className="text-center p-8">
            <CardContent className="space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Star className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold">Calificaciones Detalladas</h3>
              <p className="text-gray-600">
                Evalúa a los profesores en 5 criterios: claridad, organización, conocimiento, amabilidad y puntualidad.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-8">
            <CardContent className="space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <MessageCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold">Comentarios Reales</h3>
              <p className="text-gray-600">
                Lee experiencias auténticas de otros estudiantes para tomar mejores decisiones académicas.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-8">
            <CardContent className="space-y-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold">Comunidad Estudiantil</h3>
              <p className="text-gray-600">
                Únete a la comunidad de estudiantes de UNLA y contribuye con tu experiencia para ayudar a otros.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">¿Listo para comenzar?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Regístrate gratis y comienza a explorar las calificaciones de profesores, o comparte tu propia experiencia
            para ayudar a otros estudiantes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg">Crear Cuenta Gratis</Button>
            </Link>
            <Link href="/professors">
              <Button size="lg" variant="outline">
                Explorar sin Registro
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-2xl font-bold mb-2">RINDEUNLA</div>
            <p className="text-gray-400 mb-4">Sistema de Calificación de Profesores - Universidad Nacional de Lanús</p>
            <p className="text-sm text-gray-500">
              © 2024 RINDEUNLA. Hecho con ❤️ para la comunidad estudiantil de UNLA.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
