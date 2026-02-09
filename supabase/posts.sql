-- Blog posts (Regards scientifiques > Analyses & décryptages)
-- Workflow: draft -> scheduled (publish_at) -> published (published_at)

create extension if not exists pgcrypto;

create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content text,
  cover_image_url text not null,

  status text not null check (status in ('draft', 'scheduled', 'published')) default 'draft',
  publish_at timestamptz null,
  published_at timestamptz null,

  category text not null default 'regards-scientifiques',
  tags text[] not null default '{}'::text[],

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists posts_status_idx on posts(status);
create index if not exists posts_published_at_idx on posts(published_at);
create index if not exists posts_publish_at_idx on posts(publish_at);
create index if not exists posts_category_idx on posts(category);

-- Reuse the set_updated_at() trigger function if it exists (declared in schema.sql).
-- If not present, create it.
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

do $$ begin
  if not exists (
    select 1 from pg_trigger where tgname = 'posts_set_updated_at'
  ) then
    create trigger posts_set_updated_at
    before update on posts
    for each row execute function set_updated_at();
  end if;
end $$;

-- Optional integrity: when status becomes published, published_at should be present.
-- Keep it as a soft rule (application will set it).

-- RLS (public read of published only)
alter table posts enable row level security;

create policy "posts_select_published" on posts
for select to anon
using (status = 'published');

-- Authenticated users can read all posts (admin/backoffice use-case)
create policy "posts_select_authenticated" on posts
for select to authenticated
using (true);

-- Writes: restrict to national_admin when profiles table exists
-- (If profiles is not used in your Supabase project, adapt this policy.)
create policy "posts_insert_admin" on posts
for insert to authenticated
with check (
  exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'national_admin')
);

create policy "posts_update_admin" on posts
for update to authenticated
using (
  exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'national_admin')
)
with check (true);

create policy "posts_delete_admin" on posts
for delete to authenticated
using (
  exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'national_admin')
);
