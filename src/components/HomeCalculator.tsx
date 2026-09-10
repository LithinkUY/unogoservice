import React, { useState } from 'react';
import { 
  Calendar, 
  TrendingDown, 
  Sliders, 
  Check, 
  Clock, 
  ShieldCheck, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useCms } from '../context/CmsContext';

interface HomeCalculatorProps {
  onOpenWalkthrough: () => void;
}

export const HomeCalculator: React.FC<HomeCalculatorProps> = ({ onOpenWalkthrough }) => {
  const { config } = useCms();
  const calcConfig = config.content.calculator || {};
  const plans = config.pricingPlans || [];

  const minSqft = calcConfig.minSqft || 2000;
  const maxSqft = calcConfig.maxSqft || 10000;
  const stepSqft = calcConfig.stepSqft || 250;
  const defaultSqft = calcConfig.defaultSqft || 4500;

  const [squareFootage, setSquareFootage] = useState<number>(defaultSqft);
  const [selectedPlanId, setSelectedPlanId] = useState<string>('bimonthly');
  const [hvacZones, setHvacZones] = useState<number>(2);

  // Dynamic pricing calculation helper
  const calculatePlanPrice = (basePrice: number) => {
    const sizeMultiplier = squareFootage > 3500 
      ? 1 + ((squareFootage - 3500) / 1000) * 0.08
      : 1;
    const hvacMultiplier = hvacZones > 2 ? 1 + (hvacZones - 2) * 0.05 : 1;
    return Math.round(basePrice * sizeMultiplier * hvacMultiplier);
  };

  // Selected plan calculation
  const currentPlan = plans.find(p => p.id === selectedPlanId) || plans[0];
  const currentMonthlyPrice = currentPlan ? calculatePlanPrice(currentPlan.baseMonthlyPrice) : 285;

  // Estimated annual contractor & repair savings
  const estimatedSavings = Math.round(squareFootage * 0.85 + 2400);

  return (
    <section id="calculator" className="py-20 bg-slate-900 text-white border-b border-slate-800 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{calcConfig.badge || 'Calculadora de Estimación'}</span>
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            {calcConfig.title || 'Personaliza el Presupuesto de tu Residencia'}
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            {calcConfig.subtitle || 'Ajusta los pies cuadrados y zonas mecánicas a continuación para calcular en tiempo real la inversión mensual y el ahorro anual estimado.'}
          </p>
        </div>

        {/* Interactive Estimator Card */}
        <div className="bg-gradient-to-br from-[#0f2942] to-[#153456] rounded-3xl p-6 sm:p-10 text-white shadow-2xl border border-slate-700 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                  {calcConfig.estimatorBadge || 'Custom Home Size Estimator'}
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {calcConfig.estimatorTitle || 'Ajusta tu Hogar a Medida'}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mt-1">
                  {calcConfig.estimatorSubtitle || 'Desliza para seleccionar los pies cuadrados y equipos mecánicos de tu vivienda:'}
                </p>
              </div>

              {/* Square Footage Slider */}
              <div className="space-y-3 bg-white/5 p-5 rounded-2xl border border-white/10">
                <div className="flex justify-between items-center text-sm font-semibold">
                  <span className="text-slate-300">{calcConfig.sqftLabel || 'Superficie de la Residencia:'}</span>
                  <span className="text-emerald-400 text-lg font-black">{squareFootage.toLocaleString()} sq ft</span>
                </div>
                <input
                  type="range"
                  min={minSqft}
                  max={maxSqft}
                  step={stepSqft}
                  value={squareFootage}
                  onChange={(e) => setSquareFootage(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>{minSqft.toLocaleString()} sq ft</span>
                  <span>{Math.round((minSqft + maxSqft) / 2).toLocaleString()} sq ft</span>
                  <span>{maxSqft.toLocaleString()}+ sq ft (Estate)</span>
                </div>
              </div>

              {/* Plan Selection Buttons */}
              {plans.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs text-slate-300 block font-medium">Cadencia / Tipo de Plan:</span>
                  <div className="grid grid-cols-3 gap-2">
                    {plans.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setSelectedPlanId(p.id)}
                        className={`p-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer text-center border ${
                          selectedPlanId === p.id
                            ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md font-black'
                            : 'bg-white/5 text-slate-200 border-white/10 hover:bg-white/10'
                        }`}
                      >
                        <span className="block truncate">{p.name}</span>
                        <span className="text-[10px] opacity-80 block font-normal">
                          ${calculatePlanPrice(p.baseMonthlyPrice)}/mes
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* HVAC Zones & Details Selector */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <span className="text-xs text-slate-300 block mb-1.5 font-medium">
                    {calcConfig.hvacLabel || 'Unidades / Zonas HVAC'}
                  </span>
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
                  <span className="text-xs text-slate-300 font-medium">
                    {calcConfig.handymanLabel || 'Handyman Incluido'}
                  </span>
                  <span className="text-sm font-bold text-white mt-1">
                    {selectedPlanId === 'quarterly' ? '4 hrs/año' : selectedPlanId === 'bimonthly' ? '12 hrs/año' : '42 hrs/año'}
                  </span>
                </div>
              </div>
            </div>

            {/* Estimated Annual Savings Banner */}
            <div className="lg:col-span-5 bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-7 border border-white/15 space-y-5 text-center lg:text-left flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold mb-4">
                  <TrendingDown className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{calcConfig.savingsBadge || 'Ahorro Anual Estimado'}</span>
                </div>

                <div className="mb-4">
                  <div className="text-3xl sm:text-4xl font-black text-white">
                    ${estimatedSavings.toLocaleString()}
                  </div>
                  <span className="text-xs text-slate-300 block mt-1">
                    {calcConfig.savingsSubtitle || 'promedio anual evitado en averías y contratistas independientes'}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-left mb-4">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs text-slate-300">Estimado Mensual:</span>
                    <span className="text-2xl font-black text-emerald-400">
                      ${currentMonthlyPrice} <span className="text-xs text-slate-300 font-normal">/mes</span>
                    </span>
                  </div>
                  <span className="text-[11px] text-emerald-300 block mt-0.5">
                    Plan {currentPlan?.name || 'Bi-Monthly'} ({currentPlan?.frequencyLabel || '6 visitas al año'})
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {calcConfig.savingsDisclaimer || 'El mantenimiento preventivo trimestral (drenado de boiler, reemplazo de filtros y sellado) previene filtraciones y costosos reemplazos de emergencia.'}
                </p>
              </div>

              <button
                onClick={onOpenWalkthrough}
                className="w-full py-3.5 px-5 rounded-xl bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-slate-950 font-black text-sm transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer mt-4"
              >
                <Calendar className="w-4 h-4" />
                <span>{calcConfig.ctaButtonText || 'Agendar Evaluación Gratuita'}</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
