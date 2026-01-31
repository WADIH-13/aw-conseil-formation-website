# Supabase — Setup (Sessions / Back-office)

## Variables d’environnement

Ajoutez dans votre environnement (Vercel / local) :

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Optionnel (si vous voulez générer des liens en dehors du runtime Next) :
- `NEXT_PUBLIC_SITE_URL` (ex: `https://votre-domaine.fr`)

## Schéma SQL

Exécutez le script :
- [supabase/schema.sql](supabase/schema.sql)

Il crée :
- `profiles` (rôle)
- `sessions` (sessions locales + workflow de publication + disponibilité)
- politiques RLS (accès public uniquement aux sessions `publication_status = published`)

## Rôles

- `trainer` : crée/édite ses sessions
- `team` : accès large (coordination)
- `national_admin` : valide/publication

## Accès

- UI BO : `/admin/login`, puis `/admin/sessions`
- Hub public : `/trouver-une-session`

## Notes

- La page hub consomme `/api/sessions`. Quand Supabase est branché, cette API doit lire la table `sessions`.
- Dans le repo, une API de démo existe déjà et lit des données fictives si Supabase n'est pas configuré.

## Workflow recommandé

- Formateur/équipe : crée une session en `draft`
- Formateur/équipe : soumet en `pending_review`
- National : valide → `published` (visible sur le site)

Ensuite, les corrections (logistique) peuvent être faites sans revalidation tant que `publication_status` reste `published`.
