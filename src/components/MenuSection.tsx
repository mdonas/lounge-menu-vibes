import { ReactNode } from "react";

interface MenuSectionProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

const MenuSection = ({ title, subtitle, children, className = "" }: MenuSectionProps) => {
  return (
    <section className={`py-12 ${className}`}>
      <div className="text-center mb-10">
        <h2 className="font-display text-3xl sm:text-4xl text-foreground mb-2">
          {title}
        </h2>
        {subtitle && (
          <p className="text-muted-foreground text-sm tracking-wide">{subtitle}</p>
        )}
        <div className="flex items-center justify-center gap-3 mt-4">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold/40" />
          <div className="w-1.5 h-1.5 rotate-45 bg-gold/60" />
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold/40" />
        </div>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </section>
  );
};

export default MenuSection;
