import { createServerSupabaseClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()

    // Check authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const body = await request.json()
    const {
      professor_id,
      course_id,
      clarity,
      organization,
      expertise,
      friendliness,
      punctuality,
      comment,
      difficulty,
      would_recommend,
      semester,
      year,
    } = body

    // Validate required fields
    if (
      !professor_id ||
      !course_id ||
      !clarity ||
      !organization ||
      !expertise ||
      !friendliness ||
      !punctuality ||
      !difficulty ||
      !semester ||
      !year
    ) {
      return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 })
    }

    // Validate rating values
    const ratings = [clarity, organization, expertise, friendliness, punctuality, difficulty]
    if (ratings.some((rating) => rating < 1 || rating > 5)) {
      return NextResponse.json({ error: "Las calificaciones deben estar entre 1 y 5" }, { status: 400 })
    }

    // Check if user already rated this professor for this course
    const { data: existingRating } = await supabase
      .from("ratings")
      .select("id")
      .eq("professor_id", professor_id)
      .eq("course_id", course_id)
      .eq("user_id", user.id)
      .single()

    if (existingRating) {
      return NextResponse.json({ error: "Ya has calificado a este profesor para esta materia" }, { status: 409 })
    }

    // Verify professor and course exist
    const [professorCheck, courseCheck] = await Promise.all([
      supabase.from("professors").select("id").eq("id", professor_id).single(),
      supabase.from("courses").select("id").eq("id", course_id).single(),
    ])

    if (professorCheck.error || courseCheck.error) {
      return NextResponse.json({ error: "Profesor o materia no encontrados" }, { status: 404 })
    }

    // Insert the rating
    const { data: rating, error: insertError } = await supabase
      .from("ratings")
      .insert({
        professor_id,
        course_id,
        user_id: user.id,
        clarity,
        organization,
        expertise,
        friendliness,
        punctuality,
        comment: comment || null,
        difficulty,
        would_recommend: would_recommend || false,
        semester,
        year,
      })
      .select()
      .single()

    if (insertError) {
      console.error("Error inserting rating:", insertError)
      return NextResponse.json({ error: "Error al guardar la calificación" }, { status: 500 })
    }

    return NextResponse.json({ message: "Calificación guardada exitosamente", rating }, { status: 201 })
  } catch (error) {
    console.error("Error in ratings API:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    const { searchParams } = new URL(request.url)

    const professorId = searchParams.get("professor_id")
    const courseId = searchParams.get("course_id")
    const limit = Number.parseInt(searchParams.get("limit") || "50")
    const offset = Number.parseInt(searchParams.get("offset") || "0")

    let query = supabase
      .from("ratings")
      .select(`
        *,
        professors (name),
        courses (name, code)
      `)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1)

    if (professorId) {
      query = query.eq("professor_id", professorId)
    }

    if (courseId) {
      query = query.eq("course_id", courseId)
    }

    const { data: ratings, error } = await query

    if (error) {
      return NextResponse.json({ error: "Error al obtener calificaciones" }, { status: 500 })
    }

    return NextResponse.json({ ratings })
  } catch (error) {
    console.error("Error fetching ratings:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
