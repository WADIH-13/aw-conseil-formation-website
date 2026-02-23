import React from 'react'

export default function FranceMap() {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center md:space-x-8">
        <div className="md:w-3/5">
          <div className="relative">
            <img
              src="/france-map.svg?v=2"
              alt="Carte de France"
              className="w-full h-auto"
              loading="lazy"
            />
            <img
              src="/logo-aw.png"
              alt="Point d'ancrage AW dans le Var"
              className="absolute top-[79%] left-[76%] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/10 bg-white p-1 shadow-md"
              loading="lazy"
            />
            <div className="group absolute top-[29%] left-[60%] -translate-x-1/2 -translate-y-1/2">
              <img
                src="/logo-aw.png"
                alt="Point d'ancrage AW à Paris"
                className="h-7 w-7 rounded-full border border-gray-300 bg-white p-1 shadow-sm opacity-70 grayscale"
                loading="lazy"
              />
              <span className="pointer-events-none mt-1 inline-block whitespace-nowrap rounded-full border border-gray-300 bg-white/95 px-2 py-0.5 text-[10px] font-medium text-gray-600 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                Paris · Point partenaire
              </span>
            </div>
            <div className="group absolute top-[81%] left-[77%] -translate-x-1/2 -translate-y-1/2">
              <img
                src="/logo-aw.png"
                alt="Point d'ancrage AW à Marseille"
                className="h-7 w-7 rounded-full border border-gray-300 bg-white p-1 shadow-sm opacity-70 grayscale"
                loading="lazy"
              />
              <span className="pointer-events-none mt-1 inline-block whitespace-nowrap rounded-full border border-gray-300 bg-white/95 px-2 py-0.5 text-[10px] font-medium text-gray-600 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                Marseille · Point partenaire
              </span>
            </div>
            <div className="group absolute top-[77%] left-[89%] -translate-x-1/2 -translate-y-1/2">
              <img
                src="/logo-aw.png"
                alt="Point d'ancrage AW à Nice"
                className="h-7 w-7 rounded-full border border-gray-300 bg-white p-1 shadow-sm opacity-70 grayscale"
                loading="lazy"
              />
              <span className="pointer-events-none mt-1 inline-block whitespace-nowrap rounded-full border border-gray-300 bg-white/95 px-2 py-0.5 text-[10px] font-medium text-gray-600 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                Nice · Point partenaire
              </span>
            </div>
          </div>
        </div>
        <div className="md:w-2/5 mt-6 md:mt-0 space-y-4">
          <h3 className="text-xl font-semibold text-black">Présence nationale apaisée</h3>
          <p className="text-gray-700 leading-relaxed">
            Une carte structurée pour visualiser les ancrages partenaires sur le territoire.
            Chaque point représente une capacité d&apos;intervention coordonnée dans le cadre de l&apos;écosystème AW.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
              <p className="text-sm font-medium text-black">Nord & Île-de-France</p>
              <p className="text-sm text-gray-600">Sensibilisation en entreprise, cercles de parole</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
              <p className="text-sm font-medium text-black">Sud & littoral</p>
              <p className="text-sm text-gray-600">Prévention douce en milieux éducatifs et associatifs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
