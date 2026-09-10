import React from 'react';
import { 
  XCircle, 
  CheckCircle2, 
  ShieldAlert, 
  ShieldCheck, 
  Clock, 
  Users, 
  DollarSign, 
  FileText,
  AlertTriangle,
  HeartHandshake
} from 'lucide-react';
import { useCms } from '../context/CmsContext';

export const TheDifference: React.FC = () => {
  const { config } = useCms();
  const diffContent = config.content.difference;

  return (
    <section id="difference" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      
      {/* Background Accent Gradients */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 tracking-wide uppercase">
            {diffContent.badge || 'The Premier Advantage'}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            {diffContent.title || 'Stop Managing Contractors.'} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
              {diffContent.titleHighlight || 'Start Enjoying Your Home.'}
            </span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            {diffContent.subtitle || 'Your home is your most valuable asset, but maintaining it traditionally steals your weekends and causes constant stress. Here is how we redefine residential care:'}
          </p>
        </div>

        {/* Side-by-Side Comparison Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* The Old Way Card */}
          <div className="bg-slate-800/60 rounded-3xl p-6 sm:p-8 border border-slate-700/80 backdrop-blur-xs flex flex-col justify-between relative overflow-hidden">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-6 border-b border-slate-700/60">
                <div>
                  <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block mb-1">
                    The Frustrating Standard
                  </span>
                  <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                    Traditional Homeownership
                  </h3>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 shrink-0">
                  <XCircle className="w-6 h-6" />
                </div>
              </div>

              <ul className="space-y-4 text-slate-300 text-sm">
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white block font-semibold">10 to 15 different contractors:</strong> 
                    Chasing painters, roofers, plumbers, and HVAC techs who don't return calls or arrive late.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white block font-semibold">Reactive disaster management:</strong> 
                    Neglected water heaters, clogged drain lines, or uninspected attics lead to sudden $15,000+ repair bills.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white block font-semibold">Weekends lost to hardware stores:</strong> 
                    Spending Saturdays standing in aisles searching for gaskets, filters, and bulbs instead of being with family.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white block font-semibold">Strangers in your private home:</strong> 
                    Subcontracted gig workers with inconsistent backgrounds, varying insurance, and no long-term accountability.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white block font-semibold">Zero documentation or records:</strong> 
                    No centralized records of paint codes, filter dimensions, equipment serials, or past maintenance dates.
                  </span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-700/60 bg-rose-950/20 -mx-6 -mb-6 sm:-mx-8 sm:-mb-8 p-6 rounded-b-3xl">
              <div className="flex items-center gap-3 text-rose-300 text-xs font-semibold">
                <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
                <span>Result: Unpredictable expenses, constant worry, and accelerating home depreciation.</span>
              </div>
            </div>
          </div>

          {/* The Premier Way Card */}
          <div className="bg-gradient-to-br from-[#112d4a] to-[#0c233a] rounded-3xl p-6 sm:p-8 border-2 border-emerald-500/40 shadow-2xl flex flex-col justify-between relative overflow-hidden">
            
            {/* Best Choice Tag */}
            <div className="absolute top-0 right-8 -translate-y-1/2">
              <span className="bg-emerald-500 text-slate-950 text-xs font-extrabold uppercase px-3 py-1 rounded-full shadow-md tracking-wider">
                The Premier Care Solution
              </span>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between pb-6 border-b border-emerald-500/20">
                <div>
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                    Turnkey Residential Care
                  </span>
                  <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                    The Premier Care Way
                  </h3>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
              </div>

              <ul className="space-y-4 text-slate-200 text-sm">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white block font-semibold">One dedicated W-2 technician:</strong> 
                    A background-checked, insured craftsman assigned specifically to your property who knows every system.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white block font-semibold">50-Point proactive seasonal care:</strong> 
                    Filters changed, heaters drained, coils cleaned, and roof inspected regularly to stop failures in their tracks.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white block font-semibold">Handyman hours included every visit:</strong> 
                    Keep a running honey-do list in our portal; your technician tackles caulking, lights, hardware, and repairs.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white block font-semibold">Turnkey project management:</strong> 
                    Major upgrades (roofs, HVAC, painting) are quoted, scheduled, and supervised with preferred contractor pricing.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white block font-semibold">24/7/365 Emergency Dispatch:</strong> 
                    Exclusive hotline so you never panic during a winter pipe burst, electrical cutoff, or storm event.
                  </span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-emerald-500/20 bg-emerald-950/40 -mx-6 -mb-6 sm:-mx-8 sm:-mb-8 p-6 rounded-b-3xl">
              <div className="flex items-center gap-3 text-emerald-200 text-xs font-semibold">
                <HeartHandshake className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Result: Peace of mind, protected home resale value, and your weekends back for what truly matters.</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
