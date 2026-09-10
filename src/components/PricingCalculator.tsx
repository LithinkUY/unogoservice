import React, { useState } from 'react';
import { 
  Check, 
  Sparkles, 
  HelpCircle, 
  ArrowRight, 
  Calendar, 
  ShieldCheck, 
  Home, 
  Layers, 
  Clock,
  TrendingDown
} from 'lucide-react';
import { useCms } from '../context/CmsContext';

interface PricingCalculatorProps {
  onOpenWalkthrough: () => void;
}

export const PricingCalculator: React.FC<PricingCalculatorProps> = ({ onOpenWalkthrough }) => {
  const { config } = useCms();
  const [squareFootage, setSquareFootage] = useState<number>(4500);
  const [selectedPlanId, setSelectedPlanId] = useState<string>('bimonthly');
  const [hvacZones, setHvacZones] = useState<number>(2);

  // Dynamic pricing calculation helper
  // Base scales gently with square footage over standard 3,500 sq ft
  const calculatePlanPrice = (basePrice: number) => {
    const sizeMultiplier = squareFootage > 3500 
      ? 1 + ((squareFootage - 3500) / 1000) * 0.08
      : 1;
    const hvacMultiplier = hvacZones > 2 ? 1 + (hvacZones - 2) * 0.05 : 1;
    return Math.round(basePrice * sizeMultiplier * hvacMultiplier);
  };

  // Estimated annual savings compared to hiring separate ad-hoc trades and dealing with water/damage issues
  const estimatedSavings = Math.round(squareFootage * 0.85 + 2400);

  const plans = config.pricingPlans;

  return (
    <section id="pricing" className="py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-900 border border-blue-200 uppercase tracking-wider">
            {config.content.pricing.badge || 'Predictable Investment'}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f2942] tracking-tight">
            {config.content.pricing.title || 'Transparent Memberships & Plans'}
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            {config.content.pricing.subtitle || 'Predictable monthly payments covering proactive visits, 50-point maintenance, your dedicated W-2 technician, and included handyman repair hours. No surprise invoices.'}
          </p>
        </div>

        {/* Interactive Home Size Estimator Tool */}
        <div className="bg-gradient-to-br from-[#0f2942] to-[#1a3a5f] rounded-3xl p-6 sm:p-10 text-white shadow-xl mb-16 border border-slate-700">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                  Custom Home Size Estimator
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Tailor the plan to your residence.
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Adjust your home's square footage and mechanical zones below to view your personalized monthly membership rate.
              </p>

              {/* Square Footage Slider */}
              <div className="space-y-3 bg-white/5 p-5 rounded-2xl border border-white/10">
                <div className="flex justify-between items-center text-sm font-semibold">
                  <span className="text-slate-300">Home Square Footage:</span>
                  <span className="text-emerald-400 text-lg font-black">{squareFootage.toLocaleString()} sq ft</span>
                </div>
                <input
                  type="range"
                  min="2000"
                  max="10000"
                  step="250"
                  value={squareFootage}
                  onChange={(e) => setSquareFootage(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>2,000 sq ft</span>
                  <span>5,000 sq ft</span>
                  <span>10,000+ sq ft (Estate)</span>
                </div>
              </div>

              {/* HVAC Zones & Details Selector */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <span className="text-xs text-slate-300 block mb-1.5 font-medium">HVAC Units / Zones</span>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4].map(num => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setHvacZones(num)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          hvacZones === num
                            ? 'bg-emerald-500 text-slate-950 shadow-xs'
                            : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex flex-col justify-center">
                  <span className="text-xs text-slate-300 font-medium">Included Handyman</span>
                  <span className="text-sm font-bold text-white mt-1">
                    {selectedPlanId === 'quarterly' ? '4 hrs/year' : selectedPlanId === 'bimonthly' ? '12 hrs/year' : '42 hrs/year'}
                  </span>
                </div>
              </div>
            </div>

            {/* Estimated Annual Savings Banner */}
            <div className="lg:col-span-5 bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-7 border border-white/15 space-y-5 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold">
                <TrendingDown className="w-3.5 h-3.5 text-emerald-400" />
                <span>Estimated Annual Value</span>
              </div>

              <div>
                <div className="text-3xl sm:text-4xl font-black text-white">
                  ${estimatedSavings.toLocaleString()}
                  <span className="text-sm font-normal text-slate-300 block mt-1">
                    avg. estimated annual contractor & repair savings
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Based on industry data: routine water heater draining, regular filter swaps, coil vacuuming, and prompt caulking averts major mold remediation and unexpected emergency replacements.
              </p>

              <button
                onClick={onOpenWalkthrough}
                className="w-full py-3.5 px-5 rounded-xl bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-slate-950 font-black text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Free On-Site Assessment</span>
              </button>
            </div>

          </div>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => {
            const calculatedPrice = calculatePlanPrice(plan.baseMonthlyPrice);
            const isSelected = selectedPlanId === plan.id;
            const isFeatured = plan.id === 'bimonthly';

            return (
              <div
                key={plan.id}
                onClick={() => setSelectedPlanId(plan.id)}
                className={`rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 relative cursor-pointer ${
                  isFeatured
                    ? 'bg-gradient-to-b from-[#0f2942] to-[#17385c] text-white shadow-2xl border-2 border-emerald-500 scale-[1.02]'
                    : 'bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-900 hover:shadow-lg'
                }`}
              >
                {/* Badge if any */}
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="bg-emerald-500 text-slate-950 text-xs font-black uppercase px-3.5 py-1 rounded-full shadow-md tracking-wider">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="space-y-6">
                  
                  <div>
                    <h3 className={`text-2xl font-black ${isFeatured ? 'text-white' : 'text-[#0f2942]'}`}>
                      {plan.name}
                    </h3>
                    <p className={`text-xs mt-1 font-medium ${isFeatured ? 'text-slate-300' : 'text-slate-500'}`}>
                      {plan.tagline}
                    </p>
                  </div>

                  {/* Monthly Pricing */}
                  <div className="pt-2">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-4xl sm:text-5xl font-black tracking-tight">
                        ${calculatedPrice}
                      </span>
                      <span className={`text-sm font-semibold ${isFeatured ? 'text-slate-300' : 'text-slate-500'}`}>
                        / month
                      </span>
                    </div>
                    <span className={`text-xs font-bold block mt-1.5 ${isFeatured ? 'text-emerald-400' : 'text-emerald-700'}`}>
                      {plan.frequencyLabel}
                    </span>
                  </div>

                  {/* Handyman Hours Callout */}
                  <div className={`p-3.5 rounded-xl border text-xs font-bold ${
                    isFeatured 
                      ? 'bg-white/10 border-white/15 text-emerald-300' 
                      : 'bg-white border-slate-200 text-[#0f2942]'
                  }`}>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 shrink-0 text-emerald-500" />
                      <span>Handyman included: {plan.handymanHoursIncluded}</span>
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-2.5 pt-2">
                    <span className={`text-xs font-bold uppercase tracking-wider block ${
                      isFeatured ? 'text-slate-300' : 'text-slate-400'
                    }`}>
                      Included In Membership:
                    </span>
                    {plan.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs">
                        <Check className={`w-4 h-4 shrink-0 mt-0.5 ${
                          isFeatured ? 'text-emerald-400' : 'text-emerald-600'
                        }`} />
                        <span className={isFeatured ? 'text-slate-200' : 'text-slate-700 font-medium'}>
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>

                </div>

                {/* Plan Action CTA */}
                <div className="pt-8 mt-8 border-t border-slate-200/40">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenWalkthrough();
                    }}
                    className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer ${
                      isFeatured
                        ? 'bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black shadow-lg shadow-emerald-500/20'
                        : 'bg-[#0f2942] hover:bg-[#193d63] text-white'
                    }`}
                  >
                    <span>Choose {plan.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className={`text-[11px] text-center mt-2.5 ${isFeatured ? 'text-slate-400' : 'text-slate-500'}`}>
                    No long-term locks • 30-day notice
                  </p>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
