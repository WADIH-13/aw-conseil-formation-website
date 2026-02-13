import Link from 'next/link'

import CoverImage from '@/components/blog/CoverImage'

export const metadata = {
  title:
    'Rituels et micro-ajustements : stabiliser la coopération pour prévenir la charge mentale et les RPS - AW Conseil et Formation',
  description:
    "De petits ajustements peuvent produire de grands effets quand ils stabilisent la coopération. Repères de prévention organisationnelle autour des rituels de travail.",
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

export default function ArticleRituelsMicroAjustementsPage() {
  return (
    <div className="bg-white">
      <section className="aw-hero-surface py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <p className="text-sm tracking-[0.22em] uppercase text-black/50">Blog · {SERIES.name}</p>
            <h1 className="mt-4 text-4xl md:text-5xl font-light text-black leading-tight">
              Rituels et micro-ajustements : stabiliser la coopération pour prévenir la charge mentale et les RPS
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-600 leading-relaxed">
              Sous-titre — Dans les collectifs, la surcharge se nourrit souvent d’instabilité : interruptions,
              informations dispersées, arbitrages tardifs. Des rituels de travail bien conçus peuvent redonner de la
              continuité, sans rigidifier l’organisation.
            </p>
          </div>

          <div className="mt-8 max-w-6xl mx-auto">
            <CoverImage
              src="/blog-covers/organisation-travail.jpg"
              alt="Illustration sobre : organisation du travail, flux et coordination"
              ratio="21:9"
            />
          </div>
        </div>
      </section>

      <main className="container-custom py-14 md:py-18">
        <div className="max-w-4xl mx-auto space-y-12">
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-light text-black">Pourquoi les micro-ajustements comptent</h2>
            <p className="text-gray-700 leading-relaxed">
              En prévention organisationnelle, on cherche parfois « la grande mesure ». Sur le terrain, une partie des
              gains provient d’ajustements plus modestes, mais répétés : mieux se passer l’information, mieux trier les
              urgences, mieux fermer les tâches, mieux protéger des temps de concentration.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Ces micro-ajustements sont utiles lorsqu’ils s’attaquent à la source de la charge mentale : la nécessité
              de compenser en permanence. Autrement dit : réduire le besoin de « tenir tout dans la tête ».
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-light text-black">Un rituel, ce n’est pas une réunion de plus</h2>
            <p className="text-gray-700 leading-relaxed">
              Un rituel de travail est un rendez-vous court, régulier, utile. Il sert à réguler le flux : clarifier les
              priorités, rendre visibles les blocages, partager les informations essentielles, ajuster la charge.
            </p>

            <div className="aw-card-surface rounded-2xl border border-black/5 p-6 md:p-7">
              <p className="text-sm tracking-[0.22em] uppercase text-black/50">Critères de qualité</p>
              <ul className="mt-4 list-disc list-inside text-gray-700 space-y-2">
                <li>Objectif explicite (prioriser, coordonner, décider), pas seulement « faire le point ».</li>
                <li>Durée courte, rythme stable, participants utiles (pas plus).</li>
                <li>Sorties concrètes : décisions, arbitrages, prochaines actions, responsables.</li>
                <li>Un support simple qui évite de reconstituer l’information à chaque fois.</li>
              </ul>
            </div>

            <p className="text-gray-700 leading-relaxed">
              Sans ces critères, le rituel devient un coût supplémentaire. Avec ces critères, il devient un outil de
              stabilisation.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-light text-black">Trois familles de rituels qui réduisent la surcharge</h2>

            <div className="aw-card-surface rounded-2xl border border-black/5 p-6 md:p-7 space-y-5">
              <div>
                <h3 className="text-lg font-medium text-black">1) Les rituels d’arbitrage (priorités)</h3>
                <p className="mt-2 text-gray-700 leading-relaxed">
                  Un point court pour décider ce qui prime, ce qui attend, ce qui sort. L’objectif est de limiter le
                  travail en cours et de protéger l’exécution.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-black">2) Les rituels d’interface (passages de relais)</h3>
                <p className="mt-2 text-gray-700 leading-relaxed">
                  Là où les sujets se perdent : entre métiers, entre équipes, entre fonctions support. Un rituel
                  d’interface stabilise le « qui fait quoi » et évite les relances en boucle.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-black">3) Les rituels de clôture (finir)</h3>
                <p className="mt-2 text-gray-700 leading-relaxed">
                  La charge mentale augmente quand les tâches restent ouvertes. Des rituels de clôture (revue courte,
                  validation, archivage, prochaine étape) réduisent la dispersion.
                </p>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed">
              L’idée n’est pas de multiplier les routines. C’est de choisir celles qui régulent les principaux points de
              friction.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-light text-black">Micro-ajustements : ce que l’on voit fonctionner</h2>
            <p className="text-gray-700 leading-relaxed">
              Les améliorations les plus solides sont souvent celles qui rendent l’organisation plus lisible : un canal
              principal, une règle simple, une décision plus tôt, un support partagé, une fermeture systématique.
            </p>

            <div className="aw-card-surface rounded-2xl border border-black/5 p-6 md:p-7">
              <p className="text-sm tracking-[0.22em] uppercase text-black/50">Exemples de micro-ajustements</p>
              <ul className="mt-4 list-disc list-inside text-gray-700 space-y-2">
                <li>Une règle d’urgence (qui peut interrompre, comment, et ce qui est reporté).</li>
                <li>Un point hebdomadaire d’arbitrage avec une liste priorisée et un responsable.</li>
                <li>Un support unique pour les décisions (éviter la dispersion multi-canaux).</li>
                <li>Un format court de passage de relais (contexte, état, prochaine action, risques).</li>
                <li>Une règle de clôture (fin = validé, archivé, ou planifié).</li>
              </ul>
            </div>

            <p className="text-gray-700 leading-relaxed">
              Ces gestes ne résolvent pas tout. Mais ils réduisent la part invisible de la charge : reconstituer,
              rattraper, relancer, arbitrer sans cadre.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-light text-black">Conclusion — Se mettre à jour, c’est rendre la coopération soutenable</h2>
            <p className="text-gray-700 leading-relaxed">
              Les rituels et micro-ajustements ne sont pas des recettes. Ce sont des moyens concrets de stabiliser la
              coopération et de réduire les compensations permanentes. Dans un contexte de changements rapides, ils
              deviennent un levier de prévention utile.
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
                    item.href === '/blog/rituels-micro-ajustements-charge-mentale-rps'
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
