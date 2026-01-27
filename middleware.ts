import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Si Supabase n'est pas configuré, on ne bloque pas l'accès (utile en dev).
  if (!url || !anonKey) return response

  if (!request.nextUrl.pathname.startsWith('/admin')) return response

  // Pages admin publiques
  if (request.nextUrl.pathname.startsWith('/admin/login')) return response

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        for (const { name, value, options } of cookiesToSet) {
          response.cookies.set(name, value, options)
        }
      },
    },
  })

  const { data } = await supabase.auth.getUser()

  if (!data.user) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/admin/login'
    redirectUrl.searchParams.set('next', request.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  return response
}

export const config = {
  matcher: ['/admin/:path*'],
}
