import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { isSupabaseConfigured } from '@/lib/supabase/env'

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 })
  }

  try {
    const body = await request.json()

    const { full_name, title, email, phone, department_code, is_active } = body

    if (!full_name || !department_code) {
      return NextResponse.json(
        { error: 'Missing required fields: full_name, department_code' },
        { status: 400 }
      )
    }

    // Use service role key to bypass RLS
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!serviceRoleKey) {
      console.error('SUPABASE_SERVICE_ROLE_KEY is not configured')
      return NextResponse.json(
        { error: 'Service role key not configured' },
        { status: 500 }
      )
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      serviceRoleKey
    )

    // Create responsible
    const { data: responsible, error: createError } = await supabase
      .from('call_responsibles')
      .insert([{ full_name, title, email, phone, is_active: is_active ?? true }])
      .select()
      .single()

    if (createError) throw createError

    // Link to department
    const { error: assignError } = await supabase
      .from('call_department_assignments')
      .upsert(
        { department_code, responsible_id: responsible.id },
        { onConflict: 'department_code' }
      )

    if (assignError) throw assignError

    return NextResponse.json(responsible, { status: 201 })
  } catch (error: any) {
    console.error('Error creating responsible:', error)
    return NextResponse.json(
      { error: error?.message ?? 'Error creating responsible' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 })
  }

  try {
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!serviceRoleKey) {
      return NextResponse.json(
        { error: 'Service role key not configured' },
        { status: 500 }
      )
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      serviceRoleKey
    )

    const { searchParams } = new URL(request.url)
    const responsibleId = searchParams.get('id')

    if (!responsibleId) {
      return NextResponse.json({ error: 'Missing id parameter' }, { status: 400 })
    }

    // Delete booking first (cascade), availability rules, and assignment
    const { error: deleteError } = await supabase
      .from('call_responsibles')
      .update({ is_active: false })
      .eq('id', responsibleId)

    if (deleteError) throw deleteError

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error deleting responsible:', error)
    return NextResponse.json(
      { error: error?.message ?? 'Error deleting responsible' },
      { status: 500 }
    )
  }
}
