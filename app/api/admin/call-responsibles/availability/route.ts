import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { isSupabaseConfigured } from '@/lib/supabase/env'

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 })
  }

  try {
    const body = await request.json()
    const { responsible_id, weekday, start_time, end_time, is_active } = body

    // Validation
    if (!responsible_id || weekday === undefined || !start_time || !end_time) {
      return NextResponse.json(
        { error: 'Missing fields: responsible_id, weekday, start_time, end_time' },
        { status: 400 }
      )
    }

    if (weekday < 0 || weekday > 6) {
      return NextResponse.json(
        { error: 'Invalid weekday (must be 0-6)' },
        { status: 400 }
      )
    }

    // Use service role key to bypass RLS
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!serviceRoleKey) {
      console.error('SUPABASE_SERVICE_ROLE_KEY not configured')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      serviceRoleKey,
      { db: { schema: 'public' } }
    )

    // Insert availability rule
    const { data, error } = await supabase
      .from('call_availability_rules')
      .insert({
        responsible_id,
        weekday: parseInt(String(weekday)),
        start_time,
        end_time,
        is_active: is_active !== false,
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      throw error
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error: any) {
    console.error('Error creating availability rule:', error)
    return NextResponse.json(
      { error: error?.message || 'Failed to create availability rule' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const ruleId = searchParams.get('id')

    if (!ruleId) {
      return NextResponse.json({ error: 'Missing id parameter' }, { status: 400 })
    }

    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!serviceRoleKey) {
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      serviceRoleKey,
      { db: { schema: 'public' } }
    )

    const { error } = await supabase
      .from('call_availability_rules')
      .delete()
      .eq('id', ruleId)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error deleting availability rule:', error)
    return NextResponse.json(
      { error: error?.message || 'Failed to delete availability rule' },
      { status: 500 }
    )
  }
}
