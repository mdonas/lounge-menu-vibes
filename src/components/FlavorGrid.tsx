import { useFlavors } from "@/hooks/useFlavors";
import { Skeleton } from "@/components/ui/skeleton";

const FlavorGrid = () => {
  const { data: flavors, isLoading } = useFlavors();

  if (isLoading) {
    return (
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
        {Array.from({ length: 12 }).map((_, i) => (
          <Skeleton key={i} className="h-24 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (!flavors || flavors.length === 0) {
    return (
      <p className="text-muted-foreground text-center py-8">
        No hay sabores disponibles
      </p>
    );
  }

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
      {flavors.map((flavor) => (
        <div
          key={flavor.id}
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