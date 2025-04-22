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
  FileText,
  FileCheck,
  FileClock,
  FileWarning,
  ClipboardCheck,
  Calendar,
  Clock,
  Download,
  Eye,
  PlusCircle,
  ChevronRight,
  Filter,
  AlertCircle,
  CheckCircle,
  HelpCircle,
  Edit,
  MoreHorizontal,
  Paperclip,
  UploadCloud,
  Trash2,
  Sparkles,
  FileQuestion
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ComplianceDocumentation, Document } from "@/components/compliance-documentation";

export default function ComplianceDocumentationPage() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDocumentType, setSelectedDocumentType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [activeTab, setActiveTab] = useState("required");
  const { user } = useAuth();
  
  // Convert user data to format expected by child components
  const userData = {
    username: user?.username || "",
    name: user?.companyName || "",
    companyName: user?.companyName || "",
    email: user?.email || "",
    exportReadiness: user?.exportReadiness || 0,
  };

  // Sample document data
  const mockDocuments: Document[] = [
    {
      id: 1,
      name: "Commercial Invoice",
      type: "required",
      description: "Official invoice for customs and buyer",
      status: "completed",
      dueDate: "2024-03-10",
    },
    {
      id: 2,
      name: "Packing List",
      type: "required",
      description: "Detailed list of package contents",
      status: "completed",
      dueDate: "2024-03-10",
    },
    {
      id: 3,
      name: "Bill of Lading",
      type: "required",
      description: "Transport document issued by carrier",
      status: "in_progress",
      dueDate: "2024-03-15",
    },
    {
      id: 4,
      name: "Certificate of Origin",
      type: "required",
      description: "Document certifying the country of origin",
      status: "in_progress",
      dueDate: "2024-03-15",
    },
    {
      id: 5,
      name: "Insurance Certificate",
      type: "required",
      description: "Proof of cargo insurance coverage",
      status: "not_started",
      dueDate: "2024-03-20",
    },
    {
      id: 6,
      name: "Phytosanitary Certificate",
      type: "conditional",
      description: "Required for plant-based products",
      status: "not_started",
      dueDate: "2024-03-25",
    },
    {
      id: 7,
      name: "Fumigation Certificate",
      type: "conditional",
      description: "Certifies wooden packaging has been treated",
      status: "not_started",
      dueDate: "2024-03-25",
    },
    {
      id: 8,
      name: "Quality Inspection Report",
      type: "optional",
      description: "Third-party quality verification",
      status: "not_started",
      dueDate: "2024-03-30",
    },
    {
      id: 9,
      name: "Dangerous Goods Declaration",
      type: "conditional",
      description: "Required for hazardous materials",
      status: "not_started",
      dueDate: "2024-03-30",
    },
    {
      id: 10,
      name: "Customs Declaration Form",
      type: "required",
      description: "Form for customs clearance",
      status: "not_started",
      dueDate: "2024-03-25",
    },
  ];

  // Filter documents based on search query, type, and status
  const filteredDocuments = mockDocuments.filter(document => {
    // Filter by search query
    if (searchQuery && !document.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by document type
    if (selectedDocumentType !== "all" && document.type !== selectedDocumentType) {
      return false;
    }
    
    // Filter by status
    if (selectedStatus !== "all" && document.status !== selectedStatus) {
      return false;
    }
    
    // Filter by tab
    if (activeTab === "required" && document.type !== "required") {
      return false;
    }
    if (activeTab === "conditional" && document.type !== "conditional") {
      return false;
    }
    if (activeTab === "optional" && document.type !== "optional") {
      return false;
    }
    
    return true;
  });

  // Document templates for AI generation
  const documentTemplates = [
    { id: 1, name: "Commercial Invoice", type: "required", description: "Standard commercial invoice template" },
    { id: 2, name: "Packing List", type: "required", description: "Detailed packing list format" },
    { id: 3, name: "Proforma Invoice", type: "optional", description: "Preliminary invoice for buyer approval" },
    { id: 4, name: "Certificate of Origin Form", type: "required", description: "Official country of origin declaration" },
    { id: 5, name: "Letter of Credit Request", type: "optional", description: "Format for L/C request to bank" },
  ];

  // Calculate document statistics
  const completedCount = filteredDocuments.filter(doc => doc.status === "completed").length;
  const inProgressCount = filteredDocuments.filter(doc => doc.status === "in_progress").length;
  const notStartedCount = filteredDocuments.filter(doc => doc.status === "not_started").length;
  const totalCount = filteredDocuments.length;
  const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Handle document actions
  const handleGenerateDocument = (documentId: number) => {
    console.log(`Generating document ${documentId}`);
    // In a real app, this would trigger AI document generation
  };

  const handleViewDocument = (documentId: number) => {
    console.log(`Viewing document ${documentId}`);
    // In a real app, this would open the document for viewing
  };

  const handleDownloadDocument = (documentId: number) => {
    console.log(`Downloading document ${documentId}`);
    // In a real app, this would download the document
  };

  // Get status color based on document status
  const getStatusColor = (status: Document["status"]) => {
    switch (status) {
      case "completed":
        return "bg-gradient-to-r from-green-500 to-emerald-600 text-white";
      case "in_progress":
        return "bg-gradient-to-r from-amber-500 to-orange-600 text-white";
      case "not_started":
        return "bg-gray-100 text-gray-800 border border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  // Get status icon based on document status
  const getStatusIcon = (status: Document["status"]) => {
    switch (status) {
      case "completed":
        return <FileCheck className="h-4 w-4" />;
      case "in_progress":
        return <FileClock className="h-4 w-4" />;
      case "not_started":
        return <FileWarning className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  // Get document type color
  const getDocumentTypeColor = (type: string) => {
    switch (type) {
      case "required":
        return "bg-blue-100 text-blue-700 border border-blue-200";
      case "conditional":
        return "bg-purple-100 text-purple-700 border border-purple-200";
      case "optional":
        return "bg-gray-100 text-gray-700 border border-gray-200";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-200";
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
                <div className="bg-gradient-to-r from-purple-500 to-violet-600 rounded-lg p-3 text-white shadow-md mr-4">
                  <FileText className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Compliance & Documentation</h1>
                  <p className="text-gray-600 mt-1">Manage all your export documentation and compliance requirements</p>
                </div>
              </div>
              <Button 
                className="mt-4 sm:mt-0 bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white shadow-md hover:shadow-lg transition-all duration-300" 
              >
                <Sparkles className="h-4 w-4 mr-2" />
                AI Document Generation
              </Button>
            </div>

            {/* Main component reuse */}
            <ComplianceDocumentation
              projectName="Handcrafted Furniture Export to Germany"
              progress={progress}
              completedCount={completedCount}
              totalCount={totalCount}
              documents={filteredDocuments}
              onGenerateDocument={handleGenerateDocument}
              onViewDocument={handleViewDocument}
              onDownloadDocument={handleDownloadDocument}
            />

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden">
                  <div className="h-1.5 w-full bg-gradient-to-r from-purple-500 to-violet-600"></div>
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50 border-b border-purple-100">
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="text-xl font-bold text-gray-900">Document Management</CardTitle>
                        <CardDescription className="text-gray-600">
                          Manage, generate, and track all required export documentation
                        </CardDescription>
                      </div>
                      <div className="flex items-center">
                        <div className="rounded-full bg-gradient-to-r from-purple-100 to-violet-100 p-2 mr-2">
                          <ClipboardCheck className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-800">
                            {completedCount} of {totalCount} Documents Complete
                          </div>
                          <Progress 
                            value={progress} 
                            className="h-2 mt-1 bg-gray-100 w-32" 
                            indicatorClassName="bg-gradient-to-r from-purple-500 to-violet-600"
                          />
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <div className="p-4 bg-white border-b border-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="relative">
                        <Input
                          type="text"
                          placeholder="Search documents..."
                          className="pl-9 border-gray-200 focus:border-purple-300 shadow-sm"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      </div>
                      <Select value={selectedDocumentType} onValueChange={setSelectedDocumentType}>
                        <SelectTrigger className="border-gray-200 focus:border-purple-300 shadow-sm">
                          <SelectValue placeholder="All Document Types" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Document Types</SelectItem>
                          <SelectItem value="required">Required</SelectItem>
                          <SelectItem value="conditional">Conditional</SelectItem>
                          <SelectItem value="optional">Optional</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                        <SelectTrigger className="border-gray-200 focus:border-purple-300 shadow-sm">
                          <SelectValue placeholder="All Statuses" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Statuses</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="in_progress">In Progress</SelectItem>
                          <SelectItem value="not_started">Not Started</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="border-b border-gray-100">
                    <Tabs defaultValue="required" value={activeTab} onValueChange={setActiveTab} className="w-full">
                      <TabsList className="w-full justify-start bg-white px-4 pt-2">
                        <TabsTrigger 
                          value="all" 
                          className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-purple-500 data-[state=active]:text-purple-600 rounded-none px-4"
                        >
                          All Documents
                        </TabsTrigger>
                        <TabsTrigger 
                          value="required" 
                          className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-purple-500 data-[state=active]:text-purple-600 rounded-none px-4"
                        >
                          Required
                        </TabsTrigger>
                        <TabsTrigger 
                          value="conditional" 
                          className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-purple-500 data-[state=active]:text-purple-600 rounded-none px-4"
                        >
                          Conditional
                        </TabsTrigger>
                        <TabsTrigger 
                          value="optional" 
                          className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-purple-500 data-[state=active]:text-purple-600 rounded-none px-4"
                        >
                          Optional
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                  
                  <CardContent className="p-0">
                    {filteredDocuments.length === 0 ? (
                      <div className="flex flex-col items-center justify-center p-8 text-center">
                        <div className="rounded-full bg-gradient-to-r from-purple-100 to-violet-100 p-3 mb-4 shadow-sm">
                          <FileQuestion className="h-6 w-6 text-purple-500" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-800 mb-2">No documents found</h3>
                        <p className="text-gray-600 mb-4">
                          Try adjusting your filters or add new documents for this export project.
                        </p>
                        <Button className="bg-gradient-to-r from-purple-500 to-violet-600 text-white">
                          <PlusCircle className="h-4 w-4 mr-2" />
                          Add New Document
                        </Button>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-gray-50">
                              <TableHead className="w-[300px]">Document Name</TableHead>
                              <TableHead>Type</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Due Date</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredDocuments.map((document) => (
                              <TableRow key={document.id} className="hover:bg-gray-50">
                                <TableCell className="font-medium">
                                  <div className="flex items-center">
                                    <div className={`p-2 rounded-full mr-3 ${
                                      document.status === "completed" 
                                        ? "bg-green-100" 
                                        : document.status === "in_progress" 
                                          ? "bg-amber-100" 
                                          : "bg-gray-100"
                                    }`}>
                                      {getStatusIcon(document.status)}
                                    </div>
                                    <div>
                                      <div className="text-gray-900">{document.name}</div>
                                      <div className="text-xs text-gray-500">{document.description}</div>
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <Badge className={getDocumentTypeColor(document.type)}>
                                    {document.type.charAt(0).toUpperCase() + document.type.slice(1)}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  <Badge className={getStatusColor(document.status)}>
                                    {document.status === "completed" 
                                      ? "Completed" 
                                      : document.status === "in_progress" 
                                        ? "In Progress" 
                                        : "Not Started"}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center">
                                    <Calendar className="h-4 w-4 mr-1.5 text-gray-400" />
                                    <span className="text-gray-700">
                                      {new Date(document.dueDate).toLocaleDateString()}
                                    </span>
                                  </div>
                                </TableCell>
                                <TableCell className="text-right">
                                  <div className="flex items-center justify-end space-x-2">
                                    {document.status === "completed" && (
                                      <>
                                        <Button variant="outline" size="sm" className="h-8 px-2 text-gray-700 border-gray-200" onClick={() => handleViewDocument(document.id)}>
                                          <Eye className="h-3.5 w-3.5 mr-1" />
                                          View
                                        </Button>
                                        <Button variant="outline" size="sm" className="h-8 px-2 text-gray-700 border-gray-200" onClick={() => handleDownloadDocument(document.id)}>
                                          <Download className="h-3.5 w-3.5 mr-1" />
                                          Download
                                        </Button>
                                      </>
                                    )}
                                    {document.status === "in_progress" && (
                                      <>
                                        <Button variant="outline" size="sm" className="h-8 px-2 text-gray-700 border-gray-200" onClick={() => handleViewDocument(document.id)}>
                                          <Eye className="h-3.5 w-3.5 mr-1" />
                                          View Draft
                                        </Button>
                                        <Button size="sm" className="h-8 px-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white" onClick={() => handleGenerateDocument(document.id)}>
                                          <Edit className="h-3.5 w-3.5 mr-1" />
                                          Edit
                                        </Button>
                                      </>
                                    )}
                                    {document.status === "not_started" && (
                                      <Button size="sm" className="h-8 px-2 bg-gradient-to-r from-purple-500 to-violet-600 text-white" onClick={() => handleGenerateDocument(document.id)}>
                                        <Sparkles className="h-3.5 w-3.5 mr-1" />
                                        Generate
                                      </Button>
                                    )}
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                          <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Document Actions</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                          <Edit className="h-4 w-4 mr-2" />
                                          <span>Edit</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                          <Paperclip className="h-4 w-4 mr-2" />
                                          <span>Attach Files</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                          <UploadCloud className="h-4 w-4 mr-2" />
                                          <span>Upload New Version</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="text-red-600">
                                          <Trash2 className="h-4 w-4 mr-2" />
                                          <span>Delete</span>
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden mb-6">
                  <div className="h-1 w-full bg-gradient-to-r from-purple-500 to-violet-600"></div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
                      <Sparkles className="h-5 w-5 mr-2 text-purple-500" />
                      AI Document Templates
                    </CardTitle>
                    <CardDescription>
                      Generate export documents with AI assistance
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y divide-gray-100">
                      {documentTemplates.map((template) => (
                        <div 
                          key={template.id} 
                          className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer"
                        >
                          <div className="flex items-start">
                            <div className="bg-purple-100 p-2 rounded-full mr-3">
                              <FileText className="h-4 w-4 text-purple-600" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-800">{template.name}</div>
                              <div className="text-xs text-gray-500 mt-0.5">{template.description}</div>
                            </div>
                          </div>
                          <ChevronRight className="h-5 w-5 text-gray-400" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="bg-gray-50 px-4 py-3 border-t border-gray-100">
                    <Button className="w-full bg-gradient-to-r from-purple-500 to-violet-600 text-white">
                      <Sparkles className="h-4 w-4 mr-2" />
                      Generate New Document
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden">
                  <div className="h-1 w-full bg-gradient-to-r from-purple-500 to-violet-600"></div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
                      <HelpCircle className="h-5 w-5 mr-2 text-purple-500" />
                      Compliance Guide
                    </CardTitle>
                    <CardDescription>
                      Essential information about required documentation
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-100 rounded-lg p-4">
                        <h4 className="text-sm font-semibold text-gray-800 mb-2 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1.5 text-purple-500" />
                          EU Import Requirements
                        </h4>
                        <p className="text-xs text-gray-600">
                          Wooden furniture exports to the EU must comply with EUTR regulations
                          and provide proper CE marking documentation for applicable products.
                        </p>
                        <Button variant="link" className="text-xs p-0 h-auto mt-1 text-purple-600">
                          Learn more about EU requirements
                        </Button>
                      </div>
                      
                      <div className="bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-100 rounded-lg p-4">
                        <h4 className="text-sm font-semibold text-gray-800 mb-2 flex items-center">
                          <Clock className="h-4 w-4 mr-1.5 text-purple-500" />
                          Document Timeline
                        </h4>
                        <ul className="space-y-2 text-xs text-gray-600">
                          <li className="flex justify-between">
                            <span>Commercial Invoice:</span>
                            <span className="font-medium">7 days before shipping</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Packing List:</span>
                            <span className="font-medium">7 days before shipping</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Certificate of Origin:</span>
                            <span className="font-medium">5 days before shipping</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Bill of Lading:</span>
                            <span className="font-medium">At shipping</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-100 rounded-lg p-4">
                        <h4 className="text-sm font-semibold text-gray-800 mb-2 flex items-center">
                          <CheckCircle className="h-4 w-4 mr-1.5 text-purple-500" />
                          Compliance Checklist
                        </h4>
                        <ul className="space-y-1 text-xs text-gray-600">
                          <li className="flex items-center">
                            <CheckCircle className="h-3 w-3 mr-1.5 text-green-500" />
                            Product meets EU technical standards
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="h-3 w-3 mr-1.5 text-green-500" />
                            Wood sourcing documentation complete
                          </li>
                          <li className="flex items-center">
                            <AlertCircle className="h-3 w-3 mr-1.5 text-amber-500" />
                            REACH compliance certification pending
                          </li>
                          <li className="flex items-center">
                            <AlertCircle className="h-3 w-3 mr-1.5 text-amber-500" />
                            German packaging regulations review
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}