'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import HeroSearch from '@/components/HeroSearch';
import VendorCard from '@/components/VendorCard';
import { EVENT_TYPES, Vendor } from '@/lib/data';
import { getVendors } from '@/lib/api';
import { 
  Sparkles, 
  ShieldCheck, 
  Receipt, 
  MessageSquare, 
  CheckCircle, 
  ArrowRight, 
  Building2, 
  UtensilsCrossed, 
  Camera, 
  Palette, 
  Music, 
  Users 
} from 'lucide-react';

export default function HomePage() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFeaturedVendors() {
      try {
        const data = await getVendors({ limit: 4 });
        setVendors(data);
      } catch (err) {
        console.error('Failed to load vendors', err);
      } finally {
        setLoading(false);
      }
    }
    loadFeaturedVendors();
  }, []);
  const categories = [
    { name: 'Venues & Lawns', icon: Building2, count: '1,200+ listed', link: '/explore?category=venue' },
    { name: 'Catering & Food Craft', icon: UtensilsCrossed, count: '850+ listed', link: '/explore?category=catering' },
    { name: 'Photography & Cinema', icon: Camera, count: '640+ listed', link: '/explore?category=photography' },
    { name: 'Floral & Mandap Decor', icon: Palette, count: '520+ listed', link: '/explore?category=decor' },
    { name: 'DJs & Live Performers', icon: Music, count: '310+ listed', link: '/explore?category=entertainment' },
    { name: 'Event Coordination', icon: Users, count: '290+ listed', link: '/explore?category=coordination' },
  ];

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section with Quick Search */}
      <HeroSearch />

      {/* Popular Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold text-[#E08A2C] uppercase tracking-wider block mb-1">
              Explore by Service
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F2023]">
              Find Everything for Your Celebration
            </h2>
          </div>
          <Link
            href="/explore"
            className="text-sm font-semibold text-[#7A1F2B] hover:text-[#E08A2C] flex items-center gap-1 transition-colors"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <Link
                key={idx}
                href={cat.link}
                className="bg-white p-5 rounded-2xl border border-[#E7E1D8] hover:border-[#E08A2C] hover:shadow-lg transition-all group flex flex-col items-center text-center space-y-3"
              >
                <div className="w-12 h-12 rounded-xl bg-[#FAF7F2] group-hover:bg-[#E08A2C]/10 flex items-center justify-center transition-colors">
                  <Icon className="w-6 h-6 text-[#1F2023] group-hover:text-[#E08A2C] transition-colors" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#1F2023] group-hover:text-[#E08A2C] transition-colors">
                    {cat.name}
                  </h3>
                  <span className="text-[11px] text-[#6F6A62] block mt-0.5">{cat.count}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Venues & Vendors Carousel/Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#12665A] uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4" /> Trusted &amp; Background Checked
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F2023]">
              Featured Venues &amp; Top Rated Partners
            </h2>
            <p className="text-xs sm:text-sm text-[#6F6A62] mt-1">
              Transparent packages, real client reviews, and direct quote requests.
            </p>
          </div>
          <Link
            href="/explore"
            className="self-start sm:self-auto bg-white border border-[#E7E1D8] hover:border-[#E08A2C] text-[#1F2023] hover:text-[#E08A2C] text-xs font-semibold px-4 py-2 rounded-full shadow-sm transition-all flex items-center gap-1.5"
          >
            <span>See All Vendors</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="animate-pulse bg-white border border-[#E7E1D8] rounded-2xl h-80 flex flex-col p-4 space-y-4">
                <div className="bg-stone-200 rounded-xl h-44 w-full"></div>
                <div className="h-4 bg-stone-200 rounded w-3/4"></div>
                <div className="h-3 bg-stone-200 rounded w-1/2"></div>
              </div>
            ))
          ) : (
            vendors.map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))
          )}
        </div>
      </section>

      {/* How Ayojan Solves Event Hassle (The OS Difference) */}
      <section className="bg-white border-y border-[#E7E1D8] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-bold text-[#7A1F2B] uppercase tracking-wider">
              No More Spreadsheets &amp; Chaotic WhatsApp Groups
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F2023]">
              How Ayojan Makes Event Planning Simple
            </h2>
            <p className="text-sm text-[#6F6A62]">
              Unlike generic directories with fake pricing, Ayojan gives you an intelligent plan, comparable quotes, and one workspace to coordinate everything.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Describe Your Event',
                desc: 'Pick your event, city, budget, and guest count. Our smart assistant outlines the exact services you will need.',
                icon: Sparkles,
                color: '#E08A2C'
              },
              {
                step: '02',
                title: 'Standardized Quotes',
                desc: 'One request sends your specifications to verified vendors. Compare line items, food plates, and inclusions side-by-side.',
                icon: Receipt,
                color: '#7A1F2B'
              },
              {
                step: '03',
                title: 'Protected Payments',
                desc: 'Pay with UPI or cards in milestones. Your deposit is held securely until vendors hit verified delivery stages.',
                icon: ShieldCheck,
                color: '#12665A'
              },
              {
                step: '04',
                title: 'Unified Workspace',
                desc: 'Keep contracts, timelines, guest counts, and direct vendor conversations in one stress-free mobile dashboard.',
                icon: CheckCircle,
                color: '#1F2023'
              }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="relative p-6 rounded-2xl bg-[#FAF7F2] border border-[#E7E1D8] space-y-4">
                  <span className="text-3xl font-serif font-extrabold text-[#E08A2C]/20 block">
                    {item.step}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#E7E1D8] flex items-center justify-center shadow-sm">
                    <Icon className="w-5 h-5 text-[#E08A2C]" />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-[#1F2023]">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-[#6F6A62] leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Event Types Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto space-y-2 mb-10">
          <span className="text-xs font-bold text-[#E08A2C] uppercase tracking-wider">
            Tailored For Every Occasion
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F2023]">
            Curated Experiences for Indian Celebrations
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {EVENT_TYPES.map((type) => (
            <Link
              key={type.id}
              href={`/explore?type=${type.id}`}
              className="group relative overflow-hidden rounded-3xl p-6 bg-white border border-[#E7E1D8] hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-64"
            >
              <div className="space-y-2">
                <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: type.color }} />
                <h3 className="font-serif font-bold text-xl text-[#1F2023] group-hover:text-[#E08A2C] transition-colors">
                  {type.label}
                </h3>
                <p className="text-xs text-[#6F6A62] leading-relaxed">
                  {type.description}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs font-bold text-[#1F2023] group-hover:text-[#E08A2C] pt-4 border-t border-stone-100">
                <span>Browse Options</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Call to action card */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-[#1F2023] rounded-3xl p-8 sm:p-12 text-center text-white space-y-6 relative overflow-hidden shadow-2xl">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-[#E08A2C] tracking-widest uppercase">
              Start in 2 Minutes
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold">
              Ready to Plan Your Next Unforgettable Event?
            </h2>
            <p className="text-sm text-stone-300">
              No phone calls at odd hours, no opaque commission markups. Clear quotes, smart guidance, and reliable execution.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/planner"
              className="bg-[#E08A2C] hover:bg-[#C9751D] text-white text-sm font-bold px-8 py-3.5 rounded-full shadow-lg transition-transform hover:scale-105"
            >
              Try AI Event Planner
            </Link>
            <Link
              href="/explore"
              className="bg-white/10 hover:bg-white/20 text-white text-sm font-semibold px-8 py-3.5 rounded-full border border-white/20 transition-colors"
            >
              Explore Vendors
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
