'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useMemo, useState } from 'react'
import { isSupabaseConfigured } from '@/lib/supabase/env'
import { createSupabaseBrowserClient } from '@/lib/supabase/browser'

export default function AdminLoginPage() {
  const router = useRouter()
  const search = useSearchParams()
  const nextPath = useMemo(() => search?.get('next') || '/admin/sessions', [search])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const configured = isSupabaseConfigured()

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    try {
      setLoading(true)
      const supabase = createSupabaseBrowserClient()
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (signInError) throw signInError
      router.refresh()
      router.replace(nextPath)
    } catch (err: any) {
      setError(err?.message ?? 'Impossible de se connecter')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white">
      <section className="aw-hero-surface py-12 md:py-16">
        <div className="container-custom">
          <div className="max-w-xl mx-auto">
            <p className="text-sm tracking-[0.3em] uppercase text-black/50 mb-4">Espace administrateur</p>
            <h1 className="text-3xl md:text-4xl font-light text-black mb-3">Connexion</h1>
            <p className="text-gray-600 leading-relaxed">
              Accès réservé aux formateurs agréés et à l’équipe nationale.
            </p>

            {!configured && (
              <div className="mt-6 bg-white border border-black/10 rounded-2xl p-5">
                <p className="text-sm text-aw-red">
                  Supabase n’est pas configuré. Ajoutez `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
                </p>
              </div>
            )}

            <form onSubmit={onSubmit} className="mt-8 bg-white border border-black/5 rounded-2xl p-6 aw-card-surface">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs tracking-[0.24em] uppercase text-black/60 mb-2">Email</label>
                  <input
                    type="email"
                    required
                    className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-black/80"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-[0.24em] uppercase text-black/60 mb-2">Mot de passe</label>
                  <input
                    type="password"
                    required
                    className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-black/80"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {error && (
                  <p className="text-sm text-aw-red">{error}</p>
                )}

                <button type="submit" className="btn-primary w-full" disabled={!configured || loading}>
                  {loading ? 'Connexion…' : 'Se connecter'}
                </button>

                <div className="flex items-center justify-between text-sm text-black/60">
                  <Link href="/" className="hover:underline">Retour au site</Link>
                  <span>Besoin d’un accès ? Contactez l’équipe nationale.</span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
