export const PRICING = {
  BASE_PRICE: 100,
  BEDROOM_COST: 20,
  BATHROOM_COST: 15,
  
  // Additive multipliers (e.g. 0.3 = +30%)
  DEEP_CLEAN_MULTIPLIER: 0.3, 
  MOVE_IN_OUT_MULTIPLIER: 0.5,

  // Discounts (e.g. 0.2 = -20%)
  DISCOUNT_WEEKLY: 0.2,
  DISCOUNT_BIWEEKLY: 0.15,
  DISCOUNT_MONTHLY: 0.10,
};

export const MOCK_CITIES: Record<string, string> = {
  '90210': 'Beverly Hills',
  '10001': 'New York',
  '33101': 'Miami',
  '60601': 'Chicago',
  '94105': 'San Francisco',
  '75001': 'Dallas',
  // Fallback for demo
  'default': 'Your City'
};