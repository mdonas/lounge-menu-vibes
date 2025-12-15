import { 
  Leaf, 
  Citrus, 
  Cherry, 
  Grape, 
  Apple,
  Droplets,
  Flower2,
  Sparkles,
  Sun,
  Snowflake,
  Heart,
  Star
} from "lucide-react";

interface Flavor {
  name: string;
  icon: React.ReactNode;
}

const flavors: Flavor[] = [
  { name: "Menta", icon: <Leaf className="w-5 h-5" /> },
  { name: "Sandía", icon: <Droplets className="w-5 h-5" /> },
  { name: "Melocotón", icon: <Sun className="w-5 h-5" /> },
  { name: "Uva", icon: <Grape className="w-5 h-5" /> },
  { name: "Mango", icon: <Sparkles className="w-5 h-5" /> },
  { name: "Limón", icon: <Citrus className="w-5 h-5" /> },
  { name: "Fresa", icon: <Heart className="w-5 h-5" /> },
  { name: "Manzana", icon: <Apple className="w-5 h-5" /> },
  { name: "Arándano", icon: <Star className="w-5 h-5" /> },
  { name: "Coco", icon: <Snowflake className="w-5 h-5" /> },
  { name: "Piña", icon: <Flower2 className="w-5 h-5" /> },
  { name: "Cereza", icon: <Cherry className="w-5 h-5" /> },
];

const FlavorGrid = () => {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
      {flavors.map((flavor) => (
        <div
          key={flavor.name}
          className="group flex flex-col items-center gap-2 py-4 px-3 rounded-lg bg-muted/30 border border-border/50 hover:border-gold/40 hover:bg-muted/50 transition-all duration-300"
        >
          <span className="text-muted-foreground group-hover:text-gold transition-colors duration-300">
            {flavor.icon}
          </span>
          <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors text-center">
            {flavor.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default FlavorGrid;
