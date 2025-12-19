import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAllCategories } from "@/hooks/useCategories";
import { useCreateProduct, useUpdateProduct } from "@/hooks/useProducts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload, X } from "lucide-react";
import { uploadProductImage, deleteProductImage } from "@/lib/supabase";

const productSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().optional(),
  price: z.number().min(0, "El precio debe ser mayor a 0"),
  price_display: z.string().optional(),
  category_id: z.string().min(1, "La categoría es requerida"),
  tag: z.string().optional(),
  is_available: z.boolean().default(true),
  display_order: z.number().default(0),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormProps {
  product?: any;
  onSuccess: () => void;
  onCancel: () => void;
}

const ProductForm = ({ product, onSuccess, onCancel }: ProductFormProps) => {
  const { data: categories } = useAllCategories();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const { toast } = useToast();
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    product?.image_url || null
  );
  const [uploading, setUploading] = useState(false);
  const [oldImagePath, setOldImagePath] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name || "",
      description: product?.description || "",
      price: product?.price || 0,
      price_display: product?.price_display || "",
      category_id: product?.category_id || "",
      tag: product?.tag || "",
      is_available: product?.is_available ?? true,
      display_order: product?.display_order || 0,
    },
  });

  const categoryId = watch("category_id");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const onSubmit = async (data: ProductFormData) => {
    try {
      let imageUrl = product?.image_url || null;
      let imagePath = oldImagePath;

      // Subir nueva imagen si existe
      if (imageFile) {
        setUploading(true);
        const tempId = product?.id || crypto.randomUUID();
        const uploadResult = await uploadProductImage(imageFile, tempId);
        
        if (uploadResult) {
          imageUrl = uploadResult.url;
          imagePath = uploadResult.path;

          // Eliminar imagen anterior si existe
          if (product?.image_url && oldImagePath) {
            await deleteProductImage(oldImagePath);
          }
        }
        setUploading(false);
      }

      const productData = {
        ...data,
        image_url: imageUrl,
      };

      if (product) {
        await updateProduct.mutateAsync({
          id: product.id,
          updates: productData,
        });
        toast({
          title: "Producto actualizado",
          description: "Los cambios se guardaron correctamente",
        });
      } else {
        await createProduct.mutateAsync(productData);
        toast({
          title: "Producto creado",
          description: "El producto se creó correctamente",
        });
      }

      onSuccess();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "No se pudo guardar el producto",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Imagen */}
      <div className="space-y-2">
        <Label>Imagen del producto</Label>
        {imagePreview ? (
          <div className="relative w-full h-48 rounded-lg overflow-hidden border">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2"
              onClick={removeImage}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <Label
            htmlFor="image-upload"
            className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary hover:bg-muted/50 transition-all block"
          >
            <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
            <span className="text-sm text-muted-foreground">
              Click para subir imagen
            </span>
            <Input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </Label>
        )}
      </div>

      {/* Nombre */}
      <div className="space-y-2">
        <Label htmlFor="name">Nombre *</Label>
        <Input id="name" {...register("name")} />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      {/* Descripción */}
      <div className="space-y-2">
        <Label htmlFor="description">Descripción</Label>
        <Textarea id="description" {...register("description")} rows={3} />
      </div>

      {/* Precio y Precio Display */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Precio (número) *</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            {...register("price", { valueAsNumber: true })}
          />
          {errors.price && (
            <p className="text-sm text-destructive">{errors.price.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="price_display">Precio display (ej: 15€)</Label>
          <Input id="price_display" {...register("price_display")} />
        </div>
      </div>

      {/* Categoría */}
      <div className="space-y-2">
        <Label htmlFor="category_id">Categoría *</Label>
        <Select
          value={categoryId}
          onValueChange={(value) => setValue("category_id", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecciona una categoría" />
          </SelectTrigger>
          <SelectContent>
            {categories?.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.category_id && (
          <p className="text-sm text-destructive">{errors.category_id.message}</p>
        )}
      </div>

      {/* Tag y Display Order */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="tag">Etiqueta (ej: Favorito, Nuevo)</Label>
          <Input id="tag" {...register("tag")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="display_order">Orden de visualización</Label>
          <Input
            id="display_order"
            type="number"
            {...register("display_order", { valueAsNumber: true })}
          />
        </div>
      </div>

      {/* Disponible */}
      <div className="flex items-center space-x-2">
        <Switch
          id="is_available"
          checked={watch("is_available")}
          onCheckedChange={(checked) => setValue("is_available", checked)}
        />
        <Label htmlFor="is_available">Producto disponible (visible en el menú)</Label>
      </div>

      {/* Botones */}
      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting || uploading}>
          {(isSubmitting || uploading) && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          {product ? "Actualizar" : "Crear"} Producto
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;