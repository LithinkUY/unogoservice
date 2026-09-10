import React, { useState, useEffect } from 'react';
import {
  Phone,
  Calendar,
  UserCheck,
  Menu,
  X,
  ShieldCheck,
  MapPin,
  Star,
  ChevronRight,
  Settings,
  Sparkles,
  MessageCircle
} from 'lucide-react';
import { useCms } from '../context/CmsContext';

interface HeaderProps {
  onOpenWalkthrough: () => void;
  onOpenPortal: () => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenAdmin: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenWalkthrough,
  onOpenPortal,
  onNavigateSection,
  onOpenAdmin
}) => {
  const { config } = useCms();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    onNavigateSection(sectionId);
    setMobileMenuOpen(false);
  };

  const handleCtaAction = (action: string) => {
    if (action === 'walkthrough') onOpenWalkthrough();
    else if (action === 'portal') onOpenPortal();
    else if (action === 'pricing') onNavigateSection('pricing');
    else onOpenWalkthrough();
  };

  const isDark = config.theme.darkNavbar;
  const useTransparent = config.header.transparentHeader && !scrolled;
  const acrossScrollMode = config.header.stickyHeader !== false;
  const transparency = Math.max(0, Math.min(100, config.header.headerTransparency ?? 80));
  const navTextColor = config.theme.navTextColor || '#0f2942';
  const navTextHoverColor = config.theme.navTextHoverColor || navTextColor;
  const whatsappPhone = (config.header.topBar.emergencyPhone || '(888) 555-CARE').replace(/\D/g, '') || '8885552273';
  const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent('Hola, me gustaría conocer más sobre sus servicios.')}`;

  const getSolidHeaderColor = (hex: string, alphaPercent: number) => {
    const normalized = hex.replace('#', '');
    const fullHex = normalized.length === 3
      ? normalized.split('').map((char) => char + char).join('')
      : normalized;

    const alpha = Math.round((alphaPercent / 100) * 255);
    const alphaHex = alpha.toString(16).padStart(2, '0');

    return `#${fullHex}${alphaHex}`;
  };

  const headerClasses = `w-full backdrop-blur-xl border-b shadow-[0_10px_30px_rgba(15,41,66,0.12)] transition-all duration-300 ${acrossScrollMode ? 'sticky top-0 z-40' : ''
    } ${useTransparent
      ? 'border-transparent text-white'
      : isDark
        ? 'bg-[#0b1c2d]/95 text-white border-slate-800'
        : 'bg-white/95 text-slate-800 border-slate-200/80'
    }`;

  const headerStyle = useTransparent
    ? {
      backgroundColor: getSolidHeaderColor(config.header.scrolledHeaderBgColor || '#0f2942', transparency),
      borderColor: getSolidHeaderColor(config.header.scrolledHeaderBgColor || '#0f2942', transparency)
    }
    : {
      backgroundColor: scrolled ? (config.header.scrolledHeaderBgColor || '#0f2942') : undefined,
    };

  const topBarClasses = useTransparent
    ? 'border-transparent text-white'
    : 'bg-[#0f2942] text-slate-100 border-slate-800';

  const navTextClasses = 'transition-colors';
  const navTextStyle = useTransparent
    ? { color: navTextColor || '#ffffff' }
    : { color: navTextColor || '#0f2942' };

  const getNavTextStyle = (isHovered: boolean) => ({
    color: isHovered ? navTextHoverColor : navTextColor
  });

  return (
    <header className={headerClasses} style={headerStyle}>

      {/* Top Announcement Bar */}
      {config.header.topBar.enabled && (
        <div
          className={`${topBarClasses} text-xs sm:text-sm py-2 px-4 border-b transition-colors duration-300`}
          style={useTransparent ? { backgroundColor: getSolidHeaderColor(config.header.scrolledHeaderBgColor || '#0f2942', transparency) } : undefined}
        >
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">

            <div className="flex items-center gap-2 text-center sm:text-left flex-wrap justify-center sm:justify-start">
              {config.header.topBar.badgeText && (
                <span
                  className="inline-flex items-center px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-bold text-white tracking-wide"
                  style={{ backgroundColor: config.theme.primaryColor || '#059669' }}
                >
                  {config.header.topBar.badgeText}
                </span>
              )}

              {config.header.topBar.regionsText && (
                <span className="text-slate-300 hidden md:inline text-xs">
                  {config.header.topBar.regionsText}
                </span>
              )}

              {config.header.topBar.ratingScore && (
                <span className="inline-flex items-center gap-1 text-amber-400 font-bold text-xs">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  {config.header.topBar.ratingScore} ({config.header.topBar.ratingReviewsCount})
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 sm:gap-4 text-xs">
              <a
                href={`tel:${config.header.topBar.emergencyPhone?.replace(/\D/g, '') || '8885552273'}`}
                className="flex items-center gap-1.5 text-slate-200 hover:text-emerald-400 font-semibold transition-colors whitespace-nowrap"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{config.header.topBar.emergencyPhone || '(888) 555-CARE'}</span>
              </a>

              <span className="text-slate-600">|</span>

              {config.header.topBar.portalBtnText && (
                <button
                  onClick={onOpenPortal}
                  className="flex items-center gap-1 text-slate-200 hover:text-emerald-300 font-medium transition-colors cursor-pointer"
                >
                  <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{config.header.topBar.portalBtnText}</span>
                </button>
              )}

              {config.header.topBar.showEmergencyBadge && (
                <>
                  <span className="text-slate-600 hidden lg:inline">|</span>
                  <span className="hidden lg:inline-flex items-center gap-1.5 text-emerald-400 font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>24/7 Dispatch</span>
                  </span>
                </>
              )}

              {/* Admin CMS Quick Shortcut */}
              {config.header.showAdminButton && (
                <>
                  <span className="text-slate-600">|</span>
                  <button
                    onClick={onOpenAdmin}
                    title="Abrir Panel Administrador CMS"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-400/40 text-[11px] font-bold cursor-pointer transition-all hover:scale-105"
                  >
                    <Settings className="w-3 h-3" />
                    <span>CMS Admin</span>
                  </button>
                </>
              )}

            </div>
          </div>
        </div>
      )}

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo & Branding */}
          <div
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            {/* Custom Image Logo or Icon */}
            {(config.header.branding.logoDisplayMode || config.header.branding.logoType) !== 'text' && (
              <>
                {config.header.branding.customLogoUrl ? (
                  <img
                    src={config.header.branding.customLogoUrl}
                    alt={config.header.branding.title || 'Premier Home Care Logo'}
                    className="object-contain group-hover:scale-105 transition-transform rounded-md"
                    style={{
                      maxHeight: config.header.branding.logoHeight ? `${config.header.branding.logoHeight}px` : '44px',
                      maxWidth: config.header.branding.logoWidth ? `${config.header.branding.logoWidth * 2.5}px` : '160px'
                    }}
                  />
                ) : config.header.branding.showShieldLogo ? (
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform"
                    style={{ backgroundColor: config.theme.secondaryColorHex || '#0f2942' }}
                  >
                    <ShieldCheck className="w-7 h-7 text-emerald-400" />
                  </div>
                ) : null}
              </>
            )}

            {/* Text Branding */}
            {(config.header.branding.logoDisplayMode || config.header.branding.logoType) !== 'image' && (
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className={`text-xl sm:text-2xl font-black tracking-tight ${isDark ? 'text-white' : 'text-[#0f2942]'}`}>
                    {config.header.branding.title || 'PREMIER HOME CARE'}
                  </span>
                  <span
                    className="w-2 h-2 rounded-full inline-block mb-1"
                    style={{ backgroundColor: config.theme.primaryColor || '#059669' }}
                  />
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-slate-400 uppercase -mt-1">
                  {config.header.branding.subtitle || 'SERVICES & CONCIERGE'}
                </span>
              </div>
            )}
          </div>

          {/* Desktop Nav Links from CMS */}
          <nav className="hidden lg:flex items-center gap-6 text-xs sm:text-sm font-semibold">
            {config.header.navItems
              .filter(item => item.enabled)
              .map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.sectionId)}
                  className={`cursor-pointer py-1.5 relative ${navTextClasses}`}
                  style={getNavTextStyle(false)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = navTextHoverColor;
                    const underline = e.currentTarget.querySelector('[data-nav-underline]') as HTMLElement | null;
                    if (underline) underline.style.transform = 'scaleX(1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = navTextColor;
                    const underline = e.currentTarget.querySelector('[data-nav-underline]') as HTMLElement | null;
                    if (underline) underline.style.transform = 'scaleX(0)';
                  }}
                >
                  <span>{item.label}</span>
                  <span
                    data-nav-underline
                    className="absolute left-0 bottom-0 h-[2px] w-full rounded-full origin-left transition-transform duration-200"
                    style={{
                      backgroundColor: navTextHoverColor,
                      transform: 'scaleX(0)'
                    }}
                  />
                </button>
              ))}
          </nav>

          {/* Header Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">

            {/* CMS Panel Button */}
            {config.header.showAdminButton && (
              <button
                onClick={onOpenAdmin}
                className={`p-2.5 rounded-xl border flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer ${isDark
                  ? 'border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700'
                  : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                title="Abrir Panel Administrador CMS"
              >
                <Settings className="w-4 h-4 text-emerald-600 animate-spin-slow" />
                <span className="hidden xl:inline">Panel CMS</span>
              </button>
            )}

            {/* Secondary CTA */}
            {config.header.ctaButtons.secondaryText && (
              <button
                onClick={() => handleCtaAction(config.header.ctaButtons.secondaryAction)}
                className={`px-3.5 py-2.5 text-xs sm:text-sm font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${config.theme.buttonStyle || 'rounded-xl'
                  } ${isDark
                    ? 'border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700'
                    : 'border-slate-300 bg-white hover:bg-slate-50 text-slate-700'
                  }`}
              >
                <UserCheck className="w-4 h-4 text-emerald-600" />
                <span>{config.header.ctaButtons.secondaryText}</span>
              </button>
            )}

            {/* Primary CTA */}
            {config.header.showScheduleButton && config.header.ctaButtons.primaryText && (
              <button
                onClick={() => handleCtaAction(config.header.ctaButtons.primaryAction)}
                className={`px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md transition-all flex items-center gap-2 cursor-pointer group ${config.theme.buttonStyle || 'rounded-xl'
                  }`}
                style={{ backgroundColor: config.theme.primaryColor || '#059669' }}
              >
                <Calendar className="w-4 h-4 text-emerald-100 group-hover:scale-110 transition-transform" />
                <span>{config.header.ctaButtons.primaryText}</span>
              </button>
            )}

          </div>

          {/* Mobile menu triggers */}
          <div className="lg:hidden flex items-center gap-2">
            {config.header.showAdminButton && (
              <button
                onClick={onOpenAdmin}
                className="p-2 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200"
                title="Admin CMS"
              >
                <Settings className="w-4 h-4" />
              </button>
            )}

            {config.header.showScheduleButton && (
              <button
                onClick={() => handleCtaAction(config.header.ctaButtons.primaryAction)}
                className="sm:hidden px-3 py-1.5 rounded-lg text-white text-xs font-bold shadow-xs"
                style={{ backgroundColor: config.theme.primaryColor || '#059669' }}
              >
                Walkthrough
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-hidden cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Contactar por WhatsApp"
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full text-white shadow-[0_20px_45px_rgba(37,211,102,0.4)] transition-all duration-300 hover:scale-105 hover:shadow-[0_24px_50px_rgba(37,211,102,0.5)]"
        style={{ backgroundColor: '#25D366' }}
      >
        <MessageCircle className="h-7 w-7" />
      </a>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className={`lg:hidden border-b px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200 ${isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'
          }`}>
          <div className="flex flex-col space-y-2 text-sm font-semibold pt-1">
            {config.header.navItems
              .filter(item => item.enabled)
              .map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.sectionId)}
                  className={`text-left px-3 py-2 rounded-lg flex items-center justify-between cursor-pointer ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-50'
                    }`}
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
              ))}

            {/* Mobile Admin Link */}
            {config.header.showAdminButton && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="text-left px-3 py-2 rounded-lg bg-emerald-500/10 text-emerald-700 font-bold flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  <span>Panel Administrador CMS</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-600 text-white">ADMIN</span>
              </button>
            )}
          </div>

          {config.header.ctaButtons.secondaryText && (
            <div className="pt-3 border-t border-slate-200/50 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  onOpenPortal();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 rounded-lg border border-slate-300 font-bold text-slate-700 flex items-center justify-center gap-2 hover:bg-slate-50 text-sm cursor-pointer"
              >
                <UserCheck className="w-4 h-4 text-emerald-600" />
                <span>{config.header.ctaButtons.secondaryText}</span>
              </button>
            </div>
          )}
        </div>
      )}

    </header>
  );
};
