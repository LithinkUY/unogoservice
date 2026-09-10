export interface ChecklistItem {
  id: string;
  title: string;
  category: 'hvac' | 'plumbing' | 'exterior' | 'interior' | 'appliances';
  season: 'spring' | 'summer' | 'fall' | 'winter' | 'all';
  description: string;
  preventedDamage: string;
  frequency: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  visitsPerYear: number;
  frequencyLabel: string;
  baseMonthlyPrice: number;
  recommendedFor: string;
  badge?: string;
  features: string[];
  handymanHoursIncluded: string;
}

export interface ServiceArea {
  state: string;
  name: string;
  counties: string[];
  keyCities: string[];
  zipPrefixes: string[];
  phone: string;
  officeAddress: string;
}

export interface Testimonial {
  id: string;
  author: string;
  location: string;
  homeType: string;
  rating: number;
  yearsAsMember: number;
  quote: string;
  highlight: string;
  avatarUrl: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: 'general' | 'technicians' | 'pricing' | 'services';
}

export interface PortalTask {
  id: string;
  title: string;
  status: 'completed' | 'scheduled' | 'in_progress';
  date: string;
  technician: string;
  notes: string;
}

// =================== CMS & ADMIN TYPES ===================

export interface ThemeConfig {
  primaryColor: string; // e.g. '#059669' (emerald-600)
  primaryColorName: 'emerald' | 'navy' | 'blue' | 'amber' | 'crimson' | 'custom';
  secondaryColorHex: string; // e.g. '#0f2942'
  fontFamily: 'Plus Jakarta Sans' | 'Inter' | 'Outfit' | 'Roboto' | 'Montserrat';
  borderRadius: 'rounded-xl' | 'rounded-2xl' | 'rounded-3xl' | 'rounded-none';
  buttonStyle: 'rounded-xl' | 'rounded-full' | 'rounded-lg' | 'rounded-none';
  darkNavbar: boolean;
  navTextColor: string;
  navTextHoverColor: string;
  accentBadgeText: string;
}

export interface NavItemConfig {
  id: string;
  label: string;
  sectionId: string;
  enabled: boolean;
  isExternal?: boolean;
  href?: string;
}

export interface PageSection {
  id: string; // 'hero' | 'difference' | 'pillars' | 'checklist' | 'gallery' | 'pricing' | 'how-it-works' | 'service-areas' | 'reviews' | 'faq' | string
  name: string;
  enabled: boolean;
  isCustom?: boolean;
  title?: string;
  badge?: string;
  subtitle?: string;
  content?: string;
  imageUrl?: string;
  buttonText?: string;
  buttonLink?: string;
  customBadge?: string;
  customTitle?: string;
  customSubtitle?: string;
  customContent?: string;
  customButtonText?: string;
  customButtonAction?: string;
  customBgColor?: 'white' | 'slate-50' | 'slate-900';
  order?: number;
}

export interface BrandingConfig {
  title: string;
  subtitle: string;
  showShieldLogo: boolean;
  taglineBadge: string;
  logoType?: 'icon' | 'image' | 'both' | 'text';
  logoDisplayMode?: 'icon' | 'image' | 'both' | 'text';
  customLogoUrl?: string;
  logoWidth?: number;
  logoHeight?: number;
}

export interface HeaderConfig {
  topBar: {
    enabled: boolean;
    badgeText: string;
    regionsText: string;
    ratingScore: string;
    ratingReviewsCount: string;
    emergencyPhone: string;
    portalBtnText: string;
    showEmergencyBadge: boolean;
  };
  branding: BrandingConfig;
  navItems: NavItemConfig[];
  ctaButtons: {
    primaryText: string;
    primaryAction: 'walkthrough' | 'pricing' | 'portal' | 'custom';
    primaryUrl?: string;
    secondaryText: string;
    secondaryAction: 'walkthrough' | 'pricing' | 'portal' | 'custom';
    secondaryUrl?: string;
  };
  stickyHeader: boolean;
  transparentHeader: boolean;
  headerTransparency: number;
  showAdminButton: boolean;
  showScheduleButton: boolean;
  scrolledHeaderBgColor: string;
}

export interface SlideItem {
  id: string;
  type: 'image' | 'video';
  mediaUrl: string;
  posterUrl?: string;
  eyebrow: string;
  title: string;
  titleHighlight: string;
  description: string;
  primaryBtnText: string;
  primaryBtnAction: 'walkthrough' | 'pricing' | 'portal' | 'gallery';
  secondaryBtnText?: string;
  secondaryBtnAction?: 'walkthrough' | 'pricing' | 'portal' | 'gallery';
  overlayDarkness: number; // 20 to 80 percent
  align: 'left' | 'center' | 'right';
  enabled: boolean;
}

export interface SliderConfig {
  enabled: boolean;
  sliderMode: boolean; // false = static hero, true = carousel
  autoplay: boolean;
  autoplayInterval: number; // in seconds
  showArrows: boolean;
  showDots: boolean;
  slides: SlideItem[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'All' | 'HVAC & Electrical' | 'Plumbing & Tanks' | 'Carpentry & Handyman' | 'Exterior & Roof' | 'Before & After';
  type: 'single' | 'before_after' | 'video';
  imageUrl: string;
  beforeImageUrl?: string;
  afterImageUrl?: string;
  videoUrl?: string;
  description: string;
  location: string;
  completionDate?: string;
}

export interface Appointment {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  sqft: string;
  homeType: string;
  priorities: string[];
  preferredDate: string;
  preferredTime: string;
  notes: string;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  technicianAssigned?: string;
  createdAt: string;
}

export interface FooterConfig {
  newsletterBadge?: string;
  newsletterTitle: string;
  newsletterSubtitle: string;
  newsletterButtonText: string;
  brandDescription: string;
  aboutText?: string;
  emergencyPhone: string;
  phone?: string;
  emergencyDispatchText: string;
  ratingText: string;
  licenseText: string;
  licensingText?: string;
  copyrightText: string;
  companyName: string;
  establishedYear: string;
}

export interface ContentConfig {
  hero: {
    eyebrow: string;
    headlinePart1: string;
    headlineHighlight: string;
    description: string;
    zipPlaceholder: string;
    coverageButtonText: string;
    primaryBtnText: string;
    secondaryBtnText: string;
    microPillars: Array<{
      title: string;
      subtitle: string;
    }>;
  };
  difference: {
    badge: string;
    title: string;
    titleHighlight?: string;
    subtitle: string;
    items: Array<{
      traditional: string;
      premierCare?: string;
      serviceSolution?: string;
    }>;
  };
  threePillars: {
    badge: string;
    title: string;
    subtitle: string;
    pillars: Array<{
      id: string;
      title: string;
      subtitle: string;
      description: string;
      highlights: string[];
      iconName: string;
    }>;
  };
  howItWorks: {
    badge: string;
    title: string;
    subtitle: string;
    steps: Array<{
      step: number;
      title: string;
      subtitle: string;
      description: string;
    }>;
  };
  checklist: {
    badge: string;
    title: string;
    subtitle: string;
  };
  pricing: {
    badge: string;
    title: string;
    subtitle: string;
  };
  gallery: {
    badge: string;
    title: string;
    subtitle: string;
  };
  reviews: {
    badge: string;
    title: string;
    subtitle: string;
    sliderType?: 'grid' | 'carousel';
  };
  faq: {
    badge: string;
    title: string;
    subtitle: string;
  };
}

export interface SiteCMSConfig {
  theme: ThemeConfig;
  header: HeaderConfig;
  slider: SliderConfig;
  content: ContentConfig;
  sections: PageSection[];
  checklist: ChecklistItem[];
  pricingPlans: PricingPlan[];
  serviceAreas: ServiceArea[];
  testimonials: Testimonial[];
  faqs: FaqItem[];
  gallery: GalleryItem[];
  appointments: Appointment[];
  footer: FooterConfig;
}

