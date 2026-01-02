export const metadata = {
  title: 'Mentions légales - AW Conseil et Formation',
  description: 'Mentions légales et informations légales du site AW Conseil et Formation.',
}

export default function MentionsLegalesPage() {
  return (
    <div className="bg-white">
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-light text-black mb-12 text-center">
              Mentions légales
            </h1>

            <div className="space-y-12 text-gray-700">
              <section>
                <h2 className="text-2xl font-medium text-black mb-4">Informations légales</h2>
                <div className="space-y-2">
                  <p><strong>Dénomination sociale :</strong> AW Conseil et Formation</p>
                  <p><strong>Forme juridique :</strong> [À compléter]</p>
                  <p><strong>Siège social :</strong> [Adresse à compléter]</p>
                  <p><strong>SIRET :</strong> [Numéro à compléter]</p>
                  <p><strong>Code APE :</strong> [Code à compléter]</p>
                  <p><strong>Numéro de déclaration d'activité :</strong> [Numéro à compléter]</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-medium text-black mb-4">Direction de la publication</h2>
                <p>Le directeur de la publication est [Nom à compléter], en qualité de [Fonction à compléter].</p>
              </section>

              <section>
                <h2 className="text-2xl font-medium text-black mb-4">Hébergement</h2>
                <p>Ce site est hébergé par [Hébergeur à compléter]</p>
                <p>Adresse : [Adresse hébergeur à compléter]</p>
              </section>

              <section>
                <h2 className="text-2xl font-medium text-black mb-4">Propriété intellectuelle</h2>
                <p>
                  L'ensemble de ce site relève de la législation française et internationale 
                  sur le droit d'auteur et la propriété intellectuelle. Tous les droits de 
                  reproduction sont réservés, y compris pour les documents téléchargeables 
                  et les représentations iconographiques et photographiques.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-medium text-black mb-4">Protection des données personnelles</h2>
                <p>
                  Conformément à la loi « Informatique et Libertés » du 6 janvier 1978 modifiée 
                  et au Règlement Général sur la Protection des Données (RGPD), vous disposez 
                  d'un droit d'accès, de rectification, de suppression et d'opposition aux 
                  données personnelles vous concernant.
                </p>
                <p className="mt-4">
                  Pour exercer ces droits, vous pouvez nous contacter à l'adresse : 
                  <a href="mailto:contact@aw-conseil-formation.fr" className="text-aw-red hover:text-red-700 ml-1">
                    contact@aw-conseil-formation.fr
                  </a>
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-medium text-black mb-4">Cookies</h2>
                <p>
                  Ce site n'utilise pas de cookies de suivi ou de publicité. 
                  Seuls des cookies techniques nécessaires au bon fonctionnement 
                  du site peuvent être utilisés.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-medium text-black mb-4">Responsabilité</h2>
                <p>
                  Les informations contenues sur ce site sont données à titre indicatif 
                  et sont susceptibles d'évoluer. AW Conseil et Formation ne saurait être 
                  tenue responsable des erreurs ou omissions, d'une absence de disponibilité 
                  des informations et/ou de la présence de virus sur son site.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-medium text-black mb-4">Droit applicable</h2>
                <p>
                  Tout litige en relation avec l'utilisation du site 
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
