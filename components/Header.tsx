import React from 'react';
import { Phone, Clock, Star } from 'lucide-react';

// Google 'G' Icon Component
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

export const Header: React.FC = () => {
  return (
    <>
      {/* Promotional Banner - Ultra Compact for Mobile */}
      <div className="bg-brand-900 text-white py-1.5 px-3 text-center text-[10px] font-medium leading-tight relative z-50">
        <span className="inline-flex items-center justify-center gap-1.5">
          <Clock className="w-3 h-3 text-yellow-400 flex-shrink-0" />
          <span>Flash Offer: <span className="text-yellow-300 font-bold">Save $20</span> first cleaning.</span>
        </span>
      </div>

      <header className="bg-white border-b border-slate-100 sticky top-0 z-40 shadow-sm transition-all">
        <div className="container mx-auto px-4 h-14 md:h-16 flex items-center justify-between max-w-6xl">
          
          {/* Left: Brand & Trust */}
          <div className="flex flex-col justify-center gap-1">
            <img 
              src="https://img1.wsimg.com/isteam/ip/97a5d835-7b16-4991-b3c6-3d6956b6b82b/ESBOC%CC%A7O-STAR-CLEANING_full.png/:/rs=w:286,h:150,cg:true,m/cr=w:286,h:150/qt=q:95" 
              alt="Star Cleaning" 
              className="h-5 md:h-8 w-auto object-contain self-start"
            />
            {/* Compact Social Proof with Google Icon */}
            <div className="flex items-center gap-1.5">
                <div className="flex text-yellow-400">
                    <Star className="w-2.5 h-2.5 fill-current" />
                    <Star className="w-2.5 h-2.5 fill-current" />
                    <Star className="w-2.5 h-2.5 fill-current" />
                    <Star className="w-2.5 h-2.5 fill-current" />
                    <Star className="w-2.5 h-2.5 fill-current" />
                </div>
                <div className="flex items-center gap-1 pl-1 border-l border-slate-200">
                  <GoogleIcon />
                  <span className="text-[9px] font-bold text-slate-600 leading-none">4.9/5 Reviews</span>
                </div>
            </div>
          </div>
          
          {/* Right: Call Action (Cleaner) */}
          <a 
            href="tel:+18432979935" 
            className="flex items-center gap-3 text-slate-700 active:text-brand-600 transition-colors group"
          >
            <div className="text-right hidden sm:block">
               <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Call for Quote</span>
               <span className="block font-bold text-lg leading-none">(843) 297-9935</span>
            </div>
            
            {/* Mobile Only: Just the number, smaller */}
            <span className="sm:hidden font-bold text-sm text-slate-700">(843) 297-9935</span>

            <div className="bg-brand-50 p-2 rounded-full text-brand-600 border border-brand-100 shadow-sm group-active:scale-95 transition-transform">
              <Phone className="w-4 h-4 md:w-5 md:h-5" />
            </div>
          </a>
        </div>
      </header>
    </>
  );
};