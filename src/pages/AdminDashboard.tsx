import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, LayoutDashboard, Package, FolderTree, Settings } from "lucide-react";
import ProductsManager from "@/components/admin/ProductsManager";
import CategoriesManager from "@/components/admin/CategoriesManager";
import DashboardStats from "@/components/admin/DashboardStats";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import ComandasManager from "@/components/admin/ComandasManager";

const AdminDashboard = () => {
    const { signOut, adminUser } = useAuth();
    const { toast } = useToast();
    const [activeTab, setActiveTab] = useState("dashboard");

    const handleSignOut = async () => {
        try {
            await signOut();
            toast({
                title: "Sesión cerrada",
                description: "Has cerrado sesión correctamente",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "No se pudo cerrar la sesión",
                variant: "destructive",
            });
        }
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b bg-card">
                <div className="container flex items-center justify-between py-4">
                    <div>
                        <h1 className="text-2xl font-bold">Luna Lounge Admin</h1>
                        <p className="text-sm text-muted-foreground">
                            Bienvenido, {adminUser?.full_name || adminUser?.email}
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link
                            to="/"
                            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-sm"
                        >
                            <Settings className="h-4 w-4" />
                            <span className="hidden sm:inline">Usuario</span>
                        </Link>
                        <Button variant="outline" onClick={handleSignOut}>
                            <LogOut className="mr-2 h-4 w-4" />
                            Cerrar sesión
                        </Button>
                    </div>


                </div>
            </header>

            {/* Main Content */}
            <main className="container py-8">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full max-w-md grid-cols-4">
                        <TabsTrigger value="dashboard">
                            <LayoutDashboard className="mr-2 h-4 w-4" />
                            Dashboard
                        </TabsTrigger>
                        <TabsTrigger value="products">
                            <Package className="mr-2 h-4 w-4" />
                            Productos
                        </TabsTrigger>
                        <TabsTrigger value="categories">
                            <FolderTree className="mr-2 h-4 w-4" />
                            Categorías
                        </TabsTrigger>
                        <TabsTrigger value="comandas">
                            <FolderTree className="mr-2 h-4 w-4" />
                            Comandas
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="dashboard" className="mt-6">
                        <DashboardStats />
                    </TabsContent>

                    <TabsContent value="products" className="mt-6">
                        <ProductsManager />
                    </TabsContent>

                    <TabsContent value="categories" className="mt-6">
                        <CategoriesManager />
                    </TabsContent>
                    <TabsContent value="comandas" className="mt-6">
                        <ComandasManager />
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
};

export default AdminDashboard;