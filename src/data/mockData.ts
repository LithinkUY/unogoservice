import { ChecklistItem, PricingPlan, ServiceArea, Testimonial, FaqItem, PortalTask } from '../types';

export const CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: 'ch-1',
    title: 'Flush & Drain Water Heater Sediments',
    category: 'plumbing',
    season: 'fall',
    frequency: 'Annual',
    description: 'Draining mineral sediments from tank bases to maintain heating efficiency and prevent premature tank bottom corrosion or burst.',
    preventedDamage: 'Averts $2,800+ replacement and sudden flooding'
  },
  {
    id: 'ch-2',
    title: 'Vacuum Refrigerator Compressor & Condenser Coils',
    category: 'appliances',
    season: 'spring',
    frequency: 'Semi-annual',
    description: 'Clearing accumulated dust and pet hair off coils ensures compressors operate at peak efficiency without overheating.',
    preventedDamage: 'Saves 15% electrical load and prevents $1,200 compressor failure'
  },
  {
    id: 'ch-3',
    title: 'Comprehensive Attic & Roof Sheathing Inspection',
    category: 'exterior',
    season: 'spring',
    frequency: 'Bi-annual',
    description: 'Inspect attic rafters, insulation, and roof penetrations for moisture intrusion, pest activity, or vent blockages.',
    preventedDamage: 'Catches hidden roof leaks before drywall mold & rot occur'
  },
  {
    id: 'ch-4',
    title: 'HVAC Filter Replacement & Condensate Line Clear',
    category: 'hvac',
    season: 'summer',
    frequency: 'Every Visit',
    description: 'Inspect filter MERV ratings, replace dirty filters, and flush A/C condensate trap with enzymatic cleaner to prevent overflow.',
    preventedDamage: 'Stops ceiling water damage from clogged drip pans'
  },
  {
    id: 'ch-5',
    title: 'Lubricate Garage Door Springs, Tracks & Rollers',
    category: 'interior',
    season: 'fall',
    frequency: 'Semi-annual',
    description: 'Apply silicone-based high-grade lubricant to torsion springs, nylon rollers, and hinges, testing auto-reverse safety sensors.',
    preventedDamage: 'Prevents snapped $600 torsion springs and stuck cars'
  },
  {
    id: 'ch-6',
    title: 'Inspect & Test Sump Pump & Battery Backup',
    category: 'plumbing',
    season: 'spring',
    frequency: 'Quarterly',
    description: 'Fill sump pit with water to test float switch actuation, pump discharge, and test secondary 12V battery backup emergency run.',
    preventedDamage: 'Prevents catastrophic $35,000 finished basement flooding'
  },
  {
    id: 'ch-7',
    title: 'Outdoor Spigot Shutoff & Winterization',
    category: 'plumbing',
    season: 'fall',
    frequency: 'Annual',
    description: 'Isolate internal shutoff valves, drain residual water from frost-free hose bibs, and remove exterior garden hoses before first frost.',
    preventedDamage: 'Prevents frozen pipe bursts inside exterior walls'
  },
  {
    id: 'ch-8',
    title: 'Clean Dryer Vent Ductwork & Exterior Flapper',
    category: 'appliances',
    season: 'winter',
    frequency: 'Annual',
    description: 'Inspect duct run behind dryer to exterior exhaust cap using rotary brushes to extract combustible lint accumulation.',
    preventedDamage: 'Number #1 cause of residential home appliance fires eliminated'
  },
  {
    id: 'ch-9',
    title: 'Inspect & Test Smoke & Carbon Monoxide Detectors',
    category: 'interior',
    season: 'all',
    frequency: 'Every Visit',
    description: 'Sound-test every detector, vacuum dust from optical sensors, inspect 10-year expiration dates, and replace backup batteries.',
    preventedDamage: 'Life safety assurance and NFPA residential compliance'
  },
  {
    id: 'ch-10',
    title: 'Inspect & Clean Gutter Downspout Outlets',
    category: 'exterior',
    season: 'fall',
    frequency: 'Quarterly',
    description: 'Check gutter slope, clear leaf buildup from elbow joints, and verify underground downspout extension drainage away from foundation.',
    preventedDamage: 'Prevents foundation hydrostatic pressure and basement seepage'
  },
  {
    id: 'ch-11',
    title: 'GFCI & AFCI Breaker Tripping Diagnostic',
    category: 'hvac',
    season: 'all',
    frequency: 'Semi-annual',
    description: 'Test all bathroom, kitchen, exterior, and garage ground fault interrupters using dedicated circuit tester for millisecond cutoff.',
    preventedDamage: 'Mitigates electrical shock hazards and appliance surges'
  },
  {
    id: 'ch-12',
    title: 'Re-caulk Shower Corners & Bathtub Perimeters',
    category: 'plumbing',
    season: 'all',
    frequency: 'As Needed',
    description: 'Remove degraded or mildewed silicone bead and apply premium mold-resistant 100% silicone sealant to high-moisture joints.',
    preventedDamage: 'Prevents subfloor decay and below-ceiling stains'
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'quarterly',
    name: 'Quarterly Care',
    tagline: 'Essential seasonal protection for busy homeowners',
    visitsPerYear: 4,
    frequencyLabel: '4 visits per year (Seasonal)',
    baseMonthlyPrice: 195,
    recommendedFor: 'Townhomes & single family residences under 3,500 sq ft',
    features: [
      '4 Scheduled seasonal maintenance visits',
      'Full 50-Point Comprehensive Home Inspection',
      'Assigned W-2 background-checked technician',
      'Dedicated Home Manager point of contact',
      '1 Hour of included handyman repairs per visit',
      'Filter replacements & consumable management',
      'Subcontractor project coordination & vetting',
      '24/7/365 Emergency Dispatch hotline',
      'Online client portal & photo inspection logs'
    ],
    handymanHoursIncluded: '1 hr / visit (4 hrs / year)'
  },
  {
    id: 'bimonthly',
    name: 'Bi-Monthly Pro',
    tagline: 'Our most popular plan for active families and modern estates',
    visitsPerYear: 6,
    frequencyLabel: '6 visits per year (Every 2 months)',
    baseMonthlyPrice: 285,
    recommendedFor: 'Single family homes 3,500 - 6,500 sq ft & multi-zone systems',
    badge: 'Most Popular',
    features: [
      '6 Scheduled visits per year (Every 60 days)',
      'Expanded 50-Point Proactive Checklist',
      'Same trusted primary technician every time',
      'Dedicated Home Manager with proactive planning',
      '2 Hours of included handyman repairs per visit',
      'Priority scheduling for home improvement projects',
      'Pre-negotiated preferred subcontractor rates',
      'Complete mechanical system inventory & records',
      '24/7 Priority emergency response window',
      'Seasonal exterior power washing prep coordination'
    ],
    handymanHoursIncluded: '2 hrs / visit (12 hrs / year)'
  },
  {
    id: 'monthly',
    name: 'Monthly Premier',
    tagline: 'White-glove estate concierge & complete turnkey care',
    visitsPerYear: 12,
    frequencyLabel: '12 visits per year (Monthly)',
    baseMonthlyPrice: 460,
    recommendedFor: 'Luxury properties 6,000+ sq ft, vacation homes & historic estates',
    badge: 'Executive Concierge',
    features: [
      '12 Comprehensive monthly visits',
      'Continuous white-glove preventative maintenance',
      'Master technician dedicated to your residence',
      'Direct cell phone line to Senior Home Manager',
      '3.5 Hours of included handyman repairs per visit',
      'Unlimited "Honey-Do" list tackling',
      'Complete contractor oversight on-site during repairs',
      'Storm preparation and post-storm audit check',
      'Vacation / travel home monitoring visits',
      'VIP Emergency escalation guarantee under 2 hours'
    ],
    handymanHoursIncluded: '3.5 hrs / visit (42 hrs / year)'
  }
];

export const SERVICE_AREAS: ServiceArea[] = [
  {
    state: 'Maryland',
    name: 'Montgomery County & Greater Bethesda',
    counties: ['Montgomery County', 'Chevy Chase', 'Bethesda', 'Potomac', 'Rockville', 'Silver Spring', 'Gaithersburg', 'Olney'],
    keyCities: ['Bethesda', 'Potomac', 'Chevy Chase', 'Kensington', 'Rockville', 'North Bethesda'],
    zipPrefixes: ['208', '209'],
    phone: '(301) 949-8080',
    officeAddress: '15915 Somerville Rd, Rockville, MD 20855'
  },
  {
    state: 'Washington D.C.',
    name: 'District of Columbia',
    counties: ['Northwest D.C.', 'Georgetown', 'Dupont Circle', 'Cleveland Park', 'Spring Valley', 'Capitol Hill'],
    keyCities: ['Georgetown', 'Kalorama', 'Wesley Heights', 'Foxhall', 'Palisades', 'Logan Circle'],
    zipPrefixes: ['200'],
    phone: '(202) 559-8800',
    officeAddress: 'Serving all NW and Capitol Hill neighborhoods'
  },
  {
    state: 'Virginia',
    name: 'Northern Virginia & Loudoun',
    counties: ['Fairfax County', 'Loudoun County', 'Arlington', 'Alexandria'],
    keyCities: ['McLean', 'Great Falls', 'Vienna', 'Arlington', 'Alexandria', 'Reston', 'Oakton', 'Ashburn', 'Leesburg'],
    zipPrefixes: ['220', '221', '222', '223', '201'],
    phone: '(703) 759-4080',
    officeAddress: '6849 Old Dominion Dr, McLean, VA 22101'
  },
  {
    state: 'Connecticut',
    name: 'Fairfield County',
    counties: ['Fairfield County'],
    keyCities: ['Greenwich', 'Westport', 'Darien', 'New Canaan', 'Fairfield', 'Wilton', 'Ridgefield', 'Stamford'],
    zipPrefixes: ['068', '069'],
    phone: '(203) 658-8870',
    officeAddress: 'Westport & Greenwich Field Dispatch'
  },
  {
    state: 'Georgia',
    name: 'Metro Atlanta',
    counties: ['Fulton County', 'Cobb County', 'DeKalb County'],
    keyCities: ['Buckhead', 'Sandy Springs', 'Alpharetta', 'Roswell', 'Brookhaven', 'Dunwoody', 'Milton', 'Johns Creek'],
    zipPrefixes: ['303', '300'],
    phone: '(404) 937-6400',
    officeAddress: 'Peachtree Rd, Buckhead, Atlanta, GA'
  },
  {
    state: 'Florida',
    name: 'Palm Beach & Broward',
    counties: ['Palm Beach County', 'Broward County'],
    keyCities: ['Boca Raton', 'Delray Beach', 'Palm Beach', 'Jupiter', 'Fort Lauderdale', 'Highland Beach', 'Manalapan'],
    zipPrefixes: ['334', '333'],
    phone: '(561) 408-7200',
    officeAddress: 'Serving coastal Palm Beach & Broward'
  },
  {
    state: 'Illinois',
    name: 'Chicago North Shore & Cook/Lake',
    counties: ['Cook County', 'Lake County'],
    keyCities: ['Winnetka', 'Glencoe', 'Highland Park', 'Lake Forest', 'Wilmette', 'Evanston', 'Kenilworth', 'Hinsdale'],
    zipPrefixes: ['600', '601', '602', '605'],
    phone: '(847) 748-8100',
    officeAddress: 'North Shore Operations Center, Wilmette, IL'
  },
  {
    state: 'Massachusetts',
    name: 'Greater Boston & MetroWest',
    counties: ['Norfolk County', 'Middlesex County', 'Worcester County'],
    keyCities: ['Newton', 'Wellesley', 'Weston', 'Needham', 'Brookline', 'Concord', 'Lexington', 'Dover', 'Sudbury'],
    zipPrefixes: ['024', '017', '021'],
    phone: '(617) 934-2900',
    officeAddress: 'MetroWest Regional Hub, Wellesley, MA'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    author: 'David & Caroline Reynolds',
    location: 'Potomac, Maryland',
    homeType: '7,200 sq ft Custom Colonial',
    rating: 5,
    yearsAsMember: 6,
    quote: 'Premier Home Services has been an absolute game-changer. Between our careers and three kids, our weekends used to be completely consumed by chasing handymen, cleaning gutters, and worrying about our 3 HVAC units. Mark, our technician, knows every pipe and switch in this house better than we do.',
    highlight: 'Saved over $14,000 by catching an attic water line leak before it breached the ceiling',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&q=80'
  },
  {
    id: 't-2',
    author: 'Richard & Katherine Sterling',
    location: 'McLean, Virginia',
    homeType: '5,800 sq ft Contemporary',
    rating: 5,
    yearsAsMember: 4,
    quote: 'We travel frequently for business. Having one reliable, background-checked W-2 employee visit our home on a regular schedule gives us total peace of mind. Whenever we have a project like upgrading our exterior lighting or painting, our home manager coordinates everything seamlessly.',
    highlight: 'One call for literally anything with zero contractor headaches',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&q=80'
  },
  {
    id: 't-3',
    author: 'Elena Rostova',
    location: 'Greenwich, Connecticut',
    homeType: '6,400 sq ft Historic Estate',
    rating: 5,
    yearsAsMember: 3,
    quote: 'Older homes require constant vigilance. The comprehensive 50-point checklist keeps everything humming. They repaired sticking mahogany doors, re-caulked all marble bathrooms, and flushed our dual water heaters without me ever having to remember.',
    highlight: 'Detailed photo reports sent directly to my phone after every visit',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=240&q=80'
  },
  {
    id: 't-4',
    author: 'Marc B. Harrison',
    location: 'Buckhead, Atlanta, GA',
    homeType: '4,900 sq ft Modern Craftsman',
    rating: 5,
    yearsAsMember: 5,
    quote: 'In Atlanta’s humidity, HVAC drain lines and exterior rot can ruin a house fast. Our dedicated technician clears the condensate lines every visit and maintains our generator. The predictable monthly fee is worth every single dollar.',
    highlight: '4.9/5 verified rating on Google across hundreds of real homeowners',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80'
  }
];

export const FAQS: FaqItem[] = [
  {
    category: 'technicians',
    question: 'Who actually performs the work in my home?',
    answer: 'All routine maintenance and handyman work is performed by our full-time, W-2 employed, thoroughly background-checked technicians. Many are former military, licensed tradespeople, or career craftsmen who wear branded uniforms, drive company vehicles, and carry full liability and workers compensation insurance.'
  },
  {
    category: 'general',
    question: 'Will I have the same technician each visit?',
    answer: 'Yes! We assign a dedicated primary technician to your home. Over time, your technician builds an intimate knowledge of your home’s unique mechanical quirks, paint colors, filter sizes, shutoff valves, and family preferences.'
  },
  {
    category: 'pricing',
    question: 'What is included in the monthly membership fee?',
    answer: 'Your membership covers all scheduled proactive visits, your comprehensive 50-point seasonal checklist execution, dedicated Home Manager coordination, emergency 24/7 hotline access, and included handyman hours during each visit to knock out your personal "honey-do" repair list.'
  },
  {
    category: 'services',
    question: 'What types of handyman tasks can the technician do during visits?',
    answer: 'Our technicians can hang heavy mirrors and art, install ceiling fans, replace light switches and dimmers, re-caulk bathrooms, patch drywall, fix sticking doors and locks, replace faucet cartridges, install smart doorbells or thermostats, touch up paint, and lubricate hardware.'
  },
  {
    category: 'services',
    question: 'What happens when I need a major project like roof replacement or HVAC overhaul?',
    answer: 'That is where our dedicated Home Manager shines. We have spent 20+ years building relationships with vetted, licensed subcontractors. We gather estimates, negotiate commercial volume pricing on your behalf, schedule the contractors, supervise the work on-site, and inspect the finished product before signing off.'
  },
  {
    category: 'general',
    question: 'What if I have an emergency outside of business hours?',
    answer: 'Members have exclusive 24/7/365 emergency access. If a pipe bursts on Christmas Eve or your heat fails during a freeze, one call dispatches immediate assistance to protect your home from extensive damage.'
  },
  {
    category: 'pricing',
    question: 'Is there a long-term contract or cancellation penalty?',
    answer: 'No long-term locks. After your initial onboarding and initial baseline inspection visit, memberships operate on simple month-to-month terms with 30 days notice to pause or cancel.'
  }
];

export const SAMPLE_PORTAL_TASKS: PortalTask[] = [
  {
    id: 'pt-101',
    title: 'Spring 50-Point Preventative Maintenance',
    status: 'completed',
    date: 'March 14, 2026',
    technician: 'Mark Jenkins (Sr. Technician)',
    notes: 'Replaced 4 MERV-13 filters, flushed primary water heater, cleaned refrigerator condenser coils, tested all GFCI outlets, lubricated garage door springs. All systems operating within optimal thresholds.'
  },
  {
    id: 'pt-102',
    title: 'Guest Bath Re-Caulking & Master Closet Light Fixture Install',
    status: 'completed',
    date: 'March 14, 2026',
    technician: 'Mark Jenkins (Sr. Technician)',
    notes: 'Stripped old silicone around shower pan, re-caulked with mildew-resistant white silicone. Installed customer-supplied brass chandelier in master walk-in closet.'
  },
  {
    id: 'pt-103',
    title: 'Pre-Summer A/C Diagnostic & Exterior Hose Bib Check',
    status: 'scheduled',
    date: 'May 12, 2026',
    technician: 'Mark Jenkins (Sr. Technician)',
    notes: 'Scheduled 9:00 AM - 12:00 PM. Includes clearing condensate drain lines, inspecting outdoor compressor fins, and testing outdoor irrigation spigots.'
  }
];
