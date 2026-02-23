import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(req: Request) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.json(
      {
        error: 'Supabase non configuré (NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY)',
        items: [],
      },
      { status: 500 }
    )
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey)

  const { searchParams } = new URL(req.url)

  const q = (searchParams.get('q') || '').trim()
  const departmentCode = (searchParams.get('department_code') || '').trim()
  const regionCode = (searchParams.get('region_code') || '').trim()
  const limit = Math.min(parseInt(searchParams.get('limit') || '10', 10) || 10, 20)

  if (q.length < 2) {
    return NextResponse.json({ items: [] })
  }

  let query = supabase
    .from('cities')
    .select('insee_code, name, department_code, region_code')
    .ilike('name', `${q}%`)
    .order('name', { ascending: true })
    .limit(limit)

  if (departmentCode) query = query.eq('department_code', departmentCode)
  if (regionCode) query = query.eq('region_code', regionCode)

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message, items: [] }, { status: 500 })
  }

  return NextResponse.json({ items: data ?? [] })
}
