import Link from 'next/link'

export const metadata = {
  title: 'Écosystème — Alléger la charge mentale | AW Conseil et Formation',
  description:
    "Comprendre, agir et prévenir : un accompagnement global et humain pour alléger la charge mentale.",
}

export default function EcosystemePage() {
  return (
    <div className="bg-white">
      {/* HERO */}
      <section className="aw-hero-surface py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-light text-black mb-6 leading-tight">
              Un écosystème pour alléger la charge mentale
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              Comprendre, agir et prévenir, à votre rythme, grâce à un accompagnement global et humain.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="/formations"
                className="px-6 py-3 rounded-md bg-aw-red-deep text-white font-medium hover:bg-[#7C1818]"
              >
                Découvrir le programme d’accompagnement
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Les composantes de l'écosystème (3 cartes) */}
      <section className="py-12">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-medium text-black mb-6">Les composantes de l’écosystème</h2>
            <p className="text-gray-700 mb-8">Un ensemble cohérent : chaque élément se nourrit des autres.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/aw-conseil-formation" className="aw-card-surface p-6 rounded-2xl border border-black/5 text-left hover:shadow-lg">
                <h3 className="text-lg font-semibold mb-2">AW Conseil et Formation</h3>
                <p className="text-gray-600 mb-4">Cadre, formation et accompagnement pour alléger la charge mentale.</p>
                <div className="text-aw-red-deep font-medium">Découvrir AW Conseil et Formation →</div>
              </Link>

              <Link href="/guide-essor" className="aw-card-surface p-6 rounded-2xl border border-black/5 text-left hover:shadow-lg">
                <h3 className="text-lg font-semibold mb-2">Le Guide d’Essor</h3>
                <p className="text-gray-600 mb-4">Lieu ressource à Fréjus : expérimentation, nature et pratiques.</p>
                <div className="text-aw-red-deep font-medium">Découvrir le Guide d’Essor →</div>
              </Link>

              <Link href="/partenaires" className="aw-card-surface p-6 rounded-2xl border border-black/5 text-left hover:shadow-lg">
                <h3 className="text-lg font-semibold mb-2">Les partenaires</h3>
                <p className="text-gray-600 mb-4">Réseau de spécialistes qui complètent et enrichissent l’écosystème.</p>
                <div className="text-aw-red-deep font-medium">Voir les partenaires →</div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bandeau logos partenaires */}
      <section className="py-12 aw-diagonal-surface">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-sm tracking-[0.3em] uppercase text-black/50 mb-4">Ils nous accompagnent</p>
            <div className="relative overflow-hidden">
              <div className="aw-logo-marquee">
                {[
                  { label: 'Logo partenaire A', href: '/partenaires/partenaire-a' },
                  { label: 'Logo partenaire B', href: '/partenaires/partenaire-b' },
                  { label: 'Logo partenaire C', href: '/partenaires/partenaire-c' },
                  { label: 'Logo partenaire D', href: '/partenaires/partenaire-d' },
                ].map((item, index) => (
                  <div key={`${item.label}-${index}`} className="min-w-[180px] md:min-w-[220px]">
                    <Link href={item.href} className="block bg-white border border-black/5 rounded-2xl py-6 text-sm uppercase text-black/40">
                      {item.label}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pourquoi cet écosystème existe */}
      <section className="py-16 aw-diagonal-surface">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-medium text-black mb-6">Pourquoi cet écosystème existe</h2>
            <div className="text-gray-700 space-y-4">
              <p>La charge mentale se comprend. La compréhension est le premier levier d’action.</p>
              <p>On traverse mieux ce qui pèse lorsqu’on n’est pas seul : accompagnement et pratiques reliées font la différence.</p>
              <p>Comprendre permet d’agir. Agir permet d’aller mieux. Prévenir permet de durer.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quatre piliers */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light text-black text-center mb-12">Les quatre piliers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <article className="aw-card-surface p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-2">Comprendre</h3>
                <p className="text-gray-700 mb-2">Mettre des mots, sortir de la confusion.</p>
                <p className="text-gray-600">Ce que ça change : vous repérez les mécanismes et gagnez en clarté pour agir.</p>
              </article>

              <article className="aw-card-surface p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-2">Apprendre</h3>
                <p className="text-gray-700 mb-2">Acquérir des outils simples et applicables.</p>
                <p className="text-gray-600">Ce que ça change : des gestes concrets pour alléger le quotidien.</p>
              </article>

              <article className="aw-card-surface p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-2">Expérimenter</h3>
                <p className="text-gray-700 mb-2">Tester en sécurité ce qui fonctionne pour vous.</p>
                <p className="text-gray-600">Ce que ça change : vous adaptez les outils à votre réalité, sans sur-promesse.</p>
              </article>

              <article className="aw-card-surface p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-2">Soutenir dans la durée</h3>
                <p className="text-gray-700 mb-2">Ne pas rester seul après la phase d’apprentissage.</p>
                <p className="text-gray-600">Ce que ça change : maintien et accompagnement pour consolider les progrès.</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* Rendre l'écosystème concret */}
      <section className="py-16 aw-diagonal-surface">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-medium text-black mb-4 text-center">Ce que comprend l’écosystème</h2>
            <ul className="text-gray-700 list-disc list-inside space-y-2 mb-6">
              <li>Formations et modules pratiques pour équipes et particuliers</li>
              <li>Ateliers et pratiques corporelles (Qi Gong, Shutaïdo, etc.)</li>
              <li>Pratiques expressives et expérientielles</li>
              <li>Outils de prévention et d’auto-évaluation</li>
              <li>Réseau de partenaires spécialisés</li>
            </ul>

            <div className="bg-gray-50 border border-gray-100 p-6 rounded-lg">
              <h3 className="font-semibold mb-2">Le Guide d’Essor — Fréjus</h3>
              <p className="text-gray-700 mb-2">Un lieu d’expérimentation et de ressourcement sur 5 hectares.</p>
              <p className="text-gray-600">Nature, ateliers (cuisine, jardinage), médiation animale, pratiques corporelles et événements : un cadre pour tester, se recentrer et retrouver de l’élan.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Programme d'accompagnement */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-medium text-black mb-4 text-center">Un programme d’accompagnement adapté à vos besoins</h2>
            <p className="text-gray-700 mb-4">Rien n’est figé : les parcours s’ajustent au moment, au rythme et aux réalités de chacun. L’objectif est l’autonomie progressive, pas la dépendance.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/formations" className="text-center p-4 border rounded-md hover:bg-gray-50">
                <strong>Découverte</strong>
                <div className="text-sm text-gray-600">Comprendre l’approche et les possibilités</div>
              </Link>

              <Link href="/barometre" className="text-center p-4 border rounded-md hover:bg-gray-50">
                <strong>Orientation</strong>
                <div className="text-sm text-gray-600">Identifier ce qui pourrait m’aider aujourd’hui</div>
              </Link>

              <Link href="/contact" className="text-center p-4 border rounded-md hover:bg-gray-50">
                <strong>Prendre un temps d’échange</strong>
                <div className="text-sm text-gray-600">Échanger sans engagement</div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Phrase de clôture */}
      <section className="py-12">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center text-gray-700">
            <p className="mb-2">Chaque parcours est unique. Nous avançons avec vous, pas à votre place.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
