type IndicatorsProps = {
  year?: number | string
  satisfaction?: number | string | null
  objectives?: number | string | null
  participation?: number | string | null
}

export default function Indicators({
  year,
  satisfaction = null,
  objectives = null,
  participation = null,
}: IndicatorsProps) {
  const display = (v: number | string | null) => (v === null || v === undefined || v === '' ? '—' : v)
  const y = year ?? new Date().getFullYear()

  return (
    <section aria-labelledby="indicators-title" className="py-10">
      <div className="container-custom max-w-6xl mx-auto">
        <h3 id="indicators-title" className="text-lg font-medium text-black mb-6 text-left">
          Indicateurs de résultats – Année {y}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white border border-black/5 rounded-2xl p-6 flex flex-col justify-between shadow-sm">
            <div>
              <div className="text-5xl md:text-6xl font-semibold text-black leading-tight">{display(satisfaction)}</div>
              <div className="h-0.5 w-14 bg-aw-red my-3" aria-hidden="true" />
              <div className="text-sm text-gray-700">Satisfaction des participants</div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-gray-50/50 border border-black/5 rounded-2xl p-6 flex flex-col justify-between shadow-sm">
            <div>
              <div className="text-5xl md:text-6xl font-semibold text-black leading-tight">{display(objectives)}</div>
              <div className="h-0.5 w-14 bg-aw-red my-3" aria-hidden="true" />
              <div className="text-sm text-gray-700">Objectifs pédagogiques atteints</div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-black/5 rounded-2xl p-6 flex flex-col justify-between shadow-sm">
            <div>
              <div className="text-5xl md:text-6xl font-semibold text-black leading-tight">{display(participation)}</div>
              <div className="h-0.5 w-14 bg-aw-red my-3" aria-hidden="true" />
              <div className="text-sm text-gray-700">Taux de participation</div>
            </div>
          </div>
        </div>

        <p className="mt-4 text-sm text-gray-600">Évaluation réalisée via mises en situation et échanges avec le formateur. Indicateurs issus des questionnaires de fin de formation.</p>
      </div>
    </section>
  )
}
