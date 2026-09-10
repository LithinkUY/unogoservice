import React, { useState } from 'react';
import {
  Star,
  Quote,
  CheckCircle2,
  MapPin,
  ShieldCheck,
  Home,
  ThumbsUp
} from 'lucide-react';
import { useCms } from '../context/CmsContext';

export const ReviewsSection: React.FC = () => {
  const { config } = useCms();
  const [filterLocation, setFilterLocation] = useState<string>('all');

  const testimonials = config.testimonials;
  const reviewsContent = config.content.reviews;
  const isCarousel = reviewsContent.sliderType === 'carousel';

  const filteredTestimonials = filterLocation === 'all'
    ? testimonials
    : testimonials.filter(t => t.location.toLowerCase().includes(filterLocation.toLowerCase()));

  return (
    <section id="reviews" className="py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header with Google Reviews Trust Banner */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold shadow-2xs">
            <div className="flex items-center text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="font-extrabold text-slate-900">4.9 out of 5.0</span>
            <span className="text-slate-400">•</span>
            <span>Over 350+ Verified Google Reviews</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f2942] tracking-tight">
            {reviewsContent.title || 'Loved by Over 1,500 Homeowners'}
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            {reviewsContent.subtitle || 'See how our proactive home maintenance and dedicated technicians have transformed the lives of busy families across the country.'}
          </p>

          {/* Location Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {[
              { id: 'all', label: 'All Reviews' },
              { id: 'maryland', label: 'Maryland' },
              { id: 'virginia', label: 'Virginia' },
              { id: 'connecticut', label: 'Connecticut' },
              { id: 'atlanta', label: 'Georgia' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilterLocation(tab.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${filterLocation === tab.id
                    ? 'bg-[#0f2942] text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

        </div>

        {/* Testimonials Grid */}
        <div className={isCarousel ? 'overflow-x-auto pb-2' : 'grid grid-cols-1 md:grid-cols-2 gap-8'}>
          <div className={isCarousel ? 'flex gap-6 min-w-max' : 'contents'}>
            {filteredTestimonials.map((review) => (
              <div
                key={review.id}
                className={isCarousel
                  ? 'bg-white rounded-3xl p-7 sm:p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between relative group w-[320px] sm:w-[360px]'
                  : 'bg-white rounded-3xl p-7 sm:p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between relative group'}
              >
                <div className="space-y-4">

                  {/* Header: Rating and Years */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>

                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {review.yearsAsMember} Years as Member
                    </span>
                  </div>

                  {/* Highlight Callout */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs font-bold text-slate-800 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>"{review.highlight}"</span>
                  </div>

                  {/* Quote */}
                  <p className="text-slate-600 text-sm leading-relaxed italic">
                    "{review.quote}"
                  </p>
                </div>

                {/* Author Footer */}
                <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={review.avatarUrl}
                      alt={review.author}
                      className="w-11 h-11 rounded-full object-cover border border-slate-200"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-[#0f2942]">
                        {review.author}
                      </h4>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>{review.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right hidden sm:block">
                    <span className="text-[11px] font-semibold text-slate-400 block">
                      Property:
                    </span>
                    <span className="text-xs font-bold text-slate-700">
                      {review.homeType}
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Aggregate Stats Banner */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center">
          <div>
            <div className="text-3xl sm:text-4xl font-black text-[#0f2942]">{reviewsContent.statsYears || '20+'}</div>
            <div className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">{reviewsContent.statsYearsLabel || 'Years Serving Homes'}</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-emerald-600">{reviewsContent.statsReviews || '350+'}</div>
            <div className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">{reviewsContent.statsReviewsLabel || '5-Star Google Reviews'}</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-[#0f2942]">{reviewsContent.statsRenewal || '98%'}</div>
            <div className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">{reviewsContent.statsRenewalLabel || 'Annual Renewal Rate'}</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-emerald-600">{reviewsContent.statsBackground || '100%'}</div>
            <div className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">{reviewsContent.statsBackgroundLabel || 'W-2 Background Checked'}</div>
          </div>
        </div>

      </div>
    </section>
  );
};
