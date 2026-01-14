import React from 'react';
import { CheckCircle, Trophy, Clock } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <div className="mb-6 animate-fade-in">
        <div className="bg-slate-900 rounded-3xl p-6 md:p-10 text-white relative overflow-hidden shadow-xl ring-1 ring-white/10">
            
            {/* New Image: Bright, Clean Living Room */}
            <img 
                src="https://media.istockphoto.com/id/1031043754/photo/new-modern-living-room-with-kitchen-new-home-interior-photography-wooden-floor.jpg?s=612x612&w=0&k=20&c=CmnYvn3hXsNGJ5oOHyV76RmWlDdlljjrcIST_0ubKOw=" 
                alt="Sparkling Clean Home" 
                className="absolute inset-0 w-full h-full object-cover opacity-60" 
            />
            
            {/* Gradient Overlay - Optimized for readability AND visibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/60 to-transparent"></div>

            <div className="relative z-20 max-w-xl">
                {/* Premium Glass Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 border border-amber-200/30 bg-white/10 backdrop-blur-md shadow-[0_0_15px_-3px_rgba(251,191,36,0.3)]">
                    <Trophy className="w-3.5 h-3.5 text-amber-300 drop-shadow-sm" fill="currentColor" />
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-amber-50 text-shadow-sm">
                        #1 Rated in South Carolina
                    </span>
                </div>
                
                <h1 className="text-2xl sm:text-4xl font-extrabold leading-tight mb-3 drop-shadow-lg">
                    Your home, <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-brand-100">spotless.</span><br />
                    Your free time, <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-brand-100">reclaimed.</span>
                </h1>
                
                <p className="text-slate-200 text-sm sm:text-lg mb-6 leading-relaxed max-w-sm drop-shadow-md">
                    Get an instant quote in 60 seconds. <span className="text-white font-semibold border-b border-brand-400/50">100% Satisfaction Guaranteed.</span>
                </p>

                {/* High Conversion Bullets */}
                <div className="flex flex-col gap-2.5">
                    <div className="flex items-center gap-2.5">
                        <div className="bg-green-500/20 p-1 rounded-full backdrop-blur-sm">
                             <Clock className="w-3.5 h-3.5 text-green-300 flex-shrink-0" />
                        </div>
                        <span className="text-xs sm:text-sm font-medium text-white/90">See your exact price instantly</span>
                    </div>
                     <div className="flex items-center gap-2.5">
                        <div className="bg-green-500/20 p-1 rounded-full backdrop-blur-sm">
                            <CheckCircle className="w-3.5 h-3.5 text-green-300 flex-shrink-0" />
                        </div>
                        <span className="text-xs sm:text-sm font-medium text-white/90">No credit card required to book</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};