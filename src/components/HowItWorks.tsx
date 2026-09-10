import React from 'react';
import { 
  ClipboardCheck, 
  UserCheck, 
  Wrench, 
  Smartphone, 
  Calendar, 
  ArrowRight,
  ShieldAlert,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { useCms } from '../context/CmsContext';

interface HowItWorksProps {
  onOpenWalkthrough: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenWalkthrough }) => {
  const { config } = useCms();
  const howContent = config.content.howItWorks;

  const steps = [
    {
      number: '01',
      title: 'Complimentary Home Walkthrough',
      description: 'A Senior Home Manager conducts an in-depth, room-by-room audit of your appliances, HVAC systems, plumbing shutoffs, electrical panels, and exterior envelope.',
      highlight: 'Full mechanical inventory created at no charge',
      icon: ClipboardCheck
    },
    {
      number: '02',
      title: 'Custom Care Plan & Dedicated Tech',
      description: 'We construct a customized seasonal maintenance roadmap tailored to your specific home systems and assign your dedicated, background-checked primary W-2 technician.',
      highlight: 'You see the same trusted face every single visit',
      icon: UserCheck
    },
    {
      number: '03',
      title: 'Proactive Seasonal Visits & Repairs',
      description: 'Your technician arrives on schedule in uniform, fully equipped with filters, lubricants, and tools to execute your 50-point checklist and tackle your honey-do list.',
      highlight: 'Included handyman hours applied to repairs',
      icon: Wrench
    },
    {
      number: '04',
      title: 'Digital Reports & 24/7 Peace of Mind',
      description: 'Receive detailed photo-documented inspection reports in your client portal after every visit. Plus, enjoy 24/7/365 emergency dispatch whenever urgent issues arise.',
      highlight: 'Complete home maintenance history at your fingertips',
      icon: Smartphone
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300 uppercase tracking-wider">
            {howContent.badge || 'Simple 4-Step Journey'}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f2942] tracking-tight">
            {howContent.title || 'How Premier Care Works'}
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            {howContent.subtitle || 'From your very first walkthrough to ongoing seasonal care, we make maintaining your residence as effortless as living in it.'}
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div 
                key={idx}
                className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between relative group"
              >
                {/* Step Number Watermark */}
                <div className="absolute top-5 right-6 text-4xl font-black text-slate-100 group-hover:text-emerald-100 transition-colors pointer-events-none">
                  {step.number}
                </div>

                <div className="space-y-4 relative">
                  <div className="w-13 h-13 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>

                  <div>
                    <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
                      Step {step.number}
                    </span>
                    <h3 className="text-xl font-bold text-[#0f2942] tracking-tight">
                      {step.title}
                    </h3>
                  </div>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{step.highlight}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Card */}
        <div className="mt-14 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-xl font-black text-[#0f2942]">
              Ready to take the first step?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600">
              Schedule your complimentary, no-obligation walkthrough with a Senior Home Manager today.
            </p>
          </div>
          <button
            onClick={onOpenWalkthrough}
            className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md flex items-center gap-2 cursor-pointer shrink-0"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Your Walkthrough</span>
          </button>
        </div>

      </div>
    </section>
  );
};
