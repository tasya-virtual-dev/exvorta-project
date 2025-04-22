import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { MobileNav } from "@/components/mobile-nav";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  HelpCircleIcon,
  SearchIcon,
  FileIcon,
  FilePlusIcon,
  FileTextIcon,
  CheckCircleIcon,
  DownloadIcon,
  UploadIcon,
  ClockIcon,
  AlertTriangleIcon,
  ChevronRightIcon,
  InfoIcon,
} from "lucide-react";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { generateDocument } from "@/lib/openai";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface DocumentTemplate {
  id: number;
  name: string;
  description: string;
  category: string;
  complexity: "Low" | "Medium" | "High";
}

interface RequiredDocument {
  id: number;
  name: string;
  description: string;
  status: "completed" | "in_progress" | "not_started";
  dueDate: string;
  projectId: number;
  country: string;
}

export default function ComplianceDocs() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("required-docs");
  const [selectedProject, setSelectedProject] = useState("1");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDocumentId, setSelectedDocumentId] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const mockUser = {
    name: "PT Malindo",
    email: "contact@ptmalindo.com",
    exportReadiness: 65,
  };

  // Query required documents for the current project
  const { data: requiredDocuments, isLoading: isLoadingDocuments, refetch } = useQuery({
    queryKey: ["/api/documents/required", selectedProject],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Query document templates
  const { data: documentTemplates, isLoading: isLoadingTemplates } = useQuery({
    queryKey: ["/api/documents/templates"],
    staleTime: 1000 * 60 * 60, // 1 hour (templates don't change often)
  });

  // Mock projects data
  const mockProjects = [
    { id: "1", name: "Handcrafted Furniture to Japan" },
    { id: "2", name: "Textiles Export to United States" },
    { id: "3", name: "Food Products to Singapore" },
  ];

  // Mock document templates
  const mockDocumentTemplates: DocumentTemplate[] = [
    {
      id: 1,
      name: "Commercial Invoice",
      description: "Details of goods being shipped and their monetary value",
      category: "Shipping",
      complexity: "Low",
    },
    {
      id: 2,
      name: "Packing List",
      description: "Itemized list of package contents with quantities and weights",
      category: "Shipping",
      complexity: "Low",
    },
    {
      id: 3,
      name: "Certificate of Origin",
      description: "Document certifying the country of origin for the exported goods",
      category: "Compliance",
      complexity: "Medium",
    },
    {
      id: 4,
      name: "Phytosanitary Certificate",
      description: "Certificate for plant products confirming they meet health standards",
      category: "Compliance",
      complexity: "High",
    },
    {
      id: 5,
      name: "Bill of Lading",
      description: "Receipt of freight services and title document to the shipped goods",
      category: "Shipping",
      complexity: "Medium",
    },
    {
      id: 6,
      name: "Customs Declaration Form",
      description: "Form declaring goods to customs authorities for clearance",
      category: "Customs",
      complexity: "Medium",
    },
    {
      id: 7,
      name: "Letter of Credit",
      description: "Financial document guaranteeing payment for exported goods",
      category: "Finance",
      complexity: "High",
    },
    {
      id: 8,
      name: "Insurance Certificate",
      description: "Proof of insurance coverage for shipped goods",
      category: "Insurance",
      complexity: "Medium",
    },
  ];

  // Mock required documents
  const mockRequiredDocuments: RequiredDocument[] = [
    {
      id: 1,
      name: "Commercial Invoice",
      description: "Details of goods and price",
      status: "completed",
      dueDate: "Oct 15, 2023",
      projectId: 1,
      country: "Japan",
    },
    {
      id: 2,
      name: "Packing List",
      description: "Details of packaged items",
      status: "completed",
      dueDate: "Oct 15, 2023",
      projectId: 1,
      country: "Japan",
    },
    {
      id: 3,
      name: "Certificate of Origin",
      description: "Confirms product origin in Indonesia",
      status: "in_progress",
      dueDate: "Oct 18, 2023",
      projectId: 1,
      country: "Japan",
    },
    {
      id: 4,
      name: "Shipping Bill",
      description: "Export declaration document",
      status: "not_started",
      dueDate: "Oct 20, 2023",
      projectId: 1,
      country: "Japan",
    },
    {
      id: 5,
      name: "Bill of Lading",
      description: "Receipt of freight services",
      status: "not_started",
      dueDate: "Oct 25, 2023",
      projectId: 1,
      country: "Japan",
    },
  ];

  // Use mock data when real data is loading or unavailable
  const documents = requiredDocuments || mockRequiredDocuments;
  const templates = documentTemplates || mockDocumentTemplates;

  // Calculate progress metrics
  const completedCount = documents.filter(doc => doc.status === "completed").length;
  const totalCount = documents.length;
  const progress = Math.round((completedCount / totalCount) * 100);

  // Filter templates based on search and category
  const filteredTemplates = templates.filter(template => {
    if (searchQuery && !template.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (selectedCategory && template.category !== selectedCategory) {
      return false;
    }
    return true;
  });

  // Get document categories for filter
  const categories = Array.from(new Set(templates.map(t => t.category)));

  const handleGenerateDocument = async (documentId: number) => {
    setIsGenerating(true);
    setSelectedDocumentId(documentId);
    
    try {
      const document = documents.find(doc => doc.id === documentId);
      if (!document) return;
      
      // In a real application, this would call the API to generate the document
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call

      toast({
        title: "Document generated",
        description: `${document.name} has been successfully generated.`,
      });
      
      // Refetch the documents list to get updated status
      refetch();
    } catch (error) {
      toast({
        title: "Error generating document",
        description: "There was a problem generating the document. Please try again.",
        variant: "destructive",
      });
      console.error("Error generating document:", error);
    } finally {
      setIsGenerating(false);
      setSelectedDocumentId(null);
    }
  };

  const handleViewDocument = (documentId: number) => {
    const document = documents.find(doc => doc.id === documentId);
    if (!document) return;
    
    toast({
      title: "Opening document",
      description: `Opening ${document.name} for viewing.`,
    });
  };

  const handleDownloadDocument = (documentId: number) => {
    const document = documents.find(doc => doc.id === documentId);
    if (!document) return;
    
    toast({
      title: "Downloading document",
      description: `Downloading ${document.name}.`,
    });
  };

  const handleCreateFromTemplate = (templateId: number) => {
    const template = templates.find(t => t.id === templateId);
    if (!template) return;
    
    toast({
      title: "Creating document",
      description: `Creating new document from ${template.name} template.`,
    });
  };

  const getStatusBadgeClass = (status: RequiredDocument["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-50 text-green-600";
      case "in_progress":
        return "bg-amber-50 text-amber-600";
      case "not_started":
        return "bg-neutral-100 text-neutral-600";
    }
  };

  const getStatusText = (status: RequiredDocument["status"]) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "in_progress":
        return "In Progress";
      case "not_started":
        return "Not Started";
    }
  };

  const getComplexityColor = (complexity: DocumentTemplate["complexity"]) => {
    switch (complexity) {
      case "Low":
        return "text-green-600";
      case "Medium":
        return "text-amber-600";
      case "High":
        return "text-red-600";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header user={mockUser} onOpenMobileMenu={() => setIsMobileNavOpen(true)} />

      <div className="flex flex-1">
        <Sidebar exportReadiness={mockUser.exportReadiness} />

        <MobileNav
          isOpen={isMobileNavOpen}
          onClose={() => setIsMobileNavOpen(false)}
          user={mockUser}
          exportReadiness={mockUser.exportReadiness}
        />

        <main className="flex-1 overflow-y-auto bg-neutral-50">
          <div className="container mx-auto px-4 py-6">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold font-poppins text-neutral-900">Compliance & Documentation</h1>
              <p className="text-neutral-600 mt-1">Manage export documentation and ensure regulatory compliance</p>
            </div>

            <Card className="mb-6 border border-neutral-100">
              <CardContent className="p-5">
                <div className="flex flex-wrap items-center justify-between">
                  <div className="mr-4 mb-2 flex-grow">
                    <Select value={selectedProject} onValueChange={setSelectedProject}>
                      <SelectTrigger className="w-full md:w-64 bg-neutral-50 border border-neutral-200">
                        <SelectValue placeholder="Select export project" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockProjects.map(project => (
                          <SelectItem key={project.id} value={project.id}>{project.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex space-x-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="sm">
                            <HelpCircleIcon className="h-4 w-4 mr-2" />
                            Compliance Guide
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">Get guidance on document requirements</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm">
                          <FilePlusIcon className="h-4 w-4 mr-2" />
                          New Document
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Create New Document</DialogTitle>
                          <DialogDescription>
                            Choose document type to create or upload an existing one.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid grid-cols-1 gap-4 py-4">
                          <Button variant="outline" className="justify-start">
                            <FileTextIcon className="h-4 w-4 mr-2" />
                            Create from Template
                          </Button>
                          <Button variant="outline" className="justify-start">
                            <UploadIcon className="h-4 w-4 mr-2" />
                            Upload Existing Document
                          </Button>
                          <Button variant="outline" className="justify-start">
                            <InfoIcon className="h-4 w-4 mr-2" />
                            Get AI Recommendations
                          </Button>
                        </div>
                        <DialogFooter>
                          <Button variant="outline">Cancel</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="required-docs" value={selectedTab} onValueChange={setSelectedTab} className="mb-8">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="required-docs">Required Documents</TabsTrigger>
                <TabsTrigger value="document-templates">Document Templates</TabsTrigger>
                <TabsTrigger value="compliance-guide">Compliance Guide</TabsTrigger>
              </TabsList>
              
              <TabsContent value="required-docs">
                <Card className="border border-neutral-100">
                  <CardContent className="p-5">
                    <div className="mb-4">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-neutral-800">
                          Required Documents: <span className="text-primary-600">{mockProjects.find(p => p.id === selectedProject)?.name}</span>
                        </p>
                        <Button variant="ghost" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                          <DownloadIcon className="h-4 w-4 mr-1" />
                          Export All
                        </Button>
                      </div>
                      <div className="flex items-center mt-2">
                        <Progress value={progress} className="h-2 flex-grow" />
                        <span className="ml-3 text-sm font-medium text-neutral-700">
                          {completedCount}/{totalCount} Complete
                        </span>
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-neutral-200">
                        <thead className="bg-neutral-50">
                          <tr>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Document</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Required By</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-neutral-200">
                          {documents.map((doc) => (
                            <tr key={doc.id}>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <div className="flex items-center">
                                  <FileIcon className="text-neutral-400 h-4 w-4 mr-2" />
                                  <div>
                                    <div className="text-sm font-medium text-neutral-800">{doc.name}</div>
                                    <div className="text-xs text-neutral-500">{doc.description}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${getStatusBadgeClass(doc.status)}`}>
                                  {getStatusText(doc.status)}
                                </span>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-600">
                                {doc.dueDate}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                                {doc.status === "completed" && (
                                  <>
                                    <Button
                                      variant="link"
                                      className="text-primary-600 hover:text-primary-700 mr-3 p-0 h-auto"
                                      onClick={() => handleViewDocument(doc.id)}
                                    >
                                      View
                                    </Button>
                                    <Button
                                      variant="link"
                                      className="text-neutral-600 hover:text-neutral-700 p-0 h-auto"
                                      onClick={() => handleDownloadDocument(doc.id)}
                                    >
                                      Download
                                    </Button>
                                  </>
                                )}
                                {doc.status === "in_progress" && (
                                  <>
                                    <Button
                                      variant="link"
                                      className="text-primary-600 hover:text-primary-700 mr-3 p-0 h-auto"
                                      onClick={() => handleViewDocument(doc.id)}
                                    >
                                      Continue
                                    </Button>
                                    <Button
                                      variant="link"
                                      className="text-neutral-400 p-0 h-auto"
                                      disabled
                                    >
                                      Download
                                    </Button>
                                  </>
                                )}
                                {doc.status === "not_started" && (
                                  <>
                                    <AlertDialog>
                                      <AlertDialogTrigger asChild>
                                        <Button
                                          variant="link"
                                          className="text-primary-600 hover:text-primary-700 mr-3 p-0 h-auto"
                                          disabled={isGenerating && selectedDocumentId === doc.id}
                                        >
                                          {isGenerating && selectedDocumentId === doc.id ? "Generating..." : "Generate"}
                                        </Button>
                                      </AlertDialogTrigger>
                                      <AlertDialogContent>
                                        <AlertDialogHeader>
                                          <AlertDialogTitle>Generate Document</AlertDialogTitle>
                                          <AlertDialogDescription>
                                            This will create a {doc.name} using AI based on your project details. You'll be able to review and edit before finalizing.
                                          </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                                          <AlertDialogAction onClick={() => handleGenerateDocument(doc.id)}>
                                            Generate
                                          </AlertDialogAction>
                                        </AlertDialogFooter>
                                      </AlertDialogContent>
                                    </AlertDialog>
                                    <Button
                                      variant="link"
                                      className="text-neutral-400 p-0 h-auto"
                                      disabled
                                    >
                                      Download
                                    </Button>
                                  </>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-4 pt-4 border-t border-neutral-100">
                      <Button>
                        Generate Missing Documents
                      </Button>
                      <Button variant="outline" className="ml-3">
                        Upload Existing Document
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="document-templates">
                <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Search templates..."
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 h-4 w-4" />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTemplates.map((template) => (
                    <Card key={template.id} className="border border-neutral-100 transition-colors hover:border-primary-200">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center">
                            <div className="p-2 bg-primary-50 rounded-md mr-3">
                              <FileTextIcon className="h-5 w-5 text-primary-600" />
                            </div>
                            <div>
                              <h3 className="font-medium text-neutral-800">{template.name}</h3>
                              <p className="text-xs text-neutral-500">{template.category}</p>
                            </div>
                          </div>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-7 w-7 p-0"
                                >
                                  <InfoIcon className="h-4 w-4 text-neutral-500" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="text-xs">{template.description}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        
                        <p className="text-sm text-neutral-600 mb-4">{template.description}</p>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-medium">
                            Complexity: <span className={getComplexityColor(template.complexity)}>{template.complexity}</span>
                          </span>
                          <Button
                            size="sm"
                            onClick={() => handleCreateFromTemplate(template.id)}
                          >
                            Use Template
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="compliance-guide">
                <Card className="border border-neutral-100">
                  <CardContent className="p-5">
                    <div className="mb-6">
                      <h2 className="text-lg font-semibold text-neutral-900">Export Compliance Guide</h2>
                      <p className="text-sm text-neutral-600 mt-1">Essential information about regulatory requirements for {mockProjects.find(p => p.id === selectedProject)?.name}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2">
                        <h3 className="text-base font-medium text-neutral-800 mb-3">Document Requirements for Japan</h3>
                        
                        <div className="space-y-4 mb-6">
                          <div className="bg-neutral-50 p-4 rounded-md">
                            <div className="flex">
                              <div className="p-2 bg-primary-100 rounded-full mr-3">
                                <CheckCircleIcon className="h-5 w-5 text-primary-600" />
                              </div>
                              <div>
                                <h4 className="text-sm font-medium text-neutral-800">Commercial Documentation</h4>
                                <p className="text-xs text-neutral-600 mt-1">Japan requires standard commercial documents including commercial invoice, packing list, and bill of lading. All documents must be in English or Japanese.</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-neutral-50 p-4 rounded-md">
                            <div className="flex">
                              <div className="p-2 bg-amber-100 rounded-full mr-3">
                                <AlertTriangleIcon className="h-5 w-5 text-amber-600" />
                              </div>
                              <div>
                                <h4 className="text-sm font-medium text-neutral-800">Special Requirements for Furniture</h4>
                                <p className="text-xs text-neutral-600 mt-1">Wooden furniture requires a certificate stating compliance with Japan's standards for formaldehyde emissions (JIS/JAS standards). Additionally, proof of legal timber sourcing is needed.</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-neutral-50 p-4 rounded-md">
                            <div className="flex">
                              <div className="p-2 bg-neutral-100 rounded-full mr-3">
                                <ClockIcon className="h-5 w-5 text-neutral-600" />
                              </div>
                              <div>
                                <h4 className="text-sm font-medium text-neutral-800">Processing Timeframes</h4>
                                <p className="text-xs text-neutral-600 mt-1">Allow 3-5 business days for Certificate of Origin processing, and 2-3 weeks for JAS certification approval if not already obtained.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <h3 className="text-base font-medium text-neutral-800 mb-3">Regulatory Compliance Checklist</h3>
                        <div className="overflow-x-auto mb-6">
                          <table className="min-w-full divide-y divide-neutral-200">
                            <thead className="bg-neutral-50">
                              <tr>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Requirement</th>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Action Required</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-neutral-200">
                              <tr>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-800">Japanese Safety Standards</td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full bg-green-50 text-green-600">
                                    Compliant
                                  </span>
                                </td>
                                <td className="px-4 py-3 text-sm text-neutral-600">None</td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-800">Formaldehyde Emission Standards</td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full bg-amber-50 text-amber-600">
                                    Pending
                                  </span>
                                </td>
                                <td className="px-4 py-3 text-sm text-neutral-600">Testing required</td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-800">Sustainable Wood Certification</td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full bg-green-50 text-green-600">
                                    Compliant
                                  </span>
                                </td>
                                <td className="px-4 py-3 text-sm text-neutral-600">None</td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-800">Packaging Requirements</td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full bg-red-50 text-red-600">
                                    Non-compliant
                                  </span>
                                </td>
                                <td className="px-4 py-3 text-sm text-neutral-600">Update packaging materials</td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-800">Import Licensing</td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full bg-green-50 text-green-600">
                                    Compliant
                                  </span>
                                </td>
                                <td className="px-4 py-3 text-sm text-neutral-600">None</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-base font-medium text-neutral-800 mb-3">Important Contacts</h3>
                        <Card className="border border-neutral-200 mb-4">
                          <CardContent className="p-4">
                            <h4 className="text-sm font-medium text-neutral-800">Japan Customs</h4>
                            <Separator className="my-2" />
                            <div className="space-y-2 text-sm">
                              <p className="flex justify-between">
                                <span className="text-neutral-600">Website:</span>
                                <a href="#" className="text-primary-600 hover:underline">customs.go.jp</a>
                              </p>
                              <p className="flex justify-between">
                                <span className="text-neutral-600">Phone:</span>
                                <span>+81-3-3456-7890</span>
                              </p>
                              <p className="flex justify-between">
                                <span className="text-neutral-600">Email:</span>
                                <span>inquiry@customs.go.jp</span>
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card className="border border-neutral-200 mb-4">
                          <CardContent className="p-4">
                            <h4 className="text-sm font-medium text-neutral-800">Indonesia Export Authority</h4>
                            <Separator className="my-2" />
                            <div className="space-y-2 text-sm">
                              <p className="flex justify-between">
                                <span className="text-neutral-600">Website:</span>
                                <a href="#" className="text-primary-600 hover:underline">dgned.go.id</a>
                              </p>
                              <p className="flex justify-between">
                                <span className="text-neutral-600">Phone:</span>
                                <span>+62-21-2345-6789</span>
                              </p>
                              <p className="flex justify-between">
                                <span className="text-neutral-600">Email:</span>
                                <span>export@dgned.go.id</span>
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <h3 className="text-base font-medium text-neutral-800 mb-3">Resources</h3>
                        <div className="space-y-3">
                          <a href="#" className="flex items-center p-3 bg-neutral-50 rounded-md hover:bg-neutral-100 transition-colors">
                            <FileTextIcon className="h-4 w-4 text-primary-600 mr-2" />
                            <span className="text-sm text-neutral-800">Japan Import Regulations Guide</span>
                            <ChevronRightIcon className="h-4 w-4 text-neutral-400 ml-auto" />
                          </a>
                          <a href="#" className="flex items-center p-3 bg-neutral-50 rounded-md hover:bg-neutral-100 transition-colors">
                            <FileTextIcon className="h-4 w-4 text-primary-600 mr-2" />
                            <span className="text-sm text-neutral-800">Furniture Export Checklist</span>
                            <ChevronRightIcon className="h-4 w-4 text-neutral-400 ml-auto" />
                          </a>
                          <a href="#" className="flex items-center p-3 bg-neutral-50 rounded-md hover:bg-neutral-100 transition-colors">
                            <FileTextIcon className="h-4 w-4 text-primary-600 mr-2" />
                            <span className="text-sm text-neutral-800">Tariff Schedule and Duties</span>
                            <ChevronRightIcon className="h-4 w-4 text-neutral-400 ml-auto" />
                          </a>
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
