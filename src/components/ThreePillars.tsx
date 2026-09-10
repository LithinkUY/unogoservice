import React from 'react';
import { 
  ShieldCheck, 
  Wrench, 
  Briefcase, 
  Check, 
  ArrowRight,
  Droplets,
  Flame,
  Fan,
  Sparkles,
  Layers,
  Settings
} from 'lucide-react';
import { useCms } from '../context/CmsContext';

interface ThreePillarsProps {
  onOpenWalkthrough: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const ThreePillars: React.FC<ThreePillarsProps> = ({
  onOpenWalkthrough,
  onNavigateSection
}) => {
  const { config } = useCms();
  const pillarsContent = config.content.threePillars;

  return (
    <section id="pillars" className="py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 uppercase tracking-wider">
            {pillarsContent.badge || 'Comprehensive Residential Care'}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f2942] tracking-tight">
            {pillarsContent.title || 'The Three Pillars of Comprehensive Home Care'}
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            {pillarsContent.subtitle || 'We don’t just show up when something breaks. We provide continuous, structured care to preserve your home’s beauty, safety, and long-term equity.'}
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Pillar 1: Proactive Preventative Maintenance */}
          <div className="bg-slate-50/70 hover:bg-white rounded-3xl p-8 border border-slate-200/80 hover:border-emerald-500/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold shadow-sm group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-7 h-7" />
              </div>

              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest block mb-1">
                  Pillar 01
                </span>
                <h3 className="text-2xl font-black text-[#0f2942] tracking-tight">
                  Proactive Seasonal Maintenance
                </h3>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed">
                Our technicians execute a thorough 50-point seasonal checklist on every scheduled visit. We service critical mechanical systems to prevent premature wear, sudden failure, and costly water damage.
              </p>

              <div className="space-y-2.5 pt-2 border-t border-slate-200/60">
                <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-700">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Draining & flushing water heater sediment</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-700">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>HVAC filter replacements & condensate clear</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-700">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Attic moisture checks & dryer vent cleaning</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-700">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Sump pump testing & battery backup check</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-200">
              <button
                onClick={() => onNavigateSection('checklist')}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5 group-hover:translate-x-1 transition-transform cursor-pointer"
              >
                <span>Explore Full 50-Point Checklist</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Pillar 2: Routine Handyman Repairs Included */}
          <div className="bg-slate-50/70 hover:bg-white rounded-3xl p-8 border border-slate-200/80 hover:border-emerald-500/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 text-[#0f2942] flex items-center justify-center font-bold shadow-sm group-hover:scale-105 transition-transform">
                <Wrench className="w-7 h-7" />
              </div>

              <div>
                <span className="text-xs font-bold text-blue-700 uppercase tracking-widest block mb-1">
                  Pillar 02
                </span>
                <h3 className="text-2xl font-black text-[#0f2942] tracking-tight">
                  Included Handyman Repairs
                </h3>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed">
                Every visit includes dedicated handyman hours to tackle your lingering "honey-do" list. No need to call a separate handyman for minor annoyances—we knock them out automatically.
              </p>

              <div className="space-y-2.5 pt-2 border-t border-slate-200/60">
                <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-700">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Drywall patching & interior paint touch-ups</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-700">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Hanging artwork, mirrors & heavy mounting</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-700">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Installing smart locks, dimmers & light fixtures</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-700">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Re-caulking tubs, sinks & weatherstripping</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-200">
              <button
                onClick={() => onNavigateSection('pricing')}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5 group-hover:translate-x-1 transition-transform cursor-pointer"
              >
                <span>View Included Handyman Hours</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Pillar 3: Turnkey Project Management & Subcontractors */}
          <div className="bg-slate-50/70 hover:bg-white rounded-3xl p-8 border border-slate-200/80 hover:border-emerald-500/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold shadow-sm group-hover:scale-105 transition-transform">
                <Briefcase className="w-7 h-7" />
              </div>

              <div>
                <span className="text-xs font-bold text-amber-700 uppercase tracking-widest block mb-1">
                  Pillar 03
                </span>
                <h3 className="text-2xl font-black text-[#0f2942] tracking-tight">
                  Project Coordination & Oversight
                </h3>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed">
                When you need a major project—like replacing a roof, repainting the exterior, or servicing a pool—your dedicated Home Manager handles quotes, schedules, and on-site oversight.
              </p>

              <div className="space-y-2.5 pt-2 border-t border-slate-200/60">
                <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-700">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Vetted network of licensed subcontractors</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-700">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Pre-negotiated contractor volume pricing</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-700">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>On-site supervision & quality control checks</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-700">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Power washing, gutter cleaning & tree trimming</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-200">
              <button
                onClick={onOpenWalkthrough}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5 group-hover:translate-x-1 transition-transform cursor-pointer"
              >
                <span>Talk to a Home Manager</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
