import { createServerSupabaseClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CourseStats } from "@/components/course/course-stats"
import { CourseProfessors } from "@/components/course/course-professors"
import { CourseReviews } from "@/components/course/course-reviews"
import { BookOpen, MapPin, Calendar, FileText } from "lucide-react"
import Link from "next/link"

interface CoursePageProps {
  params: {
    id: string
  }
}

export default async function CoursePage({ params }: CoursePageProps) {
  const supabase = await createServerSupabaseClient()

  // Fetch course summary data
  const { data: course, error: courseError } = await supabase
    .from("course_summary")
    .select("*")
    .eq("id", params.id)
    .single()

  if (courseError || !course) {
    notFound()
  }

  // Fetch professors who teach this course
  const { data: professors, error: professorsError } = await supabase
    .from("professor_course_ratings")
    .select("*")
    .eq("course_id", params.id)

  // Fetch individual ratings with professor information
  const { data: ratings, error: ratingsError } = await supabase
    .from("ratings")
    .select(`
      *,
      professors (
        name
      )
    `)
    .eq("course_id", params.id)
    .order("created_at", { ascending: false })

  // Transform ratings data to include professor info
  const ratingsWithProfessors =
    ratings?.map((rating) => ({
      ...rating,
      professor_name: rating.professors?.name || "Profesor no encontrado",
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
              <Link href="/courses">
                <Button variant="outline">Ver Todas las Materias</Button>
              </Link>
              <Link href="/professors">
                <Button variant="outline">Ver Profesores</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Course Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center">
                  <BookOpen className="h-12 w-12 text-white" />
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{course.name}</h1>
                  <Badge variant="secondary" className="text-lg px-3 py-1">
                    {course.code}
                  </Badge>
                  {course.avg_overall_rating > 0 && (
                    <Badge variant="secondary" className="text-lg px-3 py-1">
                      ⭐ {course.avg_overall_rating.toFixed(1)}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center space-x-4 text-gray-600 mb-4">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{course.department}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>{course.credits} créditos</span>
                  </div>
                </div>

                {course.description && (
                  <div className="mb-4">
                    <div className="flex items-start space-x-2">
                      <FileText className="h-4 w-4 text-gray-500 mt-1" />
                      <p className="text-gray-700 max-w-3xl">{course.description}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-500">
                    Registrado desde{" "}
                    {new Date(course.created_at).toLocaleDateString("es-AR", {
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
          <CourseStats
            totalRatings={course.total_ratings || 0}
            avgOverallRating={course.avg_overall_rating || 0}
            avgClarity={course.avg_clarity || 0}
            avgOrganization={course.avg_organization || 0}
            avgExpertise={course.avg_expertise || 0}
            avgFriendliness={course.avg_friendliness || 0}
            avgPunctuality={course.avg_punctuality || 0}
            avgDifficulty={course.avg_difficulty || 0}
            recommendationPercentage={course.recommendation_percentage || 0}
            credits={course.credits || 0}
            department={course.department || ""}
          />
        </div>

        {/* Professors */}
        <div className="mb-8">
          <CourseProfessors professors={professors || []} courseId={params.id} />
        </div>

        {/* Reviews */}
        <div>
          <CourseReviews ratings={ratingsWithProfessors} />
        </div>
      </div>
    </div>
  )
}
