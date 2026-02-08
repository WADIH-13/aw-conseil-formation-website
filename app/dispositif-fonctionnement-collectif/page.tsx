import Link from 'next/link'

export const metadata = {
  title: 'Dispositif de fonctionnement collectif - AW Conseil et Formation',
  description: "Un dispositif d'observation collective non intrusif pour structurer les décisions et les démarches.",
}

export default function DispositifFonctionnementCollectifPage() {
  return (
    <div className="bg-white">
      <section className="aw-hero-surface py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-light text-black mb-6 leading-tight">
              Dispositif de fonctionnement collectif
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Un dispositif structurant qui permet d&apos;objectiver le fonctionnement collectif
              afin de clarifier les décisions, soutenir le dialogue et orienter les démarches.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto animate-fade-in">
            <h2 className="text-3xl font-light text-black mb-6">À quoi sert ce dispositif</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
              <li className="flex items-start">
                <span className="text-aw-red mr-3 mt-1">•</span>
                <span>Objectiver des tendances de fonctionnement.</span>
              </li>
              <li className="flex items-start">
                <span className="text-aw-red mr-3 mt-1">•</span>
                <span>Créer des repères partagés et lisibles.</span>
              </li>
              <li className="flex items-start">
                <span className="text-aw-red mr-3 mt-1">•</span>
                <span>Structurer le dialogue entre parties prenantes.</span>
              </li>
              <li className="flex items-start">
                <span className="text-aw-red mr-3 mt-1">•</span>
                <span>Orienter les leviers d&apos;action à mobiliser.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 aw-diagonal-surface">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto animate-fade-in">
            <h2 className="text-3xl font-light text-black mb-6">Ce cadre garantit</h2>
            <div className="aw-card-surface p-6 rounded-2xl border border-black/5">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                <li className="flex items-start">
                  <span className="text-aw-red mr-3 mt-1">•</span>
                  <span>Aucune évaluation individuelle.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-aw-red mr-3 mt-1">•</span>
                  <span>Aucune donnée médicale ou thérapeutique.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-aw-red mr-3 mt-1">•</span>
                  <span>Aucune notation des personnes.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-aw-red mr-3 mt-1">•</span>
                  <span>Usage collectif uniquement.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-aw-red mr-3 mt-1">•</span>
                  <span>Finalité de pilotage et de structuration.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto animate-fade-in">
            <h2 className="text-3xl font-light text-black mb-6">Intégration dans les démarches AW</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Le dispositif s&apos;inscrit dans des démarches progressives, après une phase de cadrage.
              Il prépare ou accompagne les actions de formation, d&apos;ateliers et d&apos;accompagnement,
              tout en restant compatible avec les exigences OPCO et institutionnelles.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Il ne se substitue jamais à la démarche : il en constitue un levier méthodologique,
              au service d&apos;une action structurée, contextualisée et suivie dans le temps.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 aw-diagonal-surface">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h2 className="text-2xl md:text-3xl font-light text-black mb-4">
              Une démarche construite, jamais isolée
            </h2>
            <p className="text-gray-700 mb-8">
              Ce dispositif est utilisé uniquement lorsqu&apos;il est pertinent, intégré à une démarche
              accompagnée et ajustée au contexte de l&apos;organisation.
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
                Découvrir les leviers mobilisables
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
