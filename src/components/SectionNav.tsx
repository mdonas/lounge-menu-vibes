import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface NavItem {
  id: string;
  label: string;
}

const navItems: NavItem[] = [
  { id: "clasicas", label: "Clásicas" },
  { id: "premium", label: "Premium" },
  { id: "sabores", label: "Sabores" },
  { id: "mezclas", label: "Mezclas" },
  { id: "bebidas", label: "Bebidas" },
];

const SectionNav = () => {
  const [activeSection, setActiveSection] = useState<string>("clasicas");
  const [showMore, setShowMore] = useState(false);

  // First 3 items always visible, last 2 in dropdown on mobile
  const visibleItems = navItems.slice(0, 3);
  const moreItems = navItems.slice(3);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => ({
        id: item.id,
        element: document.getElementById(item.id),
      }));

      const scrollPosition = window.scrollY + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element) {
          const offsetTop = section.element.offsetTop;
          if (scrollPosition >= offsetTop) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setShowMore(false);
    if (showMore) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [showMore]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 40;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
    setShowMore(false);
  };

  const isMoreActive = moreItems.some((item) => item.id === activeSection);

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/30">
      <div className="container py-3">
        <div className="flex gap-2 justify-center items-center">
          {/* First 3 items always visible */}
          {visibleItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-all duration-300",
                activeSection === item.id
                  ? "bg-gold text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              {item.label}
            </button>
          ))}

          {/* More dropdown for remaining items on mobile */}
          <div className="relative md:hidden">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowMore(!showMore);
              }}
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-all duration-300 flex items-center gap-1",
                isMoreActive
                  ? "bg-gold text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              Más
              <ChevronDown className={cn("w-4 h-4 transition-transform", showMore && "rotate-180")} />
            </button>

            {showMore && (
              <div className="absolute top-full mt-2 right-0 bg-background border border-border rounded-lg shadow-lg py-1 min-w-[120px] z-50">
                {moreItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={cn(
                      "w-full px-4 py-2 text-sm font-medium text-left transition-colors",
                      activeSection === item.id
                        ? "bg-gold/20 text-gold"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Show all items on desktop */}
          <div className="hidden md:flex gap-2">
            {moreItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-all duration-300",
                  activeSection === item.id
                    ? "bg-gold text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SectionNav;
