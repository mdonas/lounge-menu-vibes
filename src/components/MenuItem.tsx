interface MenuItemProps {
  onClick?: () => void;
  name: string;
  description?: string;
  price: string;
  tag?: string;
  imageUrl?: string;
}

const MenuItem = ({ onClick, name, description, price, tag, imageUrl }: MenuItemProps) => {
  return (
    <div onClick={onClick} className="group cursor-pointer flex items-start justify-between gap-4 py-4 px-4 rounded-lg transition-all duration-300 hover:bg-muted/30 items-center">
      {imageUrl && (
        <div className="w-16 h-16 flex items-center justify-center flex-shrink-0">
          <img 
            src={imageUrl} 
            alt={name}
            className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300"
          />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="font-display text-lg text-foreground group-hover:text-gold transition-colors">
            {name}
          </h3>
          {tag && (
            <span className="px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider bg-gold/20 text-gold rounded-full">
              {tag}
            </span>
          )}
        </div>
        {description && (
          <p className="text-muted-foreground text-sm mt-1 leading-relaxed">
            {description}
          </p>
        )}
      </div>
      <div className="flex-shrink-0">
        <span className="font-sans text-gold font-medium tabular-nums">
          {price}
        </span>
      </div>
    </div>
  );
};

export default MenuItem;