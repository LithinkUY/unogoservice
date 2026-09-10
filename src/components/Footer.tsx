import React, { useState } from 'react';
import {
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  Star,
  ArrowRight,
  CheckCircle2,
  UserCheck,
  Award,
  Settings,
  Sparkles
} from 'lucide-react';
import { useCms } from '../context/CmsContext';

interface FooterProps {
  onOpenWalkthrough: () => void;
  onOpenPortal: () => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenWalkthrough,
  onOpenPortal,
  onNavigateSection,
  onOpenAdmin
}) => {
  const { config } = useCms();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSent, setNewsletterSent] = useState(false);

  const footerData = config.footer;

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSent(true);
    setTimeout(() => {
      setNewsletterEmail('');
      setNewsletterSent(false);
    }, 4000);
  };

  const footerBg = footerData.footerBgColor || footerData.bgColor || '#0b1c2d';
  const footerText = footerData.footerTextColor || footerData.textColor;

  return (
    <footer 
      className="pt-16 pb-12 border-t border-slate-800"
      style={{
        backgroundColor: footerBg,
        color: footerText || undefined
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Callout Box: Seasonal Checklist Download */}
        <div className="bg-gradient-to-r from-[#112d4a] to-[#16385d] rounded-3xl p-8 mb-16 border border-slate-700/80 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center lg:text-left max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold">
              <Award className="w-3.5 h-3.5 text-emerald-400" />
              <span>{footerData.newsletterBadge || 'Free Homeowner Resource'}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {footerData.newsletterTitle || 'Get Our Seasonal Home Care Guide'}
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm">
              {footerData.newsletterSubtitle || 'Discover the exact 50 checkpoints our master technicians inspect every quarter to protect home value and prevent expensive emergencies.'}
            </p>
          </div>

          <form onSubmit={handleNewsletterSubmit} className="w-full lg:w-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your email address"
              className="px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-400 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 outline-hidden min-w-[280px]"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer whitespace-nowrap"
              style={{ backgroundColor: config.theme.primaryColor || '#059669' }}
            >
              {newsletterSent ? 'Guide Sent!' : 'Send Me the Guide'}
            </button>
          </form>
        </div>

        {/* Main Footer Links Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-slate-800">

          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              {config.header.branding.customLogoUrl ? (
                <img
                  src={config.header.branding.customLogoUrl}
                  alt={config.header.branding.title || 'Premier Home Care Logo'}
                  className="object-contain rounded-md"
                  style={{ maxHeight: '42px', maxWidth: '140px' }}
                />
              ) : (
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md"
                  style={{ backgroundColor: config.theme.primaryColor || '#059669' }}
                >
                  <ShieldCheck className="w-6 h-6" />
                </div>
              )}
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-xl font-black tracking-tight text-white">
                    {config.header.branding.title || 'PREMIER HOME CARE'}
                  </span>
                  <span
                    className="w-2 h-2 rounded-full inline-block mb-1"
                    style={{ backgroundColor: config.theme.primaryColor || '#059669' }}
                  />
                </div>
                <span className="text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase -mt-1 block">
                  {config.header.branding.subtitle || 'SERVICES & CONCIERGE'}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {footerData.description || footerData.brandDescription || footerData.aboutText || 'Founded in 2003, Premier Home Services is the premier residential preventative maintenance and home concierge management company in the United States. Your home, handled.'}
            </p>

            <div className="space-y-2 pt-2 text-xs">
              <a
                href={`tel:${footerData.phone?.replace(/\D/g, '') || '8885552273'}`}
                className="flex items-center gap-2 text-emerald-400 font-bold hover:underline"
              >
                <Phone className="w-4 h-4" />
                <span>{footerData.phone || '(888) 555-CARE (888-555-2273)'}</span>
              </a>
              <div className="text-slate-400">
                24/7/365 Dedicated Member Emergency Dispatch
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs font-bold text-white">4.9 / 5.0 (350+ Google Reviews)</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">
              Explore Services
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {footerData.quickLinks && footerData.quickLinks.length > 0 ? (
                footerData.quickLinks.map(link => (
                  <li key={link.id}>
                    <button
                      onClick={() => onNavigateSection(link.url.replace('#', ''))}
                      className="hover:text-emerald-400 transition-colors cursor-pointer"
                    >
                      {link.label}
                    </button>
                  </li>
                ))
              ) : (
                <>
                  <li><button onClick={() => onNavigateSection('how-it-works')} className="hover:text-emerald-400 transition-colors cursor-pointer">How It Works</button></li>
                  <li><button onClick={() => onNavigateSection('pillars')} className="hover:text-emerald-400 transition-colors cursor-pointer">The Three Pillars of Care</button></li>
                  <li><button onClick={() => onNavigateSection('checklist')} className="hover:text-emerald-400 transition-colors cursor-pointer">50-Point Checklist</button></li>
                  <li><button onClick={() => onNavigateSection('pricing')} className="hover:text-emerald-400 transition-colors cursor-pointer">Memberships & Pricing</button></li>
                  <li><button onClick={() => onNavigateSection('gallery')} className="hover:text-emerald-400 transition-colors cursor-pointer flex items-center gap-1.5"><span>Gallery & Projects</span><span className="text-[10px] px-1 py-0.2 rounded bg-emerald-500/30 text-emerald-300 font-bold">NEW</span></button></li>
                  <li><button onClick={() => onNavigateSection('difference')} className="hover:text-emerald-400 transition-colors cursor-pointer">The Premier Advantage</button></li>
                  <li><button onClick={() => onNavigateSection('reviews')} className="hover:text-emerald-400 transition-colors cursor-pointer">Homeowner Testimonials</button></li>
                </>
              )}
            </ul>
          </div>

          {/* Regional Hubs */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">
              Service Regions
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {footerData.serviceRegions && footerData.serviceRegions.length > 0 ? (
                footerData.serviceRegions.map(region => (
                  <li key={region.id}>{region.name}</li>
                ))
              ) : (
                <>
                  <li>Maryland (Bethesda & Potomac)</li>
                  <li>Washington D.C. (NW & Capitol Hill)</li>
                  <li>Northern Virginia (McLean & Great Falls)</li>
                  <li>Connecticut (Fairfield County)</li>
                  <li>Georgia (Buckhead & Metro Atlanta)</li>
                  <li>Florida (Palm Beach & Broward)</li>
                  <li>Illinois (Chicago North Shore)</li>
                  <li>Massachusetts (Greater Boston)</li>
                </>
              )}
            </ul>
          </div>

          {/* Member & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">
              Member & Trust
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {config.header.showScheduleButton && (
                <li>
                  <button
                    onClick={onOpenWalkthrough}
                    className="hover:text-emerald-400 transition-colors cursor-pointer"
                  >
                    Schedule Walkthrough
                  </button>
                </li>
              )}
              {onOpenAdmin && config.header.showAdminButton && (
                <li>
                  <button
                    onClick={onOpenAdmin}
                    className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1.5 cursor-pointer py-1"
                  >
                    <Settings className="w-3.5 h-3.5 text-amber-400" />
                    <span>Panel Administrador CMS</span>
                  </button>
                </li>
              )}
              {footerData.trustLinks && footerData.trustLinks.length > 0 ? (
                footerData.trustLinks.map(link => (
                  <li key={link.id}>
                    <button
                      onClick={() => onNavigateSection(link.url.replace('#', ''))}
                      className="hover:text-emerald-400 transition-colors cursor-pointer"
                    >
                      {link.label}
                    </button>
                  </li>
                ))
              ) : (
                <>
                  <li>Licensed, Bonded & Insured</li>
                  <li>100% W-2 Employed Craftsmen</li>
                  <li>Privacy Policy</li>
                  <li>Terms of Membership</li>
                </>
              )}
            </ul>
          </div>

        </div>

        {/* Bottom Disclaimers & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            {footerData.copyrightText || `© 2003–${new Date().getFullYear()} Premier Home Services, Inc. All rights reserved.`}
            {' '}{footerData.licenseText || footerData.licensingText || 'Licensed in MD, DC, VA, CT, GA, FL, IL & MA.'}
          </div>

          <div className="flex items-center gap-4 flex-wrap justify-center">
            <span>MHIC #91288</span>
            <span>•</span>
            <span>VA Class A Contractor</span>
            <span>•</span>
            {onOpenAdmin && config.header.showAdminButton && (
              <button
                onClick={onOpenAdmin}
                className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 cursor-pointer"
              >
                <Settings className="w-3 h-3" />
                <span>Admin CMS</span>
              </button>
            )}
            <span>•</span>
            <span className="text-slate-400">Your Home, Handled.</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
