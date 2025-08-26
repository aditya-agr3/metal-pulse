import { MetalPriceCard } from "@/components/MetalPriceCard";
import { useMetalPrices } from "@/hooks/useMetalPrices";
import { Button } from "@/components/ui/button";
import { RefreshCw, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { data: prices, loading, error, refetch } = useMetalPrices(true, 60000); // Auto-refresh every minute
  const { toast } = useToast();

  const handleRefresh = async () => {
    toast({
      title: "Refreshing prices...",
      description: "Fetching latest metal prices",
    });
    await refetch();
    toast({
      title: "Prices updated",
      description: "Metal prices have been refreshed",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-background">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
        <div className="relative max-w-6xl mx-auto px-6 py-12">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <TrendingUp className="h-8 w-8 text-primary" />
              <h1 className="text-4xl md:text-6xl font-bold text-foreground">
                Metal Price Tracker
              </h1>
            </div>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Track real-time prices for precious metals including Gold, Silver, and Platinum. 
              Stay informed with live market data and price changes.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button 
                onClick={handleRefresh}
                variant="outline"
                className="border-primary/20 hover:bg-primary/10"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh All Prices
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Metal Price Cards */}
      <main className="max-w-6xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <MetalPriceCard
            metal="gold"
            price={prices?.gold ? {
              current: prices.gold.current,
              previousClose: prices.gold.previousClose,
              lastUpdated: prices.gold.lastUpdated
            } : null}
            loading={loading}
            error={error}
          />
          
          <MetalPriceCard
            metal="silver"
            price={prices?.silver ? {
              current: prices.silver.current,
              previousClose: prices.silver.previousClose,
              lastUpdated: prices.silver.lastUpdated
            } : null}
            loading={loading}
            error={error}
          />
          
          <MetalPriceCard
            metal="platinum"
            price={prices?.platinum ? {
              current: prices.platinum.current,
              previousClose: prices.platinum.previousClose,
              lastUpdated: prices.platinum.lastUpdated
            } : null}
            loading={loading}
            error={error}
          />
        </div>

        {/* Info Section */}
        <div className="mt-16 text-center">
          <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Live Market Data
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform provides real-time precious metal pricing data. 
              Click on any metal card to view detailed information including previous close, 
              previous open, and historical price changes. Prices are updated automatically every minute.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-3xl mb-2">🏆</div>
                <h3 className="font-semibold text-foreground">Gold (XAU)</h3>
                <p className="text-sm text-muted-foreground">The ultimate store of value</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🥈</div>
                <h3 className="font-semibold text-foreground">Silver (XAG)</h3>
                <p className="text-sm text-muted-foreground">Industrial & precious metal</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">💎</div>
                <h3 className="font-semibold text-foreground">Platinum (XPT)</h3>
                <p className="text-sm text-muted-foreground">Rare automotive metal</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="text-center text-muted-foreground">
            <p className="text-sm">
              Metal Price Tracker &copy; 2024. Real-time precious metal market data.
            </p>
            <p className="text-xs mt-2 opacity-70">
              Prices are for informational purposes only and may not reflect actual market conditions.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;