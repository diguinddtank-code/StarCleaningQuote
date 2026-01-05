import React, { useState } from 'react';
import { Sparkles, Calendar } from 'lucide-react';
import { ServiceState, ServiceType, ServiceFrequency } from '../types';

interface StepServiceProps {
  service: ServiceState;
  onChange: (service: ServiceState) => void;
  disabled?: boolean;
}

export const StepService: React.FC<StepServiceProps> = ({ service, onChange, disabled }) => {
  const [activeTab, setActiveTab] = useState<'one-time' | 'recurring'>('recurring');

  const updateType = (type: ServiceType) => {
    if(disabled) return;
    onChange({ ...service, type, frequency: ServiceFrequency.ONE_TIME });
  };

  const updateFreq = (frequency: ServiceFrequency) => {
    if(disabled) return;
    onChange({ ...service, frequency, type: ServiceType.STANDARD });
  };

  const handleTabChange = (tab: 'one-time' | 'recurring') => {
    if(disabled) return;
    setActiveTab(tab);
    if(tab === 'recurring') updateFreq(ServiceFrequency.BIWEEKLY);
    else updateType(ServiceType.STANDARD);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="bg-brand-100 text-brand-700 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">4</div>
        <h2 className="text-xl font-bold text-slate-900">Choose Service</h2>
      </div>

      {/* Tabs */}
      <div className="bg-slate-100 p-1.5 rounded-xl flex shadow-inner">
        <button
          disabled={disabled}
          onClick={() => handleTabChange('recurring')}
          className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
            activeTab === 'recurring'
              ? 'bg-white text-brand-600 shadow-sm transform scale-[1.02]'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <Calendar className="w-4 h-4" />
          Recurring
        </button>
        <button
          disabled={disabled}
          onClick={() => handleTabChange('one-time')}
          className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
            activeTab === 'one-time'
              ? 'bg-white text-brand-600 shadow-sm transform scale-[1.02]'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          One-Time
        </button>
      </div>

      {/* Tab Content */}
      <div 
        key={activeTab}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 fade-in"
      >
        {activeTab === 'one-time' ? (
          <>
            {[
              { id: ServiceType.STANDARD, label: "Standard Clean", desc: "Design with Time" },
              { id: ServiceType.DEEP_CLEAN, label: "Deep Clean", desc: "Popular first time", badge: "Most Popular" },
              { id: ServiceType.MOVE_IN_OUT, label: "Move-In/Move-Out", desc: "Empty home" }
            ].map((opt) => (
              <button
                key={opt.id}
                disabled={disabled}
                onClick={() => updateType(opt.id)}
                className={`relative p-5 rounded-xl border text-left transition-all duration-200 ease-out group active:scale-[0.98] ${
                  service.type === opt.id
                    ? 'border-brand-500 bg-brand-50 ring-2 ring-brand-500 ring-offset-2 scale-[1.02] shadow-md z-10'
                    : 'border-slate-300 bg-white hover:border-brand-300 hover:shadow-md hover:scale-[1.005] shadow-sm'
                }`}
              >
                {opt.badge && (
                  <span className="absolute -top-3 right-4 bg-amber-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider shadow-sm z-20 animate-pulse">
                    {opt.badge}
                  </span>
                )}
                <div className={`font-bold transition-colors ${service.type === opt.id ? 'text-brand-700' : 'text-slate-800'}`}>
                  {opt.label}
                </div>
                <div className="text-xs text-slate-500 mt-1">{opt.desc}</div>
                
                {/* Animated Checkmark */}
                <div className={`absolute right-3 bottom-3 text-brand-600 transition-all duration-300 cubic-bezier(0.34, 1.56, 0.64, 1) transform ${
                  service.type === opt.id ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                }`}>
                  <CheckCircleIcon />
                </div>
              </button>
            ))}
          </>
        ) : (
          <>
            {[
              { id: ServiceFrequency.WEEKLY, label: "Weekly", discount: "20% OFF", desc: "Premium Service" },
              { id: ServiceFrequency.BIWEEKLY, label: "Every 2 Weeks", discount: "15% OFF", desc: "Most Popular", badge: "Best Value" },
              { id: ServiceFrequency.MONTHLY, label: "Every 4 Weeks", discount: "10% OFF", desc: "Maintenance" }
            ].map((opt) => (
              <button
                key={opt.id}
                disabled={disabled}
                onClick={() => updateFreq(opt.id)}
                className={`relative p-5 rounded-xl border text-left transition-all duration-200 ease-out group active:scale-[0.98] ${
                  service.frequency === opt.id
                    ? 'border-brand-500 bg-brand-50 ring-2 ring-brand-500 ring-offset-2 scale-[1.02] shadow-md z-10'
                    : 'border-slate-300 bg-white hover:border-brand-300 hover:shadow-md hover:scale-[1.005] shadow-sm'
                }`}
              >
                {opt.badge && (
                  <span className="absolute -top-3 right-4 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider shadow-sm z-20 animate-pulse">
                    {opt.badge}
                  </span>
                )}
                <div className="flex justify-between items-start">
                  <div className={`font-bold transition-colors ${service.frequency === opt.id ? 'text-brand-700' : 'text-slate-800'}`}>
                    {opt.label}
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded transition-colors ${
                     service.frequency === opt.id ? 'bg-brand-600 text-white' : 'bg-brand-100 text-brand-700'
                  }`}>
                    {opt.discount}
                  </span>
                </div>
                <div className="text-xs text-slate-500 mt-1">{opt.desc}</div>
                
                {/* Selection Indicator (Side Bar) */}
                <div className={`absolute right-0 top-0 bottom-0 w-1 bg-brand-500 rounded-l transition-all duration-300 ${
                  service.frequency === opt.id ? 'opacity-100' : 'opacity-0'
                }`}></div>
                
                {/* Animated Checkmark (New for Frequency) */}
                 <div className={`absolute right-3 bottom-3 text-brand-600 transition-all duration-300 cubic-bezier(0.34, 1.56, 0.64, 1) transform ${
                  service.frequency === opt.id ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                }`}>
                  <CheckCircleIcon />
                </div>
              </button>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

const CheckCircleIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
);