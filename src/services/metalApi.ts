// Metal price API service
// Note: In production, API keys should be stored securely in environment variables
// For demo purposes, we'll use a mock service that simulates real data

export interface MetalPrice {
  current: number;
  previousClose: number;
  previousOpen: number;
  lastUpdated: string;
}

export interface MetalPrices {
  gold: MetalPrice;
  silver: MetalPrice;
  platinum: MetalPrice;
}

// Mock data that simulates real metal prices
const generateMockPrice = (basePrice: number): MetalPrice => {
  const variation = (Math.random() - 0.5) * 0.02; // ±1% variation
  const current = basePrice * (1 + variation);
  const previousClose = basePrice * (1 + (Math.random() - 0.5) * 0.015);
  const previousOpen = basePrice * (1 + (Math.random() - 0.5) * 0.01);
  
  return {
    current: Math.round(current * 100) / 100,
    previousClose: Math.round(previousClose * 100) / 100,
    previousOpen: Math.round(previousOpen * 100) / 100,
    lastUpdated: new Date().toISOString()
  };
};

const basePrices = {
  gold: 2030.50,    // Gold price per oz in USD
  silver: 24.75,    // Silver price per oz in USD  
  platinum: 975.25  // Platinum price per oz in USD
};

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchMetalPrices = async (): Promise<MetalPrices> => {
  // Simulate network delay
  await delay(Math.random() * 2000 + 500);
  
  // Simulate occasional API failures (10% chance)
  if (Math.random() < 0.1) {
    throw new Error('Failed to fetch metal prices from API');
  }
  
  return {
    gold: generateMockPrice(basePrices.gold),
    silver: generateMockPrice(basePrices.silver),
    platinum: generateMockPrice(basePrices.platinum)
  };
};

export const fetchSingleMetalPrice = async (metal: 'gold' | 'silver' | 'platinum'): Promise<MetalPrice> => {
  // Simulate network delay
  await delay(Math.random() * 1500 + 300);
  
  // Simulate occasional API failures (10% chance)
  if (Math.random() < 0.1) {
    throw new Error(`Failed to fetch ${metal} price from API`);
  }
  
  return generateMockPrice(basePrices[metal]);
};

// Real API integration would look like this:
/*
export const fetchMetalPrices = async (): Promise<MetalPrices> => {
  const API_KEY = process.env.METALS_API_KEY;
  const response = await fetch(`https://metals-api.com/api/latest?access_key=${API_KEY}&base=USD&symbols=XAU,XAG,XPT`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch metal prices');
  }
  
  const data = await response.json();
  
  return {
    gold: {
      current: 1 / data.rates.XAU, // Convert to USD per oz
      previousClose: 1 / data.rates.XAU, // Would need historical data
      previousOpen: 1 / data.rates.XAU,
      lastUpdated: data.timestamp
    },
    // Similar for silver and platinum...
  };
};
*/