import { SiteCMSConfig, GalleryItem, Appointment, ClientRecord, PageSection } from '../types';
import {
  CHECKLIST_ITEMS,
  PRICING_PLANS,
  SERVICE_AREAS,
  TESTIMONIALS,
  FAQS
} from './mockData';

export const DEFAULT_PAGE_SECTIONS: PageSection[] = [
  { id: 'hero', name: 'Hero / Carrusel Principal', enabled: true },
  { id: 'difference', name: 'La Diferencia & Ventajas', enabled: true },
  { id: 'pillars', name: 'Los 3 Pilares del Cuidado', enabled: true },
  { id: 'gallery', name: 'Galería de Proyectos & Antes y Después', enabled: true },
  { id: 'pricing', name: 'Planes de Membresía & Precios', enabled: true },
  { id: 'how-it-works', name: 'Cómo Funciona (4 Pasos)', enabled: true },
  { id: 'service-areas', name: 'Áreas de Servicio & Cobertura', enabled: true },
  { id: 'reviews', name: 'Testimonios & Reseñas de Clientes', enabled: true },
  { id: 'faq', name: 'Preguntas Frecuentes (FAQ)', enabled: true }
];

export const DEFAULT_GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Dual 75-Gal Water Heater Flush & Sediment Purge',
    category: 'Plumbing & Tanks',
    type: 'before_after',
    imageUrl: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=1200&q=80',
    beforeImageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
    afterImageUrl: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=800&q=80',
    description: 'Extracted 12 lbs of mineral calcium sediment from the tank basin, tested temperature/pressure relief valve, and inspected anode rod to prevent tank bottom blowout.',
    location: 'Potomac, MD',
    completionDate: 'Spring 2026'
  },
  {
    id: 'gal-2',
    title: 'A/C Condenser Coil Cleanout & Enzymatic Drain Flush',
    category: 'HVAC & Electrical',
    type: 'before_after',
    imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80',
    beforeImageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    afterImageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
    description: 'De-fouled outdoor condenser aluminum fins, increasing heat exchange efficiency by 22% and clearing drip pan drain line before summer humidity peak.',
    location: 'Bethesda, MD',
    completionDate: 'Summer 2026'
  },
  {
    id: 'gal-3',
    title: 'Master Closet Lighting Upgrade & Solid Oak Shelving',
    category: 'Carpentry & Handyman',
    type: 'single',
    imageUrl: 'https://images.unsplash.com/photo-1558997519-83ea9252def8?auto=format&fit=crop&w=1200&q=80',
    description: 'Completed during included monthly handyman visit hours. Installed modern recessed dimmable LED fixtures and custom shoe cubbies without outside contractor surcharges.',
    location: 'McLean, VA',
    completionDate: 'Winter 2026'
  },
  {
    id: 'gal-4',
    title: 'Seamless Copper Gutter Inspection & Downspout Clear',
    category: 'Exterior & Roof',
    type: 'before_after',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    beforeImageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    afterImageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    description: 'Checked slope angles, extracted oak leaf debris from 80 feet of gutters, and verified underground discharge pipes 25 feet away from the basement foundation.',
    location: 'Greenwich, CT',
    completionDate: 'Fall 2025'
  },
  {
    id: 'gal-5',
    title: 'Generac 24kW Standby Generator Oil & Battery Diagnostic',
    category: 'HVAC & Electrical',
    type: 'single',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    description: 'Simulated automatic transfer switch actuation, replaced spark plugs and synthetic oil, tested starter battery under 100A load before hurricane season.',
    location: 'Buckhead, Atlanta, GA',
    completionDate: 'Summer 2026'
  },
  {
    id: 'gal-6',
    title: 'Full 50-Point Mechanical & Structural Walkthrough',
    category: 'All',
    type: 'video',
    imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-working-with-a-wrench-on-a-pipe-43400-large.mp4',
    description: 'Watch Senior Technician Mark Jenkins conduct a live basement-to-attic preventative maintenance audit on a 6,500 sq ft residence.',
    location: 'Potomac, MD',
    completionDate: 'Spring 2026'
  }
];

export const DEFAULT_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-101',
    fullName: 'Robert & Elizabeth Vance',
    phone: '(301) 840-1920',
    email: 'rvance@vanceholdings.com',
    address: '10820 River Road',
    city: 'Potomac',
    state: 'MD',
    zip: '20854',
    sqft: '6,200 sq ft',
    homeType: 'Single Family Home',
    priorities: ['Preventative Maintenance', 'Handyman Honey-Do Repairs', 'Hidden leak inspection'],
    preferredDate: '2026-09-18',
    preferredTime: 'Morning (9am - 12pm)',
    notes: 'Upstairs heat pump makes whistling noise; master bath jacuzzi tub drain is slow.',
    status: 'confirmed',
    technicianAssigned: 'Mark Jenkins (Sr. Lead)',
    createdAt: '2026-09-08'
  },
  {
    id: 'apt-102',
    fullName: 'Victoria Montgomery',
    phone: '(202) 641-0021',
    email: 'vmontgomery@lawcapital.org',
    address: '3245 S Street NW',
    city: 'Washington',
    state: 'DC',
    zip: '20007',
    sqft: '4,800 sq ft',
    homeType: 'Historic Townhome',
    priorities: ['Preventative Maintenance', 'Frequent business travel oversight'],
    preferredDate: '2026-09-21',
    preferredTime: 'Afternoon (1pm - 4pm)',
    notes: 'Need someone to look at the radiator valves and test the basement sump pump before winter.',
    status: 'pending',
    technicianAssigned: 'David Ross',
    createdAt: '2026-09-09'
  },
  {
    id: 'apt-103',
    fullName: 'Jonathan & Claire Sterling',
    phone: '(703) 980-5541',
    email: 'jsterling@sterlingpartners.net',
    address: '1104 Langley Hill Dr',
    city: 'McLean',
    state: 'VA',
    zip: '22101',
    sqft: '8,400 sq ft (Estate)',
    homeType: 'Luxury Estate',
    priorities: ['Preventative Maintenance', 'Major upcoming project', 'Sick of chasing unreliable contractors'],
    preferredDate: '2026-09-15',
    preferredTime: 'Morning (9am - 12pm)',
    notes: 'Interested in the Monthly Premier plan. Have 4 HVAC zones and backup generator.',
    status: 'confirmed',
    technicianAssigned: 'Mark Jenkins (Sr. Lead)',
    createdAt: '2026-09-07'
  },
  {
    id: 'apt-104',
    fullName: 'Arthur Pendelton',
    phone: '(203) 869-2311',
    email: 'apendelton@greenwichinvest.com',
    address: '42 Round Hill Road',
    city: 'Greenwich',
    state: 'CT',
    zip: '06831',
    sqft: '7,500+ sq ft (Estate)',
    homeType: 'Historic Property',
    priorities: ['Preventative Maintenance', 'Handyman Honey-Do Repairs'],
    preferredDate: '2026-09-12',
    preferredTime: 'Morning (9am - 12pm)',
    notes: 'Walkthrough completed. Proposed Bi-Monthly Pro plan approved. First baseline audit scheduled.',
    status: 'completed',
    technicianAssigned: 'Christopher Vance',
    createdAt: '2026-09-01'
  }
];

export const DEFAULT_CLIENTS: ClientRecord[] = [
  {
    id: 'client-101',
    fullName: 'Robert & Elizabeth Vance',
    phone: '(301) 840-1920',
    email: 'rvance@vanceholdings.com',
    address: '10820 River Road',
    city: 'Potomac',
    state: 'MD',
    zip: '20854',
    sqft: '6,200 sq ft',
    homeType: 'Single Family Home',
    serviceType: 'Premier Care',
    priorities: ['Preventative Maintenance', 'Handyman Honey-Do Repairs'],
    notes: 'Prefers morning visits and annual water heater flush.',
    status: 'active',
    createdAt: '2026-09-08'
  },
  {
    id: 'client-102',
    fullName: 'Victoria Montgomery',
    phone: '(202) 641-0021',
    email: 'vmontgomery@lawcapital.org',
    address: '3245 S Street NW',
    city: 'Washington',
    state: 'DC',
    zip: '20007',
    sqft: '4,800 sq ft',
    homeType: 'Historic Townhome',
    serviceType: 'Bi-Monthly Care',
    priorities: ['Preventative Maintenance'],
    notes: 'Needs backup support during frequent business travel.',
    status: 'active',
    createdAt: '2026-09-09'
  },
  {
    id: 'client-103',
    fullName: 'Jonathan & Claire Sterling',
    phone: '(703) 980-5541',
    email: 'jsterling@sterlingpartners.net',
    address: '1104 Langley Hill Dr',
    city: 'McLean',
    state: 'VA',
    zip: '22101',
    sqft: '8,400 sq ft (Estate)',
    homeType: 'Luxury Estate',
    serviceType: 'Monthly Concierge',
    priorities: ['Major upcoming project', 'Hidden leak inspection'],
    notes: 'Interested in a dedicated technician and renovation oversight.',
    status: 'active',
    createdAt: '2026-09-07'
  }
];

export const DEFAULT_CMS_CONFIG: SiteCMSConfig = {
  theme: {
    primaryColor: '#059669', // Emerald 600
    primaryColorName: 'emerald',
    secondaryColorHex: '#0f2942',
    fontFamily: 'Plus Jakarta Sans',
    borderRadius: 'rounded-2xl',
    buttonStyle: 'rounded-xl',
    darkNavbar: false,
    navTextColor: '#0f2942',
    navTextHoverColor: '#0f2942',
    accentBadgeText: 'TRUSTED SINCE 2003'
  },
  header: {
    topBar: {
      enabled: true,
      badgeText: 'TRUSTED SINCE 2003',
      regionsText: 'Serving MD, DC, VA, CT, GA, FL, IL & MA Fine Homes',
      ratingScore: '4.9/5',
      ratingReviewsCount: '350+ Reviews',
      emergencyPhone: '(888) 555-CARE',
      portalBtnText: '',
      showEmergencyBadge: true
    },
    branding: {
      title: 'PREMIER HOME CARE',
      subtitle: 'SERVICES & CONCIERGE',
      showShieldLogo: true,
      taglineBadge: 'W-2 CRAFTSMEN',
      logoType: 'both',
      customLogoUrl: '',
      logoWidth: 44,
      logoHeight: 44
    },
    navItems: [
      { id: 'nav-1', label: 'How It Works', sectionId: 'how-it-works', enabled: true },
      { id: 'nav-2', label: 'The 3 Pillars', sectionId: 'pillars', enabled: true },
      { id: 'nav-3', label: 'Plans & Pricing', sectionId: 'pricing', enabled: true },
      { id: 'nav-4', label: 'Projects & Gallery', sectionId: 'gallery', enabled: true },
      { id: 'nav-5', label: 'Service Areas', sectionId: 'service-areas', enabled: true },
      { id: 'nav-6', label: 'Reviews', sectionId: 'reviews', enabled: true },
      { id: 'nav-7', label: 'FAQ', sectionId: 'faqs', enabled: true }
    ],
    ctaButtons: {
      primaryText: 'Schedule Walkthrough',
      primaryAction: 'walkthrough',
      secondaryText: '',
      secondaryAction: 'portal'
    },
    stickyHeader: true,
    transparentHeader: true,
    headerTransparency: 80,
    whatsappEnabled: true,
    whatsappPhone: '(888) 555-CARE',
    whatsappMessage: 'Hola, me gustaría conocer más sobre sus servicios.',
    showAdminButton: true,
    showScheduleButton: true,
    scrolledHeaderBgColor: '#0f2942'
  },
  slider: {
    enabled: true,
    sliderMode: true, // True allows carousel sliding between rich visual slides
    autoplay: true,
    autoplayInterval: 7, // 7 seconds
    showArrows: true,
    showDots: true,
    slides: [
      {
        id: 'slide-1',
        type: 'image',
        mediaUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=80',
        posterUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
        eyebrow: 'PREVENTATIVE CARE & CONCIERGE',
        title: 'Your Home,',
        titleHighlight: 'Handled.',
        description: 'Proactive seasonal maintenance, routine handyman repairs, and white-glove project management. One dedicated, background-checked W-2 technician. Zero contractor headaches.',
        primaryBtnText: 'Schedule Complimentary Walkthrough',
        primaryBtnAction: 'walkthrough',
        secondaryBtnText: 'Calculate Your Plan',
        secondaryBtnAction: 'pricing',
        overlayDarkness: 45,
        align: 'left',
        enabled: true
      },
      {
        id: 'slide-2',
        type: 'image',
        mediaUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1800&q=80',
        posterUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
        eyebrow: '100% W-2 EMPLOYED TECHNICIANS',
        title: 'The Trusted Craftsman',
        titleHighlight: 'Who Knows Your Home.',
        description: 'No random sub-contractors or revolving strangers in your house. You are paired with a licensed, career technician who knows every water shutoff, filter size, and mechanical quirk.',
        primaryBtnText: 'Explore Project Gallery',
        primaryBtnAction: 'gallery',
        secondaryBtnText: 'Meet Your Technician',
        secondaryBtnAction: 'portal',
        overlayDarkness: 50,
        align: 'left',
        enabled: true
      },
      {
        id: 'slide-3',
        type: 'image',
        mediaUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1800&q=80',
        posterUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
        eyebrow: 'PREVENT CATASTROPHIC EMERGENCIES',
        title: '50-Point Audit Protects',
        titleHighlight: 'Home Value & Safety.',
        description: 'Water heaters flushed, compressor coils vacuumed, sump pumps load-tested, and gutters cleared before expensive ceiling leaks or electrical fires can start.',
        primaryBtnText: 'Explore 50-Point Checklist',
        primaryBtnAction: 'pricing',
        secondaryBtnText: 'Book Free Assessment',
        secondaryBtnAction: 'walkthrough',
        overlayDarkness: 55,
        align: 'left',
        enabled: true
      }
    ]
  },
  content: {
    hero: {
      eyebrow: 'Proactive Home Care • Serving Discerning Homeowners Since 2003',
      headlinePart1: 'Your Home,',
      headlineHighlight: 'Handled.',
      description: 'Proactive seasonal maintenance, routine handyman repairs, and full-service project management. One dedicated, background-checked W-2 technician. Zero contractor headaches.',
      zipPlaceholder: 'Enter your zip code (e.g. 20854, 22101, 06880)',
      coverageButtonText: 'Check Coverage',
      primaryBtnText: 'Schedule Complimentary Walkthrough',
      secondaryBtnText: 'Calculate Your Plan',
      microPillars: [
        { title: '50-Point Checklist', subtitle: 'Proactive seasonal audits catch damage before it starts' },
        { title: 'Included Handyman', subtitle: 'Repairs, fixtures & caulking tackled every visit' },
        { title: '24/7 On-Call Support', subtitle: 'Emergency response whenever systems fail' }
      ]
    },
    difference: {
      badge: 'The Premier Care Advantage',
      title: 'Stop Juggling 15 Unreliable Contractors',
      subtitle: 'See why fine homeowners across the Mid-Atlantic and East Coast rely on our single-point-of-contact care model.',
      items: [
        {
          traditional: 'You spend weekends calling unvetted handymen, leaving voicemails, and waiting around during 5-hour arrival windows.',
          premierCare: 'One dedicated, background-checked W-2 technician arrives on a reliable recurring schedule you can set your watch by.',
          serviceSolution: 'One dedicated, background-checked W-2 technician arrives on a reliable recurring schedule you can set your watch by.'
        },
        {
          traditional: 'Minor issues (drywall cracks, loose hinges, slow drains) get ignored until they turn into $5,000+ repair emergencies.',
          premierCare: 'Every visit includes dedicated handyman hours to tackle your personal "honey-do" repair list before issues compound.',
          serviceSolution: 'Every visit includes dedicated handyman hours to tackle your personal "honey-do" repair list before issues compound.'
        },
        {
          traditional: 'You have no idea when water heaters were flushed, filters replaced, or sump pumps tested until the basement floods.',
          premierCare: 'Rigorous 50-point seasonal audits log every serial number, filter size, and test result into your digital homeowner portal.',
          serviceSolution: 'Rigorous 50-point seasonal audits log every serial number, filter size, and test result into your digital homeowner portal.'
        },
        {
          traditional: 'When big projects arise (roofing, HVAC replacements, painting), you have to solicit 4 blind bids with zero leverage.',
          premierCare: 'Your Senior Home Manager negotiates pre-vetted volume pricing, schedules contractors, and supervises on-site quality.',
          serviceSolution: 'Your Senior Home Manager negotiates pre-vetted volume pricing, schedules contractors, and supervises on-site quality.'
        }
      ]
    },
    threePillars: {
      badge: 'Comprehensive Care Matrix',
      title: 'The Three Pillars of Comprehensive Home Care',
      subtitle: 'From baseline seasonal mechanics to complex renovations, your residence is protected by our triple-layer management system.',
      pillars: [
        {
          id: 'p-1',
          title: 'Preventative Maintenance',
          subtitle: 'Baseline Mechanical & Structural Defense',
          description: 'Our certified technicians execute a thorough 50-point inspection quarterly, bi-monthly, or monthly. We service water heaters, vacuum refrigerator coils, test GFCI breakers, and winterize exterior spigots.',
          highlights: ['Prevents sudden $10,000+ water floods', 'Extends mechanical equipment lifespan by 30-40%', 'Includes MERV filter replacements and coil cleans'],
          iconName: 'ShieldCheck'
        },
        {
          id: 'p-2',
          title: 'Included Handyman Repairs',
          subtitle: 'Your Personal Honey-Do List Tackled',
          description: 'Every single scheduled visit includes dedicated handyman labor hours. Have a sticking pocket door? Loose chandelier? Drywall ding? Our technicians come equipped to fix it right away.',
          highlights: ['No trip fees or inflated hourly contractor minimums', 'Art hanging, lighting, smart locks, door repairs', 'Re-caulking tubs, showers, and exterior penetrations'],
          iconName: 'Wrench'
        },
        {
          id: 'p-3',
          title: 'Project & Subcontractor Oversight',
          subtitle: 'White-Glove Construction Management',
          description: 'When it is time for a new roof, driveway paving, exterior painting, or HVAC replacement, you do not have to lift a finger. We leverage 20+ years of vetted subcontractor relationships.',
          highlights: ['Volume subcontractor pricing passed directly to you', 'Senior Home Manager manages quotes, schedule, and cleanup', 'Final inspection and sign-off before invoice payment'],
          iconName: 'UserCheck'
        }
      ]
    },
    howItWorks: {
      badge: 'Streamlined Onboarding',
      title: 'How Premier Care Works in 4 Simple Steps',
      subtitle: 'Getting started is seamless, free of charge, and requires zero long-term contractual commitments.',
      steps: [
        {
          step: 1,
          title: 'Complimentary Home Walkthrough',
          subtitle: 'Zero Cost / Zero Obligation',
          description: 'A Senior Home Manager conducts a thorough 60-minute walk through of your residence, documenting HVAC units, water heaters, roof age, and special quirks.'
        },
        {
          step: 2,
          title: 'Tailored Home Care Proposal',
          subtitle: 'Transparent Monthly Pricing',
          description: 'We calculate your custom membership tier based on your square footage and mechanical complexity. No hidden fees, surprise invoices, or markups.'
        },
        {
          step: 3,
          title: 'Dedicated Technician Assigned',
          subtitle: 'Your Trusted Household Partner',
          description: 'You are matched with a permanent, background-checked W-2 technician who learns your home inside out and visits on your preferred recurring cadence.'
        },
        {
          step: 4,
          title: 'Digital Reports & Total Peace of Mind',
          subtitle: 'Complete Transparency in Portal',
          description: 'After every visit, receive a detailed photographic report logging work completed, items serviced, and any recommendations for future maintenance.'
        }
      ]
    },
    checklist: {
      badge: 'Proactive Standards',
      title: 'The 50-Point Preventative Inspection',
      subtitle: 'See what our technicians inspect, service, and document to keep your home running at peak performance all year round.'
    },
    pricing: {
      badge: 'Transparent Memberships',
      title: 'Simple, Predictable Monthly Care Plans',
      subtitle: 'Choose the cadence that fits your residence. Adjust square footage below to see real-time estimated pricing.'
    },
    gallery: {
      badge: 'Craftsmanship In Action',
      title: 'Before & After Project Showcase',
      subtitle: 'See real transformations, maintenance checkpoints, and repairs completed by our full-time W-2 technicians.'
    },
    reviews: {
      badge: 'Real Homeowners',
      title: 'Trusted by Over 1,500 Fine Residences',
      subtitle: 'Read authentic reviews from homeowners who reclaimed their weekends and protected their properties.',
      sliderType: 'grid'
    },
    faq: {
      badge: 'Clear Answers',
      title: 'Frequently Asked Questions',
      subtitle: 'Everything you need to know about our preventative maintenance protocol, dedicated technicians, and membership terms.'
    }
  },
  sections: DEFAULT_PAGE_SECTIONS,
  checklist: CHECKLIST_ITEMS,
  pricingPlans: PRICING_PLANS,
  serviceAreas: SERVICE_AREAS,
  testimonials: TESTIMONIALS,
  faqs: FAQS,
  gallery: DEFAULT_GALLERY_ITEMS,
  appointments: DEFAULT_APPOINTMENTS,
  clients: DEFAULT_CLIENTS,
  adminUsername: 'admin',
  adminPassword: 'admin',
  footer: {
    newsletterTitle: 'Get Our Seasonal Home Care Guide',
    newsletterSubtitle: 'Discover the exact 50 checkpoints our master technicians inspect every quarter to protect home value and prevent expensive emergencies.',
    newsletterButtonText: 'Send Me the Guide',
    brandDescription: 'Founded in 2003, Premier Home Services is the premier residential preventative maintenance and home concierge management company in the United States. Your home, handled.',
    emergencyPhone: '(888) 555-CARE (888-555-2273)',
    emergencyDispatchText: '24/7/365 Dedicated Member Emergency Dispatch Hotline',
    ratingText: '4.9 / 5.0 (350+ Verified Google Reviews)',
    licenseText: 'MHIC #91288 • VA Class A Contractor • CT HIC #0634192 • GA Residential',
    copyrightText: 'Premier Home Services, Inc. All rights reserved. Licensed in MD, DC, VA, CT, GA, FL, IL & MA.',
    companyName: 'Premier Home Services',
    establishedYear: '2003'
  }
};
