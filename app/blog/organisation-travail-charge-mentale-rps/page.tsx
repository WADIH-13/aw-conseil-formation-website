import Link from 'next/link'

import CoverImage from '@/components/blog/CoverImage'

export const metadata = {
  title: "Organisation du travail et charge mentale : repères pour une prévention RPS collective - AW Conseil et Formation",
  description:
    "Repères sobres pour relier charge mentale et RPS à l'organisation du travail : flux, arbitrages, interfaces, règles de priorité et coopération.",
}

export default function ArticleOrganisationTravailChargeMentaleRpsPage() {
  return (
    <div className="bg-white">
      <section className="aw-hero-surface py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <p className="text-sm tracking-[0.22em] uppercase text-black/50">Blog · Analyses & décryptages</p>
            <h1 className="mt-4 text-4xl md:text-5xl font-light text-black leading-tight">
              Organisation du travail et charge mentale : repères pour une prévention RPS collective
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-600 leading-relaxed">
              Sous-titre — La charge mentale n’est pas seulement une affaire de « surcharge » individuelle. Elle augmente
              quand le travail impose des compensations permanentes : arbitrages sans cadre, informations dispersées,
              interfaces floues, priorités instables. Ces repères aident à agir au niveau organisationnel.
            </p>
          </div>

          <div className="mt-8 max-w-6xl mx-auto">
            <CoverImage
              src="/blog-covers/organisation-travail.svg"
              alt="Illustration sobre : organisation du travail, flux et coordination"
              ratio="21:9"
              priority
            />
          </div>
        </div>
      </section>

      <main className="container-custom py-14 md:py-18">
        <div className="max-w-4xl mx-auto space-y-12">
          <section className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              Dans une posture de prévention, l’enjeu n’est pas de qualifier les personnes. Il est de rendre lisibles les
              mécanismes du travail : ce qui est demandé, ce qui change, ce qui manque, ce qui se rattrape, et ce qui est
              arbitré au quotidien.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Cet article propose un cadrage simple : repérer les points où l’organisation « consomme » de l’attention et
              multiplie les tâches ouvertes, puis sécuriser des règles de fonctionnement (priorisation, interfaces,
              décisions, flux d’information) qui permettent au collectif de coopérer sans sur-sollicitation.
            </p>

            <div className="aw-card-surface rounded-2xl border border-black/5 p-6 md:p-7">
              <p className="text-sm tracking-[0.22em] uppercase text-black/50">À retenir</p>
              <ul className="mt-4 list-disc list-inside text-gray-700 space-y-2">
                <li>La charge mentale grimpe quand le travail exige de compenser en continu.</li>
                <li>Une prévention utile stabilise des règles : priorités, décisions, interfaces, flux.</li>
                <li>On agit mieux quand on décrit les faits de travail, pas des traits individuels.</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-light text-black">1) Là où l’organisation fabrique de la charge mentale</h2>
            <p className="text-gray-700 leading-relaxed">
              La charge mentale augmente lorsque le système de travail crée des « tâches invisibles » : reconstituer
              l’information, re-prioriser, relancer, rattraper, expliquer à nouveau, contourner des outils, combler des
              zones grises.
            </p>
            <div className="aw-card-surface rounded-2xl border border-black/5 p-6 md:p-7">
              <p className="text-sm tracking-[0.22em] uppercase text-black/50">Repères de lecture (sobres)</p>
              <ul className="mt-4 list-disc list-inside text-gray-700 space-y-2">
                <li>Priorités trop nombreuses, ou changeantes sans point d’arbitrage identifié.</li>
                <li>Décisions tardives : la pression se déplace vers l’exécution.</li>
                <li>Multi-canaux d’entrée (mail, messagerie, réunions) sans tri ni règles d’usage.</li>
                <li>Interfaces floues : qui valide, qui tranche, qui coordonne, qui informe.</li>
                <li>Peu de marges de manœuvre : impossible de préparer, consolider, terminer.</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-light text-black">2) Stabiliser les priorités : un geste central de prévention</h2>
            <p className="text-gray-700 leading-relaxed">
              Dans de nombreux collectifs, ce n’est pas l’intensité seule qui épuise : c’est l’instabilité. Quand les
              priorités bougent sans règles, le travail se fragmente, les tâches restent ouvertes, et l’attention se
              disperse.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Une prévention organisationnelle vise alors un objectif concret : rendre les arbitrages visibles et
              praticables. Cela suppose des priorités courtes, une cadence de mise à jour, et un responsable d’arbitrage
              clairement identifié.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-light text-black">3) Sécuriser les interfaces : réduire les relances en boucle</h2>
            <p className="text-gray-700 leading-relaxed">
              Une part significative de la charge mentale se joue « entre » : entre équipes, entre métiers, entre terrain
              et fonctions support, entre interne et prestataires. Quand les passages de relais sont incertains, les
              relances deviennent structurelles.
            </p>
            <div className="aw-card-surface rounded-2xl border border-black/5 p-6 md:p-7 space-y-3">
              <p className="text-sm tracking-[0.22em] uppercase text-black/50">Questions utiles</p>
              <p className="text-gray-700 leading-relaxed">
                Qui a besoin de quoi, à quel moment, pour décider ou exécuter ? Où l’information se perd-elle ? Qui est
                responsable du « bouclage » ?
              </p>
              <p className="text-gray-700 leading-relaxed">
                La réponse n’est pas forcément une procédure lourde : elle peut être une règle simple, un point d’entrée
                stabilisé, un support commun, ou un rituel court d’interface.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-light text-black">4) Mettre en place des règles de flux (pour protéger l’attention)</h2>
            <p className="text-gray-700 leading-relaxed">
              L’organisation du travail produit de la charge mentale quand elle laisse l’urgence devenir un mode
              d’animation. À l’inverse, des règles de flux protègent l’attention : limiter le travail en cours,
              regrouper certaines sollicitations, clarifier l’usage des canaux, sécuriser des temps de production.
            </p>
            <p className="text-gray-700 leading-relaxed">
              L’enjeu est collectif : rendre le système compatible avec une exécution de qualité, plutôt que de compter
              sur des compensations individuelles permanentes.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-light text-black">Conclusion — Une prévention crédible décrit le travail, puis stabilise</h2>
            <p className="text-gray-700 leading-relaxed">
              Les repères les plus robustes s’appuient sur des faits de travail : arbitrages, flux, interfaces, décisions,
              marges de manœuvre. C’est à ce niveau que la prévention peut être discutée, priorisée, suivie dans le temps.
            </p>

            <div className="rounded-2xl border border-black/5 bg-black/[0.02] p-6 md:p-7">
              <p className="text-gray-700 leading-relaxed">
                Pour prolonger ces repères, vous pouvez consulter{' '}
                <Link
                  href="/veille-actualites-scientifiques"
                  className="underline underline-offset-4 text-black/80 hover:text-black"
                >
                  la veille scientifique
                </Link>
                , présentée comme un prolongement naturel des analyses.
              </p>
            </div>
          </section>

          <section className="text-sm text-black/60 leading-relaxed">
            <p>
              <strong className="text-black/70 font-medium">Source d’inspiration</strong> — Cet article s’inscrit dans la continuité des
              travaux et publications de référence sur la prévention des risques psychosociaux, notamment ceux diffusés
              par l’INRS. Cette mention vaut comme inspiration ; aucune validation institutionnelle ni partenariat n’est
              revendiqué.
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
