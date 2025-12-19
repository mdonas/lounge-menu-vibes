import { useState } from "react";
import Header from "@/components/Header";
import SectionNav from "@/components/SectionNav";
import MenuSection from "@/components/MenuSection";
import MenuItem from "@/components/MenuItem";
import Footer from "@/components/Footer";
import ProductDetailDialog from "@/components/ProductDetailDialog";
import { useCategories } from "@/hooks/useCategories";
import { useProductsByCategory } from "@/hooks/useProducts";
import { Skeleton } from "@/components/ui/skeleton";

const Index = () => {
  const { data: categories, isLoading: loadingCategories } = useCategories();
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  if (loadingCategories) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-8 space-y-8">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <SectionNav />
      
      <main className="container">
        {/* Renderizar todas las categorías dinámicamente */}
        {categories?.map((category, index) => (
          <div key={category.id}>
            {/* Separador entre secciones (excepto antes de la primera) */}
            {index > 0 && (
              <div className="flex items-center justify-center py-8">
                <div className="h-px w-24 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
              </div>
            )}
            
            <section id={category.slug}>
              <MenuSection 
                title={category.name} 
                subtitle={category.subtitle || undefined}
              >
                {/* Si es categoría de copas, agrupar por tag */}
                {category.slug === 'copas' || category.slug === 'copas-premium' ? (
                  <CategoryProductsGrouped categoryId={category.id} onSelectProduct={setSelectedProduct} />
                ) : (
                  <CategoryProducts categoryId={category.id} onSelectProduct={setSelectedProduct} />
                )}
              </MenuSection>
            </section>
          </div>
        ))}
      </main>

      <Footer />

      {/* Dialog detalle producto */}
      <ProductDetailDialog
        productId={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};

// Componente para renderizar productos de una categoría
const CategoryProducts = ({ 
  categoryId, 
  onSelectProduct 
}: { 
  categoryId: string;
  onSelectProduct: (id: string) => void;
}) => {
  const { data: products, isLoading } = useProductsByCategory(categoryId);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <p className="text-muted-foreground text-center py-8 text-sm">
        No hay productos disponibles
      </p>
    );
  }

  return (
    <>
      {products.map((product) => (
        <MenuItem 
          key={product.id}
          onClick={() => onSelectProduct(product.id)}
          name={product.name}
          description={product.description || undefined}
          price={product.price_display || `${product.price}€`}
          tag={product.tag || undefined}
          imageUrl={product.image_url || undefined}
        />
      ))}
    </>
  );
};

// Componente para renderizar productos agrupados por tag (para copas)
const CategoryProductsGrouped = ({ 
  categoryId,
  onSelectProduct 
}: { 
  categoryId: string;
  onSelectProduct: (id: string) => void;
}) => {
  const { data: products, isLoading } = useProductsByCategory(categoryId);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <p className="text-muted-foreground text-center py-8 text-sm">
        No hay productos disponibles
      </p>
    );
  }

  // Agrupar por tag
  const grouped = products.reduce((acc, product) => {
    const tag = product.tag || 'Otros';
    if (!acc[tag]) acc[tag] = [];
    acc[tag].push(product);
    return acc;
  }, {} as Record<string, typeof products>);

  return (
    <div className="space-y-6">
      {Object.entries(grouped).map(([tag, items]) => (
        <div key={tag} className="space-y-2">
          <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-4">
            {tag}
          </h4>
          {items.map((product) => (
            <MenuItem 
              key={product.id}
              onClick={() => onSelectProduct(product.id)}
              name={product.name}
              description={product.description || undefined}
              price={product.price_display || `${product.price}€`}
              imageUrl={product.image_url || undefined}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Index;