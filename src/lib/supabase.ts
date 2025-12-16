import { createClient } from '@supabase/supabase-js';
import type { Database } from './supabaseTypes';

const supabaseUrl = 'https://tebecfmdesdyskqtiqle.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseAnonKey) {
  throw new Error('Missing VITE_SUPABASE_ANON_KEY environment variable');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Helper para obtener la URL de una imagen del storage
export const getImageUrl = (path: string | null): string | null => {
  if (!path) return null;
  return `${supabaseUrl}/storage/v1/object/public/product-images/${path}`;
};

// Helper para subir imágenes
export const uploadProductImage = async (
  file: File,
  productId: string
): Promise<{ url: string; path: string } | null> => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${productId}-${Date.now()}.${fileExt}`;
  const filePath = `products/${fileName}`;

  const { error } = await supabase.storage
    .from('product-images')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    console.error('Error uploading image:', error);
    return null;
  }

  return {
    url: getImageUrl(filePath)!,
    path: filePath,
  };
};

// Helper para eliminar imágenes
export const deleteProductImage = async (path: string): Promise<boolean> => {
  const { error } = await supabase.storage
    .from('product-images')
    .remove([path]);

  if (error) {
    console.error('Error deleting image:', error);
    return false;
  }

  return true;
};