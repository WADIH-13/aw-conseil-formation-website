import { createBrowserClient } from '@supabase/ssr'
import { getSupabasePublicEnv } from './env'

function getDocumentCookiePairs(): Array<{ name: string; value: string }> {
  if (typeof document === 'undefined') return []
  const raw = document.cookie
  if (!raw) return []

  return raw
    .split(';')
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      const eqIndex = part.indexOf('=')
      if (eqIndex === -1) return { name: decodeURIComponent(part), value: '' }
      const name = part.slice(0, eqIndex)
      const value = part.slice(eqIndex + 1)
      return { name: decodeURIComponent(name), value: decodeURIComponent(value) }
    })
}

function serializeCookie(
  name: string,
  value: string,
  options?: {
    path?: string
    domain?: string
    maxAge?: number
    expires?: string | Date
    httpOnly?: boolean
    secure?: boolean
    sameSite?: boolean | 'lax' | 'strict' | 'none' | 'Lax' | 'Strict' | 'None'
  },
): string {
  const parts: string[] = []
  parts.push(`${encodeURIComponent(name)}=${encodeURIComponent(value)}`)

  if (options?.maxAge != null) parts.push(`Max-Age=${options.maxAge}`)
  if (options?.expires != null) {
    const expires = typeof options.expires === 'string' ? new Date(options.expires) : options.expires
    parts.push(`Expires=${expires.toUTCString()}`)
  }
  if (options?.path) parts.push(`Path=${options.path}`)
  if (options?.domain) parts.push(`Domain=${options.domain}`)

  // En navigateur, HttpOnly ne peut pas être défini (ignoré si présent).
  if (options?.secure) parts.push('Secure')
  if (options?.sameSite === true) parts.push('SameSite=Strict')
  else if (typeof options?.sameSite === 'string') parts.push(`SameSite=${options.sameSite}`)

  return parts.join('; ')
}

export function createSupabaseBrowserClient() {
  const env = getSupabasePublicEnv()
  if (!env) {
    throw new Error('Supabase non configuré (NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY)')
  }

  return createBrowserClient(env.url, env.anonKey, {
    cookies: {
      getAll() {
        return getDocumentCookiePairs().map(({ name, value }) => ({ name, value }))
      },
      setAll(cookiesToSet) {
        if (typeof document === 'undefined') return
        for (const { name, value, options } of cookiesToSet) {
          document.cookie = serializeCookie(name, value, options)
        }
      },
    },
  })
}
