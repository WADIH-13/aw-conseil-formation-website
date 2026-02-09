import Link from 'next/link'
import { notFound } from 'next/navigation'

import CoverImage from '@/components/blog/CoverImage'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { isSupabaseConfigured } from '@/lib/supabase/env'

export const dynamic = 'force-dynamic'

type PostRow = {
  title: string
  slug: string
  excerpt: string | null
  content: string | null
  cover_image_url: string
  published_at: string | null
  category: string
  tags: string[]
}

function splitParagraphs(raw: string): string[] {
  return raw
    .split(/\n\s*\n/g)
    .map((p) => p.trim())
    .filter(Boolean)
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  if (!isSupabaseConfigured()) return {}

  const supabase = createSupabaseServerClient()
  const { data } = await supabase
    .from('posts')
    .select('title, excerpt')
    .eq('slug', params.slug)
    .eq('status', 'published')
    .maybeSingle()

  if (!data) return {}

  return {
    title: `${data.title} - AW Conseil et Formation`,
    description: data.excerpt ?? undefined,
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  if (!isSupabaseConfigured()) notFound()

  const supabase = createSupabaseServerClient()
  const { data, error } = await supabase
    .from('posts')
    .select('title, slug, excerpt, content, cover_image_url, published_at, category, tags')
    .eq('slug', params.slug)
    .eq('status', 'published')
    .maybeSingle<PostRow>()

  if (error || !data) notFound()

  const paragraphs = splitParagraphs(data.content ?? '')
  const intro = paragraphs[0] ?? null
  const rest = paragraphs.slice(1)

  return (
    <div className="bg-white">
      <section className="aw-hero-surface py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <p className="text-sm tracking-[0.22em] uppercase text-black/50">Blog · Analyses & décryptages</p>
            <h1 className="mt-4 text-4xl md:text-5xl font-light text-black leading-tight">{data.title}</h1>
            {data.excerpt && (
              <p className="mt-6 text-lg md:text-xl text-gray-600 leading-relaxed">Sous-titre — {data.excerpt}</p>
            )}
          </div>

          <div className="mt-8 max-w-6xl mx-auto">
            <CoverImage src={data.cover_image_url} alt={`Image de couverture : ${data.title}`} ratio="21:9" priority />
          </div>
        </div>
      </section>

      <main className="container-custom py-14 md:py-18">
        <div className="max-w-4xl mx-auto space-y-12">
          {intro && (
            <section className="space-y-4">
              <p className="text-gray-700 leading-relaxed">{intro}</p>
            </section>
          )}

          {rest.length > 0 && (
            <section className="space-y-4">
              {rest.map((p, idx) => (
                <p key={idx} className="text-gray-700 leading-relaxed">
                  {p}
                </p>
              ))}
            </section>
          )}

          <section className="text-sm text-black/60 leading-relaxed">
            <p>
              <strong className="text-black/70 font-medium">Sources d’inspiration</strong> — Cet article s’inscrit dans la
              continuité de travaux et publications de référence sur la prévention des risques psychosociaux, notamment
              ceux diffusés par l’INRS. Les organismes cités sont mentionnés comme repères et sources d’inspiration ;
              aucune validation institutionnelle ni partenariat n’est revendiqué.
            </p>
          </section>

          <div className="pt-2">
            <Link href="/blog" className="text-sm font-medium text-aw-red hover:text-red-700">
              ← Retour au blog
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
