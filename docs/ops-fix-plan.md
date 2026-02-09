# Ops Fix Plan (inventaire A→E)

Date: 2026-02-09

Objectif: inventaire des emplacements à corriger (sans refactor).

## 1) Page /catalogue + ligne “Debug”

- Page /catalogue: [app/catalogue/page.tsx](../app/catalogue/page.tsx)
  - Rendu de la ligne Debug: [app/catalogue/page.tsx](../app/catalogue/page.tsx#L127)

- Page détail offre /catalogue/[slug]: [app/catalogue/[slug]/page.tsx](../app/catalogue/%5Bslug%5D/page.tsx)

## 2) CTA et libellés à corriger

### CTA contact (ancien libellé) / “devis”

- [components/sessions/PublicSessionsView.tsx](../components/sessions/PublicSessionsView.tsx#L269)
- [components/sessions/PublicSessionsView.tsx](../components/sessions/PublicSessionsView.tsx#L345)
- [app/sessions/page.tsx](../app/sessions/page.tsx#L40)
- [components/FormationTemplate.tsx](../components/FormationTemplate.tsx#L68)
- [components/FormationTemplate.tsx](../components/FormationTemplate.tsx#L209)
- [app/formations/page.tsx](../app/formations/page.tsx#L49)
- [app/formations/page.tsx](../app/formations/page.tsx#L63)
- [app/formations/page.tsx](../app/formations/page.tsx#L77)
- Mentions “devis sur demande / devis et programme”:
  - [app/formations/page.tsx](../app/formations/page.tsx#L109)
  - [app/formations/decouvrir-charge-mentale/page.tsx](../app/formations/decouvrir-charge-mentale/page.tsx#L43)
  - [app/formations/devenir-referent/page.tsx](../app/formations/devenir-referent/page.tsx#L46)
  - [app/formations/mieux-gerer-sa-charge-mentale/page.tsx](../app/formations/mieux-gerer-sa-charge-mentale/page.tsx#L63)

Action attendue: remplacer tous les libellés de demande de devis par le CTA unique.

### “diagnostic” et dérivés

- [app/page.tsx](../app/page.tsx#L98)
- [app/observer-pour-agir/page.tsx](../app/observer-pour-agir/page.tsx#L30)
- [app/formations/mieux-gerer-sa-charge-mentale/page.tsx](../app/formations/mieux-gerer-sa-charge-mentale/page.tsx#L51)
- [app/dr-mahi-bahi/page.tsx](../app/dr-mahi-bahi/page.tsx#L66)

NB “diagnostic” apparaît aussi dans des documents/scripts (hors pages publiques):
- [REPORTING.md](../REPORTING.md#L21)
- [REPORTING.md](../REPORTING.md#L36)
- [scripts/generate-sample-pdf.js](../scripts/generate-sample-pdf.js#L106)
- [scripts/generate-sample-pdf-node.js](../scripts/generate-sample-pdf-node.js#L149)

NB baromètre (mentions “diagnostic médical” / “diagnostique”):
- [components/barometre/AWScoreResultCard.tsx](../components/barometre/AWScoreResultCard.tsx#L42)
- [components/barometre/Barometer.tsx](../components/barometre/Barometer.tsx#L119-L129)
- [components/barometre/generateReport.ts](../components/barometre/generateReport.ts#L118)
- [components/barometre/generateReport.ts](../components/barometre/generateReport.ts#L268)

Action attendue: remplacer “diagnostic” (et dérivés) par “analyse / lecture / état des lieux de fonctionnement / cadrage” selon le contexte.

### Coquilles visibles (orthographe / accents)

- “Demander un echange”:
  - [components/catalogue/OfferCard.tsx](../components/catalogue/OfferCard.tsx#L64)
- “apres echange”:
  - [components/catalogue/Filters.tsx](../components/catalogue/Filters.tsx#L97)
- “Reinitialiser”:
  - [app/admin/meteo-collective/page.tsx](../app/admin/meteo-collective/page.tsx#L148)
  - [components/sessions/PublicSessionsView.tsx](../components/sessions/PublicSessionsView.tsx#L115)
- “Region” (label UI):
  - [components/sessions/PublicSessionsView.tsx](../components/sessions/PublicSessionsView.tsx#L153)
  - [components/admin/SessionEditForm.tsx](../components/admin/SessionEditForm.tsx#L102)
- “region” dans texte /sessions:
  - [app/sessions/page.tsx](../app/sessions/page.tsx#L35)

Action attendue: corriger les libellés (échange, après échange, réinitialiser, région, réinitialiser, etc.).

## 3) Pages clés + baromètre / météo collective

- Mentions légales: [app/mentions-legales/page.tsx](../app/mentions-legales/page.tsx)
- Contact: [app/contact/page.tsx](../app/contact/page.tsx)
- Sessions (public):
  - [app/sessions/page.tsx](../app/sessions/page.tsx)
  - [app/sessions/[id]/page.tsx](../app/sessions/%5Bid%5D/page.tsx)
- Baromètre: [app/barometre/page.tsx](../app/barometre/page.tsx)
- Météo collective:
  - Public: [app/meteo-collective/page.tsx](../app/meteo-collective/page.tsx)
  - Admin: [app/admin/meteo-collective/page.tsx](../app/admin/meteo-collective/page.tsx)
- APIs météo collective:
  - Submit: [app/api/meteo-collective/submit/route.ts](../app/api/meteo-collective/submit/route.ts)
  - Stats: [app/api/meteo-collective/stats/route.ts](../app/api/meteo-collective/stats/route.ts)

## 4) Tracking / cookies

Recherche “gtag / analytics / plausible / posthog / hotjar / clarity / cookie”:

- Mentions légales (section cookies):
  - [app/mentions-legales/page.tsx](../app/mentions-legales/page.tsx#L67)
  - [app/mentions-legales/page.tsx](../app/mentions-legales/page.tsx#L69)
- Auth Supabase (cookies de session):
  - Middleware admin: [middleware.ts](../middleware.ts)
  - Client Supabase navigateur: [lib/supabase/browser.ts](../lib/supabase/browser.ts)
  - Client Supabase serveur: [lib/supabase/server.ts](../lib/supabase/server.ts)

Conclusion (à date): aucun traceur explicite (gtag/GA/Plausible/PostHog/Hotjar/Clarity) n’a été détecté dans les sources applicatives (TS/TSX).

---

## Prochaines décisions nécessaires (avant correctifs A→E)

- Définir le CTA unique remplaçant l’ancien libellé devis (texte exact + destination URL + paramètres éventuels).
- Choisir la règle de remplacement de “diagnostic” selon contexte (site public uniquement vs partout; et choix du terme par défaut).
