import React from 'react';
import { Phone, Clock } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <>
      {/* Promotional Banner - Compact for Mobile */}
      <div className="bg-brand-900 text-white py-2 px-3 text-center text-[10px] sm:text-sm font-medium leading-tight">
        <span className="inline-flex items-center justify-center gap-1.5">
          <Clock className="w-3 h-3 text-yellow-400 flex-shrink-0" />
          <span>Flash Offer: <span className="text-yellow-300 font-bold">Save $20</span> on your first Deep Clean.</span>
        </span>
      </div>

      <header className="bg-white border-b border-slate-100 sticky top-0 z-40 shadow-sm transition-all">
        <div className="container mx-auto px-4 h-14 md:h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img 
              src="https://img1.wsimg.com/isteam/ip/97a5d835-7b16-4991-b3c6-3d6956b6b82b/ESBOC%CC%A7O-STAR-CLEANING_full.png/:/rs=w:286,h:150,cg:true,m/cr=w:286,h:150/qt=q:95" 
              alt="Star Cleaning" 
              className="h-10 md:h-12 w-auto object-contain"
            />
          </div>
          
          <a 
            href="tel:+18432979935" 
            className="flex items-center gap-3 text-slate-600 hover:text-brand-600 font-medium transition-colors group"
          >
            <div className="flex flex-col items-end">
              <span className="text-[9px] text-slate-400 uppercase tracking-wider font-bold leading-none mb-0.5 hidden sm:block">Call for Quote</span>
              <span className="font-bold leading-none text-sm md:text-base group-hover:text-brand-600">(843) 297-9935</span>
            </div>
            <div className="bg-brand-50 p-2 md:p-2.5 rounded-full text-brand-600 border border-brand-100 group-active:scale-95 transition-transform">
              <Phone className="w-4 h-4 md:w-5 md:h-5" />
            </div>
          </a>
        </div>
      </header>
    </>
  );
};