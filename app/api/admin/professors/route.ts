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

  // Check if user is admin
  const adminEmails = ["admin@unla.edu.ar", "admin@rindeunla.com"]
  const isAdmin = adminEmails.includes(user.email || "") || user.email?.endsWith("@unla.edu.ar")

  if (!isAdmin) {
    return { error: "Acceso denegado - Se requieren permisos de administrador", status: 403 }
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

    const { data: professors, error } = await supabase.from("professor_summary").select("*").order("name")

    if (error) {
      return NextResponse.json({ error: "Error al obtener profesores" }, { status: 500 })
    }

    return NextResponse.json({ professors })
  } catch (error) {
    console.error("Error fetching professors:", error)
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
    const { name, department, bio } = body

    // Validate required fields
    if (!name || !department) {
      return NextResponse.json({ error: "Nombre y departamento son obligatorios" }, { status: 400 })
    }

    // Insert professor
    const { data: professor, error: insertError } = await supabase
      .from("professors")
      .insert({
        name: name.trim(),
        department: department.trim(),
        bio: bio?.trim() || null,
      })
      .select()
      .single()

    if (insertError) {
      console.error("Error inserting professor:", insertError)
      return NextResponse.json({ error: "Error al crear profesor" }, { status: 500 })
    }

    return NextResponse.json({ message: "Profesor creado exitosamente", professor }, { status: 201 })
  } catch (error) {
    console.error("Error in professors POST API:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
