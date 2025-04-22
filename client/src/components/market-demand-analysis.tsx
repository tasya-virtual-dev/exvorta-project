import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { HelpCircleIcon, RefreshCwIcon, ImageIcon } from "lucide-react";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts";
import { useQuery } from "@tanstack/react-query";

export interface DemandIndicator {
  name: string;
  description: string;
  value: string;
  status: "positive" | "warning" | "negative";
}

export interface RecommendedProduct {
  id: number;
  name: string;
  description: string;
  matchScore: number;
}

interface MarketDemandAnalysisProps {
  initialProductCategory?: string;
  initialTargetMarket?: string;
}

export function MarketDemandAnalysis({
  initialProductCategory = "Handcrafted Furniture",
  initialTargetMarket = "Japan",
}: MarketDemandAnalysisProps) {
  const [productCategory, setProductCategory] = useState(initialProductCategory);
  const [targetMarket, setTargetMarket] = useState(initialTargetMarket);
  const [timePeriod, setTimePeriod] = useState("Last 12 Months");

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["/api/market-analysis", productCategory, targetMarket, timePeriod],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const handleUpdateAnalysis = () => {
    refetch();
  };

  // Mock data for the chart
  const marketInterestData = [
    { country: "Japan", value: 85 },
    { country: "United States", value: 65 },
    { country: "Singapore", value: 45 },
    { country: "Australia", value: 30 },
    { country: "South Korea", value: 25 },
  ];

  const demandIndicators: DemandIndicator[] = [
    {
      name: "Import Volume Growth",
      description: "Growth in furniture imports to Japan",
      value: "+12.5%",
      status: "positive",
    },
    {
      name: "Market Premium",
      description: "Premium over domestic market prices",
      value: "+25.8%",
      status: "positive",
    },
    {
      name: "Competitor Presence",
      description: "Export competition level from similar markets",
      value: "Medium",
      status: "warning",
    },
    {
      name: "Local Demand Trend",
      description: "Recent demand pattern in target market",
      value: "Increasing",
      status: "positive",
    },
  ];

  const recommendedProducts: RecommendedProduct[] = [
    {
      id: 1,
      name: "Teak Dining Set",
      description: "High demand in Japanese market",
      matchScore: 95,
    },
    {
      id: 2,
      name: "Rattan Accent Chairs",
      description: "Growing trend in Asian markets",
      matchScore: 87,
    },
    {
      id: 3,
      name: "Bamboo Shelving Units",
      description: "Eco-friendly appeal to Japanese buyers",
      matchScore: 76,
    },
  ];

  const getStatusColorClass = (status: DemandIndicator["status"]) => {
    switch (status) {
      case "positive":
        return "bg-green-50 text-green-600";
      case "warning":
        return "bg-amber-50 text-amber-600";
      case "negative":
        return "bg-red-50 text-red-600";
    }
  };

  const getMatchScoreColorClass = (score: number) => {
    if (score >= 90) return "bg-green-50 text-green-600";
    if (score >= 80) return "bg-green-50 text-green-600";
    if (score >= 70) return "bg-amber-50 text-amber-600";
    return "bg-red-50 text-red-600";
  };

  return (
    <div className="lg:col-span-2">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold font-poppins text-neutral-900">Market Demand Analysis</h2>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-neutral-500 hover:text-neutral-700"
              >
                <HelpCircleIcon className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">Analysis of market demand for your products in target countries</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <Card className="border border-neutral-100">
        <CardContent className="p-5">
          <div className="mb-4 flex flex-wrap items-center">
            <div className="mr-4 mb-2">
              <Label className="text-sm text-neutral-500 block mb-1">Product Category</Label>
              <Select value={productCategory} onValueChange={setProductCategory}>
                <SelectTrigger className="bg-neutral-50 border border-neutral-200 rounded-md py-2 px-3 w-48 text-sm">
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
            <div className="mr-4 mb-2">
              <Label className="text-sm text-neutral-500 block mb-1">Target Market</Label>
              <Select value={targetMarket} onValueChange={setTargetMarket}>
                <SelectTrigger className="bg-neutral-50 border border-neutral-200 rounded-md py-2 px-3 w-48 text-sm">
                  <SelectValue placeholder="Select target market" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Japan">Japan</SelectItem>
                  <SelectItem value="United States">United States</SelectItem>
                  <SelectItem value="Singapore">Singapore</SelectItem>
                  <SelectItem value="Australia">Australia</SelectItem>
                  <SelectItem value="All Markets">All Markets</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mb-2">
              <Label className="text-sm text-neutral-500 block mb-1">Time Period</Label>
              <Select value={timePeriod} onValueChange={setTimePeriod}>
                <SelectTrigger className="bg-neutral-50 border border-neutral-200 rounded-md py-2 px-3 w-48 text-sm">
                  <SelectValue placeholder="Select time period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Last 12 Months">Last 12 Months</SelectItem>
                  <SelectItem value="Last 6 Months">Last 6 Months</SelectItem>
                  <SelectItem value="Last 3 Months">Last 3 Months</SelectItem>
                  <SelectItem value="YTD">YTD</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="ml-auto mb-2">
              <Button
                className="mt-5"
                onClick={handleUpdateAnalysis}
                disabled={isLoading}
              >
                <RefreshCwIcon className="h-4 w-4 mr-1" />
                Update Analysis
              </Button>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-base font-medium text-neutral-800 mb-3">Market Interest by Country</h3>
              <div className="h-64 mb-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={marketInterestData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="country" type="category" />
                    <RechartsTooltip 
                      formatter={(value: number) => [`${value}% Interest`, 'Market Interest']}
                      labelFormatter={(label) => `Country: ${label}`}
                    />
                    <Bar dataKey="value" fill="#1E88E5" barSize={20} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="text-xs text-neutral-500">Based on search volume, import data, and trade inquiries</div>
            </div>

            <div>
              <h3 className="text-base font-medium text-neutral-800 mb-3">Product Demand Indicators</h3>
              <div className="space-y-3">
                {demandIndicators.map((indicator, index) => (
                  <div key={index} className="bg-neutral-50 p-3 rounded-md">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-neutral-700">{indicator.name}</p>
                        <p className="text-xs text-neutral-500 mt-1">{indicator.description}</p>
                      </div>
                      <div className="flex items-center">
                        <div className={`px-2 py-1 ${getStatusColorClass(indicator.status)} rounded text-xs font-medium`}>
                          {indicator.value}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <div>
            <h3 className="text-base font-medium text-neutral-800 mb-3">Recommended Products for this Market</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {recommendedProducts.map((product) => (
                <div key={product.id} className="border border-neutral-100 rounded-md overflow-hidden">
                  <div className="h-28 bg-neutral-100 flex items-center justify-center">
                    <ImageIcon className="text-neutral-300 h-8 w-8" />
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-medium text-neutral-800">{product.name}</p>
                    <p className="text-xs text-neutral-500 mt-1">{product.description}</p>
                    <div className="flex justify-between items-center mt-2">
                      <div className={`px-2 py-1 ${getMatchScoreColorClass(product.matchScore)} rounded-full text-xs`}>
                        {product.matchScore}% Match
                      </div>
                      <Button variant="link" className="text-primary hover:text-primary/90 text-xs font-medium p-0 h-auto">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
