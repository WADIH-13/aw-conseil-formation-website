import Link from 'next/link'

import { createSupabaseServerClient } from '@/lib/supabase/server'
import { isSupabaseConfigured } from '@/lib/supabase/env'

export const dynamic = 'force-dynamic'

type BlogPost = {
  title: string
  subtitle?: string
  excerpt?: string
  category: string
  readingTime?: string
  href: string
  badge?: string
}

type DbPostRow = {
  title: string
  slug: string
  excerpt: string | null
  content: string | null
  published_at: string | null
  category: string
}

function estimateReadingTimeMinutes(content: string | null | undefined): number {
  const text = (content ?? '').trim()
  if (!text) return 5
  const words = text.split(/\s+/).filter(Boolean).length
  return Math.max(3, Math.round(words / 200))
}

async function getPublishedDbPosts(): Promise<BlogPost[]> {
  if (!isSupabaseConfigured()) return []

  const supabase = createSupabaseServerClient()
  const { data, error } = await supabase
    .from('posts')
    .select('title, slug, excerpt, content, published_at, category')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(50)

  if (error || !data) return []

  return (data as DbPostRow[]).map((row) => {
    const mins = estimateReadingTimeMinutes(row.content)
    return {
      title: row.title,
      subtitle: row.excerpt ?? undefined,
      excerpt: row.excerpt ?? undefined,
      category: row.category || 'Analyses & décryptages · Charge mentale & RPS',
      readingTime: `${mins} min`,
      href: `/blog/${row.slug}`,
    }
  })
}

const seriesPosts: BlogPost[] = [
  {
    title: 'Transitions et priorités mouvantes : prévenir la charge mentale et les RPS',
    subtitle: 'Stabiliser les arbitrages, les interfaces et la coopération en période de changement.',
    excerpt:
      'Quand les priorités changent vite, la charge mentale monte. Un repère organisationnel pour éviter l’arbitrage permanent et sécuriser la prévention.',
    category: 'Analyses & décryptages · Charge mentale & RPS',
    readingTime: '8 min',
    href: '/blog/transitions-priorites-charge-mentale-rps',
    badge: 'Épisode 1/3',
  },
  {
    title: 'Langage commun et prévention : mettre des mots utiles sur la charge mentale',
    subtitle: 'Construire un vocabulaire partagé, ancré dans le travail réel, pour agir collectivement.',
    excerpt:
      'Sans mots partagés, la prévention se dilue. Repères pour décrire les mécanismes de surcharge sans personnaliser, et choisir des actions cohérentes.',
    category: 'Analyses & décryptages · Charge mentale & RPS',
    readingTime: '7 min',
    href: '/blog/langage-prevention-rps-charge-mentale',
    badge: 'Épisode 2/3',
  },
  {
    title: 'Rituels et micro-ajustements : stabiliser la coopération au quotidien',
    subtitle: 'Des routines de travail utiles pour réduire la dispersion et protéger l’attention.',
    excerpt:
      'Des ajustements modestes peuvent produire de grands effets lorsqu’ils réduisent les compensations permanentes et rendent la coopération plus lisible.',
    category: 'Analyses & décryptages · Charge mentale & RPS',
    readingTime: '8 min',
    href: '/blog/rituels-micro-ajustements-charge-mentale-rps',
    badge: 'Épisode 3/3',
  },
]

const reperePosts: BlogPost[] = [
  {
    title: 'Charge mentale et RPS : pourquoi la prévention doit se mettre à jour',
    subtitle: 'Un repère transversal pour relire les contraintes et éviter les approches non actualisées.',
    excerpt:
      'Les repères évoluent. Un décryptage organisationnel pour renforcer une prévention collective, utile et durable.',
    category: 'Repères · Prévention organisationnelle',
    readingTime: '9 min',
    href: '/blog/charge-mentale-rps-prevention-se-mettre-a-jour',
  },
  {
    title: 'Organisation du travail et charge mentale : repères pour une prévention RPS collective',
    subtitle: 'Rendre lisibles flux, arbitrages et interfaces pour agir sans personnaliser.',
    excerpt:
      'Un cadrage sobre pour relier la charge mentale aux mécanismes du travail réel, puis stabiliser des règles de fonctionnement.',
    category: 'Repères · Organisation du travail',
    readingTime: '8 min',
    href: '/blog/organisation-travail-charge-mentale-rps',
  },
]

function PostCard({ post }: { post: BlogPost }) {
  return (
    <article className="aw-card-surface rounded-2xl border border-black/5 p-6 md:p-7 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)]">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-xs tracking-[0.22em] uppercase text-black/50">{post.category}</p>
          {post.badge && (
            <span className="inline-flex items-center rounded-full border border-black/10 bg-black/[0.03] px-3 py-1 text-xs font-medium text-black/70">
              {post.badge}
            </span>
          )}
        </div>
        <h2 className="text-2xl md:text-3xl font-light text-black leading-snug">{post.title}</h2>
        {post.subtitle && <p className="text-base text-black/70 leading-relaxed">{post.subtitle}</p>}
        {post.excerpt && <p className="text-gray-700 leading-relaxed text-base">{post.excerpt}</p>}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <span className="text-sm text-gray-600">{post.readingTime ?? ''}</span>
        <Link href={post.href} className="text-sm font-medium text-aw-red hover:text-red-700">
          Lire l’article →
        </Link>
      </div>
    </article>
  )
}

export default async function BlogPage() {
  const publishedDbPosts = await getPublishedDbPosts()

  return (
    <div className="bg-white">
      <section className="aw-hero-surface py-16 md:py-24">
        <div className="container-custom space-y-6">
          <p className="text-sm tracking-[0.22em] uppercase text-black/50">Regards scientifiques</p>
          <h1 className="text-4xl md:text-5xl font-light text-black">Analyses & décryptages</h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl leading-relaxed">
            Des articles de fond, en posture de cabinet, pour éclairer la charge mentale, les RPS et la prévention
            organisationnelle. Objectif : rendre les mécanismes lisibles et les leviers discutables collectivement.
          </p>
        </div>
      </section>

      <section className="py-16 aw-diagonal-surface">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-3xl">
              <p className="text-sm tracking-[0.22em] uppercase text-black/50">Série</p>
              <h2 className="mt-2 text-3xl md:text-4xl font-light text-black">Charge mentale & RPS</h2>
              <p className="mt-5 text-lg text-gray-700 leading-relaxed">
                Trois articles pensés comme une série cohérente : transitions et priorités, langage commun et prévention,
                rituels et micro-ajustements.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
              {seriesPosts.map((post) => (
                <PostCard key={post.href} post={post} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-3xl">
              <p className="text-sm tracking-[0.22em] uppercase text-black/50">Repères</p>
              <h2 className="mt-2 text-3xl md:text-4xl font-light text-black">Pour aller plus loin</h2>
              <p className="mt-5 text-lg text-gray-700 leading-relaxed">
                Des lectures transversales pour situer les enjeux et garder des repères d’actualité.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              {publishedDbPosts.map((post) => (
                <PostCard key={post.href} post={post} />
              ))}
              {reperePosts.map((post) => (
                <PostCard key={post.href} post={post} />
              ))}
            </div>

            <div className="mt-10 rounded-2xl border border-black/5 bg-black/[0.02] p-6 md:p-7">
              <p className="text-gray-700 leading-relaxed">
                Prolongement naturel :{' '}
                <Link
                  href="/veille-actualites-scientifiques"
                  className="underline underline-offset-4 text-black/80 hover:text-black"
                >
                  la veille scientifique
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
