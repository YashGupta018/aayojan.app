import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1F2023] text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#E08A2C] to-[#7A1F2B] flex items-center justify-center text-white font-bold text-lg">
                आ
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                Ayojan<span className="text-[#E08A2C] text-sm font-sans">.app</span>
              </span>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed max-w-sm">
              India&apos;s intelligent event planning operating system. Tell us what you are planning, get a personalized AI plan, compare verified quotes, and coordinate stress-free.
            </p>
            <div className="flex flex-wrap gap-3 pt-2 text-xs text-stone-400">
              <div className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#E08A2C]" /> Zero Hidden Charges
              </div>
              <div className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#12665A]" /> 100% Milestone Escrow
              </div>
              <div className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#E08A2C]" /> Verified Vendors Only
              </div>
            </div>
          </div>

          {/* Event Categories */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Event Categories</h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li><Link href="/explore?type=wedding" className="hover:text-white transition-colors">Weddings &amp; Sangeet</Link></li>
              <li><Link href="/explore?type=corporate" className="hover:text-white transition-colors">Corporate Summits &amp; Offsites</Link></li>
              <li><Link href="/explore?type=social" className="hover:text-white transition-colors">Milestone Birthdays</Link></li>
              <li><Link href="/explore?type=community" className="hover:text-white transition-colors">Kitty Parties &amp; Family Meets</Link></li>
              <li><Link href="/explore?type=social" className="hover:text-white transition-colors">Anniversaries &amp; Baby Showers</Link></li>
            </ul>
          </div>

          {/* Vendors & Venues */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Find Services</h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li><Link href="/explore?category=venue" className="hover:text-white transition-colors">Banquet Halls &amp; Lawns</Link></li>
              <li><Link href="/explore?category=catering" className="hover:text-white transition-colors">Wedding &amp; Party Caterers</Link></li>
              <li><Link href="/explore?category=decor" className="hover:text-white transition-colors">Floral &amp; Mandap Decorators</Link></li>
              <li><Link href="/explore?category=photography" className="hover:text-white transition-colors">Candid Wedding Photographers</Link></li>
              <li><Link href="/explore?category=entertainment" className="hover:text-white transition-colors">DJs &amp; Live Performers</Link></li>
            </ul>
          </div>

          {/* Quick Tools */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Planner &amp; Tools</h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li><Link href="/planner" className="hover:text-white transition-colors text-[#E08A2C] font-medium">✨ AI Event Copilot</Link></li>
              <li><Link href="/workspace" className="hover:text-white transition-colors">Budget Calculator</Link></li>
              <li><Link href="/workspace" className="hover:text-white transition-colors">Standard Quote Comparison</Link></li>
              <li><Link href="/vendor-portal" className="hover:text-white transition-colors">Join as a Vendor</Link></li>
              <li><Link href="/admin" className="hover:text-white transition-colors text-xs text-stone-500">Staff Portal</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
          <p>© {new Date().getFullYear()} Ayojan.app. Designed with Indian festive warmth &amp; modern software simplicity.</p>
          <div className="flex items-center gap-6">
            <span>Made in India 🇮🇳</span>
            <span>Security &amp; DPDP Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
