import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

interface OrderItem {
  product_id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  table_id: string;
  items: OrderItem[];
  total: number;
  status: "open" | "paid";
  created_at: string;
  closed_at: string | null;
}

const ComandasManager = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [tableId, setTableId] = useState("");
  const [items, setItems] = useState<OrderItem[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    loadOrders();
    loadCatalog();
  }, []);

  const loadOrders = async () => {
    const { data } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    setOrders((data as Order[]) || []);
  };

  const loadCatalog = async () => {
    const { data: categoriesData } = await supabase
      .from("categories")
      .select("*")
      .eq("is_active", true)
      .order("display_order");

    const { data: productsData } = await supabase
      .from("products")
      .select("*")
      .eq("is_available", true)
      .order("display_order");

    setCategories(categoriesData || []);
    setProducts(productsData || []);
  };

  const addProduct = (product: any) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product_id === product.id);

      if (existing) {
        return prev.map((i) =>
          i.product_id === product.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }

      return [
        ...prev,
        {
          product_id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
        },
      ];
    });
  };

  const removeProduct = (productId: string) => {
    setItems((prev) => prev.filter((i) => i.product_id !== productId));
  };

  const changeQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) return;
    setItems((prev) =>
      prev.map((i) =>
        i.product_id === productId ? { ...i, quantity } : i
      )
    );
  };

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const addOrder = async () => {
    if (editingOrder) {
      // Editar comanda existente
      await supabase
        .from("orders")
        .update({
          table_id: tableId,
          items,
          total,
        })
        .eq("id", editingOrder.id);
    } else {
      // Crear nueva comanda
      await supabase.from("orders").insert({
        table_id: tableId,
        items,
        total,
      });
    }

    setTableId("");
    setItems([]);
    setEditingOrder(null);
    setShowDialog(false);
    loadOrders();
  };

  const closeOrder = async (id: string) => {
    await supabase
      .from("orders")
      .update({
        status: "paid",
        closed_at: new Date().toISOString(),
      })
      .eq("id", id);

    loadOrders();
  };

  const editOrder = (order: Order) => {
    setEditingOrder(order);
    setTableId(order.table_id);
    setItems(order.items);
    setShowDialog(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Comandas</h2>
        <Button
          onClick={() => {
            setEditingOrder(null);
            setTableId("");
            setItems([]);
            setShowDialog(true);
          }}
        >
          Nueva comanda
        </Button>
      </div>

      {/* Abiertas */}
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-2">
          Abiertas
        </h3>

        <div className="space-y-4">
          {orders
            .filter((o) => o.status === "open")
            .map((order) => (
              <div
                key={order.id}
                className="rounded-lg border p-4 space-y-2"
              >
                <div className="flex justify-between">
                  <span>Mesa {order.table_id}</span>
                  <span className="text-gold font-medium">
                    {order.total.toFixed(2)}€
                  </span>
                </div>

                <ul className="text-sm text-muted-foreground">
                  {order.items.map((i, idx) => (
                    <li key={idx}>
                      {i.quantity}× {i.name}
                    </li>
                  ))}
                </ul>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => editOrder(order)}
                  >
                    Editar
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => closeOrder(order.id)}
                  >
                    Marcar como cobrada
                  </Button>
                </div>
              </div>
            ))}
        </div>
      </div>

      <Separator />

      {/* Cobradas */}
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-2">
          Cobradas
        </h3>

        <div className="space-y-2">
          {orders
            .filter((o) => o.status === "paid")
            .map((order) => (
              <div
                key={order.id}
                className="flex justify-between text-sm text-muted-foreground"
              >
                <span>Mesa {order.table_id}</span>
                <span>{order.total.toFixed(2)}€</span>
              </div>
            ))}
        </div>
      </div>

      {/* Dialog nueva comanda / editar */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-h-[90vh] w-full sm:w-[500px] overflow-hidden">
          <DialogHeader>
            <DialogTitle>
              {editingOrder ? "Editar comanda" : "Nueva comanda"}
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-4 overflow-y-auto max-h-[75vh] pr-1">
            <Input
              placeholder="Mesa"
              value={tableId}
              onChange={(e) => setTableId(e.target.value)}
            />

            {/* Accordion general */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="products">
                <AccordionTrigger>📦 Productos</AccordionTrigger>

                <AccordionContent>
                  <Accordion type="multiple" className="w-full space-y-2">
                    {categories.map((category) => {
                      const categoryProducts = products.filter(
                        (p) => p.category_id === category.id
                      );

                      if (categoryProducts.length === 0) return null;

                      return (
                        <AccordionItem key={category.id} value={category.id}>
                          <AccordionTrigger>
                            {category.icon} {category.name}
                          </AccordionTrigger>

                          <AccordionContent>
                            <div className="space-y-2">
                              {categoryProducts.map((product) => (
                                <button
                                  key={product.id}
                                  onClick={() => addProduct(product)}
                                  className="w-full flex justify-between items-center px-3 py-2 rounded-md hover:bg-muted text-sm"
                                >
                                  <span>{product.name}</span>
                                  <span className="text-muted-foreground">
                                    {product.price_display ??
                                      `${product.price}€`}
                                  </span>
                                </button>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      );
                    })}
                  </Accordion>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Checkout */}
            {items.length > 0 && (
              <div className="border rounded-lg p-3 space-y-2">
                <h4 className="text-sm font-medium">Resumen</h4>

                <ul className="space-y-1 text-sm">
                  {items.map((item) => (
                    <li
                      key={item.product_id}
                      className="flex justify-between items-center"
                    >
                      <span>
                        {item.quantity}× {item.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          className="px-2 py-1 border rounded"
                          onClick={() =>
                            changeQuantity(
                              item.product_id,
                              item.quantity - 1
                            )
                          }
                        >
                          −
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          className="px-2 py-1 border rounded"
                          onClick={() =>
                            changeQuantity(
                              item.product_id,
                              item.quantity + 1
                            )
                          }
                        >
                          +
                        </button>
                        <button
                          className="px-2 py-1 border rounded text-red-500"
                          onClick={() => removeProduct(item.product_id)}
                        >
                          ✕
                        </button>
                        <span className="ml-2">
                          {(item.price * item.quantity).toFixed(2)}€
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>

                <Separator />

                <div className="flex justify-between font-medium text-sm">
                  <span>Total</span>
                  <span>{total.toFixed(2)}€</span>
                </div>
              </div>
            )}

            <Button
              onClick={addOrder}
              disabled={!tableId || items.length === 0}
            >
              {editingOrder ? "Actualizar comanda" : "Crear comanda"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ComandasManager;
