import { createServerSupabaseClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ProfessorStats } from "@/components/professor/professor-stats"
import { ProfessorCourses } from "@/components/professor/professor-courses"
import { ProfessorReviews } from "@/components/professor/professor-reviews"
import { User, MapPin, Calendar } from "lucide-react"
import Link from "next/link"

interface ProfessorPageProps {
  params: {
    id: string
  }
}

export default async function ProfessorPage({ params }: ProfessorPageProps) {
  const supabase = await createServerSupabaseClient()

  // Fetch professor summary data
  const { data: professor, error: professorError } = await supabase
    .from("professor_summary")
    .select("*")
    .eq("id", params.id)
    .single()

  if (professorError || !professor) {
    notFound()
  }

  // Fetch professor courses
  const { data: courses, error: coursesError } = await supabase
    .from("professor_course_ratings")
    .select("*")
    .eq("professor_id", params.id)

  // Fetch individual ratings with course information
  const { data: ratings, error: ratingsError } = await supabase
    .from("ratings")
    .select(`
      *,
      courses (
        name,
        code
      )
    `)
    .eq("professor_id", params.id)
    .order("created_at", { ascending: false })

  // Transform ratings data to include course info
  const ratingsWithCourses =
    ratings?.map((rating) => ({
      ...rating,
      course_name: rating.courses?.name || "Materia no encontrada",
      course_code: rating.courses?.code || "N/A",
    })) || []

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
                <Button variant="outline">Ver Todos los Profesores</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Professor Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                  <User className="h-12 w-12 text-white" />
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{professor.name}</h1>
                  {professor.avg_overall_rating > 0 && (
                    <Badge variant="secondary" className="text-lg px-3 py-1">
                      ⭐ {professor.avg_overall_rating.toFixed(1)}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center space-x-4 text-gray-600 mb-4">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{professor.department}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>{professor.university}</span>
                  </div>
                </div>

                {professor.bio && <p className="text-gray-700 mb-4 max-w-3xl">{professor.bio}</p>}

                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-500">
                    Miembro desde{" "}
                    {new Date(professor.created_at).toLocaleDateString("es-AR", {
                      year: "numeric",
                      month: "long",
                    })}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="mb-8">
          <ProfessorStats
            totalRatings={professor.total_ratings || 0}
            avgOverallRating={professor.avg_overall_rating || 0}
            avgClarity={professor.avg_clarity || 0}
            avgOrganization={professor.avg_organization || 0}
            avgExpertise={professor.avg_expertise || 0}
            avgFriendliness={professor.avg_friendliness || 0}
            avgPunctuality={professor.avg_punctuality || 0}
            avgDifficulty={professor.avg_difficulty || 0}
            recommendationPercentage={professor.recommendation_percentage || 0}
            totalCourses={courses?.length || 0}
          />
        </div>

        {/* Courses */}
        <div className="mb-8">
          <ProfessorCourses courses={courses || []} professorId={params.id} />
        </div>

        {/* Reviews */}
        <div>
          <ProfessorReviews ratings={ratingsWithCourses} />
        </div>
      </div>
    </div>
  )
}
