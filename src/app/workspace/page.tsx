'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/context';
import { MOCK_VENDORS } from '@/lib/data';
import { 
  Calendar, 
  Users, 
  MapPin, 
  DollarSign, 
  CheckCircle2, 
  Clock, 
  Receipt, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Check,
  CreditCard,
  MessageSquare
} from 'lucide-react';

export default function WorkspacePage() {
  const { activePlan, quotes, requestQuote, shortlist } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'budget' | 'quotes' | 'checklist'>('overview');
  const [checklistState, setChecklistState] = useState<{ [id: string]: boolean }>({
    c1: true,
    c2: true
  });
  const [paidDeposit, setPaidDeposit] = useState<boolean>(false);

  if (!activePlan) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-3xl font-bold text-[#1F2023]">No Active Event Found</h2>
        <p className="text-sm text-[#6F6A62]">Create your first event plan to access the workspace.</p>
        <Link
          href="/planner"
          className="inline-block bg-[#E08A2C] text-white font-bold text-sm px-6 py-3 rounded-full shadow"
        >
          Create Event Plan
        </Link>
      </div>
    );
  }

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const toggleTask = (id: string) => {
    setChecklistState(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
      {/* Event Overview Hero Banner */}
      <div className="bg-white rounded-3xl border border-[#E7E1D8] shadow-sm p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#E7E1D8]">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#E08A2C]/15 text-[#E08A2C]">
                {activePlan.eventType.toUpperCase()}
              </span>
              <span className="text-xs text-[#12665A] font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Workspace Active
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F2023]">
              {activePlan.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-[#6F6A62]">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#E08A2C]" /> {activePlan.city}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[#E08A2C]" /> {activePlan.guestCount} Guests
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#E08A2C]" /> {activePlan.date}
              </span>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-4 bg-[#FAF7F2] p-4 rounded-2xl border border-[#E7E1D8]">
            <div>
              <span className="text-[11px] font-semibold text-[#6F6A62] block">Total Budget Target</span>
              <span className="font-serif text-xl sm:text-2xl font-bold text-[#7A1F2B]">
                {formatPrice(activePlan.totalBudget)}
              </span>
            </div>
            <div className="h-8 w-px bg-stone-300" />
            <div>
              <span className="text-[11px] font-semibold text-[#6F6A62] block">Quotes In Inbox</span>
              <span className="text-xl sm:text-2xl font-bold text-[#12665A]">
                {quotes.length} Active
              </span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 pt-6 overflow-x-auto scrollbar-none">
          {[
            { id: 'overview', label: 'Dashboard Overview', icon: Sparkles },
            { id: 'budget', label: 'Budget Allocations', icon: DollarSign },
            { id: 'quotes', label: `Quotes & Comparison (${quotes.length})`, icon: Receipt },
            { id: 'checklist', label: 'Milestone Checklist', icon: CheckCircle2 }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#1F2023] text-white shadow-md'
                    : 'bg-[#FAF7F2] text-[#6F6A62] hover:bg-stone-200/60 border border-[#E7E1D8]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Tasks & Quotes snapshot */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <div className="bg-gradient-to-r from-[#E08A2C]/15 to-[#7A1F2B]/10 rounded-3xl p-6 border border-[#E08A2C]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-serif font-bold text-lg text-[#1F2023]">Next Recommended Step</h3>
                <p className="text-xs sm:text-sm text-[#6F6A62] mt-0.5">
                  Send quote requests to at least 2 shortlisted caterers to compare per-plate rates.
                </p>
              </div>
              <Link
                href="/explore?category=catering"
                className="bg-[#E08A2C] hover:bg-[#C9751D] text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow transition-colors shrink-0"
              >
                Explore Caterers →
              </Link>
            </div>

            {/* Active Quotes comparison card */}
            <div className="bg-white rounded-3xl border border-[#E7E1D8] p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif font-bold text-lg text-[#1F2023]">Quotes Under Review</h3>
                <button
                  onClick={() => setActiveTab('quotes')}
                  className="text-xs font-bold text-[#E08A2C] hover:underline"
                >
                  View All Quotes
                </button>
              </div>

              <div className="space-y-3">
                {quotes.map((q) => (
                  <div key={q.id} className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E7E1D8] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-bold text-sm text-[#1F2023]">{q.vendorName}</span>
                        <span className="text-[10px] bg-white border border-[#E7E1D8] text-stone-600 px-2 py-0.5 rounded-full font-medium">
                          {q.category}
                        </span>
                      </div>
                      <div className="text-xs text-[#6F6A62] mt-1 flex items-center gap-2">
                        <span>Sent: {q.dateSent}</span>
                        <span>•</span>
                        <span className="text-[#12665A] font-semibold">{q.validUntil}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-sm text-[#1F2023]">
                        {formatPrice(q.estimatedAmount)}
                      </span>
                      <button
                        onClick={() => setActiveTab('quotes')}
                        className="bg-white border border-[#E7E1D8] hover:border-stone-400 text-xs font-bold px-3 py-1.5 rounded-lg text-stone-800"
                      >
                        Compare
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Immediate Checklist snapshot */}
            <div className="bg-white rounded-3xl border border-[#E7E1D8] p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif font-bold text-lg text-[#1F2023]">Upcoming Milestones</h3>
                <button
                  onClick={() => setActiveTab('checklist')}
                  className="text-xs font-bold text-[#E08A2C] hover:underline"
                >
                  Manage Checklist
                </button>
              </div>

              <div className="space-y-2">
                {activePlan.checklist.slice(0, 4).map((task) => (
                  <div 
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                    className="p-3 rounded-xl border border-stone-200/80 hover:bg-[#FAF7F2] flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                        checklistState[task.id] ? 'bg-[#12665A] border-[#12665A] text-white' : 'border-stone-300'
                      }`}>
                        {checklistState[task.id] && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <span className={`text-xs sm:text-sm font-medium ${
                        checklistState[task.id] ? 'line-through text-stone-400' : 'text-[#1F2023]'
                      }`}>
                        {task.task}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#6F6A62] bg-white px-2 py-0.5 rounded border border-stone-200">
                      {task.timeline}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: AI Budget Breakdown Card */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-[#E7E1D8] p-6 space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="font-serif font-bold text-lg text-[#1F2023]">Budget Allocation</h3>
                <span className="text-xs bg-[#E08A2C]/10 text-[#E08A2C] font-bold px-2 py-0.5 rounded-full">
                  AI Recommended
                </span>
              </div>

              <div className="space-y-4">
                {activePlan.budgetAllocations.map((item, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-[#1F2023] font-semibold">{item.category}</span>
                      <span className="text-[#7A1F2B] font-bold">{item.percentage}%</span>
                    </div>
                    <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#E08A2C] to-[#7A1F2B] rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[11px] text-[#6F6A62]">
                      <span>{formatPrice(item.recommendedMin)}</span>
                      <span>{formatPrice(item.recommendedMax)}</span>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setActiveTab('budget')}
                className="w-full bg-[#FAF7F2] hover:bg-stone-200/60 border border-[#E7E1D8] text-xs font-bold py-2.5 rounded-xl text-[#1F2023] transition-colors"
              >
                Full Budget Analysis →
              </button>
            </div>

            {/* Guaranteed Trust badge */}
            <div className="bg-[#12665A]/5 border border-[#12665A]/20 rounded-3xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-[#12665A] font-bold text-sm">
                <ShieldCheck className="w-5 h-5" /> 100% Escrow Protection
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                When you accept a quote on Ayojan, funds are kept in milestone escrow. The vendor is paid upon verified delivery of each stage.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: BUDGET DETAIL */}
      {activeTab === 'budget' && (
        <div className="bg-white rounded-3xl border border-[#E7E1D8] p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#1F2023]">Event Budget Architecture</h2>
              <p className="text-xs sm:text-sm text-[#6F6A62]">
                Target: {formatPrice(activePlan.totalBudget)} for {activePlan.guestCount} guests in {activePlan.city}
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#FAF7F2] border-y border-[#E7E1D8] text-[11px] uppercase font-bold text-[#6F6A62]">
                <tr>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Allocation</th>
                  <th className="py-3 px-4">Estimated Range</th>
                  <th className="py-3 px-4">Recommended Strategy</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E7E1D8]">
                {activePlan.budgetAllocations.map((item, i) => (
                  <tr key={i} className="hover:bg-stone-50/60">
                    <td className="py-4 px-4 font-bold text-[#1F2023]">{item.category}</td>
                    <td className="py-4 px-4">
                      <span className="bg-[#E08A2C]/15 text-[#E08A2C] font-bold px-2 py-0.5 rounded-md text-xs">
                        {item.percentage}%
                      </span>
                    </td>
                    <td className="py-4 px-4 font-semibold text-stone-700">
                      {formatPrice(item.recommendedMin)} - {formatPrice(item.recommendedMax)}
                    </td>
                    <td className="py-4 px-4 text-xs text-[#6F6A62] max-w-xs">{item.notes}</td>
                    <td className="py-4 px-4 text-right">
                      <Link
                        href={`/explore?q=${encodeURIComponent(item.category)}`}
                        className="text-xs font-bold text-[#7A1F2B] hover:text-[#E08A2C]"
                      >
                        Find Vendors →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: QUOTES & COMPARISON */}
      {activeTab === 'quotes' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#1F2023]">Compare Vendor Quotes</h2>
              <p className="text-xs sm:text-sm text-[#6F6A62]">
                Side-by-side standardized quotes with transparent inclusions, exclusions, and milestone protection.
              </p>
            </div>
            <Link
              href="/explore"
              className="bg-[#E08A2C] hover:bg-[#C9751D] text-white text-xs font-bold px-5 py-2.5 rounded-full shadow transition-all self-start sm:self-auto"
            >
              + Request More Quotes
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quotes.map((quote) => (
              <div key={quote.id} className="bg-white rounded-3xl border border-[#E7E1D8] shadow-md p-6 space-y-5 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-bold text-[#E08A2C] uppercase tracking-wider bg-[#E08A2C]/10 px-2 py-0.5 rounded-full">
                        {quote.category}
                      </span>
                      <h3 className="font-serif font-bold text-xl text-[#1F2023] mt-1">{quote.vendorName}</h3>
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#12665A]/10 text-[#12665A] border border-[#12665A]/20">
                      {quote.status === 'received' ? 'Quote Ready' : 'Pending Vendor'}
                    </span>
                  </div>

                  <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E7E1D8] flex items-center justify-between">
                    <span className="text-xs text-[#6F6A62] font-medium">Standardized Total</span>
                    <span className="font-serif text-2xl font-bold text-[#1F2023]">
                      {formatPrice(quote.estimatedAmount)}
                    </span>
                  </div>

                  {/* Line items inclusions */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                      Confirmed Inclusions:
                    </span>
                    <ul className="space-y-1.5 text-xs text-[#6F6A62]">
                      {quote.inclusions.map((inc, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-[#12665A] shrink-0" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="border-t border-[#E7E1D8] pt-4 flex items-center justify-between">
                  <div className="text-[11px] text-[#6F6A62]">
                    <span>Valid: </span>
                    <span className="font-semibold text-stone-800">{quote.validUntil}</span>
                  </div>

                  <button
                    onClick={() => {
                      setPaidDeposit(true);
                      alert(`Booking initialized for ${quote.vendorName}! In production, Razorpay/Cashfree checkout with 25% milestone deposit (₹${Math.round(quote.estimatedAmount * 0.25).toLocaleString('en-IN')}) opens here.`);
                    }}
                    className="bg-[#12665A] hover:bg-[#0E5248] text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>Accept &amp; Book</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: CHECKLIST */}
      {activeTab === 'checklist' && (
        <div className="bg-white rounded-3xl border border-[#E7E1D8] p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#1F2023]">Event Milestone Checklist</h2>
              <p className="text-xs sm:text-sm text-[#6F6A62]">
                Customized for an Indian {activePlan.eventType} with {activePlan.guestCount} guests.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {activePlan.checklist.map((task) => (
              <div
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={`p-4 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                  checklistState[task.id]
                    ? 'bg-[#FAF7F2] border-[#E7E1D8] opacity-75'
                    : 'bg-white border-stone-300 hover:border-[#E08A2C] shadow-sm'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-colors ${
                    checklistState[task.id]
                      ? 'bg-[#12665A] border-[#12665A] text-white'
                      : 'border-stone-300 bg-white'
                  }`}>
                    {checklistState[task.id] && <Check className="w-4 h-4" />}
                  </div>
                  <div>
                    <h4 className={`text-sm font-bold ${
                      checklistState[task.id] ? 'line-through text-stone-400' : 'text-[#1F2023]'
                    }`}>
                      {task.task}
                    </h4>
                    <span className="text-[11px] text-[#6F6A62] block mt-0.5">
                      Category: {task.category}
                    </span>
                  </div>
                </div>

                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#FAF7F2] text-stone-700 border border-[#E7E1D8]">
                  {task.timeline}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
