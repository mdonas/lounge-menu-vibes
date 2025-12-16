// Tipos generados automáticamente desde la base de datos de Supabase
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          subtitle: string | null
          display_order: number
          icon: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          subtitle?: string | null
          display_order?: number
          icon?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          subtitle?: string | null
          display_order?: number
          icon?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          category_id: string | null
          name: string
          description: string | null
          price: number
          price_display: string | null
          image_url: string | null
          is_available: boolean
          tag: string | null
          display_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          category_id?: string | null
          name: string
          description?: string | null
          price: number
          price_display?: string | null
          image_url?: string | null
          is_available?: boolean
          tag?: string | null
          display_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          category_id?: string | null
          name?: string
          description?: string | null
          price?: number
          price_display?: string | null
          image_url?: string | null
          is_available?: boolean
          tag?: string | null
          display_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      flavors: {
        Row: {
          id: string
          name: string
          icon: string
          display_order: number
          is_available: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          icon: string
          display_order?: number
          is_available?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          icon?: string
          display_order?: number
          is_available?: boolean
          created_at?: string
        }
      }
      admin_users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          role: string
          is_active: boolean
          last_login: string | null
          created_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          role?: string
          is_active?: boolean
          last_login?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          role?: string
          is_active?: boolean
          last_login?: string | null
          created_at?: string
        }
      }
      activity_logs: {
        Row: {
          id: string
          admin_user_id: string | null
          action: string
          table_name: string
          record_id: string | null
          record_name: string | null
          changes: Json | null
          ip_address: string | null
          user_agent: string | null
          created_at: string
        }
        Insert: {
          id?: string
          admin_user_id?: string | null
          action: string
          table_name: string
          record_id?: string | null
          record_name?: string | null
          changes?: Json | null
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          admin_user_id?: string | null
          action?: string
          table_name?: string
          record_id?: string | null
          record_name?: string | null
          changes?: Json | null
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
      }
      settings: {
        Row: {
          key: string
          value: Json
          description: string | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          key: string
          value: Json
          description?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          key?: string
          value?: Json
          description?: string | null
          updated_at?: string
          updated_by?: string | null
        }
      }
      orders: {
      Row: {
        id: string
        table_id: string
        items: Json
        total: number
        status: 'open' | 'paid'
        created_at: string
        closed_at: string | null
      }
      Insert: {
        id?: string
        table_id: string
        items: Json
        total?: number
        status?: 'open' | 'paid'
        created_at?: string
        closed_at?: string | null
      }
      Update: {
        id?: string
        table_id?: string
        items?: Json
        total?: number
        status?: 'open' | 'paid'
        closed_at?: string | null
      }
    }

    }
    Views: {
      products_full: {
        Row: {
          id: string
          name: string
          description: string | null
          price: number
          price_display: string | null
          image_url: string | null
          is_available: boolean
          tag: string | null
          display_order: number
          created_at: string
          updated_at: string
          category_id: string | null
          category_name: string | null
          category_slug: string | null
          category_icon: string | null
          category_subtitle: string | null
        }
      }
      product_stats: {
        Row: {
          category: string | null
          slug: string | null
          total_products: number | null
          available_products: number | null
          unavailable_products: number | null
          avg_price: number | null
          min_price: number | null
          max_price: number | null
        }
      }
      recent_activity: {
        Row: {
          id: string
          action: string
          table_name: string
          record_name: string | null
          created_at: string
          admin_name: string | null
          admin_email: string | null
        }
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}