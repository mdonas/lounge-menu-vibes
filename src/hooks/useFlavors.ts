import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { Database } from '@/lib/supabaseTypes';

type Flavor = Database['public']['Tables']['flavors']['Row'];

// Hook para obtener todos los sabores disponibles
export const useFlavors = () => {
  return useQuery({
    queryKey: ['flavors'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('flavors')
        .select('*')
        .eq('is_available', true)
        .order('display_order', { ascending: true });

      if (error) throw error;
      return data as Flavor[];
    },
  });
};