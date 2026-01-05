import React, { useState, useEffect } from 'react';
import { MapPin, CheckCircle, Loader2, Users, Flame } from 'lucide-react';
import { MOCK_CITIES } from '../constants';

interface StepLocationProps {
  value: string;
  city: string;
  isValid: boolean;
  onChange: (zip: string, city: string, isValid: boolean) => void;
}

export const StepLocation: React.FC<StepLocationProps> = ({ value, city, isValid, onChange }) => {
  const [loading, setLoading] = useState(false);

  // Helper to simulate a real API lookup based on US Zip Regions
  const getCityName = (zip: string): string => {
    // 1. Check hardcoded specific matches first
    if (MOCK_CITIES[zip]) return MOCK_CITIES[zip];

    // 2. Fallback to realistic "Smart Mock" based on first digit
    const firstDigit = zip.charAt(0);
    switch (firstDigit) {
      case '0': return 'Boston Area';
      case '1': return 'New York Metro';
      case '2': return 'Charleston Area'; // SC (Target Market)
      case '3': return 'Miami Metro';
      case '4': return 'Detroit Area';
      case '5': return 'Minneapolis Area';
      case '6': return 'Chicago Metro';
      case '7': return 'Dallas Metro';
      case '8': return 'Denver Area';
      case '9': return 'Los Angeles Metro';
      default: return 'Local Area';
    }
  };

  useEffect(() => {
    if (value.length === 5) {
      setLoading(true);
      // Simulate network request
      const timer = setTimeout(() => {
        setLoading(false);
        const detectedCity = getCityName(value);
        onChange(value, detectedCity, true);
      }, 600);
      return () => clearTimeout(timer);
    } else if (value.length < 5 && isValid) {
      onChange(value, '', false);
    }
  }, [value]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-2">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${isValid ? 'bg-green-100 text-green-700' : 'bg-brand-100 text-brand-700'}`}>
          {isValid ? <CheckCircle className="w-5 h-5" /> : '1'}
        </div>
        <h2 className="text-xl font-bold text-slate-900">Where do you need cleaning?</h2>
      </div>

      <div className="relative max-w-sm">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
          <MapPin className="w-5 h-5" />
        </div>
        <input
          type="text"
          maxLength={5}
          inputMode="numeric"
          pattern="[0-9]*"
          name="zipcode"
          autoComplete="postal-code"
          placeholder="Enter Zip Code"
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/\D/g, ''), '', false)}
          className={`w-full pl-12 pr-10 py-4 rounded-xl border outline-none transition-all text-base shadow-sm placeholder:text-slate-400 appearance-none
            ${isValid 
              ? 'border-trust-500 ring-1 ring-trust-500 bg-green-50/50 text-slate-900' 
              : 'bg-white text-slate-900 border-slate-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10'
            }`}
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          {loading && <Loader2 className="w-5 h-5 text-brand-500 animate-spin" />}
          {isValid && !loading && <CheckCircle className="w-5 h-5 text-trust-500" />}
        </div>
      </div>
      
      {isValid && !loading && city && (
        <div className="animate-fade-in space-y-3">
          <div className="flex items-center gap-2 text-trust-700 font-medium bg-green-50 p-3 rounded-lg border border-green-100 max-w-sm shadow-sm">
            <CheckCircle className="w-5 h-5 flex-shrink-0 text-trust-500" />
            <span className="leading-tight">Service available in <strong>{city}</strong></span>
          </div>
          
          {/* Social Proof & Scarcity Triggers */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4 max-w-sm pl-1">
             <div className="flex items-center gap-2 text-xs text-slate-600">
                <div className="bg-brand-100 p-1 rounded-full">
                  <Users className="w-3 h-3 text-brand-600" />
                </div>
                <span>54 neighbors in {city} booked this week.</span>
             </div>
             <div className="flex items-center gap-2 text-xs text-amber-700 font-medium">
                <Flame className="w-3 h-3 text-amber-500" />
                <span>High demand in your area.</span>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};