import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import { MOCK_VENDORS } from '../src/lib/data';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !serviceKey) {
  console.error('❌ Error: Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment.');
  console.log('Please configure your .env.local file first.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceKey);

async function seedDatabase() {
  console.log('🌱 Starting database seed for Ayojan.app...');

  const formattedVendors = MOCK_VENDORS.map((v) => ({
    name: v.name,
    slug: v.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    category: v.category,
    category_label: v.categoryLabel,
    city: v.city,
    area: v.area,
    rating: v.rating,
    reviews_count: v.reviewsCount,
    price_starting: v.priceStarting,
    price_unit: v.priceUnit,
    capacity_min: v.capacity?.min || null,
    capacity_max: v.capacity?.max || null,
    image: v.image,
    verified: v.verified,
    response_time: v.responseTime,
    tags: v.tags,
    description: v.description,
    inclusions: v.inclusions,
    event_types: v.eventTypes,
  }));

  console.log(`Inserting ${formattedVendors.length} verified vendors/venues...`);

  const { data, error } = await supabase
    .from('vendors')
    .upsert(formattedVendors, { onConflict: 'slug' })
    .select();

  if (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  }

  console.log(`✅ Successfully seeded ${data?.length || 0} vendors into Supabase!`);
}

seedDatabase();
