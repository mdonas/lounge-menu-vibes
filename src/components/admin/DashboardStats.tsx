import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, FolderTree, TrendingUp, Eye } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const DashboardStats = () => {
  // Obtener estadísticas
  const { data: stats, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const [productsRes, categoriesRes, statsRes] = await Promise.all([
        supabase.from("products").select("*", { count: "exact", head: true }),
        supabase.from("categories").select("*", { count: "exact", head: true }),
        supabase.from("product_stats").select("*"),
      ]);

      return {
        totalProducts: productsRes.count || 0,
        totalCategories: categoriesRes.count || 0,
        categoryStats: statsRes.data || [],
      };
    },
  });

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-32" />
        ))}
      </div>
    );
  }

  const availableProducts = stats?.categoryStats.reduce(
    (sum, cat) => sum + (cat.available_products || 0),
    0
  ) || 0;

  const unavailableProducts = stats?.categoryStats.reduce(
    (sum, cat) => sum + (cat.unavailable_products || 0),
    0
  ) || 0;

  const avgPrice = stats?.categoryStats.reduce(
    (sum, cat) => sum + (cat.avg_price || 0),
    0
  ) / (stats?.categoryStats.length || 1);

  return (
    <div className="space-y-6">
      {/* Estadísticas principales */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Productos
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalProducts}</div>
            <p className="text-xs text-muted-foreground">
              {availableProducts} disponibles
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categorías</CardTitle>
            <FolderTree className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalCategories}</div>
            <p className="text-xs text-muted-foreground">
              {stats?.categoryStats.length} activas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Precio Promedio
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgPrice.toFixed(2)}€</div>
            <p className="text-xs text-muted-foreground">
              Por producto
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              No disponibles
            </CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unavailableProducts}</div>
            <p className="text-xs text-muted-foreground">
              Productos ocultos
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Estadísticas por categoría */}
      <Card>
        <CardHeader>
          <CardTitle>Productos por Categoría</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats?.categoryStats.map((cat) => (
              <div key={cat.slug} className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {cat.category}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {cat.available_products}/{cat.total_products} disponibles
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">
                    {cat.avg_price?.toFixed(2)}€
                  </p>
                  <p className="text-xs text-muted-foreground">promedio</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;