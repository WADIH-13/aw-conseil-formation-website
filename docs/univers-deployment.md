# Univers Performance & Libération - Deployment Checklist

## Pre-Deployment Validation

### Code Quality
- [ ] **TypeScript Compilation**
  ```bash
  npm run build
  # No TypeScript errors
  ```

- [ ] **Linting**
  ```bash
  npm run lint
  # No ESLint errors or warnings
  ```

- [ ] **Testing**
  ```bash
  npm run test
  # All tests passing
  ```

### Database Preparation
- [ ] **Create Schema**
  - [ ] Backup existing Supabase database
  - [ ] Copy `supabase/universe.sql` content
  - [ ] Execute in Supabase Dashboard → SQL Editor
  - [ ] Verify tables created: `experiences`, `carts`, `cart_items`, `cart_requests`, `partner_applications`
  - [ ] Verify triggers exist: `updated_at` on all tables
  - [ ] Verify RLS policies exist (5 policies total)

- [ ] **Load Seed Data**
  - [ ] Copy `supabase/seed-universe.sql` content
  - [ ] Execute in Supabase Dashboard → SQL Editor
  - [ ] Verify 15 experiences created: `SELECT COUNT(*) FROM experiences;` → should return 15

- [ ] **Verify Indexes**
  - [ ] All indexes created for performance
  - [ ] `SELECT * FROM pg_stat_user_indexes WHERE schemaname = 'public';`

### Environment Configuration
- [ ] **Production .env**
  ```
  NEXT_PUBLIC_SUPABASE_URL=...
  NEXT_PUBLIC_SUPABASE_ANON_KEY=...
  SUPABASE_SERVICE_ROLE_KEY=...
  
  # Optional: PDF Generation
  # PUPPETEER_EXECUTABLE_PATH=/path/to/chromium
  ```

- [ ] **Supabase Project Settings**
  - [ ] Auth providers configured (if using user authentication)
  - [ ] CORS headers configured for your domain
  - [ ] Database backups enabled (daily)
  - [ ] Monitoring/alerts configured

### File Structure Verification
- [ ] **All files exist:**
  - [ ] `supabase/universe.sql`
  - [ ] `supabase/seed-universe.sql`
  - [ ] `lib/universe/types.ts`
  - [ ] `lib/universe/queries.ts`
  - [ ] `lib/universe/copy.ts`
  - [ ] `lib/universe/cartStore.ts`
  - [ ] `components/universe/ExperienceCard.tsx`
  - [ ] `components/universe/ExperienceDetailClient.tsx`
  - [ ] `components/universe/UniverseGrid.tsx`
  - [ ] `components/universe/HeroSection.tsx`
  - [ ] `components/universe/CartPanel.tsx`
  - [ ] `components/universe/ProposalForm.tsx`
  - [ ] `components/universe/PrintableCart.tsx`
  - [ ] `components/universe/PartnerSection.tsx`
  - [ ] `app/univers-performance-liberation/page.tsx`
  - [ ] `app/univers-performance-liberation/[slug]/page.tsx`
  - [ ] `app/univers-performance-liberation/panier/page.tsx`
  - [ ] `app/univers-performance-liberation/panier/visuel/page.tsx`
  - [ ] `app/api/universe/cart/route.ts`
  - [ ] `app/api/universe/cart/items/route.ts`
  - [ ] `app/api/universe/partner/route.ts`
  - [ ] `app/api/universe/request/route.ts`
  - [ ] `app/api/universe/pdf/route.ts`
  - [ ] `app/admin/experiences/page.tsx`
  - [ ] `docs/univers-setup.md`
  - [ ] `docs/univers-testing.md`

---

## Deployment Steps

### Step 1: Execute Database Schema
```bash
# 1. Go to Supabase Dashboard
# 2. SQL Editor → New Query
# 3. Paste supabase/universe.sql content
# 4. Execute (should show "executed successfully")
# 5. Verify 5 tables and 5 RLS policies exist
```

**Verification Query:**
```sql
SELECT tablename FROM pg_tables WHERE schemaname = 'public' AND tablename LIKE 'experiences%' OR tablename LIKE 'carts%' OR tablename LIKE 'cart_%';
-- Should return: experiences, carts, cart_items, cart_requests, partner_applications
```

### Step 2: Load Seed Data (Optional but Recommended)
```bash
# 1. Go to Supabase Dashboard → SQL Editor
# 2. Paste supabase/seed-universe.sql content
# 3. Execute
# 4. Verify count: SELECT COUNT(*) FROM experiences; → 15
```

### Step 3: Deploy Application
```bash
# Option A: Vercel (Recommended)
git push origin main
# Vercel auto-deploys

# Option B: Manual Build & Deploy
npm run build
# Upload dist to hosting platform

# Option C: Docker
docker build -t univers-app .
docker run -e NEXT_PUBLIC_SUPABASE_URL=... -p 3000:3000 univers-app
```

### Step 4: Verify Deployment
```bash
# 1. Open production URL
# 2. Navigate to /univers-performance-liberation
# 3. Verify:
#    - Page loads without errors
#    - 15 experiences visible in grid
#    - All 3 category tabs work
#    - Add to cart functionality works
#    - CartPanel shows count

# 4. Test full flow:
#    - Add 3-5 items
#    - Navigate to /panier
#    - Fill proposal form
#    - Submit
#    - Check Supabase cart_requests table for new record
```

### Step 5: Post-Deployment Testing
- [ ] Smoke Test
  - [ ] Homepage loads
  - [ ] `/univers-performance-liberation` loads
  - [ ] `/univers-performance-liberation/[slug]` loads with valid slug
  - [ ] `/univers-performance-liberation/panier` loads
  - [ ] `/univers-performance-liberation/panier/visuel` loads
  - [ ] Console has no JavaScript errors

- [ ] Functional Testing
  - [ ] Add item to cart → localStorage updates
  - [ ] Reload page → cart persists
  - [ ] Submit proposal → database record created
  - [ ] Print → clean preview
  - [ ] PDF download → file downloads or JSON fallback

- [ ] API Testing
  ```bash
  # Test cart creation
  curl -X POST https://yourdomain/api/universe/cart \
    -H "Content-Type: application/json" \
    -d '{}' \
    | jq .

  # Test proposal submission
  curl -X POST https://yourdomain/api/universe/request \
    -H "Content-Type: application/json" \
    -d '{"cart_id":"...", "email":"test@example.com", "company_name":"Test", "contact_name":"John", ...}' \
    | jq .
  ```

---

## Monitoring & Alerts

### Setup Monitoring
- [ ] **Error Tracking**: Configure Sentry/Rollbar
  ```javascript
  // In app root
  import * as Sentry from "@sentry/nextjs";
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV,
  });
  ```

- [ ] **Performance Monitoring**: Configure analytics
  - [ ] Web Vitals: Core Web Vitals tracking
  - [ ] Custom Events: Cart operations, conversions
  - [ ] funnel: Browse → Add to cart → Submit proposal

- [ ] **Database Monitoring**
  - [ ] Supabase Dashboard → Performance Advisor
  - [ ] Query performance > 500ms logged
  - [ ] RLS policy performance verified

### Alert Configuration
- [ ] Error rate > 5% → Alert
- [ ] API latency > 1000ms → Alert
- [ ] Database connection failures → Alert
- [ ] Disk space critical → Alert

---

## Rollback Plan

### If Issues Found in Production

**Immediate:**
1. Disassociate univers link from homepage (if linked)
2. Set all experiences inactive: 
   ```sql
   UPDATE experiences SET is_active = false;
   ```
3. Monitor error logs
4. Notify team

**Recovery:**
1. Identify root cause
2. Fix code locally
3. Test in staging
4. Redeploy to production
5. Re-enable experiences:
   ```sql
   UPDATE experiences SET is_active = true WHERE ...;
   ```
6. Verification testing (same as Step 5 above)

**Database Rollback (if schema issues):**
1. Supabase → Backups → Restore to point-in-time
2. Verify data integrity
3. Redeploy code

---

## Post-Deployment Tasks

### Day 1 (Launch Day)
- [ ] Monitor error logs continuously (every 30 minutes)
- [ ] Test all user workflows
- [ ] Respond to user feedback quickly
- [ ] Keep team notified of status

### Day 2-7 (First Week)
- [ ] Review usage analytics
- [ ] Test load characteristics
- [ ] Monitor database performance
- [ ] Gather user feedback
- [ ] Fix any minor bugs

### Week 2+ (Ongoing)
- [ ] Regular backups captured
- [ ] Performance trending healthy
- [ ] User satisfaction verified
- [ ] Begin planning Stage 2 enhancements

---

## Success Criteria

### Technical ✅
- [ ] Build: 0 TypeScript errors
- [ ] Tests: 100% passing
- [ ] Performance: LCP < 2.5s, CLS < 0.1
- [ ] API: All endpoints return 200 for valid requests
- [ ] Database: 15 experiences visible, RLS working

### Functional ✅
- [ ] Users can browse experiences
- [ ] Users can add/remove from cart
- [ ] Cart persists across reloads
- [ ] Users can submit proposals
- [ ] Proposals saved to database
- [ ] Print & PDF both work (or fallback)

### User Experience ✅
- [ ] No console errors
- [ ] No broken links
- [ ] Responsive on mobile/tablet/desktop
- [ ] Forms have helpful error messages
- [ ] Loading states clear
- [ ] Animations smooth (no jank)

---

## Feedback Loop

### Issue Tracking
- Document issues in GitHub Issues with labels:
  - `universe-bug`: Functional defects
  - `universe-enhancement`: Nice-to-haves
  - `universe-documentation`: Docs updates

### User Feedback
- Collect via: Email, support chat, analytics
- Review weekly
- Prioritize fixes based on severity

### Regular Reviews
- **Weekly**: Error logs, performance metrics
- **Bi-weekly**: User feedback, feature requests
- **Monthly**: Database queries, scalability review
- **Quarterly**: Major updates, architectural review

---

## Stage 2 Enhancements (Post-MVP)

Once MVP stable for 2 weeks:
- [ ] User authentication & save carts
- [ ] Email notifications (proposals received/accepted)
- [ ] Admin dashboard improvements
- [ ] Pricing model integration (if needed)
- [ ] Calendar scheduling
- [ ] Team collaboration features

---

## Handoff Documentation

### For Team Members
- [ ] Architecture Overview: `docs/univers-setup.md`
- [ ] Testing Guide: `docs/univers-testing.md`
- [ ] Code Comments: Inline comments in key files
- [ ] Type Definitions: `lib/universe/types.ts` (self-documenting)
- [ ] Copy Configuration: `lib/universe/copy.ts` (centralized text)

### For Support Team
- [ ] Common Issues & Solutions
- [ ] Database Access Instructions
- [ ] Error Code Reference
- [ ] User Help Scripts

### For Product Team
- [ ] Feature Overview Presentation
- [ ] Usage Analytics Dashboard
- [ ] Feedback Collection Process
- [ ] Roadmap for Stage 2

---

## Sign-Off

| Role | Name | Date | Status |
|------|------|------|--------|
| Developer | _______ | ______ | ☐ Approved |
| QA | _______ | ______ | ☐ Approved |
| Product Manager | _______ | ______ | ☐ Approved |
| Infrastructure | _______ | ______ | ☐ Approved |

---

## Emergency Contacts

- **Technical Lead**: [Name] - [Email]
- **Database Admin**: [Name] - [Email]
- **DevOps**: [Name] - [Email]
- **Product Manager**: [Name] - [Email]

---

## Final Notes

This is a production-ready implementation of Option C. All components tested, documented, and ready for deployment. The architecture supports future expansion to Stage 2 without major refactoring.

**Deployment Date**: ___________
**Deployed By**: ___________
**Production URL**: ___________

Good luck! 🚀
