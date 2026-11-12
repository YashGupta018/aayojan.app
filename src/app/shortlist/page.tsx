'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/context';
import { MOCK_VENDORS } from '@/lib/data';
import VendorCard from '@/components/VendorCard';
import { Heart, ArrowRight } from 'lucide-react';

export default function ShortlistPage() {
  const { shortlist } = useApp();
  const shortlistedVendors = MOCK_VENDORS.filter(v => shortlist.includes(v.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7A1F2B] uppercase tracking-wider mb-1">
            <Heart className="w-3.5 h-3.5 fill-[#7A1F2B]" /> Your Saved Shortlist
          </div>
          <h1 className="font-serif text-3xl font-bold text-[#1F2023]">
            Shortlisted Venues &amp; Vendors ({shortlistedVendors.length})
          </h1>
          <p className="text-xs sm:text-sm text-[#6F6A62] mt-1">
            Compare packages and request quotes in one tap directly into your event workspace.
          </p>
        </div>

        <Link
          href="/explore"
          className="bg-white border border-[#E7E1D8] hover:border-[#E08A2C] text-[#1F2023] hover:text-[#E08A2C] text-xs font-semibold px-4 py-2 rounded-full shadow-sm transition-all flex items-center gap-1.5 self-start sm:self-auto"
        >
          <span>Discover More</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {shortlistedVendors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {shortlistedVendors.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-[#E7E1D8] p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="font-serif font-bold text-xl text-[#1F2023]">Your Shortlist is Empty</h3>
          <p className="text-sm text-[#6F6A62] max-w-sm mx-auto">
            Click the heart icon on any venue or vendor card to save and compare them here anytime.
          </p>
          <Link
            href="/explore"
            className="inline-block bg-[#E08A2C] text-white text-xs font-bold px-6 py-2.5 rounded-full shadow hover:bg-[#C9751D] transition-colors"
          >
            Explore Verified Vendors
          </Link>
        </div>
      )}
    </div>
  );
}
