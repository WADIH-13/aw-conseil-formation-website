'use client'

import { useEffect, useState } from 'react'
import { createSupabaseBrowserClient } from '@/lib/supabase/browser'

type CallResponsible = {
  id: string
  full_name: string
  title?: string
  email?: string
  phone?: string
  is_active: boolean
  created_at: string
}

type Department = {
  code: string
  name: string
}

type AvailabilityRule = {
  id: string
  responsible_id: string
  weekday: number
  start_time: string
  end_time: string
  is_active: boolean
}

type DepartmentAssignment = {
  department_code: string
  responsible_id: string
}

const WEEKDAYS = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']

export default function AdminCallResponsiblesPage() {
  const [responsibles, setResponsibles] = useState<CallResponsible[]>([])
  const [departments, setDepartments] = useState<Department[]>([])
  const [assignments, setAssignments] = useState<DepartmentAssignment[]>([])
  const [availabilityRules, setAvailabilityRules] = useState<AvailabilityRule[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Form states
  const [formData, setFormData] = useState({
    full_name: '',
    title: '',
    email: '',
    phone: '',
    department_code: '',
  })
  const [submitting, setSubmitting] = useState(false)

  // Availability form state
  const [availabilityForm, setAvailabilityForm] = useState<{ [key: string]: { weekday: number; start_time: string; end_time: string } }>({})
  const [availabilitySubmitting, setAvailabilitySubmitting] = useState<{ [key: string]: boolean }>({})

  // Load data
  useEffect(() => {
    const loadData = async () => {
      try {
        const supabase = createSupabaseBrowserClient()

        const [responsiblesRes, departmentsRes, assignmentsRes, rulesRes] = await Promise.all([
          supabase.from('call_responsibles').select('*').order('created_at', { ascending: false }),
          supabase.from('departments').select('code, name').order('code'),
          supabase.from('call_department_assignments').select('*'),
          supabase.from('call_availability_rules').select('*').order('responsible_id, weekday'),
        ])

        if (responsiblesRes.error) throw responsiblesRes.error
        if (departmentsRes.error) throw departmentsRes.error
        if (assignmentsRes.error) throw assignmentsRes.error
        if (rulesRes.error) throw rulesRes.error

        setResponsibles(responsiblesRes.data || [])
        setDepartments(departmentsRes.data || [])
        setAssignments(assignmentsRes.data || [])
        setAvailabilityRules(rulesRes.data || [])
      } catch (err: any) {
        setError(err?.message ?? 'Error loading data')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const handleAddResponsible = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/admin/call-responsibles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Error creating responsible')
      }

      const newResponsible = await response.json()
      setResponsibles([newResponsible, ...responsibles])
      
      // Add assignment
      setAssignments([
        ...assignments,
        { department_code: formData.department_code, responsible_id: newResponsible.id },
      ])

      // Reset form
      setFormData({ full_name: '', title: '', email: '', phone: '', department_code: '' })
    } catch (err: any) {
      setError(err?.message ?? 'Error creating responsible')
    } finally {
      setSubmitting(false)
    }
  }

  const handleAddAvailability = async (responsibleId: string) => {
    const form = availabilityForm[responsibleId]
    if (!form) return

    setAvailabilitySubmitting({ ...availabilitySubmitting, [responsibleId]: true })
    setError(null)

    try {
      const response = await fetch('/api/admin/call-responsibles/availability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          responsible_id: responsibleId,
          weekday: form.weekday,
          start_time: form.start_time,
          end_time: form.end_time,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Error creating availability rule')
      }

      const newRule = await response.json()
      setAvailabilityRules([...availabilityRules, newRule])
      
      // Reset form
      const newForm = { ...availabilityForm }
      delete newForm[responsibleId]
      setAvailabilityForm(newForm)
    } catch (err: any) {
      setError(err?.message ?? 'Error creating availability rule')
    } finally {
      setAvailabilitySubmitting({ ...availabilitySubmitting, [responsibleId]: false })
    }
  }

  const handleDeleteAvailability = async (ruleId: string) => {
    try {
      const response = await fetch(`/api/admin/call-responsibles/availability?id=${ruleId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Error deleting availability rule')
      }

      setAvailabilityRules(availabilityRules.filter(r => r.id !== ruleId))
    } catch (err: any) {
      setError(err?.message ?? 'Error deleting availability rule')
    }
  }

  const getResponsibleDepartment = (responsibleId: string) => {
    const assignment = assignments.find(a => a.responsible_id === responsibleId)
    const dept = departments.find(d => d.code === assignment?.department_code)
    return dept
  }

  const getResponsibleRules = (responsibleId: string) => {
    return availabilityRules.filter(r => r.responsible_id === responsibleId && r.is_active)
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <p className="text-sm tracking-[0.22em] uppercase text-black/50">Back-office</p>
          <h1 className="text-3xl md:text-4xl font-light text-black mt-2">Responsables d'appels</h1>
        </div>
        <p className="text-gray-600">Chargement...</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <p className="text-sm tracking-[0.22em] uppercase text-black/50">Back-office</p>
        <h1 className="text-3xl md:text-4xl font-light text-black mt-2">Responsables d'appels</h1>
        <p className="mt-2 text-gray-600">
          Gérez les responsables d'appels par département et définissez leurs horaires de disponibilité.
        </p>
      </div>

      {error && (
        <div className="bg-white border border-aw-red/20 rounded-2xl p-5">
          <p className="text-aw-red text-sm">{error}</p>
        </div>
      )}

      {/* Add Responsible Form */}
      <div className="bg-white border border-black/5 rounded-2xl aw-card-surface p-6 md:p-8">
        <h2 className="text-xl font-light text-black mb-6">Ajouter un responsable</h2>
        <form onSubmit={handleAddResponsible} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs tracking-[0.24em] uppercase text-black/60 mb-2">Nom complet *</label>
              <input
                type="text"
                required
                className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-black/80"
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs tracking-[0.24em] uppercase text-black/60 mb-2">Fonction</label>
              <input
                type="text"
                className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-black/80"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs tracking-[0.24em] uppercase text-black/60 mb-2">Email</label>
              <input
                type="email"
                className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-black/80"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs tracking-[0.24em] uppercase text-black/60 mb-2">Téléphone</label>
              <input
                type="tel"
                className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-black/80"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs tracking-[0.24em] uppercase text-black/60 mb-2">Département *</label>
              <select
                required
                className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-black/80"
                value={formData.department_code}
                onChange={(e) => setFormData({ ...formData, department_code: e.target.value })}
              >
                <option value="">Sélectionner un département</option>
                {departments.map((dept) => (
                  <option key={dept.code} value={dept.code}>
                    {dept.name} ({dept.code})
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button type="submit" className="btn-primary" disabled={submitting}>
            {submitting ? 'Ajout en cours...' : 'Ajouter le responsable'}
          </button>
        </form>
      </div>

      {/* Responsibles List */}
      <div className="space-y-4">
        <h2 className="text-xl font-light text-black">Responsables actuels</h2>
        {responsibles.length === 0 ? (
          <p className="text-gray-600">Aucun responsable ajouté pour le moment.</p>
        ) : (
          <div className="grid gap-4">
            {responsibles.filter(r => r.is_active).map((responsible) => {
              const dept = getResponsibleDepartment(responsible.id)
              const rules = getResponsibleRules(responsible.id)

              return (
                <div key={responsible.id} className="bg-white border border-black/5 rounded-2xl aw-card-surface p-6 md:p-8">
                  {/* Responsible Info */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-medium text-black">{responsible.full_name}</h3>
                      {responsible.title && <p className="text-sm text-gray-600 mt-1">{responsible.title}</p>}
                      {dept && <p className="text-sm text-gray-600">{dept.name} ({dept.code})</p>}
                      {responsible.email && <p className="text-sm text-gray-600">{responsible.email}</p>}
                      {responsible.phone && <p className="text-sm text-gray-600">{responsible.phone}</p>}
                    </div>
                  </div>

                  {/* Availability Rules */}
                  <div className="border-t border-black/5 pt-6">
                    <h4 className="font-medium text-black mb-4">Horaires de disponibilité</h4>
                    
                    {rules.length > 0 && (
                      <div className="mb-6 space-y-2 bg-black/[0.02] rounded-xl p-4">
                        {rules.map((rule) => (
                          <div key={rule.id} className="flex items-center justify-between text-sm">
                            <span className="text-black">
                              <strong>{WEEKDAYS[rule.weekday]}</strong> : {rule.start_time} - {rule.end_time}
                            </span>
                            <button
                              onClick={() => handleDeleteAvailability(rule.id)}
                              className="text-aw-red hover:text-aw-red/80 text-xs"
                            >
                              Supprimer
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Add Availability Form */}
                    <div className="bg-black/[0.02] rounded-xl p-4">
                      <p className="text-xs text-gray-600 mb-3">Ajouter une plage horaire</p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <select
                          className="rounded-lg border border-black/10 bg-white px-3 py-2 text-sm text-black/80"
                          value={availabilityForm[responsible.id]?.weekday ?? ''}
                          onChange={(e) =>
                            setAvailabilityForm({
                              ...availabilityForm,
                              [responsible.id]: {
                                ...availabilityForm[responsible.id],
                                weekday: parseInt(e.target.value),
                              },
                            })
                          }
                        >
                          <option value="">Jour</option>
                          {WEEKDAYS.map((day, idx) => (
                            <option key={idx} value={idx}>
                              {day}
                            </option>
                          ))}
                        </select>
                        <input
                          type="time"
                          className="rounded-lg border border-black/10 bg-white px-3 py-2 text-sm text-black/80"
                          value={availabilityForm[responsible.id]?.start_time ?? ''}
                          onChange={(e) =>
                            setAvailabilityForm({
                              ...availabilityForm,
                              [responsible.id]: {
                                ...availabilityForm[responsible.id],
                                start_time: e.target.value,
                              },
                            })
                          }
                        />
                        <input
                          type="time"
                          className="rounded-lg border border-black/10 bg-white px-3 py-2 text-sm text-black/80"
                          value={availabilityForm[responsible.id]?.end_time ?? ''}
                          onChange={(e) =>
                            setAvailabilityForm({
                              ...availabilityForm,
                              [responsible.id]: {
                                ...availabilityForm[responsible.id],
                                end_time: e.target.value,
                              },
                            })
                          }
                        />
                        <button
                          onClick={() => handleAddAvailability(responsible.id)}
                          className="btn-secondary sm:col-span-1 text-xs"
                          disabled={
                            !availabilityForm[responsible.id]?.weekday ||
                            !availabilityForm[responsible.id]?.start_time ||
                            !availabilityForm[responsible.id]?.end_time ||
                            availabilitySubmitting[responsible.id]
                          }
                        >
                          {availabilitySubmitting[responsible.id] ? 'Ajout...' : 'Ajouter'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
