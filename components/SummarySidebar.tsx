import React from 'react';
import { Check, ArrowRight, ShieldCheck, Calculator, Star } from 'lucide-react';
import { BookingState, PriceCalculation } from '../types';

interface SummarySidebarProps {
  booking: BookingState;
  price: PriceCalculation;
  canBook: boolean;
  showPrice: boolean;
  onRequestQuote: () => void;
}

export const SummarySidebar: React.FC<SummarySidebarProps> = ({ booking, price, canBook, showPrice, onRequestQuote }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-slate-200/80">
        
        <div className="p-6 lg:p-8 space-y-6">
          <div className="flex justify-between items-start">
             <div>
               <h3 className="font-bold text-xl text-slate-900 leading-tight">Your Quote</h3>
               <p className="text-sm text-slate-500 mt-1">Based on your home details</p>
             </div>
             {showPrice && (
               <span className="bg-blue-50 text-brand-700 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide border border-blue-100 flex items-center gap-1">
                 <Star className="w-3 h-3 fill-current" /> Preliminary
               </span>
             )}
          </div>

          {!showPrice ? (
            <div className="text-center py-6 bg-slate-50 rounded-xl border border-slate-100 border-dashed">
               <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm border border-slate-100">
                 <Calculator className="w-6 h-6 text-slate-400" />
               </div>
               <p className="font-bold text-slate-800 text-sm">Instant Estimate</p>
               <p className="text-xs text-slate-500 px-4 mt-1">
                 Complete the form to see your price instantly.
               </p>
            </div>
          ) : (
            <div className="animate-fade-in">
              {/* Line Items */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm group">
                  <span className="text-slate-600 group-hover:text-slate-900 transition-colors">{booking.homeDetails.bedrooms} Bed, {booking.homeDetails.bathrooms} Bath</span>
                  <span className="font-medium text-slate-900">Included</span>
                </div>
                <div className="flex justify-between text-sm group">
                  <span className="text-slate-600 group-hover:text-slate-900 transition-colors">{booking.service.type}</span>
                  <span className="font-medium text-slate-900">Included</span>
                </div>
                <div className="flex justify-between text-sm group">
                  <span className="text-slate-600 group-hover:text-slate-900 transition-colors">{booking.service.frequency}</span>
                  {price.discount > 0 ? (
                     <span className="text-green-600 font-bold bg-green-50 px-1.5 py-0.5 rounded text-xs">
                        -${price.discount.toFixed(0)}
                     </span>
                  ) : (
                    <span className="text-slate-400">-</span>
                  )}
                </div>
              </div>

              <div className="border-t border-dashed border-slate-200 my-6"></div>

              {/* Total Display */}
              <div className="space-y-1 mb-6">
                 <div className="flex justify-between items-end">
                    <span className="text-slate-500 font-bold text-sm mb-1">Estimated Total</span>
                    {/* Key prop ensures animation replays on change */}
                    <div className="flex flex-col items-end">
                      <span key={price.total} className="text-4xl font-extrabold text-slate-900 tracking-tight leading-none animate-[pricePop_0.4s_cubic-bezier(0.175,0.885,0.32,1.275)] origin-right">
                          ${price.total.toFixed(0)}
                      </span>
                    </div>
                </div>
                {price.discount > 0 && (
                   <p className="text-xs text-green-600 text-right font-medium">
                     Includes savings of ${price.discount.toFixed(0)}
                   </p>
                )}
              </div>

              {/* CTA */}
              <button
                disabled={!canBook}
                onClick={onRequestQuote}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all transform active:scale-[0.98] shadow-lg hover:shadow-xl relative overflow-hidden group ${
                  canBook
                    ? 'bg-gradient-to-r from-brand-600 to-brand-500 hover:to-brand-400 text-white shadow-brand-500/25'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
                }`}
              >
                <div className="relative z-10 flex items-center justify-center gap-2">
                   <span>Check Availability</span>
                   {canBook && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                </div>
              </button>

              <div className="mt-4 flex flex-col gap-2 items-center text-center">
                 <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium bg-slate-50 px-3 py-1.5 rounded-full">
                    <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
                    <span>No payment required today</span>
                 </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Trust Badges - Minimalist */}
      <div className="px-2 grid grid-cols-2 gap-y-2 gap-x-4">
          {[
            "Licensed & Insured",
            "Background Checked",
            "100% Satisfaction",
            "Secure Booking"
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <Check className="w-3.5 h-3.5 text-brand-500 flex-shrink-0" />
              <span>{item}</span>
            </div>
          ))}
      </div>
      <style>{`
        @keyframes pricePop {
            0% { transform: scale(1); color: #0f172a; }
            50% { transform: scale(1.15); color: #0ea5e9; }
            100% { transform: scale(1); color: #0f172a; }
        }
      `}</style>
    </div>
  );
};