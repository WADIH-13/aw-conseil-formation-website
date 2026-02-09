import Link from 'next/link'
import Indicators from './Indicators'
import CtaGroup from '@/components/cta/CtaGroup'

type Module = {
  title: string
  bullets?: string[]
  description?: string
}

type Props = {
  title: string
  subtitle?: string
  duration: string
  format: string
  level?: string
  audienceShort?: string
  context: string
  audience: string[]
  objectives: string[]
  programme: Module[]
  methods: string[]
  evaluation: string
  plus: string[]
  financing: string[]
  ctaContactHref?: string
  ctaOfferSlug?: string
  ctaOfferLabel?: string
  indicators?: {
    year?: number | string
    satisfaction?: number | string | null
    objectives?: number | string | null
    participation?: number | string | null
  }
}

export default function FormationTemplate({
  title,
  subtitle,
  duration,
  format,
  level,
  audienceShort,
  context,
  audience,
  objectives,
  programme,
  methods,
  evaluation,
  plus,
  financing,
  ctaContactHref = '/contact',
  ctaOfferSlug,
  ctaOfferLabel,
  indicators,
}: Props) {
  return (
    <div className="bg-white formation-single">
      <section className="aw-hero-surface py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="text-sm text-aw-red font-medium mb-4">Formation - {duration}</div>
              <h1 className="text-4xl md:text-5xl font-light text-black mb-6 leading-tight">{title}</h1>
              {subtitle && (
                <p className="text-xl text-gray-600 leading-relaxed">{subtitle}</p>
              )}
              <div className="mt-6 flex justify-center">
                <CtaGroup
                  context="formation"
                  offerHref={ctaOfferSlug}
                  offerSlug={ctaOfferSlug}
                  offerLabel={ctaOfferLabel ?? title}
                  showMicroText
                  showProgram
                  showSessionsOrModalities
                  hasSessions={false}
                  primaryVariant="primary"
                  secondaryVariant="secondary"
                />
              </div>
            </div>
            <div className="aw-card-surface p-6 rounded-2xl border border-black/5">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="font-medium text-black">Durée</div>
                  <div className="text-gray-700">{duration}</div>
                </div>
                <div>
                  <div className="font-medium text-black">Format</div>
                  <div className="text-gray-700">{format}</div>
                </div>
                <div>
                  <div className="font-medium text-black">Niveau</div>
                  <div className="text-gray-700">{level ?? 'Tous niveaux'}</div>
                </div>
                <div>
                  <div className="font-medium text-black">Public</div>
                  <div className="text-gray-700">{audienceShort ?? 'Voir détail'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* At-a-glance quick info */}
      <div className="container-custom max-w-4xl mx-auto mt-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 text-sm text-gray-700">
          <div className="inline-flex items-center gap-3">
            <span className="font-medium text-black">Durée</span>
            <span className="text-gray-600">{duration}</span>
          </div>
          <div className="hidden sm:block">·</div>
          <div className="inline-flex items-center gap-3">
            <span className="font-medium text-black">Format</span>
            <span className="text-gray-600">{format}</span>
          </div>
          <div className="hidden sm:block">·</div>
          <div className="inline-flex items-center gap-3">
            <span className="font-medium text-black">Niveau</span>
            <span className="text-gray-600">{level ?? 'Tous niveaux'}</span>
          </div>
        </div>
      </div>

      <main className="container-custom max-w-6xl mx-auto space-y-12">
        <section>
          <h2 className="text-2xl font-light text-black mb-4">Contexte & utilité</h2>
          <p className="text-gray-700 leading-relaxed">{context}</p>
        </section>

        <section aria-label="Adaptation aux contextes métiers">
          <div className="rounded-2xl border border-black/5 bg-black/[0.02] p-6">
            <h2 className="text-base font-medium text-black">Adaptation aux contextes métiers</h2>
            <p className="mt-2 text-sm text-gray-700 leading-relaxed">
              Les exemples, études de cas et mises en situation peuvent être adaptés, lorsque cela est pertinent, à votre secteur et à vos
              branches d’activités. Cette adaptation s’inscrit dans une approche structurée, alignée avec des repères institutionnels et
              scientifiques.
            </p>
            <p className="mt-3 text-sm">
              <Link href="/regard-scientifique" className="underline underline-offset-4 text-black/80 hover:text-black">
                Consulter nos repères (Regards scientifiques)
              </Link>
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-light text-black mb-4">À qui s’adresse cette formation</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            {audience.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-light text-black mb-4">Objectifs pédagogiques</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            {objectives.map((o, i) => (
              <li key={i}>{o}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-light text-black mb-4">Programme détaillé</h2>
          <div className="space-y-6">
            {programme.map((m, i) => (
              <div key={i} className="aw-card-surface p-6 rounded-2xl border border-black/5">
                <h3 className="text-lg font-medium text-black mb-2">{m.title}</h3>
                {m.description && <p className="text-gray-700 mb-2">{m.description}</p>}
                {m.bullets && (
                  <ul className="list-disc list-inside text-gray-700">
                    {m.bullets.map((b, bi) => (
                      <li key={bi}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-light text-black mb-4">Méthodes pédagogiques</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            {methods.map((m, i) => (
              <li key={i}>{m}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-light text-black mb-4">Évaluation & validation</h2>
          <p className="text-gray-700 leading-relaxed">{evaluation}</p>
        </section>

        <section>
          <h2 className="text-2xl font-light text-black mb-4">Les + de cette formation</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            {plus.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </section>

        <section id="modalites">
          <h2 className="text-2xl font-light text-black mb-4">Financement & modalités</h2>
          <ul className="text-gray-700 space-y-2">
            {financing.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </section>

          {/* Indicateurs de résultats — composant réutilisable */}
          {/**
           * N.B. : Aucun pourcentage n'est inventé ici — si aucune donnée
           * n'est fournie via la prop `indicators`, le composant affichera
           * des placeholders.
           */}
          <Indicators
            year={indicators?.year}
            satisfaction={indicators?.satisfaction}
            objectives={indicators?.objectives}
            participation={indicators?.participation}
          />

          <section id="dates">
          <h2 className="text-2xl font-light text-black mb-4">Dates & sessions</h2>
          <p className="text-gray-700 mb-6">Contactez-nous pour les sessions programmées ou une session intra-entreprise.</p>
          <div className="flex gap-4">
              <CtaGroup
                context="formation"
                offerHref={ctaOfferSlug}
                offerSlug={ctaOfferSlug}
                offerLabel={ctaOfferLabel ?? title}
                showProgram
                showSessionsOrModalities
                hasSessions={false}
                primaryVariant="primary"
                secondaryVariant="secondary"
              />
          </div>
        </section>
      </main>
    </div>
  )
}
