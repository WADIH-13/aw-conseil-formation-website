import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { isSupabaseConfigured } from '@/lib/supabase/env'

export async function POST(request: Request) {
  if (isSupabaseConfigured()) {
    const supabase = createSupabaseServerClient()
    await supabase.auth.signOut()
  }

  const origin = new URL(request.url).origin
  return NextResponse.redirect(new URL('/', origin))
}
