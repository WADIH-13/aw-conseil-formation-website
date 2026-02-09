import Link from 'next/link'

export const metadata = {
  title: 'Regards scientifiques - AW Conseil et Formation',
  description:
    "Une page de repères : sources institutionnelles, apports scientifiques et traduction opérationnelle en prévention des risques professionnels, RPS et QVCT.",
}

function SourceCard({
  title,
  subtitle,
  body,
  href,
}: {
  title: string
  subtitle: string
  body: string
  href: string
}) {
  return (
    <div className="aw-card-surface rounded-2xl border border-black/5 p-6 md:p-7 space-y-3">
      <div>
        <p className="text-xs tracking-[0.22em] uppercase text-black/50">Source de référence</p>
        <h3 className="mt-2 text-xl font-medium text-black">{title}</h3>
        <p className="mt-1 text-sm text-black/60">{subtitle}</p>
      </div>
      <p className="text-sm text-black/70 leading-relaxed">{body}</p>
      <div className="pt-1">
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="text-sm font-medium text-aw-red-deep hover:text-[#7C1818] underline"
        >
          Consulter les publications
        </a>
      </div>
    </div>
  )
}

export default function RegardScientifiquePage() {
  return (
    <div className="bg-white">
      <section className="aw-hero-surface py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm tracking-[0.22em] uppercase text-black/50">Repères et cadres</p>
            <h1 className="text-4xl md:text-5xl font-light text-black mt-4 leading-tight">Regards scientifiques</h1>
            <div className="mt-8 text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto space-y-5">
              <p>
                Les enjeux humains au travail évoluent : transformations des organisations, intensification des
                sollicitations, nouvelles formes de coopération, cadres réglementaires en mouvement.
              </p>
              <p>
                Dans ce contexte, nos approches, contenus et outils s’inscrivent dans une dynamique de veille et
                d’actualisation, attentive aux avancées scientifiques, institutionnelles et aux orientations publiques
                qui structurent la prévention.
              </p>
              <p>
                L’objectif est simple : proposer des démarches rigoureuses, compréhensibles et directement mobilisables,
                sans sur-promesse, et en cohérence avec les référentiels reconnus.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 aw-diagonal-surface">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-sm tracking-[0.22em] uppercase text-black/50">Sources de référence</p>
              <h2 className="mt-3 text-3xl md:text-4xl font-light text-black">Repères institutionnels</h2>
              <p className="mt-5 text-lg text-gray-700 leading-relaxed">
                Certaines institutions et dispositifs publics constituent des cadres de réflexion majeurs pour la
                prévention des risques professionnels, les RPS et la QVCT. Leurs travaux, publications et
                recommandations nourrissent notre compréhension et nos choix méthodologiques.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
              <SourceCard
                title="INRS"
                subtitle="Institut national de recherche et de sécurité"
                body="Références techniques, outils et guides pour la prévention des risques professionnels. Les cadres proposés (analyse du travail, facteurs de risques, démarches de prévention) constituent des repères solides pour structurer une intervention et sécuriser les messages." 
                href="https://www.inrs.fr/"
              />
              <SourceCard
                title="Anact"
                subtitle="Agence nationale pour l’amélioration des conditions de travail"
                body="Publications et ressources sur l’organisation du travail, la participation, la conduite du changement et la QVCT. Ces travaux aident à articuler performance et santé au travail, et à concevoir des démarches soutenables, adaptées au terrain." 
                href="https://www.anact.fr/"
              />
              <SourceCard
                title="HAS"
                subtitle="Haute Autorité de Santé (lorsque pertinent)"
                body="Recommandations et documents de référence sur la qualité, les pratiques et la sécurité des parcours. Lorsque le contexte l’exige (secteur santé, établissements médico-sociaux, interfaces avec le soin), ces publications apportent un cadre utile pour clarifier les frontières de responsabilité et sécuriser les pratiques." 
                href="https://www.has-sante.fr/"
              />
              <SourceCard
                title="PRST"
                subtitle="Plans régionaux de santé au travail"
                body="Orientations régionales qui déclinent les politiques publiques de prévention : priorités, plans d’action, ressources territoriales. Ces repères contribuent à contextualiser les enjeux et à aligner une démarche avec les dynamiques locales." 
                href="https://travail-emploi.gouv.fr/sante-au-travail/"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="max-w-3xl">
              <p className="text-sm tracking-[0.22em] uppercase text-black/50">Traduction opérationnelle</p>
              <h2 className="mt-3 text-3xl md:text-4xl font-light text-black">De la recherche à l’action</h2>
              <div className="mt-6 text-lg text-gray-700 leading-relaxed space-y-4">
                <p>
                  Les apports scientifiques sont utiles lorsqu’ils deviennent praticables. Notre travail consiste à
                  transformer des concepts robustes en démarches opérationnelles : observation du travail réel,
                  repérage des facteurs de risque et de protection, priorisation, expérimentation, stabilisation.
                </p>
                <p>
                  En formation, ces repères sont traduits en outils pédagogiques accessibles : études de cas,
                  grilles de lecture, exercices guidés, méthodes de discussion et d’aide à la décision.
                  L’objectif est d’éviter le jargon, sans appauvrir la rigueur.
                </p>
                <p>
                  Pour les organisations, cela permet de s’appuyer sur des approches solides tout en restant adaptées
                  à la réalité des métiers, des contraintes et des marges de manœuvre disponibles.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 aw-diagonal-surface">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="aw-card-surface rounded-2xl border border-black/5 p-8 md:p-10">
              <p className="text-sm tracking-[0.22em] uppercase text-black/50">Actualisation</p>
              <h2 className="mt-3 text-3xl md:text-4xl font-light text-black">Veille et évolution continue</h2>
              <div className="mt-6 text-lg text-gray-700 leading-relaxed space-y-4">
                <p>
                  Les contenus évoluent au rythme des publications, des retours d’expérience, des évolutions
                  réglementaires et des transformations du travail. Nos supports, cadres d’intervention et outils
                  sont donc revus et ajustés régulièrement.
                </p>
                <p>
                  Pour rendre cette démarche lisible, une page dédiée rassemble des repères, notes de lecture et
                  actualités issues des sources de référence.
                </p>
              </div>

              <div className="mt-8">
                <Link href="/veille-actualites-scientifiques" className="btn-secondary">
                  Veille & actualités scientifiques
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="max-w-4xl">
              <p className="text-sm tracking-[0.22em] uppercase text-black/50">Transparence</p>
              <h2 className="mt-3 text-3xl md:text-4xl font-light text-black">Clause de positionnement</h2>
              <div className="mt-6 text-lg text-gray-700 leading-relaxed space-y-4">
                <p>
                  Aucune reconnaissance officielle, validation institutionnelle ou partenariat n’est revendiqué au titre
                  des références citées. Les institutions mentionnées sont mobilisées comme sources d’inspiration,
                  d’alignement et de cohérence méthodologique.
                </p>
                <p>
                  Cette posture s’inscrit dans une logique responsable et complémentaire : s’appuyer sur des cadres
                  publics et des travaux reconnus, tout en adaptant l’intervention aux besoins, au contexte et aux
                  obligations de chaque organisation.
                </p>
              </div>

              <p className="mt-10 text-xl md:text-2xl font-light text-black leading-relaxed">
                Comprendre, agir et accompagner suppose une attention constante aux travaux scientifiques et aux
                orientations publiques qui structurent la prévention et les conditions de travail.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
