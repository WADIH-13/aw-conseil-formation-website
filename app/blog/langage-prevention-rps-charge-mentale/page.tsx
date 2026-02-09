import Link from 'next/link'

import CoverImage from '@/components/blog/CoverImage'

export const metadata = {
  title:
    'Langage commun et prévention : mettre des mots utiles sur la charge mentale et les RPS - AW Conseil et Formation',
  description:
    "Le langage n'est pas un détail : il structure la prévention des RPS. Repères pour construire un vocabulaire commun, orienté travail réel et action collective.",
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

export default function ArticleLangagePreventionPage() {
  return (
    <div className="bg-white">
      <section className="aw-hero-surface py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <p className="text-sm tracking-[0.22em] uppercase text-black/50">Blog · {SERIES.name}</p>
            <h1 className="mt-4 text-4xl md:text-5xl font-light text-black leading-tight">
              Langage commun et prévention : mettre des mots utiles sur la charge mentale et les RPS
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-600 leading-relaxed">
              Sous-titre — Quand les mots manquent, la prévention se dilue. Un vocabulaire partagé permet de relier les
              situations de travail, les contraintes et les arbitrages, sans réduire les enjeux à des interprétations
              individuelles.
            </p>
          </div>

          <div className="mt-8 max-w-6xl mx-auto">
            <CoverImage
              src="/blog-covers/organisation-travail.svg"
              alt="Illustration sobre : organisation du travail, flux et coordination"
              ratio="21:9"
            />
          </div>
        </div>
      </section>

      <main className="container-custom py-14 md:py-18">
        <div className="max-w-4xl mx-auto space-y-12">
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-light text-black">Pourquoi les mots comptent, en prévention</h2>
            <p className="text-gray-700 leading-relaxed">
              Dans les organisations, les sujets de charge mentale et de RPS sont souvent abordés tard, lorsque les
              tensions sont déjà visibles. Une des raisons est simple : le langage disponible est soit trop technique,
              soit trop moral, soit trop flou.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Or, la prévention organisationnelle a besoin d’un langage qui permette de décrire le travail réel : ce qui
              est demandé, ce qui est possible, ce qui est arbitré, ce qui est compensé.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-light text-black">Un vocabulaire utile : orienté faits, pas jugements</h2>
            <p className="text-gray-700 leading-relaxed">
              Un langage de prévention n’a pas pour objectif de qualifier les personnes. Il sert à qualifier des
              situations et des mécanismes de travail. C’est ce déplacement qui rend l’échange possible.
            </p>

            <div className="aw-card-surface rounded-2xl border border-black/5 p-6 md:p-7">
              <p className="text-sm tracking-[0.22em] uppercase text-black/50">Exemples de formulations</p>
              <div className="mt-4 grid gap-4">
                <div className="rounded-xl border border-black/5 bg-white p-4">
                  <p className="text-sm font-medium text-black/80">À éviter (trop vague)</p>
                  <p className="mt-2 text-sm text-gray-700 leading-relaxed">
                    « On est sous pression », « c’est compliqué », « c’est trop ».
                  </p>
                </div>
                <div className="rounded-xl border border-black/5 bg-white p-4">
                  <p className="text-sm font-medium text-black/80">À privilégier (ancré dans le travail)</p>
                  <p className="mt-2 text-sm text-gray-700 leading-relaxed">
                    « Les priorités changent sans point d’arbitrage », « les interruptions empêchent de terminer »,
                    « les interfaces ne sont pas stabilisées », « le délai n’intègre pas les reprises ».
                  </p>
                </div>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed">
              Cette précision n’est pas un luxe : elle permet de transformer un ressenti diffus en une matière
              discutable collectivement, et donc actionnable.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-light text-black">Le langage comme outil de coopération</h2>
            <p className="text-gray-700 leading-relaxed">
              Quand les équipes partagent un vocabulaire, elles peuvent mieux coopérer : nommer un problème sans
              accuser, demander une régulation sans créer un conflit, alerter sans dramatiser.
            </p>
            <p className="text-gray-700 leading-relaxed">
              En prévention, c’est décisif : la charge mentale augmente souvent dans les zones grises, là où l’on ne
              sait plus ce qui est prioritaire, ce qui est attendu, ni comment arbitrer.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-light text-black">Information et formation : construire des repères partagés</h2>
            <p className="text-gray-700 leading-relaxed">
              Un vocabulaire commun ne se décrète pas. Il se construit par l’information (repères, cadres, exemples) et
              par la formation (mises en situation, analyse de cas, entraînement à la discussion du travail).
            </p>
            <div className="aw-card-surface rounded-2xl border border-black/5 p-6 md:p-7">
              <p className="text-sm tracking-[0.22em] uppercase text-black/50">Ce que cela rend possible</p>
              <ul className="mt-4 list-disc list-inside text-gray-700 space-y-2">
                <li>Décrire les mécanismes de surcharge sans personnaliser.</li>
                <li>Relier des situations à des causes organisationnelles (flux, interfaces, priorités).</li>
                <li>Choisir des actions cohérentes (règles d’arbitrage, protections du temps, clarification des rôles).</li>
                <li>Suivre les effets dans le temps, plutôt que multiplier des actions sans continuité.</li>
              </ul>
            </div>
            <p className="text-gray-700 leading-relaxed">
              L’enjeu est autant culturel que méthodologique : rendre la discussion du travail possible, régulière et
              productive.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-light text-black">Conclusion — Se mettre à jour, c’est aussi se mettre d’accord sur les mots</h2>
            <p className="text-gray-700 leading-relaxed">
              Lorsque les mots sont imprécis, la prévention se fragmente. Lorsque les mots sont partagés, la prévention
              redevient collective : on peut discuter, arbitrer, prioriser, et stabiliser des solutions adaptées au
              travail réel.
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
                    item.href === '/blog/langage-prevention-rps-charge-mentale'
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
