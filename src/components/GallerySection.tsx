import React, { useState } from 'react';
import { 
  Images, 
  Play, 
  Sparkles, 
  CheckCircle2, 
  MapPin, 
  Calendar, 
  X, 
  Sliders, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { GalleryItem } from '../types';
import { useCms } from '../context/CmsContext';

interface GallerySectionProps {
  onOpenWalkthrough: () => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onOpenWalkthrough }) => {
  const { config } = useCms();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeBeforeAfter, setActiveBeforeAfter] = useState<Record<string, 'before' | 'after'>>({});
  const [activeLightboxItem, setActiveLightboxItem] = useState<GalleryItem | null>(null);

  const categories = ['All', 'HVAC & Electrical', 'Plumbing & Tanks', 'Carpentry & Handyman', 'Exterior & Roof', 'Before & After'];

  const filteredItems = config.gallery.filter(item => {
    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'Before & After') return item.type === 'before_after';
    return item.category === selectedCategory;
  });

  const toggleBeforeAfter = (id: string, state: 'before' | 'after') => {
    setActiveBeforeAfter(prev => ({ ...prev, [id]: state }));
  };

  return (
    <section id="gallery" className="py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-200 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>{config.content.gallery.badge || 'Craftsmanship In Action'}</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f2942] tracking-tight">
            {config.content.gallery.title || 'Before & After Project Showcase'}
          </h2>
          
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            {config.content.gallery.subtitle || 'See real transformations, maintenance checkpoints, and repairs completed by our full-time W-2 technicians.'}
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#0f2942] text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-200/70 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const isBeforeAfter = item.type === 'before_after';
            const currentView = activeBeforeAfter[item.id] || 'after';
            const displayImage = isBeforeAfter 
              ? (currentView === 'before' ? (item.beforeImageUrl || item.imageUrl) : (item.afterImageUrl || item.imageUrl))
              : item.imageUrl;

            return (
              <div 
                key={item.id} 
                className="group rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden bg-slate-900">
                  <img
                    src={displayImage}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                    onClick={() => setActiveLightboxItem(item)}
                  />

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md text-white font-bold text-[11px] tracking-wide border border-white/10">
                      {item.category}
                    </span>
                  </div>

                  {/* Video Indicator */}
                  {item.type === 'video' && (
                    <div 
                      onClick={() => setActiveLightboxItem(item)}
                      className="absolute inset-0 flex items-center justify-center bg-slate-950/40 cursor-pointer group-hover:bg-slate-950/20 transition-colors"
                    >
                      <div className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 fill-white ml-0.5" />
                      </div>
                    </div>
                  )}

                  {/* Before / After Toggle Buttons */}
                  {isBeforeAfter && (
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-auto">
                      <div className="bg-slate-950/85 backdrop-blur-md p-1 rounded-xl border border-white/20 flex gap-1 shadow-md">
                        <button
                          type="button"
                          onClick={() => toggleBeforeAfter(item.id, 'before')}
                          className={`px-3 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                            currentView === 'before'
                              ? 'bg-amber-500 text-slate-950 shadow-xs'
                              : 'text-white/80 hover:text-white'
                          }`}
                        >
                          BEFORE
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleBeforeAfter(item.id, 'after')}
                          className={`px-3 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                            currentView === 'after'
                              ? 'bg-emerald-500 text-white shadow-xs'
                              : 'text-white/80 hover:text-white'
                          }`}
                        >
                          AFTER
                        </button>
                      </div>

                      <span className="px-2 py-1 rounded-md bg-black/60 text-white text-[10px] font-semibold backdrop-blur-xs">
                        {currentView === 'before' ? 'Prior condition' : 'Serviced by Premier Home Services'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Body Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <div className="flex items-center gap-1 font-semibold text-emerald-800">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{item.location}</span>
                      </div>
                      {item.completionDate && (
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{item.completionDate}</span>
                        </div>
                      )}
                    </div>

                    <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-emerald-700 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      W-2 Lead Certified
                    </span>
                    <button
                      onClick={() => setActiveLightboxItem(item)}
                      className="font-bold text-emerald-700 hover:text-emerald-800 hover:underline cursor-pointer"
                    >
                      View Details
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom CTA Bar */}
        <div className="mt-14 p-8 rounded-3xl bg-[#0f2942] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-xl sm:text-2xl font-black">
              Ready for high-craftsmanship care in your residence?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Schedule your complimentary baseline inspection. We document your equipment and handle the rest.
            </p>
          </div>
          <button
            onClick={onOpenWalkthrough}
            className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer whitespace-nowrap flex items-center gap-2"
          >
            <span>Schedule Walkthrough</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeLightboxItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-800">
            <div className="p-4 bg-[#0f2942] text-white flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">
                  {activeLightboxItem.category} • {activeLightboxItem.location}
                </span>
                <h3 className="text-base font-bold text-white mt-0.5">
                  {activeLightboxItem.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveLightboxItem(null)}
                className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative bg-slate-950 max-h-[60vh] flex items-center justify-center">
              {activeLightboxItem.type === 'video' && activeLightboxItem.videoUrl ? (
                <video
                  src={activeLightboxItem.videoUrl}
                  controls
                  autoPlay
                  className="w-full max-h-[60vh] object-contain"
                />
              ) : activeLightboxItem.type === 'before_after' ? (
                <div className="grid grid-cols-2 w-full">
                  <div className="relative">
                    <img 
                      src={activeLightboxItem.beforeImageUrl || activeLightboxItem.imageUrl} 
                      alt="Before" 
                      className="w-full h-80 object-cover"
                    />
                    <span className="absolute bottom-3 left-3 px-2 py-1 rounded bg-amber-500 text-black text-xs font-black">
                      BEFORE
                    </span>
                  </div>
                  <div className="relative">
                    <img 
                      src={activeLightboxItem.afterImageUrl || activeLightboxItem.imageUrl} 
                      alt="After" 
                      className="w-full h-80 object-cover"
                    />
                    <span className="absolute bottom-3 left-3 px-2 py-1 rounded bg-emerald-600 text-white text-xs font-black">
                      AFTER
                    </span>
                  </div>
                </div>
              ) : (
                <img
                  src={activeLightboxItem.imageUrl}
                  alt={activeLightboxItem.title}
                  className="w-full max-h-[60vh] object-contain"
                />
              )}
            </div>

            <div className="p-6 space-y-4">
              <p className="text-sm text-slate-700 leading-relaxed">
                {activeLightboxItem.description}
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                <span className="text-xs text-slate-500">
                  Completed by Premier Home Services W-2 Master Craftsman
                </span>
                <button
                  onClick={() => {
                    setActiveLightboxItem(null);
                    onOpenWalkthrough();
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer"
                >
                  Book Walkthrough For My Home
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
