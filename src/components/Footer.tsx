import { MapPin, Clock, Instagram } from "lucide-react";
import { localInfo } from "@/data/menuData";
import { Link } from "react-router-dom";

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
              {localInfo.address.street}<br />
              {localInfo.address.city}
            </p>
          </div>

          {/* Hours */}
          <div className="space-y-3">
            <div className="flex items-center justify-center md:justify-start gap-2 text-gold">
              <Clock className="w-4 h-4" />
              <span className="font-display text-lg">Horario</span>
            </div>
            <div className="text-muted-foreground text-sm space-y-1">
              {localInfo.hours.map((schedule) => (
                <p key={schedule.days}>{schedule.days}: {schedule.time}</p>
              ))}
            </div>
          </div>

          {/* Social */}
          <div className="space-y-3">
            <span className="font-display text-lg text-gold block">Síguenos</span>
            <div className="flex items-center justify-center md:justify-start gap-4">
              <a 
                href={localInfo.social.instagram}
                className="p-2 rounded-full bg-muted/50 text-muted-foreground hover:bg-gold/20 hover:text-gold transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-border/30 text-center">
          <p className="text-muted-foreground text-xs">
            © 2025 {localInfo.name}. Todos los derechos reservados.
          </p>
        </div>
      </div>
              {/* Link al admin (solo visible en desarrollo) */}
        {import.meta.env.DEV && (
          <Link
            to="/admin/login"
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-sm"
          >
            <span className="hidden sm:inline">Admin</span>
          </Link>
        )}
    </footer>
  );
};

export default Footer;
