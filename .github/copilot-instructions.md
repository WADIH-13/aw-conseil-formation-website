# Instructions pour les agents AI dans le projet AW Conseil et Formation

Bienvenue dans le projet **AW Conseil et Formation**. Ce document fournit des instructions spécifiques pour aider les agents AI à contribuer efficacement à ce codebase.

## 🏗️ Aperçu de l'architecture

Ce projet est un site vitrine premium construit avec **Next.js** et **Tailwind CSS**. Voici les principaux éléments :

- **Pages** :
  - Situées dans le dossier `app/`, chaque page correspond à une route.
  - Exemple : `app/formations/decouvrir-charge-mentale/page.tsx` pour la formation "Découvrir la charge mentale".
- **Composants** :
  - Réutilisables, situés dans `components/`.
  - Exemple : `components/assessment/DimensionsRadar.tsx` pour les visualisations radar.
- **API** :
  - Routes définies dans `app/api/`.
  - Exemple : `app/api/report/generate/route.ts` pour la génération de PDF.
- **Données** :
  - JSON statiques dans `data/`.
  - Exemple : `data/indicators.json` pour les indicateurs affichés.

## 🚀 Workflows de développement

### Installation et exécution

1. Installer les dépendances :
   ```bash
   npm install
   ```
2. Lancer le serveur de développement :
   ```bash
   npm run dev
   ```
3. Construire pour la production :
   ```bash
   npm run build
   ```
4. Lancer en mode production :
   ```bash
   npm start
   ```

### Tests

- Les tests sont écrits avec **Jest**.
- Commande pour exécuter les tests :
  ```bash
  npx jest
  ```

### Génération de PDF

- Endpoint GET : `/api/report/generate`
- Endpoint POST : `/api/report/generate`
- Voir [README.md](../README.md) pour des exemples d'utilisation.

## 📂 Conventions et bonnes pratiques

- **Structure des composants** :
  - Les composants sont organisés par fonctionnalité (ex. `components/assessment/`).
  - Favorisez les composants réutilisables et modulaires.
- **Typage** :
  - Utilisez **TypeScript** pour un typage strict.
  - Les types spécifiques sont définis dans `lib/assessment/types.ts`.
- **Validation des données** :
  - Utilisez **Zod** pour valider les données des API.
  - Exemple : `app/api/report/generate/route.ts`.

## 🔗 Points d'intégration

- **Baromètre interactif** :
  - Situé dans `components/barometre/`.
  - Utilisé pour afficher les résultats de charge mentale.
- **Formulaire de contact** :
  - Situé dans `components/ContactForm.tsx`.
  - Nécessite des variables d'environnement SMTP (voir README).

## 📌 Notes importantes

- Respectez le ton professionnel et clair du site.
- Les couleurs et typographies sont définies dans `globals.css` et `tailwind.config.ts`.
- Toute modification majeure doit être testée avec `npx jest` avant soumission.

Pour toute question, consultez le [README.md](../README.md) ou contactez le mainteneur du projet.