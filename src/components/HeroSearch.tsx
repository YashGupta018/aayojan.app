'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/context';
import { CITIES, EVENT_TYPES } from '@/lib/data';
import { Search, MapPin, Users, Sparkles, Calendar } from 'lucide-react';

export default function HeroSearch() {
  const router = useRouter();
  const { selectedCity, setSelectedCity, setSearchQuery } = useApp();
  const [selectedType, setSelectedType] = useState('wedding');
  const [guestCount, setGuestCount] = useState('150-300');
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(query);
    router.push(`/explore?type=${selectedType}&city=${encodeURIComponent(selectedCity)}&q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="relative pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden">
      {/* Background festive warm ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-[#E08A2C]/10 via-[#7A1F2B]/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
        {/* Subtle pill tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E7E1D8] shadow-sm text-xs font-semibold text-[#7A1F2B]">
          <span className="w-2 h-2 rounded-full bg-[#E08A2C] animate-pulse" />
          <span>Intelligent Planning &amp; Verified Vendor Marketplace</span>
        </div>

        {/* Hero headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-[#1F2023] tracking-tight leading-[1.15]">
          Your Event, Planned with Ease.{' '}
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#E08A2C] via-[#7A1F2B] to-[#12665A]">
            All in One Trusted Workspace.
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#6F6A62] leading-relaxed">
          From weddings and milestone birthdays to corporate offsites. Tell us what you envision, get an instant budget and checklist, and book verified vendors with guaranteed quotes.
        </p>

        {/* WedMeGood-inspired intuitive quick search card */}
        <div className="bg-white p-3 sm:p-4 rounded-3xl shadow-xl border border-[#E7E1D8] max-w-4xl mx-auto text-left mt-6">
          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Event Type selector */}
            <div className="p-3 bg-[#FAF7F2] rounded-2xl border border-stone-200/80 hover:border-[#E08A2C] transition-colors">
              <label className="text-[11px] font-bold text-[#6F6A62] uppercase tracking-wider block mb-1 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#E08A2C]" /> Event Type
              </label>
              <select
                aria-label="Event Type"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full bg-transparent font-medium text-sm text-[#1F2023] focus:outline-none cursor-pointer"
              >
                {EVENT_TYPES.map(type => (
                  <option key={type.id} value={type.id}>{type.label}</option>
                ))}
              </select>
            </div>

            {/* City selector */}
            <div className="p-3 bg-[#FAF7F2] rounded-2xl border border-stone-200/80 hover:border-[#E08A2C] transition-colors">
              <label className="text-[11px] font-bold text-[#6F6A62] uppercase tracking-wider block mb-1 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#E08A2C]" /> Location / City
              </label>
              <select
                aria-label="Location City"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full bg-transparent font-medium text-sm text-[#1F2023] focus:outline-none cursor-pointer"
              >
                {CITIES.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            {/* Guest count */}
            <div className="p-3 bg-[#FAF7F2] rounded-2xl border border-stone-200/80 hover:border-[#E08A2C] transition-colors">
              <label className="text-[11px] font-bold text-[#6F6A62] uppercase tracking-wider block mb-1 flex items-center gap-1">
                <Users className="w-3 h-3 text-[#E08A2C]" /> Expected Guests
              </label>
              <select
                aria-label="Expected Guests"
                value={guestCount}
                onChange={(e) => setGuestCount(e.target.value)}
                className="w-full bg-transparent font-medium text-sm text-[#1F2023] focus:outline-none cursor-pointer"
              >
                <option value="50-100">50 - 100 Guests (Intimate)</option>
                <option value="150-300">150 - 300 Guests (Medium)</option>
                <option value="300-600">300 - 600 Guests (Grand)</option>
                <option value="600+">600+ Guests (Royal / Mega)</option>
              </select>
            </div>

            {/* Search Button */}
            <div className="flex items-center">
              <button
                type="submit"
                className="w-full h-full min-h-[52px] bg-[#E08A2C] hover:bg-[#C9751D] text-white font-bold text-sm rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Search Verified Options</span>
              </button>
            </div>
          </form>

          {/* Quick search tags */}
          <div className="mt-3 pt-3 border-t border-[#E7E1D8] flex flex-wrap items-center gap-2 text-xs text-[#6F6A62]">
            <span className="font-semibold text-stone-700">Popular Searches:</span>
            {[
              'Banquet Halls with Lawns',
              'Candid Photographers',
              'Pure Veg Caterers',
              'Floral Mandap Decor',
              'Budget Offsite Venues'
            ].map((term, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setQuery(term);
                  router.push(`/explore?q=${encodeURIComponent(term)}`);
                }}
                className="bg-stone-100 hover:bg-[#E08A2C]/10 hover:text-[#E08A2C] px-2.5 py-1 rounded-full transition-colors text-[11px]"
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        {/* AI Planner Banner */}
        <div className="max-w-4xl mx-auto pt-4">
          <div className="bg-gradient-to-r from-[#7A1F2B] via-[#8E2837] to-[#12665A] text-white p-4 sm:p-5 rounded-2xl shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/20">
                <Sparkles className="w-6 h-6 text-[#FAF7F2]" />
              </div>
              <div>
                <h2 className="font-serif font-bold text-base sm:text-lg">Confused where to start or how to divide your budget?</h2>
                <p className="text-white/80 text-xs sm:text-sm">
                  Our Indian Event Copilot calculates budget splits, checklists &amp; vendor recommendations in 60 seconds.
                </p>
              </div>
            </div>
            <button
              onClick={() => router.push('/planner')}
              className="bg-white text-[#7A1F2B] hover:bg-stone-100 font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full shadow transition-all shrink-0 cursor-pointer"
            >
              Try AI Planner Free →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
