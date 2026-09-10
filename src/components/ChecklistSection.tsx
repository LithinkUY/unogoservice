import React, { useState, useMemo } from 'react';
import { 
  ShieldCheck, 
  Search, 
  Filter, 
  CheckCircle, 
  AlertCircle, 
  Flame, 
  Droplets, 
  Sun, 
  Wind, 
  Sparkles,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { ChecklistItem } from '../types';

interface ChecklistSectionProps {
  onOpenWalkthrough: () => void;
}

export const ChecklistSection: React.FC<ChecklistSectionProps> = ({ onOpenWalkthrough }) => {
  const { config } = useCms();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSeason, setSelectedSeason] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>({
    'ch-1': true,
    'ch-4': true,
    'ch-9': true
  });

  const toggleItem = (id: string) => {
    setCompletedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const checklistData = config.checklist;

  const filteredItems = useMemo(() => {
    return checklistData.filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSeason = selectedSeason === 'all' || item.season === selectedSeason || item.season === 'all';
      const matchesSearch = searchQuery === '' || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.preventedDamage.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSeason && matchesSearch;
    });
  }, [checklistData, selectedCategory, selectedSeason, searchQuery]);

  const completedCount = Object.values(completedItems).filter(Boolean).length;

  return (
    <section id="checklist" className="py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300/60 uppercase tracking-wider">
            {config.content.checklist.badge || 'Standard 50-Point Protocol'}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f2942] tracking-tight">
            {config.content.checklist.title || 'Interactive Maintenance Checklist'}
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            {config.content.checklist.subtitle || 'Every scheduled visit follows our rigorous 50-point inspection system designed to prevent unexpected breakdowns and protect your family and equity.'}
          </p>
        </div>

        {/* Live Simulation Status Banner */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                Interactive Technician Audit Demo
              </h4>
              <p className="text-xs text-slate-500">
                Click any task below to simulate your dedicated technician completing routine preventative maintenance.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="text-xs text-slate-500 font-medium">Checked Items:</span>
              <div className="text-base font-black text-emerald-700">
                {completedCount} of {checklistData.length} items signed off
              </div>
            </div>
            <button
              onClick={onOpenWalkthrough}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs cursor-pointer whitespace-nowrap"
            >
              Get Full 50-Point PDF
            </button>
          </div>
        </div>

        {/* Filters & Search Controls */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search checklist (e.g., water heater, refrigerator, attic, filters)..."
                className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-hidden font-medium text-slate-800"
              />
            </div>

            {/* Season Selector */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              <span className="text-xs font-bold text-slate-500 mr-1 uppercase">Season:</span>
              {(['all', 'spring', 'summer', 'fall', 'winter'] as const).map(season => (
                <button
                  key={season}
                  onClick={() => setSelectedSeason(season)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all cursor-pointer ${
                    selectedSeason === season
                      ? 'bg-[#0f2942] text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {season}
                </button>
              ))}
            </div>

          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-slate-100">
            {[
              { id: 'all', label: 'All Systems' },
              { id: 'plumbing', label: 'Plumbing & Water' },
              { id: 'hvac', label: 'HVAC & Electrical' },
              { id: 'appliances', label: 'Appliances & Motors' },
              { id: 'exterior', label: 'Roof & Exterior' },
              { id: 'interior', label: 'Interior & Safety' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === tab.id
                    ? 'bg-emerald-600 text-white shadow-xs font-bold'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

        </div>

        {/* Checklist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => {
            const isDone = Boolean(completedItems[item.id]);

            return (
              <div
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between cursor-pointer group select-none ${
                  isDone 
                    ? 'bg-emerald-50/50 border-emerald-300 shadow-sm' 
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-md'
                }`}
              >
                <div className="space-y-3">
                  
                  {/* Card Top Badges */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-slate-100 text-slate-700">
                        {item.category}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold capitalize bg-blue-50 text-blue-700">
                        {item.season === 'all' ? 'All Seasons' : `${item.season} focus`}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] font-bold text-slate-500">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span>{item.frequency}</span>
                    </div>
                  </div>

                  {/* Title and Checkbox */}
                  <div className="flex items-start gap-3">
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                      isDone 
                        ? 'bg-emerald-600 text-white' 
                        : 'border-2 border-slate-300 group-hover:border-emerald-500 text-transparent'
                    }`}>
                      <CheckCircle2 className="w-4 h-4" />
                    </div>

                    <div>
                      <h4 className={`text-base font-bold transition-colors ${
                        isDone ? 'text-emerald-900 line-through decoration-emerald-500/50' : 'text-slate-900 group-hover:text-emerald-700'
                      }`}>
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                </div>

                {/* Prevented Damage Callout */}
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-800 bg-amber-50 px-2.5 py-1.5 rounded-lg border border-amber-200/60">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span className="truncate">{item.preventedDamage}</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
            <p className="text-slate-500 text-sm">No checklist items match your search.</p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedSeason('all');
              }}
              className="mt-3 text-xs font-bold text-emerald-600 hover:underline"
            >
              Reset filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
