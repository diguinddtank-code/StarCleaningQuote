import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { StepLocation } from './components/StepLocation';
import { StepContact } from './components/StepContact';
import { StepHomeDetails } from './components/StepHomeDetails';
import { StepService } from './components/StepService';
import { SummarySidebar } from './components/SummarySidebar';
import { BookingState, ServiceFrequency, ServiceType } from './types';
import { PRICING } from './constants';
import { Check } from 'lucide-react';

const INITIAL_STATE: BookingState = {
  zipCode: '',
  isZipValid: false,
  city: '',
  contact: {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    tcpaConsent: false,
  },
  homeDetails: {
    bedrooms: 1,
    bathrooms: 1,
    sqFt: 1000,
    people: 1,
    pets: {
      dogs: false,
      cats: false,
      none: true,
    },
  },
  service: {
    type: ServiceType.STANDARD,
    frequency: ServiceFrequency.ONE_TIME,
  },
};

export default function App() {
  const [booking, setBooking] = useState<BookingState>(INITIAL_STATE);
  const [isScrolled, setIsScrolled] = useState(false);

  // Validation Logic
  const isZipComplete = booking.isZipValid;
  const isContactComplete = useMemo(() => {
    const { contact } = booking;
    return (
      contact.firstName.length > 1 &&
      contact.lastName.length > 1 &&
      contact.phone.length >= 10 &&
      contact.email.includes('@') &&
      contact.tcpaConsent
    );
  }, [booking.contact]);

  // Pricing Logic
  const price = useMemo(() => {
    let total = PRICING.BASE_PRICE;

    // Add Bedrooms
    total += booking.homeDetails.bedrooms * PRICING.BEDROOM_COST;

    // Add Bathrooms
    total += booking.homeDetails.bathrooms * PRICING.BATHROOM_COST;

    // Service Type Multiplier/Addition
    let multiplier = 1;
    if (booking.service.type === ServiceType.DEEP_CLEAN) {
      multiplier += PRICING.DEEP_CLEAN_MULTIPLIER;
    } else if (booking.service.type === ServiceType.MOVE_IN_OUT) {
      multiplier += PRICING.MOVE_IN_OUT_MULTIPLIER;
    }
    
    total = total * multiplier;

    // Frequency Discount
    let discount = 0;
    switch (booking.service.frequency) {
      case ServiceFrequency.WEEKLY:
        discount = PRICING.DISCOUNT_WEEKLY;
        break;
      case ServiceFrequency.BIWEEKLY:
        discount = PRICING.DISCOUNT_BIWEEKLY;
        break;
      case ServiceFrequency.MONTHLY:
        discount = PRICING.DISCOUNT_MONTHLY;
        break;
      default:
        discount = 0;
    }

    const discountAmount = total * discount;
    const finalPrice = total - discountAmount;

    return {
      subtotal: total,
      discount: discountAmount,
      total: finalPrice,
    };
  }, [booking.homeDetails, booking.service]);

  // Step Visibility Logic
  const isHomeDetailsUnlocked = isContactComplete;
  const isServiceUnlocked = isHomeDetailsUnlocked; 
  const showPrice = isHomeDetailsUnlocked;

  const currentStep = useMemo(() => {
    if (!isZipComplete) return 1;
    if (!isContactComplete) return 2;
    return 3; 
  }, [isZipComplete, isContactComplete]);

  const handleUpdate = (updates: Partial<BookingState>) => {
    setBooking((prev) => ({ ...prev, ...updates }));
  };

  // Scroll Detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      {/* Sticky Progress Bar */}
      <div className={`sticky top-16 z-40 bg-slate-50/95 backdrop-blur-sm border-b border-slate-200/60 shadow-sm transition-all duration-500 ease-in-out ${isScrolled ? 'py-2' : 'py-3'}`}>
        <div className="max-w-3xl mx-auto px-4">
            {/* Labels container with collapse transition */}
            <div className={`flex justify-between px-1 overflow-hidden transition-all duration-500 ease-in-out ${isScrolled ? 'max-h-0 opacity-0 mb-0' : 'max-h-8 opacity-100 mb-1.5'}`}>
                <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-colors duration-500 ${currentStep >= 1 ? 'text-brand-600' : 'text-slate-300'}`}>Location</span>
                <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-colors duration-500 ${currentStep >= 2 ? 'text-brand-600' : 'text-slate-300'}`}>Contact</span>
                <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-colors duration-500 ${currentStep >= 3 ? 'text-brand-600' : 'text-slate-300'}`}>Details</span>
            </div>
            <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-brand-500 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-[0_0_12px_rgba(14,165,233,0.6)]"
                  style={{ width: `${(currentStep / 3) * 100}%` }}
                ></div>
            </div>
        </div>
      </div>

      <main className="flex-grow container mx-auto px-4 py-6 md:py-8 max-w-6xl pb-32 lg:pb-8">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          
          {/* Left Column: Form Steps */}
          <div className="w-full lg:w-2/3 space-y-4">
            
            {/* Step 1: Location */}
            <div className={`bg-white rounded-xl shadow-lg shadow-slate-200/50 border border-slate-200 p-6 md:p-8 transition-all duration-300 ${isZipComplete ? 'border-l-4 border-l-brand-500' : ''}`}>
              <StepLocation 
                value={booking.zipCode}
                city={booking.city}
                isValid={booking.isZipValid}
                onChange={(zip, city, isValid) => handleUpdate({ zipCode: zip, city, isZipValid: isValid })}
              />
            </div>

            {/* Step 2: Contact */}
            <div 
              id="step-contact"
              className={`bg-white rounded-xl shadow-lg shadow-slate-200/50 border border-slate-200 p-6 md:p-8 transition-all duration-300 
                ${!isZipComplete ? 'opacity-50 pointer-events-none grayscale' : ''}
                ${isContactComplete ? 'border-l-4 border-l-brand-500' : ''}
              `}
            >
              <StepContact 
                contact={booking.contact}
                onChange={(contact) => handleUpdate({ contact })}
              />
            </div>

            {/* Step 3: Home Details */}
            <div 
              className={`bg-white rounded-xl shadow-lg shadow-slate-200/50 border border-slate-200 p-6 md:p-8 transition-all duration-300 
                ${!isHomeDetailsUnlocked ? 'opacity-40 pointer-events-none select-none blur-[1px]' : ''}
              `}
            >
              <StepHomeDetails 
                details={booking.homeDetails}
                onChange={(homeDetails) => handleUpdate({ homeDetails })}
                disabled={!isHomeDetailsUnlocked}
              />
            </div>

            {/* Step 4: Service */}
            <div 
              className={`bg-white rounded-xl shadow-lg shadow-slate-200/50 border border-slate-200 p-6 md:p-8 transition-all duration-300
                 ${!isServiceUnlocked ? 'opacity-40 pointer-events-none select-none blur-[1px]' : ''}
              `}
            >
              <StepService 
                service={booking.service}
                onChange={(service) => handleUpdate({ service })}
                disabled={!isServiceUnlocked}
              />
            </div>

          </div>

          {/* Right Column: Sticky Summary */}
          <div className="w-full lg:w-1/3 lg:sticky lg:top-36 transition-all duration-500">
            <SummarySidebar 
              booking={booking} 
              price={price} 
              canBook={isContactComplete} 
              showPrice={showPrice}
            />
          </div>

        </div>
      </main>

      {/* Mobile Sticky Footer */}
      {showPrice && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.15)] z-50 animate-slide-up">
          <div className="flex justify-between items-center max-w-md mx-auto gap-4">
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wide">Estimated Total</span>
              <span className="text-xl font-bold text-slate-900 leading-none">${price.total.toFixed(0)}</span>
            </div>
            <button 
              className="flex-1 bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg active:scale-95 transition-all text-sm"
              onClick={() => {
                alert("Booking Submitted! (Demo)");
              }}
            >
              Book Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}