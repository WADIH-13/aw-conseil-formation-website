export function CellesEtceuxHero() {
  return (
    <div className="relative bg-white overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-red-50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-gray-50 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 md:py-40">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-wider text-aw-red mb-8">
            Notre équipe
          </p>
          <h1 className="text-6xl md:text-7xl font-light text-gray-900 leading-tight mb-8">
            Celles et ceux<br />
            <span className="text-aw-red">qui font</span> la différence
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed max-w-2xl">
            Des consultants, formateurs et intervenants reconnus pour leur expertise en prévention des risques psychosociaux, charge mentale et qualité de vie au travail.
          </p>
        </div>
      </div>
    </div>
  );
}
