import { SignupForm } from "@/components/auth/signup-form"
import { AuthGuard } from "@/components/auth/auth-guard"
import Link from "next/link"

export default function SignupPage() {
  return (
    <AuthGuard requireAuth={false}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">RINDEUNLA</h1>
            <p className="text-gray-600">Sistema de Calificación de Profesores</p>
          </div>

          <SignupForm />

          <div className="text-center">
            <p className="text-sm text-gray-600">
              ¿Ya tienes cuenta?{" "}
              <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
