import { supabase } from '@/integrations/supabase/client';

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

export const fetchMetalPrices = async (): Promise<MetalPrices> => {
  try {
    const { data, error } = await supabase.functions.invoke('fetch-metal-prices');
    
    if (error) {
      console.error('Error calling metal prices function:', error);
      throw new Error('Failed to fetch metal prices from API');
    }
    
    return data as MetalPrices;
  } catch (error) {
    console.error('Error fetching metal prices:', error);
    throw new Error('Failed to fetch metal prices from API');
  }
};

export const fetchSingleMetalPrice = async (metal: 'gold' | 'silver' | 'platinum'): Promise<MetalPrice> => {
  try {
    const prices = await fetchMetalPrices();
    return prices[metal];
  } catch (error) {
    console.error(`Error fetching ${metal} price:`, error);
    throw new Error(`Failed to fetch ${metal} price from API`);
  }
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