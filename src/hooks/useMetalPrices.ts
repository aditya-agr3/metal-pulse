import { useState, useEffect } from 'react';
import { fetchMetalPrices, MetalPrices } from '@/services/metalApi';

interface MetalPricesState {
  data: MetalPrices | null;
  loading: boolean;
  error: string | null;
}

export const useMetalPrices = (autoRefresh = false, refreshInterval = 30000) => {
  const [state, setState] = useState<MetalPricesState>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchPrices = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const prices = await fetchMetalPrices();
      setState({ data: prices, loading: false, error: null });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch metal prices';
      setState({ data: null, loading: false, error: errorMessage });
    }
  };

  useEffect(() => {
    fetchPrices();
  }, []);

  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(fetchPrices, refreshInterval);
    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval]);

  return {
    ...state,
    refetch: fetchPrices,
  };
};