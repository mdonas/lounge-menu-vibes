interface Flavor {
  name: string;
  icon?: string;
}

const flavors: Flavor[] = [
  { name: "Menta", icon: "🌿" },
  { name: "Sandía", icon: "🍉" },
  { name: "Melocotón", icon: "🍑" },
  { name: "Uva", icon: "🍇" },
  { name: "Mango", icon: "🥭" },
  { name: "Limón", icon: "🍋" },
  { name: "Fresa", icon: "🍓" },
  { name: "Manzana", icon: "🍏" },
  { name: "Arándano", icon: "🫐" },
  { name: "Coco", icon: "🥥" },
  { name: "Piña", icon: "🍍" },
  { name: "Cereza", icon: "🍒" },
];

const FlavorGrid = () => {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
      {flavors.map((flavor) => (
        <div
          key={flavor.name}
          className="flex flex-col items-center gap-2 py-4 px-3 rounded-lg bg-muted/30 border border-border/50 hover:border-gold/30 hover:bg-muted/50 transition-all duration-300"
        >
          <span className="text-2xl">{flavor.icon}</span>
          <span className="text-xs text-muted-foreground text-center">{flavor.name}</span>
        </div>
      ))}
    </div>
  );
};

export default FlavorGrid;
