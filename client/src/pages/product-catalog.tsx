import { useState } from "react";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { MobileNav } from "@/components/mobile-nav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { PlusIcon, SearchIcon, UploadCloudIcon, ImageIcon, TagIcon } from "lucide-react";

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  readyToExport: boolean;
  thumbnail: string | null;
}

export default function ProductCatalog() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  
  // Convert user data to format expected by child components
  const userData = {
    username: user?.username || "",
    name: user?.companyName || "",
    companyName: user?.companyName || "",
    email: user?.email || "",
    exportReadiness: user?.exportReadiness || 0,
  };

  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Mock products data
  const mockProducts: Product[] = [
    {
      id: 1,
      name: "Teak Dining Table",
      category: "Furniture",
      price: "$850",
      readyToExport: true,
      thumbnail: null,
    },
    {
      id: 2,
      name: "Rattan Chair Set",
      category: "Furniture",
      price: "$450",
      readyToExport: true,
      thumbnail: null,
    },
    {
      id: 3,
      name: "Bamboo Coffee Table",
      category: "Furniture",
      price: "$320",
      readyToExport: false,
      thumbnail: null,
    },
    {
      id: 4,
      name: "Hand-carved Wooden Bowl",
      category: "Home Decor",
      price: "$75",
      readyToExport: true,
      thumbnail: null,
    },
    {
      id: 5,
      name: "Batik Table Runner",
      category: "Textiles",
      price: "$45",
      readyToExport: true,
      thumbnail: null,
    },
    {
      id: 6,
      name: "Ceramic Vase Set",
      category: "Home Decor",
      price: "$120",
      readyToExport: false,
      thumbnail: null,
    },
  ];

  const handleAddProduct = () => {
    toast({
      title: "Adding new product",
      description: "Opening product creation form",
    });
  };

  const handleProductClick = (productId: number) => {
    toast({
      title: "Product selected",
      description: `Opening product #${productId} details`,
    });
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value === "all" ? "" : value);
  };

  // Filter products based on active tab, search query, and selected category
  const filteredProducts = mockProducts.filter(product => {
    // Filter by tab
    if (activeTab === "export-ready" && !product.readyToExport) return false;
    if (activeTab === "draft" && product.readyToExport) return false;
    
    // Filter by search query
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    
    // Filter by category
    if (selectedCategory && product.category !== selectedCategory) return false;
    
    return true;
  });

  const categories = Array.from(new Set(mockProducts.map(p => p.category)));

  return (
    <div className="min-h-screen flex flex-col">
      <Header user={userData} onOpenMobileMenu={() => setIsMobileNavOpen(true)} />

      <div className="flex flex-1">
        <Sidebar exportReadiness={userData.exportReadiness} />

        <MobileNav
          isOpen={isMobileNavOpen}
          onClose={() => setIsMobileNavOpen(false)}
          user={userData}
          exportReadiness={userData.exportReadiness}
        />

        <main className="flex-1 overflow-y-auto bg-neutral-50">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
              <div className="flex items-center">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg p-3 text-white shadow-md mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Product Catalog</h1>
                  <p className="text-gray-600 mt-1">Manage your exportable products and inventory</p>
                </div>
              </div>
              <Button 
                className="mt-4 sm:mt-0 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-300" 
                onClick={handleAddProduct}
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </div>

            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search products..."
                    className="pl-9 border-gray-200 focus:border-blue-300 shadow-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                </div>
                <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                  <SelectTrigger className="border-gray-200 focus:border-blue-300 shadow-sm">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="text-right text-sm text-gray-600 hidden md:flex items-center justify-end">
                  <span className="bg-gradient-to-r from-blue-50 to-indigo-50 px-3 py-1.5 rounded-full border border-blue-100 shadow-sm">
                    <span className="font-medium text-blue-700">{filteredProducts.length}</span>
                    <span className="text-gray-600 ml-1">products found</span>
                  </span>
                </div>
              </div>
            </div>

            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
              <TabsList className="bg-white border border-gray-100 p-1 shadow-sm">
                <TabsTrigger 
                  value="all" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white rounded-md transition-all duration-200"
                >
                  All Products
                </TabsTrigger>
                <TabsTrigger 
                  value="export-ready"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white rounded-md transition-all duration-200"
                >
                  Export Ready
                </TabsTrigger>
                <TabsTrigger 
                  value="draft"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-600 data-[state=active]:text-white rounded-md transition-all duration-200"
                >
                  Draft
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {filteredProducts.length === 0 ? (
              <Card className="border border-dashed border-blue-200 shadow-sm rounded-xl overflow-hidden">
                <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                <CardContent className="flex flex-col items-center justify-center p-10 text-center">
                  <div className="rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 p-4 mb-5 shadow-md">
                    <SearchIcon className="h-8 w-8 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">No products found</h3>
                  <p className="text-gray-600 mb-6 max-w-md">
                    We couldn't find any products matching your criteria. Try adjusting your filters or create a new product.
                  </p>
                  <Button 
                    onClick={handleAddProduct}
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Create New Product
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <Card 
                    key={product.id} 
                    className="overflow-hidden cursor-pointer hover:shadow-md transition-all duration-300 border border-gray-100 rounded-xl"
                    onClick={() => handleProductClick(product.id)}
                  >
                    <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                    <div className="h-44 bg-gradient-to-r from-gray-50 to-gray-100 flex items-center justify-center">
                      <div className="bg-white p-4 rounded-full shadow-sm">
                        <ImageIcon className="h-10 w-10 text-blue-400" />
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-800 text-lg">{product.name}</h3>
                          <div className="flex items-center mt-1.5">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                              <TagIcon className="inline h-3 w-3 mr-1" />
                              {product.category}
                            </span>
                          </div>
                        </div>
                        <p className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">{product.price}</p>
                      </div>
                      <div className="h-px w-full bg-gray-100 my-4"></div>
                      <div className="flex items-center justify-between">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                          product.readyToExport 
                            ? "bg-gradient-to-r from-green-50 to-emerald-50 text-green-600 border-green-100" 
                            : "bg-gradient-to-r from-amber-50 to-orange-50 text-amber-600 border-amber-100"
                        }`}>
                          {product.readyToExport ? "Export Ready" : "Draft"}
                        </span>
                        <Button 
                          size="sm" 
                          className={`rounded-full px-3 text-xs font-medium ${
                            product.readyToExport 
                              ? "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white" 
                              : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                          }`}
                        >
                          {product.readyToExport ? "View Details" : "Continue Editing"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Card className="border border-dashed border-blue-200 flex items-center justify-center cursor-pointer hover:border-blue-300 hover:shadow-md transition-all duration-300 rounded-xl bg-gradient-to-r from-blue-50/50 to-indigo-50/50">
                  <CardContent className="flex flex-col items-center text-center p-10" onClick={handleAddProduct}>
                    <div className="rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 p-4 mb-4 shadow-sm">
                      <PlusIcon className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-800 text-lg mb-2">Add New Product</h3>
                    <p className="text-gray-600">Upload or create a new product for export</p>
                    <Button className="mt-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white">
                      <PlusIcon className="h-4 w-4 mr-2" />
                      Add Product
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
