// Queries pour la feature Univers
import {
  Experience,
  Cart,
  CartItem,
  CartWithItems,
  CartRequest,
  PartnerApplication,
  UniverseData,
  CartSummary,
} from './types';
import { supabaseServer } from '@/lib/supabaseServer';
import { nanoid } from 'nanoid';

// ============================================================================
// EXPERIENCES
// ============================================================================

/** Récupérer toutes les expériences actives */
export async function getExperiences(): Promise<Experience[]> {
  const supabase = supabaseServer();
  const { data, error } = await supabase
    .from('experiences')
    .select('*')
    .eq('is_active', true)
    .order('order_index', { ascending: true });

  if (error) {
    console.error('Erreur getExperiences:', error);
    throw error;
  }

  return data || [];
}

/** Récupérer les expériences par catégorie */
export async function getExperiencesByCategory(category: string): Promise<Experience[]> {
  const supabase = supabaseServer();
  const { data, error } = await supabase
    .from('experiences')
    .select('*')
    .eq('is_active', true)
    .eq('category', category)
    .order('order_index', { ascending: true });

  if (error) {
    console.error(`Erreur getExperiencesByCategory(${category}):`, error);
    throw error;
  }

  return data || [];
}

/** Récupérer les expériences featured */
export async function getFeaturedExperiences(limit = 3): Promise<Experience[]> {
  const supabase = supabaseServer();
  const { data, error } = await supabase
    .from('experiences')
    .select('*')
    .eq('is_active', true)
    .eq('featured', true)
    .order('order_index', { ascending: true })
    .limit(limit);

  if (error) {
    console.error('Erreur getFeaturedExperiences:', error);
    throw error;
  }

  return data || [];
}

/** Récupérer une expérience par slug */
export async function getExperienceBySlug(slug: string): Promise<Experience | null> {
  const supabase = supabaseServer();
  const { data, error } = await supabase
    .from('experiences')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (error && error.code !== 'PGRST116') {
    // PGRST116 = no rows found
    console.error('Erreur getExperienceBySlug:', error);
    throw error;
  }

  return data || null;
}

/** Récupérer toutes les expériences (admin) */
export async function getExperiencesAdmin(): Promise<Experience[]> {
  const supabase = supabaseServer();
  const { data, error } = await supabase
    .from('experiences')
    .select('*')
    .order('order_index', { ascending: true });

  if (error) {
    console.error('Erreur getExperiencesAdmin:', error);
    throw error;
  }

  return data || [];
}

/** Créer une expérience (admin) */
export async function createExperience(experience: Omit<Experience, 'id' | 'created_at' | 'updated_at'>) {
  const supabase = supabaseServer();
  const { data, error } = await supabase
    .from('experiences')
    .insert([experience])
    .select()
    .single();

  if (error) {
    console.error('Erreur createExperience:', error);
    throw error;
  }

  return data;
}

/** Mettre à jour une expérience (admin) */
export async function updateExperience(id: string, updates: Partial<Experience>) {
  const supabase = supabaseServer();
  const { data, error } = await supabase
    .from('experiences')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Erreur updateExperience:', error);
    throw error;
  }

  return data;
}

/** Supprimer une expérience (soft delete) */
export async function deleteExperienceAdmin(id: string) {
  return updateExperience(id, { is_active: false });
}

// ============================================================================
// CART
// ============================================================================

/** Créer un panier invité avec guest_token */
export async function createGuestCart(): Promise<Cart> {
  const supabase = supabaseServer();
  const guestToken = generateGuestToken();

  const { data, error } = await supabase
    .from('carts')
    .insert([{ guest_token: guestToken }])
    .select()
    .single();

  if (error) {
    console.error('Erreur createGuestCart:', error);
    throw error;
  }

  return data;
}

/** Récupérer un panier par guest_token */
export async function getCartByGuestToken(guestToken: string): Promise<CartWithItems | null> {
  const supabase = supabaseServer();

  // Récupérer le panier
  const { data: cart, error: cartError } = await supabase
    .from('carts')
    .select('*')
    .eq('guest_token', guestToken)
    .single();

  if (cartError && cartError.code !== 'PGRST116') {
    console.error('Erreur getCartByGuestToken:', cartError);
    throw cartError;
  }

  if (!cart) return null;

  // Récupérer les items
  const { data: items, error: itemsError } = await supabase
    .from('cart_items')
    .select('*, experience:experiences(*)')
    .eq('cart_id', cart.id)
    .order('order_index', { ascending: true });

  if (itemsError) {
    console.error('Erreur getting cart items:', itemsError);
    throw itemsError;
  }

  return {
    ...cart,
    cart_items: items || [],
  };
}

/** Ajouter une expérience au panier */
export async function addToCart(cartId: string, experienceId: string): Promise<CartItem> {
  const supabase = supabaseServer();

  // Récupérer le nombre d'items actuels
  const { count } = await supabase
    .from('cart_items')
    .select('*', { count: 'exact', head: true })
    .eq('cart_id', cartId);

  const { data, error } = await supabase
    .from('cart_items')
    .insert([
      {
        cart_id: cartId,
        experience_id: experienceId,
        order_index: count || 0,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error('Erreur addToCart:', error);
    throw error;
  }

  return data;
}

/** Supprimer une expérience du panier */
export async function removeFromCart(cartItemId: string): Promise<void> {
  const supabase = supabaseServer();

  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('id', cartItemId);

  if (error) {
    console.error('Erreur removeFromCart:', error);
    throw error;
  }
}

/** Calculer le résumé du panier */
export async function getCartSummary(cartId: string): Promise<CartSummary> {
  const supabase = supabaseServer();

  const { data: items, error } = await supabase
    .from('cart_items')
    .select('experience:experiences(id,category,duration_minutes)')
    .eq('cart_id', cartId);

  if (error) {
    console.error('Erreur getCartSummary:', error);
    throw error;
  }

  const summary: CartSummary = {
    total_count: items?.length || 0,
    duration_total_minutes: 0,
    category_counts: {
      STRUCTURER: 0,
      LIBERER: 0,
      RENFORCER: 0,
    },
    category_durations: {
      STRUCTURER: 0,
      LIBERER: 0,
      RENFORCER: 0,
    },
  };

  items?.forEach((item) => {
    // Supabase peut retourner experience comme un objet ou un tableau selon la relation
    const exp = Array.isArray(item.experience) ? item.experience[0] : item.experience;
    if (exp && exp.category) {
      const category = exp.category as 'STRUCTURER' | 'LIBERER' | 'RENFORCER';
      summary.category_counts[category]++;
      summary.category_durations[category] += exp.duration_minutes;
      summary.duration_total_minutes += exp.duration_minutes;
    }
  });

  return summary;
}

// ============================================================================
// CART REQUEST (Demande proposition)
// ============================================================================

/** Créer une demande de proposition */
export async function createCartRequest(cartId: string, request: Omit<CartRequest, 'id' | 'cart_id' | 'created_at' | 'updated_at' | 'status'>): Promise<CartRequest> {
  const supabase = supabaseServer();

  const { data, error } = await supabase
    .from('cart_requests')
    .insert([
      {
        cart_id: cartId,
        ...request,
        status: 'new',
      },
    ])
    .select()
    .single();

  if (error) {
    console.error('Erreur createCartRequest:', error);
    throw error;
  }

  return data;
}

/** Récupérer les demandes (admin) */
export async function getCartRequests(): Promise<CartRequest[]> {
  const supabase = supabaseServer();

  const { data, error } = await supabase
    .from('cart_requests')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Erreur getCartRequests:', error);
    throw error;
  }

  return data || [];
}

// ============================================================================
// PARTNER APPLICATION
// ============================================================================

/** Créer une candidature partenaire */
export async function createPartnerApplication(application: Omit<PartnerApplication, 'id' | 'created_at' | 'updated_at' | 'status'>): Promise<PartnerApplication> {
  const supabase = supabaseServer();

  const { data, error } = await supabase
    .from('partner_applications')
    .insert([
      {
        ...application,
        status: 'pending',
      },
    ])
    .select()
    .single();

  if (error) {
    console.error('Erreur createPartnerApplication:', error);
    throw error;
  }

  return data;
}

/** Récupérer les candidatures (admin) */
export async function getPartnerApplications(): Promise<PartnerApplication[]> {
  const supabase = supabaseServer();

  const { data, error } = await supabase
    .from('partner_applications')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Erreur getPartnerApplications:', error);
    throw error;
  }

  return data || [];
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/** Générer un guest token unique */
function generateGuestToken(): string {
  return nanoid();
}

/** Récupérer les expériences organised par catégorie */
export async function getUniverseData(): Promise<UniverseData> {
  const [structurer, liberer, renforcer] = await Promise.all([
    getExperiencesByCategory('STRUCTURER'),
    getExperiencesByCategory('LIBERER'),
    getExperiencesByCategory('RENFORCER'),
  ]);

  return {
    STRUCTURER: structurer,
    LIBERER: liberer,
    RENFORCER: renforcer,
  };
}

// Alias pour clarté
export const queries = {
  getExperiences,
  getExperiencesByCategory,
  getFeaturedExperiences,
  getExperienceBySlug,
  getUniverseData,
  createGuestCart,
  getCartByGuestToken,
  addToCart,
  removeFromCart,
  getCartSummary,
  createCartRequest,
  createPartnerApplication,
};
