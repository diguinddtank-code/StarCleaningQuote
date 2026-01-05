import React from 'react';
import { Phone, Clock } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <>
      {/* Promotional Banner */}
      <div className="bg-brand-900 text-white py-2 px-4 text-center text-xs sm:text-sm font-medium">
        <span className="inline-flex items-center gap-2">
          <Clock className="w-3 h-3 text-yellow-400" />
          <span>Flash Offer: <span className="text-yellow-300 font-bold">Save $20</span> on your first Deep Clean. Ends soon!</span>
        </span>
      </div>

      <header className="bg-white border-b border-slate-100 sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <img 
              src="https://img1.wsimg.com/isteam/ip/97a5d835-7b16-4991-b3c6-3d6956b6b82b/ESBOC%CC%A7O-STAR-CLEANING_full.png/:/rs=w:286,h:150,cg:true,m/cr=w:286,h:150/qt=q:95" 
              alt="Star Cleaning" 
              className="h-10 md:h-12 w-auto object-contain"
            />
          </div>
          
          <a 
            href="tel:+18005550123" 
            className="flex items-center gap-2 text-slate-600 hover:text-brand-600 font-medium transition-colors"
          >
            <div className="bg-brand-50 p-2 rounded-full hidden sm:block">
              <Phone className="w-4 h-4 text-brand-600" />
            </div>
            <div className="flex flex-col items-end sm:items-start">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold leading-none mb-0.5">Call for Quote</span>
              <span className="font-bold leading-none">(800) 555-0123</span>
            </div>
          </a>
        </div>
      </header>
    </>
  );
};