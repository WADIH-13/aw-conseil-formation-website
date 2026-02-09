export default function AdminMeteoCollectivePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="text-sm tracking-[0.22em] uppercase text-black/50">Back-office</p>
          <h1 className="text-3xl md:text-4xl font-light text-black mt-2">Météo collective</h1>
          <p className="mt-2 text-gray-600">Version local-only : aucune donnée n’est enregistrée côté serveur.</p>
        </div>
      </div>

      <div className="bg-white border border-black/5 rounded-2xl aw-card-surface p-6 space-y-4 animate-fade-in">
        <p className="text-sm text-black/70 leading-relaxed">
          La météo collective a été volontairement conçue sans collecte et sans stockage côté serveur.
          Elle sert à ouvrir une discussion sur le fonctionnement collectif, sans ciblage individuel.
        </p>
        <div className="text-sm text-black/60 space-y-1">
          <p>Aucune statistique back-office n’est disponible (zéro donnée stockée).</p>
          <p>Page publique : <a className="underline" href="/meteo-collective">/meteo-collective</a></p>
        </div>
      </div>
    </div>
  )
}
