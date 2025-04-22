import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { MobileNav } from "@/components/mobile-nav";
import { StatusCard } from "@/components/status-card";
import { ExportProcessGuidance, ProcessStep } from "@/components/export-process-guidance";
import { MarketDemandAnalysis } from "@/components/market-demand-analysis";
import { ExportRiskAssessment, RiskFactor, MitigationSuggestion } from "@/components/export-risk-assessment";
import { ComplianceDocumentation } from "@/components/compliance-documentation";
import { RecentActivities, Activity } from "@/components/recent-activities";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Globe, ShoppingCart, Truck, DollarSign } from "lucide-react";

export default function Dashboard() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  // Default values in case user is not fully loaded
  const userData = {
    username: user?.username || "",
    // Use companyName as name since User schema doesn't have a name field
    name: user?.companyName || "",
    companyName: user?.companyName || "",
    email: user?.email || "",
    exportReadiness: user?.exportReadiness || 0,
  };

  // Fetch export project data
  const { data: exportProject, isLoading: isLoadingProject } = useQuery<any>({
    queryKey: ["/api/export-projects/current"],
    placeholderData: {} // Provide empty object as placeholder
  });

  // Fetch process steps
  const { data: processSteps, isLoading: isLoadingSteps } = useQuery<ProcessStep[]>({
    queryKey: ["/api/export-projects/current/steps"],
    placeholderData: [] // Empty array as placeholder
  });

  // Fetch risk assessment
  const { data: riskAssessment, isLoading: isLoadingRisk } = useQuery<{
    riskFactors: RiskFactor[];
    mitigationSuggestions: MitigationSuggestion[];
  }>({
    queryKey: ["/api/export-projects/current/risk-assessment"],
    placeholderData: { 
      riskFactors: [], 
      mitigationSuggestions: [] 
    } // Provide empty arrays as placeholder
  });

  // Fetch documents
  const { data: documents, isLoading: isLoadingDocs } = useQuery<any[]>({
    queryKey: ["/api/export-projects/current/documents"],
    placeholderData: [] // Empty array as placeholder
  });

  // Fetch activities
  const { data: activities, isLoading: isLoadingActivities } = useQuery<Activity[]>({
    queryKey: ["/api/activities"],
    placeholderData: [] // Empty array as placeholder
  });

  // Mock data when real data is loading
  const mockSteps: ProcessStep[] = [
    {
      id: 1,
      name: "Product Selection",
      description: "You have selected handcrafted teak furniture for export.",
      status: "completed",
      order: 1,
    },
    {
      id: 2,
      name: "Market Research",
      description: "You've identified Japan as your target market with positive demand indicators.",
      status: "completed",
      order: 2,
    },
    {
      id: 3,
      name: "Compliance & Documentation",
      description: "2 out of 5 required documents have been prepared.",
      status: "in_progress",
      order: 3,
    },
    {
      id: 4,
      name: "Buyer Matchmaking",
      description: "This step will be unlocked after documentation is complete.",
      status: "upcoming",
      order: 4,
    },
    {
      id: 5,
      name: "Logistics Planning",
      description: "Schedule and manage shipment to Japan.",
      status: "upcoming",
      order: 5,
    },
    {
      id: 6,
      name: "Payment Processing",
      description: "Secure payment methods and transaction processing.",
      status: "upcoming",
      order: 6,
    },
  ];

  const mockRiskFactors = [
    {
      name: "Shipping Delays",
      level: "High" as const,
      percentage: 85,
      description: "Congestion reported at destination port",
    },
    {
      name: "Payment Security",
      level: "Low" as const,
      percentage: 25,
      description: "Secure payment methods in place",
    },
    {
      name: "Regulatory Compliance",
      level: "Medium" as const,
      percentage: 55,
      description: "Some documentation still pending",
    },
    {
      name: "Currency Fluctuation",
      level: "Medium" as const,
      percentage: 60,
      description: "JPY/IDR moderate volatility observed",
    },
  ];

  const mockMitigationSuggestions = [
    {
      title: "Consider alternate shipping routes",
      description: "Use air freight for initial samples to avoid port delays",
    },
    {
      title: "Expedite remaining documentation",
      description: "Complete Certificate of Origin by end of week",
    },
    {
      title: "Hedge against currency fluctuations",
      description: "Lock in forward contracts for upcoming transactions",
    },
  ];

  const mockDocuments = [
    {
      id: 1,
      name: "Commercial Invoice",
      type: "invoice",
      description: "Details of goods and price",
      status: "completed" as const,
      dueDate: "Oct 15, 2023",
    },
    {
      id: 2,
      name: "Packing List",
      type: "packing",
      description: "Details of packaged items",
      status: "completed" as const,
      dueDate: "Oct 15, 2023",
    },
    {
      id: 3,
      name: "Certificate of Origin",
      type: "certificate",
      description: "Confirms product origin in Indonesia",
      status: "in_progress" as const,
      dueDate: "Oct 18, 2023",
    },
    {
      id: 4,
      name: "Shipping Bill",
      type: "shipping",
      description: "Export declaration document",
      status: "not_started" as const,
      dueDate: "Oct 20, 2023",
    },
    {
      id: 5,
      name: "Bill of Lading",
      type: "shipping",
      description: "Receipt of freight services",
      status: "not_started" as const,
      dueDate: "Oct 25, 2023",
    },
  ];

  const mockActivities: Activity[] = [
    {
      id: 1,
      type: "document",
      title: "Commercial Invoice",
      description: "document has been approved",
      timestamp: "Today, 10:24 AM",
    },
    {
      id: 2,
      type: "completion",
      title: "Market research",
      description: "phase completed for Japan",
      timestamp: "Yesterday, 3:45 PM",
    },
    {
      id: 3,
      type: "warning",
      title: "Shipping delay",
      description: "detected at Tokyo port",
      timestamp: "Yesterday, 9:12 AM",
    },
    {
      id: 4,
      type: "buyer",
      title: "New buyer inquiry",
      description: "received for teak furniture",
      timestamp: "Oct 10, 2023, 2:30 PM",
    },
    {
      id: 5,
      type: "deadline",
      title: "Compliance deadline",
      description: "approaching for Certificate of Origin",
      timestamp: "Oct 9, 2023, 11:15 AM",
    },
  ];

  const handleGenerateDocument = (documentId: number) => {
    toast({
      title: "Generating document",
      description: `Starting document generation for ID: ${documentId}`,
    });
  };

  const handleViewDocument = (documentId: number) => {
    toast({
      title: "View document",
      description: `Opening document ID: ${documentId}`,
    });
  };

  const handleDownloadDocument = (documentId: number) => {
    toast({
      title: "Download document",
      description: `Downloading document ID: ${documentId}`,
    });
  };

  const handleViewAllActivities = () => {
    toast({
      title: "View all activities",
      description: "Navigating to activities page",
    });
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

        <main className="flex-1 overflow-y-auto bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600 mt-2 text-lg">Welcome back to your export command center</p>
              </div>
              <div className="hidden md:flex items-center space-x-2">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg px-3 py-1.5 flex items-center">
                  <span className="text-xs font-medium text-blue-600 mr-1.5">Last updated:</span>
                  <span className="text-xs text-gray-700">{new Date().toLocaleDateString()}</span>
                </div>
                <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-md">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 mr-1.5" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Refresh
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatusCard
                title="Active Markets"
                value="3"
                change={{ value: 20, trend: "up" }}
                icon={Globe}
                iconColor="blue"
              />
              <StatusCard
                title="Pending Orders"
                value="7"
                change={{ value: 12, trend: "up" }}
                icon={ShoppingCart}
                iconColor="purple"
              />
              <StatusCard
                title="Shipments in Transit"
                value="4"
                change={{ value: 5, trend: "down" }}
                icon={Truck}
                iconColor="amber"
              />
              <StatusCard
                title="Revenue (Q3)"
                value="$57.4K"
                change={{ value: 8, trend: "up" }}
                icon={DollarSign}
                iconColor="green"
                comparisonText="vs. last quarter"
              />
            </div>

            <ExportProcessGuidance
              projectName="Handcrafted Furniture to Japan"
              progress={60}
              steps={processSteps || mockSteps}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <MarketDemandAnalysis />

              <ExportRiskAssessment
                overallRiskScore={64}
                riskLevel="Medium Risk"
                riskFactors={riskAssessment?.riskFactors || mockRiskFactors}
                mitigationSuggestions={riskAssessment?.mitigationSuggestions || mockMitigationSuggestions}
              />
            </div>

            <ComplianceDocumentation
              projectName="Japan Furniture Export"
              progress={40}
              completedCount={2}
              totalCount={5}
              documents={documents || mockDocuments}
              onGenerateDocument={handleGenerateDocument}
              onViewDocument={handleViewDocument}
              onDownloadDocument={handleDownloadDocument}
            />

            <RecentActivities
              activities={activities || mockActivities}
              onViewAll={handleViewAllActivities}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
