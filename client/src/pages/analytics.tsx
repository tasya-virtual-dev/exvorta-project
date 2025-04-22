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
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/use-auth";
import {
  SearchIcon,
  BarChart,
  PieChart,
  TrendingUp,
  Globe,
  ArrowUpRight,
  ArrowDownRight,
  CalendarIcon,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  Download,
  FileText,
  HelpCircle,
  Mail,
  ShoppingCart,
  Truck,
  Clock,
  PackageCheck,
  Boxes,
  Users
} from "lucide-react";
import { AreaChart, Area, BarChart as RechartsBarChart, Bar, LineChart, Line, PieChart as RechartsPieChart, Pie, Sector, Cell, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Analytics() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState("last30");
  const [selectedMetric, setSelectedMetric] = useState("revenue");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const { user } = useAuth();
  
  // Convert user data to format expected by child components
  const userData = {
    username: user?.username || "",
    name: user?.companyName || "",
    companyName: user?.companyName || "",
    email: user?.email || "",
    exportReadiness: user?.exportReadiness || 0,
  };

  // Sample data for charts
  const salesData = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 2000 },
    { name: 'Apr', value: 2780 },
    { name: 'May', value: 1890 },
    { name: 'Jun', value: 2390 },
    { name: 'Jul', value: 3490 },
    { name: 'Aug', value: 4200 },
    { name: 'Sep', value: 5000 },
    { name: 'Oct', value: 4300 },
    { name: 'Nov', value: 4800 },
    { name: 'Dec', value: 6000 },
  ];

  const marketShareData = [
    { name: 'Germany', value: 35 },
    { name: 'Japan', value: 25 },
    { name: 'Australia', value: 15 },
    { name: 'United States', value: 15 },
    { name: 'Other', value: 10 },
  ];

  const productPerformanceData = [
    { name: 'Teak Dining Table', revenue: 120000, units: 40, growth: 15 },
    { name: 'Rattan Chair Set', revenue: 95000, units: 85, growth: 23 },
    { name: 'Bamboo Coffee Table', revenue: 78000, units: 60, growth: 8 },
    { name: 'Ceramic Vase Set', revenue: 45000, units: 120, growth: 12 },
    { name: 'Batik Table Runner', revenue: 32000, units: 95, growth: -5 },
    { name: 'Hand-carved Bowl', revenue: 28000, units: 70, growth: 18 },
  ];

  const shipmentStatusData = [
    { name: 'In Transit', value: 7 },
    { name: 'Delivered', value: 15 },
    { name: 'Preparing', value: 5 },
    { name: 'Customs', value: 3 },
    { name: 'Delayed', value: 2 },
  ];

  const marketTrendData = [
    { month: 'Jan', volume: 4000, price: 2400, marketSize: 2400 },
    { month: 'Feb', volume: 3000, price: 1398, marketSize: 2210 },
    { month: 'Mar', volume: 2000, price: 9800, marketSize: 2290 },
    { month: 'Apr', volume: 2780, price: 3908, marketSize: 2000 },
    { month: 'May', volume: 1890, price: 4800, marketSize: 2181 },
    { month: 'Jun', volume: 2390, price: 3800, marketSize: 2500 },
    { month: 'Jul', volume: 3490, price: 4300, marketSize: 2100 },
  ];

  const countriesData = [
    { name: 'Germany', revenue: 250000, orders: 45, growth: 12 },
    { name: 'Japan', revenue: 180000, orders: 32, growth: 8 },
    { name: 'Australia', revenue: 120000, orders: 28, growth: 15 },
    { name: 'United States', revenue: 95000, orders: 22, growth: 20 },
    { name: 'Netherlands', revenue: 85000, orders: 18, growth: 5 },
    { name: 'Singapore', revenue: 75000, orders: 15, growth: 10 },
  ];

  // Define chart colors
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  // Key metrics data
  const keyMetrics = [
    {
      title: "Total Revenue",
      value: "$1,250,000",
      change: "+15.3%",
      positive: true,
      icon: CircleDollarSign
    },
    {
      title: "Export Orders",
      value: "187",
      change: "+8.2%",
      positive: true,
      icon: ShoppingCart
    },
    {
      title: "Average Order Value",
      value: "$6,684",
      change: "+6.7%",
      positive: true,
      icon: TrendingUp
    },
    {
      title: "On-time Delivery",
      value: "92%",
      change: "-2.1%",
      positive: false,
      icon: Truck
    }
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
                <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg p-3 text-white shadow-md mr-4">
                  <BarChart className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Export Analytics</h1>
                  <p className="text-gray-600 mt-1">Visualize your export performance and market insights</p>
                </div>
              </div>
              <div className="mt-4 sm:mt-0 flex space-x-3">
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm px-3 py-1.5 flex items-center">
                  <CalendarIcon className="h-4 w-4 text-gray-400 mr-2" />
                  <Select value={selectedDateRange} onValueChange={setSelectedDateRange}>
                    <SelectTrigger className="border-0 shadow-none p-0 h-auto focus:ring-0">
                      <SelectValue placeholder="Filter by date" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="last7">Last 7 days</SelectItem>
                      <SelectItem value="last30">Last 30 days</SelectItem>
                      <SelectItem value="last90">Last 90 days</SelectItem>
                      <SelectItem value="year">This year</SelectItem>
                      <SelectItem value="custom">Custom range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-300" 
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {keyMetrics.map((metric, index) => (
                <Card key={index} className="border border-gray-100 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-500">{metric.title}</p>
                        <h3 className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</h3>
                      </div>
                      <div className={`p-2 rounded-lg shadow-sm ${
                        metric.title === "Total Revenue" 
                          ? "bg-gradient-to-r from-green-500/10 to-emerald-500/10 text-green-600" 
                          : metric.title === "Export Orders"
                            ? "bg-gradient-to-r from-blue-500/10 to-indigo-500/10 text-blue-600"
                            : metric.title === "Average Order Value"
                              ? "bg-gradient-to-r from-purple-500/10 to-violet-500/10 text-purple-600"
                              : "bg-gradient-to-r from-amber-500/10 to-orange-500/10 text-amber-600"
                      }`}>
                        <metric.icon className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="flex items-center mt-4">
                      <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium ${
                        metric.positive 
                          ? "bg-green-100 text-green-800" 
                          : "bg-red-100 text-red-800"
                      }`}>
                        {metric.positive ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                        {metric.change}
                      </span>
                      <span className="text-xs text-gray-500 ml-2">vs. previous period</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <Card className="border border-gray-100 shadow-sm lg:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-lg font-semibold text-gray-800">Revenue Trend</CardTitle>
                    <CardDescription>Monthly export revenue</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                      <SelectTrigger className="h-8 text-xs border-gray-200 shadow-sm">
                        <SelectValue placeholder="Select metric" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="revenue">Revenue</SelectItem>
                        <SelectItem value="orders">Orders</SelectItem>
                        <SelectItem value="units">Units Sold</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm" className="h-8 text-xs">
                      <Download className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={salesData}>
                        <defs>
                          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#0891b2" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#0891b2" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="name" stroke="#888888" fontSize={12} />
                        <YAxis stroke="#888888" fontSize={12} />
                        <RechartsTooltip
                          contentStyle={{ background: "white", border: "1px solid #f0f0f0", borderRadius: "0.375rem" }}
                          formatter={(value: any) => [`$${value.toLocaleString()}`, "Revenue"]}
                        />
                        <Area
                          type="monotone"
                          dataKey="value"
                          stroke="#0891b2"
                          strokeWidth={2}
                          fillOpacity={1}
                          fill="url(#colorRevenue)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-100 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold text-gray-800">Market Share</CardTitle>
                  <CardDescription>Export destinations by volume</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="h-80 flex flex-col">
                    <div className="flex-1">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPieChart>
                          <Pie
                            data={marketShareData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            innerRadius={40}
                            paddingAngle={3}
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {marketShareData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <RechartsTooltip
                            formatter={(value: any) => [`${value}%`, "Market Share"]}
                            contentStyle={{ background: "white", border: "1px solid #f0f0f0", borderRadius: "0.375rem" }}
                          />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {marketShareData.slice(0, 4).map((entry, index) => (
                        <div key={index} className="flex items-center">
                          <div 
                            className="w-3 h-3 rounded-full mr-2" 
                            style={{ backgroundColor: COLORS[index % COLORS.length] }} 
                          />
                          <span className="text-xs text-gray-600">{entry.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="md:col-span-2">
                <Card className="border border-gray-100 shadow-sm">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div>
                      <CardTitle className="text-lg font-semibold text-gray-800">Top Export Markets</CardTitle>
                      <CardDescription>Performance by country</CardDescription>
                    </div>
                    <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                      <SelectTrigger className="h-8 text-xs border-gray-200 shadow-sm w-32">
                        <SelectValue placeholder="All Countries" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Countries</SelectItem>
                        <SelectItem value="eu">European Union</SelectItem>
                        <SelectItem value="asia">Asia Pacific</SelectItem>
                        <SelectItem value="na">North America</SelectItem>
                      </SelectContent>
                    </Select>
                  </CardHeader>
                  <CardContent className="pt-4 px-0">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-100">
                            <th className="text-left font-medium text-gray-500 pl-6 py-2">Country</th>
                            <th className="text-left font-medium text-gray-500 py-2">Revenue</th>
                            <th className="text-left font-medium text-gray-500 py-2">Orders</th>
                            <th className="text-left font-medium text-gray-500 py-2">Growth</th>
                            <th className="text-right font-medium text-gray-500 pr-6 py-2"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {countriesData.map((country, index) => (
                            <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                              <td className="flex items-center pl-6 py-3">
                                <Globe className="h-4 w-4 mr-2 text-gray-400" />
                                <span className="font-medium text-gray-700">{country.name}</span>
                              </td>
                              <td className="py-3 text-gray-700">${country.revenue.toLocaleString()}</td>
                              <td className="py-3 text-gray-700">{country.orders}</td>
                              <td className="py-3">
                                <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium ${
                                  country.growth > 0 
                                    ? "bg-green-100 text-green-800" 
                                    : "bg-red-100 text-red-800"
                                }`}>
                                  {country.growth > 0 ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                                  {country.growth}%
                                </span>
                              </td>
                              <td className="text-right pr-6 py-3">
                                <Button variant="ghost" size="sm" className="h-7 px-2 text-gray-500">
                                  Details
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="border border-gray-100 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold text-gray-800">Shipment Statistics</CardTitle>
                  <CardDescription>Export logistics overview</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="h-56">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={shipmentStatusData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={70}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, value }) => `${value}`}
                        >
                          {shipmentStatusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <RechartsTooltip 
                          formatter={(value: any, name: string) => [`${value} shipments`, name]}
                          contentStyle={{ background: "white", border: "1px solid #f0f0f0", borderRadius: "0.375rem" }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-1 gap-2 mt-2">
                    {shipmentStatusData.map((status, index) => (
                      <div key={index} className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50">
                        <div className="flex items-center">
                          <div 
                            className="w-3 h-3 rounded-full mr-2" 
                            style={{ backgroundColor: COLORS[index % COLORS.length] }} 
                          />
                          <span className="text-sm text-gray-700">{status.name}</span>
                        </div>
                        <Badge variant="outline" className="text-gray-700">
                          {status.value} shipments
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <Card className="border border-gray-100 shadow-sm lg:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold text-gray-800">Product Performance</CardTitle>
                  <CardDescription>Top performing products by revenue</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart 
                        data={productPerformanceData}
                        layout="vertical"
                        barSize={20}
                        barGap={8}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                        <XAxis type="number" />
                        <YAxis 
                          dataKey="name" 
                          type="category" 
                          scale="band" 
                          tick={{ fontSize: 12 }}
                          width={150}
                        />
                        <RechartsTooltip
                          formatter={(value: any, name: string) => [
                            name === "revenue" ? `$${value.toLocaleString()}` : value,
                            name === "revenue" ? "Revenue" : "Units Sold"
                          ]}
                          contentStyle={{ background: "white", border: "1px solid #f0f0f0", borderRadius: "0.375rem" }}
                        />
                        <Legend />
                        <Bar 
                          dataKey="revenue" 
                          name="Revenue" 
                          fill="#0891b2" 
                          radius={[0, 4, 4, 0]}
                        />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card className="border border-gray-100 shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold text-gray-800">Operational Metrics</CardTitle>
                    <CardDescription>Key performance indicators</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-4 mt-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-500">Order Fulfillment Rate</span>
                          <span className="text-sm font-semibold text-gray-700">95%</span>
                        </div>
                        <Progress value={95} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-500">On-time Delivery</span>
                          <span className="text-sm font-semibold text-gray-700">92%</span>
                        </div>
                        <Progress value={92} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-500">Document Accuracy</span>
                          <span className="text-sm font-semibold text-gray-700">98%</span>
                        </div>
                        <Progress value={98} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-500">Customer Satisfaction</span>
                          <span className="text-sm font-semibold text-gray-700">89%</span>
                        </div>
                        <Progress value={89} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-gray-100 shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold text-gray-800">Export Activity</CardTitle>
                    <CardDescription>Recent activity summary</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-4 mt-4">
                      <div className="flex items-center p-2 rounded-lg bg-blue-50 border border-blue-100">
                        <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                          <PackageCheck className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">7 new orders processed</p>
                          <p className="text-xs text-gray-500 mt-0.5">Today</p>
                        </div>
                      </div>

                      <div className="flex items-center p-2 rounded-lg bg-green-50 border border-green-100">
                        <div className="h-9 w-9 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
                          <Truck className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">3 shipments arrived at destination</p>
                          <p className="text-xs text-gray-500 mt-0.5">Yesterday</p>
                        </div>
                      </div>

                      <div className="flex items-center p-2 rounded-lg bg-amber-50 border border-amber-100">
                        <div className="h-9 w-9 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 mr-3">
                          <FileText className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">12 documents approved</p>
                          <p className="text-xs text-gray-500 mt-0.5">This week</p>
                        </div>
                      </div>

                      <div className="flex items-center p-2 rounded-lg bg-purple-50 border border-purple-100">
                        <div className="h-9 w-9 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-3">
                          <Users className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">5 new buyer inquiries</p>
                          <p className="text-xs text-gray-500 mt-0.5">This week</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Card className="border border-gray-100 shadow-sm mb-6">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-lg font-semibold text-gray-800">Market Trend Analysis</CardTitle>
                    <CardDescription>Global export market trends for your products</CardDescription>
                  </div>
                  <Button variant="outline" className="h-8 text-xs">
                    <FileText className="h-3.5 w-3.5 mr-1.5" />
                    View Full Report
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={marketTrendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <RechartsTooltip 
                        contentStyle={{ background: "white", border: "1px solid #f0f0f0", borderRadius: "0.375rem" }}
                      />
                      <Legend />
                      <Line 
                        yAxisId="left"
                        type="monotone" 
                        dataKey="volume" 
                        name="Export Volume" 
                        stroke="#0891b2" 
                        strokeWidth={2}
                        activeDot={{ r: 8 }}
                      />
                      <Line 
                        yAxisId="right"
                        type="monotone" 
                        dataKey="price" 
                        name="Price Index" 
                        stroke="#6366f1" 
                        strokeWidth={2}
                      />
                      <Line 
                        yAxisId="right"
                        type="monotone" 
                        dataKey="marketSize" 
                        name="Market Size" 
                        stroke="#0d9488" 
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-lg">
                  <h4 className="text-sm font-semibold text-gray-800 mb-1 flex items-center">
                    <TrendingUp className="h-4 w-4 mr-1.5 text-blue-600" />
                    AI-Powered Market Insights
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Based on current market trends and your product portfolio, our AI analysis suggests:
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start">
                      <ChevronRight className="h-4 w-4 text-blue-500 mt-0.5 mr-1.5 flex-shrink-0" />
                      <span>European demand for sustainable furniture is projected to grow by 18% in the next quarter.</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-4 w-4 text-blue-500 mt-0.5 mr-1.5 flex-shrink-0" />
                      <span>Expanding to the Australian market could increase your revenue by up to 25% based on similar exporters' performance.</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-4 w-4 text-blue-500 mt-0.5 mr-1.5 flex-shrink-0" />
                      <span>Consider allocating more resources to Rattan Chair Sets production as they show the highest profit margin and growth potential.</span>
                    </li>
                  </ul>
                  <Button className="mt-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-700">
                    <Globe className="h-4 w-4 mr-2" />
                    Get Detailed Market Analysis
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center mb-4">
              <Button variant="outline" className="text-gray-600 border-gray-200">
                <Download className="h-4 w-4 mr-2" />
                Download Full Analytics Report
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}