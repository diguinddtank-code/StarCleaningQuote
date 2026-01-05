import React from 'react';
import { Check, Star, Lock, Quote } from 'lucide-react';
import { BookingState, PriceCalculation } from '../types';

interface SummarySidebarProps {
  booking: BookingState;
  price: PriceCalculation;
  canBook: boolean;
  showPrice: boolean;
}

export const SummarySidebar: React.FC<SummarySidebarProps> = ({ booking, price, canBook, showPrice }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden">
        <div className="bg-slate-900 text-white p-4 text-center">
          <h3 className="font-bold text-lg">Your Quote</h3>
        </div>
        
        <div className="p-6 space-y-4">
          {!showPrice ? (
            <div className="text-center py-8 space-y-4">
               <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                 <Lock className="w-8 h-8 text-slate-400" />
               </div>
               <div className="space-y-1">
                 <p className="font-bold text-slate-800">Complete Steps</p>
                 <p className="text-sm text-slate-500">
                   Enter your location and contact details to see pricing.
                 </p>
               </div>
            </div>
          ) : (
            <>
              {/* Services List */}
              <div className="space-y-2 text-sm text-slate-600 pb-4 border-b border-slate-100 animate-fade-in">
                <div className="flex justify-between">
                  <span>{booking.homeDetails.bedrooms} Bed, {booking.homeDetails.bathrooms} Bath</span>
                  <span className="font-medium text-slate-900">Included</span>
                </div>
                <div className="flex justify-between">
                  <span>{booking.service.type}</span>
                  <span className="font-medium text-slate-900">Included</span>
                </div>
                <div className="flex justify-between">
                  <span>{booking.service.frequency}</span>
                  <span className="text-green-600 font-bold">
                    {price.discount > 0 ? `-$${price.discount.toFixed(2)}` : ''}
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="flex justify-between items-end animate-fade-in">
                <span className="text-slate-500 font-medium">Estimated Total</span>
                <span className="text-3xl font-bold text-slate-900">${price.total.toFixed(0)}</span>
              </div>

              {/* CTA */}
              <button
                disabled={!canBook}
                onClick={() => alert("Lead Captured! Redirecting to confirmation...")}
                className={`w-full py-4 rounded-lg font-bold text-lg transition-all transform active:scale-95 ${
                  canBook
                    ? 'bg-brand-600 hover:bg-brand-700 text-white shadow-lg hover:shadow-brand-500/30'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                Schedule My Clean
              </button>

              {!canBook && (
                <p className="text-xs text-center text-red-400">
                  Please complete all fields to continue.
                </p>
              )}
            </>
          )}
        </div>
      </div>

      {/* Trust Badges & Social Proof */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 space-y-6">
        
        {/* Rating Header */}
        <div className="flex items-center gap-3">
          <div className="bg-yellow-100 p-2 rounded-full">
            <Star className="w-5 h-5 text-yellow-500 fill-current" />
          </div>
          <div>
            <div className="font-bold text-slate-900">4.9/5 Rating</div>
            <div className="text-xs text-slate-500">Based on 500+ reviews</div>
          </div>
        </div>

        {/* Features List */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          {[
            "Background Checked Cleaners",
            "100% Satisfaction Guarantee",
            "Bonded & Insured",
            "Eco-Friendly Products Available"
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
              <Check className="w-4 h-4 text-brand-500 flex-shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>

        {/* Testimonial */}
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 relative">
          <Quote className="w-6 h-6 text-brand-200 absolute -top-2 -left-2 fill-current transform -scale-x-100" />
          <p className="text-sm text-slate-600 italic mb-2 relative z-10">
            "StarCleaning saved my weekend! The team was on time, professional, and my house has never looked better."
          </p>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-brand-200 rounded-full flex items-center justify-center text-brand-700 text-xs font-bold">SJ</div>
            <span className="text-xs font-bold text-slate-800">Sarah Jenkins</span>
          </div>
        </div>

      </div>
    </div>
  );
};