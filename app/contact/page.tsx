import ContactForm from '@/components/ContactForm'
import { getLegalConfig, isPlaceholder } from '@/content/legal'

export const metadata = {
  title: 'Contact - AW Conseil et Formation',
  description: "Échangez avec AW Conseil et Formation. Conseil, formation et solutions pour libérer la charge mentale.",
}

export default function ContactPage() {
  const { legal } = getLegalConfig()
  const phoneHref = legal.phone ? legal.phone.replace(/\s+/g, '') : undefined

  return (
    <div className="bg-white">
      <section className="aw-hero-surface py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-light text-black mb-6 leading-tight">
              Échangeons sur vos besoins
            </h1>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              Conseil, formation, ateliers et solutions concrètes<br />
              pour réduire la charge mentale et prévenir les RPS.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-2xl font-light text-black mb-6">Pourquoi nous contacter ?</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-black mb-2">Conseil & prévention</h3>
                  <p className="text-gray-700">
                    Vous souhaitez structurer une démarche de prévention RPS,
                    mieux comprendre les risques et agir avec méthode.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-black mb-2">Formation & ateliers</h3>
                  <p className="text-gray-700">
                    Vous voulez sensibiliser, former vos équipes ou proposer des ateliers
                    pour réduire la charge mentale.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-black mb-2">Accompagnement sur mesure</h3>
                  <p className="text-gray-700">
                    Vous recherchez un partenaire discret, professionnel et engagé
                    pour co-construire des solutions concrètes.
                  </p>
                </div>
              </div>
            </div>

            <div className="aw-card-surface p-8 rounded-2xl border border-black/5">
              <h2 className="text-2xl font-light text-black mb-6">Formulaire de contact</h2>
              <ContactForm
                privacy={{
                  controllerName: legal.companyName,
                  email: isPlaceholder(legal.email) ? 'contact@aw-conseil-formation.fr' : legal.email,
                  retentionMonths: legal.contactDataRetentionMonths,
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 aw-diagonal-surface">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-light text-black mb-6">
              Vous préférez un échange direct ?
            </h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Nous restons disponibles par téléphone et email,
              du lundi au vendredi, de 9h à 18h.
            </p>
            <div className="space-y-3 text-gray-700">
              {legal.phone && (
                <p>
                  Téléphone :{' '}
                  <a href={`tel:${phoneHref}`} className="text-aw-red hover:text-red-700">{legal.phone}</a>
                </p>
              )}
              {!isPlaceholder(legal.email) && (
                <p>
                  Email :{' '}
                  <a href={`mailto:${legal.email}`} className="text-aw-red hover:text-red-700">{legal.email}</a>
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
