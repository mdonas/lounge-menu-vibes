import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Database } from "@/lib/supabaseTypes";

type ProductFull =
  Database['public']['Views']['products_full']['Row'];

export const useProductDetail = (productId?: string) => {
  return useQuery({
    queryKey: ["product-detail", productId],
    enabled: !!productId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products_full")
        .select("*")
        .eq("id", productId)
        .single();

      if (error) throw error;
      return data as ProductFull;
    },
  });
};
