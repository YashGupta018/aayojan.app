import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

/**
 * Shared Supabase Client
 * Can be safely used in browser components or API routes.
 * When environment variables are not yet populated, queries fail gracefully.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface DbVendor {
  id: string;
  owner_id?: string;
  name: string;
  slug: string;
  category: 'venue' | 'catering' | 'photography' | 'decor' | 'entertainment' | 'makeup' | 'invitations';
  category_label: string;
  city: string;
  area: string;
  rating: number;
  reviews_count: number;
  price_starting: number;
  price_unit: string;
  capacity_min?: number;
  capacity_max?: number;
  image: string;
  gallery?: string[];
  verified: boolean;
  response_time: string;
  tags: string[];
  description: string;
  inclusions: string[];
  event_types: ('wedding' | 'corporate' | 'social' | 'community')[];
}
