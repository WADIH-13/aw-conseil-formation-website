export function HeroAvancer() {
  return (
    <section className="relative min-h-screen bg-white flex items-center justify-center overflow-hidden pt-32 pb-32">
      {/* Subtle background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-l from-red-100 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-gradient-to-r from-gray-100 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-12">
        <div className="space-y-6">
          <p className="text-xs font-bold uppercase tracking-widest text-aw-red">
            Trajectoires singulières
          </p>
          
          <h1 className="text-7xl md:text-8xl font-light text-gray-900 leading-tight">
            Celles et ceux<br />
            <span className="text-aw-red font-light">qui avancent</span><br />
            avec AW
          </h1>

          <p className="text-2xl font-light text-gray-700 pt-4">
            Des visions singulières.<br />Un élan commun.
          </p>
        </div>

        <div className="max-w-2xl mx-auto space-y-8 pt-12 border-t border-gray-200">
          <p className="text-lg text-gray-700 leading-relaxed">
            Nous avançons avec celles et ceux qui choisissent l'exigence sans rigidité, la liberté sans désordre, la progression sans compromis sur l'humain.
          </p>
          
          <div className="space-y-4 text-gray-600">
            <p className="text-base leading-relaxed">
              Chaque trajectoire présentée ici porte une vision.
            </p>
            <p className="text-base leading-relaxed">
              L'ensemble construit un mouvement.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
