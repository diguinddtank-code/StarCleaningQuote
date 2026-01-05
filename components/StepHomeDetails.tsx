import React from 'react';
import { HomeDetails } from '../types';

interface StepHomeDetailsProps {
  details: HomeDetails;
  onChange: (details: HomeDetails) => void;
  disabled?: boolean;
}

export const StepHomeDetails: React.FC<StepHomeDetailsProps> = ({ details, onChange, disabled }) => {
  const update = (field: keyof HomeDetails, value: any) => {
    if (disabled) return;
    onChange({ ...details, [field]: value });
  };

  const updatePets = (type: 'dogs' | 'cats' | 'none') => {
    if (disabled) return;
    if (type === 'none') {
      onChange({ ...details, pets: { dogs: false, cats: false, none: true } });
    } else {
      const newPets = { ...details.pets, [type]: !details.pets[type], none: false };
      // If unchecking the last pet, check 'none'
      if (!newPets.dogs && !newPets.cats) newPets.none = true;
      onChange({ ...details, pets: newPets });
    }
  };

  const Selector = ({ 
    label, 
    value, 
    options 
  }: { 
    label: string; 
    value: number; 
    options: number[] 
  }) => (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-slate-700">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            disabled={disabled}
            onClick={() => update(label.toLowerCase().includes('bath') ? 'bathrooms' : 'bedrooms', opt)}
            className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium border transition-all ${
              value === opt
                ? 'bg-brand-600 text-white border-brand-600 shadow-md ring-2 ring-brand-200 ring-offset-1'
                : 'bg-white text-slate-600 border-gray-200 hover:border-brand-300 hover:bg-brand-50'
            } ${disabled ? 'cursor-not-allowed opacity-80' : ''}`}
          >
            {opt}{label.includes('Bath') && opt % 1 !== 0 ? '' : ''}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-8 relative">
       {/* Locked Overlay if we wanted to be explicit, but parent handles blurring */}
      
      <div className="flex items-center gap-3 mb-2">
        <div className="bg-brand-100 text-brand-700 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">3</div>
        <h2 className="text-xl font-bold text-slate-900">Tell us about your home</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Selector 
          label="Bedrooms" 
          value={details.bedrooms} 
          options={[1, 2, 3, 4, 5]} 
        />
        <Selector 
          label="Bathrooms" 
          value={details.bathrooms} 
          options={[1, 1.5, 2, 2.5, 3]} 
        />
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label className="text-sm font-semibold text-slate-700">Square Footage</label>
          <span className="text-brand-600 font-bold bg-brand-50 px-3 py-1 rounded-md text-sm border border-brand-100">
            {details.sqFt.toLocaleString()} sq ft
          </span>
        </div>
        <input
          type="range"
          min="500"
          max="5000"
          step="100"
          disabled={disabled}
          value={details.sqFt}
          onChange={(e) => update('sqFt', parseInt(e.target.value))}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
        />
        <div className="flex justify-between text-xs text-slate-400 font-medium">
          <span>500</span>
          <span>5000+</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">People in home</label>
          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden w-fit bg-white shadow-sm">
            <button 
              disabled={disabled}
              className="px-4 py-3 hover:bg-slate-50 text-slate-600 transition-colors disabled:opacity-50"
              onClick={() => update('people', Math.max(1, details.people - 1))}
            >-</button>
            <div className="px-4 py-3 font-bold text-slate-900 min-w-[50px] text-center border-x border-slate-100">
              {details.people}
            </div>
            <button 
              disabled={disabled}
              className="px-4 py-3 hover:bg-slate-50 text-slate-600 transition-colors disabled:opacity-50"
              onClick={() => update('people', Math.min(10, details.people + 1))}
            >+</button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Pets</label>
          <div className="flex gap-2">
            {[
              { id: 'dogs', label: 'Dogs' },
              { id: 'cats', label: 'Cats' },
              { id: 'none', label: 'None' }
            ].map((pet) => (
              <button
                key={pet.id}
                disabled={disabled}
                onClick={() => updatePets(pet.id as any)}
                className={`flex-1 px-3 py-3 rounded-lg text-sm font-medium border transition-all ${
                  details.pets[pet.id as keyof typeof details.pets]
                    ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                    : 'bg-white text-slate-600 border-gray-200 hover:border-brand-300'
                }`}
              >
                {pet.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};