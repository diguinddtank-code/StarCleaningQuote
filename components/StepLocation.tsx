import React, { useState, useEffect } from 'react';
import { MapPin, CheckCircle, Loader2 } from 'lucide-react';
import { MOCK_CITIES } from '../constants';

interface StepLocationProps {
  value: string;
  city: string;
  isValid: boolean;
  onChange: (zip: string, city: string, isValid: boolean) => void;
}

export const StepLocation: React.FC<StepLocationProps> = ({ value, city, isValid, onChange }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (value.length === 5) {
      setLoading(true);
      // Simulate API call
      const timer = setTimeout(() => {
        setLoading(false);
        const cityName = MOCK_CITIES[value] || MOCK_CITIES['default'];
        onChange(value, cityName, true);
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
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
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
          className={`w-full pl-12 pr-4 py-4 rounded-xl border outline-none transition-all text-lg shadow-sm placeholder:text-slate-400
            ${isValid 
              ? 'border-trust-500 ring-1 ring-trust-500 bg-green-50 text-slate-900' 
              : 'bg-white text-slate-900 border-slate-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10'
            }`}
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          {loading && <Loader2 className="w-5 h-5 text-brand-500 animate-spin" />}
          {isValid && !loading && <CheckCircle className="w-5 h-5 text-trust-500" />}
        </div>
      </div>
      
      {isValid && !loading && city && (
        <div className="animate-fade-in flex items-center gap-2 text-trust-500 font-medium bg-green-50 p-3 rounded-lg border border-green-100 max-w-sm">
          <CheckCircle className="w-4 h-4 flex-shrink-0" />
          <span>Great! We service <strong>{city}</strong>.</span>
        </div>
      )}
    </div>
  );
};