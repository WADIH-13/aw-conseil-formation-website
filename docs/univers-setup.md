# Univers Performance & Libération - Setup Guide

## Overview

The "Univers Performance & Libération" is a composable training experience marketplace that allows organizations to build custom training programs by selecting from pre-designed experiences organized by three categories:

- **Structurer** (Structure): Organizational clarity and efficiency
- **Libérer** (Free): Relationships and cultural transformation
- **Renforcer** (Strengthen): Resilience and growth preparation

## Database Setup

### 1. Create Schema

Run the SQL in `supabase/universe.sql` via Supabase Dashboard:

1. Go to your Supabase Dashboard → SQL Editor
2. Create new query
3. Copy entire content of `universe.sql`
4. Execute
5. Verify: Check Data → Tables, should see 5 new tables

### 2. Seed Data (Optional)

To populate with sample experiences:

1. Go to Supabase Dashboard → SQL Editor
2. Create new query
3. Copy entire content of `supabase/seed-universe.sql`
4. Execute
5. Verify: `SELECT COUNT(*) FROM public.experiences;` should return 15

## Environment Variables

Add to `.env.local`:

```bash
# Supabase (already configured if using existing connection)
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
SUPABASE_SERVICE_ROLE_KEY=your_key

# Optional: PDF Generation (requires Puppeteer)
# npm install puppeteer
```

## File Structure

```
components/universe/
├── ExperienceCard.tsx          # Grid card for browsing
├── ExperienceDetailClient.tsx  # Detail page component
├── HeroSection.tsx             # Page header
├── ProposalForm.tsx            # Contact form for cart submission
├── CartPanel.tsx               # Sticky cart indicator
├── PartnerSection.tsx          # Partner recruitment form
├── UniverseGrid.tsx            # Main browsing grid with tabs
└── PrintableCart.tsx           # Printable/PDF layout

app/univers-performance-liberation/
├── page.tsx                    # Main univers page
├── [slug]/page.tsx             # Experience detail page
└── panier/
    ├── page.tsx                # Cart summary page
    └── visuel/page.tsx         # Visual pathway page

app/api/universe/
├── cart/
│   ├── route.ts                # GET/POST cart operations
│   └── items/route.ts          # Add/remove items
├── partner/route.ts            # Partner applications
├── request/route.ts            # Proposal form submissions
└── pdf/route.ts                # PDF generation

lib/universe/
├── types.ts                    # TypeScript interfaces
├── queries.ts                  # Supabase queries abstraction
├── copy.ts                     # UI text centralization
└── cartStore.ts                # Zustand cart state management

supabase/
├── universe.sql                # Schema definition
└── seed-universe.sql           # Sample data
```

## Key Features

### 1. Cart Management
- **Guest Tokens**: Unique nanoid tokens for anonymous users
- **Persistence**: localStorage + Zustand for client state, API for server state
- **Lazy Initialization**: Cart created only on first add

### 2. Experience Categories
- **Structurer** (Blue): 5 experiences
- **Libérer** (Green): 5 experiences
- **Renforcer** (Purple): 5 experiences

### 3. Experience Types
- **Atelier** (Workshop): 90-180 min, hands-on
- **Formation** (Training): 120-240 min, educational
- **Immersion**: 480-1440 min, multi-day engagement
- **Team Building**: Cohesion-focused

### 4. User Flows

#### Browse & Select
```
/univers-performance-liberation
  ↓
Select category (Structurer/Libérer/Renforcer)
  ↓
Click experience card → [slug]/page.tsx
  ↓
Add to cart (stores in Zustand + API)
```

#### Cart & Proposal
```
/univers-performance-liberation/panier
  ↓
Review selected experiences
  ↓
Download PDF or Print
  ↓
Fill proposal form (company, contact, priorities)
  ↓
Submit (creates cart_request record)
```

#### Visual Pathway
```
/univers-performance-liberation/panier/visuel
  ↓
3-column layout (Structurer/Libérer/Renforcer)
  ↓
Print or Download PDF
```

## API Endpoints

### Cart Management
- `GET /api/universe/cart?guest_token={token}` - Fetch cart with items
- `POST /api/universe/cart` - Create guest cart (returns guest_token)
- `POST /api/universe/cart/items` - Add/remove items (action: 'add'|'remove')

### Proposal & Recruitment
- `POST /api/universe/request` - Submit cart proposal request
- `POST /api/universe/partner` - Submit partner application

### PDF Generation
- `GET /api/universe/pdf?guest_token={token}&cart_id={id}` - Generate cart PDF (requires Puppeteer)

## State Management

### Client-Side (Zustand Store)
```typescript
// useCartStore() provides:
- items: Experience[]         // Selected experience IDs
- cartId: string             // Supabase cart ID
- guestToken: string         // Nanoid token for anonymous access
- isLoading: boolean
- error: string | null

// Actions:
- initializeCart()           // Create cart on first add
- addItem(experienceId)
- removeItem(experienceId)
- setCartData(cartId, guestToken, items)
- clearError()

// Persists to localStorage automatically
```

### Server-Side (Supabase)
```
experiences → carts → cart_items → experiences
              ↓
         cart_requests (proposals sent by users)
              ↓
         partner_applications (partner signups)
```

## Copy & i18n

All UI text is centralized in `lib/universe/copy.ts` for easy:
- Text updates
- Future i18n implementation
- A/B testing

Access via: `universeCopy.page.title`, `universeCopy.buttons.addToCourse`, etc.

## Security

### Row-Level Security (RLS)
- **experiences**: PUBLIC read (is_active=true only)
- **carts + cart_items**: Access by guest_token OR user_id
- **cart_requests + partner_applications**: ADMIN read only

### RGPD Compliance
- Guest tokens allow entirely anonymous browsing
- Proposal form is optional
- Data retention policy: [TO BE DEFINED]
- Consent checkbox for marketing emails

## Testing the Feature

### Manual Testing Checklist
```
[ ] Browse experiences by category
[ ] Add/remove items from cart
[ ] Cart persists on reload (localStorage)
[ ] View cart summary page
[ ] See visual pathway
[ ] Print cart
[ ] Download PDF (if Puppeteer configured)
[ ] Submit proposal form
[ ] Submit partner application
[ ] RLS policies prevent unauthorized access
```

### Automated Testing
```bash
# Unit tests (Jest)
npm run test universe

# E2E tests (optional - configure Cypress/Playwright)
npm run test:e2e
```

## Deployment Checklist

- [ ] SQL schema executed in Supabase
- [ ] Seed data loaded (or admin-created experiences)
- [ ] Environment variables configured
- [ ] `npm run build` succeeds
- [ ] Cart & proposal API tested
- [ ] PDF generation tested (or fallback confirmed)
- [ ] Email notifications configured (if planned)
- [ ] Admin pages created for experience management (if needed)
- [ ] Hero section linked from homepage
- [ ] Analytics tracking added (if applicable)

## Optional Enhancements

### Stage 2 (Post-MVP)
- [ ] Admin CRUD pages for experience management
- [ ] Email notifications (proposal confirmations, partner responses)
- [ ] User authentication (allow logged-in users to save carts)
- [ ] Team building experiences recommendations (ML-based)
- [ ] Pricing model (if moving beyond composable to transactional)
- [ ] Payment integration (Stripe/PayPal)
- [ ] Email export (PDF + email option)
- [ ] Calendar integration (experience scheduling)

## Troubleshooting

### Cart Not Persisting
- Check localStorage in DevTools → Application → localStorage
- Verify Zustand store is calling persist middleware
- Solution: Clear localStorage, reload

### PDF Not Generating
- Puppeteer requires system dependencies (Chrome/Chromium)
- On production/serverless: Use external API (e.g., PDFKit, Jotform)
- Solution: Fall back to JSON data if Puppeteer unavailable

### Experiences Not Showing
- Verify `is_active = true` in database
- Check RLS policy allows public read on experiences
- Solution: `UPDATE experiences SET is_active = true WHERE ...`

### Guest Token Not Persisting
- Verify cookies are enabled
- Check if localStorage is cleared on page reload
- Solution: Use device fingerprinting or session storage

## Related Documentation

- [Supabase RLS Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Zustand Persist Middleware](https://github.com/pmndrs/zustand#persist-middleware)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Tailwind CSS](https://tailwindcss.com)

## Support

For questions or issues, consult:
1. This file
2. Code comments in `lib/universe/queries.ts`
3. Type definitions in `lib/universe/types.ts`
4. Component prop interfaces in `components/universe/*.tsx`

---

Last updated: 2024
Feature: L'Univers Performance & Libération (Option C - Production-Ready)
