'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/context';
import { CITIES, EVENT_TYPES } from '@/lib/data';
import { 
  Sparkles, 
  MapPin, 
  Users, 
  Calendar, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  DollarSign, 
  HelpCircle,
  Clock,
  Layers
} from 'lucide-react';

export default function PlannerPage() {
  const router = useRouter();
  const { generateAIPlan, setActivePlan, selectedCity, setSelectedCity } = useApp();

  const [step, setStep] = useState(1);
  const [eventType, setEventType] = useState<'wedding' | 'corporate' | 'social' | 'community'>('wedding');
  const [city, setCity] = useState(selectedCity || 'Delhi NCR');
  const [date, setDate] = useState('2026-12-18');
  const [guestCount, setGuestCount] = useState<number>(200);
  const [budget, setBudget] = useState<number>(1000000);
  const [specialNotes, setSpecialNotes] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleCreatePlan = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const plan = generateAIPlan({
        eventType,
        city,
        date,
        guestCount,
        budget,
        specialNotes
      });
      setActivePlan(plan);
      setIsGenerating(false);
      router.push('/workspace');
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 md:py-16">
      {/* Header */}
      <div className="text-center space-y-3 mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E08A2C]/10 text-[#E08A2C] text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Ayojan AI Event Copilot</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1F2023]">
          Plan Your Event in 3 Easy Steps
        </h1>
        <p className="text-sm sm:text-base text-[#6F6A62] max-w-xl mx-auto">
          Tell us about your celebration. We will formulate a realistic budget breakdown, recommended categories, and a task timeline.
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center max-w-md mx-auto mb-10">
        {[
          { num: 1, label: 'Occasion' },
          { num: 2, label: 'Guests & City' },
          { num: 3, label: 'Budget & Style' }
        ].map((s, idx) => (
          <React.Fragment key={s.num}>
            <div className="flex flex-col items-center">
              <div 
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  step >= s.num
                    ? 'bg-[#E08A2C] text-white shadow-md'
                    : 'bg-stone-200 text-stone-600'
                }`}
              >
                {step > s.num ? <CheckCircle2 className="w-5 h-5" /> : s.num}
              </div>
              <span className="text-[11px] font-medium text-stone-600 mt-1">{s.label}</span>
            </div>
            {idx < 2 && (
              <div 
                className={`flex-1 h-0.5 mx-2 -mt-4 transition-colors ${
                  step > s.num ? 'bg-[#E08A2C]' : 'bg-stone-200'
                }`} 
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Step Container Card */}
      <div className="bg-white rounded-3xl border border-[#E7E1D8] shadow-xl p-6 sm:p-10 transition-all">
        {/* STEP 1: EVENT TYPE */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#1F2023]">
                What occasion are you planning?
              </h2>
              <p className="text-xs sm:text-sm text-[#6F6A62] mt-1">
                Choose the occasion so we can tailor the cultural checklists and vendor categories.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {EVENT_TYPES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setEventType(t.id as any)}
                  className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                    eventType === t.id
                      ? 'border-[#E08A2C] bg-[#E08A2C]/5 ring-2 ring-[#E08A2C]/20 shadow-md'
                      : 'border-[#E7E1D8] hover:border-stone-400 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span 
                      className="w-3.5 h-3.5 rounded-full block mb-3" 
                      style={{ backgroundColor: t.color }} 
                    />
                    {eventType === t.id && (
                      <span className="text-xs bg-[#E08A2C] text-white px-2 py-0.5 rounded-full font-bold">
                        Selected
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-lg text-[#1F2023]">{t.label}</h3>
                    <p className="text-xs text-[#6F6A62] mt-1">{t.description}</p>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="bg-[#E08A2C] hover:bg-[#C9751D] text-white font-bold text-sm px-7 py-3 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Continue to Guests &amp; Location</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: LOCATION & GUEST COUNT */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#1F2023]">
                Where and when will it take place?
              </h2>
              <p className="text-xs sm:text-sm text-[#6F6A62] mt-1">
                Guest count and target date determine venue capacity and seasonal vendor rates.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* City Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#E08A2C]" /> Host City
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#E7E1D8] rounded-xl px-4 py-3 text-sm font-medium text-[#1F2023] focus:outline-none focus:border-[#E08A2C]"
                >
                  {CITIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Event Date */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#E08A2C]" /> Approximate Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#E7E1D8] rounded-xl px-4 py-3 text-sm font-medium text-[#1F2023] focus:outline-none focus:border-[#E08A2C]"
                />
              </div>

              {/* Guest Count Slider */}
              <div className="sm:col-span-2 space-y-3 bg-[#FAF7F2] p-5 rounded-2xl border border-[#E7E1D8]">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-[#E08A2C]" /> Expected Guest Count
                  </label>
                  <span className="text-lg font-bold text-[#1F2023] bg-white px-3 py-1 rounded-lg border border-[#E7E1D8]">
                    {guestCount} Guests
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="1200"
                  step="20"
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full accent-[#E08A2C] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-[#6F6A62]">
                  <span>20 (Intimate gathering)</span>
                  <span>300 (Average Indian celebration)</span>
                  <span>1200+ (Grand / Mega event)</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-stone-600 hover:text-[#1F2023] font-semibold text-sm flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="bg-[#E08A2C] hover:bg-[#C9751D] text-white font-bold text-sm px-7 py-3 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Continue to Budget &amp; Notes</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: BUDGET & DETAILS */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#1F2023]">
                Estimated Budget &amp; Preferences
              </h2>
              <p className="text-xs sm:text-sm text-[#6F6A62] mt-1">
                We will distribute this realistically across Venue, Catering, Decor, Photography, and buffer.
              </p>
            </div>

            {/* Budget Presets & Slider */}
            <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#E7E1D8] space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-[#E08A2C]" /> Overall Event Budget (INR)
                </span>
                <span className="text-xl font-serif font-bold text-[#7A1F2B] bg-white px-3 py-1 rounded-lg border border-[#E7E1D8]">
                  {formatPrice(budget)}
                </span>
              </div>

              <input
                type="range"
                min="100000"
                max="5000000"
                step="50000"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full accent-[#E08A2C] cursor-pointer"
              />

              <div className="flex flex-wrap gap-2 pt-2">
                {[
                  { label: '₹2 Lakhs', val: 200000 },
                  { label: '₹5 Lakhs', val: 500000 },
                  { label: '₹10 Lakhs', val: 1000000 },
                  { label: '₹20 Lakhs', val: 2000000 },
                  { label: '₹35 Lakhs+', val: 3500000 }
                ].map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setBudget(preset.val)}
                    className={`text-xs px-3 py-1.5 rounded-full font-semibold transition-colors cursor-pointer ${
                      budget === preset.val
                        ? 'bg-[#7A1F2B] text-white'
                        : 'bg-white border border-[#E7E1D8] text-stone-700 hover:border-stone-400'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Free-form notes */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                Any specific requirements or dietary needs? (Optional)
              </label>
              <textarea
                rows={3}
                value={specialNotes}
                onChange={(e) => setSpecialNotes(e.target.value)}
                placeholder="e.g. Need authentic Jain counters, prefer outdoor open lawn, need hotel rooms for 60 out-of-town guests..."
                className="w-full bg-[#FAF7F2] border border-[#E7E1D8] rounded-xl p-3 text-sm text-[#1F2023] focus:outline-none focus:border-[#E08A2C]"
              />
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="text-stone-600 hover:text-[#1F2023] font-semibold text-sm flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                type="button"
                disabled={isGenerating}
                onClick={handleCreatePlan}
                className="bg-gradient-to-r from-[#E08A2C] to-[#7A1F2B] hover:opacity-95 text-white font-bold text-sm px-8 py-3.5 rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Calculating Plan &amp; Allocations...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Complete Event Plan</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Helpful Guarantee Box */}
      <div className="mt-8 bg-[#FAF7F2] border border-[#E7E1D8] rounded-2xl p-4 flex items-center gap-3 text-xs text-[#6F6A62]">
        <HelpCircle className="w-5 h-5 text-[#E08A2C] shrink-0" />
        <p>
          <strong>Safety &amp; Transparency:</strong> Ayojan does not fabricate prices or availability. All generated figures represent grounded Indian market benchmarks and can be adjusted anytime in your personal event workspace.
        </p>
      </div>
    </div>
  );
}
