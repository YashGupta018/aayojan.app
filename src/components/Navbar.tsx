'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/context';
import { CITIES } from '@/lib/data';
import { MapPin, Sparkles, Heart, ClipboardList, Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Navbar() {
  const { selectedCity, setSelectedCity, shortlist, quotes } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E7E1D8] transition-all">
      {/* Top Banner with trust highlight */}
      <div className="bg-[#1F2023] text-stone-200 text-xs py-1.5 px-4 text-center flex items-center justify-center gap-2 font-medium">
        <span className="inline-flex items-center gap-1 text-[#E08A2C]">
          <ShieldCheck className="w-3.5 h-3.5" /> India&apos;s Verified Event Planning Platform
        </span>
        <span className="hidden sm:inline text-stone-500">•</span>
        <span className="hidden sm:inline text-stone-300">Compare standardized vendor quotes &amp; pay with milestone protection</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E08A2C] to-[#7A1F2B] flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
                आ
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-[#1F2023] flex items-center gap-1">
                  Ayojan<span className="text-[#E08A2C] text-sm font-sans tracking-normal">.app</span>
                </span>
                <span className="block text-[10px] text-[#6F6A62] -mt-1 font-medium tracking-wider uppercase">Event Planning OS</span>
              </div>
            </Link>

            {/* City Selector */}
            <div className="hidden md:flex items-center gap-1.5 bg-white border border-[#E7E1D8] rounded-full px-3 py-1.5 shadow-sm text-sm">
              <MapPin className="w-3.5 h-3.5 text-[#E08A2C]" />
              <select
                aria-label="Select City"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="bg-transparent border-none text-[#1F2023] font-medium text-xs focus:outline-none cursor-pointer pr-1"
              >
                {CITIES.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#1F2023]">
            <Link href="/planner" className="flex items-center gap-1.5 text-[#7A1F2B] hover:text-[#E08A2C] transition-colors py-1">
              <Sparkles className="w-4 h-4 text-[#E08A2C]" />
              <span>AI Event Planner</span>
              <span className="bg-[#E08A2C]/15 text-[#E08A2C] text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase">Instant</span>
            </Link>
            <Link href="/explore" className="hover:text-[#E08A2C] transition-colors">
              Find Venues &amp; Vendors
            </Link>
            <Link href="/workspace" className="flex items-center gap-1.5 hover:text-[#E08A2C] transition-colors">
              <ClipboardList className="w-4 h-4 text-[#6F6A62]" />
              <span>My Event Plan</span>
              {quotes.length > 0 && (
                <span className="bg-[#12665A] text-white text-[11px] font-semibold px-1.5 rounded-full">
                  {quotes.length}
                </span>
              )}
            </Link>
            <Link href="/shortlist" className="flex items-center gap-1.5 hover:text-[#E08A2C] transition-colors">
              <Heart className={`w-4 h-4 ${shortlist.length > 0 ? 'text-[#7A1F2B] fill-[#7A1F2B]' : 'text-[#6F6A62]'}`} />
              <span>Shortlist ({shortlist.length})</span>
            </Link>
          </nav>

          {/* Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/vendor-portal"
              className="text-xs font-semibold text-[#6F6A62] hover:text-[#1F2023] px-3 py-2 transition-colors"
            >
              For Vendors
            </Link>
            <Link
              href="/planner"
              className="bg-[#E08A2C] hover:bg-[#C9751D] text-white text-sm font-semibold px-4 py-2.5 rounded-full shadow-sm hover:shadow transition-all flex items-center gap-1.5"
            >
              <span>Plan My Event</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              href="/planner"
              className="bg-[#E08A2C] text-white text-xs font-semibold px-3 py-1.5 rounded-full"
            >
              Plan Event
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#1F2023] hover:bg-stone-200/50 rounded-lg transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E7E1D8] bg-[#FAF7F2] px-4 pt-3 pb-6 space-y-3">
          <div className="flex items-center justify-between p-2 bg-white rounded-lg border border-[#E7E1D8]">
            <span className="text-xs text-[#6F6A62] font-medium">Selected City:</span>
            <select
              aria-label="Select City Mobile"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="bg-transparent text-sm font-semibold text-[#1F2023] focus:outline-none"
            >
              {CITIES.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col space-y-2 pt-2 text-sm font-medium">
            <Link
              href="/planner"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-[#E08A2C]/30 text-[#7A1F2B]"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#E08A2C]" /> AI Event Planner (Free)
              </span>
              <span className="text-xs bg-[#E08A2C] text-white px-2 py-0.5 rounded-full">Start</span>
            </Link>
            <Link
              href="/explore"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 text-[#1F2023] hover:bg-stone-100 rounded-lg"
            >
              Find Venues &amp; Vendors
            </Link>
            <Link
              href="/workspace"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 text-[#1F2023] hover:bg-stone-100 rounded-lg flex items-center justify-between"
            >
              <span>My Event Plan &amp; Quotes</span>
              <span className="bg-[#12665A] text-white text-xs px-2 py-0.5 rounded-full">{quotes.length}</span>
            </Link>
            <Link
              href="/shortlist"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 text-[#1F2023] hover:bg-stone-100 rounded-lg flex items-center justify-between"
            >
              <span>Saved Shortlist</span>
              <span className="bg-stone-200 text-stone-800 text-xs px-2 py-0.5 rounded-full">{shortlist.length}</span>
            </Link>
            <Link
              href="/vendor-portal"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 text-[#6F6A62] hover:bg-stone-100 rounded-lg"
            >
              Join as a Partner Vendor
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
