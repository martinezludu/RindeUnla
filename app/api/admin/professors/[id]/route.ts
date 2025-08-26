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
    const { name, department, bio } = body

    if (!name || !department) {
      return NextResponse.json({ error: "Nombre y departamento son obligatorios" }, { status: 400 })
    }

    const { data: professor, error: updateError } = await supabase
      .from("professors")
      .update({
        name: name.trim(),
        department: department.trim(),
        bio: bio?.trim() || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", params.id)
      .select()
      .single()

    if (updateError) {
      console.error("Error updating professor:", updateError)
      return NextResponse.json({ error: "Error al actualizar profesor" }, { status: 500 })
    }

    if (!professor) {
      return NextResponse.json({ error: "Profesor no encontrado" }, { status: 404 })
    }

    return NextResponse.json({ message: "Profesor actualizado exitosamente", professor })
  } catch (error) {
    console.error("Error in professor PUT API:", error)
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

    // Check if professor has ratings
    const { data: ratings } = await supabase.from("ratings").select("id").eq("professor_id", params.id).limit(1)

    if (ratings && ratings.length > 0) {
      return NextResponse.json({ error: "No se puede eliminar un profesor que tiene calificaciones" }, { status: 409 })
    }

    const { error: deleteError } = await supabase.from("professors").delete().eq("id", params.id)

    if (deleteError) {
      console.error("Error deleting professor:", deleteError)
      return NextResponse.json({ error: "Error al eliminar profesor" }, { status: 500 })
    }

    return NextResponse.json({ message: "Profesor eliminado exitosamente" })
  } catch (error) {
    console.error("Error in professor DELETE API:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
