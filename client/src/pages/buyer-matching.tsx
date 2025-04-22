import { useState } from "react";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { MobileNav } from "@/components/mobile-nav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import {
  SearchIcon,
  Users,
  Globe,
  Map,
  Building,
  Star,
  MessageCircle,
  Filter,
  ChevronRight,
  Phone,
  Mail,
  ExternalLink,
  Calendar,
  CheckCircle,
  AlertCircle,
  HelpCircle
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";

interface BuyerProfile {
  id: number;
  companyName: string;
  location: string;
  country: string;
  industry: string;
  matchScore: number;
  logo: string | null;
  verified: boolean;
  lastActive: string;
  interestedProducts: string[];
  minimumOrderValue: string;
  preferredCategories: string[];
  contactName: string;
  contactEmail: string;
  contactPhone: string;
}

export default function BuyerMatching() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedIndustry, setSelectedIndustry] = useState("all");
  const [selectedTab, setSelectedTab] = useState("recommended");
  const [minMatchScore, setMinMatchScore] = useState(60);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [selectedBuyerId, setSelectedBuyerId] = useState<number | null>(null);
  const { user } = useAuth();
  
  // Convert user data to format expected by child components
  const userData = {
    username: user?.username || "",
    name: user?.companyName || "",
    companyName: user?.companyName || "",
    email: user?.email || "",
    exportReadiness: user?.exportReadiness || 0,
  };

  // Sample buyer profiles
  const mockBuyers: BuyerProfile[] = [
    {
      id: 1,
      companyName: "Scandi Living Co.",
      location: "Stockholm",
      country: "Sweden",
      industry: "Home Furnishings",
      matchScore: 95,
      logo: null,
      verified: true,
      lastActive: "Today",
      interestedProducts: ["Teak Dining Table", "Rattan Chair Set", "Bamboo Coffee Table"],
      minimumOrderValue: "$5,000",
      preferredCategories: ["Furniture", "Home Decor"],
      contactName: "Erik Johansson",
      contactEmail: "erik@scandiliving.com",
      contactPhone: "+46 70 123 4567",
    },
    {
      id: 2,
      companyName: "Nippon Decor",
      location: "Tokyo",
      country: "Japan",
      industry: "Interior Design",
      matchScore: 88,
      logo: null,
      verified: true,
      lastActive: "Yesterday",
      interestedProducts: ["Hand-carved Wooden Bowl", "Rattan Chair Set", "Batik Table Runner"],
      minimumOrderValue: "$3,000",
      preferredCategories: ["Home Decor", "Textiles", "Furniture"],
      contactName: "Yuki Tanaka",
      contactEmail: "ytanaka@nippondecor.co.jp",
      contactPhone: "+81 3 1234 5678",
    },
    {
      id: 3,
      companyName: "Pacific Home",
      location: "Sydney",
      country: "Australia",
      industry: "Home Furnishings",
      matchScore: 82,
      logo: null,
      verified: false,
      lastActive: "2 days ago",
      interestedProducts: ["Teak Dining Table", "Ceramic Vase Set"],
      minimumOrderValue: "$4,000",
      preferredCategories: ["Furniture", "Home Decor"],
      contactName: "Sarah Williams",
      contactEmail: "sarah@pacifichome.com.au",
      contactPhone: "+61 2 9876 5432",
    },
    {
      id: 4,
      companyName: "European Imports",
      location: "Berlin",
      country: "Germany",
      industry: "Wholesale Distribution",
      matchScore: 75,
      logo: null,
      verified: true,
      lastActive: "3 days ago",
      interestedProducts: ["Bamboo Coffee Table", "Hand-carved Wooden Bowl"],
      minimumOrderValue: "$10,000",
      preferredCategories: ["Furniture", "Home Decor"],
      contactName: "Klaus Fischer",
      contactEmail: "k.fischer@euro-imports.de",
      contactPhone: "+49 30 987 6543",
    },
    {
      id: 5,
      companyName: "West Coast Living",
      location: "San Francisco",
      country: "United States",
      industry: "Retail Chain",
      matchScore: 68,
      logo: null,
      verified: true,
      lastActive: "1 week ago",
      interestedProducts: ["Rattan Chair Set", "Batik Table Runner", "Ceramic Vase Set"],
      minimumOrderValue: "$15,000",
      preferredCategories: ["Furniture", "Textiles", "Home Decor"],
      contactName: "Michael Johnson",
      contactEmail: "mjohnson@westcoastliving.com",
      contactPhone: "+1 415 555 7890",
    },
    {
      id: 6,
      companyName: "Dubai Luxury Interiors",
      location: "Dubai",
      country: "United Arab Emirates",
      industry: "Luxury Retail",
      matchScore: 62,
      logo: null,
      verified: false,
      lastActive: "2 weeks ago",
      interestedProducts: ["Teak Dining Table", "Hand-carved Wooden Bowl"],
      minimumOrderValue: "$25,000",
      preferredCategories: ["Furniture", "Home Decor"],
      contactName: "Ahmed Al Mansour",
      contactEmail: "ahmed@dubailuxury.ae",
      contactPhone: "+971 4 123 4567",
    },
  ];

  // Filter buyers based on search, region, industry, match score, and verification
  const filteredBuyers = mockBuyers
    .filter(buyer => {
      // Filter by tab
      if (selectedTab === "recommended" && buyer.matchScore < 70) return false;
      if (selectedTab === "new-inquiries" && buyer.matchScore < 60) return false;
      if (selectedTab === "contacted" && !buyer.verified) return false;
      
      // Filter by search
      if (searchQuery && !buyer.companyName.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      
      // Filter by region
      if (selectedRegion !== "all" && buyer.country !== selectedRegion) return false;
      
      // Filter by industry
      if (selectedIndustry !== "all" && buyer.industry !== selectedIndustry) return false;
      
      // Filter by match score
      if (buyer.matchScore < minMatchScore) return false;
      
      // Filter by verification
      if (verifiedOnly && !buyer.verified) return false;
      
      return true;
    })
    .sort((a, b) => b.matchScore - a.matchScore);

  // Get the selected buyer or first buyer if none selected
  const selectedBuyer = selectedBuyerId 
    ? mockBuyers.find(b => b.id === selectedBuyerId) 
    : (filteredBuyers.length > 0 ? filteredBuyers[0] : null);

  // Handle buyer selection
  const handleBuyerSelect = (buyerId: number) => {
    setSelectedBuyerId(buyerId);
  };

  // Regions and industries for filter
  const regions = ["all", "Sweden", "Japan", "Australia", "Germany", "United States", "United Arab Emirates"];
  const industries = ["all", "Home Furnishings", "Interior Design", "Wholesale Distribution", "Retail Chain", "Luxury Retail"];

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
                <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg p-3 text-white shadow-md mr-4">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Buyer Matching</h1>
                  <p className="text-gray-600 mt-1">Connect with verified global buyers interested in your products</p>
                </div>
              </div>
              <Button 
                className="mt-4 sm:mt-0 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-md hover:shadow-lg transition-all duration-300" 
              >
                <Globe className="h-4 w-4 mr-2" />
                Browse All Buyers
              </Button>
            </div>

            <Card className="mb-8 border border-gray-100 shadow-sm rounded-xl overflow-hidden">
              <div className="h-1.5 w-full bg-gradient-to-r from-amber-500 to-orange-600"></div>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Filter className="h-5 w-5 mr-2 text-amber-500" />
                  Buyer Matching Filters
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-lg border border-amber-100">
                    <Label className="text-sm font-medium text-gray-700 block mb-2">Search Buyers</Label>
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="Search by company name..."
                        className="pl-9 border-gray-200 focus:border-amber-300 shadow-sm bg-white"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-lg border border-amber-100">
                    <Label className="text-sm font-medium text-gray-700 block mb-2">Region/Country</Label>
                    <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                      <SelectTrigger className="bg-white border-gray-200 focus:border-amber-300 shadow-sm">
                        <SelectValue placeholder="All Regions" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Regions</SelectItem>
                        {regions
                          .filter(r => r !== "all")
                          .map((region) => (
                            <SelectItem key={region} value={region}>
                              {region}
                            </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-lg border border-amber-100">
                    <Label className="text-sm font-medium text-gray-700 block mb-2">Industry</Label>
                    <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                      <SelectTrigger className="bg-white border-gray-200 focus:border-amber-300 shadow-sm">
                        <SelectValue placeholder="All Industries" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Industries</SelectItem>
                        {industries
                          .filter(i => i !== "all")
                          .map((industry) => (
                            <SelectItem key={industry} value={industry}>
                              {industry}
                            </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-6 justify-between">
                  <div className="flex items-center space-x-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700 block mb-2">Min Match Score ({minMatchScore}%)</Label>
                      <Input 
                        type="range" 
                        min={0} 
                        max={100} 
                        value={minMatchScore} 
                        onChange={(e) => setMinMatchScore(parseInt(e.target.value))} 
                        className="w-40"
                      />
                    </div>
                    <div className="flex items-center space-x-2 mt-6">
                      <Checkbox 
                        id="verified-only" 
                        checked={verifiedOnly}
                        onCheckedChange={(checked) => setVerifiedOnly(checked as boolean)}
                      />
                      <Label htmlFor="verified-only" className="text-sm font-medium text-gray-700">
                        Verified Buyers Only
                      </Label>
                    </div>
                  </div>
                  
                  <Button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-md hover:shadow-lg transition-all duration-300 mt-4 md:mt-6">
                    <Filter className="h-4 w-4 mr-2" />
                    Apply Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-8">
              <TabsList className="grid grid-cols-3 mb-8 bg-white border border-gray-100 p-1 shadow-sm rounded-xl">
                <TabsTrigger 
                  value="recommended" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-600 data-[state=active]:text-white rounded-md transition-all duration-200 flex items-center"
                >
                  <Star className="h-4 w-4 mr-2" />
                  Recommended
                </TabsTrigger>
                <TabsTrigger 
                  value="new-inquiries" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-600 data-[state=active]:text-white rounded-md transition-all duration-200 flex items-center"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  New Inquiries
                </TabsTrigger>
                <TabsTrigger 
                  value="contacted" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-600 data-[state=active]:text-white rounded-md transition-all duration-200 flex items-center"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Contacted
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Buyers List */}
              <div className="lg:col-span-1 space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {filteredBuyers.length} Buyers Found
                </h3>
                
                {filteredBuyers.length === 0 ? (
                  <Card className="border border-dashed border-amber-200 shadow-sm rounded-xl overflow-hidden">
                    <div className="h-1 w-full bg-gradient-to-r from-amber-500 to-orange-600"></div>
                    <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                      <div className="rounded-full bg-gradient-to-r from-amber-100 to-orange-100 p-3 mb-4 shadow-md">
                        <AlertCircle className="h-6 w-6 text-amber-500" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">No buyers found</h3>
                      <p className="text-gray-600 mb-4">
                        Try adjusting your filters to see more potential buyers
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-3">
                    {filteredBuyers.map((buyer) => (
                      <Card 
                        key={buyer.id} 
                        className={`border cursor-pointer transition-all duration-300 hover:shadow-md ${
                          selectedBuyerId === buyer.id 
                            ? "border-amber-300 bg-gradient-to-r from-amber-50 to-orange-50 shadow-md" 
                            : "border-gray-200"
                        }`}
                        onClick={() => handleBuyerSelect(buyer.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center">
                                <h4 className="font-medium text-gray-900">
                                  {buyer.companyName}
                                </h4>
                                {buyer.verified && (
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger>
                                        <CheckCircle className="h-4 w-4 text-emerald-500 ml-1" />
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p className="text-xs">Verified Buyer</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                )}
                              </div>
                              <div className="flex items-center text-sm text-gray-500 mt-1">
                                <Map className="h-3.5 w-3.5 mr-1" />
                                <span>{buyer.location}, {buyer.country}</span>
                              </div>
                              <div className="flex items-center text-sm text-gray-500 mt-1">
                                <Building className="h-3.5 w-3.5 mr-1" />
                                <span>{buyer.industry}</span>
                              </div>
                            </div>
                            <div className="flex flex-col items-end">
                              <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-white">
                                {buyer.matchScore}% Match
                              </Badge>
                              <span className="text-xs text-gray-500 mt-1">{buyer.lastActive}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>

              {/* Buyer Detail */}
              <div className="lg:col-span-2">
                {selectedBuyer ? (
                  <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden">
                    <div className="h-1.5 w-full bg-gradient-to-r from-amber-500 to-orange-600"></div>
                    <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-100">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center">
                            <CardTitle className="text-xl font-bold text-gray-900">
                              {selectedBuyer.companyName}
                            </CardTitle>
                            {selectedBuyer.verified && (
                              <Badge className="ml-2 bg-emerald-100 text-emerald-700 border border-emerald-200">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                          </div>
                          <CardDescription className="mt-1 flex items-center text-gray-600">
                            <Globe className="h-4 w-4 mr-1" />
                            {selectedBuyer.location}, {selectedBuyer.country}
                          </CardDescription>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">
                            {selectedBuyer.matchScore}%
                          </div>
                          <div className="text-sm text-gray-600">Match Score</div>
                          <Progress 
                            value={selectedBuyer.matchScore} 
                            className="w-32 h-2 mt-1 bg-gray-100" 
                            indicatorClassName="bg-gradient-to-r from-amber-500 to-orange-600"
                          />
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="p-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                        <div>
                          <h3 className="text-base font-semibold text-gray-800 mb-3 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Company Information
                          </h3>
                          
                          <div className="space-y-3 bg-white p-4 rounded-lg border border-gray-100">
                            <div>
                              <span className="text-sm font-medium text-gray-500 block">Industry</span>
                              <span className="text-gray-900">{selectedBuyer.industry}</span>
                            </div>
                            <div>
                              <span className="text-sm font-medium text-gray-500 block">Minimum Order Value</span>
                              <span className="text-gray-900">{selectedBuyer.minimumOrderValue}</span>
                            </div>
                            <div>
                              <span className="text-sm font-medium text-gray-500 block">Preferred Categories</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {selectedBuyer.preferredCategories.map((category, index) => (
                                  <Badge key={index} className="bg-amber-50 text-amber-700 border border-amber-200">
                                    {category}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div>
                              <span className="text-sm font-medium text-gray-500 block">Last Active</span>
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1 text-amber-500" />
                                <span className="text-gray-900">{selectedBuyer.lastActive}</span>
                              </div>
                            </div>
                          </div>
                          
                          <h3 className="text-base font-semibold text-gray-800 mb-3 mt-6 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            Contact Information
                          </h3>
                          
                          <div className="space-y-3 bg-white p-4 rounded-lg border border-gray-100">
                            <div>
                              <span className="text-sm font-medium text-gray-500 block">Contact Person</span>
                              <span className="text-gray-900">{selectedBuyer.contactName}</span>
                            </div>
                            <div>
                              <span className="text-sm font-medium text-gray-500 block">Email</span>
                              <div className="flex items-center">
                                <Mail className="h-4 w-4 mr-1 text-amber-500" />
                                <span className="text-gray-900">{selectedBuyer.contactEmail}</span>
                              </div>
                            </div>
                            <div>
                              <span className="text-sm font-medium text-gray-500 block">Phone</span>
                              <div className="flex items-center">
                                <Phone className="h-4 w-4 mr-1 text-amber-500" />
                                <span className="text-gray-900">{selectedBuyer.contactPhone}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-base font-semibold text-gray-800 mb-3 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                            Interested Products
                          </h3>
                          
                          <div className="space-y-3 bg-white p-4 rounded-lg border border-gray-100">
                            {selectedBuyer.interestedProducts.map((product, index) => (
                              <div key={index} className="p-3 border border-gray-100 rounded-lg hover:bg-amber-50 transition-colors cursor-pointer flex justify-between">
                                <span className="text-gray-900">{product}</span>
                                <ChevronRight className="h-5 w-5 text-gray-400" />
                              </div>
                            ))}
                          </div>
                          
                          <h3 className="text-base font-semibold text-gray-800 mb-3 mt-6 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Why This Match?
                          </h3>
                          
                          <div className="space-y-3 bg-white p-4 rounded-lg border border-gray-100">
                            <p className="text-gray-700">
                              This buyer is looking for products in your categories with specifications that match your inventory. The buyer has a history of successful purchases from your region and has shown interest in traditional craftsmanship.
                            </p>
                            <div className="flex items-center pt-2">
                              <HelpCircle className="h-4 w-4 text-amber-500 mr-1" />
                              <span className="text-xs text-gray-500">
                                Match scores are calculated based on product alignment, order history, and buyer preferences.
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="flex items-center justify-between p-6 bg-gray-50 border-t border-gray-100">
                      <div className="text-sm text-gray-500">
                        Contact this buyer to discuss potential export opportunities
                      </div>
                      <div className="flex space-x-3">
                        <Button variant="outline" className="border-amber-200 text-amber-700 hover:bg-amber-50">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View Full Profile
                        </Button>
                        <Button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Contact Buyer
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ) : (
                  <Card className="border border-dashed border-amber-200 shadow-sm rounded-xl overflow-hidden">
                    <div className="h-1 w-full bg-gradient-to-r from-amber-500 to-orange-600"></div>
                    <CardContent className="flex flex-col items-center justify-center p-10 text-center">
                      <div className="rounded-full bg-gradient-to-r from-amber-100 to-orange-100 p-4 mb-4 shadow-md">
                        <Users className="h-8 w-8 text-amber-500" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-3">Select a Buyer</h3>
                      <p className="text-gray-600 mb-6 max-w-md">
                        Select a buyer from the list to view detailed information and connection opportunities.
                      </p>
                      <Button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-md hover:shadow-lg transition-all duration-300">
                        <Filter className="h-4 w-4 mr-2" />
                        Adjust Search Filters
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}