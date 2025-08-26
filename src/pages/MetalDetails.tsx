import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, AlertCircle, RefreshCw, TrendingUp, TrendingDown } from "lucide-react";
import { fetchSingleMetalPrice, MetalPrice } from "@/services/metalApi";
import { useToast } from "@/hooks/use-toast";

const metalConfig = {
  gold: {
    name: 'Gold',
    symbol: 'XAU',
    unit: 'oz',
    gradient: 'bg-gradient-gold',
    shadow: 'shadow-gold',
    textColor: 'text-gold-foreground',
    icon: '🏆',
    description: 'Precious metal used as a store of value and hedge against inflation'
  },
  silver: {
    name: 'Silver', 
    symbol: 'XAG',
    unit: 'oz',
    gradient: 'bg-gradient-silver',
    shadow: 'shadow-silver',
    textColor: 'text-silver-foreground',
    icon: '🥈',
    description: 'Industrial precious metal with diverse applications in technology and jewelry'
  },
  platinum: {
    name: 'Platinum',
    symbol: 'XPT', 
    unit: 'oz',
    gradient: 'bg-gradient-platinum',
    shadow: 'shadow-platinum',
    textColor: 'text-platinum-foreground',
    icon: '💎',
    description: 'Rare precious metal primarily used in automotive and jewelry industries'
  }
};

export default function MetalDetails() {
  const { metal } = useParams<{ metal: 'gold' | 'silver' | 'platinum' }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [price, setPrice] = useState<MetalPrice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const config = metal ? metalConfig[metal] : null;

  const fetchPrice = async () => {
    if (!metal) return;
    
    try {
      setLoading(true);
      setError(null);
      const priceData = await fetchSingleMetalPrice(metal);
      setPrice(priceData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch price';
      setError(errorMessage);
      toast({
        title: "Error fetching price",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrice();
  }, [metal]);

  if (!metal || !config) {
    return (
      <div className="min-h-screen bg-gradient-background flex items-center justify-center">
        <div className="text-center text-foreground">
          <h1 className="text-2xl font-bold mb-4">Metal not found</h1>
          <Button onClick={() => navigate('/')} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const getPriceChange = () => {
    if (!price) return null;
    const change = price.current - price.previousClose;
    const changePercent = (change / price.previousClose) * 100;
    return { change, changePercent };
  };

  const priceChange = getPriceChange();

  return (
    <div className="min-h-screen bg-gradient-background p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button 
            onClick={() => navigate('/')} 
            variant="outline"
            size="icon"
            className="border-border/50 hover:bg-muted/50"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-3">
            <span className="text-4xl">{config.icon}</span>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{config.name}</h1>
              <p className="text-muted-foreground">{config.description}</p>
            </div>
          </div>
        </div>

        {/* Price Card */}
        <Card className={`${config.gradient} ${config.shadow} p-8 border-0`}>
          <div className={`${config.textColor} space-y-6`}>
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="h-12 w-12 animate-spin mb-4" />
                <p>Loading {config.name.toLowerCase()} price...</p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <AlertCircle className="h-12 w-12 text-destructive" />
                <p className="text-center">Failed to load {config.name.toLowerCase()} price</p>
                <Button 
                  onClick={fetchPrice}
                  variant="outline"
                  className="bg-white/10 border-white/20 hover:bg-white/20"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Try Again
                </Button>
              </div>
            ) : price ? (
              <>
                {/* Current Price */}
                <div className="text-center space-y-2">
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-5xl font-bold">
                      ${price.current.toLocaleString('en-US', { 
                        minimumFractionDigits: 2, 
                        maximumFractionDigits: 2 
                      })}
                    </span>
                    <span className="text-lg opacity-80">USD/{config.unit}</span>
                  </div>
                  
                  {priceChange && (
                    <div className={`flex items-center justify-center gap-2 text-lg ${
                      priceChange.change >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {priceChange.change >= 0 ? (
                        <TrendingUp className="h-5 w-5" />
                      ) : (
                        <TrendingDown className="h-5 w-5" />
                      )}
                      <span>
                        {priceChange.change >= 0 ? '+' : ''}
                        ${Math.abs(priceChange.change).toFixed(2)} 
                        ({priceChange.changePercent >= 0 ? '+' : ''}
                        {priceChange.changePercent.toFixed(2)}%)
                      </span>
                    </div>
                  )}
                </div>

                {/* Price Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-black/10 rounded-lg p-4">
                    <p className="text-sm opacity-80 mb-1">Previous Close</p>
                    <p className="text-xl font-semibold">
                      ${price.previousClose.toLocaleString('en-US', { 
                        minimumFractionDigits: 2, 
                        maximumFractionDigits: 2 
                      })}
                    </p>
                  </div>
                  
                  <div className="bg-black/10 rounded-lg p-4">
                    <p className="text-sm opacity-80 mb-1">Previous Open</p>
                    <p className="text-xl font-semibold">
                      ${price.previousOpen.toLocaleString('en-US', { 
                        minimumFractionDigits: 2, 
                        maximumFractionDigits: 2 
                      })}
                    </p>
                  </div>
                </div>

                {/* Date and Time */}
                <div className="text-center pt-4 border-t border-white/20">
                  <p className="text-sm opacity-80">
                    Last Updated: {new Date(price.lastUpdated).toLocaleString()}
                  </p>
                  <p className="text-sm opacity-60 mt-1">
                    Today: {new Date().toLocaleDateString()}
                  </p>
                </div>

                {/* Refresh Button */}
                <div className="flex justify-center pt-4">
                  <Button 
                    onClick={fetchPrice}
                    variant="outline"
                    className="bg-white/10 border-white/20 hover:bg-white/20"
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Refresh Price
                  </Button>
                </div>
              </>
            ) : null}
          </div>
        </Card>
      </div>
    </div>
  );
}