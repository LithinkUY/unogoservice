import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  CheckCircle2, 
  Search, 
  Building2, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { ServiceArea } from '../types';

interface ServiceAreaSectionProps {
  onOpenWalkthrough: () => void;
  searchedZip?: string;
}

export const ServiceAreaSection: React.FC<ServiceAreaSectionProps> = ({ 
  onOpenWalkthrough,
  searchedZip 
}) => {
  const { config } = useCms();
  const serviceAreasData = config.serviceAreas || [];
  const areaContent = config.content.serviceAreas || {};
  
  const [selectedStateIndex, setSelectedStateIndex] = useState<number>(0);
  const [zipQuery, setZipQuery] = useState<string>(searchedZip || '');
  const [lookupResult, setLookupResult] = useState<{
    found: boolean;
    area?: ServiceArea;
    message: string;
  } | null>(null);

  const handleZipSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = zipQuery.trim();
    if (!clean) return;

    const matchedArea = serviceAreasData.find(area => 
      area.zipPrefixes.some(prefix => clean.startsWith(prefix))
    );

    if (matchedArea) {
      setLookupResult({
        found: true,
        area: matchedArea,
        message: `We are active in ${clean}! Managed by our ${matchedArea.name} regional dispatch team.`
      });
      const idx = serviceAreasData.findIndex(a => a.state === matchedArea.state);
      if (idx !== -1) setSelectedStateIndex(idx);
    } else {
      setLookupResult({
        found: false,
        message: `Zip code ${clean} is outside our current primary coverage. Contact us as we expand rapidly!`
      });
    }
  };

  if (serviceAreasData.length === 0) return null;
  const activeArea = serviceAreasData[selectedStateIndex] || serviceAreasData[0];

  return (
    <section id="service-areas" className="py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 uppercase tracking-wider">
            {areaContent.badge || 'Coast to Coast Service'}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f2942] tracking-tight">
            {areaContent.title || 'Our Regional Service Areas'}
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            {areaContent.subtitle || 'Premier Home Services operates dedicated local field teams across key metropolitan regions.'}
          </p>
        </div>

        {/* Zip Code Quick Check Box */}
        <div className="max-w-2xl mx-auto mb-14 bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm">
          <form onSubmit={handleZipSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={zipQuery}
                onChange={(e) => setZipQuery(e.target.value)}
                placeholder={areaContent.zipPlaceholder || 'Check your 5-digit zip code...'}
                maxLength={5}
                className="w-full pl-10 pr-3 py-2.5 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-hidden font-medium text-slate-800 bg-white"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-all shadow-xs cursor-pointer whitespace-nowrap"
            >
              {areaContent.zipButtonText || 'Verify Zip Code'}
            </button>
          </form>

          {lookupResult && (
            <div className={`mt-3 p-3 rounded-xl text-xs font-semibold flex items-center gap-2 animate-in fade-in ${
              lookupResult.found 
                ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' 
                : 'bg-amber-50 text-amber-900 border border-amber-200'
            }`}>
              <CheckCircle2 className={`w-4 h-4 shrink-0 ${
                lookupResult.found ? 'text-emerald-600' : 'text-amber-600'
              }`} />
              <span>{lookupResult.message}</span>
            </div>
          )}
        </div>

        {/* Regional Selector & Details Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* State Navigation Tabs */}
          <div className="lg:col-span-4 flex flex-col space-y-2 bg-slate-50 p-3 rounded-2xl border border-slate-200">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3 py-1">
              {areaContent.regionSelectTitle || 'Select Your Region'}
            </span>
            {serviceAreasData.map((area, idx) => (
              <button
                key={area.state}
                onClick={() => {
                  setSelectedStateIndex(idx);
                  setLookupResult(null);
                }}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-between cursor-pointer ${
                  selectedStateIndex === idx
                    ? 'bg-[#0f2942] text-white shadow-md'
                    : 'text-slate-700 hover:bg-white hover:text-[#0f2942]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <MapPin className={`w-4 h-4 ${
                    selectedStateIndex === idx ? 'text-emerald-400' : 'text-slate-400'
                  }`} />
                  <span>{area.state}</span>
                </div>
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                  selectedStateIndex === idx ? 'bg-white/10 text-emerald-300' : 'bg-slate-200/60 text-slate-600'
                }`}>
                  {area.keyCities.length} cities
                </span>
              </button>
            ))}
          </div>

          {/* State Detailed Card */}
          <div className="lg:col-span-8 bg-slate-50 rounded-3xl p-7 sm:p-9 border border-slate-200 space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest block mb-1">
                  {areaContent.activeHubBadge || 'Active Regional Hub'}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-[#0f2942] tracking-tight">
                  {activeArea.name} ({activeArea.state})
                </h3>
              </div>
              <a
                href={`tel:${activeArea.phone.replace(/[^0-9]/g, '')}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-[#0f2942] hover:text-emerald-700 font-bold text-sm shadow-2xs transition-colors shrink-0"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>{activeArea.phone}</span>
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  {areaContent.municipalitiesLabel || 'Key Municipalities Served:'}
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeArea.keyCities.map((city, cIdx) => (
                    <span 
                      key={cIdx} 
                      className="px-3 py-1 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-800 shadow-2xs"
                    >
                      {city}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  {areaContent.countiesLabel || 'Counties & Districts:'}
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeArea.counties.map((county, cIdx) => (
                    <span 
                      key={cIdx} 
                      className="px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-900"
                    >
                      {county}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-start gap-3 text-xs text-slate-600">
              <Building2 className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-800 font-semibold block">{areaContent.officeLabel || 'Local Field Office & Dispatch:'}</strong>
                <span>{activeArea.officeAddress}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>{areaContent.fleetBadgeText || 'Full local fleet with certified W-2 technicians'}</span>
              </div>
              <button
                onClick={onOpenWalkthrough}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{areaContent.scheduleButtonText || 'Schedule Walkthrough in'} {activeArea.state}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
