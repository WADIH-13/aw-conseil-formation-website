-- -- ============================================================================
-- UNIVERSE FEATURE: Tables pour le système "Univers Performance & Libération"
-- ============================================================================

-- 1. TABLE: EXPERIENCES
-- Catalogue des expériences (ateliers/formations/etc.)
CREATE TABLE IF NOT EXISTS experiences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  category text NOT NULL CHECK (category IN ('STRUCTURER','LIBERER','RENFORCER')),
  kind text NOT NULL CHECK (kind IN ('ATELIER','FORMATION','IMMERSION','TEAMBUILDING')),
  duration_minutes int NOT NULL DEFAULT 90,
  short_description text NOT NULL,
  long_description text,
  audience text[] DEFAULT NULL,
  benefits text[] DEFAULT NULL,
  deliverables text[] DEFAULT NULL,
  outline text DEFAULT NULL,
  format_details text DEFAULT NULL,
  hero_image_url text DEFAULT NULL,
  order_index int DEFAULT 0,
  featured boolean DEFAULT false,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS experiences_category_idx ON experiences(category);
CREATE INDEX IF NOT EXISTS experiences_slug_idx ON experiences(slug);
CREATE INDEX IF NOT EXISTS experiences_featured_idx ON experiences(featured);
CREATE INDEX IF NOT EXISTS experiences_is_active_idx ON experiences(is_active);
CREATE INDEX IF NOT EXISTS experiences_order_index_idx ON experiences(order_index);

-- Trigger pour updated_at
CREATE OR REPLACE FUNCTION update_experiences_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS experiences_updated_at_trigger ON experiences;
CREATE TRIGGER experiences_updated_at_trigger
BEFORE UPDATE ON experiences
FOR EACH ROW
EXECUTE FUNCTION update_experiences_updated_at();

-- ============================================================================

-- 2. TABLE: CARTS
-- Paniers invité & utilisateur
CREATE TABLE IF NOT EXISTS carts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid DEFAULT NULL REFERENCES auth.users(id) ON DELETE SET NULL,
  guest_token text UNIQUE DEFAULT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS carts_user_id_idx ON carts(user_id);
CREATE INDEX IF NOT EXISTS carts_guest_token_idx ON carts(guest_token);

-- Trigger pour updated_at
CREATE OR REPLACE FUNCTION update_carts_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS carts_updated_at_trigger ON carts;
CREATE TRIGGER carts_updated_at_trigger
BEFORE UPDATE ON carts
FOR EACH ROW
EXECUTE FUNCTION update_carts_updated_at();

-- ============================================================================

-- 3. TABLE: CART_ITEMS
-- Items dans le panier
CREATE TABLE IF NOT EXISTS cart_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cart_id uuid NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
  experience_id uuid NOT NULL REFERENCES experiences(id) ON DELETE CASCADE,
  order_index int DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  UNIQUE(cart_id, experience_id)
);

CREATE INDEX IF NOT EXISTS cart_items_cart_id_idx ON cart_items(cart_id);
CREATE INDEX IF NOT EXISTS cart_items_experience_id_idx ON cart_items(experience_id);

-- ============================================================================

-- 4. TABLE: CART_REQUESTS
-- Infos entreprises et demande de proposition
CREATE TABLE IF NOT EXISTS cart_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cart_id uuid NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
  company_name text DEFAULT NULL,
  contact_name text DEFAULT NULL,
  email text DEFAULT NULL,
  role text DEFAULT NULL,
  headcount text DEFAULT NULL CHECK (headcount IN ('1-10','11-49','50-249','250+') OR headcount IS NULL),
  activity text DEFAULT NULL,
  priority text DEFAULT NULL CHECK (priority IN ('ORGANISATION','COHESION','EQUILIBRE','CROISSANCE','PREVENTION') OR priority IS NULL),
  message text DEFAULT NULL,
  consent_marketing boolean DEFAULT false,
  status text DEFAULT 'new' CHECK (status IN ('new','contacted','won','lost')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS cart_requests_cart_id_idx ON cart_requests(cart_id);
CREATE INDEX IF NOT EXISTS cart_requests_email_idx ON cart_requests(email);
CREATE INDEX IF NOT EXISTS cart_requests_status_idx ON cart_requests(status);

-- Trigger pour updated_at
CREATE OR REPLACE FUNCTION update_cart_requests_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS cart_requests_updated_at_trigger ON cart_requests;
CREATE TRIGGER cart_requests_updated_at_trigger
BEFORE UPDATE ON cart_requests
FOR EACH ROW
EXECUTE FUNCTION update_cart_requests_updated_at();

-- ============================================================================

-- 5. TABLE: PARTNER_APPLICATIONS
-- Candidatures partenaires
CREATE TABLE IF NOT EXISTS partner_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  expertise text NOT NULL,
  area text DEFAULT NULL,
  website text DEFAULT NULL,
  message text DEFAULT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS partner_applications_status_idx ON partner_applications(status);

-- Trigger pour updated_at
CREATE OR REPLACE FUNCTION update_partner_applications_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS partner_applications_updated_at_trigger ON partner_applications;
CREATE TRIGGER partner_applications_updated_at_trigger
BEFORE UPDATE ON partner_applications
FOR EACH ROW
EXECUTE FUNCTION update_partner_applications_updated_at();

-- ============================================================================
-- RLS (ROW LEVEL SECURITY) POLICIES
-- ============================================================================

-- Activer RLS sur toutes les tables
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_applications ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- EXPERIENCES: Public SELECT only on is_active=true
-- ============================================================================
CREATE POLICY "experiences_public_select" ON experiences
FOR SELECT
USING (is_active = true);

CREATE POLICY "experiences_admin_all" ON experiences
FOR ALL
USING (EXISTS (
  SELECT 1 FROM auth.users
  WHERE auth.users.id = auth.uid()
  AND auth.users.email LIKE '%@aw-conseil%'
));

-- ============================================================================
-- CARTS: Invité (guest_token) ou utilisateur propriétaire
-- ============================================================================
CREATE POLICY "carts_guest_select" ON carts
FOR SELECT
USING (
  guest_token IS NOT NULL
  OR auth.uid() = user_id
);

CREATE POLICY "carts_guest_insert" ON carts
FOR INSERT
WITH CHECK (true); -- Permet à n'importe qui de créer (guest_token généré avant)

CREATE POLICY "carts_guest_update" ON carts
FOR UPDATE
USING (
  guest_token IS NOT NULL
  OR auth.uid() = user_id
);

-- ============================================================================
-- CART_ITEMS: Invité ou utilisateur propriétaire
-- ============================================================================
CREATE POLICY "cart_items_guest_select" ON cart_items
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM carts
    WHERE carts.id = cart_items.cart_id
    AND (carts.guest_token IS NOT NULL OR auth.uid() = carts.user_id)
  )
);

CREATE POLICY "cart_items_guest_insert" ON cart_items
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM carts
    WHERE carts.id = cart_id
    AND (carts.guest_token IS NOT NULL OR auth.uid() = carts.user_id)
  )
);

CREATE POLICY "cart_items_guest_delete" ON cart_items
FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM carts
    WHERE carts.id = cart_items.cart_id
    AND (carts.guest_token IS NOT NULL OR auth.uid() = carts.user_id)
  )
);

-- ============================================================================
-- CART_REQUESTS: Lié à un cart existant (invité ou user)
-- ============================================================================
CREATE POLICY "cart_requests_guest_insert" ON cart_requests
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM carts
    WHERE carts.id = cart_id
    AND (carts.guest_token IS NOT NULL OR auth.uid() = carts.user_id)
  )
);

CREATE POLICY "cart_requests_admin_select" ON cart_requests
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid()
    AND auth.users.email LIKE '%@aw-conseil%'
  )
);

-- ============================================================================
-- PARTNER_APPLICATIONS: Public INSERT uniquement
-- ============================================================================
CREATE POLICY "partner_applications_public_insert" ON partner_applications
FOR INSERT
WITH CHECK (true);

CREATE POLICY "partner_applications_admin_select" ON partner_applications
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid()
    AND auth.users.email LIKE '%@aw-conseil%'
  )
);

-- ============================================================================
-- FIN SQL UNIVERSE
-- ============================================================================
