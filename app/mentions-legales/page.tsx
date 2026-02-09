import { getLegalConfig, isPlaceholder, PLACEHOLDER } from '@/content/legal'

export const metadata = {
  title: 'Mentions légales - AW Conseil et Formation',
  description: 'Mentions légales et informations légales du site AW Conseil et Formation.',
}

function LegalValue({ value }: { value?: string }) {
  const missing = isPlaceholder(value)
  return (
    <span className={missing ? 'text-black/50 italic' : 'text-black/80'}>
      {missing ? PLACEHOLDER : value}
    </span>
  )
}

export default function MentionsLegalesPage() {
  const { legal, missingKeys } = getLegalConfig()

  return (
    <div className="bg-white">
      <section className="aw-hero-surface py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-light text-black mb-12 text-center">
              Mentions légales
            </h1>

            <div className="aw-card-surface rounded-2xl border border-black/5 p-8 md:p-10 space-y-12 text-gray-700">
              {missingKeys.length > 0 && (
                <div className="rounded-2xl border border-black/5 bg-black/[0.02] p-4 text-sm text-black/60">
                  Certaines informations légales sont en cours de mise à jour.
                </div>
              )}

              <section>
                <h2 className="text-2xl font-medium text-black mb-4">Informations légales</h2>
                <div className="space-y-2">
                  <p>
                    <strong>Dénomination sociale :</strong>{' '}
                    <LegalValue value={legal.companyName} />
                  </p>
                  <p>
                    <strong>Forme juridique :</strong>{' '}
                    <LegalValue value={legal.legalForm} />
                  </p>
                  <p>
                    <strong>Adresse :</strong>{' '}
                    <LegalValue value={legal.address} />
                  </p>
                  <p>
                    <strong>SIRET :</strong>{' '}
                    <LegalValue value={legal.siret} />
                  </p>
                  <p>
                    <strong>Numéro de déclaration d’activité (NDA) :</strong>{' '}
                    <LegalValue value={legal.nda} />
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-medium text-black mb-4">Direction de la publication</h2>
                <p>
                  Directeur de la publication : <LegalValue value={legal.publicationDirector} />
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-medium text-black mb-4">Hébergement</h2>
                <div className="space-y-2">
                  <p>
                    Ce site est hébergé par <LegalValue value={legal.hostName} />
                  </p>
                  <p>
                    Adresse : <LegalValue value={legal.hostAddress} />
                  </p>
                  {legal.hostPhone && (
                    <p>
                      Téléphone : <span className="text-black/80">{legal.hostPhone}</span>
                    </p>
                  )}
                  {legal.hostWebsite && (
                    <p>
                      Site web :{' '}
                      <a
                        href={legal.hostWebsite}
                        className="text-aw-red-deep hover:text-[#7C1818]"
                        rel="noreferrer"
                        target="_blank"
                      >
                        {legal.hostWebsite}
                      </a>
                    </p>
                  )}
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-medium text-black mb-4">Propriété intellectuelle</h2>
                <p>
                  L’ensemble de ce site relève de la législation française et internationale 
                  sur le droit d’auteur et la propriété intellectuelle. Tous les droits de 
                  reproduction sont réservés, y compris pour les documents téléchargeables 
                  et les représentations iconographiques et photographiques.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-medium text-black mb-4">Protection des données personnelles</h2>
                <p>
                  Conformément à la loi « Informatique et Libertés » du 6 janvier 1978 modifiée 
                  et au Règlement Général sur la Protection des Données (RGPD), vous disposez 
                  d’un droit d’accès, de rectification, de suppression et d’opposition aux 
                  données personnelles vous concernant.
                </p>
                <p className="mt-4">
                  Pour exercer ces droits, vous pouvez nous contacter à l’adresse :
                  {isPlaceholder(legal.email) ? (
                    <span className="ml-1 text-black/50 italic">{PLACEHOLDER}</span>
                  ) : (
                    <a
                      href={`mailto:${legal.email}`}
                      className="text-aw-red-deep hover:text-[#7C1818] ml-1"
                    >
                      {legal.email}
                    </a>
                  )}
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-medium text-black mb-4">Cookies</h2>
                <p>
                  Ce site utilise des cookies techniques nécessaires au bon fonctionnement 
                  du site.
                </p>
                <p className="mt-3">
                  Pour en savoir plus : <a href="/cookies" className="text-aw-red-deep hover:text-[#7C1818]">Cookies</a>
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-medium text-black mb-4">Responsabilité</h2>
                <p>
                  Les informations contenues sur ce site sont données à titre indicatif 
                  et sont susceptibles d’évoluer. La responsabilité d’AW Conseil et Formation 
                  s’exerce dans les limites prévues par la loi.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-medium text-black mb-4">Droit applicable</h2>
                <p>
                  Tout litige en relation avec l’utilisation du site 
                  www.aw-conseil-formation.fr est soumis au droit français.
                </p>
              </section>
            </div>

            <div className="mt-16 text-center">
              <p className="text-sm text-gray-500">
                Dernière mise à jour : Janvier 2026
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
