import 'server-only'

import { createClient } from '@supabase/supabase-js'

function getServiceRoleKey(): string {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!key) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY manquant (server-only)')
  }
  return key
}

export function createSupabaseAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!url) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL manquant')
  }

  return createClient(url, getServiceRoleKey(), {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  })
}
