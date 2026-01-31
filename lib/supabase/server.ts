import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { getSupabasePublicEnv } from './env'

export function createSupabaseServerClient() {
  const env = getSupabasePublicEnv()
  if (!env) {
    throw new Error('Supabase non configuré (NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY)')
  }

  const cookieStore = cookies()

  return createServerClient(env.url, env.anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options)
          }
        } catch {
          // setAll peut être appelé depuis un Server Component (read-only)
        }
      },
    },
  })
}

export async function getCurrentUser() {
  const supabase = createSupabaseServerClient()
  const { data } = await supabase.auth.getUser()
  return data.user
}
