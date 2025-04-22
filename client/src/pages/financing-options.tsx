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
  Banknote,
  BuildingIcon,
  DollarSign,
  Globe,
  AlertCircle,
  CheckCircle,
  Calendar,
  PieChart,
  ArrowRight,
  BarChart3,
  CircleDollarSign,
  PercentIcon,
  HelpCircle,
  ChevronRight,
  FileText,
  BarChart,
  Clock,
  PlusCircle,
  Filter,
  StarIcon,
  LockIcon,
  Wallet,
  TrendingUp,
  ClipboardCheck,
  Eye
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface FinancingOption {
  id: number;
  name: string;
  provider: string;
  type: "loan" | "insurance" | "grant" | "equity" | "guarantee";
  amount: string;
  interestRate?: string;
  term?: string;
  applicationProcess: string;
  eligibility: string[];
  rating: number;
  description: string;
  benefits: string[];
  requirements: string[];
  statusInfo: {
    applicationStatus?: "not_started" | "in_progress" | "approved" | "rejected";
    nextStep?: string;
    dueDate?: string;
  };
}

interface InsuranceOption {
  id: number;
  name: string;
  provider: string;
  coverage: string;
  premium: string;
  deductible: string;
  description: string;
  risks: string[];
  benefits: string[];
}

export default function FinancingOptions() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedTab, setSelectedTab] = useState("all");
  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);
  const [loanAmount, setLoanAmount] = useState("50000");
  const [loanTerm, setLoanTerm] = useState("12");
  const [riskProfile, setRiskProfile] = useState("medium");
  const { user } = useAuth();
  
  // Convert user data to format expected by child components
  const userData = {
    username: user?.username || "",
    name: user?.companyName || "",
    companyName: user?.companyName || "",
    email: user?.email || "",
    exportReadiness: user?.exportReadiness || 0,
  };

  // Sample financing options data
  const mockFinancingOptions: FinancingOption[] = [
    {
      id: 1,
      name: "Export Development Loan",
      provider: "Export-Import Bank",
      type: "loan",
      amount: "$25,000 - $500,000",
      interestRate: "5.2% - 7.5%",
      term: "1 - 5 years",
      applicationProcess: "Online application, credit review, approval within 10 business days",
      eligibility: ["Minimum 2 years in business", "Annual revenue > $500,000", "Good credit history", "Valid export contract"],
      rating: 4.5,
      description: "Low-interest loans specifically designed for exporters to expand their international trade operations.",
      benefits: [
        "Competitive interest rates",
        "Longer repayment terms",
        "No collateral required for loans under $100,000",
        "Interest-only payments for first 6 months"
      ],
      requirements: [
        "Business financial statements (2 years)",
        "Export business plan",
        "Proof of export orders",
        "Tax returns"
      ],
      statusInfo: {
        applicationStatus: "not_started",
        nextStep: "Complete online application",
        dueDate: "2024-05-15"
      }
    },
    {
      id: 2,
      name: "Political Risk Insurance",
      provider: "Global Trade Assurance",
      type: "insurance",
      amount: "Up to $2,000,000 coverage",
      applicationProcess: "Online application, risk assessment, policy issuance within 15 business days",
      eligibility: ["Active export business", "Exporting to eligible countries", "Compliance with trade regulations"],
      rating: 4.2,
      description: "Comprehensive insurance protecting against political risks in overseas markets including expropriation, currency inconvertibility, and political violence.",
      benefits: [
        "Coverage for politically unstable regions",
        "Customizable policy terms",
        "Quick claims processing",
        "Risk assessment services included"
      ],
      requirements: [
        "Detail of export contracts",
        "Country risk assessment",
        "Transaction history with importers",
        "Compliance certification"
      ],
      statusInfo: {
        applicationStatus: "in_progress",
        nextStep: "Submit additional documentation",
        dueDate: "2024-04-25"
      }
    },
    {
      id: 3,
      name: "Export Working Capital Program",
      provider: "Trade Finance Corporation",
      type: "loan",
      amount: "$100,000 - $2,000,000",
      interestRate: "6.0% - 8.5%",
      term: "6 months - 3 years",
      applicationProcess: "Application through banking partner, credit review, approval within 15 business days",
      eligibility: ["Minimum 3 years in business", "Annual export revenue > $1,000,000", "Profitable operations", "No significant legal issues"],
      rating: 4.8,
      description: "Short-term, transaction-based financing to fund export sales and support pre-export production activities.",
      benefits: [
        "Covers labor, materials, and overhead costs",
        "Advance rates up to 90% of purchase order value",
        "Revolving line of credit",
        "No prepayment penalties"
      ],
      requirements: [
        "Audited financial statements",
        "Export orders or letters of credit",
        "Business tax returns (3 years)",
        "Collateral documentation"
      ],
      statusInfo: {
        applicationStatus: "approved",
        nextStep: "Funds disbursement",
        dueDate: "2024-04-05"
      }
    },
    {
      id: 4,
      name: "Export Market Development Grant",
      provider: "International Trade Ministry",
      type: "grant",
      amount: "Up to $150,000",
      applicationProcess: "Application submission, review committee evaluation, approval within 30 business days",
      eligibility: ["SME exporter", "Annual turnover < $20 million", "Export development strategy", "First-time exporters or new market entry"],
      rating: 4.6,
      description: "Non-repayable grants to support marketing activities aimed at developing export markets for local companies.",
      benefits: [
        "No repayment required",
        "Covers up to 50% of eligible promotion expenses",
        "Multiple claim periods available",
        "Advisory support provided"
      ],
      requirements: [
        "Detailed export market development plan",
        "Itemized budget for marketing activities",
        "Previous export performance records",
        "Business registration documents"
      ],
      statusInfo: {
        applicationStatus: "not_started",
        nextStep: "Prepare application documents",
        dueDate: "2024-06-10"
      }
    },
    {
      id: 5,
      name: "Supply Chain Financing Program",
      provider: "Global Trade Bank",
      type: "loan",
      amount: "Based on invoice value",
      interestRate: "4.5% - 6.0%",
      applicationProcess: "Online application, supply chain verification, approval within 7 business days",
      eligibility: ["Supplier to creditworthy buyers", "Established trade relationships", "Minimum 1 year in business"],
      rating: 4.3,
      description: "Financing solution that helps exporters optimize working capital by advancing funds against confirmed purchase orders or invoices.",
      benefits: [
        "Early payment of invoices",
        "No additional debt on balance sheet",
        "Improved cash flow management",
        "Strengthen buyer relationships"
      ],
      requirements: [
        "Verified purchase orders",
        "Buyer credit approval",
        "Supply contracts",
        "Trade references"
      ],
      statusInfo: {
        applicationStatus: "in_progress",
        nextStep: "Buyer credit verification",
        dueDate: "2024-04-15"
      }
    },
    {
      id: 6,
      name: "Export Credit Guarantee",
      provider: "National Export Agency",
      type: "guarantee",
      amount: "Up to 85% of loan value",
      applicationProcess: "Bank-led application, export verification, approval within 20 business days",
      eligibility: ["Exporter with valid contracts", "Bank financing approval", "Compliance with export regulations"],
      rating: 4.0,
      description: "Government-backed guarantees that protect lending institutions against defaults on export-related loans, making it easier for exporters to secure funding.",
      benefits: [
        "Reduces lender risk",
        "Enables access to financing",
        "No direct cost to exporter",
        "Supports larger loan amounts"
      ],
      requirements: [
        "Export contract documentation",
        "Bank loan application",
        "Business financial statements",
        "Export license verification"
      ],
      statusInfo: {
        applicationStatus: "not_started",
        nextStep: "Arrange meeting with partner bank",
        dueDate: "2024-05-20"
      }
    },
  ];

  // Sample insurance options data
  const mockInsuranceOptions: InsuranceOption[] = [
    {
      id: 1,
      name: "Export Credit Insurance",
      provider: "Global Trade Assurance",
      coverage: "90% of invoice value",
      premium: "0.35% - 0.75% of insured amount",
      deductible: "10% of claim value",
      description: "Protects against non-payment by foreign buyers due to commercial and political risks.",
      risks: ["Buyer insolvency", "Payment default", "Contract cancellation", "Political events"],
      benefits: ["Secure payments", "Access to financing", "Market expansion", "Credit management support"]
    },
    {
      id: 2,
      name: "Cargo Insurance",
      provider: "Maritime Insurance Co.",
      coverage: "110% of shipment value",
      premium: "0.25% - 0.50% of insured amount",
      deductible: "$1,000 per claim",
      description: "Covers physical damage or loss of goods during international transit.",
      risks: ["Damage during transit", "Theft", "Natural disasters", "General average"],
      benefits: ["Full value protection", "Door-to-door coverage", "Claims assistance", "Peace of mind"]
    },
    {
      id: 3,
      name: "Foreign Exchange Risk Insurance",
      provider: "Financial Risk Solutions",
      coverage: "Up to $500,000 per contract",
      premium: "1.2% - 2.5% of contract value",
      deductible: "5% of claim value",
      description: "Hedges against currency fluctuations that could impact export contracts.",
      risks: ["Currency devaluation", "Exchange rate volatility", "Convertibility issues"],
      benefits: ["Predictable pricing", "Protected profit margins", "Competitive pricing", "Market stability"]
    }
  ];

  // Filter financing options based on search, type, and tab
  const filteredFinancingOptions = mockFinancingOptions.filter(option => {
    // Filter by search query
    if (searchQuery && 
        !option.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !option.provider.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by type
    if (selectedType !== "all" && option.type !== selectedType) {
      return false;
    }
    
    // Filter by tab
    if (selectedTab === "recommended" && option.rating < 4.5) return false;
    if (selectedTab === "applied" && 
        (option.statusInfo.applicationStatus !== "in_progress" && 
         option.statusInfo.applicationStatus !== "approved")) return false;
    
    return true;
  });

  // Get the selected option or first option if none selected
  const selectedOption = selectedOptionId 
    ? mockFinancingOptions.find(o => o.id === selectedOptionId) 
    : (filteredFinancingOptions.length > 0 ? filteredFinancingOptions[0] : null);

  // Handle option selection
  const handleOptionSelect = (optionId: number) => {
    setSelectedOptionId(optionId);
  };

  // Calculate estimated monthly payment
  const calculateMonthlyPayment = () => {
    const principal = parseFloat(loanAmount);
    const months = parseInt(loanTerm);
    // Average interest rate based on selected option or default
    const interestRate = selectedOption?.interestRate 
      ? parseFloat(selectedOption.interestRate.split('%')[0].split('-')[0]) / 100 / 12
      : 0.06 / 12;
    
    if (principal && months && interestRate) {
      return (principal * interestRate * Math.pow(1 + interestRate, months)) / 
             (Math.pow(1 + interestRate, months) - 1);
    }
    
    return 0;
  };

  // Get status color based on application status
  const getStatusColor = (status?: string) => {
    switch (status) {
      case "approved":
        return "bg-gradient-to-r from-green-500 to-emerald-600 text-white";
      case "in_progress":
        return "bg-gradient-to-r from-amber-500 to-orange-600 text-white";
      case "rejected":
        return "bg-gradient-to-r from-red-500 to-rose-600 text-white";
      case "not_started":
      default:
        return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  // Get status text
  const getStatusText = (status?: string) => {
    switch (status) {
      case "approved":
        return "Approved";
      case "in_progress":
        return "In Progress";
      case "rejected":
        return "Rejected";
      case "not_started":
      default:
        return "Not Started";
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
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-3 text-white shadow-md mr-4">
                  <Banknote className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Financing Options</h1>
                  <p className="text-gray-600 mt-1">Explore financing and insurance solutions for your export business</p>
                </div>
              </div>
              <Button 
                className="mt-4 sm:mt-0 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-md hover:shadow-lg transition-all duration-300" 
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Get Personalized Matches
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden">
                <div className="h-1 w-full bg-gradient-to-r from-green-500 to-emerald-600"></div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
                    <DollarSign className="h-5 w-5 mr-2 text-green-500" />
                    Loan Calculator
                  </CardTitle>
                  <CardDescription>Estimate monthly payments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="text-sm font-medium text-gray-700">Loan Amount</label>
                        <span className="text-sm text-green-600 font-medium">${parseInt(loanAmount).toLocaleString()}</span>
                      </div>
                      <Input
                        type="range"
                        min="10000"
                        max="500000"
                        step="10000"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(e.target.value)}
                        className="accent-green-500"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>$10,000</span>
                        <span>$500,000</span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="text-sm font-medium text-gray-700">Loan Term (months)</label>
                        <span className="text-sm text-green-600 font-medium">{loanTerm} months</span>
                      </div>
                      <Input
                        type="range"
                        min="3"
                        max="60"
                        step="3"
                        value={loanTerm}
                        onChange={(e) => setLoanTerm(e.target.value)}
                        className="accent-green-500"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>3 months</span>
                        <span>60 months</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-2">Risk Profile</label>
                      <Select value={riskProfile} onValueChange={setRiskProfile}>
                        <SelectTrigger className="w-full border-gray-200 focus:border-green-300 shadow-sm">
                          <SelectValue placeholder="Select risk profile" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low Risk (Better Rate)</SelectItem>
                          <SelectItem value="medium">Medium Risk</SelectItem>
                          <SelectItem value="high">High Risk (Higher Rate)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-gradient-to-r from-green-50 to-emerald-50 border-t border-green-100 flex flex-col items-stretch">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-gray-700 font-medium">Estimated Monthly Payment:</span>
                    <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-700">
                      ${calculateMonthlyPayment().toFixed(2)}
                    </span>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white">
                    <CircleDollarSign className="h-4 w-4 mr-2" />
                    Apply for Financing
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden">
                <div className="h-1 w-full bg-gradient-to-r from-green-500 to-emerald-600"></div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2 text-green-500" />
                    Financing Summary
                  </CardTitle>
                  <CardDescription>Your current financing status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-4">
                    <div className="bg-white p-3 rounded-lg border border-gray-100 flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="bg-blue-100 p-1.5 rounded-full mr-3">
                          <DollarSign className="h-4 w-4 text-blue-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">Active Loans</span>
                      </div>
                      <span className="text-lg font-semibold text-gray-900">1</span>
                    </div>
                    
                    <div className="bg-white p-3 rounded-lg border border-gray-100 flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="bg-purple-100 p-1.5 rounded-full mr-3">
                          <ClipboardCheck className="h-4 w-4 text-purple-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">Applications</span>
                      </div>
                      <span className="text-lg font-semibold text-gray-900">2</span>
                    </div>
                    
                    <div className="bg-white p-3 rounded-lg border border-gray-100 flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="bg-amber-100 p-1.5 rounded-full mr-3">
                          <Calendar className="h-4 w-4 text-amber-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">Due This Month</span>
                      </div>
                      <span className="text-lg font-semibold text-gray-900">$4,250</span>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100">
                    <h4 className="text-sm font-medium text-gray-800 mb-2 flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1 text-green-600" />
                      Credit Score
                    </h4>
                    <div className="relative">
                      <Progress value={75} className="h-2 bg-green-100" indicatorClassName="bg-gradient-to-r from-green-500 to-emerald-600" />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Poor</span>
                        <span>Excellent</span>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center">
                      <span className="bg-white rounded-full px-2 py-1 text-xs font-medium text-green-700 border border-green-200 shadow-sm">
                        Good: 720
                      </span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" className="h-7 w-7 p-0 ml-1">
                              <HelpCircle className="h-4 w-4 text-gray-400" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs">Your business credit score impacts financing options</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-gray-50 border-t border-gray-100 justify-center">
                  <Button variant="link" className="text-green-600 hover:text-green-700">
                    View Detailed Reports
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden">
                <div className="h-1 w-full bg-gradient-to-r from-green-500 to-emerald-600"></div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-green-500" />
                    Insurance Coverage
                  </CardTitle>
                  <CardDescription>Export insurance protection</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-gray-100">
                    {mockInsuranceOptions.map((insurance) => (
                      <div 
                        key={insurance.id} 
                        className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center">
                            <LockIcon className="h-4 w-4 text-green-500 mr-2" />
                            <h4 className="font-medium text-gray-800">{insurance.name}</h4>
                          </div>
                          <Badge className="bg-green-100 text-green-700 border border-green-200">
                            {insurance.provider}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-500 mb-2">{insurance.description}</p>
                        <div className="flex justify-between text-xs text-gray-700 mt-2">
                          <span>Coverage: <span className="font-medium text-gray-900">{insurance.coverage}</span></span>
                          <span>Premium: <span className="font-medium text-gray-900">{insurance.premium}</span></span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center bg-gray-50 border-t border-gray-100">
                  <Badge variant="outline" className="text-blue-600 border-blue-200 flex items-center">
                    <Globe className="h-3 w-3 mr-1" />
                    3 Active Policies
                  </Badge>
                  <Button variant="outline" className="border-green-200 text-green-600 hover:bg-green-50">
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <Card className="mb-8 border border-gray-100 shadow-sm rounded-xl overflow-hidden">
              <div className="h-1.5 w-full bg-gradient-to-r from-green-500 to-emerald-600"></div>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Filter className="h-5 w-5 mr-2 text-green-500" />
                  Financing Filter
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-100">
                    <label className="text-sm font-medium text-gray-700 block mb-2">Search Financing</label>
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="Search by name or provider..."
                        className="pl-9 border-gray-200 focus:border-green-300 shadow-sm bg-white"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-100">
                    <label className="text-sm font-medium text-gray-700 block mb-2">Financing Type</label>
                    <Select value={selectedType} onValueChange={setSelectedType}>
                      <SelectTrigger className="bg-white border-gray-200 focus:border-green-300 shadow-sm">
                        <SelectValue placeholder="All Types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="loan">Loans</SelectItem>
                        <SelectItem value="insurance">Insurance</SelectItem>
                        <SelectItem value="grant">Grants</SelectItem>
                        <SelectItem value="equity">Equity</SelectItem>
                        <SelectItem value="guarantee">Guarantees</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-100 flex items-center">
                    <div className="flex space-x-4">
                      <div className="flex items-center space-x-1.5">
                        <BuildingIcon className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium text-gray-700">Exporter Type:</span>
                      </div>
                      <Badge className="bg-white text-gray-700 border border-gray-200">
                        Small Enterprise
                      </Badge>
                    </div>
                    <Button variant="link" className="text-green-600 hover:text-green-700 text-xs ml-auto">
                      Change
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-8">
              <TabsList className="grid grid-cols-3 mb-8 bg-white border border-gray-100 p-1 shadow-sm rounded-xl">
                <TabsTrigger 
                  value="all" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white rounded-md transition-all duration-200 flex items-center"
                >
                  <Wallet className="h-4 w-4 mr-2" />
                  All Options
                </TabsTrigger>
                <TabsTrigger 
                  value="recommended" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white rounded-md transition-all duration-200 flex items-center"
                >
                  <StarIcon className="h-4 w-4 mr-2" />
                  Recommended
                </TabsTrigger>
                <TabsTrigger 
                  value="applied" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white rounded-md transition-all duration-200 flex items-center"
                >
                  <ClipboardCheck className="h-4 w-4 mr-2" />
                  Applied
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Financing Options List */}
              <div className="lg:col-span-1 space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {filteredFinancingOptions.length} Financing Options Found
                </h3>
                
                {filteredFinancingOptions.length === 0 ? (
                  <Card className="border border-dashed border-green-200 shadow-sm rounded-xl overflow-hidden">
                    <div className="h-1 w-full bg-gradient-to-r from-green-500 to-emerald-600"></div>
                    <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                      <div className="rounded-full bg-gradient-to-r from-green-100 to-emerald-100 p-3 mb-4 shadow-md">
                        <AlertCircle className="h-6 w-6 text-green-500" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">No options found</h3>
                      <p className="text-gray-600 mb-4">
                        Try adjusting your filters to see more financing options
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-3">
                    {filteredFinancingOptions.map((option) => (
                      <Card 
                        key={option.id} 
                        className={`border cursor-pointer transition-all duration-300 hover:shadow-md ${
                          selectedOptionId === option.id 
                            ? "border-green-300 bg-gradient-to-r from-green-50 to-emerald-50 shadow-md" 
                            : "border-gray-200"
                        }`}
                        onClick={() => handleOptionSelect(option.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <div className="flex items-center">
                                <h4 className="font-medium text-gray-900">
                                  {option.name}
                                </h4>
                                {option.rating >= 4.5 && (
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger>
                                        <StarIcon className="h-4 w-4 text-amber-500 ml-1 fill-amber-500" />
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p className="text-xs">Top Rated Option</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                )}
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                {option.provider}
                              </div>
                            </div>
                            {option.statusInfo.applicationStatus && (
                              <Badge className={getStatusColor(option.statusInfo.applicationStatus)}>
                                {getStatusText(option.statusInfo.applicationStatus)}
                              </Badge>
                            )}
                          </div>
                          
                          <div className="flex items-center text-sm text-gray-700 mt-2">
                            <div className="flex items-center mr-4">
                              <Banknote className="h-3.5 w-3.5 mr-1 text-gray-500" />
                              <span className="text-xs">{option.amount}</span>
                            </div>
                            {option.interestRate && (
                              <div className="flex items-center">
                                <PercentIcon className="h-3.5 w-3.5 mr-1 text-gray-500" />
                                <span className="text-xs">{option.interestRate}</span>
                              </div>
                            )}
                          </div>
                          
                          <div className="mt-3">
                            <Badge 
                              className={`capitalize ${
                                option.type === 'loan' ? 'bg-blue-100 text-blue-700 border border-blue-200' :
                                option.type === 'insurance' ? 'bg-purple-100 text-purple-700 border border-purple-200' :
                                option.type === 'grant' ? 'bg-amber-100 text-amber-700 border border-amber-200' :
                                option.type === 'equity' ? 'bg-pink-100 text-pink-700 border border-pink-200' :
                                'bg-indigo-100 text-indigo-700 border border-indigo-200'
                              }`}
                            >
                              {option.type}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>

              {/* Financing Option Detail */}
              <div className="lg:col-span-2">
                {selectedOption ? (
                  <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden">
                    <div className="h-1.5 w-full bg-gradient-to-r from-green-500 to-emerald-600"></div>
                    <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center">
                            <CardTitle className="text-xl font-bold text-gray-900">
                              {selectedOption.name}
                            </CardTitle>
                            <Badge className="ml-2 bg-blue-100 text-blue-700 border border-blue-200 capitalize">
                              {selectedOption.type}
                            </Badge>
                          </div>
                          <CardDescription className="mt-1 flex items-center text-gray-600">
                            <BuildingIcon className="h-4 w-4 mr-1" />
                            {selectedOption.provider}
                          </CardDescription>
                        </div>
                        <div className="flex flex-col items-end">
                          {selectedOption.statusInfo.applicationStatus && (
                            <Badge className={getStatusColor(selectedOption.statusInfo.applicationStatus)}>
                              {getStatusText(selectedOption.statusInfo.applicationStatus)}
                            </Badge>
                          )}
                          <div className="flex items-center mt-2">
                            {[...Array(5)].map((_, i) => (
                              <StarIcon 
                                key={i} 
                                className={`h-4 w-4 ${
                                  i < Math.floor(selectedOption.rating) 
                                    ? "text-amber-500 fill-amber-500" 
                                    : i < selectedOption.rating 
                                      ? "text-amber-500 fill-amber-500 opacity-50" 
                                      : "text-gray-300"
                                }`} 
                              />
                            ))}
                            <span className="ml-1 text-sm text-gray-700">{selectedOption.rating}</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-base font-semibold text-gray-800 mb-3 flex items-center">
                            <CircleDollarSign className="h-5 w-5 mr-2 text-green-500" />
                            Financing Details
                          </h3>
                          
                          <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm mb-6">
                            <Table>
                              <TableBody>
                                <TableRow>
                                  <TableCell className="font-medium text-gray-500 py-2 pl-0">
                                    Amount Range
                                  </TableCell>
                                  <TableCell className="text-gray-900 py-2 pr-0">
                                    {selectedOption.amount}
                                  </TableCell>
                                </TableRow>
                                {selectedOption.interestRate && (
                                  <TableRow>
                                    <TableCell className="font-medium text-gray-500 py-2 pl-0">
                                      Interest Rate
                                    </TableCell>
                                    <TableCell className="text-gray-900 py-2 pr-0">
                                      {selectedOption.interestRate}
                                    </TableCell>
                                  </TableRow>
                                )}
                                {selectedOption.term && (
                                  <TableRow>
                                    <TableCell className="font-medium text-gray-500 py-2 pl-0">
                                      Term Length
                                    </TableCell>
                                    <TableCell className="text-gray-900 py-2 pr-0">
                                      {selectedOption.term}
                                    </TableCell>
                                  </TableRow>
                                )}
                                <TableRow>
                                  <TableCell className="font-medium text-gray-500 py-2 pl-0">
                                    Application Process
                                  </TableCell>
                                  <TableCell className="text-gray-900 py-2 pr-0">
                                    {selectedOption.applicationProcess}
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </div>
                          
                          <h3 className="text-base font-semibold text-gray-800 mb-3 flex items-center">
                            <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                            Benefits
                          </h3>
                          
                          <div className="space-y-2">
                            {selectedOption.benefits.map((benefit, index) => (
                              <div key={index} className="flex items-start space-x-2 bg-gradient-to-r from-green-50 to-emerald-50 p-2 rounded-md border border-green-100">
                                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                                <span className="text-sm text-gray-700">{benefit}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-base font-semibold text-gray-800 mb-3 flex items-center">
                            <AlertCircle className="h-5 w-5 mr-2 text-green-500" />
                            Eligibility Requirements
                          </h3>
                          
                          <div className="space-y-2 mb-6">
                            {selectedOption.eligibility.map((requirement, index) => (
                              <div key={index} className="flex items-start space-x-2 p-2 bg-white rounded-md border border-gray-100">
                                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                                <span className="text-sm text-gray-700">{requirement}</span>
                              </div>
                            ))}
                          </div>
                          
                          <h3 className="text-base font-semibold text-gray-800 mb-3 flex items-center">
                            <FileText className="h-5 w-5 mr-2 text-green-500" />
                            Required Documentation
                          </h3>
                          
                          <div className="space-y-2">
                            {selectedOption.requirements.map((doc, index) => (
                              <div key={index} className="flex items-start space-x-2 p-2 bg-white rounded-md border border-gray-100">
                                <FileText className="h-4 w-4 text-blue-500 mt-0.5" />
                                <span className="text-sm text-gray-700">{doc}</span>
                              </div>
                            ))}
                          </div>
                          
                          {selectedOption.statusInfo.applicationStatus && (
                            <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
                              <h3 className="text-base font-semibold text-gray-800 mb-3 flex items-center">
                                <Clock className="h-5 w-5 mr-2 text-blue-500" />
                                Application Status
                              </h3>
                              
                              <div className="space-y-3">
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-600">Status:</span>
                                  <Badge className={getStatusColor(selectedOption.statusInfo.applicationStatus)}>
                                    {getStatusText(selectedOption.statusInfo.applicationStatus)}
                                  </Badge>
                                </div>
                                
                                {selectedOption.statusInfo.nextStep && (
                                  <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">Next Step:</span>
                                    <span className="text-sm font-medium text-gray-800">{selectedOption.statusInfo.nextStep}</span>
                                  </div>
                                )}
                                
                                {selectedOption.statusInfo.dueDate && (
                                  <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">Due Date:</span>
                                    <div className="flex items-center">
                                      <Calendar className="h-3.5 w-3.5 mr-1 text-gray-400" />
                                      <span className="text-sm font-medium text-gray-800">
                                        {new Date(selectedOption.statusInfo.dueDate).toLocaleDateString()}
                                      </span>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                        <h3 className="text-base font-semibold text-gray-800 mb-2">Description</h3>
                        <p className="text-sm text-gray-600">{selectedOption.description}</p>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="flex items-center justify-between p-6 bg-gray-50 border-t border-gray-100">
                      <div className="text-sm text-gray-500">
                        {selectedOption.statusInfo.applicationStatus === "approved" || selectedOption.statusInfo.applicationStatus === "in_progress" ? (
                          <span>Application is being processed</span>
                        ) : (
                          <span>Apply now to secure this financing option</span>
                        )}
                      </div>
                      <div className="flex space-x-3">
                        <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">
                          <FileText className="h-4 w-4 mr-2" />
                          Download Info
                        </Button>
                        {selectedOption.statusInfo.applicationStatus === "not_started" ? (
                          <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white">
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Apply Now
                          </Button>
                        ) : selectedOption.statusInfo.applicationStatus === "in_progress" ? (
                          <Button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white">
                            <Clock className="h-4 w-4 mr-2" />
                            Continue Application
                          </Button>
                        ) : (
                          <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white">
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                        )}
                      </div>
                    </CardFooter>
                  </Card>
                ) : (
                  <Card className="border border-dashed border-green-200 shadow-sm rounded-xl overflow-hidden">
                    <div className="h-1 w-full bg-gradient-to-r from-green-500 to-emerald-600"></div>
                    <CardContent className="flex flex-col items-center justify-center p-10 text-center">
                      <div className="rounded-full bg-gradient-to-r from-green-100 to-emerald-100 p-4 mb-4 shadow-md">
                        <Banknote className="h-8 w-8 text-green-500" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-3">Select a Financing Option</h3>
                      <p className="text-gray-600 mb-6 max-w-md">
                        Select a financing option from the list to view detailed information and apply for funding.
                      </p>
                      <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-md hover:shadow-lg transition-all duration-300">
                        <Filter className="h-4 w-4 mr-2" />
                        Adjust Filters
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