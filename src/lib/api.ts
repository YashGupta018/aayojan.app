import { supabase, DbVendor } from './supabase';
import { Vendor, MOCK_VENDORS } from './data';

/**
 * Maps PostgreSQL snake_case row to the application's Vendor interface
 */
export function mapDbVendorToVendor(dbVendor: DbVendor): Vendor {
  return {
    id: dbVendor.id,
    name: dbVendor.name,
    category: dbVendor.category,
    categoryLabel: dbVendor.category_label,
    city: dbVendor.city,
    area: dbVendor.area,
    rating: Number(dbVendor.rating),
    reviewsCount: dbVendor.reviews_count,
    priceStarting: dbVendor.price_starting,
    priceUnit: dbVendor.price_unit,
    capacity: dbVendor.capacity_min && dbVendor.capacity_max 
      ? { min: dbVendor.capacity_min, max: dbVendor.capacity_max } 
      : undefined,
    image: dbVendor.image,
    verified: dbVendor.verified,
    responseTime: dbVendor.response_time,
    tags: dbVendor.tags || [],
    description: dbVendor.description,
    inclusions: dbVendor.inclusions || [],
    eventTypes: dbVendor.event_types || ['wedding', 'corporate', 'social', 'community'],
  };
}

/**
 * Fetch vendors dynamically from Supabase PostgreSQL.
 * Falls back to MOCK_VENDORS if database query fails or is empty during offline/build scenarios.
 */
export async function getVendors(params?: {
  city?: string;
  category?: string;
  eventType?: string;
  searchQuery?: string;
  limit?: number;
}): Promise<Vendor[]> {
  try {
    let query = supabase
      .from('vendors')
      .select('*')
      .order('rating', { ascending: false });

    if (params?.city && params.city !== 'All India') {
      query = query.eq('city', params.city);
    }

    if (params?.category && params.category !== 'all') {
      query = query.eq('category', params.category);
    }

    if (params?.searchQuery && params.searchQuery.trim().length > 0) {
      query = query.ilike('name', `%${params.searchQuery.trim()}%`);
    }

    if (params?.limit) {
      query = query.limit(params.limit);
    }

    const { data, error } = await query;

    if (error) {
      console.warn('Supabase fetch error, using fallback:', error.message);
      return filterMockVendors(params);
    }

    if (data && data.length > 0) {
      return (data as unknown as DbVendor[]).map(mapDbVendorToVendor);
    }

    return filterMockVendors(params);
  } catch (err) {
    console.error('Failed to fetch vendors from Supabase:', err);
    return filterMockVendors(params);
  }
}

/**
 * Fetch single vendor by ID or slug
 */
export async function getVendorById(idOrSlug: string): Promise<Vendor | null> {
  try {
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(idOrSlug);
    const query = supabase.from('vendors').select('*');
    
    const { data, error } = isUuid 
      ? await query.eq('id', idOrSlug).single()
      : await query.eq('slug', idOrSlug).single();

    if (error || !data) {
      const fallback = MOCK_VENDORS.find(v => v.id === idOrSlug);
      return fallback || null;
    }

    return mapDbVendorToVendor(data as unknown as DbVendor);
  } catch {
    return MOCK_VENDORS.find(v => v.id === idOrSlug) || null;
  }
}

function filterMockVendors(params?: { city?: string; category?: string; searchQuery?: string; limit?: number }): Vendor[] {
  let list = [...MOCK_VENDORS];
  if (params?.city && params.city !== 'All India') {
    list = list.filter(v => v.city.toLowerCase() === params.city?.toLowerCase());
  }
  if (params?.category && params.category !== 'all') {
    list = list.filter(v => v.category === params.category);
  }
  if (params?.searchQuery) {
    const q = params.searchQuery.toLowerCase();
    list = list.filter(v => v.name.toLowerCase().includes(q) || v.area.toLowerCase().includes(q));
  }
  if (params?.limit) {
    list = list.slice(0, params.limit);
  }
  return list;
}
