-- Schéma minimal pour un back-office Sessions (sur mesure)
-- Objectif : formation (catalogue) ≠ session (locale) ≠ formateur

-- Extensions utiles
create extension if not exists pgcrypto;

-- Roles applicatifs
-- - trainer: formateur agréé
-- - team: équipe coordination
-- - national_admin: validation nationale

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('trainer', 'team', 'national_admin')),
  full_name text,
  created_at timestamptz not null default now()
);

create table if not exists sessions (
  id uuid primary key default gen_random_uuid(),

  training_id text not null,
  dates date[] not null default '{}',

  -- Redondance utile pour filtrer efficacement par période
  start_date date,
  end_date date,

  format text not null check (format in ('presentiel', 'distanciel')),
  region text,
  department text,
  city text,

  -- Statut éditorial / publication (workflow)
  publication_status text not null check (publication_status in ('draft', 'pending_review', 'published', 'rejected', 'archived')) default 'draft',

  -- Statut public (disponibilité)
  availability_status text not null check (availability_status in ('places_disponibles', 'sur_demande')) default 'sur_demande',

  organized_by_label text not null check (organized_by_label in ('Formateur agréé', 'Réseau national')) default 'Réseau national',
  duration_hours int not null default 7,
  trainer_id uuid,

  created_by uuid not null references auth.users(id) on delete restrict,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists sessions_publication_status_idx on sessions(publication_status);
create index if not exists sessions_training_idx on sessions(training_id);
create index if not exists sessions_format_idx on sessions(format);
create index if not exists sessions_start_date_idx on sessions(start_date);

-- Updated_at auto
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

do $$ begin
  if not exists (
    select 1 from pg_trigger where tgname = 'sessions_set_updated_at'
  ) then
    create trigger sessions_set_updated_at
    before update on sessions
    for each row execute function set_updated_at();
  end if;
end $$;

-- RLS
alter table profiles enable row level security;
alter table sessions enable row level security;

-- Profiles policies
create policy "profiles_select_own" on profiles
for select to authenticated
using (id = auth.uid());

create policy "profiles_insert_own" on profiles
for insert to authenticated
with check (id = auth.uid());

-- Sessions policies
-- Lecture publique : uniquement les sessions publiées (à exposer via API)
create policy "sessions_select_published" on sessions
for select to anon
using (publication_status = 'published');

-- Lecture authentifiée : formateur voit ses sessions, équipe/national voit tout
create policy "sessions_select_authenticated" on sessions
for select to authenticated
using (
  created_by = auth.uid()
  or exists (select 1 from profiles p where p.id = auth.uid() and p.role in ('team', 'national_admin'))
);

-- Création : tout utilisateur authentifié (formateur/équipe) peut créer, en draft
create policy "sessions_insert_draft" on sessions
for insert to authenticated
with check (
  created_by = auth.uid()
  and publication_status = 'draft'
);

-- Mise à jour :
-- - formateur peut modifier ses drafts (pas published)
-- - équipe/national peut modifier
create policy "sessions_update" on sessions
for update to authenticated
using (
  (created_by = auth.uid() and publication_status in ('draft', 'rejected', 'published'))
  or exists (select 1 from profiles p where p.id = auth.uid() and p.role in ('team', 'national_admin'))
)
with check (true);

-- Garde-fou : seules les personnes "national_admin" peuvent publier / dépublier.
create or replace function enforce_publication_transitions()
returns trigger language plpgsql as $$
declare
  is_national boolean;
begin
  select exists(
    select 1 from profiles p
    where p.id = auth.uid() and p.role = 'national_admin'
  ) into is_national;

  if new.publication_status is distinct from old.publication_status then
    if not is_national then
      -- Autorise uniquement les transitions "draft -> pending_review" pour les non-nationaux
      if not (old.publication_status = 'draft' and new.publication_status = 'pending_review') then
        raise exception 'Publication status change requires national validation.';
      end if;
    end if;
  end if;

  return new;
end;
$$;

do $$ begin
  if not exists (
    select 1 from pg_trigger where tgname = 'sessions_enforce_publication_transitions'
  ) then
    create trigger sessions_enforce_publication_transitions
    before update on sessions
    for each row execute function enforce_publication_transitions();
  end if;
end $$;

-- (Optionnel) Archive : réservé national
create policy "sessions_delete" on sessions
for delete to authenticated
using (exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'national_admin'));

-- Table pour les réponses du baromètre de charge mentale (anonyme)
create table if not exists survey_responses (
  id uuid primary key default gen_random_uuid(),
  
  -- Données préliminaires (anonymes)
  civility text not null check (civility in ('M.', 'Mme', 'Autre')),
  age_range text not null check (age_range in ('18-25', '26-35', '36-45', '46-55', '56-65', '65+')),
  professional_status text not null check (professional_status in ('salarié', 'indépendant', 'non-salarié', 'autre')),
  
  -- Score du baromètre
  raw_score int not null check (raw_score >= 10 and raw_score <= 40),
  aw_score int not null check (aw_score >= 0 and aw_score <= 100),
  
  -- Scores par dimension
  dimension_scores jsonb not null,
  
  -- ⭐ Toutes les réponses détaillées (question_id -> réponse)
  answers jsonb not null,
  
  -- Timestamps
  created_at timestamptz not null default now(),
  
  -- Index pour les statistiques
  indexed_at date generated always as (created_at::date) stored
);

create index if not exists survey_responses_civility_idx on survey_responses(civility);
create index if not exists survey_responses_age_range_idx on survey_responses(age_range);
create index if not exists survey_responses_professional_status_idx on survey_responses(professional_status);
create index if not exists survey_responses_indexed_at_idx on survey_responses(indexed_at);
create index if not exists survey_responses_created_at_idx on survey_responses(created_at);

-- Policy : lecture anonyme (pour les statistiques du dashboard)
create policy "survey_responses_insert" on survey_responses
for insert with check (true);

-- Policy : lecture pour authentifiés uniquement (dashboard d'admin)
create policy "survey_responses_select" on survey_responses
for select to authenticated
using (true);

-- Table for Meteo collective (anonymous, aggregated observation)
create table if not exists meteo_collective_entries (
  id uuid primary key default gen_random_uuid(),
  value text not null check (value in ('fluide', 'charge', 'lourd')),
  perimeter text,
  created_at timestamptz not null default now(),
  indexed_at date generated always as (created_at::date) stored
);

create index if not exists meteo_collective_value_idx on meteo_collective_entries(value);
create index if not exists meteo_collective_perimeter_idx on meteo_collective_entries(perimeter);
create index if not exists meteo_collective_created_at_idx on meteo_collective_entries(created_at);

alter table meteo_collective_entries enable row level security;

create policy "meteo_collective_insert" on meteo_collective_entries
for insert with check (true);

create policy "meteo_collective_select" on meteo_collective_entries
for select to authenticated
using (true);
