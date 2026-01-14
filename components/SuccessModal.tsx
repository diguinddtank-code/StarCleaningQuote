import React from 'react';
import { Check, Phone, X, Clock, ShieldCheck } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all duration-300 animate-[slideUp_0.4s_cubic-bezier(0.16,1,0.3,1)]">
        
        {/* Header Graphic */}
        <div className="bg-green-50 p-8 text-center border-b border-green-100">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 ring-8 ring-green-50 shadow-sm">
            <Check className="w-10 h-10 text-green-600 animate-[scaleIn_0.4s_ease-out_0.2s_both]" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Request Received!</h2>
          <p className="text-slate-600 mt-2">We've secured your estimate.</p>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide text-center">What happens next?</h3>
            
            <div className="flex gap-4 items-start bg-slate-50 p-4 rounded-xl border border-slate-100">
               <div className="bg-white p-2 rounded-full shadow-sm border border-slate-100 text-brand-600 shrink-0">
                 <Clock className="w-5 h-5" />
               </div>
               <div>
                 <p className="font-bold text-slate-900 text-sm">Review in Progress</p>
                 <p className="text-xs text-slate-500 leading-relaxed">Our team is reviewing your home details to confirm availability.</p>
               </div>
            </div>

            <div className="flex gap-4 items-start bg-slate-50 p-4 rounded-xl border border-slate-100">
               <div className="bg-white p-2 rounded-full shadow-sm border border-slate-100 text-brand-600 shrink-0">
                 <Phone className="w-5 h-5" />
               </div>
               <div>
                 <p className="font-bold text-slate-900 text-sm">Expect a Call Shortly</p>
                 <p className="text-xs text-slate-500 leading-relaxed">
                   Look for a call from <span className="font-bold text-slate-900">(843) 297-9935</span>. We'll finalize your price and lock in your slot.
                 </p>
               </div>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl shadow-lg transform transition-all active:scale-95"
          >
            Got it, thanks!
          </button>

          <div className="flex justify-center items-center gap-2 text-[10px] text-slate-400">
            <ShieldCheck className="w-3 h-3" />
            <span>Your information is secure and private.</span>
          </div>
        </div>

        {/* Close X */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes scaleIn {
          from { transform: scale(0); }
          to { transform: scale(1); }
        }
      `}</style>
    </div>
  );
};