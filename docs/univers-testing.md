# Univers Performance & Libération - Testing Guide

## Pre-Requisites

1. **Database Setup**
   - Execute `supabase/universe.sql` in Supabase Dashboard
   - Verify 5 tables exist: experiences, carts, cart_items, cart_requests, partner_applications
   - Execute `supabase/seed-universe.sql` to populate sample data
   - Verify 15 experiences exist

2. **Environment**
   - `.env.local` configured with Supabase keys
   - Dev server running: `npm run dev`
   - No TypeScript errors: `npm run build` succeeds

3. **Browser**
   - DevTools open for localStorage inspection
   - Console visible for error logs

---

## Manual Test Scenarios

### Scenario 1: Browse & Filter Experiences

**Objective**: Verify experience listing and filtering works correctly

**Steps**:
1. Navigate to `/univers-performance-liberation`
2. Verify page loads with HeroSection + UniverseGrid
3. Verify 3 category tabs visible: Structurer (blue), Libérer (green), Renforcer (purple)
4. Click "Structurer" tab → verify only Structurer experiences show
5. Click "Libérer" tab → verify only Libérer experiences show
6. Use "Type" filter dropdown → select "Atelier" → verify only Atelier experiences show
7. Clear filter → verify all experiences in category show again

**Expected Results**:
- [ ] All 15 experiences visible across categories
- [ ] Tabs work smoothly with no re-renders
- [ ] Filter dropdowns functional
- [ ] UI does not flicker

---

### Scenario 2: Add Items to Cart & Persistence

**Objective**: Verify cart state persists across page reload

**Steps**:
1. From univers main page, click "Ajouter au parcours" button on any card
2. Verify button changes to "Retirer"
3. Open DevTools → Application → LocalStorage → find `cart-store` key
4. Verify it contains guestToken, cartId, and items array
5. Reload page → verify "Retirer" button still shows (item still in cart)
6. Add 3 more items from different categories
7. Verify CartPanel shows count of 4 items
8. Reload page again → verify all 4 items still present

**Expected Results**:
- [ ] localStorage contains Zustand persist data
- [ ] Cart state survives page reload
- [ ] CartPanel accurately shows item count
- [ ] No console errors

---

### Scenario 3: View Experience Detail

**Objective**: Verify experience detail page renders correctly

**Steps**:
1. From main page, click "En savoir plus" on any card
2. Navigate to `/univers-performance-liberation/[slug]` page
3. Verify URL matches experience slug
4. Verify page shows:
   - [ ] Experience title
   - [ ] Short description
   - [ ] Full description/program
   - [ ] Benefits list
   - [ ] Audience info
   - [ ] Deliverables
   - [ ] Duration & kind tags
   - [ ] "Ajouter/Retirer" button in sidebar

5. If already in cart, button should say "Retirer"; otherwise "Ajouter"
6. Click button → add to cart → verify button changes
7. View page source → verify server-side metadata generation (og:title, etc.)

**Expected Results**:
- [ ] All content renders without errors
- [ ] Metadata dynamic based on experience
- [ ] Add/Remove button syncs with store
- [ ] Back link works

---

### Scenario 4: Cart Page (Panier)

**Objective**: Verify cart summary and proposal form

**Steps**:
1. Add 3-5 items across different categories
2. Click CartPanel "Finaliser" button OR navigate to `/univers-performance-liberation/panier`
3. Verify page shows:
   - [ ] List of cart items grouped by category
   - [ ] Total count, duration, categories summary
   - [ ] "Télécharger PDF" button
   - [ ] "Imprimer" button
   - [ ] "Voir le visuel" button
   - [ ] ProposalForm on right side

4. Fill ProposalForm:
   - Company: "Test Corp"
   - Contact: "Jane Doe"
   - Email: "jane@test.com"
   - Headcount: "50-249"
   - Priority: "Améliorer l'organisation"
   - Consent: Checked
   - Click "Envoyer ma demande"

5. Verify success message appears
6. Check Supabase dashboard → cart_requests table → new record created

**Expected Results**:
- [ ] All form fields validate
- [ ] Email validation works (reject invalid)
- [ ] Success message shows on submission
- [ ] Database record created with correct data
- [ ] No console errors

---

### Scenario 5: Print & PDF Download

**Objective**: Verify print and PDF functionality

**Steps**:
1. From `/univers-performance-liberation/panier`, click "Imprimer" button
2. Verify print preview opens with clean layout:
   - [ ] No navigation/UI elements
   - [ ] Experiences organized by category
   - [ ] Summary stats visible
   - [ ] Header and footer present
3. Cancel print dialog
4. Click "Télécharger en PDF":
   - a. **If Puppeteer installed**: PDF file downloads (panier-univers-YYYY-MM-DD.pdf)
   - b. **If Puppeteer not installed**: JSON response with cart data and message
5. Verify PDF contains all expected data

**Expected Results**:
- [ ] Print layout clean and organized
- [ ] PDF generation doesn't error (either generates PDF or JSON fallback)
- [ ] File naming includes date
- [ ] Response headers correct

---

### Scenario 6: Visual Pathway

**Objective**: Verify visual 3-column layout

**Steps**:
1. From panier page, click "Voir le visuel du parcours"
2. Navigate to `/univers-performance-liberation/panier/visuel`
3. Verify layout shows 3 columns: Structurer (blue), Libérer (green), Renforcer (purple)
4. Verify each column shows only items from that category
5. If category has no items, column shows "Aucune expérience" and is faded
6. Click "Imprimer" button → print preview shows same 3-column layout
7. On mobile (resize to <768px), verify layout stacks to 1 column
8. Verify "Télécharger en PDF" button attempts to fetch PDF

**Expected Results**:
- [ ] 3-column layout on desktop
- [ ] 1-column layout on mobile
- [ ] Category separation clear
- [ ] Print layout optimized
- [ ] Back link works

---

### Scenario 7: Partner Application Form

**Objective**: Verify partner recruitment form

**Steps**:
1. Scroll to bottom of univers main page found `PartnerSection`
2. Fill form:
   - Name: "John Expert"
   - Expertise: "Change Management"
   - Area: "Île-de-France"
   - Website: "www.johnexpert.com"
   - Message: "Je suis expert en changement organisationnel depuis 10 ans"
   - Click "Soumettre ma candidature"

3. Verify success message appears
4. Check Supabase → partner_applications table → new record created with status='pending'

**Expected Results**:
- [ ] Form validates (required fields)
- [ ] Success message clear
- [ ] Database record created
- [ ] Status set to 'pending'

---

### Scenario 8: Remove Item from Cart

**Objective**: Verify item removal works

**Steps**:
1. Add 3 items to cart
2. Navigate to `/univers-performance-liberation/panier`
3. Verify all 3 items listed and count shows 3
4. Click "Retirer" button on one item (if button exists on cart page)
   - OR return to univers page and click "Retirer" button
5. Verify item count decreases to 2
6. Verify localStorage updates
7. Reload page → verify item still removed
8. Remove remaining items until cart empty
9. Verify "Panier vide" message appears

**Expected Results**:
- [ ] Items removable from cart
- [ ] UI updates immediately
- [ ] Database synced
- [ ] Empty state handled

---

### Scenario 9: Admin Experience Management

**Objective**: Verify admin CRUD works (if using admin pages)

**Steps**:
1. Navigate to `/admin/experiences`
2. Click "+ Nouvelle expérience"
3. Fill form:
   - Title: "Test Experience"
   - Slug: "test-experience"
   - Category: "structurer"
   - Kind: "atelier"
   - Duration: 150
   - Check "Actif"
   - Click "Enregistrer"

4. Verify experience appears in list
5. Edit existing experience:
   - Click "Modifier"
   - Change title to "Test Experience Updated"
   - Click "Enregistrer"
   - Verify list updated

6. Delete experience:
   - Click "Supprimer"
   - Confirm deletion
   - Verify removed from list

7. Verify changes visible on univers page (if experience was active)

**Expected Results**:
- [ ] Create form works
- [ ] Edit form pre-populates
- [ ] Delete confirms before removing
- [ ] Changes persist in database
- [ ] UI syncs with backend

---

## Automated Tests (Jest)

### Run Tests
```bash
npm run test
# or
npx jest tests/
```

### Test Files to Create

**tests/universe-cart.test.ts**
```typescript
describe('Universe Cart', () => {
  it('should add item to cart', async () => {
    // Test useCartStore.addItem()
  });

  it('should remove item from cart', async () => {
    // Test useCartStore.removeItem()
  });

  it('should persist cart to localStorage', async () => {
    // Test Zustand persist
  });
});
```

**tests/universe-api.test.ts**
```typescript
describe('Universe API', () => {
  it('POST /api/universe/cart creates guest cart', async () => {
    // Test cart creation
  });

  it('POST /api/universe/cart/items adds item', async () => {
    // Test item addition
  });

  it('POST /api/universe/request creates proposal', async () => {
    // Test proposal submission
  });
});
```

---

## Performance Testing

### Metrics to Monitor

| Metric | Target | Tool |
|--------|--------|------|
| First Contentful Paint (FCP) | < 2s | Chrome DevTools |
| Largest Contentful Paint (LCP) | < 2.5s | Chrome DevTools |
| Cumulative Layout Shift (CLS) | < 0.1 | Chrome DevTools |
| Time to Interactive (TTI) | < 3s | Lighthouse |
| Cart operations latency | < 200ms | Network tab |

### Test With Chrome DevTools
1. Open DevTools → Lighthouse
2. Generate report for `/univers-performance-liberation`
3. Review scores (target: > 80)
4. Performance suggestions

---

## Browser Compatibility

Test on:
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

---

## RLS & Security Testing

### Test RLS Policies

1. **Public Read on Experiences**
   ```sql
   -- As anon user, should see is_active=true
   SELECT * FROM experiences WHERE is_active = true;
   -- Should return results
   
   -- Should NOT see is_active=false
   SELECT * FROM experiences WHERE is_active = false;
   -- Should return 0 rows
   ```

2. **Cart Access by Guest Token**
   ```sql
   -- Attempt to access cart with wrong guest_token
   SELECT * FROM carts WHERE guest_token != 'abc123';
   -- Should return 0 rows (RLS blocks)
   ```

3. **Proposal Form Insertion**
   ```sql
   -- As anon user, insert proposal
   INSERT INTO cart_requests (...) VALUES (...);
   -- Should succeed
   ```

---

## Debugging Checklist

### If Cart Not Working
- [ ] Zustand store initialized: `useCartStore()` in component
- [ ] localStorage not cleared: DevTools → Application → Clear site data
- [ ] API endpoint returns correct response: Network tab → /api/universe/cart
- [ ] Cart table has records: Supabase dashboard → Data

### If Experiences Not Showing
- [ ] Database table populated: `SELECT COUNT(*) FROM experiences;`
- [ ] Experiences have `is_active = true`
- [ ] Supabase RLS policy allows public read
- [ ] API endpoint working: Check Network tab → /api/universe/...

### If Proposal Not Submitting
- [ ] Form validation passing: Check console errors
- [ ] Email field required and valid
- [ ] API endpoint returning 200: Network tab → /api/universe/request
- [ ] Supabase cart_requests table accepts inserts

### If Print Not Working
- [ ] CSS media queries defined: `@media print { ... }`
- [ ] PrintableCart component rendered: Check HTML
- [ ] No JavaScript errors: Console tab clean

---

## Deployment Testing

Before prod:
1. [ ] `npm run build` succeeds with no errors
2. [ ] `npm run test` passes all tests
3. [ ] All environment variables set in production
4. [ ] Database backups created
5. [ ] RLS policies tested in production environment
6. [ ] CORS headers configured if needed
7. [ ] Analytics tracking configured
8. [ ] Error monitoring configured (Sentry, etc.)
9. [ ] Load testing with 100+ concurrent users
10. [ ] Security audit completed

---

## Test Data

### Sample Carts for Testing

**Cart 1: Structurer-focused**
- Cartographier les processus critiques (Atelier, 180min)
- Structurer les réunions (Formation, 120min)
- Total: 300min

**Cart 2: Mixed**
- Transformer les conflits (Immersion, 1440min)
- Entretiens authentiques (Atelier, 120min)
- Créer une vision partagée (Atelier, 180min)
- Total: 1740min

**Cart 3: All Categories**
- Pick 1-2 from each category
- Total: 400-500min

---

## Rollback Plan

If critical issues found:
1. Disable experiences: `UPDATE experiences SET is_active = false;`
2. Monitor error logs
3. Fix code
4. Redeploy
5. Re-enable experiences

---

## Sign-Off

- [ ] All scenarios tested and passed
- [ ] No console errors
- [ ] No missing features
- [ ] Ready for production

**Tested By**: [Name]
**Date**: [YYYY-MM-DD]
**Issues Found**: [Count]
