import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { MobileNav } from "@/components/mobile-nav";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/use-auth";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  HelpCircleIcon,
  SearchIcon,
  TrendingUpIcon,
  BarChart2Icon,
  GlobeIcon,
  PieChartIcon,
  DownloadIcon,
  FilterIcon,
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

export default function MarketResearch() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const { user } = useAuth();
  
  // Convert user data to format expected by child components
  const userData = {
    username: user?.username || "",
    name: user?.companyName || "",
    companyName: user?.companyName || "",
    email: user?.email || "",
    exportReadiness: user?.exportReadiness || 0,
  };

  const [selectedTab, setSelectedTab] = useState("global-trends");
  const [selectedProduct, setSelectedProduct] = useState("Handcrafted Furniture");
  const [selectedRegion, setSelectedRegion] = useState("Asia Pacific");
  const [timeRange, setTimeRange] = useState("Last 12 Months");

  // Global Market Trends Data
  const globalTrendsData = [
    { month: "Jan", furniture: 120, textiles: 90, food: 60, handicrafts: 50 },
    { month: "Feb", furniture: 115, textiles: 95, food: 65, handicrafts: 55 },
    { month: "Mar", furniture: 130, textiles: 100, food: 70, handicrafts: 60 },
    { month: "Apr", furniture: 145, textiles: 105, food: 75, handicrafts: 65 },
    { month: "May", furniture: 155, textiles: 110, food: 80, handicrafts: 70 },
    { month: "Jun", furniture: 170, textiles: 115, food: 85, handicrafts: 75 },
    { month: "Jul", furniture: 165, textiles: 105, food: 75, handicrafts: 70 },
    { month: "Aug", furniture: 175, textiles: 110, food: 80, handicrafts: 80 },
    { month: "Sep", furniture: 185, textiles: 120, food: 90, handicrafts: 85 },
    { month: "Oct", furniture: 195, textiles: 125, food: 95, handicrafts: 90 },
    { month: "Nov", furniture: 190, textiles: 120, food: 90, handicrafts: 85 },
    { month: "Dec", furniture: 200, textiles: 130, food: 100, handicrafts: 95 },
  ];

  // Country Comparison Data
  const countryComparisonData = [
    { country: "Japan", importVolume: 85, tariffRate: 5, marketAccess: 90 },
    { country: "United States", importVolume: 65, tariffRate: 10, marketAccess: 75 },
    { country: "Singapore", importVolume: 45, tariffRate: 0, marketAccess: 95 },
    { country: "Australia", importVolume: 30, tariffRate: 7, marketAccess: 80 },
    { country: "South Korea", importVolume: 25, tariffRate: 8, marketAccess: 70 },
  ];

  // Regional Market Share Data
  const marketShareData = [
    { name: "Indonesia", value: 15 },
    { name: "Vietnam", value: 25 },
    { name: "Malaysia", value: 20 },
    { name: "Thailand", value: 30 },
    { name: "Philippines", value: 10 },
  ];

  const COLORS = ["#1E88E5", "#26A69A", "#FFC107", "#EF6C00", "#D32F2F"];

  // Competitor Analysis Data
  const competitorPriceData = [
    { competitor: "Comp A", low: 350, average: 450, high: 550 },
    { competitor: "Comp B", low: 300, average: 400, high: 500 },
    { competitor: "Comp C", low: 400, average: 500, high: 600 },
    { competitor: "Comp D", low: 380, average: 480, high: 580 },
    { competitor: "Your Price", low: 370, average: 470, high: 570 },
  ];

  // Consumer Insights Data
  const consumerPreferencesData = [
    { preference: "Eco-friendly materials", score: 85 },
    { preference: "Traditional designs", score: 70 },
    { preference: "Modern fusion styles", score: 60 },
    { preference: "Customization options", score: 50 },
    { preference: "Local artisan stories", score: 45 },
  ];

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
                <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg p-3 text-white shadow-md mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Market Research</h1>
                  <p className="text-gray-600 mt-1">Analyze global trade markets and discover export opportunities</p>
                </div>
              </div>
              <Button 
                className="mt-4 sm:mt-0 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-md hover:shadow-lg transition-all duration-300" 
              >
                <DownloadIcon className="h-4 w-4 mr-2" />
                Download Market Report
              </Button>
            </div>

            <Card className="mb-8 border border-gray-100 shadow-sm rounded-xl overflow-hidden">
              <div className="h-1.5 w-full bg-gradient-to-r from-purple-500 to-pink-600"></div>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <FilterIcon className="h-5 w-5 mr-2 text-purple-500" />
                  Research Parameters
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-100">
                    <Label className="text-sm font-medium text-gray-700 block mb-2">Product Category</Label>
                    <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                      <SelectTrigger className="bg-white border border-gray-200 focus:border-purple-300 shadow-sm">
                        <SelectValue placeholder="Select product category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Handcrafted Furniture">Handcrafted Furniture</SelectItem>
                        <SelectItem value="Textiles & Apparel">Textiles & Apparel</SelectItem>
                        <SelectItem value="Food Products">Food Products</SelectItem>
                        <SelectItem value="Handicrafts">Handicrafts</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
                    <Label className="text-sm font-medium text-gray-700 block mb-2">Region/Country</Label>
                    <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                      <SelectTrigger className="bg-white border border-gray-200 focus:border-blue-300 shadow-sm">
                        <SelectValue placeholder="Select region" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Asia Pacific">Asia Pacific</SelectItem>
                        <SelectItem value="North America">North America</SelectItem>
                        <SelectItem value="Europe">Europe</SelectItem>
                        <SelectItem value="Middle East">Middle East</SelectItem>
                        <SelectItem value="Africa">Africa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-lg border border-amber-100">
                    <Label className="text-sm font-medium text-gray-700 block mb-2">Time Range</Label>
                    <Select value={timeRange} onValueChange={setTimeRange}>
                      <SelectTrigger className="bg-white border border-gray-200 focus:border-amber-300 shadow-sm">
                        <SelectValue placeholder="Select time range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Last 3 Months">Last 3 Months</SelectItem>
                        <SelectItem value="Last 6 Months">Last 6 Months</SelectItem>
                        <SelectItem value="Last 12 Months">Last 12 Months</SelectItem>
                        <SelectItem value="Last 24 Months">Last 24 Months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-md hover:shadow-lg transition-all duration-300">
                    <FilterIcon className="h-4 w-4 mr-2" />
                    Generate Market Insights
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-8">
              <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-8 bg-white border border-gray-100 p-1 shadow-sm rounded-xl">
                <TabsTrigger 
                  value="global-trends" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-600 data-[state=active]:text-white rounded-md transition-all duration-200 flex items-center"
                >
                  <TrendingUpIcon className="h-4 w-4 mr-2" />
                  Global Trends
                </TabsTrigger>
                <TabsTrigger 
                  value="country-comparison" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white rounded-md transition-all duration-200 flex items-center"
                >
                  <GlobeIcon className="h-4 w-4 mr-2" />
                  Country Comparison
                </TabsTrigger>
                <TabsTrigger 
                  value="market-share" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white rounded-md transition-all duration-200 flex items-center"
                >
                  <PieChartIcon className="h-4 w-4 mr-2" />
                  Market Share
                </TabsTrigger>
                <TabsTrigger 
                  value="competitor-analysis" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-600 data-[state=active]:text-white rounded-md transition-all duration-200 flex items-center"
                >
                  <BarChart2Icon className="h-4 w-4 mr-2" />
                  Competitor Analysis
                </TabsTrigger>
                <TabsTrigger 
                  value="consumer-insights" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-rose-600 data-[state=active]:text-white rounded-md transition-all duration-200 flex items-center"
                >
                  <HelpCircleIcon className="h-4 w-4 mr-2" />
                  Consumer Insights
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="global-trends">
                <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden">
                  <div className="h-1.5 w-full bg-gradient-to-r from-purple-500 to-pink-600"></div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <h2 className="text-xl font-bold text-gray-900 flex items-center">
                          <TrendingUpIcon className="h-5 w-5 mr-2 text-purple-500" />
                          Global Import Trends
                        </h2>
                        <p className="text-sm text-gray-600 mt-1">Monthly import volume index by product category</p>
                      </div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="border-purple-200 text-purple-700 hover:bg-purple-50 hover:text-purple-800"
                            >
                              <DownloadIcon className="h-4 w-4 mr-2" />
                              Export Data
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs">Download this data as CSV</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm mb-6">
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={globalTrendsData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="month" tick={{fill: '#666'}} />
                            <YAxis tick={{fill: '#666'}} />
                            <RechartsTooltip 
                              contentStyle={{
                                backgroundColor: 'white', 
                                border: '1px solid #e2e8f0',
                                borderRadius: '0.375rem',
                                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
                              }}
                            />
                            <Legend />
                            <Line 
                              type="monotone" 
                              dataKey="furniture" 
                              stroke="#8b5cf6" 
                              strokeWidth={3}
                              name="Furniture" 
                              dot={{ fill: '#8b5cf6', r: 4 }}
                              activeDot={{ fill: '#8b5cf6', r: 6, strokeWidth: 2, stroke: 'white' }}
                            />
                            <Line 
                              type="monotone" 
                              dataKey="textiles" 
                              stroke="#ec4899" 
                              strokeWidth={3}
                              name="Textiles" 
                              dot={{ fill: '#ec4899', r: 4 }}
                              activeDot={{ fill: '#ec4899', r: 6, strokeWidth: 2, stroke: 'white' }}
                            />
                            <Line 
                              type="monotone" 
                              dataKey="food" 
                              stroke="#3b82f6" 
                              strokeWidth={3}
                              name="Food Products" 
                              dot={{ fill: '#3b82f6', r: 4 }}
                              activeDot={{ fill: '#3b82f6', r: 6, strokeWidth: 2, stroke: 'white' }}
                            />
                            <Line 
                              type="monotone" 
                              dataKey="handicrafts" 
                              stroke="#10b981" 
                              strokeWidth={3}
                              name="Handicrafts" 
                              dot={{ fill: '#10b981', r: 4 }}
                              activeDot={{ fill: '#10b981', r: 6, strokeWidth: 2, stroke: 'white' }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-base font-semibold text-gray-800 mb-3 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Key Insights
                        </h3>
                        <div className="space-y-4">
                          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-100">
                            <div className="flex items-start">
                              <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-2 rounded-full text-white mr-3">
                                <TrendingUpIcon className="h-4 w-4" />
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-gray-800">Strong Growth for Furniture</p>
                                <p className="text-xs text-gray-600 mt-1">Consistent upward trend with seasonal peaks in Q4</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
                            <div className="flex items-start">
                              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-2 rounded-full text-white mr-3">
                                <BarChart2Icon className="h-4 w-4" />
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-gray-800">Steady Market for Textiles</p>
                                <p className="text-xs text-gray-600 mt-1">Moderate but consistent growth with less volatility</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-lg border border-amber-100">
                            <div className="flex items-start">
                              <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-2 rounded-full text-white mr-3">
                                <GlobeIcon className="h-4 w-4" />
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-gray-800">Regional Opportunities</p>
                                <p className="text-xs text-gray-600 mt-1">Asia Pacific shows highest demand for Indonesian craftsmanship</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-base font-semibold text-gray-800 mb-3 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                          Forecasted Growth
                        </h3>
                        <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                          <div className="h-48">
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart data={[
                                { category: "Q1", growth: 8 },
                                { category: "Q2", growth: 12 },
                                { category: "Q3", growth: 15 },
                                { category: "Q4", growth: 20 },
                              ]}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis dataKey="category" tick={{fill: '#666'}} />
                                <YAxis label={{ value: '% Growth', angle: -90, position: 'insideLeft', fill: '#666' }} tick={{fill: '#666'}} />
                                <RechartsTooltip 
                                  formatter={(value) => [`${value}%`, 'Growth Rate']}
                                  contentStyle={{
                                    backgroundColor: 'white', 
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '0.375rem',
                                    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
                                  }}
                                />
                                <Bar 
                                  dataKey="growth" 
                                  radius={[4, 4, 0, 0]}
                                  fill="url(#purplePinkGradient)" 
                                />
                                <defs>
                                  <linearGradient id="purplePinkGradient" x1="0" y1="0" x2="100%" y2="0">
                                    <stop offset="0%" stopColor="#8b5cf6" />
                                    <stop offset="100%" stopColor="#ec4899" />
                                  </linearGradient>
                                </defs>
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                          <p className="text-xs text-gray-500 mt-3 italic">
                            * Forecast based on historical data, trade agreements, and economic indicators
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="country-comparison">
                <Card className="border border-neutral-100">
                  <CardContent className="p-5">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h2 className="text-lg font-semibold text-neutral-900">Country Market Comparison</h2>
                        <p className="text-sm text-neutral-600">Analysis of top export destination countries</p>
                      </div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline" size="sm">
                              <DownloadIcon className="h-4 w-4 mr-2" />
                              Export Data
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs">Download this data as CSV</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={countryComparisonData}
                          layout="vertical"
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" />
                          <YAxis dataKey="country" type="category" />
                          <RechartsTooltip />
                          <Legend />
                          <Bar dataKey="importVolume" name="Import Volume" fill="#1E88E5" />
                          <Bar dataKey="tariffRate" name="Tariff Rate (%)" fill="#26A69A" />
                          <Bar dataKey="marketAccess" name="Market Access Score" fill="#FFC107" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                      <Card className="border border-neutral-200">
                        <CardContent className="p-4">
                          <h3 className="text-base font-medium text-neutral-800 mb-2">Japan</h3>
                          <Separator className="my-2" />
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-neutral-600">Market Size:</span>
                              <span className="font-medium">$2.5B</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-neutral-600">Growth Rate:</span>
                              <span className="font-medium text-green-600">+12.5%</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-neutral-600">Tariff Rate:</span>
                              <span className="font-medium">5%</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-neutral-600">Market Access:</span>
                              <span className="font-medium">High</span>
                            </div>
                          </div>
                          <Separator className="my-2" />
                          <p className="text-xs text-neutral-500">Premium market with high demand for quality craftsmanship and sustainable materials.</p>
                        </CardContent>
                      </Card>
                      
                      <Card className="border border-neutral-200">
                        <CardContent className="p-4">
                          <h3 className="text-base font-medium text-neutral-800 mb-2">United States</h3>
                          <Separator className="my-2" />
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-neutral-600">Market Size:</span>
                              <span className="font-medium">$4.8B</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-neutral-600">Growth Rate:</span>
                              <span className="font-medium text-green-600">+8.2%</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-neutral-600">Tariff Rate:</span>
                              <span className="font-medium">10%</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-neutral-600">Market Access:</span>
                              <span className="font-medium">Medium</span>
                            </div>
                          </div>
                          <Separator className="my-2" />
                          <p className="text-xs text-neutral-500">Large market with varying preferences across regions. Strong emphasis on unique designs.</p>
                        </CardContent>
                      </Card>
                      
                      <Card className="border border-neutral-200">
                        <CardContent className="p-4">
                          <h3 className="text-base font-medium text-neutral-800 mb-2">Singapore</h3>
                          <Separator className="my-2" />
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-neutral-600">Market Size:</span>
                              <span className="font-medium">$0.9B</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-neutral-600">Growth Rate:</span>
                              <span className="font-medium text-green-600">+15.3%</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-neutral-600">Tariff Rate:</span>
                              <span className="font-medium">0%</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-neutral-600">Market Access:</span>
                              <span className="font-medium">Very High</span>
                            </div>
                          </div>
                          <Separator className="my-2" />
                          <p className="text-xs text-neutral-500">Strategic hub with zero tariffs. Growing demand for premium and designer furniture.</p>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="market-share">
                <Card className="border border-neutral-100">
                  <CardContent className="p-5">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h2 className="text-lg font-semibold text-neutral-900">Regional Market Share Analysis</h2>
                        <p className="text-sm text-neutral-600">Competitive positioning in {selectedRegion} for {selectedProduct}</p>
                      </div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline" size="sm">
                              <DownloadIcon className="h-4 w-4 mr-2" />
                              Export Data
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs">Download this data as CSV</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={marketShareData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {marketShareData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Legend />
                            <RechartsTooltip formatter={(value) => [`${value}%`, 'Market Share']} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      
                      <div>
                        <h3 className="text-base font-medium text-neutral-800 mb-3">Competitive Positioning</h3>
                        <div className="space-y-4">
                          <div className="bg-neutral-50 p-3 rounded-md">
                            <div className="flex items-start">
                              <PieChartIcon className="text-primary-600 h-5 w-5 mt-0.5 mr-2" />
                              <div>
                                <p className="text-sm font-medium text-neutral-700">Current Market Position</p>
                                <p className="text-xs text-neutral-500 mt-1">Indonesia holds 15% market share, positioned as a premium supplier with growth potential.</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-neutral-50 p-3 rounded-md">
                            <div className="flex items-start">
                              <TrendingUpIcon className="text-green-600 h-5 w-5 mt-0.5 mr-2" />
                              <div>
                                <p className="text-sm font-medium text-neutral-700">Growth Opportunity</p>
                                <p className="text-xs text-neutral-500 mt-1">Potential to increase share by 5-7% through targeted marketing in premium segments.</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-neutral-50 p-3 rounded-md">
                            <div className="flex items-start">
                              <BarChart2Icon className="text-amber-600 h-5 w-5 mt-0.5 mr-2" />
                              <div>
                                <p className="text-sm font-medium text-neutral-700">Competitive Advantages</p>
                                <p className="text-xs text-neutral-500 mt-1">Unique design aesthetics, sustainable sourcing, and competitive pricing compared to Thailand.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Separator className="my-6" />
                    
                    <div>
                      <h3 className="text-base font-medium text-neutral-800 mb-3">Competitor Country Analysis</h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-neutral-200">
                          <thead className="bg-neutral-50">
                            <tr>
                              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Country</th>
                              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Market Share</th>
                              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Price Point</th>
                              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Quality Perception</th>
                              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Key Strengths</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-neutral-200">
                            <tr>
                              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-neutral-800">Vietnam</td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-600">25%</td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-600">Medium-Low</td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-600">Medium</td>
                              <td className="px-4 py-3 text-sm text-neutral-600">Cost-effective manufacturing, fast turnaround</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-neutral-800">Thailand</td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-600">30%</td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-600">Medium-High</td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-600">High</td>
                              <td className="px-4 py-3 text-sm text-neutral-600">Design innovation, well-established export channels</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-neutral-800">Malaysia</td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-600">20%</td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-600">Medium</td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-600">Medium-High</td>
                              <td className="px-4 py-3 text-sm text-neutral-600">Modern designs, efficient logistics</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-neutral-800">Indonesia</td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-600">15%</td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-600">Medium-High</td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-600">High</td>
                              <td className="px-4 py-3 text-sm text-neutral-600">Unique craftsmanship, sustainable materials</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-neutral-800">Philippines</td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-600">10%</td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-600">Medium</td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-600">Medium</td>
                              <td className="px-4 py-3 text-sm text-neutral-600">Distinctive designs, natural materials</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="competitor-analysis">
                <Card className="border border-neutral-100">
                  <CardContent className="p-5">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h2 className="text-lg font-semibold text-neutral-900">Competitor Price Analysis</h2>
                        <p className="text-sm text-neutral-600">Price comparison across key competitors for {selectedProduct}</p>
                      </div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline" size="sm">
                              <DownloadIcon className="h-4 w-4 mr-2" />
                              Export Data
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs">Download this data as CSV</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={competitorPriceData}
                          margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="competitor" />
                          <YAxis label={{ value: 'Price (USD)', angle: -90, position: 'insideLeft' }} />
                          <RechartsTooltip />
                          <Legend />
                          <Bar dataKey="low" name="Low Range" fill="#26A69A" />
                          <Bar dataKey="average" name="Average" fill="#1E88E5" />
                          <Bar dataKey="high" name="High Range" fill="#FFC107" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                      <div>
                        <h3 className="text-base font-medium text-neutral-800 mb-3">Competitive Advantages</h3>
                        <div className="space-y-3">
                          <div className="bg-neutral-50 p-3 rounded-md">
                            <p className="text-sm font-medium text-neutral-700">Unique Design Aesthetics</p>
                            <div className="flex items-center mt-1">
                              <div className="w-full bg-neutral-100 rounded-full h-1.5">
                                <div className="bg-primary-600 h-1.5 rounded-full" style={{ width: "85%" }}></div>
                              </div>
                              <span className="ml-2 text-xs font-medium text-neutral-700">85%</span>
                            </div>
                          </div>
                          
                          <div className="bg-neutral-50 p-3 rounded-md">
                            <p className="text-sm font-medium text-neutral-700">Sustainable Materials</p>
                            <div className="flex items-center mt-1">
                              <div className="w-full bg-neutral-100 rounded-full h-1.5">
                                <div className="bg-primary-600 h-1.5 rounded-full" style={{ width: "90%" }}></div>
                              </div>
                              <span className="ml-2 text-xs font-medium text-neutral-700">90%</span>
                            </div>
                          </div>
                          
                          <div className="bg-neutral-50 p-3 rounded-md">
                            <p className="text-sm font-medium text-neutral-700">Craftsmanship Quality</p>
                            <div className="flex items-center mt-1">
                              <div className="w-full bg-neutral-100 rounded-full h-1.5">
                                <div className="bg-primary-600 h-1.5 rounded-full" style={{ width: "88%" }}></div>
                              </div>
                              <span className="ml-2 text-xs font-medium text-neutral-700">88%</span>
                            </div>
                          </div>
                          
                          <div className="bg-neutral-50 p-3 rounded-md">
                            <p className="text-sm font-medium text-neutral-700">Price Competitiveness</p>
                            <div className="flex items-center mt-1">
                              <div className="w-full bg-neutral-100 rounded-full h-1.5">
                                <div className="bg-primary-600 h-1.5 rounded-full" style={{ width: "70%" }}></div>
                              </div>
                              <span className="ml-2 text-xs font-medium text-neutral-700">70%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-base font-medium text-neutral-800 mb-3">Competitive Positioning Insights</h3>
                        <div className="bg-neutral-50 p-4 rounded-md">
                          <h4 className="text-sm font-medium text-neutral-800 mb-2">Pricing Strategy Recommendations</h4>
                          <ul className="space-y-2 text-sm text-neutral-600">
                            <li className="flex items-start">
                              <span className="text-primary-600 mr-2">•</span>
                              <span>Position in the upper-mid price range to highlight premium quality</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-primary-600 mr-2">•</span>
                              <span>Emphasize sustainable materials to justify 10-15% premium over competitors</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-primary-600 mr-2">•</span>
                              <span>Offer tiered pricing based on customization and design complexity</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-primary-600 mr-2">•</span>
                              <span>Include origin story and craftsmanship details to enhance perceived value</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="consumer-insights">
                <Card className="border border-neutral-100">
                  <CardContent className="p-5">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h2 className="text-lg font-semibold text-neutral-900">Consumer Preference Analysis</h2>
                        <p className="text-sm text-neutral-600">Key buying factors for {selectedProduct} in {selectedRegion}</p>
                      </div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline" size="sm">
                              <DownloadIcon className="h-4 w-4 mr-2" />
                              Export Data
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs">Download this data as CSV</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={consumerPreferencesData}
                            layout="vertical"
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" />
                            <YAxis dataKey="preference" type="category" />
                            <RechartsTooltip formatter={(value) => [`${value}/100`, 'Importance Score']} />
                            <Bar dataKey="score" name="Importance Score" fill="#1E88E5" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                      
                      <div>
                        <h3 className="text-base font-medium text-neutral-800 mb-3">Regional Preference Insights</h3>
                        <div className="space-y-4">
                          <div className="bg-neutral-50 p-3 rounded-md">
                            <div className="flex items-start">
                              <div>
                                <p className="text-sm font-medium text-neutral-700">Japan Market Preferences</p>
                                <p className="text-xs text-neutral-500 mt-1">Strong emphasis on traditional aesthetics with eco-friendly materials. Quality certification is essential.</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-neutral-50 p-3 rounded-md">
                            <div className="flex items-start">
                              <div>
                                <p className="text-sm font-medium text-neutral-700">US Market Preferences</p>
                                <p className="text-xs text-neutral-500 mt-1">Preference for modern designs with traditional elements. Focus on customization and unique stories.</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-neutral-50 p-3 rounded-md">
                            <div className="flex items-start">
                              <div>
                                <p className="text-sm font-medium text-neutral-700">Emerging Consumer Trends</p>
                                <p className="text-xs text-neutral-500 mt-1">Growing interest in products with documented sustainability credentials and ethical production stories.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <h3 className="text-base font-medium text-neutral-800 mt-6 mb-3">Product Recommendation</h3>
                        <div className="bg-primary-50 text-primary-700 p-3 rounded-lg">
                          <p className="text-sm font-medium">Focus on eco-friendly teak products with traditional Indonesian design elements</p>
                          <p className="text-xs mt-1">This combination meets the top consumer preferences in your target markets and maximizes your competitive advantages in craftsmanship and sustainable sourcing.</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}
