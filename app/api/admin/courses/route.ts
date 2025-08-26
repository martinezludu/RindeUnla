import { createServerSupabaseClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

async function checkAdminAuth(supabase: any) {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return { error: "No autorizado", status: 401 }
  }

  const adminEmails = ["admin@unla.edu.ar", "admin@rindeunla.com"]
  const isAdmin = adminEmails.includes(user.email || "") || user.email?.endsWith("@unla.edu.ar")

  if (!isAdmin) {
    return { error: "Acceso denegado", status: 403 }
  }

  return { user }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    const authCheck = await checkAdminAuth(supabase)

    if (authCheck.error) {
      return NextResponse.json({ error: authCheck.error }, { status: authCheck.status })
    }

    const { data: courses, error } = await supabase.from("course_summary").select("*").order("name")

    if (error) {
      return NextResponse.json({ error: "Error al obtener materias" }, { status: 500 })
    }

    return NextResponse.json({ courses })
  } catch (error) {
    console.error("Error fetching courses:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    const authCheck = await checkAdminAuth(supabase)

    if (authCheck.error) {
      return NextResponse.json({ error: authCheck.error }, { status: authCheck.status })
    }

    const body = await request.json()
    const { name, code, department, description, credits } = body

    // Validate required fields
    if (!name || !code || !department || !credits) {
      return NextResponse.json({ error: "Nombre, código, departamento y créditos son obligatorios" }, { status: 400 })
    }

    // Validate credits
    if (credits < 1 || credits > 12) {
      return NextResponse.json({ error: "Los créditos deben estar entre 1 y 12" }, { status: 400 })
    }

    // Check if course code already exists
    const { data: existingCourse } = await supabase
      .from("courses")
      .select("id")
      .eq("code", code.trim().toUpperCase())
      .single()

    if (existingCourse) {
      return NextResponse.json({ error: "Ya existe una materia con este código" }, { status: 409 })
    }

    // Insert course
    const { data: course, error: insertError } = await supabase
      .from("courses")
      .insert({
        name: name.trim(),
        code: code.trim().toUpperCase(),
        department: department.trim(),
        description: description?.trim() || null,
        credits: Number.parseInt(credits),
      })
      .select()
      .single()

    if (insertError) {
      console.error("Error inserting course:", insertError)
      return NextResponse.json({ error: "Error al crear materia" }, { status: 500 })
    }

    return NextResponse.json({ message: "Materia creada exitosamente", course }, { status: 201 })
  } catch (error) {
    console.error("Error in courses POST API:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
