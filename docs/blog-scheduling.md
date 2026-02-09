# Programmation automatique des articles (blog)

## Schéma Supabase
- Exécuter le SQL dans [supabase/posts.sql](../supabase/posts.sql) (SQL Editor Supabase).

## Endpoint Cron (publication automatique)
- Route : `POST /api/admin/posts/publish-due`
- Auth : header `Authorization: Bearer <CRON_SECRET>`
- Effet : publie tous les posts `status='scheduled'` dont `publish_at <= maintenant`.
- Réponse : `{ published: number }`

## Vercel Cron
- Exemple via [vercel.json](../vercel.json) : déclenche toutes les 15 minutes.
- Alternative : configurer un Cron dans le dashboard Vercel.

## Variables d’environnement
- Public:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Server-only:
  - `SUPABASE_SERVICE_ROLE_KEY` (uniquement côté serveur)
  - `CRON_SECRET`

## Notes
- La clé `SUPABASE_SERVICE_ROLE_KEY` ne doit jamais être exposée au client.
- Les pages publiques ne lisent que des posts `published`.
