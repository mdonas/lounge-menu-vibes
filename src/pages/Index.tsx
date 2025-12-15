import Header from "@/components/Header";
import MenuSection from "@/components/MenuSection";
import MenuItem from "@/components/MenuItem";
import FlavorGrid from "@/components/FlavorGrid";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container">
        {/* Cachimbas Clásicas */}
        <MenuSection 
          title="Cachimbas Clásicas" 
          subtitle="Selección tradicional de sabores puros"
        >
          <MenuItem 
            name="Individual"
            description="Un sabor a elegir de nuestra selección"
            price="15€"
          />
          <MenuItem 
            name="Dúo"
            description="Mezcla de dos sabores a tu gusto"
            price="17€"
          />
          <MenuItem 
            name="Trío"
            description="Combinación de tres sabores"
            price="19€"
          />
        </MenuSection>

        {/* Cachimbas Premium */}
        <MenuSection 
          title="Cachimbas Premium" 
          subtitle="Experiencias exclusivas con tabaco de alta gama"
        >
          <MenuItem 
            name="Frozen Mist"
            description="Menta glacial con eucalipto y hielo"
            price="22€"
            tag="Favorito"
          />
          <MenuItem 
            name="Tropical Sunset"
            description="Mango, maracuyá y un toque de coco"
            price="22€"
          />
          <MenuItem 
            name="Berry Dreams"
            description="Arándanos, frambuesa y mora silvestre"
            price="22€"
            tag="Nuevo"
          />
          <MenuItem 
            name="Golden Rose"
            description="Pétalos de rosa con miel y vainilla"
            price="24€"
            tag="Premium"
          />
        </MenuSection>

        {/* Sabores Disponibles */}
        <MenuSection 
          title="Sabores Disponibles" 
          subtitle="Elige tu favorito o crea tu mezcla"
        >
          <FlavorGrid />
        </MenuSection>

        {/* Mezclas Especiales */}
        <MenuSection 
          title="Mezclas de la Casa" 
          subtitle="Creaciones exclusivas de nuestros maestros"
        >
          <MenuItem 
            name="Velvet Night"
            description="Nuestra firma: uva negra, menta suave y un toque misterioso"
            price="25€"
            tag="Signature"
          />
          <MenuItem 
            name="Arabian Nights"
            description="Mezcla tradicional de frutas del desierto con especias"
            price="24€"
          />
          <MenuItem 
            name="Purple Haze"
            description="Arándanos, lavanda y un susurro de limón"
            price="24€"
          />
          <MenuItem 
            name="Summer Breeze"
            description="Sandía fresca, pepino y menta"
            price="23€"
          />
        </MenuSection>

        {/* Separator */}
        <div className="flex items-center justify-center py-8">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        </div>

        {/* Bebidas */}
        <MenuSection 
          title="Bebidas" 
          subtitle="Acompaña tu experiencia"
        >
          <div className="grid md:grid-cols-2 gap-8">
            {/* Sin Alcohol */}
            <div className="space-y-2">
              <h3 className="text-gold text-sm font-medium uppercase tracking-wider mb-4 px-4">
                Sin Alcohol
              </h3>
              <MenuItem name="Agua mineral" price="2€" />
              <MenuItem name="Refresco" description="Coca-Cola, Fanta, Sprite" price="3€" />
              <MenuItem name="Zumo natural" description="Naranja, manzana o piña" price="4€" />
              <MenuItem name="Té frío" description="Melocotón o limón" price="3.50€" />
            </div>

            {/* Especiales */}
            <div className="space-y-2">
              <h3 className="text-gold text-sm font-medium uppercase tracking-wider mb-4 px-4">
                Especiales del Lounge
              </h3>
              <MenuItem 
                name="Velvet Lemonade" 
                description="Limonada con lavanda y miel" 
                price="5€" 
              />
              <MenuItem 
                name="Mint Mojito" 
                description="Mocktail de menta, lima y azúcar de caña" 
                price="6€" 
              />
              <MenuItem 
                name="Berry Sensation" 
                description="Frutos rojos, naranja y jengibre" 
                price="6€" 
              />
              <MenuItem 
                name="Golden Hour" 
                description="Mango, maracuyá y agua de coco" 
                price="6€" 
                tag="Favorito"
              />
            </div>
          </div>
        </MenuSection>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
