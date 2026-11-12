'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useApp } from '@/lib/context';
import { CITIES, Vendor } from '@/lib/data';
import { getVendors } from '@/lib/api';
import VendorCard from '@/components/VendorCard';
import { 
  Search, 
  MapPin, 
  ShieldCheck, 
  X 
} from 'lucide-react';

function ExploreContent() {
  const searchParams = useSearchParams();
  const initialType = searchParams.get('type') || '';
  const initialCategory = searchParams.get('category') || '';
  const initialCity = searchParams.get('city') || '';
  const initialQuery = searchParams.get('q') || '';

  const { selectedCity, setSelectedCity } = useApp();

  const [categoryFilter, setCategoryFilter] = useState<string>(initialCategory || 'all');
  const [eventTypeFilter, setEventTypeFilter] = useState<string>(initialType || 'all');
  const [activeCity, setActiveCity] = useState<string>(initialCity || selectedCity || 'All India');
  const [searchTerm, setSearchTerm] = useState<string>(initialQuery || '');
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);
  const [dbVendors, setDbVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const data = await getVendors();
        setDbVendors(data);
      } catch (err) {
        console.error('Failed to load explore vendors', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'venue', label: 'Venues & Banquets' },
    { id: 'catering', label: 'Catering & Food' },
    { id: 'decor', label: 'Decor & Floral' },
    { id: 'photography', label: 'Photography' },
    { id: 'entertainment', label: 'DJs & Music' },
    { id: 'makeup', label: 'Bridal Makeup' }
  ];

  const filteredVendors = useMemo(() => {
    return dbVendors.filter(v => {
      if (categoryFilter !== 'all' && v.category !== categoryFilter) {
        return false;
      }
      if (eventTypeFilter !== 'all' && !v.eventTypes.includes(eventTypeFilter as any)) {
        return false;
      }
      if (activeCity !== 'All India' && v.city !== activeCity) {
        return false;
      }
      if (verifiedOnly && !v.verified) {
        return false;
      }
      if (searchTerm.trim() !== '') {
        const query = searchTerm.toLowerCase();
        const matchesName = v.name.toLowerCase().includes(query);
        const matchesArea = v.area.toLowerCase().includes(query);
        const matchesDesc = v.description.toLowerCase().includes(query);
        const matchesTags = v.tags.some(t => t.toLowerCase().includes(query));
        if (!matchesName && !matchesArea && !matchesDesc && !matchesTags) {
          return false;
        }
      }
      return true;
    });
  }, [categoryFilter, eventTypeFilter, activeCity, searchTerm, verifiedOnly]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
      {/* Top Search & Filter Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl border border-[#E7E1D8] shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Main search text */}
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by vendor name, locality (e.g. Chattarpur), or style..."
              className="w-full bg-[#FAF7F2] border border-[#E7E1D8] rounded-2xl pl-12 pr-4 py-3 text-sm text-[#1F2023] focus:outline-none focus:border-[#E08A2C]"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* City select */}
          <div className="flex items-center gap-2 bg-[#FAF7F2] border border-[#E7E1D8] rounded-2xl px-4 py-2.5">
            <MapPin className="w-4 h-4 text-[#E08A2C] shrink-0" />
            <select
              aria-label="City Filter"
              value={activeCity}
              onChange={(e) => {
                setActiveCity(e.target.value);
                setSelectedCity(e.target.value);
              }}
              className="bg-transparent text-sm font-semibold text-[#1F2023] focus:outline-none cursor-pointer"
            >
              {CITIES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Verified toggle */}
          <button
            type="button"
            onClick={() => setVerifiedOnly(!verifiedOnly)}
            className={`flex items-center gap-2 px-4 py-3 rounded-2xl border text-xs font-bold transition-colors cursor-pointer ${
              verifiedOnly
                ? 'bg-[#12665A] text-white border-[#12665A]'
                : 'bg-[#FAF7F2] text-stone-700 border-[#E7E1D8] hover:border-stone-400'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Verified Only</span>
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-2 border-t border-[#E7E1D8]">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setCategoryFilter(c.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                categoryFilter === c.id
                  ? 'bg-[#1F2023] text-white shadow'
                  : 'bg-[#FAF7F2] text-[#6F6A62] hover:bg-stone-200/60 border border-[#E7E1D8]'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F2023]">
            {categoryFilter === 'all' ? 'All Verified Venues & Vendors' : categories.find(c => c.id === categoryFilter)?.label}
          </h1>
          <p className="text-xs sm:text-sm text-[#6F6A62] mt-1">
            Showing {filteredVendors.length} options in <span className="font-semibold text-stone-800">{activeCity}</span>
          </p>
        </div>

        {/* Quick event type filter badge */}
        <div className="hidden sm:flex items-center gap-2 text-xs">
          <span className="text-[#6F6A62]">Filter by Occasion:</span>
          {['all', 'wedding', 'corporate', 'social'].map(t => (
            <button
              key={t}
              onClick={() => setEventTypeFilter(t)}
              className={`px-2.5 py-1 rounded-md uppercase font-bold text-[10px] transition-colors cursor-pointer ${
                eventTypeFilter === t
                  ? 'bg-[#E08A2C] text-white'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Vendors Grid */}
      {filteredVendors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredVendors.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-[#E7E1D8] p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="font-serif font-bold text-xl text-[#1F2023]">
            No vendors matching this criteria yet
          </h3>
          <p className="text-sm text-[#6F6A62] max-w-md mx-auto">
            Try switching the city to &quot;Delhi NCR&quot; or clearing your search keywords.
          </p>
          <button
            onClick={() => {
              setCategoryFilter('all');
              setEventTypeFilter('all');
              setActiveCity('All India');
              setSearchTerm('');
              setVerifiedOnly(false);
            }}
            className="bg-[#E08A2C] text-white text-xs font-bold px-6 py-2.5 rounded-full shadow hover:bg-[#C9751D] transition-colors cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-stone-500">
        Loading directory...
      </div>
    }>
      <ExploreContent />
    </Suspense>
  );
}
