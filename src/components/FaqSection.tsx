import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  HelpCircle, 
  Phone, 
  Mail, 
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { useCms } from '../context/CmsContext';

interface FaqSectionProps {
  onOpenWalkthrough: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenWalkthrough }) => {
  const { config } = useCms();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const faqs = config.faqs;
  const faqContent = config.content.faq;

  const filteredFaqs = selectedCategory === 'all'
    ? faqs
    : faqs.filter(f => f.category === selectedCategory);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faqs" className="py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-14 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-900 border border-blue-200 uppercase tracking-wider">
            {faqContent.badge || 'Clear Answers'}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f2942] tracking-tight">
            {faqContent.title || 'Frequently Asked Questions'}
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            {faqContent.subtitle || 'Everything you need to know about our preventative maintenance protocol, dedicated technicians, and membership terms.'}
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {[
              { id: 'all', label: 'All Questions' },
              { id: 'general', label: 'General & Coverage' },
              { id: 'technicians', label: 'Technicians & Vetting' },
              { id: 'pricing', label: 'Pricing & Contracts' },
              { id: 'services', label: 'Handyman & Projects' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setSelectedCategory(tab.id);
                  setOpenIndex(0);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === tab.id
                    ? 'bg-[#0f2942] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.filter(faq => !faq.hidden).map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen 
                    ? 'bg-slate-50/70 border-emerald-500/40 shadow-sm' 
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className={`text-base sm:text-lg font-bold transition-colors ${
                    isOpen ? 'text-[#0f2942]' : 'text-slate-800'
                  }`}>
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                    isOpen ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 pt-0 text-sm text-slate-600 leading-relaxed animate-in fade-in duration-200">
                    <p className="border-t border-slate-200/60 pt-4">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact Us Box if Still Questions */}
        <div className="mt-14 p-8 rounded-3xl bg-slate-50 border border-slate-200 text-center space-y-4">
          <h4 className="text-xl font-black text-[#0f2942]">
            {faqContent.ctaTitle || 'Have a question specific to your property?'}
          </h4>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            {faqContent.ctaSubtitle || 'Our home care advisors are available to review your property quirks and answer any questions.'}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <a
              href={faqContent.ctaPhoneNumber || 'tel:8885552273'}
              className="px-5 py-2.5 rounded-xl bg-[#0f2942] hover:bg-[#183a5e] text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-colors"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>{faqContent.ctaPhoneText || 'Call (888) 555-CARE'}</span>
            </a>
            <button
              onClick={onOpenWalkthrough}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
            >
              <span>{faqContent.ctaButtonText || 'Request Free Assessment'}</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
