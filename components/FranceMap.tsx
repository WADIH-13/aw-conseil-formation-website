import React from 'react'

const cityMarkers = [
  { name: 'Lille', x: 120, y: 38 },
  { name: 'Paris', x: 105, y: 72 },
  { name: 'Nantes', x: 70, y: 98 },
  { name: 'Lyon', x: 140, y: 118 },
  { name: 'Marseille', x: 138, y: 155 },
  { name: 'Toulouse', x: 90, y: 148 },
]

export default function FranceMap() {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center md:space-x-8">
        <div className="md:w-3/5">
          <svg
            viewBox="0 0 200 210"
            className="w-full h-auto"
            role="img"
            aria-label="Carte stylisée de la France"
          >
            <defs>
              <linearGradient id="mapGradient" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="#fef2f2" />
                <stop offset="100%" stopColor="#fee2e2" />
              </linearGradient>
            </defs>

            <path
              d="M72 14 L132 38 L148 88 L132 138 L88 168 L36 142 L26 86 Z"
              fill="url(#mapGradient)"
              stroke="#dc2626"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />

            <path
              d="M158 156 L174 168 L168 184 L152 176 Z"
              fill="#fee2e2"
              stroke="#dc2626"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />

            {cityMarkers.map((city) => (
              <g key={city.name}>
                <circle cx={city.x} cy={city.y} r={5} fill="#dc2626" />
                <text
                  x={city.x + 8}
                  y={city.y + 2}
                  className="text-xs"
                  fill="#111827"
                >
                  {city.name}
                </text>
              </g>
            ))}
          </svg>
        </div>
        <div className="md:w-2/5 mt-6 md:mt-0 space-y-4">
          <h3 className="text-xl font-semibold text-black">Présence nationale apaisée</h3>
          <p className="text-gray-700 leading-relaxed">
            Une carte simple pour visualiser les ancrages actuels et les zones où nous facilitons déjà des rencontres.
            Chaque point illustre une équipe partenaire ou un lieu d&apos;intervention récurrent.
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
