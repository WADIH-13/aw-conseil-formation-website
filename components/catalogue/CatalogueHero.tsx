export function CatalogueHero() {
  return (
    <div className="relative bg-gradient-to-br from-aw-red via-red-700 to-red-900 overflow-hidden">
      {/* Decorative gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-red-400 opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-400 opacity-5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-32">
        <div className="max-w-3xl">
          <p className="text-red-100 text-xs font-bold uppercase tracking-wider mb-6">
            Explorez nos solutions
          </p>
          <h1 className="text-5xl md:text-6xl font-light text-white leading-tight mb-8">
            Catalogue<br />
            <span className="font-semibold text-red-100">des formations</span>
          </h1>
          <p className="text-xl text-red-50 leading-relaxed max-w-2xl mb-12">
            Sélection de formations, d'ateliers et de solutions de conseil pour réduire la charge mentale, 
            sécuriser la performance humaine et renforcer les pratiques professionnelles.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
            <div className="text-red-100">
              <p className="text-3xl font-light text-white mb-1">25+</p>
              <p className="text-sm text-red-200">Formations</p>
            </div>
            <div className="text-red-100">
              <p className="text-3xl font-light text-white mb-1">12+</p>
              <p className="text-sm text-red-200">Ateliers</p>
            </div>
            <div className="text-red-100">
              <p className="text-3xl font-light text-white mb-1">100%</p>
              <p className="text-sm text-red-200">Opérationnel</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
