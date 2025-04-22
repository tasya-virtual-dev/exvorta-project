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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/use-auth";
import {
  SearchIcon,
  HeadphonesIcon,
  MessageSquareIcon,
  PhoneIcon,
  MailIcon,
  Clock,
  CheckCircle2,
  ChevronRight,
  FileText,
  RefreshCcw,
  ThumbsUp,
  Video,
  Calendar,
  Users,
  HelpCircle,
  Globe,
  AlertCircle,
  ArrowRight,
  Send,
  MessageSquareText,
  MessagesSquare,
  Sparkles,
  Cable,
  PenSquare,
  Bot,
  CircleUser,
  User2,
  Star,
  Paperclip,
  CircleDollarSign,
  Smartphone,
  Computer
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

interface SupportTicket {
  id: string;
  subject: string;
  message: string;
  status: "open" | "in_progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "urgent";
  date: string;
  category: string;
  lastUpdate: string;
  messages: {
    sender: "user" | "agent" | "ai";
    message: string;
    time: string;
    attachments?: string[];
    name?: string;
  }[];
}

interface ArticleItem {
  id: number;
  title: string;
  summary: string;
  category: string;
  tags: string[];
  readTime: string;
  helpful: number;
}

export default function Support() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("support-ai");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [aiPrompt, setAiPrompt] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>("TKT-1001");
  const [ticketMessage, setTicketMessage] = useState("");

  const { user } = useAuth();
  
  // Convert user data to format expected by child components
  const userData = {
    username: user?.username || "",
    name: user?.companyName || "",
    companyName: user?.companyName || "",
    email: user?.email || "",
    exportReadiness: user?.exportReadiness || 0,
  };

  // Sample FAQ data
  const mockFAQs: FAQ[] = [
    {
      question: "What documents are required for exporting furniture to the EU?",
      answer: "For exporting furniture to the EU, you'll need the following documentation: Commercial Invoice, Packing List, Bill of Lading/Air Waybill, Certificate of Origin, EU Declaration of Conformity, FLEGT License (for wooden products), and REACH compliance documentation. Some products may require additional certifications depending on materials used.",
      category: "documentation"
    },
    {
      question: "How do I track my international shipments?",
      answer: "You can track your international shipments directly through the Logistics Management module on your dashboard. Enter your shipment ID or tracking number to view real-time status updates. If your carrier provides external tracking, you can also use the tracking links provided in your shipment details page.",
      category: "logistics"
    },
    {
      question: "What payment methods are accepted for international buyers?",
      answer: "Exvorta supports several secure payment methods for international transactions including Letters of Credit (L/C), Documentary Collection, Open Account, Advance Payment, and Bank Transfers. Each method offers different levels of security and convenience. Visit the Financing section for details on payment terms and methods recommended for specific markets.",
      category: "finance"
    },
    {
      question: "How can I verify if a potential buyer is legitimate?",
      answer: "Our Buyer Matching system includes verification features that flag verified buyers with a checkmark. Additionally, you can request buyer verification reports through the platform which include credit checks, business registration verification, and trade history. For high-value transactions, we recommend using secure payment methods like Letters of Credit.",
      category: "buyers"
    },
    {
      question: "What happens if my goods are damaged during shipping?",
      answer: "If your goods are damaged during shipping, first document the damage with photos and notify your carrier immediately. File a claim through our Logistics Management module which will guide you through the claims process specific to your shipping insurance terms. Make sure to review your insurance coverage before shipping to ensure adequate protection.",
      category: "logistics"
    },
    {
      question: "How does Exvorta handle export compliance?",
      answer: "Exvorta's Compliance & Documentation module helps automate and simplify export compliance. The system checks your products against export control regulations, provides country-specific compliance guidance, generates required documentation, and maintains records for audit purposes. Our AI assistant can also answer specific compliance questions for your target markets.",
      category: "compliance"
    },
    {
      question: "How can I get financing for my export operations?",
      answer: "Through the Financing Options module, Exvorta connects you with various financing solutions including export working capital loans, buyer credit financing, export insurance, and government-backed guarantee programs. Use our matching tool to find options suited to your business size, export markets, and financial needs.",
      category: "finance"
    },
    {
      question: "What markets should I prioritize for my furniture exports?",
      answer: "Our Market Research tool provides data-driven insights on promising markets for your products. For furniture exporters, key factors to consider include market size, growth trends, competitive landscape, tariff structures, and shipping costs. The AI analyst can provide personalized market recommendations based on your specific product catalog.",
      category: "market-research"
    }
  ];

  // Sample support tickets
  const mockTickets: SupportTicket[] = [
    {
      id: "TKT-1001",
      subject: "Issue with customs documentation for German shipment",
      message: "I'm having trouble generating the correct customs documentation for my furniture shipment to Germany. The system is not showing the EU Declaration of Conformity option in the documents list.",
      status: "in_progress",
      priority: "high",
      category: "documentation",
      date: "2024-04-15",
      lastUpdate: "2024-04-18",
      messages: [
        {
          sender: "user",
          message: "I'm having trouble generating the correct customs documentation for my furniture shipment to Germany. The system is not showing the EU Declaration of Conformity option in the documents list.",
          time: "Apr 15, 2024 10:23 AM"
        },
        {
          sender: "agent",
          name: "Sarah Johnson",
          message: "Hi there, thank you for reaching out about the EU Declaration of Conformity document. I'd be happy to help you with this issue. Could you please let me know what type of furniture products you're exporting to Germany? This will help me determine the specific requirements for your shipment.",
          time: "Apr 16, 2024 09:15 AM"
        },
        {
          sender: "user",
          message: "I'm exporting teak dining tables and chairs. The order consists of 15 dining tables and 60 chairs. All made from sustainably sourced teak wood from Central Java.",
          time: "Apr 16, 2024 02:42 PM"
        },
        {
          sender: "agent",
          name: "Sarah Johnson",
          message: "Thank you for that information. For wooden furniture exports to Germany, you'll need both the EU Declaration of Conformity and FLEGT licensing documentation. I've checked your account and noticed that your product category was set as 'Home Decor' instead of 'Furniture', which is why the system wasn't showing the correct document options. I've updated your product category, and you should now see the EU Declaration of Conformity template in your documents list. Could you please check and confirm?",
          time: "Apr 17, 2024 11:05 AM"
        },
        {
          sender: "user",
          message: "I can see the EU Declaration option now, but I'm not sure how to properly complete it. Are there any guidelines for the technical standards that apply to wooden furniture?",
          time: "Apr 17, 2024 03:30 PM"
        },
        {
          sender: "ai",
          message: "For teak furniture exports to the EU, your Declaration of Conformity should reference these key standards:\n\n1. EN 12521:2015 (Furniture - Strength, durability and safety - Requirements for domestic tables)\n2. EN 1022:2018 (Furniture - Seating - Determination of stability)\n3. REACH Regulation compliance for any treatments or finishes\n4. EU Timber Regulation (EUTR) compliance\n\nWould you like me to generate a pre-filled template with these standards for your specific products?",
          time: "Apr 17, 2024 03:32 PM"
        },
        {
          sender: "agent",
          name: "Sarah Johnson",
          message: "Our AI assistant has provided the key standards you'll need to reference. I'd also like to add that for your teak furniture, you'll need to ensure FLEGT documentation is in order. Since you mentioned the wood is from Central Java, you'll need to obtain a V-Legal Document/FLEGT license from the Indonesian authority. I've added a comprehensive guide on EU furniture export compliance to your account resources. Is there anything else you need assistance with regarding your documentation?",
          time: "Apr 18, 2024 10:15 AM"
        }
      ]
    },
    {
      id: "TKT-1002",
      subject: "Payment not received from Australian buyer",
      message: "We shipped an order to our Australian customer two weeks ago, and payment was due upon delivery. The tracking shows the goods were delivered five days ago, but we haven't received the wire transfer yet.",
      status: "open",
      priority: "urgent",
      category: "finance",
      date: "2024-04-17",
      lastUpdate: "2024-04-17",
      messages: [
        {
          sender: "user",
          message: "We shipped an order to our Australian customer two weeks ago, and payment was due upon delivery. The tracking shows the goods were delivered five days ago, but we haven't received the wire transfer yet.",
          time: "Apr 17, 2024 11:23 AM"
        }
      ]
    },
    {
      id: "TKT-1003",
      subject: "Need help with market entry strategy for Japan",
      message: "I'm looking to expand my furniture exports to the Japanese market but need guidance on regulations, cultural preferences, and finding reliable distributors.",
      status: "resolved",
      priority: "medium",
      category: "market-research",
      date: "2024-04-10",
      lastUpdate: "2024-04-14",
      messages: [
        {
          sender: "user",
          message: "I'm looking to expand my furniture exports to the Japanese market but need guidance on regulations, cultural preferences, and finding reliable distributors.",
          time: "Apr 10, 2024 03:45 PM"
        },
        {
          sender: "agent",
          name: "Michael Wong",
          message: "Hello! I'd be happy to help you with your expansion to the Japanese market. Japan has specific regulations for imported furniture, particularly regarding formaldehyde emissions and fire safety for certain types of furniture. Can you tell me more about the specific furniture products you're planning to export to Japan?",
          time: "Apr 11, 2024 09:28 AM"
        },
        {
          sender: "user",
          message: "We manufacture handcrafted teak furniture - primarily dining tables, chairs, coffee tables, and some decorative items like carved panels and bowls. All our wood is sustainably sourced and we use natural finishes.",
          time: "Apr 11, 2024 02:15 PM"
        },
        {
          sender: "agent",
          name: "Michael Wong",
          message: "Thank you for the details. For wooden furniture entering Japan, you'll need to comply with the following key regulations:\n\n1. JAS (Japanese Agricultural Standards) for wood products\n2. Building Standard Law requirements regarding formaldehyde emissions\n3. Household Goods Quality Labeling Law\n4. Japan's Clean Wood Act (similar to EU's FLEGT, requiring legal timber sourcing)\n\nRegarding cultural preferences, Japanese consumers typically prefer:\n- Compact designs (due to smaller living spaces)\n- Clean, minimalist aesthetics\n- Natural materials with quality craftsmanship\n- Multifunctional furniture\n\nThe fact that you use sustainable materials and natural finishes will be appealing to the Japanese market. I've generated a comprehensive Japan Market Entry report for your account with distributor recommendations. You can access it in your Market Research module.",
          time: "Apr 12, 2024 11:45 AM"
        },
        {
          sender: "user",
          message: "Thank you for the detailed information. I've reviewed the report and it's very helpful. One follow-up question - are there any specific trade shows in Japan that would be beneficial for us to attend to meet potential distributors?",
          time: "Apr 13, 2024 10:30 AM"
        },
        {
          sender: "agent",
          name: "Michael Wong",
          message: "I'm glad you found the report helpful! Yes, there are several important trade shows for furniture in Japan that would be excellent opportunities for you:\n\n1. IFFT/Interior Lifestyle Living (Tokyo, November) - One of Japan's largest furniture fairs\n2. Japan Home & Building Show (Tokyo, usually in November)\n3. Tokyo Interior Industry Show (July)\n4. Design Tokyo (July)\n\nIFFT would be my top recommendation as it specifically targets international brands looking to enter the Japanese market. I've added these events to your Market Events calendar with registration information. Would you like me to connect you with our trade representative in Tokyo who can assist with show preparations?",
          time: "Apr 14, 2024 09:15 AM"
        },
        {
          sender: "user",
          message: "Yes, that would be extremely helpful. Please connect me with your Tokyo representative. I think we'll aim to attend the IFFT show in November. Thanks for all your assistance!",
          time: "Apr 14, 2024 02:40 PM"
        },
        {
          sender: "agent",
          name: "Michael Wong",
          message: "Perfect! I've sent an introduction email connecting you with Yuki Tanaka, our Tokyo representative. She has extensive experience helping furniture exporters navigate the Japanese market and can provide on-the-ground support for your IFFT participation. Is there anything else you need assistance with regarding your Japan market entry strategy?",
          time: "Apr 14, 2024 04:22 PM"
        },
        {
          sender: "user",
          message: "That covers everything I needed for now. Thank you for the excellent support!",
          time: "Apr 14, 2024 05:01 PM"
        }
      ]
    },
    {
      id: "TKT-1004",
      subject: "Shipping container delay at Rotterdam port",
      message: "Our shipment (ID: SHP-00123) has been held at Rotterdam port for over a week with no updates. Buyer is requesting information on the delay.",
      status: "open",
      priority: "high",
      category: "logistics",
      date: "2024-04-16",
      lastUpdate: "2024-04-16",
      messages: [
        {
          sender: "user",
          message: "Our shipment (ID: SHP-00123) has been held at Rotterdam port for over a week with no updates. Buyer is requesting information on the delay.",
          time: "Apr 16, 2024 04:12 PM"
        }
      ]
    }
  ];

  // Sample help articles
  const mockArticles: ArticleItem[] = [
    {
      id: 1,
      title: "Complete Guide to Export Documentation",
      summary: "Learn about essential export documents including commercial invoices, packing lists, certificates of origin, and more.",
      category: "documentation",
      tags: ["Documentation", "Compliance", "Getting Started"],
      readTime: "8 min read",
      helpful: 156
    },
    {
      id: 2,
      title: "Understanding International Shipping Terms",
      summary: "A comprehensive guide to Incoterms 2020 and what they mean for your export operations.",
      category: "logistics",
      tags: ["Shipping", "Incoterms", "Logistics"],
      readTime: "12 min read",
      helpful: 203
    },
    {
      id: 3,
      title: "Securing Payment in International Trade",
      summary: "Learn about different payment methods, their risks, and how to secure transactions with international buyers.",
      category: "finance",
      tags: ["Payments", "Risk Management", "Finance"],
      readTime: "10 min read",
      helpful: 178
    },
    {
      id: 4,
      title: "Market Research Techniques for Exporters",
      summary: "Step-by-step guide to researching potential export markets and identifying opportunities.",
      category: "market-research",
      tags: ["Market Entry", "Research", "Strategy"],
      readTime: "15 min read",
      helpful: 142
    },
    {
      id: 5,
      title: "EU Regulatory Compliance for Furniture Exporters",
      summary: "Detailed overview of European Union regulations affecting wooden furniture imports.",
      category: "compliance",
      tags: ["EU Regulations", "Furniture", "Compliance"],
      readTime: "18 min read",
      helpful: 192
    },
    {
      id: 6,
      title: "Handling Shipping Delays and Disruptions",
      summary: "Strategies for managing logistics issues and maintaining customer satisfaction during delays.",
      category: "logistics",
      tags: ["Crisis Management", "Customer Relations", "Logistics"],
      readTime: "9 min read",
      helpful: 167
    }
  ];

  // Filter FAQs based on search query and category
  const filteredFAQs = mockFAQs.filter(faq => {
    if (searchQuery && 
        !faq.question.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !faq.answer.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    if (selectedCategory !== "all" && faq.category !== selectedCategory) {
      return false;
    }
    
    return true;
  });

  // Filter articles based on search query and category
  const filteredArticles = mockArticles.filter(article => {
    if (searchQuery && 
        !article.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !article.summary.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    if (selectedCategory !== "all" && article.category !== selectedCategory) {
      return false;
    }
    
    return true;
  });

  // Get the selected ticket
  const selectedTicket = mockTickets.find(ticket => ticket.id === selectedTicketId);

  // Handle AI prompt submission using OpenAI API
  const handleAIPromptSubmit = async () => {
    if (!aiPrompt.trim()) return;
    
    setIsAiLoading(true);
    setAiResponse(null);
    
    try {
      // Make API request to our OpenAI-powered endpoint
      const response = await fetch('/api/ai/assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: aiPrompt,
          // We're not keeping conversation history in the support page
          // so we just send the single message
        }),
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      setAiResponse(data.response);
    } catch (error) {
      console.error('Error getting AI response:', error);
      setAiResponse(
        "I'm sorry, I encountered an error while processing your request. " +
        "Please try again later or contact our support team for assistance."
      );
    } finally {
      setIsAiLoading(false);
    }
  };

  // Handle sending a new message in a ticket
  const handleSendMessage = () => {
    if (!ticketMessage.trim() || !selectedTicketId) return;
    
    // In a real app, this would send the message to the backend
    setTicketMessage("");
    
    // Show success message
    alert("Message sent successfully! In a real application, this would be added to the ticket thread.");
  };

  // Get status badge based on ticket status
  const getStatusBadge = (status: SupportTicket["status"]) => {
    switch (status) {
      case "open":
        return <Badge className="bg-blue-100 text-blue-700 border border-blue-200">Open</Badge>;
      case "in_progress":
        return <Badge className="bg-amber-100 text-amber-700 border border-amber-200">In Progress</Badge>;
      case "resolved":
        return <Badge className="bg-green-100 text-green-700 border border-green-200">Resolved</Badge>;
      case "closed":
        return <Badge className="bg-gray-100 text-gray-700 border border-gray-200">Closed</Badge>;
      default:
        return null;
    }
  };

  // Get priority badge based on ticket priority
  const getPriorityBadge = (priority: SupportTicket["priority"]) => {
    switch (priority) {
      case "low":
        return <Badge className="bg-gray-100 text-gray-700 border border-gray-200">Low</Badge>;
      case "medium":
        return <Badge className="bg-blue-100 text-blue-700 border border-blue-200">Medium</Badge>;
      case "high":
        return <Badge className="bg-amber-100 text-amber-700 border border-amber-200">High</Badge>;
      case "urgent":
        return <Badge className="bg-red-100 text-red-700 border border-red-200">Urgent</Badge>;
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
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-3 text-white shadow-md mr-4">
                  <HeadphonesIcon className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Support Center</h1>
                  <p className="text-gray-600 mt-1">Get help with your export operations</p>
                </div>
              </div>
              <div className="mt-4 sm:mt-0 flex space-x-3">
                <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                  <PhoneIcon className="h-4 w-4 mr-2" />
                  Contact Support
                </Button>
                <Button 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all duration-300" 
                >
                  <MessageSquareIcon className="h-4 w-4 mr-2" />
                  New Support Ticket
                </Button>
              </div>
            </div>

            <Tabs defaultValue="support-ai" value={activeTab} onValueChange={setActiveTab} className="mb-6">
              <TabsList className="grid grid-cols-4 bg-white border border-gray-100 p-1 shadow-sm rounded-xl">
                <TabsTrigger 
                  value="support-ai" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-md transition-all duration-200 flex items-center"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  AI Assistant
                </TabsTrigger>
                <TabsTrigger 
                  value="tickets" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-md transition-all duration-200 flex items-center"
                >
                  <MessagesSquare className="h-4 w-4 mr-2" />
                  My Tickets
                </TabsTrigger>
                <TabsTrigger 
                  value="faq" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-md transition-all duration-200 flex items-center"
                >
                  <HelpCircle className="h-4 w-4 mr-2" />
                  FAQ
                </TabsTrigger>
                <TabsTrigger 
                  value="articles" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-md transition-all duration-200 flex items-center"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Help Articles
                </TabsTrigger>
              </TabsList>

              <TabsContent value="support-ai" className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden lg:col-span-2">
                    <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
                            <Sparkles className="h-5 w-5 mr-2 text-blue-500" />
                            Export Support Assistant
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
                              <p className="text-xs max-w-xs">Our AI provides instant guidance on export topics like documentation, logistics, payments, and compliance requirements</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-lg border border-gray-200 bg-white p-4">
                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge className="bg-blue-100 text-blue-700 border border-blue-200">documentation</Badge>
                          <Badge className="bg-blue-100 text-blue-700 border border-blue-200">shipping</Badge>
                          <Badge className="bg-blue-100 text-blue-700 border border-blue-200">payment methods</Badge>
                          <Badge className="bg-blue-100 text-blue-700 border border-blue-200">compliance</Badge>
                          <Badge className="bg-blue-100 text-blue-700 border border-blue-200">market research</Badge>
                        </div>
                        <div className="flex space-x-2">
                          <Textarea 
                            placeholder="Ask about export documentation, shipping methods, payment options, compliance requirements, etc."
                            value={aiPrompt}
                            onChange={(e) => setAiPrompt(e.target.value)}
                            className="flex-1 border-gray-200 focus:border-blue-300 shadow-sm"
                            rows={3}
                          />
                          <Button 
                            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 self-end"
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
                                <Bot className="h-4 w-4 mr-2" />
                                Ask AI
                              </span>
                            )}
                          </Button>
                        </div>
                      </div>

                      {aiResponse && (
                        <div className="mt-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100 p-4 shadow-sm">
                          <div className="flex items-center mb-3">
                            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white shadow-sm mr-3">
                              <Bot className="h-4 w-4" />
                            </div>
                            <h3 className="font-semibold text-gray-800">Export Support Assistant</h3>
                          </div>
                          <div className="prose prose-sm max-w-none">
                            {aiResponse.split('\n\n').map((paragraph, idx) => {
                              if (paragraph.startsWith('#')) {
                                // Heading
                                return <h3 key={idx} className="text-lg font-semibold text-gray-800 mb-2 mt-4">{paragraph.replace(/^# /, '')}</h3>;
                              } else if (paragraph.startsWith('##')) {
                                // Subheading
                                return <h4 key={idx} className="text-base font-semibold text-gray-800 mb-2 mt-3">{paragraph.replace(/^## /, '')}</h4>;
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
                              } else if (paragraph.startsWith('-') || paragraph.startsWith('*')) {
                                // List items
                                return <p key={idx} className="text-gray-700 mb-2 ml-4">{paragraph}</p>;
                              } else {
                                // Regular paragraph
                                return <p key={idx} className="text-gray-700 mb-2">{paragraph}</p>;
                              }
                            })}
                          </div>
                          <div className="flex justify-between items-center mt-4 pt-3 border-t border-blue-100">
                            <div className="flex items-center space-x-3">
                              <Button variant="outline" size="sm" className="h-8 border-blue-200 text-blue-700 hover:bg-blue-50">
                                <ThumbsUp className="h-3.5 w-3.5 mr-1" />
                                Helpful
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 text-gray-500 hover:text-gray-700">
                                <MessageSquareText className="h-3.5 w-3.5 mr-1" />
                                Ask Follow-up
                              </Button>
                            </div>
                            <span className="text-xs text-gray-500">Can't find the answer? <span className="text-blue-600 cursor-pointer">Create a support ticket</span></span>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  
                  <div className="space-y-6">
                    <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden">
                      <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg font-semibold text-gray-800">Support Options</CardTitle>
                        <CardDescription>Ways to get help with your export operations</CardDescription>
                      </CardHeader>
                      <CardContent className="p-0">
                        <div className="divide-y divide-gray-100">
                          <div className="p-4 hover:bg-gray-50">
                            <div className="flex items-start">
                              <div className="bg-blue-100 p-2 rounded-full mr-3">
                                <MessageSquareIcon className="h-4 w-4 text-blue-700" />
                              </div>
                              <div>
                                <h3 className="font-medium text-gray-800">Create Support Ticket</h3>
                                <p className="text-sm text-gray-500 mt-0.5">Submit a detailed request for personalized assistance</p>
                                <Button variant="link" className="p-0 h-auto mt-1 text-blue-600">
                                  Create Ticket
                                </Button>
                              </div>
                            </div>
                          </div>
                          <div className="p-4 hover:bg-gray-50">
                            <div className="flex items-start">
                              <div className="bg-purple-100 p-2 rounded-full mr-3">
                                <PhoneIcon className="h-4 w-4 text-purple-700" />
                              </div>
                              <div>
                                <h3 className="font-medium text-gray-800">Call Export Advisor</h3>
                                <p className="text-sm text-gray-500 mt-0.5">Speak directly with an export specialist</p>
                                <Button variant="link" className="p-0 h-auto mt-1 text-blue-600">
                                  Schedule Call
                                </Button>
                              </div>
                            </div>
                          </div>
                          <div className="p-4 hover:bg-gray-50">
                            <div className="flex items-start">
                              <div className="bg-green-100 p-2 rounded-full mr-3">
                                <Video className="h-4 w-4 text-green-700" />
                              </div>
                              <div>
                                <h3 className="font-medium text-gray-800">Virtual Consultation</h3>
                                <p className="text-sm text-gray-500 mt-0.5">Schedule a video meeting with an export consultant</p>
                                <Button variant="link" className="p-0 h-auto mt-1 text-blue-600">
                                  Book Session
                                </Button>
                              </div>
                            </div>
                          </div>
                          <div className="p-4 hover:bg-gray-50">
                            <div className="flex items-start">
                              <div className="bg-amber-100 p-2 rounded-full mr-3">
                                <Users className="h-4 w-4 text-amber-700" />
                              </div>
                              <div>
                                <h3 className="font-medium text-gray-800">Join Community Forum</h3>
                                <p className="text-sm text-gray-500 mt-0.5">Connect with other exporters and share knowledge</p>
                                <Button variant="link" className="p-0 h-auto mt-1 text-blue-600">
                                  Visit Forum
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden">
                      <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg font-semibold text-gray-800">Support Hours</CardTitle>
                        <CardDescription>When we're available to help</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between">
                            <span className="font-medium text-gray-800">AI Support Assistant</span>
                            <span className="text-green-600 font-medium">24/7 Available</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium text-gray-800">Email Support</span>
                            <span className="text-gray-600">24 hour response time</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium text-gray-800">Live Chat</span>
                            <span className="text-gray-600">Mon-Fri: 8am - 8pm WIB</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium text-gray-800">Phone Support</span>
                            <span className="text-gray-600">Mon-Fri: 9am - 5pm WIB</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium text-gray-800">Emergency Line</span>
                            <span className="text-gray-600">24/7 for urgent issues</span>
                          </div>
                        </div>
                        <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-lg text-center">
                          <p className="text-sm text-gray-800">Current Time: {new Date().toLocaleTimeString()}</p>
                          <p className="text-xs text-gray-600 mt-1">Jakarta, Indonesia (GMT+7)</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="tickets" className="mt-6">
                {selectedTicket ? (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1">
                      <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden mb-6">
                        <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
                        <CardHeader className="pb-3">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-lg font-semibold text-gray-800">My Tickets</CardTitle>
                            <Button size="sm" className="h-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                              <MessageSquareIcon className="h-3.5 w-3.5 mr-1.5" />
                              New Ticket
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="p-0">
                          <div className="divide-y divide-gray-100">
                            {mockTickets.map((ticket) => (
                              <div 
                                key={ticket.id} 
                                className={`p-4 cursor-pointer hover:bg-gray-50 ${selectedTicketId === ticket.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''}`}
                                onClick={() => setSelectedTicketId(ticket.id)}
                              >
                                <div className="flex justify-between">
                                  <h3 className="font-medium text-gray-800 flex items-center">
                                    {ticket.id}
                                    {ticket.id === selectedTicketId && (
                                      <span className="ml-2 w-2 h-2 rounded-full bg-blue-500"></span>
                                    )}
                                  </h3>
                                  {getStatusBadge(ticket.status)}
                                </div>
                                <p className="text-sm text-gray-600 mt-1 line-clamp-1">{ticket.subject}</p>
                                <div className="flex items-center mt-2 text-xs text-gray-500">
                                  <Clock className="h-3 w-3 mr-1" />
                                  <span>Updated: {ticket.lastUpdate}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden">
                        <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg font-semibold text-gray-800">Need More Help?</CardTitle>
                          <CardDescription>Other support options</CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                          <div className="divide-y divide-gray-100">
                            <div className="p-4 hover:bg-gray-50">
                              <div className="flex items-center">
                                <div className="bg-blue-100 p-2 rounded-full mr-3">
                                  <Bot className="h-4 w-4 text-blue-700" />
                                </div>
                                <div>
                                  <h3 className="font-medium text-gray-800">Ask AI Assistant</h3>
                                  <p className="text-xs text-gray-500 mt-0.5">Get instant answers to common questions</p>
                                </div>
                              </div>
                            </div>
                            <div className="p-4 hover:bg-gray-50">
                              <div className="flex items-center">
                                <div className="bg-green-100 p-2 rounded-full mr-3">
                                  <PhoneIcon className="h-4 w-4 text-green-700" />
                                </div>
                                <div>
                                  <h3 className="font-medium text-gray-800">Call Support Team</h3>
                                  <p className="text-xs text-gray-500 mt-0.5">+62 21 5678 9012</p>
                                </div>
                              </div>
                            </div>
                            <div className="p-4 hover:bg-gray-50">
                              <div className="flex items-center">
                                <div className="bg-purple-100 p-2 rounded-full mr-3">
                                  <MailIcon className="h-4 w-4 text-purple-700" />
                                </div>
                                <div>
                                  <h3 className="font-medium text-gray-800">Email Support</h3>
                                  <p className="text-xs text-gray-500 mt-0.5">support@exvorta.com</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="lg:col-span-2">
                      <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden">
                        <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
                        <CardHeader className="pb-3 border-b border-gray-100">
                          <div>
                            <div className="flex justify-between items-start mb-2">
                              <h2 className="text-xl font-bold text-gray-900">{selectedTicket.subject}</h2>
                              <div className="flex space-x-2">
                                {getStatusBadge(selectedTicket.status)}
                                {getPriorityBadge(selectedTicket.priority)}
                              </div>
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <span className="flex items-center mr-4">
                                <MessageSquareIcon className="h-4 w-4 mr-1 text-gray-400" />
                                Ticket #{selectedTicket.id}
                              </span>
                              <span className="flex items-center mr-4">
                                <Clock className="h-4 w-4 mr-1 text-gray-400" />
                                Created: {selectedTicket.date}
                              </span>
                              <span className="flex items-center">
                                <FileText className="h-4 w-4 mr-1 text-gray-400" />
                                Category: {selectedTicket.category}
                              </span>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="p-0">
                          <div className="h-[500px] overflow-y-auto p-6">
                            <div className="space-y-6">
                              {selectedTicket.messages.map((message, index) => (
                                <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                  <div className={`max-w-[80%] ${
                                    message.sender === 'user' 
                                      ? 'bg-blue-500 text-white rounded-l-xl rounded-tr-xl' 
                                      : message.sender === 'ai'
                                        ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-r-xl rounded-tl-xl'
                                        : 'bg-white border border-gray-200 shadow-sm rounded-r-xl rounded-tl-xl'
                                  } p-4`}>
                                    {message.sender !== 'user' && (
                                      <div className="flex items-center mb-2">
                                        <Avatar className="h-6 w-6 mr-2">
                                          {message.sender === 'agent' ? (
                                            <CircleUser className="h-full w-full text-gray-400" />
                                          ) : (
                                            <Bot className="h-full w-full text-gray-400" />
                                          )}
                                          <AvatarFallback>{message.sender === 'agent' ? 'A' : 'AI'}</AvatarFallback>
                                        </Avatar>
                                        <span className={`text-sm font-medium ${message.sender === 'ai' ? 'text-white' : 'text-gray-800'}`}>
                                          {message.sender === 'agent' ? message.name : 'AI Support Assistant'}
                                        </span>
                                      </div>
                                    )}
                                    <p className={message.sender === 'user' || message.sender === 'ai' ? 'text-white' : 'text-gray-700'}>
                                      {message.message}
                                    </p>
                                    <div className={`text-xs mt-2 text-right ${
                                      message.sender === 'user' || message.sender === 'ai' ? 'text-white/70' : 'text-gray-500'
                                    }`}>
                                      {message.time}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          {selectedTicket.status !== 'closed' && selectedTicket.status !== 'resolved' && (
                            <div className="p-4 bg-gray-50 border-t border-gray-100">
                              <div className="flex space-x-3">
                                <Avatar className="h-9 w-9">
                                  <User2 className="h-full w-full text-gray-400" />
                                  <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 relative">
                                  <Textarea 
                                    placeholder="Type your message here..."
                                    value={ticketMessage}
                                    onChange={(e) => setTicketMessage(e.target.value)}
                                    className="min-h-[80px] border-gray-200 focus:border-blue-300 shadow-sm pr-12"
                                  />
                                  <Button 
                                    className="absolute bottom-2 right-2 h-8 w-8 p-0 bg-blue-500 hover:bg-blue-600 rounded-full"
                                    onClick={handleSendMessage}
                                    disabled={!ticketMessage.trim()}
                                  >
                                    <Send className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                              <div className="flex justify-between mt-3">
                                <div className="flex space-x-2">
                                  <Button variant="outline" size="sm" className="h-8 text-xs border-gray-200">
                                    <Paperclip className="h-3.5 w-3.5 mr-1" />
                                    Attach Files
                                  </Button>
                                  <Button variant="outline" size="sm" className="h-8 text-xs border-gray-200">
                                    <Sparkles className="h-3.5 w-3.5 mr-1" />
                                    Ask AI for Help
                                  </Button>
                                </div>
                                {selectedTicket.status === 'open' && (
                                  <Button size="sm" className="h-8 text-xs bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                                    <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                                    Mark as Resolved
                                  </Button>
                                )}
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ) : (
                  <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden">
                    <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
                    <CardContent className="flex flex-col items-center justify-center p-12 text-center">
                      <div className="rounded-full bg-blue-100 p-4 mb-4">
                        <MessageSquareIcon className="h-8 w-8 text-blue-600" />
                      </div>
                      <h2 className="text-xl font-bold text-gray-900 mb-2">No Tickets Selected</h2>
                      <p className="text-gray-600 mb-6 max-w-md">
                        Select an existing support ticket or create a new one to get help with your export operations.
                      </p>
                      <div className="flex space-x-4">
                        <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                          <MessageSquareIcon className="h-4 w-4 mr-2" />
                          Create New Ticket
                        </Button>
                        <Button variant="outline" className="border-blue-200 text-blue-700">
                          <Bot className="h-4 w-4 mr-2" />
                          Ask AI Assistant
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="faq" className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden">
                      <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-center">
                          <div>
                            <CardTitle className="text-lg font-semibold text-gray-800">Frequently Asked Questions</CardTitle>
                            <CardDescription>Common questions about export operations</CardDescription>
                          </div>
                          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                            <SelectTrigger className="w-[180px] border-gray-200 shadow-sm h-9">
                              <SelectValue placeholder="Filter by category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Categories</SelectItem>
                              <SelectItem value="documentation">Documentation</SelectItem>
                              <SelectItem value="logistics">Logistics</SelectItem>
                              <SelectItem value="finance">Finance</SelectItem>
                              <SelectItem value="compliance">Compliance</SelectItem>
                              <SelectItem value="buyers">Buyer Management</SelectItem>
                              <SelectItem value="market-research">Market Research</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="relative mt-3">
                          <Input
                            placeholder="Search FAQ..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 border-gray-200 focus:border-blue-300 shadow-sm"
                          />
                          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        </div>
                      </CardHeader>
                      <CardContent className="p-0">
                        {filteredFAQs.length === 0 ? (
                          <div className="p-6 text-center">
                            <div className="rounded-full bg-blue-100 p-3 mx-auto mb-4 w-fit">
                              <SearchIcon className="h-6 w-6 text-blue-600" />
                            </div>
                            <h3 className="text-base font-medium text-gray-800 mb-1">No FAQs found</h3>
                            <p className="text-sm text-gray-600">Try adjusting your search or filter</p>
                          </div>
                        ) : (
                          <Accordion type="single" collapsible className="w-full">
                            {filteredFAQs.map((faq, index) => (
                              <AccordionItem key={index} value={`faq-${index}`}>
                                <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 text-left text-gray-800 font-medium">
                                  {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="px-6 pb-4 pt-0">
                                  <div className="text-gray-600 mt-1">{faq.answer}</div>
                                  <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
                                    <Badge className={`capitalize ${
                                      faq.category === 'documentation' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                                      faq.category === 'logistics' ? 'bg-purple-50 text-purple-700 border border-purple-100' :
                                      faq.category === 'finance' ? 'bg-green-50 text-green-700 border border-green-100' :
                                      faq.category === 'compliance' ? 'bg-red-50 text-red-700 border border-red-100' :
                                      faq.category === 'buyers' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                                      'bg-indigo-50 text-indigo-700 border border-indigo-100'
                                    }`}>
                                      {faq.category}
                                    </Badge>
                                    <div className="flex space-x-2">
                                      <Button variant="ghost" size="sm" className="h-8 text-xs text-gray-500">
                                        <ThumbsUp className="h-3.5 w-3.5 mr-1" />
                                        Helpful
                                      </Button>
                                      <Button variant="ghost" size="sm" className="h-8 text-xs text-gray-500">
                                        <MessageSquareIcon className="h-3.5 w-3.5 mr-1" />
                                        Ask More
                                      </Button>
                                    </div>
                                  </div>
                                </AccordionContent>
                              </AccordionItem>
                            ))}
                          </Accordion>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="space-y-6">
                    <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden">
                      <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg font-semibold text-gray-800">Popular Topics</CardTitle>
                        <CardDescription>Frequently searched information</CardDescription>
                      </CardHeader>
                      <CardContent className="p-0">
                        <div className="divide-y divide-gray-100">
                          <div className="p-4 hover:bg-gray-50 cursor-pointer">
                            <div className="flex items-center">
                              <div className="bg-blue-100 p-2 rounded-full mr-3">
                                <FileText className="h-4 w-4 text-blue-700" />
                              </div>
                              <div>
                                <h3 className="font-medium text-gray-800">Export Documentation</h3>
                                <p className="text-xs text-gray-500 mt-0.5">Required paperwork for shipping</p>
                              </div>
                            </div>
                          </div>
                          <div className="p-4 hover:bg-gray-50 cursor-pointer">
                            <div className="flex items-center">
                              <div className="bg-purple-100 p-2 rounded-full mr-3">
                                <Globe className="h-4 w-4 text-purple-700" />
                              </div>
                              <div>
                                <h3 className="font-medium text-gray-800">Shipping Methods</h3>
                                <p className="text-xs text-gray-500 mt-0.5">Sea, air, and land transport options</p>
                              </div>
                            </div>
                          </div>
                          <div className="p-4 hover:bg-gray-50 cursor-pointer">
                            <div className="flex items-center">
                              <div className="bg-green-100 p-2 rounded-full mr-3">
                                <CircleDollarSign className="h-4 w-4 text-green-700" />
                              </div>
                              <div>
                                <h3 className="font-medium text-gray-800">Payment Terms</h3>
                                <p className="text-xs text-gray-500 mt-0.5">Secure international payment options</p>
                              </div>
                            </div>
                          </div>
                          <div className="p-4 hover:bg-gray-50 cursor-pointer">
                            <div className="flex items-center">
                              <div className="bg-amber-100 p-2 rounded-full mr-3">
                                <AlertCircle className="h-4 w-4 text-amber-700" />
                              </div>
                              <div>
                                <h3 className="font-medium text-gray-800">Compliance Requirements</h3>
                                <p className="text-xs text-gray-500 mt-0.5">Regulations for different markets</p>
                              </div>
                            </div>
                          </div>
                          <div className="p-4 hover:bg-gray-50 cursor-pointer">
                            <div className="flex items-center">
                              <div className="bg-red-100 p-2 rounded-full mr-3">
                                <Users className="h-4 w-4 text-red-700" />
                              </div>
                              <div>
                                <h3 className="font-medium text-gray-800">Finding Buyers</h3>
                                <p className="text-xs text-gray-500 mt-0.5">Strategies for connecting with importers</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden">
                      <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg font-semibold text-gray-800">Can't Find an Answer?</CardTitle>
                        <CardDescription>Other ways to get help</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                            <MessageSquareIcon className="h-4 w-4 mr-2" />
                            Create a Support Ticket
                          </Button>
                          <Button className="w-full" variant="outline">
                            <Bot className="h-4 w-4 mr-2" />
                            Ask AI Assistant
                          </Button>
                          <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
                            <h4 className="font-medium text-gray-800 flex items-center">
                              <PhoneIcon className="h-4 w-4 mr-1.5 text-blue-600" />
                              Contact Support
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">
                              Our export specialists are available Monday-Friday, 9am-5pm WIB
                            </p>
                            <div className="mt-2 text-sm font-medium text-blue-700">
                              +62 21 5678 9012
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="articles" className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-6">
                    <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden">
                      <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-center">
                          <div>
                            <CardTitle className="text-lg font-semibold text-gray-800">Help Articles</CardTitle>
                            <CardDescription>Detailed guides for export operations</CardDescription>
                          </div>
                          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                            <SelectTrigger className="w-[180px] border-gray-200 shadow-sm h-9">
                              <SelectValue placeholder="Filter by category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Categories</SelectItem>
                              <SelectItem value="documentation">Documentation</SelectItem>
                              <SelectItem value="logistics">Logistics</SelectItem>
                              <SelectItem value="finance">Finance</SelectItem>
                              <SelectItem value="compliance">Compliance</SelectItem>
                              <SelectItem value="market-research">Market Research</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="relative mt-3">
                          <Input
                            placeholder="Search articles..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 border-gray-200 focus:border-blue-300 shadow-sm"
                          />
                          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        </div>
                      </CardHeader>
                      <CardContent className="p-0">
                        {filteredArticles.length === 0 ? (
                          <div className="p-6 text-center">
                            <div className="rounded-full bg-blue-100 p-3 mx-auto mb-4 w-fit">
                              <SearchIcon className="h-6 w-6 text-blue-600" />
                            </div>
                            <h3 className="text-base font-medium text-gray-800 mb-1">No articles found</h3>
                            <p className="text-sm text-gray-600">Try adjusting your search or filter</p>
                          </div>
                        ) : (
                          <div className="divide-y divide-gray-100">
                            {filteredArticles.map((article) => (
                              <div key={article.id} className="p-6 hover:bg-gray-50">
                                <div className="mb-2 flex items-start justify-between">
                                  <h3 className="text-lg font-semibold text-gray-800">{article.title}</h3>
                                  <Badge className="ml-2 bg-blue-100 text-blue-700 border border-blue-200 h-fit">
                                    <Clock className="h-3 w-3 mr-1" />
                                    {article.readTime}
                                  </Badge>
                                </div>
                                <p className="text-gray-600 mb-3">{article.summary}</p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                  {article.tags.map((tag, idx) => (
                                    <Badge key={idx} variant="outline" className="bg-transparent border-gray-200 text-gray-700">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                                <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                                  <div className="flex items-center text-sm text-gray-500">
                                    <ThumbsUp className="h-3.5 w-3.5 mr-1.5 text-green-500" />
                                    <span>{article.helpful} people found this helpful</span>
                                  </div>
                                  <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                                    Read Article
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                    
                    <div className="flex justify-center">
                      <Button variant="outline" className="border-blue-200 text-blue-700">
                        <RefreshCcw className="h-4 w-4 mr-2" />
                        Load More Articles
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden">
                      <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg font-semibold text-gray-800">Top Rated Articles</CardTitle>
                        <CardDescription>Most helpful resources</CardDescription>
                      </CardHeader>
                      <CardContent className="p-0">
                        <div className="divide-y divide-gray-100">
                          {mockArticles.sort((a, b) => b.helpful - a.helpful).slice(0, 3).map((article) => (
                            <div key={article.id} className="p-4 hover:bg-gray-50 cursor-pointer">
                              <h3 className="font-medium text-gray-800">{article.title}</h3>
                              <div className="flex items-center mt-1 text-xs text-gray-500">
                                <Star className="h-3.5 w-3.5 mr-1 text-amber-500 fill-amber-500" />
                                <span className="mr-2">{article.helpful} helpful votes</span>
                                <Clock className="h-3.5 w-3.5 mx-1" />
                                <span>{article.readTime}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="bg-gray-50 border-t border-gray-100 p-4 text-center">
                        <Button variant="link" className="text-blue-600 hover:text-blue-700">
                          View All Top Articles
                        </Button>
                      </CardFooter>
                    </Card>
                    
                    <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden">
                      <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg font-semibold text-gray-800">Article Categories</CardTitle>
                        <CardDescription>Browse by topic</CardDescription>
                      </CardHeader>
                      <CardContent className="p-0">
                        <div className="divide-y divide-gray-100">
                          <div className="p-4 hover:bg-gray-50 cursor-pointer flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="bg-blue-100 p-2 rounded-full mr-3">
                                <FileText className="h-4 w-4 text-blue-700" />
                              </div>
                              <span className="font-medium text-gray-800">Documentation</span>
                            </div>
                            <Badge className="bg-gray-100 text-gray-700 border border-gray-200">12</Badge>
                          </div>
                          <div className="p-4 hover:bg-gray-50 cursor-pointer flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="bg-purple-100 p-2 rounded-full mr-3">
                                <Cable className="h-4 w-4 text-purple-700" />
                              </div>
                              <span className="font-medium text-gray-800">Logistics</span>
                            </div>
                            <Badge className="bg-gray-100 text-gray-700 border border-gray-200">9</Badge>
                          </div>
                          <div className="p-4 hover:bg-gray-50 cursor-pointer flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="bg-green-100 p-2 rounded-full mr-3">
                                <CircleDollarSign className="h-4 w-4 text-green-700" />
                              </div>
                              <span className="font-medium text-gray-800">Finance</span>
                            </div>
                            <Badge className="bg-gray-100 text-gray-700 border border-gray-200">7</Badge>
                          </div>
                          <div className="p-4 hover:bg-gray-50 cursor-pointer flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="bg-red-100 p-2 rounded-full mr-3">
                                <AlertCircle className="h-4 w-4 text-red-700" />
                              </div>
                              <span className="font-medium text-gray-800">Compliance</span>
                            </div>
                            <Badge className="bg-gray-100 text-gray-700 border border-gray-200">11</Badge>
                          </div>
                          <div className="p-4 hover:bg-gray-50 cursor-pointer flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="bg-amber-100 p-2 rounded-full mr-3">
                                <Globe className="h-4 w-4 text-amber-700" />
                              </div>
                              <span className="font-medium text-gray-800">Market Research</span>
                            </div>
                            <Badge className="bg-gray-100 text-gray-700 border border-gray-200">8</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden">
                      <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg font-semibold text-gray-800">Upcoming Webinars</CardTitle>
                        <CardDescription>Learn from export experts</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-medium text-gray-800">Export Documentation Masterclass</h4>
                              <Badge className="bg-green-100 text-green-700 border border-green-200">
                                <Clock className="h-3 w-3 mr-1" />
                                60 min
                              </Badge>
                            </div>
                            <p className="text-xs text-gray-600 mb-3">Learn how to prepare perfect export documentation and avoid common mistakes.</p>
                            <div className="flex items-center text-xs text-gray-500">
                              <Calendar className="h-3.5 w-3.5 mr-1" />
                              <span>Apr 25, 2024 - 10:00 AM WIB</span>
                            </div>
                          </div>
                          
                          <div className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-medium text-gray-800">Global Market Entry Strategies</h4>
                              <Badge className="bg-purple-100 text-purple-700 border border-purple-200">
                                <Clock className="h-3 w-3 mr-1" />
                                90 min
                              </Badge>
                            </div>
                            <p className="text-xs text-gray-600 mb-3">Strategic approaches to entering new international markets with your products.</p>
                            <div className="flex items-center text-xs text-gray-500">
                              <Calendar className="h-3.5 w-3.5 mr-1" />
                              <span>May 3, 2024 - 2:00 PM WIB</span>
                            </div>
                          </div>
                        </div>
                        <Button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                          <Calendar className="h-4 w-4 mr-2" />
                          View All Webinars
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}