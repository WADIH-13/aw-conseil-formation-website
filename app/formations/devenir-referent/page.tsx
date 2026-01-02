import Link from 'next/link'

export const metadata = {
  title: 'Devenir référent charge mentale - 28h - AW Conseil et Formation',
  description: 'Formation pour devenir référent charge mentale. 28 heures pour acquérir les outils et la posture pour accompagner avec bienveillance.',
}

export default function DevenirReferentPage() {
  return (
    <div className="bg-white">
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="text-sm text-aw-red font-medium mb-4">Formation - 28 heures</div>
              <h1 className="text-4xl md:text-5xl font-light text-black mb-6 leading-tight">
                Devenir référent charge mentale
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Acquérir les outils et la posture pour soutenir vos collègues.<br />
                Avec bienveillance et professionnalisme.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-light text-black mb-8 text-center">
              Ce que vous allez apprendre
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-lg font-medium text-black mb-4">Développer une écoute bienveillante</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Comment être présent sans envahir ? 
                  Comment écouter sans juger ? 
                  Les bases d'un accompagnement respectueux.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-lg font-medium text-black mb-4">Accompagner sans conseiller</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Résister à l'envie de donner des solutions. 
                  Faire confiance à la personne accompagnée. 
                  L'art de poser les bonnes questions.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-lg font-medium text-black mb-4">Orienter vers les bonnes ressources</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Connaître vos limites et celles de votre rôle. 
                  Savoir quand et vers qui orienter. 
                  Construire un réseau de ressources fiables.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-lg font-medium text-black mb-4">Préserver votre propre équilibre</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Accompagner sans porter la charge des autres. 
                  Reconnaître vos signaux d'alerte. 
                  Prendre soin de vous pour mieux aider.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-light text-black mb-6">
                  Pour qui ?
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    Managers qui souhaitent mieux soutenir leurs équipes ?
                  </p>
                  <p>
                    Professionnels RH en première ligne face aux difficultés ?
                  </p>
                  <p>
                    Représentants du personnel qui veulent agir concrètement ?
                  </p>
                  <p>
                    Toute personne amenée à accompagner ses collègues ?
                  </p>
                  <p className="font-medium text-black">
                    Cette formation vous donnera les clés pour agir avec justesse.
                  </p>
                </div>
              </div>
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-xl font-medium text-black mb-6">Informations pratiques</h3>
                <div className="space-y-4">
                  <div>
                    <span className="font-medium text-black">Durée :</span>
                    <span className="text-gray-700 ml-2">28 heures (4 journées)</span>
                  </div>
                  <div>
                    <span className="font-medium text-black">Format :</span>
                    <span className="text-gray-700 ml-2">Présentiel recommandé</span>
                  </div>
                  <div>
                    <span className="font-medium text-black">Groupe :</span>
                    <span className="text-gray-700 ml-2">Maximum 10 personnes</span>
                  </div>
                  <div>
                    <span className="font-medium text-black">Suivi :</span>
                    <span className="text-gray-700 ml-2">3 mois d'accompagnement inclus</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-light text-black mb-8 text-center">
              Programme détaillé
            </h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-lg font-medium text-black mb-3">Jour 1 : Comprendre pour mieux accompagner</h3>
                <p className="text-gray-700 text-sm">
                  Les mécanismes de la charge mentale. Ses impacts sur l'individu et l'équipe. 
                  Votre rôle et ses limites.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-lg font-medium text-black mb-3">Jour 2 : Développer sa posture d'accompagnant</h3>
                <p className="text-gray-700 text-sm">
                  L'écoute active. La communication bienveillante. 
                  Comment créer un espace de confiance.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-lg font-medium text-black mb-3">Jour 3 : Outils et techniques d'accompagnement</h3>
                <p className="text-gray-700 text-sm">
                  Mener un entretien de soutien. Orienter efficacement. 
                  Cas pratiques et mises en situation.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-lg font-medium text-black mb-3">Jour 4 : Préserver son équilibre</h3>
                <p className="text-gray-700 text-sm">
                  Éviter l'épuisement du référent. Construire son réseau de soutien. 
                  Plan d'action personnalisé.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-light text-black mb-6">
              Prêt à devenir référent ?
            </h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Discutons ensemble de votre projet et des modalités 
              qui conviendraient le mieux à votre contexte.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-aw-red hover:bg-red-700 rounded-md transition-colors shadow-lg"
            >
              Prendre un temps d'échange
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
