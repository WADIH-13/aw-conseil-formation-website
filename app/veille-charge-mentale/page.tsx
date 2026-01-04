const quickSignals = [
  {
    title: 'Fatigue numérique',
    detail: 'Notifications et micro-ruptures diminuent la récupération mentale.',
  },
  {
    title: 'Surcharge invisible',
    detail: 'Responsabilités diffuses qui glissent du collectif vers une seule personne.',
  },
  {
    title: 'Urgence silencieuse',
    detail: 'Priorités non dites qui créent de la tension latente dans l’équipe.',
  },
]

const dossiers = [
  {
    title: 'Organiser un sas de décompression',
    intro: 'Un temps court, répété, qui aide à poser ce qui pèse avant de repartir.',
    tags: ['5-10 minutes', 'Equipe'],
  },
  {
    title: 'Répartir la charge mentale en réunion',
    intro: 'Des rôles tournants pour éviter qu’une seule personne porte l’animation et le suivi.',
    tags: ['Collectif', 'Prévention'],
  },
  {
    title: 'Prendre soin des aidants',
    intro: 'Identifier sans exposer, proposer des ressources simples et confidentielles.',
    tags: ['Aidants', 'Confidentialité'],
  },
]

const ressources = [
  {
    title: 'Checklist apaisée',
    detail: '3 questions pour sentir la fatigue mentale avant qu’elle ne s’installe.',
  },
  {
    title: 'Template d’alerte bienveillante',
    detail: 'Un message court pour dire “je suis saturé·e, j’ai besoin d’un relais”.',
  },
  {
    title: 'Rituels de récupération',
    detail: 'Des micro-pauses guidées sans injonction à la performance.',
  },
]

export default function VeilleChargeMentalePage() {
  return (
    <div className="bg-white">
      <section className="py-20 border-b border-gray-100">
        <div className="container-custom space-y-6">
          <p className="text-sm uppercase tracking-wide text-aw-red font-semibold">Veille</p>
          <h1 className="text-4xl md:text-5xl font-light text-black">Charge mentale : les signaux à suivre</h1>
          <p className="text-xl text-gray-700 max-w-3xl leading-relaxed">
            Un espace de veille pour repérer ce qui évolue, partager des ressources simples
            et aider chaque équipe à garder de la clarté malgré la pression du quotidien.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-2xl font-light text-black">Le radar du moment</h2>
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
            <h3 className="text-xl font-semibold text-black">Observation sans alarme</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Nous partageons des repères simples, sans culpabiliser ni dramatiser.
              Le but : permettre aux équipes de s&apos;ajuster avec douceur.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container-custom space-y-6">
          <h2 className="text-2xl font-light text-black">Dossiers à parcourir</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dossiers.map((dossier) => (
              <div key={dossier.title} className="bg-white border border-gray-100 rounded-lg p-5 shadow-sm">
                <p className="text-sm text-aw-red font-semibold mb-2">Nouveau</p>
                <h3 className="text-lg font-medium text-black">{dossier.title}</h3>
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
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-wide text-aw-red font-semibold">Ressources</p>
              <h2 className="text-2xl font-light text-black">À tester tout de suite</h2>
              <p className="text-gray-700 leading-relaxed">
                Des formats courts, sans jargon, que tu peux partager ou adapter. Ils sont pensés pour être relus en quelques minutes.
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
