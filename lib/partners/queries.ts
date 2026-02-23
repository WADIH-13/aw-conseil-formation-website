import { supabaseServer } from '@/lib/supabaseServer';

export interface PartnerProfile {
  id: string;
  slug: string;
  name: string;
  short: string;
  website?: string | null;
  email?: string | null;
  phone?: string | null;
  area?: string | null;
  logo_url: string;
  photo_url: string;
  status: 'published' | 'pending' | 'rejected';
  created_at: string;
  updated_at: string;
}

export async function getPublishedPartners(): Promise<PartnerProfile[]> {
  const supabase = supabaseServer();
  const { data, error } = await supabase
    .from('partner_profiles')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Erreur getPublishedPartners:', error);
    return [];
  }

  return data || [];
}

export async function getPartnerBySlug(slug: string): Promise<PartnerProfile | null> {
  const supabase = supabaseServer();
  const { data, error } = await supabase
    .from('partner_profiles')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle();

  if (error) {
    console.error('Erreur getPartnerBySlug:', error);
    return null;
  }

  return data || null;
}
