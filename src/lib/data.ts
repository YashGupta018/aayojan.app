export interface Vendor {
  id: string;
  name: string;
  category: 'venue' | 'catering' | 'photography' | 'decor' | 'entertainment' | 'makeup' | 'invitations';
  categoryLabel: string;
  city: string;
  area: string;
  rating: number;
  reviewsCount: number;
  priceStarting: number;
  priceUnit: string;
  capacity?: { min: number; max: number };
  image: string;
  verified: boolean;
  responseTime: string;
  tags: string[];
  description: string;
  inclusions: string[];
  eventTypes: ('wedding' | 'corporate' | 'social' | 'community')[];
}

export interface QuoteItem {
  id: string;
  vendorId: string;
  vendorName: string;
  category: string;
  status: 'draft' | 'sent' | 'received' | 'accepted' | 'declined';
  estimatedAmount: number;
  dateSent: string;
  validUntil: string;
  inclusions: string[];
}

export interface EventPlan {
  id: string;
  title: string;
  eventType: 'wedding' | 'corporate' | 'social' | 'community';
  city: string;
  date: string;
  guestCount: number;
  totalBudget: number;
  budgetAllocations: {
    category: string;
    percentage: number;
    recommendedMin: number;
    recommendedMax: number;
    notes: string;
  }[];
  checklist: {
    id: string;
    task: string;
    timeline: string;
    completed: boolean;
    category: string;
  }[];
  suggestedVendors: string[]; // vendor IDs
}

export const CITIES = [
  'All India',
  'Delhi NCR',
  'Mumbai',
  'Bengaluru',
  'Hyderabad',
  'Jaipur',
  'Pune',
  'Kolkata',
  'Chennai',
  'Ahmedabad',
  'Goa',
  'Chandigarh',
  'Lucknow'
];

export const EVENT_TYPES = [
  { id: 'wedding', label: 'Weddings & Engagements', icon: 'Sparkles', color: '#7A1F2B', description: 'Mehendi, Sangeet, Shaadi & Receptions' },
  { id: 'corporate', label: 'Corporate Events & Offsites', icon: 'Briefcase', color: '#12665A', description: 'Conferences, Gala Dinners, Annual Days & Offsites' },
  { id: 'social', label: 'Birthdays & Social Parties', icon: 'PartyPopper', color: '#E08A2C', description: 'Milestone birthdays, Anniversaries, Baby Showers' },
  { id: 'community', label: 'Kitty Parties & Community', icon: 'Users', color: '#883997', description: 'Family gatherings, Cultural meetups, Festive pujas' }
];

export const MOCK_VENDORS: Vendor[] = [
  {
    id: 'v1',
    name: 'The Grand Heritage Palace & Lawns',
    category: 'venue',
    categoryLabel: '4 & 5-Star Venues',
    city: 'Delhi NCR',
    area: 'Chattarpur / MG Road',
    rating: 4.9,
    reviewsCount: 148,
    priceStarting: 1800,
    priceUnit: 'per plate',
    capacity: { min: 200, max: 1500 },
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80',
    verified: true,
    responseTime: '< 1 hour',
    tags: ['Luxury Lawn', 'Valet Parking', 'Air-Conditioned Banquet', 'Bridal Suites'],
    description: 'Expansive lush green lawns paired with majestic regal architecture. Perfect for big fat Indian weddings and grand corporate summits.',
    inclusions: ['Lawn + Banquet access', 'Valet parking (250 cars)', 'Bridal dressing rooms', 'Generator backup & basic lighting'],
    eventTypes: ['wedding', 'corporate']
  },
  {
    id: 'v2',
    name: 'Aura Bloom & Royal Decorators',
    category: 'decor',
    categoryLabel: 'Decor & Floral Styling',
    city: 'Delhi NCR',
    area: 'South Delhi & Gurugram',
    rating: 4.8,
    reviewsCount: 96,
    priceStarting: 125000,
    priceUnit: 'per event',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80',
    verified: true,
    responseTime: '< 2 hours',
    tags: ['Eco-friendly Florals', 'Traditional Marigold Mandap', 'Modern Pastel Themes'],
    description: 'Renowned for handcrafted traditional florals, fairy lights canopies, and contemporary bespoke stage designs.',
    inclusions: ['Entrance arch & passage', 'Mandap/Stage backdrop', 'Table centerpieces (20 tables)', 'Ambient warm lighting'],
    eventTypes: ['wedding', 'social']
  },
  {
    id: 'v3',
    name: 'Rasoi Royale Gourmet Catering',
    category: 'catering',
    categoryLabel: 'Catering & Food Craft',
    city: 'Delhi NCR',
    area: 'Delhi NCR & Pan-India',
    rating: 4.9,
    reviewsCount: 210,
    priceStarting: 1450,
    priceUnit: 'per plate',
    capacity: { min: 50, max: 2000 },
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
    verified: true,
    responseTime: '< 30 mins',
    tags: ['Live Chaat Counters', 'Pure Veg / Jain Available', 'Multi-Cuisine Experts'],
    description: 'Culinary mastery offering North Indian delicacies, authentic regional live stalls, and global dessert spreads.',
    inclusions: ['5 Welcome drinks', '8 Live Starters', 'Full Main Course (Indian & Continental)', '4 Signature Desserts'],
    eventTypes: ['wedding', 'corporate', 'social', 'community']
  },
  {
    id: 'v4',
    name: 'Drishti Stories Photography & Films',
    category: 'photography',
    categoryLabel: 'Photography & Cinema',
    city: 'Delhi NCR',
    area: 'Greater Kailash / Travels Worldwide',
    rating: 4.9,
    reviewsCount: 114,
    priceStarting: 75000,
    priceUnit: 'per day',
    image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80',
    verified: true,
    responseTime: '< 3 hours',
    tags: ['Candid Photography', '4K Cinematic Teaser', 'Drone Coverage'],
    description: 'Capturing candid raw emotions, heartfelt glances, and timeless heirloom photo albums with cinematic storytelling.',
    inclusions: ['2 Candid Photographers', '1 Traditional Photographer', '1 Cinematographer', 'Full HD Video + Raw Photos drive'],
    eventTypes: ['wedding', 'social']
  },
  {
    id: 'v5',
    name: 'Skyline Business Convention & Rooftop',
    category: 'venue',
    categoryLabel: 'Corporate & Conference Venues',
    city: 'Bengaluru',
    area: 'Whitefield / Outer Ring Road',
    rating: 4.7,
    reviewsCount: 82,
    priceStarting: 1600,
    priceUnit: 'per delegate',
    capacity: { min: 50, max: 500 },
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80',
    verified: true,
    responseTime: '< 1 hour',
    tags: ['High-speed Wi-Fi', 'Audio-Visual LED Wall', 'Breakout Lounges'],
    description: 'Modern tech-ready auditorium and breakout suites designed for corporate town halls, launches, and executive retreats.',
    inclusions: ['4K Projector & Screens', 'Podium mic & collar mics', 'Stationery & high-speed Wi-Fi', 'All-day tea/coffee & buffet lunch'],
    eventTypes: ['corporate']
  },
  {
    id: 'v6',
    name: 'Celebration Garden Banquet',
    category: 'venue',
    categoryLabel: 'Banquet & Party Halls',
    city: 'Delhi NCR',
    area: 'Rohini & Pitampura',
    rating: 4.6,
    reviewsCount: 65,
    priceStarting: 950,
    priceUnit: 'per plate',
    capacity: { min: 40, max: 350 },
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80',
    verified: true,
    responseTime: '< 1 hour',
    tags: ['Pocket Friendly', 'Theme Lighting', 'DJ Sound Setup'],
    description: 'Cozy and hassle-free venue tailored for vibrant birthday bashes, anniversary milestones, and intimate sangeet nights.',
    inclusions: ['Hall rental for 5 hours', 'DJ sound console', 'Basic balloon / floral stage', 'Buffet dining setup'],
    eventTypes: ['social', 'community']
  },
  {
    id: 'v7',
    name: 'Rhythm Waves DJ & Live Band',
    category: 'entertainment',
    categoryLabel: 'Live Music & DJs',
    city: 'Delhi NCR',
    area: 'NCR & Pan India',
    rating: 4.8,
    reviewsCount: 52,
    priceStarting: 40000,
    priceUnit: 'per gig',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
    verified: true,
    responseTime: '< 2 hours',
    tags: ['Punjabi Dhol Beats', 'Bollywood Retro to EDM', 'Celebrity Anchor'],
    description: 'High-voltage entertainment packages featuring professional DJs, live percussionists, and crowd-engaging event hosts.',
    inclusions: ['Professional DJ setup', 'Sound system up to 400 pax', 'Intelligent moving head lights', '1 Live Dhol player for 2 hours'],
    eventTypes: ['wedding', 'social', 'corporate']
  },
  {
    id: 'v8',
    name: 'Shringaar Bridal & Party Makeovers',
    category: 'makeup',
    categoryLabel: 'Bridal & Party Makeup',
    city: 'Delhi NCR',
    area: 'South Ex & Doorstep Service',
    rating: 4.9,
    reviewsCount: 78,
    priceStarting: 18000,
    priceUnit: 'per makeover',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80',
    verified: true,
    responseTime: '< 1 hour',
    tags: ['HD & Airbrush Makeup', 'Hair Styling & Draping', 'Luxury Brands Only'],
    description: 'Certified artists providing radiant, natural, long-lasting bridal and family party looks with premium international cosmetics.',
    inclusions: ['HD / Airbrush Makeup', 'Designer hair styling', 'Saree / lehenga draping', 'False lashes & touchup kit'],
    eventTypes: ['wedding', 'social']
  }
];
