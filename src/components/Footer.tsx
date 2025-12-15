import { MapPin, Clock, Instagram, Facebook, Music2 } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-muted/20 mt-16">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Location */}
          <div className="space-y-3">
            <div className="flex items-center justify-center md:justify-start gap-2 text-gold">
              <MapPin className="w-4 h-4" />
              <span className="font-display text-lg">Ubicación</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Calle Gran Vía, 42<br />
              28013 Madrid, España
            </p>
          </div>

          {/* Hours */}
          <div className="space-y-3">
            <div className="flex items-center justify-center md:justify-start gap-2 text-gold">
              <Clock className="w-4 h-4" />
              <span className="font-display text-lg">Horario</span>
            </div>
            <div className="text-muted-foreground text-sm space-y-1">
              <p>Lunes - Jueves: 18:00 - 02:00</p>
              <p>Viernes - Sábado: 18:00 - 04:00</p>
              <p>Domingo: 17:00 - 01:00</p>
            </div>
          </div>

          {/* Social */}
          <div className="space-y-3">
            <span className="font-display text-lg text-gold block">Síguenos</span>
            <div className="flex items-center justify-center md:justify-start gap-4">
              <a 
                href="#" 
                className="p-2 rounded-full bg-muted/50 text-muted-foreground hover:bg-gold/20 hover:text-gold transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="p-2 rounded-full bg-muted/50 text-muted-foreground hover:bg-gold/20 hover:text-gold transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="p-2 rounded-full bg-muted/50 text-muted-foreground hover:bg-gold/20 hover:text-gold transition-all duration-300"
                aria-label="TikTok"
              >
                <Music2 className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-border/30 text-center">
          <p className="text-muted-foreground text-xs">
            © 2024 Velvet Lounge. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
