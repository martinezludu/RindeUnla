import { RatingForm } from "@/components/rating/rating-form"
import { AuthGuard } from "@/components/auth/auth-guard"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"

interface RatePageProps {
  params: {
    professorId: string
    courseId: string
  }
}

export default async function RatePage({ params }: RatePageProps) {
  const supabase = await createServerSupabaseClient()

  // Fetch professor and course information
  const [professorResult, courseResult] = await Promise.all([
    supabase.from("professors").select("id, name, department").eq("id", params.professorId).single(),
    supabase.from("courses").select("id, name, code").eq("id", params.courseId).single(),
  ])

  if (professorResult.error || courseResult.error) {
    notFound()
  }

  const professor = professorResult.data
  const course = courseResult.data

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">RINDEUNLA</h1>
            <p className="text-gray-600">Sistema de Calificación de Profesores</p>
          </div>

          <RatingForm
            professorId={params.professorId}
            courseId={params.courseId}
            professorName={professor.name}
            courseName={`${course.name} (${course.code})`}
            onSuccess={() => {
              // Redirect to professor page or show success message
              window.location.href = `/professor/${params.professorId}`
            }}
            onCancel={() => {
              // Go back to previous page
              window.history.back()
            }}
          />
        </div>
      </div>
    </AuthGuard>
  )
}
