import { MapPin, Clock, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

// Icono de TikTok como SVG
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const Footer = () => {
  // Obtener información del local desde la base de datos
  const { data: settings } = useQuery({
    queryKey: ["settings", "local_info"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("settings")
        .select("value")
        .eq("key", "local_info")
        .single();

      if (error) throw error;
      return data?.value as any;
    },
  });

  const localInfo = settings || {
    name: "Luna Lounge",
    address: {
      street: "Calle Juan de Austria, 6",
      city: "45221 Esquivias, Toledo",
    },
    social: {
      instagram: "https://www.instagram.com/lunalounge_esquivias/",
      tiktok: "https://www.tiktok.com/@lunalounge_esquivias",
    },
  };

  // Horarios hardcodeados
  const hours = [
    { days: "Lunes - Jueves", time: "18:00 - 02:00" },
    { days: "Viernes - Sábado", time: "18:00 - 04:00" },
    { days: "Domingo", time: "17:00 - 01:00" },
  ];

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
              {localInfo.address.street}
              <br />
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
              {hours.map((schedule) => (
                <p key={schedule.days}>
                  {schedule.days}: {schedule.time}
                </p>
              ))}
            </div>
          </div>

          {/* Social */}
          <div className="space-y-3">
            <span className="font-display text-lg text-gold block">
              Síguenos
            </span>
            <div className="flex items-center justify-center md:justify-start gap-4">
              <a
                href={localInfo.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-muted/50 text-muted-foreground hover:bg-gold/20 hover:text-gold transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={localInfo.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-muted/50 text-muted-foreground hover:bg-gold/20 hover:text-gold transition-all duration-300"
                aria-label="TikTok"
              >
                <TikTokIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-border/30 text-center">
          <p className="text-muted-foreground text-xs">
            © 2025 {localInfo.name}. Todos los derechos reservados.
          </p>

          {/* Link al admin (solo visible en desarrollo) */}
          {import.meta.env.DEV && (
            <Link
              to="/admin/login"
              className="inline-flex items-center gap-2 px-3 py-1 mt-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-xs text-muted-foreground hover:text-foreground"
            >
              Admin
            </Link>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;