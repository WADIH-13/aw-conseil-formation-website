import { NextResponse } from 'next/server'

import { createSupabaseAdminClient } from '@/lib/supabase/admin'
import { isCronAuthorized } from '@/lib/security/cronAuth'

export async function POST(request: Request) {
  const cronSecret = process.env.CRON_SECRET
  const authorization = request.headers.get('authorization')

  if (!isCronAuthorized(authorization, cronSecret)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createSupabaseAdminClient()
  const nowIso = new Date().toISOString()

  const { data, error } = await supabase
    .from('posts')
    .update({ status: 'published', published_at: nowIso })
    .eq('status', 'scheduled')
    .lte('publish_at', nowIso)
    .select('id')

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json({ published: data?.length ?? 0 })
}
