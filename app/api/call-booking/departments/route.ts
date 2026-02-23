import { NextResponse } from 'next/server'
import { isSupabaseConfigured } from '@/lib/supabase/env'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ message: 'Supabase non configuré.' }, { status: 501 })
  }

  try {
    const supabase = createSupabaseServerClient()

    const { data, error } = await supabase
      .from('call_department_assignments')
      .select('department_code, departments(name), responsible:responsible_id (id, full_name, title, is_active)')

    if (error) {
      return NextResponse.json({ message: 'Impossible de charger les départements.' }, { status: 500 })
    }

    const departments = (data ?? [])
      .filter((item) => {
        const responsible = Array.isArray(item.responsible) ? item.responsible[0] : item.responsible
        return responsible?.is_active
      })
      .map((item) => {
        const department = Array.isArray(item.departments) ? item.departments[0] : item.departments
        return {
          code: item.department_code,
          name: department?.name ?? 'Département',
        }
      })
      .sort((a, b) => a.code.localeCompare(b.code, 'fr'))

    return NextResponse.json({ departments })
  } catch (error) {
    return NextResponse.json({ message: 'Impossible de charger les départements.' }, { status: 500 })
  }
}
