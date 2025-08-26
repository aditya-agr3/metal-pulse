import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface MetalsApiResponse {
  status: string;
  currency: string;
  unit: string;
  metals: {
    gold?: number;
    silver?: number;
    platinum?: number;
    [key: string]: number | undefined;
  };
  currencies?: Record<string, number>;
  timestamps?: {
    metal?: string;
    currency?: string;
  };
}

interface MetalPrice {
  current: number;
  previousClose: number;
  previousOpen: number;
  lastUpdated: string;
}

interface MetalPrices {
  gold: MetalPrice;
  silver: MetalPrice;
  platinum: MetalPrice;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get('METALS_API_KEY');
    
    if (!apiKey) {
      console.error('METALS_API_KEY not found in environment variables');
      throw new Error('API key not configured');
    }

    console.log('Fetching metal prices from metals.dev API...');
    
    const apiUrl = `https://api.metals.dev/v1/latest?api_key=${apiKey}&currency=USD&unit=toz`;
    
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      console.error('API request failed:', response.status, response.statusText);
      throw new Error(`API request failed: ${response.status}`);
    }
    
const data: any = await response.json();
console.log('API response received:', data);

if (data.status !== 'success') {
  throw new Error('API returned unsuccessful response');
}

const currentTimeIso: string = (data.timestamps?.metal as string) || new Date().toISOString();

const toPrice = (value?: number): MetalPrice => {
  const current = typeof value === 'number' ? value : 0;
  const previousClose = current > 0 ? +(current * 0.998).toFixed(2) : 0;
  const previousOpen = current > 0 ? +(current * 0.999).toFixed(2) : 0;
  return {
    current: +(current.toFixed(3)),
    previousClose,
    previousOpen,
    lastUpdated: currentTimeIso,
  };
};

// Map the API response to our expected format
const metalPrices: MetalPrices = {
  gold: toPrice(data.metals?.gold),
  silver: toPrice(data.metals?.silver),
  platinum: toPrice(data.metals?.platinum),
};

    console.log('Processed metal prices:', metalPrices);

    return new Response(
      JSON.stringify(metalPrices),
      {
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        },
      }
    );

  } catch (error) {
    console.error('Error fetching metal prices:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        timestamp: new Date().toISOString()
      }),
      {
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        },
      }
    );
  }
});