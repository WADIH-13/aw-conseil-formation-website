'use client'

import { useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'

const OPTIONS = [
  { value: 'fluide', label: 'Fluide', color: 'bg-green-500' },
  { value: 'charge', label: 'Charge', color: 'bg-yellow-400' },
  { value: 'lourd', label: 'Lourd', color: 'bg-red-500' },
]

type Choice = 'fluide' | 'charge' | 'lourd'

export default function MeteoCollectivePage() {
  const searchParams = useSearchParams()
  const [activeChoice, setActiveChoice] = useState<Choice | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const perimeter = useMemo(() => {
    const raw = searchParams.get('perimeter') || ''
    const trimmed = raw.trim()
    return trimmed.length > 0 ? trimmed.slice(0, 64) : undefined
  }, [searchParams])

  const handleChoice = async (value: Choice) => {
    if (isSubmitting) return
    setIsSubmitting(true)
    setActiveChoice(value)

    try {
      await fetch('/api/meteo-collective/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value, perimeter }),
      })
    } catch {
      // Silent by design; no explicit confirmation
    } finally {
      window.setTimeout(() => {
        setIsSubmitting(false)
        setActiveChoice(null)
      }, 700)
    }
  }

  return (
    <div className="bg-white">
      <section className="aw-hero-surface min-h-[70vh] flex items-center">
        <div className="container-custom w-full">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-light text-black mb-6 leading-tight">
              Comment qualifieriez-vous le fonctionnement collectif sur la periode ecoulee ?
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
              {OPTIONS.map((option) => {
                const isActive = activeChoice === option.value
                return (
                  <button
                    key={option.value}
                    type="button"
                    aria-pressed={isActive}
                    disabled={isSubmitting}
                    onClick={() => handleChoice(option.value as Choice)}
                    className={[
                      'w-full rounded-2xl border border-black/10 px-6 py-6 text-lg font-semibold transition-all duration-200',
                      'bg-white hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)]',
                      isActive ? 'ring-2 ring-black/15 scale-[0.98]' : 'scale-100',
                      isSubmitting ? 'opacity-80 cursor-default' : 'cursor-pointer',
                    ].join(' ')}
                  >
                    <div className="flex items-center justify-center gap-3">
                      <span className={`inline-flex h-3 w-3 rounded-full ${option.color}`} />
                      <span>{option.label}</span>
                    </div>
                  </button>
                )
              })}
            </div>
            <p className="mt-8 text-sm text-black/50">
              Observation collective non intrusive. Aucune evaluation individuelle.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
