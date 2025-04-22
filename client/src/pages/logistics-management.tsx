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
  Ship,
  Truck,
  Plane,
  Clock,
  Calendar,
  BarChart,
  AlertCircle,
  CheckCircle,
  MapPin,
  FileText,
  PlusIcon,
  Package,
  ExternalLink,
  Filter,
  ArrowRight,
  ChevronRight,
  ClipboardCheck,
  ChevronDown
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Shipment {
  id: string;
  trackingNumber: string;
  status: "in_transit" | "delivered" | "delayed" | "preparing" | "customs";
  carrier: string;
  origin: string;
  destination: string;
  departureDate: string;
  estimatedArrival: string;
  buyer: string;
  products: string[];
  transportMode: "sea" | "air" | "road";
  containerType?: string;
  weight: string;
  value: string;
  documents: {
    name: string;
    status: "approved" | "pending" | "rejected" | "not_started";
  }[];
  timeline: {
    event: string;
    date: string;
    location?: string;
    status: "completed" | "in_progress" | "upcoming";
  }[];
  costs: {
    shipping: number;
    insurance: number;
    customs: number;
    handling: number;
    other: number;
  };
}

export default function LogisticsManagement() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedTransportMode, setSelectedTransportMode] = useState("all");
  const [selectedShipmentId, setSelectedShipmentId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const { user } = useAuth();
  
  // Convert user data to format expected by child components
  const userData = {
    username: user?.username || "",
    name: user?.companyName || "",
    companyName: user?.companyName || "",
    email: user?.email || "",
    exportReadiness: user?.exportReadiness || 0,
  };

  // Sample shipment data
  const mockShipments: Shipment[] = [
    {
      id: "SHP-00123",
      trackingNumber: "MSK-9385617402",
      status: "in_transit",
      carrier: "Maersk Line",
      origin: "Jakarta, Indonesia",
      destination: "Hamburg, Germany",
      departureDate: "2024-03-15",
      estimatedArrival: "2024-04-10",
      buyer: "European Imports GmbH",
      products: ["Teak Dining Table (10 units)", "Rattan Chair Set (25 units)"],
      transportMode: "sea",
      containerType: "20ft Standard",
      weight: "1,250 kg",
      value: "$15,750",
      documents: [
        { name: "Commercial Invoice", status: "approved" },
        { name: "Packing List", status: "approved" },
        { name: "Bill of Lading", status: "approved" },
        { name: "Certificate of Origin", status: "approved" },
        { name: "Insurance Certificate", status: "approved" },
      ],
      timeline: [
        { event: "Order Placed", date: "2024-02-20", status: "completed" },
        { event: "Production Completed", date: "2024-03-05", status: "completed" },
        { event: "Packaging & Documentation", date: "2024-03-10", status: "completed" },
        { event: "Customs Clearance (Export)", date: "2024-03-12", location: "Tanjung Priok Port", status: "completed" },
        { event: "Departed Origin Port", date: "2024-03-15", location: "Tanjung Priok Port", status: "completed" },
        { event: "Transit Stop", date: "2024-03-25", location: "Singapore", status: "completed" },
        { event: "In Transit", date: "2024-03-26 - Current", status: "in_progress" },
        { event: "Arrival at Destination Port", date: "2024-04-08", location: "Hamburg Port", status: "upcoming" },
        { event: "Customs Clearance (Import)", date: "2024-04-09", status: "upcoming" },
        { event: "Delivery to Buyer", date: "2024-04-10", status: "upcoming" },
      ],
      costs: {
        shipping: 2800,
        insurance: 450,
        customs: 350,
        handling: 250,
        other: 120,
      },
    },
    {
      id: "SHP-00124",
      trackingNumber: "CMA-7465928103",
      status: "preparing",
      carrier: "CMA CGM",
      origin: "Jakarta, Indonesia",
      destination: "Rotterdam, Netherlands",
      departureDate: "2024-04-05",
      estimatedArrival: "2024-05-01",
      buyer: "Scandi Living Co.",
      products: ["Bamboo Coffee Table (30 units)", "Ceramic Vase Set (50 units)"],
      transportMode: "sea",
      containerType: "40ft High Cube",
      weight: "2,100 kg",
      value: "$22,500",
      documents: [
        { name: "Commercial Invoice", status: "approved" },
        { name: "Packing List", status: "approved" },
        { name: "Bill of Lading", status: "pending" },
        { name: "Certificate of Origin", status: "pending" },
        { name: "Insurance Certificate", status: "not_started" },
      ],
      timeline: [
        { event: "Order Placed", date: "2024-03-01", status: "completed" },
        { event: "Production Completed", date: "2024-03-25", status: "completed" },
        { event: "Packaging & Documentation", date: "2024-03-30 - Current", status: "in_progress" },
        { event: "Customs Clearance (Export)", date: "2024-04-03", location: "Tanjung Priok Port", status: "upcoming" },
        { event: "Departed Origin Port", date: "2024-04-05", location: "Tanjung Priok Port", status: "upcoming" },
        { event: "Transit Stop", date: "2024-04-15", location: "Singapore", status: "upcoming" },
        { event: "In Transit", date: "2024-04-16 - 2024-04-29", status: "upcoming" },
        { event: "Arrival at Destination Port", date: "2024-04-30", location: "Rotterdam Port", status: "upcoming" },
        { event: "Customs Clearance (Import)", date: "2024-05-01", status: "upcoming" },
        { event: "Delivery to Buyer", date: "2024-05-02", status: "upcoming" },
      ],
      costs: {
        shipping: 3600,
        insurance: 650,
        customs: 420,
        handling: 300,
        other: 150,
      },
    },
    {
      id: "SHP-00125",
      trackingNumber: "FDX-8276519304",
      status: "delivered",
      carrier: "FedEx",
      origin: "Jakarta, Indonesia",
      destination: "Tokyo, Japan",
      departureDate: "2024-03-01",
      estimatedArrival: "2024-03-05",
      buyer: "Nippon Decor",
      products: ["Hand-carved Wooden Bowl (50 units)", "Batik Table Runner (100 units)"],
      transportMode: "air",
      weight: "180 kg",
      value: "$8,200",
      documents: [
        { name: "Commercial Invoice", status: "approved" },
        { name: "Packing List", status: "approved" },
        { name: "Airway Bill", status: "approved" },
        { name: "Certificate of Origin", status: "approved" },
        { name: "Customs Declaration Form", status: "approved" },
      ],
      timeline: [
        { event: "Order Placed", date: "2024-02-10", status: "completed" },
        { event: "Production Completed", date: "2024-02-25", status: "completed" },
        { event: "Packaging & Documentation", date: "2024-02-28", status: "completed" },
        { event: "Customs Clearance (Export)", date: "2024-03-01", location: "Soekarno-Hatta Airport", status: "completed" },
        { event: "Departed Origin", date: "2024-03-01", location: "Soekarno-Hatta Airport", status: "completed" },
        { event: "Arrival at Destination", date: "2024-03-02", location: "Narita Airport", status: "completed" },
        { event: "Customs Clearance (Import)", date: "2024-03-03", status: "completed" },
        { event: "Delivery to Buyer", date: "2024-03-05", status: "completed" },
      ],
      costs: {
        shipping: 1800,
        insurance: 250,
        customs: 180,
        handling: 150,
        other: 80,
      },
    },
    {
      id: "SHP-00126",
      trackingNumber: "HLC-5678931402",
      status: "customs",
      carrier: "Hapag-Lloyd",
      origin: "Jakarta, Indonesia",
      destination: "Sydney, Australia",
      departureDate: "2024-03-10",
      estimatedArrival: "2024-04-02",
      buyer: "Pacific Home",
      products: ["Teak Dining Table (5 units)", "Rattan Chair Set (15 units)"],
      transportMode: "sea",
      containerType: "20ft Standard",
      weight: "850 kg",
      value: "$9,500",
      documents: [
        { name: "Commercial Invoice", status: "approved" },
        { name: "Packing List", status: "approved" },
        { name: "Bill of Lading", status: "approved" },
        { name: "Certificate of Origin", status: "approved" },
        { name: "Phytosanitary Certificate", status: "approved" },
      ],
      timeline: [
        { event: "Order Placed", date: "2024-02-05", status: "completed" },
        { event: "Production Completed", date: "2024-02-28", status: "completed" },
        { event: "Packaging & Documentation", date: "2024-03-05", status: "completed" },
        { event: "Customs Clearance (Export)", date: "2024-03-08", location: "Tanjung Priok Port", status: "completed" },
        { event: "Departed Origin Port", date: "2024-03-10", location: "Tanjung Priok Port", status: "completed" },
        { event: "In Transit", date: "2024-03-11 - 2024-03-30", status: "completed" },
        { event: "Arrival at Destination Port", date: "2024-03-31", location: "Sydney Port", status: "completed" },
        { event: "Customs Clearance (Import)", date: "2024-04-01 - Current", status: "in_progress" },
        { event: "Delivery to Buyer", date: "2024-04-05", status: "upcoming" },
      ],
      costs: {
        shipping: 2200,
        insurance: 320,
        customs: 280,
        handling: 180,
        other: 90,
      },
    },
    {
      id: "SHP-00127",
      trackingNumber: "DHL-3459871602",
      status: "delayed",
      carrier: "DHL",
      origin: "Jakarta, Indonesia",
      destination: "Dubai, UAE",
      departureDate: "2024-03-20",
      estimatedArrival: "2024-03-28",
      buyer: "Dubai Luxury Interiors",
      products: ["Hand-carved Wooden Bowl (25 units)", "Ceramic Vase Set (30 units)"],
      transportMode: "air",
      weight: "210 kg",
      value: "$11,800",
      documents: [
        { name: "Commercial Invoice", status: "approved" },
        { name: "Packing List", status: "approved" },
        { name: "Airway Bill", status: "approved" },
        { name: "Certificate of Origin", status: "approved" },
        { name: "Insurance Certificate", status: "approved" },
      ],
      timeline: [
        { event: "Order Placed", date: "2024-03-01", status: "completed" },
        { event: "Production Completed", date: "2024-03-15", status: "completed" },
        { event: "Packaging & Documentation", date: "2024-03-18", status: "completed" },
        { event: "Customs Clearance (Export)", date: "2024-03-20", location: "Soekarno-Hatta Airport", status: "completed" },
        { event: "Departed Origin", date: "2024-03-20", location: "Soekarno-Hatta Airport", status: "completed" },
        { event: "Unexpected Delay", date: "2024-03-21", location: "Singapore", status: "in_progress" },
        { event: "Arrival at Destination", date: "2024-03-28", location: "Dubai Airport", status: "upcoming" },
        { event: "Customs Clearance (Import)", date: "2024-03-29", status: "upcoming" },
        { event: "Delivery to Buyer", date: "2024-03-30", status: "upcoming" },
      ],
      costs: {
        shipping: 2100,
        insurance: 380,
        customs: 220,
        handling: 170,
        other: 110,
      },
    },
  ];

  // Filter shipments based on search, status, and transport mode
  const filteredShipments = mockShipments.filter(shipment => {
    // Filter by search query
    if (searchQuery && 
        !shipment.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !shipment.id.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !shipment.buyer.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by status
    if (selectedStatus !== "all" && shipment.status !== selectedStatus) {
      return false;
    }
    
    // Filter by transport mode
    if (selectedTransportMode !== "all" && shipment.transportMode !== selectedTransportMode) {
      return false;
    }
    
    return true;
  });

  // Get the selected shipment or first shipment if none selected
  const selectedShipment = selectedShipmentId 
    ? mockShipments.find(s => s.id === selectedShipmentId) 
    : (filteredShipments.length > 0 ? filteredShipments[0] : null);

  // Handle shipment selection
  const handleShipmentSelect = (shipmentId: string) => {
    setSelectedShipmentId(shipmentId);
  };

  // Calculate total cost for a shipment
  const calculateTotalCost = (costs: Shipment["costs"]) => {
    return costs.shipping + costs.insurance + costs.customs + costs.handling + costs.other;
  };

  // Get status color based on shipment status
  const getStatusColor = (status: Shipment["status"]) => {
    switch (status) {
      case "in_transit":
        return "bg-gradient-to-r from-blue-500 to-indigo-600 text-white";
      case "delivered":
        return "bg-gradient-to-r from-green-500 to-emerald-600 text-white";
      case "delayed":
        return "bg-gradient-to-r from-red-500 to-rose-600 text-white";
      case "preparing":
        return "bg-gradient-to-r from-amber-500 to-orange-600 text-white";
      case "customs":
        return "bg-gradient-to-r from-purple-500 to-violet-600 text-white";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Get status text based on shipment status
  const getStatusText = (status: Shipment["status"]) => {
    switch (status) {
      case "in_transit":
        return "In Transit";
      case "delivered":
        return "Delivered";
      case "delayed":
        return "Delayed";
      case "preparing":
        return "Preparing";
      case "customs":
        return "In Customs";
      default:
        return "Unknown";
    }
  };

  // Get icon based on transport mode
  const getTransportIcon = (mode: Shipment["transportMode"]) => {
    switch (mode) {
      case "sea":
        return <Ship className="h-4 w-4" />;
      case "air":
        return <Plane className="h-4 w-4" />;
      case "road":
        return <Truck className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  // Get document status color
  const getDocumentStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700 border-green-200";
      case "pending":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "rejected":
        return "bg-red-100 text-red-700 border-red-200";
      case "not_started":
        return "bg-gray-100 text-gray-700 border-gray-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

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
                  <Ship className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Logistics Management</h1>
                  <p className="text-gray-600 mt-1">Track and manage your international shipments</p>
                </div>
              </div>
              <Button 
                className="mt-4 sm:mt-0 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-300" 
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                New Shipment
              </Button>
            </div>

            <Card className="mb-8 border border-gray-100 shadow-sm rounded-xl overflow-hidden">
              <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 to-indigo-600"></div>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Filter className="h-5 w-5 mr-2 text-blue-500" />
                  Shipment Filters
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
                    <label className="text-sm font-medium text-gray-700 block mb-2">Search Shipments</label>
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="Search by ID, tracking #, or buyer..."
                        className="pl-9 border-gray-200 focus:border-blue-300 shadow-sm bg-white"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
                    <label className="text-sm font-medium text-gray-700 block mb-2">Shipment Status</label>
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger className="bg-white border-gray-200 focus:border-blue-300 shadow-sm">
                        <SelectValue placeholder="All Statuses" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="in_transit">In Transit</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                        <SelectItem value="delayed">Delayed</SelectItem>
                        <SelectItem value="preparing">Preparing</SelectItem>
                        <SelectItem value="customs">In Customs</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
                    <label className="text-sm font-medium text-gray-700 block mb-2">Transport Mode</label>
                    <Select value={selectedTransportMode} onValueChange={setSelectedTransportMode}>
                      <SelectTrigger className="bg-white border-gray-200 focus:border-blue-300 shadow-sm">
                        <SelectValue placeholder="All Transport Modes" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Transport Modes</SelectItem>
                        <SelectItem value="sea">Sea Freight</SelectItem>
                        <SelectItem value="air">Air Freight</SelectItem>
                        <SelectItem value="road">Road Freight</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Shipment List */}
              <div className="lg:col-span-1">
                <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden">
                  <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 py-4 px-5 border-b border-blue-100 flex justify-between items-center">
                    <CardTitle className="text-lg font-semibold text-gray-800">
                      Your Shipments ({filteredShipments.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 max-h-[calc(100vh-35rem)] overflow-y-auto">
                    {filteredShipments.length === 0 ? (
                      <div className="p-6 text-center">
                        <div className="rounded-full bg-blue-100 p-3 mx-auto mb-4 w-fit">
                          <Package className="h-6 w-6 text-blue-500" />
                        </div>
                        <h3 className="text-base font-medium text-gray-800 mb-1">No shipments found</h3>
                        <p className="text-sm text-gray-600">Try adjusting your filters</p>
                      </div>
                    ) : (
                      <div className="divide-y divide-gray-100">
                        {filteredShipments.map((shipment) => (
                          <div 
                            key={shipment.id} 
                            className={`p-4 cursor-pointer hover:bg-blue-50 transition-colors ${
                              selectedShipmentId === shipment.id ? "bg-blue-50 border-l-4 border-blue-500" : ""
                            }`}
                            onClick={() => handleShipmentSelect(shipment.id)}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="flex items-center">
                                  <h4 className="font-medium text-gray-900">
                                    {shipment.id}
                                  </h4>
                                  <Badge className={`ml-2 ${getStatusColor(shipment.status)}`}>
                                    {getStatusText(shipment.status)}
                                  </Badge>
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                  {shipment.trackingNumber}
                                </div>
                                <div className="flex items-center text-sm text-gray-700 mt-1">
                                  <MapPin className="h-3.5 w-3.5 mr-1 text-gray-400" />
                                  <span className="text-xs">{shipment.origin} <ArrowRight className="h-3 w-3 inline mx-1" /> {shipment.destination}</span>
                                </div>
                                <div className="flex items-center text-xs text-gray-600 mt-1.5">
                                  <div className="flex items-center mr-3">
                                    {getTransportIcon(shipment.transportMode)}
                                    <span className="ml-1 capitalize">{shipment.transportMode}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <Calendar className="h-3.5 w-3.5 mr-1" />
                                    <span>ETA: {new Date(shipment.estimatedArrival).toLocaleDateString()}</span>
                                  </div>
                                </div>
                              </div>
                              <ChevronRight className="h-5 w-5 text-gray-400" />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Shipment Detail */}
              <div className="lg:col-span-2">
                {selectedShipment ? (
                  <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden">
                    <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100 py-5">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center">
                            <CardTitle className="text-xl font-bold text-gray-900">
                              Shipment {selectedShipment.id}
                            </CardTitle>
                            <Badge className={`ml-2 ${getStatusColor(selectedShipment.status)}`}>
                              {getStatusText(selectedShipment.status)}
                            </Badge>
                          </div>
                          <CardDescription className="mt-1 flex items-center text-gray-600">
                            <Clock className="h-4 w-4 mr-1" />
                            ETA: {new Date(selectedShipment.estimatedArrival).toLocaleDateString()}
                          </CardDescription>
                        </div>
                        <div className="flex">
                          <Button variant="outline" size="sm" className="mr-2 text-xs">
                            <FileText className="h-3.5 w-3.5 mr-1" />
                            Export Details
                          </Button>
                          <Button size="sm" className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs">
                            <ExternalLink className="h-3.5 w-3.5 mr-1" />
                            Track Shipment
                          </Button>
                        </div>
                      </div>
                      
                      {/* Progress bar for shipment */}
                      <div className="mt-5">
                        <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                          <span>Origin: {selectedShipment.origin}</span>
                          <span>Destination: {selectedShipment.destination}</span>
                        </div>
                        <Progress 
                          value={
                            selectedShipment.status === "delivered" ? 100 :
                            selectedShipment.status === "customs" ? 80 :
                            selectedShipment.status === "in_transit" ? 50 :
                            selectedShipment.status === "delayed" ? 40 :
                            selectedShipment.status === "preparing" ? 20 : 0
                          } 
                          className="h-2 bg-gray-100" 
                          indicatorClassName={
                            selectedShipment.status === "delivered" ? "bg-gradient-to-r from-green-500 to-emerald-600" :
                            selectedShipment.status === "delayed" ? "bg-gradient-to-r from-red-500 to-rose-600" :
                            "bg-gradient-to-r from-blue-500 to-indigo-600"
                          }
                        />
                      </div>
                    </CardHeader>
                    
                    <div className="border-b border-gray-100">
                      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="w-full justify-start bg-white px-4 pt-2 border-b border-gray-100">
                          <TabsTrigger 
                            value="overview" 
                            className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 rounded-none px-4"
                          >
                            Overview
                          </TabsTrigger>
                          <TabsTrigger 
                            value="timeline" 
                            className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 rounded-none px-4"
                          >
                            Timeline
                          </TabsTrigger>
                          <TabsTrigger 
                            value="documents" 
                            className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 rounded-none px-4"
                          >
                            Documents
                          </TabsTrigger>
                          <TabsTrigger 
                            value="costs" 
                            className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 rounded-none px-4"
                          >
                            Costs
                          </TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </div>
                    
                    <CardContent className="p-0">
                      {activeTab === "overview" && (
                        <div className="p-6">
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div>
                              <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                </svg>
                                Shipment Details
                              </h3>
                              
                              <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm mb-4">
                                <Table>
                                  <TableBody>
                                    <TableRow>
                                      <TableCell className="font-medium text-gray-500 py-2 pl-0">
                                        Tracking Number
                                      </TableCell>
                                      <TableCell className="text-gray-900 py-2 pr-0">
                                        {selectedShipment.trackingNumber}
                                      </TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell className="font-medium text-gray-500 py-2 pl-0">
                                        Carrier
                                      </TableCell>
                                      <TableCell className="text-gray-900 py-2 pr-0">
                                        {selectedShipment.carrier}
                                      </TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell className="font-medium text-gray-500 py-2 pl-0">
                                        Transport Mode
                                      </TableCell>
                                      <TableCell className="text-gray-900 py-2 pr-0">
                                        <div className="flex items-center">
                                          {getTransportIcon(selectedShipment.transportMode)}
                                          <span className="ml-1 capitalize">{selectedShipment.transportMode} Freight</span>
                                        </div>
                                      </TableCell>
                                    </TableRow>
                                    {selectedShipment.containerType && (
                                      <TableRow>
                                        <TableCell className="font-medium text-gray-500 py-2 pl-0">
                                          Container Type
                                        </TableCell>
                                        <TableCell className="text-gray-900 py-2 pr-0">
                                          {selectedShipment.containerType}
                                        </TableCell>
                                      </TableRow>
                                    )}
                                    <TableRow>
                                      <TableCell className="font-medium text-gray-500 py-2 pl-0">
                                        Weight
                                      </TableCell>
                                      <TableCell className="text-gray-900 py-2 pr-0">
                                        {selectedShipment.weight}
                                      </TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell className="font-medium text-gray-500 py-2 pl-0">
                                        Declared Value
                                      </TableCell>
                                      <TableCell className="text-gray-900 py-2 pr-0">
                                        {selectedShipment.value}
                                      </TableCell>
                                    </TableRow>
                                  </TableBody>
                                </Table>
                              </div>
                              
                              <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                Products
                              </h3>
                              
                              <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                                <div className="space-y-2">
                                  {selectedShipment.products.map((product, index) => (
                                    <div key={index} className="flex items-center justify-between p-2 rounded-md hover:bg-blue-50">
                                      <div className="flex items-center">
                                        <Package className="h-4 w-4 text-blue-500 mr-2" />
                                        <span className="text-gray-800">{product}</span>
                                      </div>
                                      <ChevronRight className="h-4 w-4 text-gray-400" />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Route Information
                              </h3>
                              
                              <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm mb-4">
                                <Table>
                                  <TableBody>
                                    <TableRow>
                                      <TableCell className="font-medium text-gray-500 py-2 pl-0">
                                        Origin
                                      </TableCell>
                                      <TableCell className="text-gray-900 py-2 pr-0">
                                        {selectedShipment.origin}
                                      </TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell className="font-medium text-gray-500 py-2 pl-0">
                                        Destination
                                      </TableCell>
                                      <TableCell className="text-gray-900 py-2 pr-0">
                                        {selectedShipment.destination}
                                      </TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell className="font-medium text-gray-500 py-2 pl-0">
                                        Departure Date
                                      </TableCell>
                                      <TableCell className="text-gray-900 py-2 pr-0">
                                        {new Date(selectedShipment.departureDate).toLocaleDateString()}
                                      </TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell className="font-medium text-gray-500 py-2 pl-0">
                                        Estimated Arrival
                                      </TableCell>
                                      <TableCell className="text-gray-900 py-2 pr-0">
                                        {new Date(selectedShipment.estimatedArrival).toLocaleDateString()}
                                      </TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell className="font-medium text-gray-500 py-2 pl-0">
                                        Transit Time
                                      </TableCell>
                                      <TableCell className="text-gray-900 py-2 pr-0">
                                        {Math.ceil((new Date(selectedShipment.estimatedArrival).getTime() - new Date(selectedShipment.departureDate).getTime()) / (1000 * 60 * 60 * 24))} days
                                      </TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell className="font-medium text-gray-500 py-2 pl-0">
                                        Buyer
                                      </TableCell>
                                      <TableCell className="text-gray-900 py-2 pr-0">
                                        {selectedShipment.buyer}
                                      </TableCell>
                                    </TableRow>
                                  </TableBody>
                                </Table>
                              </div>
                              
                              <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                Required Actions
                              </h3>
                              
                              <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                                {selectedShipment.status === "preparing" ? (
                                  <div className="space-y-3">
                                    <div className="flex items-center justify-between p-2 rounded-md bg-amber-50 border border-amber-100">
                                      <div className="flex items-center">
                                        <ClipboardCheck className="h-4 w-4 text-amber-500 mr-2" />
                                        <span className="text-gray-800">Complete documentation</span>
                                      </div>
                                      <Button size="sm" className="bg-gradient-to-r from-amber-500 to-orange-600 text-white h-8">
                                        Review
                                      </Button>
                                    </div>
                                    <div className="flex items-center justify-between p-2 rounded-md bg-blue-50 border border-blue-100">
                                      <div className="flex items-center">
                                        <FileText className="h-4 w-4 text-blue-500 mr-2" />
                                        <span className="text-gray-800">Schedule pickup with carrier</span>
                                      </div>
                                      <Button size="sm" variant="outline" className="border-blue-200 text-blue-600 h-8">
                                        Schedule
                                      </Button>
                                    </div>
                                  </div>
                                ) : selectedShipment.status === "customs" ? (
                                  <div className="space-y-3">
                                    <div className="flex items-center justify-between p-2 rounded-md bg-purple-50 border border-purple-100">
                                      <div className="flex items-center">
                                        <FileText className="h-4 w-4 text-purple-500 mr-2" />
                                        <span className="text-gray-800">Review customs documentation</span>
                                      </div>
                                      <Button size="sm" className="bg-gradient-to-r from-purple-500 to-violet-600 text-white h-8">
                                        View
                                      </Button>
                                    </div>
                                  </div>
                                ) : selectedShipment.status === "delayed" ? (
                                  <div className="space-y-3">
                                    <div className="flex items-center justify-between p-2 rounded-md bg-red-50 border border-red-100">
                                      <div className="flex items-center">
                                        <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                                        <span className="text-gray-800">Contact carrier about delay</span>
                                      </div>
                                      <Button size="sm" className="bg-gradient-to-r from-red-500 to-rose-600 text-white h-8">
                                        Contact
                                      </Button>
                                    </div>
                                    <div className="flex items-center justify-between p-2 rounded-md bg-amber-50 border border-amber-100">
                                      <div className="flex items-center">
                                        <Clock className="h-4 w-4 text-amber-500 mr-2" />
                                        <span className="text-gray-800">Update buyer about new ETA</span>
                                      </div>
                                      <Button size="sm" variant="outline" className="border-amber-200 text-amber-600 h-8">
                                        Notify
                                      </Button>
                                    </div>
                                  </div>
                                ) : selectedShipment.status === "delivered" ? (
                                  <div className="p-2 rounded-md bg-green-50 border border-green-100 flex items-center justify-between">
                                    <div className="flex items-center">
                                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                      <span className="text-gray-800">Shipment successfully delivered</span>
                                    </div>
                                    <Button size="sm" variant="outline" className="border-green-200 text-green-600 h-8">
                                      Send Invoice
                                    </Button>
                                  </div>
                                ) : (
                                  <div className="p-2 rounded-md bg-blue-50 border border-blue-100 flex items-center justify-between">
                                    <div className="flex items-center">
                                      <Ship className="h-4 w-4 text-blue-500 mr-2" />
                                      <span className="text-gray-800">Shipment in transit - on schedule</span>
                                    </div>
                                    <Button size="sm" variant="outline" className="border-blue-200 text-blue-600 h-8">
                                      Track Updates
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {activeTab === "timeline" && (
                        <div className="p-6">
                          <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center">
                            <Clock className="h-5 w-5 mr-2 text-blue-500" />
                            Shipment Timeline
                          </h3>
                          
                          <div className="relative border-l-2 border-blue-200 ml-3 pl-8 space-y-6">
                            {selectedShipment.timeline.map((event, index) => (
                              <div key={index} className="relative mb-6">
                                <div className={`absolute -left-10 mt-1.5 w-6 h-6 rounded-full flex items-center justify-center ${
                                  event.status === "completed" 
                                    ? "bg-green-500" 
                                    : event.status === "in_progress" 
                                      ? "bg-blue-500" 
                                      : "bg-gray-200"
                                }`}>
                                  {event.status === "completed" ? (
                                    <CheckCircle className="h-4 w-4 text-white" />
                                  ) : event.status === "in_progress" ? (
                                    <Clock className="h-4 w-4 text-white" />
                                  ) : (
                                    <div className="h-2 w-2 rounded-full bg-gray-400"></div>
                                  )}
                                </div>
                                
                                <div className={`p-4 rounded-lg border shadow-sm ${
                                  event.status === "completed" 
                                    ? "bg-green-50 border-green-100" 
                                    : event.status === "in_progress" 
                                      ? "bg-blue-50 border-blue-100" 
                                      : "bg-gray-50 border-gray-100"
                                }`}>
                                  <div className="flex justify-between items-start">
                                    <h4 className={`font-medium ${
                                      event.status === "completed" 
                                        ? "text-green-700" 
                                        : event.status === "in_progress" 
                                          ? "text-blue-700" 
                                          : "text-gray-500"
                                    }`}>
                                      {event.event}
                                    </h4>
                                    <Badge className={
                                      event.status === "completed" 
                                        ? "bg-green-100 text-green-700 border border-green-200" 
                                        : event.status === "in_progress" 
                                          ? "bg-blue-100 text-blue-700 border border-blue-200" 
                                          : "bg-gray-100 text-gray-600 border border-gray-200"
                                    }>
                                      {event.status === "completed" 
                                        ? "Completed" 
                                        : event.status === "in_progress" 
                                          ? "In Progress" 
                                          : "Upcoming"}
                                    </Badge>
                                  </div>
                                  <div className="text-sm text-gray-600 mt-1">
                                    {event.date}
                                  </div>
                                  {event.location && (
                                    <div className="flex items-center text-sm text-gray-500 mt-1">
                                      <MapPin className="h-3.5 w-3.5 mr-1" />
                                      <span>{event.location}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {activeTab === "documents" && (
                        <div className="p-6">
                          <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center">
                            <FileText className="h-5 w-5 mr-2 text-blue-500" />
                            Shipping Documents
                          </h3>
                          
                          <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
                            <Table>
                              <TableHeader>
                                <TableRow className="bg-gray-50">
                                  <TableHead>Document Name</TableHead>
                                  <TableHead>Status</TableHead>
                                  <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {selectedShipment.documents.map((doc, index) => (
                                  <TableRow key={index}>
                                    <TableCell className="font-medium text-gray-700">
                                      <div className="flex items-center">
                                        <FileText className="h-4 w-4 mr-2 text-blue-500" />
                                        {doc.name}
                                      </div>
                                    </TableCell>
                                    <TableCell>
                                      <Badge className={getDocumentStatusColor(doc.status)}>
                                        {doc.status === "approved" 
                                          ? "Approved" 
                                          : doc.status === "pending" 
                                            ? "Pending" 
                                            : doc.status === "rejected" 
                                              ? "Rejected" 
                                              : "Not Started"}
                                      </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                      <Button variant="ghost" size="sm" className="h-8 px-2 text-blue-600">
                                        View
                                      </Button>
                                      <Button variant="ghost" size="sm" className="h-8 px-2 text-blue-600">
                                        Download
                                      </Button>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                          
                          {selectedShipment.status === "preparing" && (
                            <div className="mt-6">
                              <h3 className="text-base font-semibold text-gray-800 mb-3 flex items-center">
                                <ClipboardCheck className="h-5 w-5 mr-2 text-blue-500" />
                                Document Checklist
                              </h3>
                              
                              <Accordion type="single" collapsible className="bg-white rounded-lg border border-gray-100 shadow-sm">
                                <AccordionItem value="export-requirements">
                                  <AccordionTrigger className="px-4 hover:bg-blue-50 text-gray-800">
                                    Export Country Requirements
                                  </AccordionTrigger>
                                  <AccordionContent className="px-4 pb-4">
                                    <ul className="space-y-2 text-sm text-gray-600">
                                      <li className="flex items-center">
                                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                        Commercial Invoice (3 copies)
                                      </li>
                                      <li className="flex items-center">
                                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                        Packing List
                                      </li>
                                      <li className="flex items-center">
                                        <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />
                                        Certificate of Origin (pending)
                                      </li>
                                      <li className="flex items-center">
                                        <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />
                                        Bill of Lading (pending)
                                      </li>
                                    </ul>
                                  </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="import-requirements">
                                  <AccordionTrigger className="px-4 hover:bg-blue-50 text-gray-800">
                                    Import Country Requirements
                                  </AccordionTrigger>
                                  <AccordionContent className="px-4 pb-4">
                                    <ul className="space-y-2 text-sm text-gray-600">
                                      <li className="flex items-center">
                                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                        Commercial Invoice (original)
                                      </li>
                                      <li className="flex items-center">
                                        <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />
                                        Import Declaration (pending)
                                      </li>
                                      <li className="flex items-center">
                                        <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                                        Insurance Certificate (not started)
                                      </li>
                                    </ul>
                                  </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="carrier-requirements">
                                  <AccordionTrigger className="px-4 hover:bg-blue-50 text-gray-800">
                                    Carrier Requirements
                                  </AccordionTrigger>
                                  <AccordionContent className="px-4 pb-4">
                                    <ul className="space-y-2 text-sm text-gray-600">
                                      <li className="flex items-center">
                                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                        Booking Confirmation
                                      </li>
                                      <li className="flex items-center">
                                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                        Shipping Instructions
                                      </li>
                                      <li className="flex items-center">
                                        <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />
                                        Dangerous Goods Declaration (if applicable)
                                      </li>
                                    </ul>
                                  </AccordionContent>
                                </AccordionItem>
                              </Accordion>
                            </div>
                          )}
                        </div>
                      )}
                      
                      {activeTab === "costs" && (
                        <div className="p-6">
                          <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center">
                            <BarChart className="h-5 w-5 mr-2 text-blue-500" />
                            Shipping Costs Breakdown
                          </h3>
                          
                          <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-4 mb-6">
                            <Table>
                              <TableBody>
                                <TableRow>
                                  <TableCell className="font-medium text-gray-500 py-2 pl-0">
                                    Shipping Cost
                                  </TableCell>
                                  <TableCell className="text-right text-gray-900 py-2 pr-0">
                                    ${selectedShipment.costs.shipping.toLocaleString()}
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell className="font-medium text-gray-500 py-2 pl-0">
                                    Insurance
                                  </TableCell>
                                  <TableCell className="text-right text-gray-900 py-2 pr-0">
                                    ${selectedShipment.costs.insurance.toLocaleString()}
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell className="font-medium text-gray-500 py-2 pl-0">
                                    Customs Duties & Taxes
                                  </TableCell>
                                  <TableCell className="text-right text-gray-900 py-2 pr-0">
                                    ${selectedShipment.costs.customs.toLocaleString()}
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell className="font-medium text-gray-500 py-2 pl-0">
                                    Handling Fees
                                  </TableCell>
                                  <TableCell className="text-right text-gray-900 py-2 pr-0">
                                    ${selectedShipment.costs.handling.toLocaleString()}
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell className="font-medium text-gray-500 py-2 pl-0">
                                    Other Expenses
                                  </TableCell>
                                  <TableCell className="text-right text-gray-900 py-2 pr-0">
                                    ${selectedShipment.costs.other.toLocaleString()}
                                  </TableCell>
                                </TableRow>
                                <TableRow className="border-t border-gray-100">
                                  <TableCell className="font-semibold text-gray-900 py-3 pl-0">
                                    Total Cost
                                  </TableCell>
                                  <TableCell className="text-right font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 py-3 pr-0">
                                    ${calculateTotalCost(selectedShipment.costs).toLocaleString()}
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h3 className="text-base font-semibold text-gray-800 mb-3 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Cost Comparison
                              </h3>
                              
                              <Card className="border border-gray-100">
                                <CardContent className="pt-6">
                                  <div className="space-y-4">
                                    <div>
                                      <div className="flex justify-between items-center mb-1">
                                        <span className="text-sm font-medium text-gray-500">Shipping Cost</span>
                                        <span className="text-sm text-gray-700">
                                          ${selectedShipment.costs.shipping.toLocaleString()} ({Math.round((selectedShipment.costs.shipping / calculateTotalCost(selectedShipment.costs)) * 100)}%)
                                        </span>
                                      </div>
                                      <Progress value={(selectedShipment.costs.shipping / calculateTotalCost(selectedShipment.costs)) * 100} className="h-2" />
                                    </div>
                                    <div>
                                      <div className="flex justify-between items-center mb-1">
                                        <span className="text-sm font-medium text-gray-500">Insurance</span>
                                        <span className="text-sm text-gray-700">
                                          ${selectedShipment.costs.insurance.toLocaleString()} ({Math.round((selectedShipment.costs.insurance / calculateTotalCost(selectedShipment.costs)) * 100)}%)
                                        </span>
                                      </div>
                                      <Progress value={(selectedShipment.costs.insurance / calculateTotalCost(selectedShipment.costs)) * 100} className="h-2" />
                                    </div>
                                    <div>
                                      <div className="flex justify-between items-center mb-1">
                                        <span className="text-sm font-medium text-gray-500">Customs</span>
                                        <span className="text-sm text-gray-700">
                                          ${selectedShipment.costs.customs.toLocaleString()} ({Math.round((selectedShipment.costs.customs / calculateTotalCost(selectedShipment.costs)) * 100)}%)
                                        </span>
                                      </div>
                                      <Progress value={(selectedShipment.costs.customs / calculateTotalCost(selectedShipment.costs)) * 100} className="h-2" />
                                    </div>
                                    <div>
                                      <div className="flex justify-between items-center mb-1">
                                        <span className="text-sm font-medium text-gray-500">Handling</span>
                                        <span className="text-sm text-gray-700">
                                          ${selectedShipment.costs.handling.toLocaleString()} ({Math.round((selectedShipment.costs.handling / calculateTotalCost(selectedShipment.costs)) * 100)}%)
                                        </span>
                                      </div>
                                      <Progress value={(selectedShipment.costs.handling / calculateTotalCost(selectedShipment.costs)) * 100} className="h-2" />
                                    </div>
                                    <div>
                                      <div className="flex justify-between items-center mb-1">
                                        <span className="text-sm font-medium text-gray-500">Other</span>
                                        <span className="text-sm text-gray-700">
                                          ${selectedShipment.costs.other.toLocaleString()} ({Math.round((selectedShipment.costs.other / calculateTotalCost(selectedShipment.costs)) * 100)}%)
                                        </span>
                                      </div>
                                      <Progress value={(selectedShipment.costs.other / calculateTotalCost(selectedShipment.costs)) * 100} className="h-2" />
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </div>
                            
                            <div>
                              <h3 className="text-base font-semibold text-gray-800 mb-3 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                Payment Status
                              </h3>
                              
                              <Card className="border border-gray-100">
                                <CardContent className="p-0">
                                  <Table>
                                    <TableBody>
                                      <TableRow>
                                        <TableCell className="font-medium text-gray-500">Invoice Number</TableCell>
                                        <TableCell className="text-right">INV-2024-{selectedShipment.id.split('-')[1]}</TableCell>
                                      </TableRow>
                                      <TableRow>
                                        <TableCell className="font-medium text-gray-500">Invoice Date</TableCell>
                                        <TableCell className="text-right">
                                          {new Date(selectedShipment.departureDate).toLocaleDateString()}
                                        </TableCell>
                                      </TableRow>
                                      <TableRow>
                                        <TableCell className="font-medium text-gray-500">Payment Terms</TableCell>
                                        <TableCell className="text-right">Net 30</TableCell>
                                      </TableRow>
                                      <TableRow>
                                        <TableCell className="font-medium text-gray-500">Payment Status</TableCell>
                                        <TableCell className="text-right">
                                          <Badge className={
                                            selectedShipment.status === "delivered" 
                                              ? "bg-green-100 text-green-700 border border-green-200" 
                                              : "bg-amber-100 text-amber-700 border border-amber-200"
                                          }>
                                            {selectedShipment.status === "delivered" ? "Paid" : "Pending"}
                                          </Badge>
                                        </TableCell>
                                      </TableRow>
                                      <TableRow>
                                        <TableCell className="font-medium text-gray-500">Due Date</TableCell>
                                        <TableCell className="text-right">
                                          {new Date(new Date(selectedShipment.departureDate).setDate(new Date(selectedShipment.departureDate).getDate() + 30)).toLocaleDateString()}
                                        </TableCell>
                                      </TableRow>
                                    </TableBody>
                                  </Table>
                                </CardContent>
                                <CardFooter className="flex justify-end space-x-2 bg-gray-50 border-t border-gray-100">
                                  <Button variant="outline" size="sm" className="border-blue-200 text-blue-600">
                                    <FileText className="h-3.5 w-3.5 mr-1" />
                                    View Invoice
                                  </Button>
                                  <Button size="sm" className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                                    <ExternalLink className="h-3.5 w-3.5 mr-1" />
                                    Payment Details
                                  </Button>
                                </CardFooter>
                              </Card>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                    
                    <CardFooter className="flex items-center justify-between p-4 bg-gray-50 border-t border-gray-100">
                      <div className="text-sm text-gray-500">
                        Last updated: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="border-blue-200 text-blue-600">
                          <FileText className="h-3.5 w-3.5 mr-1" />
                          Export Data
                        </Button>
                        <Button size="sm" className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                          <ExternalLink className="h-3.5 w-3.5 mr-1" />
                          Contact Carrier
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ) : (
                  <Card className="border border-dashed border-blue-200 shadow-sm rounded-xl overflow-hidden">
                    <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                    <CardContent className="flex flex-col items-center justify-center p-10 text-center">
                      <div className="rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 p-4 mb-4 shadow-md">
                        <Ship className="h-8 w-8 text-blue-500" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-3">Select a Shipment</h3>
                      <p className="text-gray-600 mb-6 max-w-md">
                        Select a shipment from the list to view detailed information and track your delivery.
                      </p>
                      <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-300">
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