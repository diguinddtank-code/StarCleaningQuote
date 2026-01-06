import React from 'react';
import { Check, Send, ShieldCheck, PhoneCall, Info } from 'lucide-react';
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
      <div className="bg-white rounded-xl shadow-xl shadow-slate-200/60 border border-slate-200 overflow-hidden">
        <div className="bg-slate-900 text-white p-4 text-center">
          <h3 className="font-bold text-lg">Quote Summary</h3>
        </div>
        
        <div className="p-6 space-y-4">
          {!showPrice ? (
            <div className="text-center py-8 space-y-4">
               <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                 <Info className="w-8 h-8 text-slate-400" />
               </div>
               <div className="space-y-1">
                 <p className="font-bold text-slate-800">Instant Estimate</p>
                 <p className="text-sm text-slate-500">
                   Enter your details to generate your personalized estimate instantly.
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
              <div className="animate-fade-in space-y-1">
                 <div className="flex justify-between items-end">
                    <span className="text-slate-500 font-medium">Estimated Total</span>
                    <span className="text-3xl font-bold text-slate-900">${price.total.toFixed(0)}</span>
                </div>
                <p className="text-[10px] text-slate-400 text-right leading-tight">
                  *Final price confirmed upon availability check.
                </p>
                {price.discount > 0 && (
                  <div className="text-right text-xs text-red-500 font-bold mt-1">
                    Potential savings: ${price.discount.toFixed(2)}
                  </div>
                )}
              </div>

              {/* CTA */}
              <button
                disabled={!canBook}
                onClick={() => alert("Request received! Our team will call you shortly to confirm availability.")}
                className={`w-full py-4 rounded-lg font-bold text-lg transition-all transform active:scale-95 group relative overflow-hidden ${
                  canBook
                    ? 'bg-brand-600 hover:bg-brand-700 text-white shadow-lg hover:shadow-brand-500/30'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <div className="relative z-10 flex items-center justify-center gap-2">
                   <span>Request Free Quote</span>
                   {canBook && <Send className="w-5 h-5" />}
                </div>
                {canBook && (
                  <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-brand-700/50"></div>
                )}
              </button>

              <div className="flex justify-center items-center gap-1.5 text-[10px] text-slate-500 uppercase tracking-wide font-semibold">
                <ShieldCheck className="w-3 h-3 text-green-500" />
                <span>No Payment Required Today</span>
              </div>

              {!canBook && (
                <p className="text-xs text-center text-red-400">
                  Please complete the form to see available slots.
                </p>
              )}
            </>
          )}
        </div>
      </div>

      {/* Trust Badges & Social Proof - Enhanced */}
      <div className="bg-white rounded-xl shadow-lg shadow-slate-200/50 border border-slate-200 p-6 space-y-6">
        
        {/* Support Badge */}
        <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
             <div className="w-12 h-12 rounded-full bg-brand-50 border-2 border-brand-100 flex items-center justify-center flex-shrink-0">
                <PhoneCall className="w-6 h-6 text-brand-500" />
             </div>
             <div>
                <div className="font-bold text-slate-900 text-sm">Need Help?</div>
                <div className="text-xs text-slate-500 leading-tight">Our team confirms every request personally.</div>
             </div>
        </div>

        {/* Features List */}
        <div className="space-y-3">
          {[
            "Free & No Obligation",
            "Customized Cleaning Plans",
            "Privacy Guaranteed"
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
              <Check className="w-4 h-4 text-brand-500 flex-shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};