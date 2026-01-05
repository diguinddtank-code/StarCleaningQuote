export enum ServiceType {
  STANDARD = 'Standard Clean',
  DEEP_CLEAN = 'Deep Clean',
  MOVE_IN_OUT = 'Move-In/Move-Out',
}

export enum ServiceFrequency {
  ONE_TIME = 'One-Time',
  WEEKLY = 'Weekly',
  BIWEEKLY = 'Every 2 Weeks',
  MONTHLY = 'Every 4 Weeks',
}

export interface ContactInfo {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  tcpaConsent: boolean;
}

export interface HomeDetails {
  bedrooms: number;
  bathrooms: number;
  sqFt: number;
  people: number;
  pets: {
    dogs: boolean;
    cats: boolean;
    none: boolean;
  };
}

export interface ServiceState {
  type: ServiceType;
  frequency: ServiceFrequency;
}

export interface BookingState {
  zipCode: string;
  city: string;
  isZipValid: boolean;
  contact: ContactInfo;
  homeDetails: HomeDetails;
  service: ServiceState;
}

export interface PriceCalculation {
  subtotal: number;
  discount: number;
  total: number;
}