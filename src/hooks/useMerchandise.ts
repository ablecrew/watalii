import { useState, useEffect } from 'react';
import { fetchMerchandise, type Merchandise } from '../lib/supabase';

export function useMerchandise() {
  const [items, setItems] = useState<Merchandise[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await fetchMerchandise();
        setItems(data);
      } catch (error) {
        console.error('Failed to fetch merchandise:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { items, loading };
}