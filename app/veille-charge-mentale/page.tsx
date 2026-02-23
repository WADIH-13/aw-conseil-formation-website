const quickSignals = [
  {
    title: 'Fragmentation attentionnelle persistante',
    detail:
      'Sollicitations multiples réduisant la continuité des tâches et la récupération cognitive.',
  },
  {
    title: 'Responsabilisation informelle asymétrique',
    detail:
      'Transferts implicites de responsabilités concentrés sur un nombre restreint d’acteurs.',
  },
  {
    title: 'Urgence organisationnelle non formalisée',
    detail:
      'Priorités implicites créant une tension opérationnelle et un déficit de clarification.',
  },
]

const dossiers = [
  {
    id: 'sas-decompression',
    title: 'Note d’analyse – Sas de décompression organisationnel',
    intro:
      'Dispositif court de régulation collective visant à prévenir la saturation cumulative.',
    tags: ['Prévention primaire', 'Régulation collective'],
  },
  {
    id: 'repartition-reunion',
    title: 'Note méthodologique – Répartition structurée de la charge en réunion',
    intro: 'Mécanisme de distribution formalisée des responsabilités.',
    tags: ['Organisation', 'Clarification des rôles'],
  },
  {
    id: 'aidance-pro',
    title: 'Repère préventif – Identification des situations d’aidance professionnelle',
    intro:
      'Approche confidentielle et structurée de repérage des situations d’exposition indirecte.',
    tags: ['Repérage', 'Confidentialité'],
  },
]

const ressources = [
  {
    title: 'Note d’analyse – Sas de décompression organisationnel',
    detail:
      'Dispositif court de régulation collective visant à prévenir la saturation cumulative.',
  },
  {
    title: 'Note méthodologique – Répartition structurée de la charge en réunion',
    detail: 'Mécanisme de distribution formalisée des responsabilités.',
  },
  {
    title: 'Repère préventif – Identification des situations d’aidance professionnelle',
    detail:
      'Approche confidentielle et structurée de repérage des situations d’exposition indirecte.',
  },
]

export default function VeilleChargeMentalePage() {
  return (
    <div className="bg-white">
      <section className="py-20 border-b border-gray-100">
        <div className="container-custom space-y-6">
          <p className="text-sm uppercase tracking-wide text-aw-red font-semibold">Observatoire</p>
          <h1 className="text-4xl md:text-5xl font-light text-black">
            Observatoire Organisationnel
            <br />
            Charge Mentale &amp; Prévention des Risques Psychosociaux
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl leading-relaxed">
            Cellule d’analyse des dynamiques de charge et des tensions émergentes en environnement professionnel.
          </p>
          <p className="text-gray-700 max-w-4xl leading-relaxed">
            Dispositif d’observation continue au service de la prévention des risques psychosociaux, en appui de l’obligation
            générale de prévention définie par le Code du travail.
          </p>
          <p className="text-sm text-gray-500">Derniere mise a jour : Fevrier 2026</p>
          <div className="max-w-4xl border border-gray-100 rounded-xl p-4 bg-gray-50">
            <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-2">Cadre de reference</p>
            <div className="flex flex-col gap-2 text-sm">
              <a
                href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000037388840"
                className="text-aw-red font-medium underline underline-offset-4"
                target="_blank"
                rel="noreferrer"
              >
                https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000037388840
              </a>
              <a
                href="https://www.inrs.fr/risques/psychosociaux.html"
                className="text-aw-red font-medium underline underline-offset-4"
                target="_blank"
                rel="noreferrer"
              >
                https://www.inrs.fr/risques/psychosociaux.html
              </a>
              <a
                href="https://www.anact.fr/qualite-de-vie-et-conditions-de-travail-qvct"
                className="text-aw-red font-medium underline underline-offset-4"
                target="_blank"
                rel="noreferrer"
              >
                https://www.anact.fr/qualite-de-vie-et-conditions-de-travail-qvct
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-2xl font-light text-black">Signaux en observation</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quickSignals.map((signal) => (
                <div key={signal.title} className="bg-gray-50 border border-gray-100 rounded-lg p-4 shadow-sm">
                  <p className="text-lg font-medium text-black">{signal.title}</p>
                  <p className="text-sm text-gray-700 mt-2 leading-relaxed">{signal.detail}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm space-y-3">
            <p className="text-sm uppercase tracking-wide text-aw-red font-semibold">Approche</p>
            <h3 className="text-xl font-semibold text-black">Méthodologie d’analyse</h3>
            <div className="text-gray-700 text-sm leading-relaxed space-y-3">
              <p>Chaque signal est examiné selon une grille structurée :</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Nature du facteur de risque</li>
                <li>Population exposée</li>
                <li>Intensité estimée</li>
                <li>Impact opérationnel potentiel</li>
                <li>Axe de prévention primaire recommandé</li>
              </ul>
              <p>Les observations peuvent alimenter :</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>DUERP</li>
                <li>Plans d’action RPS</li>
                <li>Démarches QVCT</li>
                <li>Dialogue social</li>
                <li>Programmes de formation structurés</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container-custom space-y-6">
          <h2 className="text-2xl font-light text-black">Dossiers d’analyse</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dossiers.map((dossier) => (
              <div key={dossier.title} className="bg-white border border-gray-100 rounded-lg p-5 shadow-sm">
                <p className="text-sm text-aw-red font-semibold mb-2">Dossier</p>
                <h3 className="text-lg font-medium text-black">
                  <a href={`#${dossier.id}`} className="hover:underline">
                    {dossier.title}
                  </a>
                </h3>
                <p className="text-sm text-gray-700 mt-2 leading-relaxed">{dossier.intro}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {dossier.tags.map((tag) => (
                    <span key={tag} className="text-xs px-3 py-1 bg-gray-50 border border-gray-200 rounded-full text-gray-700">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            <div id="sas-decompression" className="bg-white border border-gray-100 rounded-lg p-5 shadow-sm space-y-3">
              <h3 className="text-base font-semibold text-black">Sas de decompression organisationnel</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Contexte : moments de charge dense et transitions rapides. Besoin d’un temps court de regulation collective.
              </p>
              <div className="text-sm text-gray-700">
                <p className="font-medium text-black">Indicateurs observables</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Reunions enchainées sans pause</li>
                  <li>Decisions reportees faute de temps</li>
                  <li>Augmentation des reprises de dossier</li>
                </ul>
              </div>
              <p className="text-sm text-gray-700">
                Axe de prevention primaire : organiser un rituel court de regulation collective.
              </p>
              <a
                href="https://www.anact.fr/qualite-de-vie-et-conditions-de-travail-qvct"
                className="text-aw-red text-sm font-medium underline underline-offset-4"
                target="_blank"
                rel="noreferrer"
              >
                Reference officielle
              </a>
            </div>
            <div id="repartition-reunion" className="bg-white border border-gray-100 rounded-lg p-5 shadow-sm space-y-3">
              <h3 className="text-base font-semibold text-black">Repartition structuree en reunion</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Contexte : accumulation de roles informels en animation, suivi et compte rendu.
              </p>
              <div className="text-sm text-gray-700">
                <p className="font-medium text-black">Indicateurs observables</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Meme personne porte l’animation</li>
                  <li>Suivi des actions concentre</li>
                  <li>Decisions peu formalisees</li>
                </ul>
              </div>
              <p className="text-sm text-gray-700">
                Axe de prevention primaire : formaliser la distribution des responsabilites.
              </p>
              <a
                href="https://www.inrs.fr/risques/psychosociaux.html"
                className="text-aw-red text-sm font-medium underline underline-offset-4"
                target="_blank"
                rel="noreferrer"
              >
                Reference officielle
              </a>
            </div>
            <div id="aidance-pro" className="bg-white border border-gray-100 rounded-lg p-5 shadow-sm space-y-3">
              <h3 className="text-base font-semibold text-black">Aidance professionnelle</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Contexte : exposition indirecte a des situations difficiles sans cadre de repere.
              </p>
              <div className="text-sm text-gray-700">
                <p className="font-medium text-black">Indicateurs observables</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Sollicitations recurrentes hors perimetre</li>
                  <li>Charge emotionnelle reportee</li>
                  <li>Isolement dans le traitement</li>
                </ul>
              </div>
              <p className="text-sm text-gray-700">
                Axe de prevention primaire : poser un cadre de repere et d’orientation.
              </p>
              <a
                href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000037388840"
                className="text-aw-red text-sm font-medium underline underline-offset-4"
                target="_blank"
                rel="noreferrer"
              >
                Reference officielle
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-wide text-aw-red font-semibold">Ressources</p>
              <h2 className="text-2xl font-light text-black">Notes d’analyse &amp; repères méthodologiques</h2>
              <p className="text-gray-700 leading-relaxed">
                Sélection de notes opérationnelles et de repères structurants au service des démarches de prévention primaire.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {ressources.map((item) => (
                <div key={item.title} className="bg-gray-50 border border-gray-100 rounded-lg p-4 shadow-sm">
                  <p className="text-base font-medium text-black">{item.title}</p>
                  <p className="text-sm text-gray-700 mt-1 leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
