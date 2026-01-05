import React from 'react';
import { User, Phone, Mail, CheckCircle } from 'lucide-react';
import { ContactInfo } from '../types';

interface StepContactProps {
  contact: ContactInfo;
  onChange: (contact: ContactInfo) => void;
}

export const StepContact: React.FC<StepContactProps> = ({ contact, onChange }) => {
  const handleChange = (field: keyof ContactInfo, value: any) => {
    onChange({ ...contact, [field]: value });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '');
    let formatted = raw;
    if (raw.length > 0) {
      if (raw.length <= 3) formatted = `(${raw}`;
      else if (raw.length <= 6) formatted = `(${raw.slice(0, 3)}) ${raw.slice(3)}`;
      else formatted = `(${raw.slice(0, 3)}) ${raw.slice(3, 6)}-${raw.slice(6, 10)}`;
    }
    handleChange('phone', formatted);
  };

  const isComplete = contact.firstName && contact.lastName && contact.phone.length >= 10 && contact.email.includes('@');

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-2">
         <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${isComplete ? 'bg-green-100 text-green-700' : 'bg-brand-100 text-brand-700'}`}>
          {isComplete ? <CheckCircle className="w-5 h-5" /> : '2'}
        </div>
        <h2 className="text-xl font-bold text-slate-900">Contact Info</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative group">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-brand-500 transition-colors" />
          <input
            type="text"
            name="firstName"
            autoComplete="given-name"
            placeholder="First Name"
            value={contact.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-900 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all placeholder:text-slate-400 shadow-sm hover:border-brand-300"
          />
        </div>
        <div className="relative group">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-brand-500 transition-colors" />
          <input
            type="text"
            name="lastName"
            autoComplete="family-name"
            placeholder="Last Name"
            value={contact.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-900 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all placeholder:text-slate-400 shadow-sm hover:border-brand-300"
          />
        </div>
        <div className="relative group">
          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-brand-500 transition-colors" />
          <input
            type="tel"
            name="phone"
            autoComplete="tel"
            placeholder="(555) 555-5555"
            value={contact.phone}
            onChange={handlePhoneChange}
            className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-900 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all placeholder:text-slate-400 shadow-sm hover:border-brand-300"
          />
        </div>
        <div className="relative group">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-brand-500 transition-colors" />
          <input
            type="email"
            name="email"
            autoComplete="email"
            placeholder="email@address.com"
            value={contact.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-900 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all placeholder:text-slate-400 shadow-sm hover:border-brand-300"
          />
        </div>
      </div>

      <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200 mt-2 hover:border-brand-200 transition-colors">
        <input
          type="checkbox"
          id="tcpa"
          checked={contact.tcpaConsent}
          onChange={(e) => handleChange('tcpaConsent', e.target.checked)}
          className="mt-1 w-5 h-5 text-brand-600 rounded border-gray-300 focus:ring-brand-500 cursor-pointer"
        />
        <label htmlFor="tcpa" className="text-xs text-slate-600 cursor-pointer leading-relaxed select-none">
          By clicking check price, I agree to receive automated marketing text messages and calls from StarCleaning at the phone number provided. Consent is not a condition of purchase. Msg & data rates may apply.
        </label>
      </div>
    </div>
  );
};