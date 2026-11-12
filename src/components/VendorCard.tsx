'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Vendor } from '@/lib/data';
import { useApp } from '@/lib/context';
import { Star, ShieldCheck, Heart, Clock, Users, ArrowUpRight, Check } from 'lucide-react';

export default function VendorCard({ vendor }: { vendor: Vendor }) {
  const { shortlist, toggleShortlist, quotes, requestQuote } = useApp();
  const isShortlisted = shortlist.includes(vendor.id);
  const existingQuote = quotes.find(q => q.vendorId === vendor.id);

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E7E1D8] overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group">
      {/* Image container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
        <Image
          src={vendor.image}
          alt={vendor.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Category tag */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-1 rounded-full border border-white/20">
          <span>{vendor.categoryLabel}</span>
        </div>

        {/* Shortlist button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleShortlist(vendor.id);
          }}
          aria-label={isShortlisted ? 'Remove from shortlist' : 'Add to shortlist'}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 hover:bg-white backdrop-blur-sm flex items-center justify-center transition-transform hover:scale-110 shadow-sm"
        >
          <Heart
            className={`w-4 h-4 ${isShortlisted ? 'text-[#7A1F2B] fill-[#7A1F2B]' : 'text-stone-700'}`}
          />
        </button>

        {/* Location & Quick meta in photo bottom */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
          <span className="truncate drop-shadow-sm font-medium">{vendor.area}, {vendor.city}</span>
          <div className="flex items-center gap-1 bg-[#12665A] text-white px-2 py-0.5 rounded-md font-semibold text-xs shrink-0 shadow">
            <Star className="w-3 h-3 fill-white" />
            <span>{vendor.rating.toFixed(1)}</span>
            <span className="text-[10px] opacity-80">({vendor.reviewsCount})</span>
          </div>
        </div>
      </div>

      {/* Body content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-serif font-bold text-lg text-[#1F2023] group-hover:text-[#E08A2C] transition-colors leading-snug">
              {vendor.name}
            </h3>
            {vendor.verified && (
              <span className="inline-flex items-center gap-0.5 text-[#12665A] bg-[#12665A]/10 text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0">
                <ShieldCheck className="w-3 h-3" /> Verified
              </span>
            )}
          </div>

          <p className="text-xs text-[#6F6A62] mt-1.5 line-clamp-2 leading-relaxed">
            {vendor.description}
          </p>

          {/* Key tags */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {vendor.tags.slice(0, 3).map((tag, i) => (
              <span key={i} className="text-[11px] bg-[#FAF7F2] text-stone-700 border border-[#E7E1D8] px-2 py-0.5 rounded-md font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Inclusions & Highlights */}
        <div className="border-t border-[#E7E1D8] pt-3 text-xs space-y-1.5">
          <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">Includes:</div>
          <div className="grid grid-cols-2 gap-1 text-[#1F2023]">
            {vendor.inclusions.slice(0, 2).map((inc, idx) => (
              <div key={idx} className="flex items-center gap-1 text-[11px] truncate">
                <Check className="w-3 h-3 text-[#12665A] shrink-0" />
                <span className="truncate">{inc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing, Capacity and Quick Action */}
        <div className="border-t border-[#E7E1D8] pt-3 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-[#6F6A62] block font-medium">Indicative Price</span>
            <div className="text-base font-bold text-[#1F2023] leading-tight">
              {formatPrice(vendor.priceStarting)}
              <span className="text-xs font-normal text-[#6F6A62]"> /{vendor.priceUnit}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {existingQuote ? (
              <Link
                href="/workspace"
                className="bg-[#12665A]/10 text-[#12665A] hover:bg-[#12665A]/20 text-xs font-semibold px-3 py-2 rounded-xl transition-colors flex items-center gap-1"
              >
                <span>Quote Active</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            ) : (
              <button
                onClick={() => requestQuote(vendor.id)}
                className="bg-[#E08A2C] hover:bg-[#C9751D] text-white text-xs font-semibold px-3.5 py-2 rounded-xl transition-all shadow-sm hover:shadow flex items-center gap-1"
              >
                <span>Get Quote</span>
              </button>
            )}
          </div>
        </div>

        {/* Response time & Capacity footer pill */}
        <div className="flex items-center justify-between text-[11px] text-[#6F6A62] bg-[#FAF7F2] -mx-4 -mb-4 sm:-mx-5 sm:-mb-5 px-4 py-2 border-t border-[#E7E1D8]">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-[#E08A2C]" /> Replies in {vendor.responseTime}
          </span>
          {vendor.capacity && (
            <span className="flex items-center gap-1 font-medium">
              <Users className="w-3 h-3" /> {vendor.capacity.min} - {vendor.capacity.max} guests
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
