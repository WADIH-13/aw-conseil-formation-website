import type { Session, Trainer, Training } from './types'

export const TRAININGS: Training[] = [
  {
    id: 'decouvrir-charge-mentale',
    title: 'Découvrir la charge mentale',
    durationHours: 7,
    durationLabel: '7h',
    slug: '/formations/decouvrir-charge-mentale',
  },
  {
    id: 'mieux-gerer-charge-mentale',
    title: 'Mieux gérer sa charge mentale (7h)',
    durationHours: 7,
    durationLabel: '7h',
    slug: '/formations/mieux-gerer-sa-charge-mentale',
  },
  {
    id: 'devenir-referent-charge-mentale',
    title: 'Devenir référent charge mentale',
    durationHours: 28,
    durationLabel: '28h',
    slug: '/formations/devenir-referent',
  },
]

export const TRAINERS: Trainer[] = [
  {
    id: 'tr-lyon-001',
    fullName: 'Camille Durand',
    label: 'Formateur agréé',
    organization: 'Réseau AW — Auvergne-Rhône-Alpes',
  },
  {
    id: 'tr-lille-001',
    fullName: 'Nicolas Martin',
    label: 'Formateur agréé',
    organization: 'Réseau AW — Hauts-de-France',
  },
]

export const SESSIONS: Session[] = [
  {
    id: 'ses-2026-03-lyon-decouvrir-01',
    trainingId: 'decouvrir-charge-mentale',
    dates: ['2026-03-19'],
    durationHours: 7,
    location: {
      format: 'presentiel',
      region: 'Auvergne-Rhône-Alpes',
      department: '69',
      city: 'Lyon',
    },
    organizedByLabel: 'Formateur agréé',
    trainerId: 'tr-lyon-001',
    status: 'places_disponibles',
  },
  {
    id: 'ses-2026-04-paris-mieux-gerer-01',
    trainingId: 'mieux-gerer-charge-mentale',
    dates: ['2026-04-09'],
    durationHours: 7,
    location: {
      format: 'presentiel',
      region: 'Île-de-France',
      department: '75',
      city: 'Paris',
    },
    organizedByLabel: 'Réseau national',
    status: 'sur_demande',
  },
  {
    id: 'ses-2026-05-distanciel-referent-01',
    trainingId: 'devenir-referent-charge-mentale',
    dates: ['2026-05-12', '2026-05-13', '2026-05-19', '2026-05-20'],
    durationHours: 28,
    location: {
      format: 'distanciel',
    },
    organizedByLabel: 'Réseau national',
    status: 'places_disponibles',
  },
  {
    id: 'ses-2026-06-lille-decouvrir-01',
    trainingId: 'decouvrir-charge-mentale',
    dates: ['2026-06-05'],
    durationHours: 7,
    location: {
      format: 'presentiel',
      region: 'Hauts-de-France',
      department: '59',
      city: 'Lille',
    },
    organizedByLabel: 'Formateur agréé',
    trainerId: 'tr-lille-001',
    status: 'sur_demande',
  },
]
