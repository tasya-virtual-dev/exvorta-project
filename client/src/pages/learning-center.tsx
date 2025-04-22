import { useState } from "react";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { MobileNav } from "@/components/mobile-nav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  GraduationCap,
  BookOpen,
  FileText,
  Play,
  Clock,
  Calendar,
  Users,
  Award,
  BookOpenCheck,
  CheckCircle,
  ChevronRight,
  Download,
  ExternalLink,
  Filter,
  HelpCircle,
  Info,
  MessageSquare,
  Paperclip,
  PlusCircle,
  Star,
  ThumbsUp,
  Sparkles,
  Globe,
  CircleCheck,
  ArrowRight,
  LucideIcon,
  Lightbulb,
  BrainCircuit,
  Flame
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Resource {
  id: number;
  title: string;
  type: "article" | "video" | "guide" | "webinar" | "template";
  category: string;
  description: string;
  content?: string;
  duration?: string;
  date?: string;
  author?: string;
  thumbnail?: string;
  url?: string;
  popular: boolean;
  completed: boolean;
  tags: string[];
}

interface Course {
  id: number;
  title: string;
  instructor: string;
  description: string;
  duration: string;
  level: "beginner" | "intermediate" | "advanced";
  completed: boolean;
  progress: number;
  modules: {
    title: string;
    duration: string;
    completed: boolean;
  }[];
  thumbnail?: string;
}

export default function LearningCenter() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [activeTab, setActiveTab] = useState("resources");
  const [aiPrompt, setAiPrompt] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const { user } = useAuth();
  
  // Convert user data to format expected by child components
  const userData = {
    username: user?.username || "",
    name: user?.companyName || "",
    companyName: user?.companyName || "",
    email: user?.email || "",
    exportReadiness: user?.exportReadiness || 0,
  };

  // Sample resources data
  const mockResources: Resource[] = [
    {
      id: 1,
      title: "Complete Guide to Export Documentation",
      type: "guide",
      category: "documentation",
      description: "Learn about all essential export documents: commercial invoices, packing lists, certificates of origin, and more.",
      duration: "45 min read",
      author: "Export Documentation Team",
      popular: true,
      completed: true,
      tags: ["Documentation", "Compliance", "Beginner"]
    },
    {
      id: 2,
      title: "Navigating International Shipping Terms",
      type: "article",
      category: "logistics",
      description: "Understanding Incoterms 2020: A comprehensive overview of shipping terms and what they mean for exporters.",
      duration: "25 min read",
      author: "Logistics Expert Network",
      popular: true,
      completed: false,
      tags: ["Logistics", "Incoterms", "Shipping"]
    },
    {
      id: 3,
      title: "Market Entry Strategies for European Union",
      type: "webinar",
      category: "market-entry",
      description: "Recorded webinar featuring experts discussing the best approaches to enter European markets.",
      duration: "58 minutes",
      date: "2024-02-10",
      popular: false,
      completed: false,
      tags: ["Market Entry", "Europe", "Strategy"]
    },
    {
      id: 4,
      title: "Export Pricing Calculator Template",
      type: "template",
      category: "finance",
      description: "Downloadable Excel template to help calculate export pricing including all costs and desired margins.",
      author: "Finance Advisory Team",
      popular: true,
      completed: false,
      tags: ["Finance", "Pricing", "Tools"]
    },
    {
      id: 5,
      title: "Understanding Export Quality Requirements",
      type: "video",
      category: "compliance",
      description: "Video tutorial explaining international quality standards and certifications needed for different markets.",
      duration: "32 minutes",
      author: "Quality Assurance Experts",
      popular: false,
      completed: false,
      tags: ["Quality", "Compliance", "Standards"]
    },
    {
      id: 6,
      title: "How to Conduct International Market Research",
      type: "guide",
      category: "market-research",
      description: "Step-by-step guide to conducting effective market research for international expansion.",
      duration: "35 min read",
      author: "Market Research Team",
      popular: false,
      completed: true,
      tags: ["Market Research", "Strategy", "Intermediate"]
    },
    {
      id: 7,
      title: "Cultural Considerations in Business Negotiations",
      type: "article",
      category: "business-culture",
      description: "Learn about cultural differences that impact international business negotiations and how to navigate them.",
      duration: "20 min read",
      author: "Cross-Cultural Business Consultant",
      popular: true,
      completed: false,
      tags: ["Business Culture", "Negotiations", "Soft Skills"]
    },
    {
      id: 8,
      title: "Introduction to Letters of Credit",
      type: "video",
      category: "finance",
      description: "Video explaining how letters of credit work and their importance in international trade.",
      duration: "28 minutes",
      author: "Trade Finance Specialists",
      popular: true,
      completed: true,
      tags: ["Finance", "Payment Methods", "Beginner"]
    }
  ];

  // Sample courses data
  const mockCourses: Course[] = [
    {
      id: 1,
      title: "Export Fundamentals",
      instructor: "Dr. Sarah Chen",
      description: "Learn the basics of exporting: processes, documentation, regulations, and best practices for new exporters.",
      duration: "8 hours",
      level: "beginner",
      completed: false,
      progress: 65,
      modules: [
        { title: "Introduction to Exporting", duration: "45 min", completed: true },
        { title: "Export Documentation Basics", duration: "1.5 hours", completed: true },
        { title: "International Shipping", duration: "2 hours", completed: true },
        { title: "Payment Methods", duration: "1.5 hours", completed: false },
        { title: "Compliance Fundamentals", duration: "1.5 hours", completed: false },
        { title: "Export Strategy Development", duration: "1 hour", completed: false }
      ]
    },
    {
      id: 2,
      title: "Advanced Market Entry Strategies",
      instructor: "Prof. James Wilson",
      description: "Develop sophisticated strategies for entering new international markets, including market selection, entry modes, and market positioning.",
      duration: "12 hours",
      level: "advanced",
      completed: false,
      progress: 25,
      modules: [
        { title: "Market Selection Frameworks", duration: "1.5 hours", completed: true },
        { title: "Competitive Analysis", duration: "2 hours", completed: true },
        { title: "Entry Mode Selection", duration: "2.5 hours", completed: false },
        { title: "Partner Evaluation & Selection", duration: "2 hours", completed: false },
        { title: "Market Positioning Strategy", duration: "2 hours", completed: false },
        { title: "Market Entry Implementation", duration: "2 hours", completed: false }
      ]
    },
    {
      id: 3,
      title: "Export Compliance Mastery",
      instructor: "Maria Rodriguez, Compliance Expert",
      description: "Comprehensive guide to navigating export compliance regulations, documentation requirements, and risk management strategies.",
      duration: "10 hours",
      level: "intermediate",
      completed: false,
      progress: 40,
      modules: [
        { title: "Export Control Regulations", duration: "2 hours", completed: true },
        { title: "Product Classification", duration: "1.5 hours", completed: true },
        { title: "Restricted Party Screening", duration: "1 hour", completed: false },
        { title: "Documentation & Record Keeping", duration: "2 hours", completed: false },
        { title: "Compliance Program Development", duration: "2 hours", completed: false },
        { title: "Audit Preparation & Response", duration: "1.5 hours", completed: false }
      ]
    }
  ];

  // Filter resources based on search query, category, and type
  const filteredResources = mockResources.filter(resource => {
    // Filter by search query
    if (searchQuery && 
        !resource.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !resource.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by category
    if (selectedCategory !== "all" && resource.category !== selectedCategory) {
      return false;
    }
    
    // Filter by type
    if (selectedType !== "all" && resource.type !== selectedType) {
      return false;
    }
    
    return true;
  });

  // Categorize resources for UI display
  const popularResources = filteredResources.filter(r => r.popular);
  const completedResources = filteredResources.filter(r => r.completed);
  const documentationResources = filteredResources.filter(r => r.category === "documentation");
  const financeResources = filteredResources.filter(r => r.category === "finance");
  const logisticsResources = filteredResources.filter(r => r.category === "logistics");

  // Handle AI prompt submission
  const handleAIPromptSubmit = () => {
    if (!aiPrompt.trim()) return;
    
    setIsAiLoading(true);
    setAiResponse(null);
    
    // Simulate AI response with a timeout
    setTimeout(() => {
      // Predefined response based on prompt keywords
      let response = "";
      
      if (aiPrompt.toLowerCase().includes("documentation")) {
        response = "# Export Documentation Guide\n\nEssential export documents include:\n\n1. **Commercial Invoice**: Contains transaction details including description, quantity, and value of goods.\n\n2. **Packing List**: Itemized list of package contents with weights and dimensions.\n\n3. **Certificate of Origin**: Confirms where products were manufactured, important for tariff rates.\n\n4. **Bill of Lading**: Contract of carriage between freight company and shipper.\n\n5. **Export License**: Required for controlled items, varies by country and product.\n\nFor Indonesian exporters, documents should be prepared at least 7 days before shipping. Consider using a document management system to track completion status.";
      } 
      else if (aiPrompt.toLowerCase().includes("incoterms")) {
        response = "# Understanding Incoterms 2020\n\nIncoterms are international commercial terms that define responsibilities between buyers and sellers:\n\n- **EXW (Ex Works)**: Minimal responsibility for the seller; buyer handles everything from pickup onward.\n\n- **FOB (Free on Board)**: Seller handles export clearance and delivers goods on vessel; buyer responsible from shipping onward.\n\n- **CIF (Cost, Insurance, Freight)**: Seller pays for freight and insurance to destination port; buyer handles import clearance.\n\n- **DDP (Delivered Duty Paid)**: Maximum seller responsibility; seller delivers goods cleared for import to named destination.\n\nFor Indonesian furniture exporters, FOB and CIF terms are most commonly used in international transactions.";
      }
      else if (aiPrompt.toLowerCase().includes("market") || aiPrompt.toLowerCase().includes("europe")) {
        response = "# European Market Entry Strategy\n\nFor Indonesian furniture exporters entering the European market:\n\n1. **Regulatory Preparation**: Ensure compliance with EU Timber Regulation (EUTR) and REACH chemical regulations.\n\n2. **Certification**: Obtain FSC or PEFC certification for sustainable sourcing, increasingly important for EU buyers.\n\n3. **Market Selection**: Start with specific countries rather than the entire EU. Germany, Netherlands, and UK have strong demand for Indonesian furniture.\n\n4. **Entry Options**:\n   - Direct export to retailers\n   - Partner with wholesale distributors\n   - E-commerce marketplaces\n   - Trade shows (like Ambiente in Frankfurt)\n\n5. **Pricing Strategy**: European consumers typically value sustainability and craftsmanship over low prices. Premium positioning is recommended for handcrafted items.";
      }
      else if (aiPrompt.toLowerCase().includes("pricing") || aiPrompt.toLowerCase().includes("cost")) {
        response = "# Export Pricing Strategy\n\nCalculating export pricing formula:\n\n```\nExport Price = Production Cost + Domestic Overhead + Export Overhead + Freight & Insurance + Customs & Duties + Desired Margin\n```\n\nKey considerations for Indonesian furniture exporters:\n\n1. **Cost Components**:\n   - Materials and labor\n   - Export packaging (must be sturdier than domestic)\n   - Export documentation fees\n   - Transportation to port\n   - International shipping\n   - Insurance (typically 110% of goods value)\n   - Import duties in destination market\n\n2. **Pricing Strategies**:\n   - Cost-plus: Add standard markup to costs\n   - Market-based: Price according to target market conditions\n   - Value-based: Price based on perceived customer value\n\n3. **Market-Specific Adjustments**: European markets typically support higher margins for sustainably produced items.";
      }
      else {
        response = "I can provide information on various export topics including documentation requirements, shipping terms, market entry strategies, pricing calculations, compliance regulations, and more. Please ask a specific question related to your export activities, and I'll provide detailed guidance.";
      }
      
      setAiResponse(response);
      setIsAiLoading(false);
    }, 1500);
  };

  // Get icon by resource type
  const getResourceTypeIcon = (type: Resource['type']): LucideIcon => {
    switch (type) {
      case 'article':
        return FileText;
      case 'video':
        return Play;
      case 'guide':
        return BookOpen;
      case 'webinar':
        return Users;
      case 'template':
        return Paperclip;
      default:
        return FileText;
    }
  };

  // Format course level with appropriate color
  const formatCourseLevel = (level: Course['level']) => {
    switch (level) {
      case 'beginner':
        return <Badge className="bg-green-100 text-green-700 border border-green-200">Beginner</Badge>;
      case 'intermediate':
        return <Badge className="bg-blue-100 text-blue-700 border border-blue-200">Intermediate</Badge>;
      case 'advanced':
        return <Badge className="bg-purple-100 text-purple-700 border border-purple-200">Advanced</Badge>;
      default:
        return null;
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
                <div className="bg-gradient-to-r from-indigo-500 to-violet-600 rounded-lg p-3 text-white shadow-md mr-4">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Learning Center</h1>
                  <p className="text-gray-600 mt-1">Export knowledge resources and AI-powered assistance</p>
                </div>
              </div>
              <div className="mt-4 sm:mt-0 flex space-x-3">
                <Button variant="outline" className="border-indigo-200 text-indigo-700 hover:bg-indigo-50">
                  <Calendar className="h-4 w-4 mr-2" />
                  My Courses
                </Button>
                <Button 
                  className="bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white shadow-md hover:shadow-lg transition-all duration-300" 
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Join Live Webinar
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2 space-y-6">
                <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden">
                  <div className="h-1.5 w-full bg-gradient-to-r from-indigo-500 to-violet-600"></div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
                          <Sparkles className="h-5 w-5 mr-2 text-indigo-500" />
                          AI Export Assistant
                        </CardTitle>
                        <CardDescription>Get instant answers to your export questions</CardDescription>
                      </div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <HelpCircle className="h-4 w-4 text-gray-400" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs max-w-xs">Powered by AI to provide instant guidance on export topics like documentation, regulations, and market entry strategies</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-lg border border-gray-200 bg-white p-4">
                      <div className="flex space-x-2 mb-2">
                        <Badge className="bg-indigo-100 text-indigo-700 border border-indigo-200">documentation</Badge>
                        <Badge className="bg-indigo-100 text-indigo-700 border border-indigo-200">incoterms</Badge>
                        <Badge className="bg-indigo-100 text-indigo-700 border border-indigo-200">market entry</Badge>
                        <Badge className="bg-indigo-100 text-indigo-700 border border-indigo-200">pricing</Badge>
                      </div>
                      <div className="flex space-x-2">
                        <Textarea 
                          placeholder="Ask about export documentation, market requirements, pricing strategies, etc."
                          value={aiPrompt}
                          onChange={(e) => setAiPrompt(e.target.value)}
                          className="flex-1 border-gray-200 focus:border-indigo-300 shadow-sm"
                          rows={2}
                        />
                        <Button 
                          className="bg-gradient-to-r from-indigo-500 to-violet-600 text-white hover:from-indigo-600 hover:to-violet-700"
                          onClick={handleAIPromptSubmit}
                          disabled={isAiLoading || !aiPrompt.trim()}
                        >
                          {isAiLoading ? (
                            <span className="flex items-center">
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Processing
                            </span>
                          ) : (
                            <span className="flex items-center">
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Ask AI
                            </span>
                          )}
                        </Button>
                      </div>
                    </div>

                    {aiResponse && (
                      <div className="mt-4 bg-gradient-to-r from-indigo-50 to-violet-50 rounded-lg border border-indigo-100 p-4 shadow-sm">
                        <div className="flex items-center mb-3">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 flex items-center justify-center text-white shadow-sm mr-3">
                            <BrainCircuit className="h-4 w-4" />
                          </div>
                          <h3 className="font-semibold text-gray-800">AI Export Assistant</h3>
                        </div>
                        <div className="prose prose-sm max-w-none">
                          {aiResponse.split('\n\n').map((paragraph, idx) => {
                            if (paragraph.startsWith('#')) {
                              // Heading
                              return <h3 key={idx} className="text-lg font-semibold text-gray-800 mb-2">{paragraph.replace(/^# /, '')}</h3>;
                            } else if (paragraph.startsWith('```') && paragraph.endsWith('```')) {
                              // Code block
                              return (
                                <div key={idx} className="bg-gray-800 text-gray-100 p-3 rounded-md my-2 font-mono text-sm overflow-x-auto">
                                  {paragraph.replace(/^```/, '').replace(/```$/, '')}
                                </div>
                              );
                            } else if (paragraph.includes('**')) {
                              // Bold text within paragraphs
                              const parts = paragraph.split(/(\*\*[^*]+\*\*)/g);
                              return (
                                <p key={idx} className="text-gray-700 mb-2">
                                  {parts.map((part, pidx) => {
                                    if (part.startsWith('**') && part.endsWith('**')) {
                                      return <strong key={pidx} className="text-gray-900">{part.replace(/^\*\*|\*\*$/g, '')}</strong>;
                                    }
                                    return part;
                                  })}
                                </p>
                              );
                            } else if (paragraph.startsWith('-') || paragraph.startsWith('1.')) {
                              // List items
                              return <p key={idx} className="text-gray-700 mb-2 ml-4">{paragraph}</p>;
                            } else {
                              // Regular paragraph
                              return <p key={idx} className="text-gray-700 mb-2">{paragraph}</p>;
                            }
                          })}
                        </div>
                        <div className="flex justify-between items-center mt-4 pt-3 border-t border-indigo-100">
                          <div className="flex items-center space-x-3">
                            <Button variant="outline" size="sm" className="h-8 border-indigo-200 text-indigo-700 hover:bg-indigo-50">
                              <ThumbsUp className="h-3.5 w-3.5 mr-1" />
                              Helpful
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 text-gray-500 hover:text-gray-700">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                              </svg>
                              Feedback
                            </Button>
                          </div>
                          <span className="text-xs text-gray-500">Powered by AI, information may require verification</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Tabs defaultValue="resources" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-2 bg-white border border-gray-100 p-1 shadow-sm rounded-xl">
                    <TabsTrigger 
                      value="resources" 
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-violet-600 data-[state=active]:text-white rounded-md transition-all duration-200 flex items-center"
                    >
                      <BookOpen className="h-4 w-4 mr-2" />
                      Resources Library
                    </TabsTrigger>
                    <TabsTrigger 
                      value="courses" 
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-violet-600 data-[state=active]:text-white rounded-md transition-all duration-200 flex items-center"
                    >
                      <GraduationCap className="h-4 w-4 mr-2" />
                      Online Courses
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="resources" className="mt-6">
                    <Card className="border border-gray-100 shadow-sm">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg font-semibold text-gray-800">Export Resources</CardTitle>
                          <div className="flex items-center space-x-2">
                            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                              <SelectTrigger className="h-8 text-xs border-gray-200 shadow-sm w-32">
                                <SelectValue placeholder="All Categories" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">All Categories</SelectItem>
                                <SelectItem value="documentation">Documentation</SelectItem>
                                <SelectItem value="market-entry">Market Entry</SelectItem>
                                <SelectItem value="logistics">Logistics</SelectItem>
                                <SelectItem value="finance">Finance</SelectItem>
                                <SelectItem value="compliance">Compliance</SelectItem>
                                <SelectItem value="market-research">Market Research</SelectItem>
                                <SelectItem value="business-culture">Business Culture</SelectItem>
                              </SelectContent>
                            </Select>
                            <Select value={selectedType} onValueChange={setSelectedType}>
                              <SelectTrigger className="h-8 text-xs border-gray-200 shadow-sm w-28">
                                <SelectValue placeholder="All Types" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">All Types</SelectItem>
                                <SelectItem value="article">Articles</SelectItem>
                                <SelectItem value="video">Videos</SelectItem>
                                <SelectItem value="guide">Guides</SelectItem>
                                <SelectItem value="webinar">Webinars</SelectItem>
                                <SelectItem value="template">Templates</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="relative mt-3">
                          <Input
                            placeholder="Search resources..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 border-gray-200 focus:border-indigo-300 shadow-sm"
                          />
                          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        </div>
                      </CardHeader>
                      <CardContent className="p-0">
                        {filteredResources.length === 0 ? (
                          <div className="p-6 text-center">
                            <div className="rounded-full bg-indigo-100 p-3 mx-auto mb-4 w-fit">
                              <SearchIcon className="h-6 w-6 text-indigo-500" />
                            </div>
                            <h3 className="text-base font-medium text-gray-800 mb-1">No resources found</h3>
                            <p className="text-sm text-gray-600">Try adjusting your search or filters</p>
                          </div>
                        ) : (
                          <div className="divide-y divide-gray-100">
                            {filteredResources.map((resource) => {
                              const ResourceIcon = getResourceTypeIcon(resource.type);
                              return (
                                <div key={resource.id} className="p-4 hover:bg-gray-50">
                                  <div className="flex">
                                    <div className={`h-10 w-10 rounded-lg mr-4 flex items-center justify-center ${
                                      resource.type === 'article' ? 'bg-blue-100 text-blue-600' :
                                      resource.type === 'guide' ? 'bg-purple-100 text-purple-600' :
                                      resource.type === 'video' ? 'bg-red-100 text-red-600' :
                                      resource.type === 'webinar' ? 'bg-green-100 text-green-600' :
                                      'bg-amber-100 text-amber-600'
                                    }`}>
                                      <ResourceIcon className="h-5 w-5" />
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex items-start justify-between">
                                        <div>
                                          <h3 className="font-medium text-gray-900">{resource.title}</h3>
                                          <p className="text-sm text-gray-500 mt-1">{resource.description}</p>
                                        </div>
                                        {resource.completed && (
                                          <Badge className="bg-green-100 text-green-700 flex items-center h-fit">
                                            <CheckCircle className="h-3 w-3 mr-1" />
                                            Completed
                                          </Badge>
                                        )}
                                      </div>
                                      <div className="flex flex-wrap items-center mt-3 space-x-3 text-xs text-gray-500">
                                        <Badge className={`capitalize ${
                                          resource.type === 'article' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                                          resource.type === 'guide' ? 'bg-purple-50 text-purple-700 border border-purple-100' :
                                          resource.type === 'video' ? 'bg-red-50 text-red-700 border border-red-100' :
                                          resource.type === 'webinar' ? 'bg-green-50 text-green-700 border border-green-100' :
                                          'bg-amber-50 text-amber-700 border border-amber-100'
                                        }`}>
                                          {resource.type}
                                        </Badge>
                                        {resource.duration && (
                                          <span className="flex items-center">
                                            <Clock className="h-3 w-3 mr-1" />
                                            {resource.duration}
                                          </span>
                                        )}
                                        {resource.author && (
                                          <span className="flex items-center">
                                            <Users className="h-3 w-3 mr-1" />
                                            {resource.author}
                                          </span>
                                        )}
                                        {resource.date && (
                                          <span className="flex items-center">
                                            <Calendar className="h-3 w-3 mr-1" />
                                            {new Date(resource.date).toLocaleDateString()}
                                          </span>
                                        )}
                                        {resource.popular && (
                                          <span className="flex items-center text-amber-600">
                                            <Flame className="h-3 w-3 mr-1" />
                                            Popular
                                          </span>
                                        )}
                                      </div>
                                      <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
                                        <div className="flex space-x-2">
                                          {resource.tags.map((tag, idx) => (
                                            <Badge key={idx} variant="outline" className="text-xs bg-transparent border-gray-200 text-gray-700">
                                              {tag}
                                            </Badge>
                                          ))}
                                        </div>
                                        <Button variant="outline" size="sm" className="h-7 text-xs border-indigo-200 text-indigo-700 hover:bg-indigo-50">
                                          {resource.completed ? "Review Again" : "View Resource"}
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="courses" className="mt-6 space-y-6">
                    {mockCourses.map((course) => (
                      <Card key={course.id} className="border border-gray-100 shadow-sm overflow-hidden">
                        <div className="h-1 w-full bg-gradient-to-r from-indigo-500 to-violet-600"></div>
                        <div className="flex flex-col md:flex-row">
                          <div className="p-5 flex-1">
                            <div className="flex justify-between">
                              <div>
                                <h3 className="text-lg font-semibold text-gray-800">{course.title}</h3>
                                <div className="flex items-center mt-1 text-sm text-gray-500">
                                  <Users className="h-4 w-4 mr-1.5" />
                                  <span>{course.instructor}</span>
                                </div>
                              </div>
                              <div className="flex flex-col items-end">
                                {formatCourseLevel(course.level)}
                                <div className="flex items-center mt-1.5 text-sm text-gray-500">
                                  <Clock className="h-4 w-4 mr-1.5" />
                                  <span>{course.duration}</span>
                                </div>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 mt-3">{course.description}</p>
                            <div className="mt-4">
                              <div className="flex justify-between mb-1.5 text-sm">
                                <span className="font-medium text-gray-700">Progress</span>
                                <span className="text-indigo-700">{course.progress}%</span>
                              </div>
                              <Progress value={course.progress} className="h-2" indicatorClassName="bg-gradient-to-r from-indigo-500 to-violet-600" />
                            </div>
                          </div>
                          <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-5 md:w-72 border-t md:border-l border-gray-100">
                            <h4 className="font-medium text-gray-800 mb-3">Course Modules</h4>
                            <div className="space-y-2.5">
                              {course.modules.slice(0, 3).map((module, idx) => (
                                <div key={idx} className="flex items-center justify-between">
                                  <div className="flex items-center">
                                    {module.completed ? (
                                      <div className="h-5 w-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-2">
                                        <CheckCircle className="h-3 w-3" />
                                      </div>
                                    ) : (
                                      <div className="h-5 w-5 rounded-full border border-gray-200 mr-2"></div>
                                    )}
                                    <span className={`text-sm ${module.completed ? 'text-gray-700' : 'text-gray-600'}`}>
                                      {module.title}
                                    </span>
                                  </div>
                                  <span className="text-xs text-gray-500">{module.duration}</span>
                                </div>
                              ))}
                              {course.modules.length > 3 && (
                                <div className="text-center text-sm text-indigo-600 mt-1">
                                  + {course.modules.length - 3} more modules
                                </div>
                              )}
                            </div>
                            <Button className="w-full mt-4 bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white">
                              {course.progress > 0 ? "Continue Course" : "Start Course"}
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}

                    <div className="flex justify-center">
                      <Button variant="outline" className="border-indigo-200 text-indigo-700 hover:bg-indigo-50">
                        <BookOpen className="h-4 w-4 mr-2" />
                        View All Courses
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              <div className="space-y-6">
                <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden">
                  <div className="h-1 w-full bg-gradient-to-r from-indigo-500 to-violet-600"></div>
                  <CardHeader className="bg-gradient-to-r from-indigo-50 to-violet-50 pb-3 border-b border-indigo-100">
                    <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
                      <Lightbulb className="h-5 w-5 mr-2 text-indigo-500" />
                      Learning Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1.5">
                          <span className="text-sm font-medium text-gray-700">Export Readiness</span>
                          <span className="text-sm font-medium text-indigo-700">{userData.exportReadiness}%</span>
                        </div>
                        <Progress value={userData.exportReadiness} className="h-2" indicatorClassName="bg-gradient-to-r from-indigo-500 to-violet-600" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1.5">
                          <span className="text-sm font-medium text-gray-700">Resources Completed</span>
                          <span className="text-sm font-medium text-indigo-700">{completedResources.length}/{mockResources.length}</span>
                        </div>
                        <Progress 
                          value={(completedResources.length / mockResources.length) * 100} 
                          className="h-2"
                          indicatorClassName="bg-gradient-to-r from-indigo-500 to-violet-600"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1.5">
                          <span className="text-sm font-medium text-gray-700">Course Progress</span>
                          <span className="text-sm font-medium text-indigo-700">43%</span>
                        </div>
                        <Progress value={43} className="h-2" indicatorClassName="bg-gradient-to-r from-indigo-500 to-violet-600" />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-6 p-3 bg-indigo-50 border border-indigo-100 rounded-lg">
                      <div className="flex items-center">
                        <Award className="h-5 w-5 text-indigo-500 mr-3" />
                        <div>
                          <p className="text-sm font-medium text-gray-800">Earned Certificates</p>
                          <p className="text-xs text-gray-500">2 certificates completed</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="h-8 text-indigo-700 hover:bg-indigo-100">
                        View All
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden">
                  <div className="h-1 w-full bg-gradient-to-r from-indigo-500 to-violet-600"></div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold text-gray-800">Recommended For You</CardTitle>
                    <CardDescription>Based on your recent activity</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y divide-gray-100">
                      {popularResources.slice(0, 3).map((resource) => {
                        const ResourceIcon = getResourceTypeIcon(resource.type);
                        return (
                          <div key={resource.id} className="p-4 hover:bg-gray-50">
                            <div className="flex">
                              <div className={`h-9 w-9 rounded-lg mr-3 flex items-center justify-center ${
                                resource.type === 'article' ? 'bg-blue-100 text-blue-600' :
                                resource.type === 'guide' ? 'bg-purple-100 text-purple-600' :
                                resource.type === 'video' ? 'bg-red-100 text-red-600' :
                                resource.type === 'webinar' ? 'bg-green-100 text-green-600' :
                                'bg-amber-100 text-amber-600'
                              }`}>
                                <ResourceIcon className="h-4 w-4" />
                              </div>
                              <div>
                                <h3 className="font-medium text-gray-900 text-sm">{resource.title}</h3>
                                <div className="flex items-center mt-1 text-xs text-gray-500">
                                  {resource.duration && (
                                    <span className="flex items-center mr-3">
                                      <Clock className="h-3 w-3 mr-1" />
                                      {resource.duration}
                                    </span>
                                  )}
                                  <Badge className={`capitalize text-xs ${
                                    resource.type === 'article' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                                    resource.type === 'guide' ? 'bg-purple-50 text-purple-700 border border-purple-100' :
                                    resource.type === 'video' ? 'bg-red-50 text-red-700 border border-red-100' :
                                    resource.type === 'webinar' ? 'bg-green-50 text-green-700 border border-green-100' :
                                    'bg-amber-50 text-amber-700 border border-amber-100'
                                  }`}>
                                    {resource.type}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-center border-t border-gray-100 p-4">
                    <Button variant="link" className="text-indigo-600 hover:text-indigo-700">
                      View All Recommendations
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden">
                  <div className="h-1 w-full bg-gradient-to-r from-indigo-500 to-violet-600"></div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
                      <Globe className="h-5 w-5 mr-2 text-indigo-500" />
                      Upcoming Webinars
                    </CardTitle>
                    <CardDescription>Live export training sessions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
                        <div className="flex justify-between">
                          <h3 className="font-medium text-gray-800">EU Export Requirements 2024</h3>
                          <Badge className="bg-green-100 text-green-700 border border-green-200">Live</Badge>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">Updates on new European Union import regulations and compliance requirements.</p>
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                          <div className="flex items-center text-xs text-gray-500">
                            <Calendar className="h-3.5 w-3.5 mr-1" />
                            <span>Apr 25, 2024</span>
                            <Clock className="h-3.5 w-3.5 mx-1 ml-2" />
                            <span>10:00 AM WIB</span>
                          </div>
                          <Button variant="outline" size="sm" className="h-7 text-xs border-indigo-200 text-indigo-700 hover:bg-indigo-50">
                            Reserve Seat
                          </Button>
                        </div>
                      </div>
                      
                      <div className="p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
                        <div className="flex justify-between">
                          <h3 className="font-medium text-gray-800">Export Financing Strategies</h3>
                          <Badge className="bg-blue-100 text-blue-700 border border-blue-200">Upcoming</Badge>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">Learn about various financing options available for exporters and how to access them.</p>
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                          <div className="flex items-center text-xs text-gray-500">
                            <Calendar className="h-3.5 w-3.5 mr-1" />
                            <span>May 5, 2024</span>
                            <Clock className="h-3.5 w-3.5 mx-1 ml-2" />
                            <span>14:00 PM WIB</span>
                          </div>
                          <Button variant="outline" size="sm" className="h-7 text-xs border-indigo-200 text-indigo-700 hover:bg-indigo-50">
                            Reserve Seat
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-gradient-to-r from-indigo-50 to-violet-50 border-t border-indigo-100 p-4">
                    <Button className="w-full bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white">
                      <GraduationCap className="h-4 w-4 mr-2" />
                      View All Webinars
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden">
                  <div className="h-1 w-full bg-gradient-to-r from-indigo-500 to-violet-600"></div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold text-gray-800">Export Topics</CardTitle>
                    <CardDescription>Popular knowledge areas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="border rounded-lg">
                      <AccordionItem value="documentation">
                        <AccordionTrigger className="px-4 hover:bg-gray-50 text-gray-800">
                          Export Documentation
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4 space-y-2 text-sm text-gray-600">
                          <p>Learn about essential export documents:</p>
                          <ul className="pl-5 space-y-1 list-disc">
                            <li>Commercial Invoice</li>
                            <li>Bill of Lading</li>
                            <li>Certificate of Origin</li>
                            <li>Packing List</li>
                            <li>Insurance Certificate</li>
                          </ul>
                          <Button variant="link" className="p-0 h-auto text-indigo-600">
                            View Documentation Resources
                          </Button>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="logistics">
                        <AccordionTrigger className="px-4 hover:bg-gray-50 text-gray-800">
                          Logistics & Shipping
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4 space-y-2 text-sm text-gray-600">
                          <p>Resources on international logistics:</p>
                          <ul className="pl-5 space-y-1 list-disc">
                            <li>Shipping Methods</li>
                            <li>Incoterms 2020</li>
                            <li>Freight Forwarders</li>
                            <li>Shipping Insurance</li>
                            <li>Container Types</li>
                          </ul>
                          <Button variant="link" className="p-0 h-auto text-indigo-600">
                            View Logistics Resources
                          </Button>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="finance">
                        <AccordionTrigger className="px-4 hover:bg-gray-50 text-gray-800">
                          Export Finance
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4 space-y-2 text-sm text-gray-600">
                          <p>Financial aspects of exporting:</p>
                          <ul className="pl-5 space-y-1 list-disc">
                            <li>Payment Methods</li>
                            <li>Letters of Credit</li>
                            <li>Export Pricing</li>
                            <li>Currency Risk Management</li>
                            <li>Export Credit Insurance</li>
                          </ul>
                          <Button variant="link" className="p-0 h-auto text-indigo-600">
                            View Finance Resources
                          </Button>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
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