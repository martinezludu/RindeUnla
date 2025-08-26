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

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = await createServerSupabaseClient()
    const authCheck = await checkAdminAuth(supabase)

    if (authCheck.error) {
      return NextResponse.json({ error: authCheck.error }, { status: authCheck.status })
    }

    const body = await request.json()
    const { name, code, department, description, credits } = body

    if (!name || !code || !department || !credits) {
      return NextResponse.json({ error: "Nombre, código, departamento y créditos son obligatorios" }, { status: 400 })
    }

    if (credits < 1 || credits > 12) {
      return NextResponse.json({ error: "Los créditos deben estar entre 1 y 12" }, { status: 400 })
    }

    // Check if another course has the same code
    const { data: existingCourse } = await supabase
      .from("courses")
      .select("id")
      .eq("code", code.trim().toUpperCase())
      .neq("id", params.id)
      .single()

    if (existingCourse) {
      return NextResponse.json({ error: "Ya existe otra materia con este código" }, { status: 409 })
    }

    const { data: course, error: updateError } = await supabase
      .from("courses")
      .update({
        name: name.trim(),
        code: code.trim().toUpperCase(),
        department: department.trim(),
        description: description?.trim() || null,
        credits: Number.parseInt(credits),
        updated_at: new Date().toISOString(),
      })
      .eq("id", params.id)
      .select()
      .single()

    if (updateError) {
      console.error("Error updating course:", updateError)
      return NextResponse.json({ error: "Error al actualizar materia" }, { status: 500 })
    }

    if (!course) {
      return NextResponse.json({ error: "Materia no encontrada" }, { status: 404 })
    }

    return NextResponse.json({ message: "Materia actualizada exitosamente", course })
  } catch (error) {
    console.error("Error in course PUT API:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = await createServerSupabaseClient()
    const authCheck = await checkAdminAuth(supabase)

    if (authCheck.error) {
      return NextResponse.json({ error: authCheck.error }, { status: authCheck.status })
    }

    // Check if course has ratings
    const { data: ratings } = await supabase.from("ratings").select("id").eq("course_id", params.id).limit(1)

    if (ratings && ratings.length > 0) {
      return NextResponse.json({ error: "No se puede eliminar una materia que tiene calificaciones" }, { status: 409 })
    }

    const { error: deleteError } = await supabase.from("courses").delete().eq("id", params.id)

    if (deleteError) {
      console.error("Error deleting course:", deleteError)
      return NextResponse.json({ error: "Error al eliminar materia" }, { status: 500 })
    }

    return NextResponse.json({ message: "Materia eliminada exitosamente" })
  } catch (error) {
    console.error("Error in course DELETE API:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
