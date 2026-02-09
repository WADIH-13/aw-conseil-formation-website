# QA checklist (Bloc A)

Date: 2026-02-09

Objectif: vérifier manuellement que le Bloc A est bien appliqué en UI (et dans le PDF du baromètre).

## Pages à vérifier

- / (home)
- /catalogue
- Pages offres
	- /catalogue/[slug]
	- /formations/decouvrir-charge-mentale
	- /formations/mieux-gerer-sa-charge-mentale
	- /formations/devenir-referent
- /sessions
- /contact
- /mentions-legales
- /meteo-collective

## Chaînes à ne plus voir

- "Debug:" (ou tout bloc affichant des données brutes)
- "diagnostic" / "auto-diagnostic" / "diagnostic médical"
- "apres echange"
- "Demander un echange"
- "filtrez par region"
- "Reinitialiser"

## Coquilles / accents attendus (contrôle visuel)

- "après échange"
- "Demander un échange"
- "région" / "Région"
- "Réinitialiser"
- "Département", "Résultats", "Durée", "À confirmer", "Organisé"

## Points spécifiques

- /catalogue: aucune trace visible de Debug en mode production.
- /barometre: la mention légale utilise "analyse" (pas "diagnostic").

## Notes

- Vérifier aussi les CTAs depuis les pages offres vers /sessions (si sessions publiées), sinon vers les modalités.
