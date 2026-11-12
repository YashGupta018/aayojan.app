'use client';

import React, { useState } from 'react';
import { 
  Briefcase, 
  ShieldCheck, 
  Clock, 
  Calendar, 
  FileText, 
  DollarSign, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

export default function VendorPortalPage() {
  const [tab, setTab] = useState<'leads' | 'calendar' | 'profile'>('leads');

  const leads = [
    {
      id: 'L-101',
      eventName: 'Grand Wedding Reception',
      client: 'Pooja & Rohan',
      city: 'Delhi NCR (South Delhi)',
      date: 'Dec 18, 2026',
      guests: 250,
      budget: '₹3,50,000 - ₹4,50,000',
      status: 'Quote Requested',
      hoursAgo: '2 hours ago'
    },
    {
      id: 'L-102',
      eventName: 'Corporate Annual Offsite Dinner',
      client: 'NexTech Solutions',
      city: 'Gurugram',
      date: 'Jan 15, 2027',
      guests: 180,
      budget: '₹2,00,000 - ₹2,50,000',
      status: 'New Inquiry',
      hoursAgo: '5 hours ago'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Welcome Card */}
      <div className="bg-[#1F2023] text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="bg-[#E08A2C] text-black text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Partner Vendor Desk
            </span>
            <span className="text-xs text-[#12665A] bg-[#12665A]/20 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> GST Verified Partner
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold">
            The Grand Heritage Palace &amp; Lawns
          </h1>
          <p className="text-xs sm:text-sm text-stone-300">
            Delhi NCR • 4.9 ★ (148 Client Reviews) • Avg Response Time: 32 mins
          </p>
        </div>

        <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl border border-white/10">
          <div>
            <span className="text-[10px] text-stone-400 block font-semibold">Active Leads</span>
            <span className="text-2xl font-bold text-[#E08A2C]">8 Qualified</span>
          </div>
          <div className="h-8 w-px bg-white/20" />
          <div>
            <span className="text-[10px] text-stone-400 block font-semibold">This Month GMV</span>
            <span className="text-2xl font-bold text-white">₹14.2 L</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E7E1D8] pb-3">
        {[
          { id: 'leads', label: 'Qualified Customer Inquiries (2 New)', icon: Briefcase },
          { id: 'calendar', label: 'Availability & Blackout Calendar', icon: Calendar },
          { id: 'profile', label: 'Business Profile & Standard Packages', icon: FileText }
        ].map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setTab(item.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                tab === item.id
                  ? 'bg-[#1F2023] text-white'
                  : 'text-[#6F6A62] hover:bg-stone-200/50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      {tab === 'leads' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-[#6F6A62]">
            <span>Showing recent verified leads with confirmed event dates &amp; budgets</span>
            <span className="text-[#12665A] font-semibold">● 100% Verified Phone/Email</span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {leads.map((lead) => (
              <div key={lead.id} className="bg-white p-6 rounded-2xl border border-[#E7E1D8] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#7A1F2B] bg-[#7A1F2B]/10 px-2 py-0.5 rounded-full">
                      {lead.status}
                    </span>
                    <span className="text-xs text-[#6F6A62]">Received {lead.hoursAgo}</span>
                  </div>
                  <h3 className="font-serif font-bold text-lg text-[#1F2023]">
                    {lead.eventName} — {lead.client}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-[#6F6A62]">
                    <span>📍 {lead.city}</span>
                    <span>👥 {lead.guests} Guests</span>
                    <span>📅 {lead.date}</span>
                    <span className="font-semibold text-stone-800">💰 Budget: {lead.budget}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => alert(`Opening standardized quote builder for ${lead.client}...`)}
                    className="bg-[#E08A2C] hover:bg-[#C9751D] text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow transition-colors cursor-pointer"
                  >
                    Send Standard Quote
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'calendar' && (
        <div className="bg-white rounded-3xl border border-[#E7E1D8] p-8 text-center space-y-4">
          <Calendar className="w-12 h-12 text-[#E08A2C] mx-auto" />
          <h3 className="font-serif font-bold text-xl text-[#1F2023]">Availability &amp; Blackout Dates</h3>
          <p className="text-xs sm:text-sm text-[#6F6A62] max-w-md mx-auto">
            Mark your booked dates so clients do not send inquiries when your lawn or team is occupied.
          </p>
          <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E7E1D8] max-w-md mx-auto text-left text-xs space-y-2">
            <div className="flex justify-between font-semibold">
              <span>Dec 10 - Dec 12, 2026:</span>
              <span className="text-[#7A1F2B]">Booked (Gupta Wedding)</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Dec 24 - Dec 26, 2026:</span>
              <span className="text-[#12665A]">Open for Inquiries</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Jan 01, 2027:</span>
              <span className="text-stone-500">Blackout (Maintenance)</span>
            </div>
          </div>
        </div>
      )}

      {tab === 'profile' && (
        <div className="bg-white rounded-3xl border border-[#E7E1D8] p-8 space-y-6">
          <h3 className="font-serif font-bold text-xl text-[#1F2023]">Standard Packages &amp; Price Guidance</h3>
          <p className="text-xs text-[#6F6A62]">
            Standardized packages help clients compare you fairly and reduce endless back-and-forth phone negotiations.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E7E1D8] space-y-2">
              <span className="text-xs font-bold text-[#E08A2C] uppercase">Package 1</span>
              <h4 className="font-serif font-bold text-base">Royal Heritage Lawn + Hall (Dinner)</h4>
              <p className="text-xs text-[#6F6A62]">Includes lawn lighting, valet parking, 2 bridal suites, and generator backup.</p>
              <div className="font-bold text-sm text-[#1F2023] pt-2">₹1,800 / plate (Min 250 pax)</div>
            </div>
            <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E7E1D8] space-y-2">
              <span className="text-xs font-bold text-[#7A1F2B] uppercase">Package 2</span>
              <h4 className="font-serif font-bold text-base">Daytime Intimate Mehendi Package</h4>
              <p className="text-xs text-[#6F6A62]">Exclusive indoor hall access for 5 hours with sound setup and seating for 100.</p>
              <div className="font-bold text-sm text-[#1F2023] pt-2">₹1,250 / plate (Min 80 pax)</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
