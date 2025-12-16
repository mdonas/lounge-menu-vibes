import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useProductDetail } from "@/hooks/useProductDetail";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  productId: string | null;
  onClose: () => void;
}

const ProductDetailDialog = ({ productId, onClose }: Props) => {
  const { data, isLoading } = useProductDetail(productId || undefined);

  return (
    <Dialog open={!!productId} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        {isLoading && <Skeleton className="h-64 w-full" />}

        {data && (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl flex items-center gap-2 justify-center">
                {data.category_icon} {data.name}
              </DialogTitle>
            </DialogHeader>

            {/* Imagen */}
            {data.image_url && (
              <div className="flex justify-center py-4">
                <div className="w-40 h-40 flex items-center justify-center rounded-xl bg-muted/20">
                  <img
                    src={data.image_url}
                    alt={data.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </div>
            )}

            {/* Info */}
            <div className="space-y-4 text-center">

              {/* Precio */}
              <div className="text-gold text-2xl font-semibold">
                {data.price_display ?? `${data.price}€`}
              </div>

              {/* Descripción */}
              {data.description && (
                <p className="text-muted-foreground text-sm leading-relaxed px-6">
                  {data.description}
                </p>
              )}

              {/* Meta info */}
              <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">

                {data.tag && (
                  <span className="uppercase tracking-wider">
                    {data.tag}
                  </span>
                )}

                {data.category_name && (
                  <span>
                    {data.category_name}
                  </span>
                )}

              </div>
            </div>
          </>
        )}

      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailDialog;
