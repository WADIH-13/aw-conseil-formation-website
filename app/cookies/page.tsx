import { getLegalConfig } from '@/content/legal'

export const metadata = {
  title: 'Cookies - AW Conseil et Formation',
  description: 'Informations relatives aux cookies et traceurs utilisés sur le site AW Conseil et Formation.',
}

export default function CookiesPage() {
  const { legal } = getLegalConfig()

  return (
    <div className="bg-white">
      <section className="aw-hero-surface py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-light text-black mb-12 text-center">
              Cookies
            </h1>

            <div className="aw-card-surface rounded-2xl border border-black/5 p-8 md:p-10 space-y-10 text-gray-700">
              <section className="space-y-4">
                <h2 className="text-2xl font-medium text-black">En bref</h2>
                <p>
                  Le site <span className="text-black/80">{legal.companyName}</span> n’utilise pas de cookies publicitaires
                  ni de traceurs de mesure d’audience.
                </p>
                <p>
                  Les seuls cookies éventuellement déposés sont des cookies <span className="text-black/80">techniques</span>,
                  nécessaires au fonctionnement du site (sécurité, session d’administration, échanges avec nos services).
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-medium text-black">Cookies techniques</h2>
                <p>Exemples de finalités (liste minimaliste) :</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Maintien de session et authentification (espace d’administration).</li>
                  <li>Sécurité et protection contre les abus.</li>
                  <li>Fonctionnement des formulaires et des échanges avec nos services.</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-medium text-black">Gérer les cookies</h2>
                <p>
                  Vous pouvez configurer votre navigateur pour bloquer ces cookies. Cela peut toutefois empêcher certaines
                  fonctionnalités (notamment l’accès à l’administration) de fonctionner correctement.
                </p>
              </section>
            </div>

            <div className="mt-16 text-center">
              <p className="text-sm text-gray-500">Dernière mise à jour : Février 2026</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
