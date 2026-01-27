'use client'

import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'

const initialState = {
  nom: '',
  organisation: '',
  email: '',
  telephone: '',
  sujet: '',
  message: '',
  consent: false,
}

export default function ContactForm() {
  const [formData, setFormData] = useState(initialState)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = event.target
    const isCheckbox = type === 'checkbox'
    setFormData((prev) => ({
      ...prev,
      [name]: isCheckbox ? (event.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setStatus('idle')
    setStatusMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        setStatus('error')
        setStatusMessage(data?.message || "Une erreur s'est produite. Merci de réessayer.")
        return
      }

      setStatus('success')
      setStatusMessage('Votre message a bien été envoyé. Nous vous répondrons rapidement.')
      setFormData(initialState)
    } catch (error) {
      setStatus('error')
      setStatusMessage("Impossible d'envoyer votre message. Merci de réessayer.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="nom" className="block text-sm font-medium text-gray-900 mb-2">
            Nom et prénom
          </label>
          <input
            id="nom"
            name="nom"
            type="text"
            required
            value={formData.nom}
            onChange={handleChange}
            className="w-full rounded-[10px] border border-black/10 px-4 py-3 text-gray-900 focus:border-aw-red-deep focus:outline-none focus:ring-1 focus:ring-aw-red-deep"
            placeholder="Votre nom"
          />
        </div>
        <div>
          <label htmlFor="organisation" className="block text-sm font-medium text-gray-900 mb-2">
            Organisation
          </label>
          <input
            id="organisation"
            name="organisation"
            type="text"
            value={formData.organisation}
            onChange={handleChange}
            className="w-full rounded-[10px] border border-black/10 px-4 py-3 text-gray-900 focus:border-aw-red-deep focus:outline-none focus:ring-1 focus:ring-aw-red-deep"
            placeholder="Entreprise / Structure"
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
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-[10px] border border-black/10 px-4 py-3 text-gray-900 focus:border-aw-red-deep focus:outline-none focus:ring-1 focus:ring-aw-red-deep"
            placeholder="vous@exemple.com"
          />
        </div>
        <div>
          <label htmlFor="telephone" className="block text-sm font-medium text-gray-900 mb-2">
            Téléphone
          </label>
          <input
            id="telephone"
            name="telephone"
            type="tel"
            value={formData.telephone}
            onChange={handleChange}
            className="w-full rounded-[10px] border border-black/10 px-4 py-3 text-gray-900 focus:border-aw-red-deep focus:outline-none focus:ring-1 focus:ring-aw-red-deep"
            placeholder="06 00 00 00 00"
          />
        </div>
      </div>

      <div>
        <label htmlFor="sujet" className="block text-sm font-medium text-gray-900 mb-2">
          Sujet
        </label>
        <select
          id="sujet"
          name="sujet"
          required
          value={formData.sujet}
          onChange={handleChange}
          className="w-full rounded-[10px] border border-black/10 px-4 py-3 text-gray-900 focus:border-aw-red-deep focus:outline-none focus:ring-1 focus:ring-aw-red-deep"
        >
          <option value="">Sélectionner un sujet</option>
          <option value="Conseil">Conseil</option>
          <option value="Formation">Formation</option>
          <option value="Ateliers">Ateliers / Solutions</option>
          <option value="Barometre">Baromètre de charge mentale</option>
          <option value="Autre">Autre</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-900 mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          value={formData.message}
          onChange={handleChange}
          className="w-full rounded-[10px] border border-black/10 px-4 py-3 text-gray-900 focus:border-aw-red-deep focus:outline-none focus:ring-1 focus:ring-aw-red-deep"
          placeholder="Décrivez votre besoin en quelques lignes."
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          required
          checked={formData.consent}
          onChange={handleChange}
          className="mt-1 h-4 w-4 rounded border-gray-300 text-aw-red-deep focus:ring-aw-red-deep"
        />
        <label htmlFor="consent" className="text-sm text-gray-600">
          J’accepte que mes informations soient utilisées uniquement pour traiter ma demande.
        </label>
      </div>

      {status !== 'idle' && (
        <div
          className={`rounded-md px-4 py-3 text-sm ${
            status === 'success'
              ? 'bg-green-50 text-green-700'
              : 'bg-red-50 text-red-700'
          }`}
        >
          {statusMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center px-8 py-3 rounded-[10px] bg-aw-red-deep text-white font-medium shadow-[0_12px_30px_rgba(139,29,29,0.18)] hover:bg-[#7C1818] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Envoi en cours…' : 'Envoyer ma demande'}
      </button>
    </form>
  )
}
