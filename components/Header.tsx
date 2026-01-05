import React from 'react';
import { Phone } from 'lucide-react';

export const Header: React.FC = () => {
  return (
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
          <div className="bg-brand-50 p-2 rounded-full">
            <Phone className="w-4 h-4 text-brand-600" />
          </div>
          <span className="hidden sm:inline">(800) 555-0123</span>
        </a>
      </div>
    </header>
  );
};