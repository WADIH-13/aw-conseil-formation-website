import Link from 'next/link'

export const metadata = {
  title:
    'Transitions et priorités mouvantes : un repère pour prévenir la charge mentale et les RPS - AW Conseil et Formation',
  description:
    "Quand les priorités changent vite, la charge mentale monte. Repères organisationnels pour stabiliser les arbitrages et renforcer une prévention collective des RPS.",
}

const SERIES = {
  name: 'Charge mentale & RPS — Analyses & décryptages',
  items: [
    {
      href: '/blog/transitions-priorites-charge-mentale-rps',
      label: 'Épisode 1 · Transitions et priorités',
    },
    {
      href: '/blog/langage-prevention-rps-charge-mentale',
      label: 'Épisode 2 · Langage commun et prévention',
    },
    {
      href: '/blog/rituels-micro-ajustements-charge-mentale-rps',
      label: 'Épisode 3 · Rituels et micro-ajustements',
    },
  ],
}

export default function ArticleTransitionsPrioritesPage() {
  return (
    <div className="bg-white">
      <section className="aw-hero-surface py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <p className="text-sm tracking-[0.22em] uppercase text-black/50">Blog · {SERIES.name}</p>
            <h1 className="mt-4 text-4xl md:text-5xl font-light text-black leading-tight">
              Transitions et priorités mouvantes : un repère pour prévenir la charge mentale et les RPS
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-600 leading-relaxed">
              Sous-titre — Quand les organisations traversent des changements rapides, l’enjeu n’est pas seulement de «
              tenir » : c’est de stabiliser les arbitrages, les interfaces et la coopération, afin que la charge mentale
              ne devienne pas un mode de fonctionnement.
            </p>
          </div>
        </div>
      </section>

      <main className="container-custom py-14 md:py-18">
        <div className="max-w-4xl mx-auto space-y-12">
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-light text-black">Pourquoi les transitions font monter la charge mentale</h2>
            <p className="text-gray-700 leading-relaxed">
              Les périodes de transition (réorganisation, nouveaux outils, fusion d’équipes, changement de priorités)
              sont souvent présentées comme une séquence « à passer ». Sur le terrain, elles ressemblent davantage à un
              empilement : nouvelles attentes, anciennes contraintes, délais inchangés.
            </p>
            <p className="text-gray-700 leading-relaxed">
              La charge mentale augmente lorsque les équipes doivent compenser en continu : reconstituer l’information,
              arbitrer sans cadre clair, reformuler des demandes, absorber des urgences qui deviennent la norme.
              Ce n’est pas une question de « caractère » : c’est l’expression d’un système de travail instable.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-light text-black">Le signal faible : l’arbitrage permanent</h2>
            <p className="text-gray-700 leading-relaxed">
              Dans les organisations, l’arbitrage est normal. Ce qui devient risqué, c’est l’arbitrage permanent,
              sans règles partagées, sans priorités explicites, et sans protection du temps.
            </p>
            <div className="aw-card-surface rounded-2xl border border-black/5 p-6 md:p-7">
              <p className="text-sm tracking-[0.22em] uppercase text-black/50">Repères opérationnels</p>
              <ul className="mt-4 list-disc list-inside text-gray-700 space-y-2">
                <li>Des priorités annoncées, puis contredites par des urgences récurrentes.</li>
                <li>Des demandes multi-canaux (mail, messagerie, réunions) sans point d’entrée stabilisé.</li>
                <li>Des décisions tardives qui déplacent la pression vers l’exécution.</li>
                <li>Des interfaces floues : qui valide, qui tranche, qui coordonne.</li>
                <li>Une surcharge invisible : rattrapage, replanification, réexplication, relances.</li>
              </ul>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Ces signaux ne sont pas des « irritants » isolés. Ils indiquent souvent que l’organisation n’a pas encore
              stabilisé ses règles de fonctionnement dans la transition.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-light text-black">Prévenir, ici, c’est stabiliser des règles de priorité</h2>
            <p className="text-gray-700 leading-relaxed">
              Une prévention organisationnelle ne se limite pas à « communiquer » sur le changement. Elle outille le
              quotidien : comment on priorise, comment on décide, comment on traite les urgences, comment on protège des
              temps de production.
            </p>
            <div className="aw-card-surface rounded-2xl border border-black/5 p-6 md:p-7 space-y-4">
              <p className="text-sm tracking-[0.22em] uppercase text-black/50">Trois gestes simples (et exigeants)</p>
              <div className="space-y-3">
                <p className="text-gray-700 leading-relaxed">
                  <strong className="text-black/80 font-medium">1) Rendre les priorités visibles</strong> — Une liste courte,
                  mise à jour, connue des équipes, avec un responsable d’arbitrage identifié.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  <strong className="text-black/80 font-medium">2) Limiter le « travail en cours »</strong> — Trop de chantiers en
                  parallèle dégrade la qualité, étire les délais et augmente la charge mentale.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  <strong className="text-black/80 font-medium">3) Stabiliser les interfaces</strong> — Qui fait quoi, avec quelles
                  informations, à quel moment. Les zones grises coûtent cher en attention.
                </p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Dans la transition, ces gestes ne sont pas accessoires : ils conditionnent la capacité du collectif à
              coopérer sans se sur-solliciter.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-light text-black">Le rôle du management : protéger le cadre, pas « tout porter »</h2>
            <p className="text-gray-700 leading-relaxed">
              On attend souvent des managers qu’ils « absorbent » la transition. Une approche plus robuste consiste à
              sécuriser leur rôle : leur donner des repères partagés, des marges de manœuvre et des points d’arbitrage.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Quand le cadre est clair, le management peut se concentrer sur l’essentiel : rendre les priorités
              cohérentes, réguler la charge, et maintenir une qualité de coopération compatible avec les exigences.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-light text-black">Conclusion — Se mettre à jour, ici, c’est piloter la stabilité</h2>
            <p className="text-gray-700 leading-relaxed">
              Dans les périodes de transition, la prévention des RPS et de la charge mentale passe par un travail
              d’organisation : priorités, arbitrages, interfaces, rythmes. Se mettre à jour, c’est accepter que ces
              sujets sont désormais des sujets de pilotage.
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

          <section className="aw-card-surface rounded-2xl border border-black/5 p-6 md:p-7">
            <p className="text-sm tracking-[0.22em] uppercase text-black/50">La série</p>
            <h2 className="mt-2 text-lg font-medium text-black">{SERIES.name}</h2>
            <div className="mt-4 grid gap-2">
              {SERIES.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-xl px-4 py-3 text-sm transition-colors border border-black/5 hover:bg-black/[0.02] ${
                    item.href === '/blog/transitions-priorites-charge-mentale-rps'
                      ? 'text-black'
                      : 'text-black/70'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
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
