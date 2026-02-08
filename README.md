# AW Conseil et Formation - Site Vitrine

Site vitrine premium pour AW Conseil et Formation, cabinet de conseil et de formation dédié à la prévention des RPS et à la réduction de la charge mentale.

## 🎯 Objectifs du site

- Clarifier l'offre dès l'arrivée sur la page d'accueil
- Mettre en avant conseil, formation et solutions concrètes
- Valoriser la démarche qualité et la certification Qualiopi
- Proposer un contact simple et professionnel

## 🏗️ Architecture

### Pages créées

- **Accueil** (`/`) - Page principale avec signature et présentation
- **Formations** (`/formations`) - Vue d'ensemble des formations
  - **Découvrir la charge mentale** (`/formations/decouvrir-charge-mentale`) - Formation 7h
  - **Devenir référent charge mentale** (`/formations/devenir-referent`) - Formation 28h
- **Démarche qualité** (`/demarche-qualite`) - Engagement qualité et éthique
- **Contact** (`/contact`) - Formulaire de contact et informations
- **Mentions légales** (`/mentions-legales`) - Informations légales

### Positionnement

- Cabinet haut de gamme, ton professionnel (vouvoiement)
- Conseil stratégique, formations Qualiopi, ateliers pratiques

## 🎨 Design

- **Couleurs** : Fond blanc, texte noir, rouge (#DC2626) avec parcimonie
- **Typographie** : Inter, lisibilité maximale
- **Espacement** : Beaucoup d'espace pour respirer
- **Style** : Sobre, premium, épuré

## 🛠️ Stack technique

- **Framework** : Next.js 14
- **Styling** : Tailwind CSS
- **Typescript** : Support complet
- **Responsive** : Mobile-first
- **Email** : API route + Nodemailer

## 🚀 Installation et développement

```bash
# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Build de production
npm run build

# Lancer en production
npm start
```

## ✉️ Configuration du formulaire de contact

Le formulaire envoie un email via SMTP. Configurez les variables suivantes dans votre environnement :

```bash
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
SMTP_FROM=
CONTACT_TO=ahmed.wadih@gmail.com
```

> Sans ces variables, l’API retournera une erreur de configuration.

## 🔒 Activation de la page Dr Mahi Bahi

La page du référent scientifique et ses liens sont pilotés par un flag d’environnement.

```bash
NEXT_PUBLIC_SHOW_MAHI_BAHI=false
```

- `false` (ou absent) : page et liens masqués (404)
- `true` : page et liens visibles

## 🔐 Supabase (côté serveur)

Le catalogue utilise un client Supabase côté serveur. Pour les opérations serveur, vous pouvez fournir :

```bash
SUPABASE_SERVICE_ROLE_KEY=
```

> La clé service role doit rester côté serveur uniquement. En l'absence de cette clé, le client utilise `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

## 📝 Contraintes éditoriales respectées

- Ton professionnel, clair et direct
- Focus sur la prévention des RPS et la charge mentale
- Pas de promesse miracle ni de vocabulaire médical prescriptif

## 🔄 Évolutivité

Le site est conçu pour rester simple aujourd'hui tout en permettant des évolutions futures :
- Structure modulaire des composants
- Configuration Tailwind extensible
- Architecture Next.js scalable

## 📈 Baromètre de charge mentale

Un emplacement est prévu sur la page d’accueil pour intégrer le baromètre interactif dès réception du module.

## 📞 Contact

Pour toute question sur le développement du site :
- Repository : [aw-conseil-formation-website](https://github.com/WADIH-13/aw-conseil-formation-website)

## API de Génération de PDF

### Endpoints

#### GET `/api/report/generate`

Génère un PDF avec des données par défaut et le renvoie en tant que fichier téléchargeable.

Exemple :
```bash
curl -X GET http://localhost:3000/api/report/generate -o AW_Score.pdf
```

#### POST `/api/report/generate`

Génère un PDF basé sur les données fournies dans le corps de la requête.

Corps attendu (JSON) :
```json
{
  "awScore": 75,
  "date": "2026-01-26",
  "levelLabel": "Modéré",
  "dimensionScores": [
    { "label": "Cognitif", "value": 75 },
    { "label": "Émotionnel", "value": 50 }
  ],
  "showMedicalNotice": true
}
```

Exemple :
```bash
curl -X POST http://localhost:3000/api/report/generate \
  -H "Content-Type: application/json" \
  -d '{
    "awScore": 75,
    "date": "2026-01-26",
    "levelLabel": "Modéré",
    "dimensionScores": [
      { "label": "Cognitif", "value": 75 },
      { "label": "Émotionnel", "value": 50 }
    ],
    "showMedicalNotice": true
  }' \
  -o AW_Score_Custom.pdf
```

### Tests

Pour exécuter les tests :
```bash
npx jest
```

### Dépendances

- [Next.js](https://nextjs.org/)
- [jsPDF](https://github.com/parallax/jsPDF)
- [Zod](https://github.com/colinhacks/zod) pour la validation des données.
- [Jest](https://jestjs.io/) pour les tests.
