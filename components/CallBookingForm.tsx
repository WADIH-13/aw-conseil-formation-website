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
      setStatusMessage('Votre créneau est réservé. Nous vous confirmons très vite par email.')
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
    <div className="bg-white border border-black/5 rounded-2xl p-6 md:p-8 aw-card-surface">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm tracking-[0.22em] uppercase text-black/50">Réserver un appel</p>
          <h2 className="text-2xl md:text-3xl font-light text-black mt-2">Choisissez votre créneau de 20 minutes</h2>
        </div>
        <p className="text-sm text-black/60">Fuseau : {TIME_ZONE}</p>
      </div>

      <div className="mt-6 space-y-6">
        <div>
          <label htmlFor="departmentCode" className="block text-xs tracking-[0.24em] uppercase text-black/60 mb-2">
            Département
          </label>
          <select
            id="departmentCode"
            name="departmentCode"
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aw-red focus-visible:ring-offset-2"
            value={formState.departmentCode}
            onChange={(event) => handleDepartmentChange(event.target.value)}
            disabled={isLoadingDepartments}
            required
          >
            <option value="">Sélectionner un département</option>
            {departments.map((department) => (
              <option key={department.code} value={department.code}>
                {department.code} — {department.name}
              </option>
            ))}
          </select>
        </div>

        {availability?.responsible && (
          <div className="rounded-xl border border-black/10 bg-black/[0.02] p-4">
            <p className="text-xs tracking-[0.24em] uppercase text-black/50">Votre interlocuteur</p>
            <p className="mt-2 text-lg text-black/80 font-light">{availability.responsible.full_name}</p>
            {availability.responsible.title ? (
              <p className="text-sm text-black/60">{availability.responsible.title}</p>
            ) : null}
          </div>
        )}

        <div>
          <p className="text-xs tracking-[0.24em] uppercase text-black/60 mb-3">Créneaux disponibles</p>
          {isLoadingSlots && (
            <p className="text-sm text-black/50">Chargement des disponibilités…</p>
          )}
          {!isLoadingSlots && !hasSlots && formState.departmentCode && (
            <p className="text-sm text-black/50">Aucun créneau disponible pour ce département.</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availability?.days.map((day) => (
              <div key={day.date} className="rounded-xl border border-black/10 p-4">
                <p className="text-sm font-medium text-black/80 capitalize">{formatDateLabel(day.date)}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {day.slots.length ? (
                    day.slots.map((slot) => {
                      const isSelected = selectedSlot?.start === slot.start
                      return (
                        <button
                          type="button"
                          key={slot.start}
                          onClick={() => setSelectedSlot(slot)}
                          className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-all ${
                            isSelected
                              ? 'bg-aw-red text-white border-aw-red'
                              : 'border-black/10 text-black/70 hover:border-aw-red hover:text-aw-red'
                          }`}
                        >
                          {slot.label}
                        </button>
                      )
                    })
                  ) : (
                    <span className="text-xs text-black/45">Aucun créneau</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-2">
                Nom et prénom
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formState.name}
                onChange={handleInputChange}
                className="w-full rounded-[10px] border border-black/10 px-4 py-3 text-gray-900 focus:border-aw-red-deep focus:outline-none focus:ring-1 focus:ring-aw-red-deep"
                placeholder="Votre nom"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formState.email}
                onChange={handleInputChange}
                className="w-full rounded-[10px] border border-black/10 px-4 py-3 text-gray-900 focus:border-aw-red-deep focus:outline-none focus:ring-1 focus:ring-aw-red-deep"
                placeholder="vous@exemple.com"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-900 mb-2">
                Téléphone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formState.phone}
                onChange={handleInputChange}
                className="w-full rounded-[10px] border border-black/10 px-4 py-3 text-gray-900 focus:border-aw-red-deep focus:outline-none focus:ring-1 focus:ring-aw-red-deep"
                placeholder="06 00 00 00 00"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-900 mb-2">
                Sujet de l’appel
              </label>
              <input
                id="message"
                name="message"
                type="text"
                value={formState.message}
                onChange={handleInputChange}
                className="w-full rounded-[10px] border border-black/10 px-4 py-3 text-gray-900 focus:border-aw-red-deep focus:outline-none focus:ring-1 focus:ring-aw-red-deep"
                placeholder="Ex. Prévention RPS, formation, etc."
              />
            </div>
          </div>

          {status !== 'idle' && (
            <div
              className={`rounded-md px-4 py-3 text-sm ${
                status === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
              }`}
            >
              {statusMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting || !selectedSlot || !formState.departmentCode}
            className="inline-flex items-center justify-center px-8 py-3 rounded-[10px] bg-aw-red-deep text-white font-medium shadow-[0_12px_30px_rgba(139,29,29,0.18)] hover:bg-[#7C1818] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Réservation en cours…' : 'Réserver ce créneau'}
          </button>

          <p className="text-xs text-black/50">
            Durée : {SLOT_MINUTES} minutes. Nous vous rappelons à l’horaire choisi.
          </p>
        </form>
      </div>
    </div>
  )
}
