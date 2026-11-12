'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { EventPlan, QuoteItem, MOCK_VENDORS } from './data';

interface AppContextType {
  activePlan: EventPlan | null;
  setActivePlan: (plan: EventPlan | null) => void;
  shortlist: string[];
  toggleShortlist: (vendorId: string) => void;
  quotes: QuoteItem[];
  requestQuote: (vendorId: string, requirements?: string) => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  generateAIPlan: (params: {
    eventType: 'wedding' | 'corporate' | 'social' | 'community';
    city: string;
    guestCount: number;
    budget: number;
    date: string;
    specialNotes?: string;
  }) => EventPlan;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [selectedCity, setSelectedCity] = useState<string>('Delhi NCR');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [shortlist, setShortlist] = useState<string[]>(['v1', 'v2', 'v3']);
  const [quotes, setQuotes] = useState<QuoteItem[]>([
    {
      id: 'q1',
      vendorId: 'v1',
      vendorName: 'The Grand Heritage Palace & Lawns',
      category: 'Venue & Banquets',
      status: 'received',
      estimatedAmount: 360000,
      dateSent: 'Yesterday',
      validUntil: '5 Days remaining',
      inclusions: ['Banquet Hall + Garden Lawn', 'Catering service fee', 'Air conditioning & generator backup']
    },
    {
      id: 'q2',
      vendorId: 'v2',
      vendorName: 'Aura Bloom & Royal Decorators',
      category: 'Decor & Styling',
      status: 'sent',
      estimatedAmount: 140000,
      dateSent: 'Today, 11:20 AM',
      validUntil: 'Waiting for response',
      inclusions: ['Marigold Floral mandap', 'Entrance gate drape', 'Stage background warm lighting']
    }
  ]);

  const [activePlan, setActivePlan] = useState<EventPlan | null>(null);

  // Initialize with a default starter plan for demo
  useEffect(() => {
    if (!activePlan) {
      const starterPlan = generateAIPlan({
        eventType: 'wedding',
        city: 'Delhi NCR',
        guestCount: 200,
        budget: 1000000,
        date: '2026-12-18',
        specialNotes: 'Looking for a warm, family-friendly evening celebration with great food and floral decor.'
      });
      setActivePlan(starterPlan);
    }
  }, []);

  const toggleShortlist = (vendorId: string) => {
    setShortlist(prev => 
      prev.includes(vendorId) ? prev.filter(id => id !== vendorId) : [...prev, vendorId]
    );
  };

  const requestQuote = (vendorId: string, requirements?: string) => {
    const vendor = MOCK_VENDORS.find(v => v.id === vendorId);
    if (!vendor) return;

    const newQuote: QuoteItem = {
      id: `q-${Date.now()}`,
      vendorId: vendor.id,
      vendorName: vendor.name,
      category: vendor.categoryLabel,
      status: 'sent',
      estimatedAmount: vendor.priceStarting * (vendor.priceUnit.includes('plate') ? 200 : 1),
      dateSent: 'Just now',
      validUntil: 'Pending vendor review',
      inclusions: vendor.inclusions
    };

    setQuotes(prev => [newQuote, ...prev.filter(q => q.vendorId !== vendorId)]);
  };

  const generateAIPlan = (params: {
    eventType: 'wedding' | 'corporate' | 'social' | 'community';
    city: string;
    guestCount: number;
    budget: number;
    date: string;
    specialNotes?: string;
  }): EventPlan => {
    const { eventType, city, guestCount, budget, date } = params;

    let allocations = [];
    let checklist = [];

    if (eventType === 'wedding') {
      allocations = [
        { category: 'Venue & Banqueting', percentage: 40, recommendedMin: budget * 0.35, recommendedMax: budget * 0.45, notes: 'Includes lawn/hall rental, basic lighting & amenities' },
        { category: 'Catering & Food Spread', percentage: 25, recommendedMin: budget * 0.22, recommendedMax: budget * 0.28, notes: `Calculated for ~${guestCount} guests (₹1,200 - ₹1,800/plate)` },
        { category: 'Decor, Mandap & Stage', percentage: 15, recommendedMin: budget * 0.12, recommendedMax: budget * 0.18, notes: 'Floral entrance, mandap backdrop, lighting & centerpieces' },
        { category: 'Photography & 4K Cinema', percentage: 10, recommendedMin: budget * 0.08, recommendedMax: budget * 0.12, notes: 'Candid, traditional photographer + teaser video' },
        { category: 'Entertainment & DJ', percentage: 5, recommendedMin: budget * 0.04, recommendedMax: budget * 0.07, notes: 'Professional DJ, live dhol beats, moving lights' },
        { category: 'Buffer & Sundries', percentage: 5, recommendedMin: budget * 0.04, recommendedMax: budget * 0.06, notes: 'Tips, sudden logistics, emergency items' },
      ];

      checklist = [
        { id: 'c1', task: 'Finalize Guest List & Target Numbers', timeline: '12 Weeks Before', completed: true, category: 'Planning' },
        { id: 'c2', task: 'Lock Venue & Book Availability Date', timeline: '10 Weeks Before', completed: true, category: 'Venue' },
        { id: 'c3', task: 'Food Tasting & Finalize Chaat/Main Menu', timeline: '6 Weeks Before', completed: false, category: 'Catering' },
        { id: 'c4', task: 'Review Floral & Mandap Theme with Decorator', timeline: '4 Weeks Before', completed: false, category: 'Decor' },
        { id: 'c5', task: 'Share Song Playlists & Entry Tracks with DJ', timeline: '2 Weeks Before', completed: false, category: 'Entertainment' },
        { id: 'c6', task: 'Send WhatsApp Digital Invites with Location Pin', timeline: '2 Weeks Before', completed: false, category: 'Invites' }
      ];
    } else if (eventType === 'corporate') {
      allocations = [
        { category: 'Conference Venue & Auditorium', percentage: 45, recommendedMin: budget * 0.4, recommendedMax: budget * 0.5, notes: 'A/C seating, breakout lounges, parking' },
        { category: 'Audio/Visual & LED Wall', percentage: 20, recommendedMin: budget * 0.15, recommendedMax: budget * 0.22, notes: 'Collar mics, live streaming, projection screens' },
        { category: 'Executive Catering & High Tea', percentage: 25, recommendedMin: budget * 0.2, recommendedMax: budget * 0.3, notes: 'Buffet lunch + 2 high-tea snack breaks' },
        { category: 'Corporate Gifting & Badges', percentage: 10, recommendedMin: budget * 0.08, recommendedMax: budget * 0.12, notes: 'Welcome kits, personalized delegate lanyards' }
      ];

      checklist = [
        { id: 'cc1', task: 'Book Auditorium & Breakout Meeting Rooms', timeline: '6 Weeks Before', completed: true, category: 'Venue' },
        { id: 'cc2', task: 'Confirm AV Tech Specs & Projector Resolutions', timeline: '3 Weeks Before', completed: false, category: 'Tech' },
        { id: 'cc3', task: 'Finalize Lunch Buffet & Refreshment Schedule', timeline: '2 Weeks Before', completed: false, category: 'Catering' },
        { id: 'cc4', task: 'Run Stage Rehearsal & Collar Mic Audio Test', timeline: '1 Day Before', completed: false, category: 'Execution' }
      ];
    } else {
      // Social & Birthday
      allocations = [
        { category: 'Party Hall / Rooftop', percentage: 35, recommendedMin: budget * 0.3, recommendedMax: budget * 0.4, notes: 'Space rental, party lighting' },
        { category: 'Appetizers & Dinner', percentage: 35, recommendedMin: budget * 0.3, recommendedMax: budget * 0.4, notes: 'Starters, custom birthday cake, dinner' },
        { category: 'Balloons & Themed Decor', percentage: 15, recommendedMin: budget * 0.12, recommendedMax: budget * 0.18, notes: 'Photo booth frame, balloon arch' },
        { category: 'DJ / Anchor / Games Host', percentage: 15, recommendedMin: budget * 0.1, recommendedMax: budget * 0.18, notes: 'Fun host, party music setup' }
      ];

      checklist = [
        { id: 'cs1', task: 'Choose Party Theme & Color Palette', timeline: '3 Weeks Before', completed: true, category: 'Planning' },
        { id: 'cs2', task: 'Confirm Venue & Minimum Food Guarantee', timeline: '2 Weeks Before', completed: false, category: 'Venue' },
        { id: 'cs3', task: 'Order Designer Custom Birthday Cake', timeline: '1 Week Before', completed: false, category: 'Food' },
        { id: 'cs4', task: 'Assemble Return Gifts for Guests', timeline: '3 Days Before', completed: false, category: 'Gifts' }
      ];
    }

    const newPlan: EventPlan = {
      id: `plan-${Date.now()}`,
      title: `${city} ${eventType.charAt(0).toUpperCase() + eventType.slice(1)} Celebration`,
      eventType,
      city,
      date: date || 'Upcoming Month',
      guestCount,
      totalBudget: budget,
      budgetAllocations: allocations,
      checklist,
      suggestedVendors: ['v1', 'v2', 'v3', 'v4']
    };

    return newPlan;
  };

  return (
    <AppContext.Provider
      value={{
        activePlan,
        setActivePlan,
        shortlist,
        toggleShortlist,
        quotes,
        requestQuote,
        selectedCity,
        setSelectedCity,
        searchQuery,
        setSearchQuery,
        generateAIPlan
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
