import React, { useState, useEffect } from 'react';
import { CmsProvider, useCms } from './context/CmsContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TheDifference } from './components/TheDifference';
import { ThreePillars } from './components/ThreePillars';
import { ChecklistSection } from './components/ChecklistSection';
import { GallerySection } from './components/GallerySection';
import { PricingCalculator } from './components/PricingCalculator';
import { HowItWorks } from './components/HowItWorks';
import { ServiceAreaSection } from './components/ServiceAreaSection';
import { ReviewsSection } from './components/ReviewsSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { ClientPortalModal } from './components/ClientPortalModal';
import { WalkthroughModal } from './components/WalkthroughModal';
import { AdminCMSModal } from './components/AdminCMSModal';
import { Phone, Calendar, CheckCircle2 } from 'lucide-react';
import { PageSection } from './types';

function AdminPage({ onBackToSite }: { onBackToSite: () => void }) {
  const { config } = useCms();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [authenticated, setAuthenticated] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('hasslefree_admin_auth') === 'true';
  });

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();

    const adminUsername = config.adminUsername?.trim() || 'admin';
    const adminPassword = config.adminPassword?.trim() || 'admin';

    if (username === adminUsername && password === adminPassword) {
      setError('');
      setAuthenticated(true);
      if (typeof window !== 'undefined') {
        localStorage.setItem('hasslefree_admin_auth', 'true');
      }
      return;
    }

    setError('Usuario o contraseña incorrectos. Usa admin / admin');
  };

  const handleLogout = () => {
    setAuthenticated(false);
    setUsername('');
    setPassword('');
    if (typeof window !== 'undefined') {
      localStorage.removeItem('hasslefree_admin_auth');
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0f2942] text-white shadow-lg">
              <span className="text-xl font-black">A</span>
            </div>
            <h1 className="text-2xl font-black text-[#0f2942]">Panel Admin</h1>
            <p className="mt-2 text-sm text-slate-500">Acceso exclusivo para gestionar el sitio.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-600">Usuario</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                placeholder="admin"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-600">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                placeholder="admin"
              />
            </div>

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-xl bg-[#0f2942] px-4 py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#153a5e]"
            >
              Ingresar
            </button>

            <button
              type="button"
              onClick={onBackToSite}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
            >
              Volver al sitio
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <AdminCMSModal
      isOpen={true}
      onClose={() => {
        handleLogout();
        onBackToSite();
      }}
      pageMode
    />
  );
}

function AppContent() {
  const { config, saveNotification } = useCms();
  const [walkthroughOpen, setWalkthroughOpen] = useState(false);
  const [portalOpen, setPortalOpen] = useState(false);
  const [activeZip, setActiveZip] = useState<string>('');
  const [currentPath, setCurrentPath] = useState<string>(() => (typeof window !== 'undefined' ? window.location.pathname : '/'));

  useEffect(() => {
    const syncPath = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', syncPath);
    return () => window.removeEventListener('popstate', syncPath);
  }, []);

  const navigateTo = (path: string) => {
    if (typeof window === 'undefined') return;
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateSection = (sectionId: string) => {
    if (currentPath !== '/') {
      navigateTo('/');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50);
      return;
    }

    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCheckZip = (zip: string) => {
    setActiveZip(zip);
    const el = document.getElementById('service-areas');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (currentPath === '/admin') {
    return <AdminPage onBackToSite={() => navigateTo('/')} />;
  }

  const renderSection = (section: PageSection) => {
    if (!section.enabled) return null;
    switch (section.id) {
      case 'hero':
        return (
          <Hero
            key={section.id}
            onOpenWalkthrough={() => setWalkthroughOpen(true)}
            onNavigateSection={handleNavigateSection}
            onCheckZip={handleCheckZip}
          />
        );
      case 'difference':
        return <TheDifference key={section.id} />;
      case 'three-pillars':
        return (
          <ThreePillars
            key={section.id}
            onOpenWalkthrough={() => setWalkthroughOpen(true)}
            onNavigateSection={handleNavigateSection}
          />
        );
      case 'checklist':
        return (
          <ChecklistSection
            key={section.id}
            onOpenWalkthrough={() => setWalkthroughOpen(true)}
          />
        );
      case 'gallery':
        return (
          <GallerySection
            key={section.id}
            onOpenWalkthrough={() => setWalkthroughOpen(true)}
          />
        );
      case 'pricing':
        return (
          <PricingCalculator
            key={section.id}
            onOpenWalkthrough={() => setWalkthroughOpen(true)}
          />
        );
      case 'how-it-works':
        return (
          <HowItWorks
            key={section.id}
            onOpenWalkthrough={() => setWalkthroughOpen(true)}
          />
        );
      case 'service-areas':
        return (
          <ServiceAreaSection
            key={section.id}
            onOpenWalkthrough={() => setWalkthroughOpen(true)}
            searchedZip={activeZip}
          />
        );
      case 'reviews':
        return <ReviewsSection key={section.id} />;
      case 'faq':
        return (
          <FaqSection
            key={section.id}
            onOpenWalkthrough={() => setWalkthroughOpen(true)}
          />
        );
      default:
        return (
          <section key={section.id} id={section.id} className="py-20 bg-slate-50 border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mx-auto text-center space-y-4">
                {section.badge && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 uppercase tracking-wider">
                    {section.badge}
                  </span>
                )}
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f2942]">
                  {section.title}
                </h2>
                {section.subtitle && (
                  <p className="text-slate-600 text-base sm:text-lg">
                    {section.subtitle}
                  </p>
                )}
              </div>
              {section.content && (
                <div className="mt-8 max-w-4xl mx-auto bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-slate-700 leading-relaxed whitespace-pre-line">
                  {section.content}
                </div>
              )}
              {section.imageUrl && (
                <div className="mt-8 max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-lg border border-slate-200">
                  <img src={section.imageUrl} alt={section.title} className="w-full h-80 object-cover" />
                </div>
              )}
            </div>
          </section>
        );
    }
  };

  const activeSections = config.sections && config.sections.length > 0
    ? config.sections
    : [
      { id: 'hero', name: 'Hero Header', title: 'Hero Header', enabled: true },
      { id: 'difference', name: 'The Difference', title: 'The Difference', enabled: true },
      { id: 'three-pillars', name: 'Three Pillars', title: 'Three Pillars', enabled: true },
      { id: 'gallery', name: 'Gallery', title: 'Gallery', enabled: true },
      { id: 'pricing', name: 'Pricing Calculator', title: 'Pricing Calculator', enabled: true },
      { id: 'how-it-works', name: 'How It Works', title: 'How It Works', enabled: true },
      { id: 'service-areas', name: 'Service Areas', title: 'Service Areas', enabled: true },
      { id: 'reviews', name: 'Reviews', title: 'Reviews', enabled: true },
      { id: 'faq', name: 'FAQ', title: 'FAQ', enabled: true }
    ];

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-emerald-500 selection:text-white font-sans antialiased">
      {saveNotification && (
        <div className="fixed top-20 right-6 z-50 bg-[#0f2942] text-white px-5 py-3 rounded-2xl shadow-2xl border-2 border-emerald-400 flex items-center gap-3 animate-in slide-in-from-top-4 duration-300">
          <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center text-white shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">CMS Actualizado</div>
            <div className="text-xs font-medium text-slate-200">{saveNotification}</div>
          </div>
        </div>
      )}

      <Header
        onOpenWalkthrough={() => setWalkthroughOpen(true)}
        onOpenPortal={() => setPortalOpen(true)}
        onNavigateSection={handleNavigateSection}
        onOpenAdmin={() => navigateTo('/admin')}
      />

      <main className="flex-1">
        {activeSections.map(section => renderSection(section))}
      </main>

      <Footer
        onOpenWalkthrough={() => setWalkthroughOpen(true)}
        onOpenPortal={() => setPortalOpen(true)}
        onNavigateSection={handleNavigateSection}
        onOpenAdmin={() => navigateTo('/admin')}
      />

      <ClientPortalModal
        isOpen={portalOpen}
        onClose={() => setPortalOpen(false)}
      />

      <WalkthroughModal
        isOpen={walkthroughOpen}
        onClose={() => setWalkthroughOpen(false)}
        prefilledZip={activeZip}
      />

      <div className="md:hidden fixed bottom-3 left-3 right-3 z-30 bg-[#0f2942]/95 backdrop-blur-md p-2 rounded-2xl border border-slate-700 shadow-2xl flex items-center justify-between gap-2">
        <a
          href="tel:8885552273"
          className="flex-1 py-2.5 px-3 rounded-xl bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 active:bg-slate-700"
        >
          <Phone className="w-3.5 h-3.5 text-emerald-400" />
          <span>(888) 555-CARE</span>
        </a>

        <button
          onClick={() => setWalkthroughOpen(true)}
          className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-700/20 active:bg-emerald-800 cursor-pointer"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Walkthrough</span>
        </button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <CmsProvider>
      <AppContent />
    </CmsProvider>
  );
}
