import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Calendar,
  CheckCircle2,
  ArrowRight,
  Star,
  Wrench,
  Clock,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Sparkles,
  Sliders,
  Edit3,
  Trash2,
  X
} from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { parseVideoUrl } from '../utils/mediaUtils';

interface HeroProps {
  onOpenWalkthrough: () => void;
  onNavigateSection: (sectionId: string) => void;
  onCheckZip: (zip: string) => void;
  onOpenAdmin?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenWalkthrough,
  onNavigateSection,
  onCheckZip,
  onOpenAdmin
}) => {
  const { config, updateSlider } = useCms();
  const [zipInput, setZipInput] = useState('');
  const [zipFeedback, setZipFeedback] = useState<string | null>(null);

  // Slider State
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

    const activeSlides = config.slider.slides.filter(s => s.enabled);
  const isSliderMode = config.slider.sliderMode && activeSlides.length > 0;
  const heroTopOffset = config.header.transparentHeader ? '-mt-4 sm:-mt-5' : '';

  // Admin quick-edit state
  const [isAdmin, setIsAdmin] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('hasslefree_admin_auth') === 'true';
  });
  const [editingSlide, setEditingSlide] = useState(null);
  const [editDraft, setEditDraft] = useState(null);
  const [removeConfirm, setRemoveConfirm] = useState(null);
  const [adminKey, setAdminKey] = useState('');
  const [adminError, setAdminError] = useState('');

  const handleAdminLogin = () => {
    const adminUser = config.adminUsername?.trim() || 'admin';
    if (adminKey === adminUser) {
      setIsAdmin(true);
      setAdminError('');
      if (typeof window !== 'undefined') {
        localStorage.setItem('hasslefree_admin_auth', 'true');
      }
    } else {
      setAdminError('Clave incorrecta');
    }
  };

  const handleOpenEdit = (slide) => {
    setEditDraft({ ...slide });
    setEditingSlide(slide);
  };

  const handleSaveEdit = () => {
    if (!editDraft) return;
    const updated = config.slider.slides.map(s => s.id === editDraft.id ? { ...s, ...editDraft } : s);
    updateSlider({ slides: updated });
    setEditingSlide(null);
    setEditDraft(null);
  };

  const handleRemoveSlide = (id) => {
    const updated = config.slider.slides.map(s => s.id === id ? { ...s, enabled: false } : s);
    updateSlider({ slides: updated });
    setRemoveConfirm(null);
    // Remove from active slides
    let newIndex = currentSlideIndex;
    const remaining = updated.filter(s => s.enabled);
    if (newIndex >= remaining.length) newIndex = Math.max(0, remaining.length - 1);
    setCurrentSlideIndex(newIndex);
  };

  // Autoplay timer
  useEffect(() => {
    if (!isSliderMode || !config.slider.autoplay || !isPlaying || activeSlides.length <= 1) return;

    const intervalTime = (config.slider.autoplayInterval || 7) * 1000;
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % activeSlides.length);
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isSliderMode, config.slider.autoplay, config.slider.autoplayInterval, isPlaying, activeSlides.length]);

  const handleNextSlide = () => {
    if (activeSlides.length === 0) return;
    setCurrentSlideIndex((prev) => (prev + 1) % activeSlides.length);
  };

  const handlePrevSlide = () => {
    if (activeSlides.length === 0) return;
    setCurrentSlideIndex((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
  };

  const handleZipSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!zipInput.trim()) return;

    const cleanZip = zipInput.trim();
    onCheckZip(cleanZip);

    const validPrefixes = ['208', '209', '200', '220', '221', '222', '223', '201', '068', '069', '303', '300', '334', '333', '600', '601', '602', '605', '024', '017', '021'];
    const matched = validPrefixes.some(p => cleanZip.startsWith(p));

    if (matched) {
      setZipFeedback(`Great news! We have dedicated Premier Home Services technicians in ${cleanZip}.`);
    } else {
      setZipFeedback(`We are rapidly expanding! Contact us at ${config.header.topBar.emergencyPhone || '(888) 555-CARE'} to verify regional coverage for ${cleanZip}.`);
    }
  };

  const handleAction = (action?: string) => {
    if (action === 'walkthrough') onOpenWalkthrough();
    else if (action === 'pricing') onNavigateSection('pricing');
    else if (action === 'gallery') onNavigateSection('gallery');
    else if (action === 'portal') onNavigateSection('portal');
    else onOpenWalkthrough();
  };

  const currentSlide = activeSlides[currentSlideIndex] || activeSlides[0];

    return (
    <section id="hero" className={`relative overflow-hidden bg-slate-950 text-white border-b border-slate-800 ${heroTopOffset}`}>

      {/* Admin Quick-Login Panel (top-right corner) */}
      {onOpenAdmin && (
        <div className="absolute top-4 right-4 z-50 flex items-center gap-2">
          {!isAdmin ? (
            <div className="flex items-center gap-2 bg-slate-900/80 rounded-lg px-2.5 py-1.5 border border-white/20">
              <input
                type="password"
                placeholder="Clave admin"
                value={adminKey}
                onChange={(e) => { setAdminKey(e.target.value); setAdminError(''); }}
                className="text-xs px-2 py-1 rounded bg-slate-800 text-white placeholder-slate-500 outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <button
                onClick={handleAdminLogin}
                className="text-xs px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 rounded text-white font-bold cursor-pointer transition-colors"
              >
                Acceder
              </button>
            </div>
          ) : (
            <button
              onClick={() => onOpenAdmin()}
              className="p-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg text-white transition-colors"
              title="Abrir panel de administración completo"
            >
              <Sliders className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
      {adminError && (
        <div className="absolute top-4 right-4 z-50 text-xs text-red-400 bg-red-500/10 px-2.5 py-1 rounded-lg border border-red-500/30">
          {adminError}
        </div>
      )}

      {/* Background Subtle Geometric Grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>

      {isSliderMode && currentSlide ? (
        /* ================= CAROUSEL / SLIDER MODE ================= */
        <div className="relative min-h-[560px] sm:min-h-[640px] lg:min-h-[720px] flex items-center">

          {/* Slide Background (Image or Video) */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            {currentSlide.type === 'video' && currentSlide.mediaUrl ? (() => {
              const videoInfo = parseVideoUrl(currentSlide.mediaUrl, {
                autoplay: true,
                muted: true,
                loop: true,
                controls: false
              });
              return videoInfo.isEmbed ? (
                <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden flex items-center justify-center">
                  <iframe
                    key={videoInfo.embedUrl}
                    src={videoInfo.embedUrl}
                    title={currentSlide.title || 'Hero Video Background'}
                    className="w-[140%] h-[140%] min-w-[100%] min-h-[100%] object-cover pointer-events-none"
                    allow="autoplay; encrypted-media; picture-in-picture"
                    tabIndex={-1}
                  />
                </div>
              ) : (
                <video
                  key={currentSlide.mediaUrl}
                  src={currentSlide.mediaUrl}
                  poster={currentSlide.posterUrl}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover scale-105 transition-all duration-1000"
                />
              );
            })() : (
              <img
                key={currentSlide.mediaUrl}
                src={currentSlide.mediaUrl}
                alt={currentSlide.title}
                className="w-full h-full object-cover scale-102 transition-transform duration-1000 ease-out"
              />
            )}

            {/* Dark Gradient Overlay for Readability */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/40"
              style={{
                opacity: (currentSlide.overlayDarkness || 50) / 100
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/30"></div>
          </div>

          {/* Main Slide Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

              {/* Left Column: Headlines, Copy, CTAs */}
              <div className="lg:col-span-8 space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-500">

                {/* Eyebrow removed */}

                {/* Main Headline with Highlight */}
                <div className="space-y-3">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08]">
                    {currentSlide.title} <br className="hidden sm:inline" />
                    <span
                      className="text-transparent bg-clip-text"
                      style={{
                        backgroundImage: `linear-gradient(to right, ${config.theme.primaryColor || '#10b981'}, #2dd4bf, #ffffff)`
                      }}
                    >
                      {currentSlide.titleHighlight}
                    </span>
                  </h1>

                  <p className="text-base sm:text-lg lg:text-xl text-slate-200 font-normal leading-relaxed max-w-2xl text-shadow-sm">
                    {currentSlide.description}
                  </p>
                </div>

                {/* Zip form removed */}

                {/* Slide Primary / Secondary CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                  <button
                    onClick={() => handleAction(currentSlide.primaryBtnAction)}
                    className="px-7 py-4 rounded-xl font-bold text-sm sm:text-base text-white shadow-lg transition-all flex items-center justify-center gap-2.5 cursor-pointer group transform hover:scale-[1.02]"
                    style={{ backgroundColor: config.theme.primaryColor || '#059669' }}
                  >
                    <Calendar className="w-5 h-5 text-emerald-100 group-hover:scale-110 transition-transform" />
                    <span>{currentSlide.primaryBtnText}</span>
                  </button>

                  {currentSlide.secondaryBtnText && (
                    <button
                      onClick={() => handleAction(currentSlide.secondaryBtnAction)}
                      className="px-6 py-4 rounded-xl border border-white/30 hover:border-white/60 bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base transition-all backdrop-blur-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>{currentSlide.secondaryBtnText}</span>
                      <ArrowRight className="w-4 h-4 text-slate-300" />
                    </button>
                  )}
                </div>

              </div>

              {/* Right Column removed */}

            </div>
          </div>

          {/* Carousel Arrows & Controls */}
          {activeSlides.length > 1 && (
            <>
              {/* Prev Button */}
              <button
                onClick={handlePrevSlide}
                aria-label="Previous slide"
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-slate-950/60 hover:bg-slate-950/90 text-white border border-white/20 flex items-center justify-center backdrop-blur-md transition-all cursor-pointer hover:scale-110"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next Button */}
              <button
                onClick={handleNextSlide}
                aria-label="Next slide"
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-slate-950/60 hover:bg-slate-950/90 text-white border border-white/20 flex items-center justify-center backdrop-blur-md transition-all cursor-pointer hover:scale-110"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Slide Indicators / Dots */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-slate-950/70 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                {activeSlides.map((slide, idx) => (
                  <button
                    key={slide.id}
                    onClick={() => setCurrentSlideIndex(idx)}
                    className={`h-2.5 rounded-full transition-all cursor-pointer ${currentSlideIndex === idx
                        ? 'w-7 bg-emerald-400'
                        : 'w-2.5 bg-white/40 hover:bg-white/70'
                      }`}
                    title={`Go to slide ${idx + 1}`}
                  />
                ))}

                {/* Pause/Play Toggle */}
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="ml-2 text-white/70 hover:text-white transition-colors cursor-pointer"
                  title={isPlaying ? "Pausar slider" : "Reproducir slider"}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>
              </div>
            </>
            )}

            {/* Admin Quick-Edit Buttons for Current Slide */}
            {isAdmin && isSliderMode && currentSlide && (
              <div className="absolute top-4 left-4 z-30 flex gap-2">
                <button
                  onClick={() => handleOpenEdit(currentSlide)}
                  className="p-2 rounded-lg bg-slate-900/80 hover:bg-slate-900 text-white border border-white/20 backdrop-blur-md transition-all flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
                  title="Editar esta diapositiva"
                >
                  <Edit3 className="w-3.5 h-3.5 text-emerald-400" />
                  Editar
                </button>
                <button
                  onClick={() => setRemoveConfirm(currentSlide)}
                  className="p-2 rounded-lg bg-red-600/80 hover:bg-red-600 text-white border border-red-400/30 backdrop-blur-md transition-all flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
                  title="Eliminar esta diapositiva"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Quitar
                </button>
              </div>
            )}

          </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10">
          {/* ================= STATIC HERO MODE ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            <div className="lg:col-span-7 space-y-6">

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs sm:text-sm font-bold">
                <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>{config.content.hero.eyebrow}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08]">
                {config.content.hero.headlinePart1} <br className="hidden sm:inline" />
                <span
                  className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage: `linear-gradient(to right, ${config.theme.primaryColor || '#10b981'}, #2dd4bf, #ffffff)`
                  }}
                >
                  {config.content.hero.headlineHighlight}
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
                {config.content.hero.description}
              </p>

              {/* Zip code form removed */}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <button
                  onClick={onOpenWalkthrough}
                  className="px-7 py-4 rounded-xl text-white font-bold text-sm sm:text-base shadow-lg transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                  style={{ backgroundColor: config.theme.primaryColor || '#059669' }}
                >
                  <Calendar className="w-5 h-5 text-emerald-100" />
                  <span>{config.content.hero.primaryBtnText}</span>
                </button>

                <button
                  onClick={() => onNavigateSection('pricing')}
                  className="px-6 py-4 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{config.content.hero.secondaryBtnText}</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </button>
              </div>

            </div>

            <div className="lg:col-span-5 relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
                  alt="Maintained Residence"
                  className="w-full h-[450px] object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Micro-Pillars Strip across the bottom */}
      <div className="bg-slate-900/90 border-t border-slate-800/80 py-4 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">{config.content.hero.microPillars[0]?.title || '50-Point Checklist'}</h4>
              <p className="text-[11px] text-slate-400">{config.content.hero.microPillars[0]?.subtitle || 'Seasonal inspections prevent failures'}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center shrink-0">
              <Wrench className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">{config.content.hero.microPillars[1]?.title || 'Included Handyman'}</h4>
              <p className="text-[11px] text-slate-400">{config.content.hero.microPillars[1]?.subtitle || 'Repairs & caulking tackled every visit'}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">{config.content.hero.microPillars[2]?.title || '24/7 On-Call Support'}</h4>
              <p className="text-[11px] text-slate-400">{config.content.hero.microPillars[2]?.subtitle || 'Emergency response when systems fail'}</p>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};
