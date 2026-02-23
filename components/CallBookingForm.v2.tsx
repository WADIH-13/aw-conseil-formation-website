'use client'

import type { ChangeEvent, FormEvent } from 'react'
import { useEffect, useMemo, useState } from 'react'

const TIME_ZONE = 'Europe/Paris'
const SLOT_MINUTES = 20

type DepartmentOption = {
  code: string
  name: string
}

type ResponsibleInfo = {
  id: string
  full_name: string
  title?: string | null
}

type AvailabilitySlot = {
  start: string
  end: string
  label: string
}

type AvailabilityDay = {
  date: string
  slots: AvailabilitySlot[]
}

type AvailabilityResponse = {
  responsible: ResponsibleInfo
  days: AvailabilityDay[]
}

const initialFormState = {
  departmentCode: '',
  name: '',
  email: '',
  phone: '',
  message: '',
}

function formatDateLabel(dateValue: string): string {
  const date = new Date(`${dateValue}T00:00:00`)
  return new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    timeZone: TIME_ZONE,
  }).format(date)
}

export default function CallBookingForm() {
  const [departments, setDepartments] = useState<DepartmentOption[]>([])
  const [availability, setAvailability] = useState<AvailabilityResponse | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<AvailabilitySlot | null>(null)
  const [formState, setFormState] = useState(initialFormState)
  const [isLoadingDepartments, setIsLoadingDepartments] = useState(true)
  const [isLoadingSlots, setIsLoadingSlots] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  const hasSlots = useMemo(() => availability?.days.some((day) => day.slots.length) ?? false, [availability])

  useEffect(() => {
    let isMounted = true

    const loadDepartments = async () => {
      try {
        const response = await fetch('/api/call-booking/departments')
        const data = await response.json()
        if (!response.ok) {
          throw new Error(data?.message || 'Impossible de charger les départements.')
        }
        if (isMounted) {
          setDepartments(data?.departments ?? [])
        }
      } catch (error) {
        if (isMounted) {
          setStatus('error')
          setStatusMessage('Impossible de charger les départements pour la réservation.')
        }
      } finally {
        if (isMounted) {
          setIsLoadingDepartments(false)
        }
      }
    }

    loadDepartments()

    return () => {
      isMounted = false
    }
  }, [])

  const handleDepartmentChange = async (value: string) => {
    setFormState((prev) => ({ ...prev, departmentCode: value }))
    setSelectedSlot(null)
    setAvailability(null)
    setStatus('idle')
    setStatusMessage('')

    if (!value) return

    setIsLoadingSlots(true)
    try {
      const response = await fetch(`/api/call-booking/availability?department_code=${encodeURIComponent(value)}`)
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data?.message || 'Aucun créneau disponible pour ce département.')
      }
      setAvailability(data)
    } catch (error) {
      setAvailability(null)
      setStatus('error')
      setStatusMessage((error as Error).message)
    } finally {
      setIsLoadingSlots(false)
    }
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setStatus('idle')
    setStatusMessage('')

    try {
      if (!selectedSlot) {
        throw new Error('Merci de choisir un créneau disponible.')
      }

      const response = await fetch('/api/call-booking/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          departmentCode: formState.departmentCode,
          slotStart: selectedSlot.start,
          name: formState.name,
          email: formState.email,
          phone: formState.phone,
          message: formState.message,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data?.message || 'Impossible de confirmer la réservation pour le moment.')
      }

      setStatus('success')
      setStatusMessage('✓ Votre créneau est réservé. Nous vous confirmons très vite par email.')
      setFormState(initialFormState)
      setSelectedSlot(null)
    } catch (error) {
      setStatus('error')
      setStatusMessage((error as Error).message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full">
      <div className="space-y-8">
        {/* STEP 1: DEPARTMENT SELECTION */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-aw-red to-red-700 text-white flex items-center justify-center font-bold shadow-md">
              1
            </div>
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-aw-red font-bold">Étape 1</p>
              <h3 className="text-lg font-medium text-black">Choisissez votre région</h3>
            </div>
          </div>

          {isLoadingDepartments ? (
            <div className="bg-black/[0.02] rounded-xl p-4 text-center text-gray-600">
              Chargement des régions...
            </div>
          ) : departments.length === 0 ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <p className="text-sm text-yellow-800">
                Aucune région disponible pour le moment. Contactez-nous directement.
              </p>
            </div>
          ) : (
            <select
              value={formState.departmentCode}
              onChange={(e) => handleDepartmentChange(e.target.value)}
              className="w-full rounded-xl border-2 border-black/10 hover:border-aw-red/30 bg-white px-5 py-4 text-base text-black/80 font-medium focus:border-aw-red focus:outline-none focus:ring-2 focus:ring-aw-red/20 transition"
            >
              <option value="">Sélectionner votre région…</option>
              {departments.map((dept) => (
                <option key={dept.code} value={dept.code}>
                  {dept.name}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* STEP 2: AVAILABILITY SELECTION */}
        {formState.departmentCode && (
          <div className="space-y-4 pt-6 border-t border-black/10">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-aw-red to-red-700 text-white flex items-center justify-center font-bold shadow-md">
                2
              </div>
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-aw-red font-bold">Étape 2</p>
                <h3 className="text-lg font-medium text-black">Sélectionnez votre créneau</h3>
              </div>
            </div>

            {isLoadingSlots ? (
              <div className="bg-black/[0.02] rounded-xl p-6 text-center">
                <div className="inline-block animate-spin rounded-full h-6 w-6 border-2 border-aw-red border-r-transparent mb-3" />
                <p className="text-sm text-gray-600">Chargement des créneaux disponibles…</p>
              </div>
            ) : availability ? (
              <div className="space-y-4">
                {/* RESPONSIBLE INFO */}
                {availability.responsible && (
                  <div className="rounded-xl border-2 border-aw-red/20 bg-gradient-to-r from-aw-red/10 via-red-50/50 to-transparent p-5">
                    <p className="text-xs tracking-[0.24em] uppercase text-aw-red font-bold mb-2">Votre interlocuteur</p>
                    <p className="text-lg font-medium text-black">{availability.responsible.full_name}</p>
                    {availability.responsible.title && (
                      <p className="text-sm text-gray-600 mt-1">{availability.responsible.title}</p>
                    )}
                  </div>
                )}

                {/* SLOTS GRID */}
                {hasSlots ? (
                  <div className="space-y-4">
                    {availability.days.map((day) => (
                      <div key={day.date}>
                        <p className="text-sm font-medium text-black/60 mb-3 uppercase tracking-wider">
                          📅 {formatDateLabel(day.date)}
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                          {day.slots.map((slot) => (
                            <button
                              key={`${day.date}-${slot.start}`}
                              type="button"
                              onClick={() => setSelectedSlot(slot)}
                              className={`px-4 py-3 rounded-lg border-2 font-semibold text-sm transition-all transform ${
                                selectedSlot?.start === slot.start
                                  ? 'border-aw-red bg-aw-red text-white shadow-lg scale-105'
                                  : 'border-black/10 bg-white text-black/70 hover:border-aw-red hover:text-aw-red hover:bg-red-50'
                              }`}
                            >
                              🕐 {slot.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                    <p className="text-sm text-yellow-800">
                      Aucun créneau disponible pour cette région en ce moment.
                    </p>
                  </div>
                )}
              </div>
            ) : status === 'error' ? (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-sm text-red-800">{statusMessage}</p>
              </div>
            ) : null}
          </div>
        )}

        {/* STEP 3: CONTACT DETAILS */}
        {selectedSlot && (
          <form onSubmit={handleSubmit} className="space-y-4 pt-6 border-t border-black/10">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-aw-red to-red-700 text-white flex items-center justify-center font-bold shadow-md">
                3
              </div>
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-aw-red font-bold">Étape 3</p>
                <h3 className="text-lg font-medium text-black">Confirmez vos coordonnées</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs tracking-[0.24em] uppercase text-black/60 mb-2 font-medium">
                  Nom *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formState.name}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-black/80 focus:border-aw-red focus:outline-none focus:ring-1 focus:ring-aw-red transition"
                />
              </div>
              <div>
                <label className="block text-xs tracking-[0.24em] uppercase text-black/60 mb-2 font-medium">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formState.email}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-black/80 focus:border-aw-red focus:outline-none focus:ring-1 focus:ring-aw-red transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs tracking-[0.24em] uppercase text-black/60 mb-2 font-medium">
                Téléphone (optionnel)
              </label>
              <input
                type="tel"
                name="phone"
                value={formState.phone}
                onChange={handleInputChange}
                className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-black/80 focus:border-aw-red focus:outline-none focus:ring-1 focus:ring-aw-red transition"
              />
            </div>

            <div>
              <label className="block text-xs tracking-[0.24em] uppercase text-black/60 mb-2 font-medium">
                Sujet (optionnel)
              </label>
              <input
                type="text"
                name="message"
                value={formState.message}
                onChange={handleInputChange}
                className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-black/80 focus:border-aw-red focus:outline-none focus:ring-1 focus:ring-aw-red transition"
                placeholder="Ex. Prévention RPS, formation…"
              />
            </div>

            {/* STATUS MESSAGES */}
            {status === 'success' && (
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
                <p className="text-sm text-green-800 font-medium">{statusMessage}</p>
              </div>
            )}

            {status === 'error' && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                <p className="text-sm text-red-800 font-medium">{statusMessage}</p>
              </div>
            )}

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-primary py-4 font-semibold text-base disabled:opacity-50 disabled:cursor-not-allowed transition mt-2"
            >
              {isSubmitting ? '⏳ Réservation en cours…' : '✓ Confirmer ma réservation'}
            </button>

            <p className="text-xs text-black/50 text-center">
              🕒 Durée : {SLOT_MINUTES} min • 📞 Nous vous rappelons à l'heure choisie
            </p>
          </form>
        )}
      </div>
    </div>
  )
}
