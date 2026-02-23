import FranceMap from '@/components/FranceMap'
import Link from 'next/link'
import { getPublishedPartners } from '@/lib/partners/queries'

export const dynamic = 'force-dynamic'

export default async function PartenairesPage() {
  const partners = await getPublishedPartners()

  return (
    <div className="bg-white">
      <section className="aw-hero-surface py-20 border-b border-gray-100">
        <div className="container-custom">
          <p className="text-sm uppercase tracking-wide text-aw-red font-semibold mb-4">Partenaires</p>
          <h1 className="text-4xl md:text-5xl font-light text-black mb-6">
            Écosystème national de partenaires
          </h1>
          <div className="max-w-4xl flex flex-col gap-4">
            <p className="text-xl text-gray-700 leading-relaxed">
              Un cadre coordonné pour agir durablement sur la performance humaine et la libération de la charge mentale.
            </p>
          </div>
          <div className="max-w-4xl text-gray-700 space-y-4 leading-relaxed">
            <p>
              AW Conseil &amp; Formation construit un écosystème national libre de compétences, organisé autour d&apos;une conviction simple :
              les situations organisationnelles complexes exigent une coordination exigeante, des expertises complémentaires et une
              responsabilité partagée dans la durée.
            </p>
            <p>
              Chaque partenaire conserve son autonomie de pratique, son identité professionnelle et son champ d&apos;intervention.
              AW assure la cohérence stratégique, la lisibilité méthodologique et la coordination opérationnelle pour garantir un
              impact durable au service des organisations, des équipes et des décideurs.
            </p>
            <p>
              Cette ambition est nationale, progressive et maîtrisée. Elle repose sur la confiance, la clarté des rôles,
              l&apos;exigence de qualité et la capacité à travailler ensemble sans dilution des responsabilités.
            </p>
          </div>
          <div className="max-w-4xl flex justify-center mt-6">
            <a
              href="#reseau-partenaires"
              className="inline-flex items-center gap-3 rounded-full border border-aw-red/40 px-4 py-2 text-base font-semibold text-aw-red shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-aw-red hover:bg-aw-red/5"
            >
              Voir la liste des partenaires
              <span className="inline-block text-lg animate-bounce">&darr;</span>
            </a>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-light text-black mb-6">La logique de notre écosystème</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="aw-card-surface rounded-xl border border-black/5 p-6">
                <h3 className="text-lg font-medium text-black mb-3">Synergie des compétences</h3>
                <p className="text-gray-700 leading-relaxed text-sm">
                  Nous articulons des expertises complémentaires pour traiter des enjeux humains et organisationnels qui dépassent
                  les réponses isolées.
                </p>
              </div>

              <div className="aw-card-surface rounded-xl border border-black/5 p-6">
                <h3 className="text-lg font-medium text-black mb-3">Liberté et responsabilité</h3>
                <p className="text-gray-700 leading-relaxed text-sm">
                  Les partenaires agissent en professionnels indépendants, avec des engagements explicites sur la qualité,
                  la confidentialité et la responsabilité de leurs interventions.
                </p>
              </div>

              <div className="aw-card-surface rounded-xl border border-black/5 p-6">
                <h3 className="text-lg font-medium text-black mb-3">Coordination nationale</h3>
                <p className="text-gray-700 leading-relaxed text-sm">
                  AW pilote la cohérence d&apos;ensemble, structure les coopérations et sécurise la lisibilité des actions pour les
                  directions, les financeurs et les instances de gouvernance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 aw-diagonal-surface">
        <div className="container-custom space-y-8">
          <div className="max-w-2xl space-y-3">
            <p className="text-sm uppercase tracking-wide text-aw-red font-semibold">Carte de France</p>
            <h2 className="text-3xl font-light text-black">Un déploiement cohérent et progressif</h2>
            <p className="text-gray-700 leading-relaxed">
              La carte représente une dynamique nationale structurée : des points d&apos;ancrage complémentaires,
              coordonnés dans un même cadre de méthode et orientés vers un impact durable. Elle traduit une ambition
              maîtrisée : avancer avec rigueur, renforcer les coopérations utiles et garantir la qualité des interventions.
            </p>
          </div>
          <FranceMap />
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h2 className="text-3xl font-light text-black">Pourquoi devenir partenaire</h2>
              <div className="space-y-4">
                {[
                  'Contribuer à une dynamique nationale structurée autour de la performance humaine.',
                  'Déployer votre expertise dans un cadre clair, exigeant et coordonné.',
                  "Bénéficier d'une synergie professionnelle sans dilution de votre identité.",
                  'Participer à des démarches à fort niveau de responsabilité et de confiance.',
                  'Être recommandé dans l&apos;écosystème AW pour la qualité de votre contribution.',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
                    <span className="mt-2 h-1 w-8 rounded-full bg-aw-red-deep/40" aria-hidden="true" />
                    <p className="text-gray-700 text-sm leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl font-light text-black">Notre cadre commun</h2>
              <div className="aw-card-surface rounded-xl border border-black/5 p-6 space-y-4">
                <div>
                  <h3 className="text-base font-semibold text-black">Exigence professionnelle partagée</h3>
                  <p className="text-sm text-gray-700 leading-relaxed mt-1">
                    Méthode, rigueur, confidentialité et qualité d&apos;exécution sur l&apos;ensemble des interventions.
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-black">Coordination et traçabilité</h3>
                  <p className="text-sm text-gray-700 leading-relaxed mt-1">
                    AW structure les interactions, garantit la cohérence des actions et la lisibilité des résultats.
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-black">Responsabilités explicites</h3>
                  <p className="text-sm text-gray-700 leading-relaxed mt-1">
                    Chaque acteur intervient dans son périmètre, avec des engagements clairs vis-à-vis des organisations accompagnées.
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-black">Impact durable</h3>
                  <p className="text-sm text-gray-700 leading-relaxed mt-1">
                    Les coopérations sont orientées vers des effets mesurables, stables et appropriables dans le temps.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div id="reseau-partenaires" className="max-w-5xl mx-auto mt-12">
            <div className="flex items-end justify-between gap-4 flex-wrap mb-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-light text-black">Partenaires en réseau</h2>
                <p className="text-gray-700 leading-relaxed mt-2">
                  Une sélection de partenaires visibles au sein de l&apos;écosystème AW Conseil &amp; Formation.
                </p>
              </div>
              <Link
                href="/partenaires/inscription"
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-aw-red-deep rounded-[10px] hover:bg-aw-red-deep/90 transition-colors"
              >
                Proposer une fiche partenaire
              </Link>
            </div>

            {partners.length === 0 ? (
              <div className="border border-gray-100 rounded-2xl p-8 text-gray-600 text-sm">
                Les fiches partenaires seront affichées ici dès la première publication.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {partners.map((partner) => (
                  <Link
                    key={partner.id}
                    href={`/partenaires/${partner.slug}`}
                    className="aw-card-surface rounded-xl border border-black/5 p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="h-12 flex items-center">
                      <img src={partner.logo_url} alt={partner.name} className="max-h-10" />
                    </div>
                    <h3 className="text-base font-semibold text-black mt-4">{partner.name}</h3>
                    <p className="text-sm text-gray-700 leading-relaxed mt-2">{partner.short}</p>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="max-w-4xl mx-auto mt-12 text-center rounded-2xl border border-black/5 bg-white p-8 shadow-sm">
            <h2 className="text-2xl md:text-3xl font-light text-black mb-4">
              Construire un nouveau modèle de coopération, à l&apos;échelle nationale
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Si votre pratique s&apos;inscrit dans une logique de performance humaine, de responsabilité et de coopération structurée,
              nous vous invitons à prendre contact. Notre objectif est clair : renforcer une dynamique de confiance,
              coordonner les expertises utiles et produire un impact durable pour les organisations.
            </p>
            <Link
              href="/partenaires/inscription"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-aw-red-deep rounded-[10px] hover:bg-aw-red-deep/90 transition-colors"
            >
              Proposer une fiche partenaire
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
