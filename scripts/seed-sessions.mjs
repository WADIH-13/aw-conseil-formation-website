/*
Seed 3–6 "vitrine" sessions into Supabase.

Prereqs (recommended):
- SUPABASE_URL
- SUPABASE_SERVICE_ROLE_KEY (service role)
Optional:
- SEED_CREATED_BY (UUID of an existing user/profile id to use as created_by)

Usage:
  node scripts/seed-sessions.mjs

Notes:
- This script bypasses RLS only if you use the service role key.
- It tries to find offers by common slugs; otherwise falls back to first active offers.
*/

import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { createClient } from '@supabase/supabase-js'

function loadDotEnvLocalIfPresent() {
  const envPath = path.join(process.cwd(), '.env.local')
  if (!fs.existsSync(envPath)) return

  const content = fs.readFileSync(envPath, 'utf8')
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue

    const eqIndex = trimmed.indexOf('=')
    if (eqIndex === -1) continue

    const key = trimmed.slice(0, eqIndex).trim()
    let value = trimmed.slice(eqIndex + 1).trim()

    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1)
    }

    if (!(key in process.env)) {
      process.env[key] = value
    }
  }
}

function mustGetEnv(name) {
  const value = process.env[name]
  if (!value) throw new Error(`Missing env var: ${name}`)
  return value
}

function addDays(date, days) {
  const copy = new Date(date)
  copy.setUTCDate(copy.getUTCDate() + days)
  return copy
}

function toIsoDate(date) {
  return date.toISOString().slice(0, 10)
}

function buildShowcasePlan() {
  const today = new Date()
  const base = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()))

  // Spread sessions over the next 6–16 weeks.
  const d1 = addDays(base, 42)
  const d2 = addDays(base, 70)
  const d3 = addDays(base, 98)
  const d4 = addDays(base, 112)
  const d5 = addDays(base, 140)
  const d6 = addDays(base, 154)

  return {
    // Presentiel (location filled)
    presentiel: [
      { start: d1, end: addDays(d1, 0), city: 'Paris', department_code: '75', region_code: '11' },
      { start: d3, end: addDays(d3, 0), city: 'Lyon', department_code: '69', region_code: '84' },
      { start: d5, end: addDays(d5, 0), city: 'Fréjus', department_code: '83', region_code: '93' },
    ],
    // Distanciel (no location)
    distanciel: [
      { start: d2, end: addDays(d2, 0) },
      { start: d4, end: addDays(d4, 0) },
      { start: d6, end: addDays(d6, 0) },
    ],
  }
}

async function main() {
  loadDotEnvLocalIfPresent()

  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl) {
    throw new Error('Missing env var: SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL)')
  }
  if (!serviceRoleKey) {
    throw new Error('Missing env var: SUPABASE_SERVICE_ROLE_KEY (required for seeding)')
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })

  let createdBy = process.env.SEED_CREATED_BY || null
  if (!createdBy) {
    const { data: profiles, error } = await supabase
      .from('profiles')
      .select('id, role')
      .order('created_at', { ascending: true })
      .limit(5)

    if (error) {
      throw new Error(`Unable to infer created_by from profiles: ${error.message}`)
    }

    createdBy = profiles?.[0]?.id ?? null
  }

  if (!createdBy) {
    throw new Error(
      'No profile found to use as created_by. Set SEED_CREATED_BY to a valid UUID of an existing profile/user.'
    )
  }

  const candidateSlugs = [
    'decouvrir-charge-mentale',
    'mieux-gerer-sa-charge-mentale',
    'devenir-referent',
    'devenir-referent-charge-mentale',
  ]

  let offers = []
  {
    const { data, error } = await supabase
      .from('offers')
      .select('id, title, slug, modalities, is_active')
      .in('slug', candidateSlugs)
      .eq('is_active', true)

    if (error) throw new Error(`Failed to fetch offers by slug: ${error.message}`)
    offers = data ?? []
  }

  if (offers.length < 2) {
    const { data, error } = await supabase
      .from('offers')
      .select('id, title, slug, modalities, is_active')
      .eq('is_active', true)
      .order('updated_at', { ascending: false })
      .limit(3)

    if (error) throw new Error(`Failed to fetch fallback active offers: ${error.message}`)
    offers = data ?? []
  }

  if (!offers.length) {
    throw new Error('No active offers found. Create/activate offers first, then rerun the seed script.')
  }

  const plan = buildShowcasePlan()

  const sessionRows = []
  for (let i = 0; i < Math.min(offers.length, 3); i += 1) {
    const offer = offers[i]

    // 2 sessions per offer => 6 max
    const p = plan.presentiel[i % plan.presentiel.length]
    const d = plan.distanciel[i % plan.distanciel.length]

    const duration_hours = /referent/i.test(offer.slug || offer.title) ? 28 : 7

    sessionRows.push({
      offer_id: offer.id,
      start_date: toIsoDate(p.start),
      end_date: toIsoDate(p.end),
      format: 'presentiel',
      city: p.city,
      department_code: p.department_code,
      region_code: p.region_code,
      organized_by_label: 'AW Conseil et Formation',
      duration_hours,
      availability_status: 'places_disponibles',
      publication_status: 'published',
      created_by: createdBy,
    })

    sessionRows.push({
      offer_id: offer.id,
      start_date: toIsoDate(d.start),
      end_date: toIsoDate(d.end),
      format: 'distanciel',
      city: null,
      department_code: null,
      region_code: null,
      organized_by_label: 'AW Conseil et Formation',
      duration_hours,
      availability_status: 'sur_demande',
      publication_status: 'published',
      created_by: createdBy,
    })
  }

  // Avoid obvious duplicates when rerun: skip if a session with same offer_id + start_date already exists.
  const offerIds = Array.from(new Set(sessionRows.map((r) => r.offer_id)))
  const startDates = Array.from(new Set(sessionRows.map((r) => r.start_date)))

  const { data: existing, error: existingError } = await supabase
    .from('sessions')
    .select('id, offer_id, start_date')
    .in('offer_id', offerIds)
    .in('start_date', startDates)

  if (existingError) {
    throw new Error(`Failed to check existing sessions: ${existingError.message}`)
  }

  const existingKeys = new Set((existing ?? []).map((s) => `${s.offer_id}:${s.start_date}`))
  const toInsert = sessionRows.filter((r) => !existingKeys.has(`${r.offer_id}:${r.start_date}`))

  if (!toInsert.length) {
    console.log('Seed: nothing to insert (sessions already exist for these dates).')
    return
  }

  const { data: inserted, error: insertError } = await supabase.from('sessions').insert(toInsert).select('id, offer_id, start_date')
  if (insertError) {
    throw new Error(`Insert failed: ${insertError.message}`)
  }

  console.log(`Seed: inserted ${inserted?.length ?? 0} sessions.`)
  for (const row of inserted ?? []) {
    console.log(`- ${row.id} (offer_id=${row.offer_id}, start_date=${row.start_date})`)
  }
}

main().catch((err) => {
  console.error(err)
  process.exitCode = 1
})
