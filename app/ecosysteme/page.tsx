import Link from 'next/link'

export const metadata = {
  title: 'Écosystème — AW Conseil et Formation',
  description:
    "Un écosystème coordonné de compétences pour structurer des démarches collectives durables.",
}

export default function EcosystemePage() {
  return (
    <div className="bg-white">
      {/* HERO */}
      <section className="aw-hero-surface py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-light text-black mb-6 leading-tight">
              Un écosystème coordonné pour agir sur le fonctionnement collectif
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
              AW Conseil &amp; Formation orchestre un ensemble de compétences complémentaires
              pour répondre à des situations humaines et organisationnelles complexes,
              dans un cadre professionnel, structuré et lisible.
            </p>
          </div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-gray-700 space-y-4">
            <p>
              Certaines situations demandent plus qu’un levier isolé. Elles exigent une coordination
              claire, des expertises adaptées et un cadre partagé pour agir sans dispersion.
            </p>
            <p>
              Pour la personne engagée dans une situation complexe, l’écosystème apporte des repères
              concrets. Pour le décideur, il garantit un dispositif cohérent, pilotable et compatible
              avec les exigences des financeurs et des partenaires publics.
            </p>
          </div>
        </div>
      </section>

      {/* PRINCIPE DE FONCTIONNEMENT */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-medium text-black mb-6">
              Principe de fonctionnement de l’écosystème
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
              <li className="flex items-start">
                <span className="text-aw-red mr-3 mt-1">•</span>
                <span>Coordination assurée par AW Conseil &amp; Formation.</span>
              </li>
              <li className="flex items-start">
                <span className="text-aw-red mr-3 mt-1">•</span>
                <span>Cadre méthodologique commun et exigences qualité partagées.</span>
              </li>
              <li className="flex items-start">
                <span className="text-aw-red mr-3 mt-1">•</span>
                <span>Confidentialité et respect des responsabilités internes.</span>
              </li>
              <li className="flex items-start">
                <span className="text-aw-red mr-3 mt-1">•</span>
                <span>Cohérence des interventions et lisibilité pour les financeurs.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* TYPOLOGIE DES COMPÉTENCES */}
      <section className="py-16 aw-diagonal-surface">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-medium text-black mb-6">
              Typologie des compétences mobilisables
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
              <li className="flex items-start">
                <span className="text-aw-red mr-3 mt-1">•</span>
                <span>Conseil et cadrage des démarches.</span>
              </li>
              <li className="flex items-start">
                <span className="text-aw-red mr-3 mt-1">•</span>
                <span>Observation collective et repères partagés.</span>
              </li>
              <li className="flex items-start">
                <span className="text-aw-red mr-3 mt-1">•</span>
                <span>Formation et montée en compétences.</span>
              </li>
              <li className="flex items-start">
                <span className="text-aw-red mr-3 mt-1">•</span>
                <span>Ateliers de mise en pratique et consolidation.</span>
              </li>
              <li className="flex items-start">
                <span className="text-aw-red mr-3 mt-1">•</span>
                <span>Accompagnement dans la durée.</span>
              </li>
              <li className="flex items-start">
                <span className="text-aw-red mr-3 mt-1">•</span>
                <span>
                  Leviers ponctuels expérientiels ou corporels, intégrés à un cadre professionnel défini.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* PARTENAIRES ET INITIATIVES ASSOCIÉES */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-medium text-black mb-6">
              Partenaires et initiatives associées
            </h2>
            <p className="text-gray-700 mb-6">
              Certains lieux ou initiatives partenaires peuvent être mobilisés dans des cadres spécifiques.
              Ils ne se substituent jamais à l’accompagnement professionnel piloté par AW, et s’inscrivent
              dans une logique de complémentarité.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link
                href="/guide-essor"
                className="aw-card-surface p-6 rounded-2xl border border-black/5 text-left hover:shadow-lg"
              >
                <h3 className="text-lg font-semibold mb-2">Le Guide d’Essor</h3>
                <p className="text-gray-600">
                  Lieu partenaire mobilisable pour des séquences d’expérimentation encadrées.
                </p>
              </Link>
              <Link
                href="/partenaires"
                className="aw-card-surface p-6 rounded-2xl border border-black/5 text-left hover:shadow-lg"
              >
                <h3 className="text-lg font-semibold mb-2">Réseau de partenaires</h3>
                <p className="text-gray-600">
                  Compétences spécialisées mobilisées selon les besoins des démarches.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* POURQUOI CET ÉCOSYSTÈME EXISTE */}
      <section className="py-16 aw-diagonal-surface">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-medium text-black mb-6">
              Pourquoi cet écosystème existe
            </h2>
            <div className="text-gray-700 space-y-4">
              <p>Le fonctionnement collectif se comprend. La compréhension est un levier d’action.</p>
              <p>Agir demande du cadre, des repères partagés et des compétences coordonnées.</p>
              <p>Prévenir dans la durée suppose une démarche structurée, lisible et suivie.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CONCLUSION */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-light text-black mb-4">
              Une autonomie progressive, sans dépendance
            </h2>
            <p className="text-gray-700 mb-8">
              L’objectif est de rendre les organisations plus autonomes dans la durée. L’écosystème
              n’est pas un substitut : il accompagne, structure et facilite l’appropriation des leviers.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-aw-red-deep border border-aw-red-deep rounded-[10px] transition-colors"
              >
                Structurer une démarche avec nous
              </Link>
              <Link
                href="/formations"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-aw-ink border border-black/10 rounded-[10px] transition-colors"
              >
                Découvrir nos formations
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
