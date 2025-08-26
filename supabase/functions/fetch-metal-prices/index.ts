import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface MetalsApiResponse {
  success: boolean;
  data: {
    [key: string]: number;
  };
  timestamp: number;
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
    
    const data: MetalsApiResponse = await response.json();
    console.log('API response received:', data);
    
    if (!data.success) {
      throw new Error('API returned unsuccessful response');
    }

    // Map the API response to our expected format
    const metalPrices: MetalPrices = {
      gold: {
        current: data.data.XAU || 0,
        previousClose: data.data.XAU ? data.data.XAU * 0.998 : 0, // Simulate previous close
        previousOpen: data.data.XAU ? data.data.XAU * 0.999 : 0,  // Simulate previous open
        lastUpdated: new Date(data.timestamp * 1000).toISOString()
      },
      silver: {
        current: data.data.XAG || 0,
        previousClose: data.data.XAG ? data.data.XAG * 0.998 : 0,
        previousOpen: data.data.XAG ? data.data.XAG * 0.999 : 0,
        lastUpdated: new Date(data.timestamp * 1000).toISOString()
      },
      platinum: {
        current: data.data.XPT || 0,
        previousClose: data.data.XPT ? data.data.XPT * 0.998 : 0,
        previousOpen: data.data.XPT ? data.data.XPT * 0.999 : 0,
        lastUpdated: new Date(data.timestamp * 1000).toISOString()
      }
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