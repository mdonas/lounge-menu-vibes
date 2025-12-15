import { Sparkles } from "lucide-react";
import logoImage from "@/assets/lunalounge-logo.jpg";

const Header = () => {
  return (
    <header className="relative min-h-[55vh] flex flex-col items-center justify-center px-6 py-16 overflow-hidden">
      {/* Background gradient */}
      <div 
        className="absolute inset-0 -z-10"
        style={{ background: "var(--gradient-hero)" }}
      />
      
      {/* Subtle glow effects */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple/20 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gold/10 rounded-full blur-[80px] -z-10" />
      
      {/* Content */}
      <div className="text-center space-y-4 animate-fade-up">
        {/* Logo */}
        <div className="flex justify-center">
          <img 
            src={logoImage} 
            alt="Luna Lounge - Shisha Lounge" 
            className="w-48 h-48 sm:w-56 sm:h-56 object-contain animate-float"
          />
        </div>
        
        <p className="text-muted-foreground text-lg sm:text-xl tracking-wide pt-2">
          Shisha Lounge · Cocktails · Chill
        </p>
        
        {/* Decorative line */}
        <div className="flex items-center justify-center gap-4 pt-4">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/50" />
          <Sparkles className="w-4 h-4 text-gold/60" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/50" />
        </div>
      </div>
    </header>
  );
};

export default Header;
