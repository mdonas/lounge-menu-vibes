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

  // Encontrar categorías por slug
  const cachimbas = categories?.find(c => c.slug === 'cachimbas');
  const paraPicar = categories?.find(c => c.slug === 'para-picar');
  const cervezas = categories?.find(c => c.slug === 'cervezas');
  const refrescos = categories?.find(c => c.slug === 'refrescos');
  const copas = categories?.find(c => c.slug === 'copas');
  const chupitos = categories?.find(c => c.slug === 'chupitos');
  const cocteles = categories?.find(c => c.slug === 'cocteles');
  const vinos = categories?.find(c => c.slug === 'vinos');

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <SectionNav />
      
      <main className="container">
        {/* Cachimbas */}
        {cachimbas && (
          <section id="cachimbas">
            <MenuSection 
              title={cachimbas.name} 
              subtitle={cachimbas.subtitle || undefined}
            >
              <CategoryProducts categoryId={cachimbas.id} onSelectProduct={setSelectedProduct} />
            </MenuSection>
          </section>
        )}

        {/* Para Picar */}
        {paraPicar && (
          <section id="para-picar">
            <MenuSection 
              title={paraPicar.name} 
              subtitle={paraPicar.subtitle || undefined}
            >
              <CategoryProducts categoryId={paraPicar.id} onSelectProduct={setSelectedProduct} />
            </MenuSection>
          </section>
        )}

        {/* Separator */}
        <div className="flex items-center justify-center py-8">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        </div>

        {/* Bebidas - Grid de categorías */}
        <section id="bebidas">
          <MenuSection 
            title="Bebidas" 
            subtitle="Cervezas, refrescos y más"
          >
            <div className="grid md:grid-cols-2 gap-8">
              {/* Cervezas */}
              {cervezas && (
                <div className="space-y-2">
                  <h3 className="text-gold text-sm font-medium uppercase tracking-wider mb-4 px-4">
                    {cervezas.icon} {cervezas.name}
                  </h3>
                  <CategoryProducts categoryId={cervezas.id} onSelectProduct={setSelectedProduct} />
                </div>
              )}

              {/* Refrescos */}
              {refrescos && (
                <div className="space-y-2">
                  <h3 className="text-gold text-sm font-medium uppercase tracking-wider mb-4 px-4">
                    {refrescos.icon} {refrescos.name}
                  </h3>
                  <CategoryProducts categoryId={refrescos.id} onSelectProduct={setSelectedProduct} />
                </div>
              )}
            </div>
          </MenuSection>
        </section>

        {/* Separator */}
        <div className="flex items-center justify-center py-8">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        </div>

        {/* Copas */}
        {copas && (
          <section id="copas">
            <MenuSection 
              title={copas.name} 
              subtitle={copas.subtitle || "Destilados premium"}
            >
              <CategoryProductsGrouped categoryId={copas.id} onSelectProduct={setSelectedProduct} />
            </MenuSection>
          </section>
        )}

        {/* Chupitos */}
        {chupitos && (
          <section id="chupitos">
            <MenuSection 
              title={chupitos.name} 
              subtitle={chupitos.subtitle || undefined}
            >
              <CategoryProducts categoryId={chupitos.id} onSelectProduct={setSelectedProduct} />
            </MenuSection>
          </section>
        )}

        {/* Separator */}
        <div className="flex items-center justify-center py-8">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        </div>

        {/* Cócteles y Vinos */}
        <section id="especiales">
          <MenuSection 
            title="Especiales" 
            subtitle="Cócteles y vinos"
          >
            <div className="grid md:grid-cols-2 gap-8">
              {/* Cócteles */}
              {cocteles && (
                <div className="space-y-2">
                  <h3 className="text-gold text-sm font-medium uppercase tracking-wider mb-4 px-4">
                    {cocteles.icon} {cocteles.name}
                  </h3>
                  <CategoryProducts categoryId={cocteles.id} onSelectProduct={setSelectedProduct} />
                </div>
              )}

              {/* Vinos */}
              {vinos && (
                <div className="space-y-2">
                  <h3 className="text-gold text-sm font-medium uppercase tracking-wider mb-4 px-4">
                    {vinos.icon} {vinos.name}
                  </h3>
                  <CategoryProducts categoryId={vinos.id} onSelectProduct={setSelectedProduct} />
                </div>
              )}
            </div>
          </MenuSection>
        </section>
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