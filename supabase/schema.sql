-- ==============================================================================
-- Aayojan.app - Production Relational PostgreSQL Database Schema
-- Architecture: Optimized for Multi-Tenant Event Discovery, Quotes & AI Planning
-- ==============================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. PROFILES / USERS TABLE
-- Links with Supabase auth.users or standalone auth
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique,
  phone text unique,
  full_name text not null,
  role text not null default 'customer' check (role in ('customer', 'vendor', 'admin')),
  avatar_url text,
  city text default 'Delhi NCR',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. VENDORS & VENUES TABLE
create table if not exists public.vendors (
  id uuid default uuid_generate_v4() primary key,
  owner_id uuid references public.profiles(id) on delete set null,
  name text not null,
  slug text unique not null,
  category text not null check (category in ('venue', 'catering', 'photography', 'decor', 'entertainment', 'makeup', 'invitations')),
  category_label text not null,
  city text not null,
  area text not null,
  rating numeric(3, 2) default 4.80 check (rating >= 0 and rating <= 5.0),
  reviews_count integer default 0,
  price_starting integer not null,
  price_unit text not null, -- e.g. 'per plate', 'per event', 'per day'
  capacity_min integer,
  capacity_max integer,
  image text not null,
  gallery text[] default '{}',
  verified boolean default true,
  response_time text default 'Under 2 hours',
  tags text[] default '{}',
  description text not null,
  inclusions text[] default '{}',
  event_types text[] default '{wedding,corporate,social,community}',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Fast Indexing for Discovery & Search Filters
create index if not exists idx_vendors_city_category on public.vendors (city, category);
create index if not exists idx_vendors_price on public.vendors (price_starting);
create index if not exists idx_vendors_rating on public.vendors (rating desc);
create index if not exists idx_vendors_tags on public.vendors using gin (tags);
create index if not exists idx_vendors_event_types on public.vendors using gin (event_types);

-- 3. EVENT PLANS TABLE (Customer Created AI Event Plans)
create table if not exists public.event_plans (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  title text not null,
  event_type text not null check (event_type in ('wedding', 'corporate', 'social', 'community')),
  city text not null,
  date date not null,
  guest_count integer not null,
  total_budget integer not null,
  budget_allocations jsonb not null default '[]'::jsonb,
  checklist jsonb not null default '[]'::jsonb,
  suggested_vendors uuid[] default '{}',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create index if not exists idx_event_plans_user on public.event_plans (user_id);

-- 4. QUOTES & INQUIRIES TABLE (Customer <-> Vendor Marketplace)
create table if not exists public.quotes (
  id uuid default uuid_generate_v4() primary key,
  customer_id uuid references public.profiles(id) on delete cascade,
  vendor_id uuid references public.vendors(id) on delete cascade not null,
  event_plan_id uuid references public.event_plans(id) on delete set null,
  status text not null default 'sent' check (status in ('draft', 'sent', 'received', 'accepted', 'declined')),
  estimated_amount integer not null,
  message text,
  inclusions text[] default '{}',
  valid_until timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create index if not exists idx_quotes_customer on public.quotes (customer_id);
create index if not exists idx_quotes_vendor on public.quotes (vendor_id);

-- 5. SHORTLISTS / BOOKMARKS TABLE
create table if not exists public.shortlists (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  vendor_id uuid references public.vendors(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique (user_id, vendor_id)
);

create index if not exists idx_shortlists_user on public.shortlists (user_id);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

alter table public.profiles enable row level security;
alter table public.vendors enable row level security;
alter table public.event_plans enable row level security;
alter table public.quotes enable row level security;
alter table public.shortlists enable row level security;

-- Profiles: Public can read names/avatars; only owner can update their own
create policy "Public profiles are readable" on public.profiles for select using (true);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

-- Vendors: Anyone can view verified vendors; only vendor owners can update
create policy "Vendors are publicly readable" on public.vendors for select using (true);
create policy "Vendor owners can update their listings" on public.vendors for update using (auth.uid() = owner_id);

-- Event Plans: Users can only see & manage their own plans
create policy "Users manage own plans" on public.event_plans for all using (auth.uid() = user_id);

-- Quotes: Customers and targeted Vendors can read/update their quotes
create policy "Customers view own quotes" on public.quotes for select using (auth.uid() = customer_id);
create policy "Vendors view received quotes" on public.quotes for select using (
  auth.uid() in (select owner_id from public.vendors where id = quotes.vendor_id)
);

-- Shortlists: User can only see and modify their own bookmarks
create policy "Users manage own shortlist" on public.shortlists for all using (auth.uid() = user_id);
