import { Card } from "@/components/ui/card";
import { Loader2, TrendingUp, TrendingDown, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface MetalPrice {
  current: number;
  previousClose?: number;
  lastUpdated: string;
}

interface MetalPriceCardProps {
  metal: 'gold' | 'silver' | 'platinum';
  price: MetalPrice | null;
  loading: boolean;
  error: string | null;
}

const metalConfig = {
  gold: {
    name: 'Gold',
    symbol: 'XAU',
    unit: 'oz',
    gradient: 'bg-gradient-gold',
    shadow: 'shadow-gold',
    textColor: 'text-gold-foreground',
    icon: '🏆'
  },
  silver: {
    name: 'Silver', 
    symbol: 'XAG',
    unit: 'oz',
    gradient: 'bg-gradient-silver',
    shadow: 'shadow-silver',
    textColor: 'text-silver-foreground',
    icon: '🥈'
  },
  platinum: {
    name: 'Platinum',
    symbol: 'XPT', 
    unit: 'oz',
    gradient: 'bg-gradient-platinum',
    shadow: 'shadow-platinum',
    textColor: 'text-platinum-foreground',
    icon: '💎'
  }
};

export const MetalPriceCard = ({ metal, price, loading, error }: MetalPriceCardProps) => {
  const navigate = useNavigate();
  const config = metalConfig[metal];

  const handleClick = () => {
    if (!loading && !error) {
      navigate(`/metal/${metal}`);
    }
  };

  const getPriceChange = () => {
    if (!price?.current || !price?.previousClose) return null;
    const change = price.current - price.previousClose;
    const changePercent = (change / price.previousClose) * 100;
    return { change, changePercent };
  };

  const priceChange = getPriceChange();

  return (
    <Card 
      className={`${config.gradient} ${config.shadow} cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl p-6 border-0`}
      onClick={handleClick}
    >
      <div className={`${config.textColor} space-y-4`}>
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{config.icon}</span>
            <div>
              <h3 className="text-xl font-bold">{config.name}</h3>
              <p className="text-sm opacity-80">{config.symbol}/{config.unit}</p>
            </div>
          </div>
        </div>

        {/* Price Display */}
        <div className="space-y-2">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : error ? (
            <div className="flex items-center gap-2 py-4">
              <AlertCircle className="h-5 w-5 text-destructive" />
              <span className="text-sm">Failed to load price</span>
            </div>
          ) : price ? (
            <>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">
                  ${price.current.toLocaleString('en-US', { 
                    minimumFractionDigits: 2, 
                    maximumFractionDigits: 2 
                  })}
                </span>
                <span className="text-sm opacity-80">USD</span>
              </div>
              
              {priceChange && (
                <div className={`flex items-center gap-1 text-sm ${
                  priceChange.change >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {priceChange.change >= 0 ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  <span>
                    {priceChange.change >= 0 ? '+' : ''}
                    ${Math.abs(priceChange.change).toFixed(2)} 
                    ({priceChange.changePercent >= 0 ? '+' : ''}
                    {priceChange.changePercent.toFixed(2)}%)
                  </span>
                </div>
              )}
            </>
          ) : null}
        </div>

        {/* Last Updated */}
        {price && !loading && (
          <div className="text-xs opacity-70">
            Last updated: {new Date(price.lastUpdated).toLocaleString()}
          </div>
        )}
      </div>
    </Card>
  );
};