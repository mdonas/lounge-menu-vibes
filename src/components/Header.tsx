import { Sparkles } from "lucide-react";

const Header = () => {
  return (
    <header className="relative min-h-[50vh] flex flex-col items-center justify-center px-6 py-16 overflow-hidden">
      {/* Background gradient */}
      <div 
        className="absolute inset-0 -z-10"
        style={{ background: "var(--gradient-hero)" }}
      />
      
      {/* Subtle glow effects */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple/20 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gold/10 rounded-full blur-[80px] -z-10" />
      
      {/* Content */}
      <div className="text-center space-y-6 animate-fade-up">
        <div className="flex items-center justify-center gap-2 text-gold/80">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium tracking-[0.3em] uppercase">Est. 2024</span>
          <Sparkles className="w-4 h-4" />
        </div>
        
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight">
          <span className="text-gradient-gold">Velvet</span>
          <span className="text-foreground"> Lounge</span>
        </h1>
        
        <p className="text-muted-foreground text-lg sm:text-xl tracking-wide">
          Shisha Lounge · Cocktails · Chill
        </p>
        
        {/* Decorative line */}
        <div className="flex items-center justify-center gap-4 pt-4">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/50" />
          <div className="w-2 h-2 rotate-45 border border-gold/50" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/50" />
        </div>
      </div>
    </header>
  );
};

export default Header;
