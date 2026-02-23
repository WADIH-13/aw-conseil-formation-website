import Link from 'next/link'

export const metadata = {
  title: 'Notre approche - AW Conseil et Formation',
  description: 'Posture, méthode et cadre de nos démarches de performance humaine et de qualité de fonctionnement.',
}

export default function NotreApprochePage() {
  return (
    <div className="bg-white">
      <section className="aw-hero-surface py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm tracking-[0.3em] uppercase text-black/50 mb-4">Démarches</p>
            <h1 className="text-4xl md:text-5xl font-light text-black mb-6 leading-tight">
              Notre approche
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Une posture de tiers de confiance, une méthode structurée et des démarches progressives
              finançables dans la durée.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
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
                Découvrir les leviers mobilisables
              </Link>
            </div>
            <p className="mt-6 text-sm text-black/50">
              <Link href="/demarche-qualite" className="underline underline-offset-4">
                Retour à la page Démarches
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-3xl font-light text-black mb-6">
                  Une posture de tiers de confiance
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  AW Conseil &amp; Formation intervient comme partenaire de démarche auprès des organisations,
                  des financeurs et des acteurs de terrain. Notre rôle est de structurer, clarifier et
                  sécuriser des démarches de performance humaine et de qualité de fonctionnement, en lien
                  direct avec les réalités opérationnelles.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Nous ne nous substituons pas aux responsabilités internes. Nous aidons à mettre en
                  cohérence les pratiques, les objectifs et les moyens, dans une logique durable et
                  respectueuse des cadres qualité.
                </p>
              </div>
              <div className="aw-card-surface p-8 rounded-2xl border border-black/5">
                <h3 className="text-xl font-medium text-black mb-5">Principes d&apos;intervention</h3>
                <div className="space-y-4 text-gray-700">
                  <div className="flex items-start gap-3">
                    <span className="mt-2 h-1 w-8 rounded-full bg-aw-red-deep/40" aria-hidden="true" />
                    <p>Co-construction avec les acteurs en place.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="mt-2 h-1 w-8 rounded-full bg-aw-red-deep/40" aria-hidden="true" />
                    <p>Approche ancrée dans le terrain et les pratiques réelles.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="mt-2 h-1 w-8 rounded-full bg-aw-red-deep/40" aria-hidden="true" />
                    <p>Confidentialité, rigueur et lisibilité pour les financeurs.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="mt-2 h-1 w-8 rounded-full bg-aw-red-deep/40" aria-hidden="true" />
                    <p>Démarches progressives, évolutives et finançables dans la durée.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 aw-diagonal-surface">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-light text-black mb-6">Une logique de démarche</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Nos interventions s&apos;inscrivent dans des parcours structurés, modulables et finançables
              dans le temps. La formation constitue un levier important, mais elle s&apos;intègre dans un
              ensemble plus large, orienté vers l&apos;amélioration continue.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="aw-card-surface p-6 rounded-2xl border border-black/5">
                <h3 className="text-lg font-medium text-black mb-3">Étapes typiques</h3>
                <div className="space-y-3 text-gray-700">
                  <div className="flex items-start gap-3">
                    <span className="mt-2 h-1 w-8 rounded-full bg-aw-red-deep/40" aria-hidden="true" />
                    <p>Cadrage et compréhension du fonctionnement.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="mt-2 h-1 w-8 rounded-full bg-aw-red-deep/40" aria-hidden="true" />
                    <p>Observation collective et repères partagés.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="mt-2 h-1 w-8 rounded-full bg-aw-red-deep/40" aria-hidden="true" />
                    <p>Ateliers de mise en pratique et consolidation.</p>
                  </div>
                </div>
              </div>
              <div className="aw-card-surface p-6 rounded-2xl border border-black/5">
                <h3 className="text-lg font-medium text-black mb-3">Finalité</h3>
                <p className="text-gray-700">
                  Construire des démarches appropriables par les équipes, utiles au pilotage
                  et compatibles avec les cadres de financement et les exigences qualité.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-light text-black mb-6">Observer pour orienter l&apos;action</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Nos démarches s&apos;appuient sur des outils d&apos;observation collective et des indicateurs
              non intrusifs, conçus pour objectiver des tendances, structurer le dialogue et orienter
              les décisions de manière pragmatique.
            </p>
            <div className="aw-card-surface p-6 rounded-2xl border border-black/5">
              <p className="text-sm text-gray-600">
                Ces repères ne visent ni l&apos;évaluation individuelle, ni le jugement des personnes,
                et ne relèvent pas d&apos;un registre médical ou thérapeutique.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 aw-diagonal-surface">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-light text-black mb-6">
              Un cadre clair pour les financeurs et institutions
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Nous intervenons dans le respect des exigences de qualité, de traçabilité et de
              confidentialité. Nos modalités sont compatibles avec les cadres OPCO et les attentes
              des partenaires publics.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
              <div className="flex items-start gap-3">
                <span className="mt-2 h-1 w-8 rounded-full bg-aw-red-deep/40" aria-hidden="true" />
                <p>Qualité, traçabilité, lisibilité des actions.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-2 h-1 w-8 rounded-full bg-aw-red-deep/40" aria-hidden="true" />
                <p>Compatibilité avec les cadres de financement.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-2 h-1 w-8 rounded-full bg-aw-red-deep/40" aria-hidden="true" />
                <p>Respect des responsabilités internes.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-2 h-1 w-8 rounded-full bg-aw-red-deep/40" aria-hidden="true" />
                <p>Confidentialité et professionnalisme.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-light text-black mb-6">Écosystème de compétences mobilisable</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              AW Conseil &amp; Formation s&apos;appuie sur un réseau pluridisciplinaire de compétences
              complémentaires, mobilisé selon les besoins des projets. Cette organisation permet
              d&apos;adapter les expertises sans alourdir les dispositifs, tout en préservant la cohérence.
            </p>
            <Link href="/ecosysteme" className="text-aw-red-deep underline underline-offset-4">
              Découvrir l&apos;écosystème
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-light text-black mb-4">
              Structurer une démarche claire et progressive
            </h2>
            <p className="text-gray-700 mb-8">
              Un premier cadrage, sans engagement, pour identifier les leviers d&apos;action les plus pertinents.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-aw-red-deep hover:bg-[#7C1818] rounded-[10px] transition-colors"
              >
                Structurer une démarche avec nous
              </Link>
              <Link
                href="/formations"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-aw-ink border border-black/10 rounded-[10px] transition-colors"
              >
                Découvrir les leviers mobilisables
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
