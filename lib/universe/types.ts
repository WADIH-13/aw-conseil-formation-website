// Types pour la feature Univers Performance & Libération

export type ExperienceCategory = 'STRUCTURER' | 'LIBERER' | 'RENFORCER';
export type ExperienceKind = 'ATELIER' | 'FORMATION' | 'IMMERSION' | 'TEAMBUILDING';
export type HeadcountRange = '1-10' | '11-49' | '50-249' | '250+';
export type Priority = 'ORGANISATION' | 'COHESION' | 'EQUILIBRE' | 'CROISSANCE' | 'PREVENTION';
export type CartRequestStatus = 'new' | 'contacted' | 'won' | 'lost';
export type PartnerStatus = 'pending' | 'approved' | 'rejected';

// ============================================================================
// EXPERIENCE
// ============================================================================

export interface Experience {
  id: string;
  title: string;
  slug: string;
  category: ExperienceCategory;
  kind: ExperienceKind;
  duration_minutes: number;
  short_description: string;
  long_description?: string;
  audience?: string[];
  benefits?: string[];
  deliverables?: string[];
  outline?: string;
  format_details?: string;
  hero_image_url?: string;
  order_index: number;
  featured: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// ============================================================================
// CART
// ============================================================================

export interface Cart {
  id: string;
  user_id?: string;
  guest_token?: string;
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  id: string;
  cart_id: string;
  experience_id: string;
  order_index: number;
  created_at: string;
  // Joined avec experience pour affichage
  experience?: Experience;
}

export interface CartWithItems extends Cart {
  cart_items: CartItem[];
}

// ============================================================================
// CART REQUEST (Demande de proposition)
// ============================================================================

export interface CartRequest {
  id: string;
  cart_id: string;
  company_name?: string;
  contact_name?: string;
  email?: string;
  role?: string;
  headcount?: HeadcountRange;
  activity?: string;
  priority?: Priority;
  message?: string;
  consent_marketing: boolean;
  status: CartRequestStatus;
  created_at: string;
  updated_at: string;
}

// ============================================================================
// PARTNER APPLICATION
// ============================================================================

export interface PartnerApplication {
  id: string;
  name: string;
  expertise: string;
  area?: string;
  website?: string;
  message?: string;
  status: PartnerStatus;
  created_at: string;
  updated_at: string;
}

// ============================================================================
// FORMS
// ============================================================================

export interface ProposalFormData {
  company_name: string;
  contact_name: string;
  email: string;
  role?: string;
  headcount?: HeadcountRange;
  activity?: string;
  priority?: Priority;
  message?: string;
  consent_marketing: boolean;
}

export interface PartnerFormData {
  name: string;
  expertise: string;
  area?: string;
  website?: string;
  message?: string;
}

// ============================================================================
// CART STATE (Local/Client)
// ============================================================================

export interface CartState {
  items: CartItem[];
  guestToken?: string;
  cartId?: string;
  isLoading: boolean;
  error?: string;
}

// ============================================================================
// UNIVERSE PAGE DATA
// ============================================================================

export interface UniverseData {
  STRUCTURER: Experience[];
  LIBERER: Experience[];
  RENFORCER: Experience[];
}

export interface CartSummary {
  total_count: number;
  duration_total_minutes: number;
  category_counts: {
    STRUCTURER: number;
    LIBERER: number;
    RENFORCER: number;
  };
  category_durations: {
    STRUCTURER: number;
    LIBERER: number;
    RENFORCER: number;
  };
}
