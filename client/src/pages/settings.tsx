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
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import {
  Settings as SettingsIcon,
  User as UserIcon,
  Lock,
  BellRing,
  Globe,
  AlertCircle,
  LogOut,
  Mail,
  Bell,
  Building,
  CreditCard,
  UserPlus,
  Briefcase,
  CheckCircle2,
  ChevronRight,
  LucideIcon,
  FileText,
  UserCog,
  Shield,
  Languages,
  Palette,
  Moon,
  Sun,
  SunMoon,
  Phone,
  MapPin,
  CircleUserRound,
  Banknote,
  Clock,
  ShieldAlert,
  BellOff,
  AtSign,
  Check,
  Calendar,
  Save,
  PencilLine,
  Users,
  Key,
  Link,
  ChevronLeft,
  ChevronDown,
  RefreshCcw,
  ImagePlus,
  Eye,
  Download,
  Share2,
  Trash2,
  Copy,
  XCircle,
  Wallet,
  ArrowRight,
  MessageSquareText,
  HelpCircle,
  Layout,
  PanelLeft,
  Table2,
  Computer,
  Smartphone,
  MoreHorizontal,
  PlusCircle,
  Code,
  BookOpen,
  TerminalSquare,
  Webhook
} from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

interface SettingsNavItemProps {
  icon: LucideIcon;
  title: string;
  description: string;
  isActive: boolean;
  onClick: () => void;
}

function SettingsNavItem({ icon: Icon, title, description, isActive, onClick }: SettingsNavItemProps) {
  return (
    <div 
      className={`p-4 flex items-start cursor-pointer transition-colors duration-200 ${
        isActive ? 'bg-blue-50 border-l-4 border-blue-500' : 'hover:bg-gray-50'
      }`}
      onClick={onClick}
    >
      <div className={`p-2 mr-4 rounded-lg ${isActive ? 'bg-blue-100' : 'bg-gray-100'}`}>
        <Icon className={`h-5 w-5 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
      </div>
      <div>
        <h3 className={`font-medium ${isActive ? 'text-blue-700' : 'text-gray-800'}`}>{title}</h3>
        <p className="text-sm text-gray-500 mt-0.5">{description}</p>
      </div>
    </div>
  );
}

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  company: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  jobTitle: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  country: z.string().optional(),
  timezone: z.string().optional(),
  bio: z.string().optional(),
});

const notificationFormSchema = z.object({
  marketingEmails: z.boolean().default(false),
  securityEmails: z.boolean().default(true),
  updatesEmails: z.boolean().default(true),
  exportAlerts: z.boolean().default(true),
  documentReminders: z.boolean().default(true),
  paymentNotifications: z.boolean().default(true),
  browserNotifications: z.boolean().default(true),
  mobileNotifications: z.boolean().default(false),
});

const securityFormSchema = z.object({
  currentPassword: z.string().min(1, {
    message: "Current password is required.",
  }),
  newPassword: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  confirmPassword: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const paymentMethodFormSchema = z.object({
  cardName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  cardNumber: z.string().min(16, {
    message: "Card number must be valid.",
  }),
  expiryDate: z.string().min(5, {
    message: "Expiry date must be valid.",
  }),
  cvv: z.string().min(3, {
    message: "CVV must be valid.",
  }),
});

export default function Settings() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [activeSettingsTab, setActiveSettingsTab] = useState("account");
  const [activeSection, setActiveSection] = useState("profile");
  const [selectedTheme, setSelectedTheme] = useState("system");
  const [selectedSidebarMode, setSelectedSidebarMode] = useState("expanded");
  const [selectedTableDensity, setSelectedTableDensity] = useState("default");
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [selectedCurrency, setSelectedCurrency] = useState("usd");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [autoLoginEnabled, setAutoLoginEnabled] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState("30");
  
  const mockUser = {
    name: "PT Malindo",
    email: "contact@ptmalindo.com",
    exportReadiness: 65,
  };

  // Profile form
  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "PT Malindo Trading",
      email: "contact@ptmalindo.com",
      company: "PT Malindo",
      jobTitle: "Owner",
      phone: "+62 21 1234 5678",
      address: "Jl. Sudirman No. 123, Jakarta",
      country: "Indonesia",
      timezone: "Asia/Jakarta",
      bio: "Furniture exporter specializing in handcrafted teak products for global markets.",
    },
  });

  // Notifications form
  const notificationForm = useForm<z.infer<typeof notificationFormSchema>>({
    resolver: zodResolver(notificationFormSchema),
    defaultValues: {
      marketingEmails: false,
      securityEmails: true,
      updatesEmails: true,
      exportAlerts: true,
      documentReminders: true,
      paymentNotifications: true,
      browserNotifications: true,
      mobileNotifications: false,
    },
  });

  // Security form
  const securityForm = useForm<z.infer<typeof securityFormSchema>>({
    resolver: zodResolver(securityFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Payment method form
  const paymentMethodForm = useForm<z.infer<typeof paymentMethodFormSchema>>({
    resolver: zodResolver(paymentMethodFormSchema),
    defaultValues: {
      cardName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },
  });

  // Team members data
  const mockTeamMembers = [
    {
      id: 1,
      name: "Budi Santoso",
      email: "budi@ptmalindo.com",
      role: "Admin",
      status: "active",
      lastActive: "Today at 10:45 AM",
      avatar: "/avatars/budi.jpg",
    },
    {
      id: 2,
      name: "Siti Rahayu",
      email: "siti@ptmalindo.com",
      role: "Export Manager",
      status: "active",
      lastActive: "Yesterday at 4:30 PM",
      avatar: "/avatars/siti.jpg",
    },
    {
      id: 3,
      name: "Ahmad Hidayat",
      email: "ahmad@ptmalindo.com",
      role: "Document Specialist",
      status: "invited",
      lastActive: "Pending acceptance",
      avatar: "/avatars/ahmad.jpg",
    }
  ];

  // API Keys data
  const mockApiKeys = [
    {
      id: "key_live_123456789",
      name: "Production API Key",
      lastUsed: "Today at 09:15 AM",
      created: "2024-02-10",
      status: "active",
      scope: ["read", "write"],
    },
    {
      id: "key_test_987654321",
      name: "Testing API Key",
      lastUsed: "Yesterday at 3:30 PM",
      created: "2024-03-05",
      status: "active",
      scope: ["read"],
    }
  ];

  // Integrations data
  const mockIntegrations = [
    {
      id: "shopify",
      name: "Shopify",
      status: "connected",
      lastSync: "Today at 08:30 AM",
      description: "E-commerce platform integration",
      icon: "https://cdn.shopify.com/s/files/1/0533/2089/files/shopify-logo-small.png",
    },
    {
      id: "quickbooks",
      name: "QuickBooks",
      status: "connected",
      lastSync: "Yesterday at 5:15 PM",
      description: "Accounting and invoicing integration",
      icon: "https://quickbooks.intuit.com/oidam/intuit/sbseg/en_us/Blog/graphic/quickbooks-logo-864x430-2x.png",
    },
    {
      id: "mailchimp",
      name: "Mailchimp",
      status: "disconnected",
      lastSync: "Never",
      description: "Email marketing integration",
      icon: "https://mailchimp.com/release/plums/cxp/images/freddie.8d1619a8.svg",
    }
  ];

  // Payment history data
  const mockPaymentHistory = [
    {
      id: "INV-001",
      date: "2024-04-10",
      amount: "$99.00",
      status: "paid",
      method: "Credit Card",
      description: "Monthly subscription - Business Plan",
    },
    {
      id: "INV-002",
      date: "2024-03-10",
      amount: "$99.00",
      status: "paid",
      method: "Credit Card",
      description: "Monthly subscription - Business Plan",
    },
    {
      id: "INV-003",
      date: "2024-02-10",
      amount: "$99.00",
      status: "paid",
      method: "Credit Card",
      description: "Monthly subscription - Business Plan",
    }
  ];

  // Form submission handlers
  const onProfileSubmit = (values: z.infer<typeof profileFormSchema>) => {
    console.log(values);
    // In a real app, this would update the user's profile through an API
    alert("Profile updated successfully!");
  };

  const onNotificationSubmit = (values: z.infer<typeof notificationFormSchema>) => {
    console.log(values);
    // In a real app, this would update the user's notification settings through an API
    alert("Notification preferences updated successfully!");
  };

  const onSecuritySubmit = (values: z.infer<typeof securityFormSchema>) => {
    console.log(values);
    // In a real app, this would update the user's password through an API
    alert("Password updated successfully!");
    securityForm.reset({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  const onPaymentMethodSubmit = (values: z.infer<typeof paymentMethodFormSchema>) => {
    console.log(values);
    // In a real app, this would add a new payment method through an API
    alert("Payment method added successfully!");
    paymentMethodForm.reset();
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
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
              <div className="flex items-center">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-3 text-white shadow-md mr-4">
                  <SettingsIcon className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                  <p className="text-gray-600 mt-1">Manage your account and preferences</p>
                </div>
              </div>
            </div>

            <Tabs defaultValue="account" value={activeSettingsTab} onValueChange={setActiveSettingsTab} className="space-y-4">
              <TabsList className="bg-white border border-gray-100 p-1 shadow-sm rounded-xl w-full grid grid-cols-4 h-auto">
                <TabsTrigger 
                  value="account" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-md transition-all duration-200 flex items-center py-2"
                >
                  <UserIcon className="h-4 w-4 mr-2" />
                  Account
                </TabsTrigger>
                <TabsTrigger 
                  value="appearance" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-md transition-all duration-200 flex items-center py-2"
                >
                  <Palette className="h-4 w-4 mr-2" />
                  Appearance
                </TabsTrigger>
                <TabsTrigger 
                  value="billing" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-md transition-all duration-200 flex items-center py-2"
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Billing
                </TabsTrigger>
                <TabsTrigger 
                  value="developer" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-md transition-all duration-200 flex items-center py-2"
                >
                  <Key className="h-4 w-4 mr-2" />
                  Developer
                </TabsTrigger>
              </TabsList>

              {/* Account Settings Tab */}
              <TabsContent value="account" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden md:col-span-1">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-semibold text-gray-800">Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="divide-y divide-gray-100">
                        <SettingsNavItem
                          icon={UserCog}
                          title="Profile"
                          description="Manage your personal information"
                          isActive={activeSection === "profile"}
                          onClick={() => setActiveSection("profile")}
                        />
                        <SettingsNavItem
                          icon={Bell}
                          title="Notifications"
                          description="Configure your notification preferences"
                          isActive={activeSection === "notifications"}
                          onClick={() => setActiveSection("notifications")}
                        />
                        <SettingsNavItem
                          icon={Shield}
                          title="Security"
                          description="Manage your account security"
                          isActive={activeSection === "security"}
                          onClick={() => setActiveSection("security")}
                        />
                        <SettingsNavItem
                          icon={Users}
                          title="Team"
                          description="Manage your team members"
                          isActive={activeSection === "team"}
                          onClick={() => setActiveSection("team")}
                        />
                        <SettingsNavItem
                          icon={Globe}
                          title="Preferences"
                          description="Set language and regional preferences"
                          isActive={activeSection === "preferences"}
                          onClick={() => setActiveSection("preferences")}
                        />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div className="md:col-span-3">
                    {/* Profile Settings */}
                    {activeSection === "profile" && (
                      <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden">
                        <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
                        <CardHeader>
                          <CardTitle className="text-lg font-semibold text-gray-800">Profile Settings</CardTitle>
                          <CardDescription>Update your personal and company information</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-col lg:flex-row gap-6 items-start">
                            <div className="flex flex-col items-center space-y-3">
                              <Avatar className="h-24 w-24 border-4 border-white shadow-md">
                                <CircleUserRound className="h-full w-full text-gray-300" />
                                <AvatarFallback>PM</AvatarFallback>
                              </Avatar>
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm" className="h-8 text-xs">
                                  <ImagePlus className="h-3.5 w-3.5 mr-1" />
                                  Change
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 text-xs text-gray-500">
                                  <Trash2 className="h-3.5 w-3.5 mr-1" />
                                  Remove
                                </Button>
                              </div>
                            </div>
                            
                            <div className="flex-1 w-full">
                              <Form {...profileForm}>
                                <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField
                                      control={profileForm.control}
                                      name="name"
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel>Full Name</FormLabel>
                                          <FormControl>
                                            <Input placeholder="Your name" {...field} />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                    <FormField
                                      control={profileForm.control}
                                      name="email"
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel>Email</FormLabel>
                                          <FormControl>
                                            <Input placeholder="Your email" {...field} />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                    <FormField
                                      control={profileForm.control}
                                      name="company"
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel>Company Name</FormLabel>
                                          <FormControl>
                                            <Input placeholder="Your company" {...field} />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                    <FormField
                                      control={profileForm.control}
                                      name="jobTitle"
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel>Job Title</FormLabel>
                                          <FormControl>
                                            <Input placeholder="Your job title" {...field} />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                    <FormField
                                      control={profileForm.control}
                                      name="phone"
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel>Phone Number</FormLabel>
                                          <FormControl>
                                            <Input placeholder="Your phone number" {...field} />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                    <FormField
                                      control={profileForm.control}
                                      name="address"
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel>Address</FormLabel>
                                          <FormControl>
                                            <Input placeholder="Your address" {...field} />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                    <FormField
                                      control={profileForm.control}
                                      name="country"
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel>Country</FormLabel>
                                          <Select 
                                            onValueChange={field.onChange} 
                                            defaultValue={field.value}
                                          >
                                            <FormControl>
                                              <SelectTrigger>
                                                <SelectValue placeholder="Select a country" />
                                              </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                              <SelectItem value="indonesia">Indonesia</SelectItem>
                                              <SelectItem value="singapore">Singapore</SelectItem>
                                              <SelectItem value="malaysia">Malaysia</SelectItem>
                                              <SelectItem value="thailand">Thailand</SelectItem>
                                              <SelectItem value="vietnam">Vietnam</SelectItem>
                                            </SelectContent>
                                          </Select>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                    <FormField
                                      control={profileForm.control}
                                      name="timezone"
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel>Timezone</FormLabel>
                                          <Select 
                                            onValueChange={field.onChange} 
                                            defaultValue={field.value}
                                          >
                                            <FormControl>
                                              <SelectTrigger>
                                                <SelectValue placeholder="Select a timezone" />
                                              </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                              <SelectItem value="Asia/Jakarta">Asia/Jakarta (GMT+7)</SelectItem>
                                              <SelectItem value="Asia/Singapore">Asia/Singapore (GMT+8)</SelectItem>
                                              <SelectItem value="Asia/Tokyo">Asia/Tokyo (GMT+9)</SelectItem>
                                              <SelectItem value="Australia/Sydney">Australia/Sydney (GMT+10)</SelectItem>
                                              <SelectItem value="America/Los_Angeles">America/Los_Angeles (GMT-7)</SelectItem>
                                            </SelectContent>
                                          </Select>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                  </div>
                                  
                                  <FormField
                                    control={profileForm.control}
                                    name="bio"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Bio</FormLabel>
                                        <FormControl>
                                          <Textarea 
                                            placeholder="Tell us about your company and export business" 
                                            className="min-h-[120px]"
                                            {...field} 
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  
                                  <div className="flex justify-end space-x-2">
                                    <Button variant="outline" type="button" className="border-gray-200">
                                      Cancel
                                    </Button>
                                    <Button
                                      type="submit"
                                      className="bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                                    >
                                      <Save className="h-4 w-4 mr-2" />
                                      Save Changes
                                    </Button>
                                  </div>
                                </form>
                              </Form>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                    
                    {/* Notifications Settings */}
                    {activeSection === "notifications" && (
                      <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden">
                        <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
                        <CardHeader>
                          <CardTitle className="text-lg font-semibold text-gray-800">Notification Preferences</CardTitle>
                          <CardDescription>Manage how and when you receive notifications</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Form {...notificationForm}>
                            <form onSubmit={notificationForm.handleSubmit(onNotificationSubmit)} className="space-y-6">
                              <div className="space-y-4">
                                <h3 className="font-medium text-gray-800">Email Notifications</h3>
                                <div className="grid grid-cols-1 gap-4">
                                  <FormField
                                    control={notificationForm.control}
                                    name="marketingEmails"
                                    render={({ field }) => (
                                      <FormItem className="flex items-center justify-between space-x-2 p-4 rounded-lg border border-gray-100 bg-white shadow-sm">
                                        <div className="space-y-0.5">
                                          <FormLabel className="font-medium text-gray-800">Marketing Emails</FormLabel>
                                          <FormDescription className="text-xs text-gray-500">
                                            Receive emails about new features, promotions, and export opportunities
                                          </FormDescription>
                                        </div>
                                        <FormControl>
                                          <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                          />
                                        </FormControl>
                                      </FormItem>
                                    )}
                                  />
                                  <FormField
                                    control={notificationForm.control}
                                    name="securityEmails"
                                    render={({ field }) => (
                                      <FormItem className="flex items-center justify-between space-x-2 p-4 rounded-lg border border-gray-100 bg-white shadow-sm">
                                        <div className="space-y-0.5">
                                          <FormLabel className="font-medium text-gray-800">Security Alerts</FormLabel>
                                          <FormDescription className="text-xs text-gray-500">
                                            Receive emails about security updates and suspicious activity
                                          </FormDescription>
                                        </div>
                                        <FormControl>
                                          <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                          />
                                        </FormControl>
                                      </FormItem>
                                    )}
                                  />
                                  <FormField
                                    control={notificationForm.control}
                                    name="updatesEmails"
                                    render={({ field }) => (
                                      <FormItem className="flex items-center justify-between space-x-2 p-4 rounded-lg border border-gray-100 bg-white shadow-sm">
                                        <div className="space-y-0.5">
                                          <FormLabel className="font-medium text-gray-800">Platform Updates</FormLabel>
                                          <FormDescription className="text-xs text-gray-500">
                                            Receive emails about new features, upgrades, and platform changes
                                          </FormDescription>
                                        </div>
                                        <FormControl>
                                          <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                          />
                                        </FormControl>
                                      </FormItem>
                                    )}
                                  />
                                </div>
                              </div>
                              
                              <Separator />
                              
                              <div className="space-y-4">
                                <h3 className="font-medium text-gray-800">Export Operations Notifications</h3>
                                <div className="grid grid-cols-1 gap-4">
                                  <FormField
                                    control={notificationForm.control}
                                    name="exportAlerts"
                                    render={({ field }) => (
                                      <FormItem className="flex items-center justify-between space-x-2 p-4 rounded-lg border border-gray-100 bg-white shadow-sm">
                                        <div className="space-y-0.5">
                                          <FormLabel className="font-medium text-gray-800">Export Status Alerts</FormLabel>
                                          <FormDescription className="text-xs text-gray-500">
                                            Receive notifications about changes to your shipment status
                                          </FormDescription>
                                        </div>
                                        <FormControl>
                                          <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                          />
                                        </FormControl>
                                      </FormItem>
                                    )}
                                  />
                                  <FormField
                                    control={notificationForm.control}
                                    name="documentReminders"
                                    render={({ field }) => (
                                      <FormItem className="flex items-center justify-between space-x-2 p-4 rounded-lg border border-gray-100 bg-white shadow-sm">
                                        <div className="space-y-0.5">
                                          <FormLabel className="font-medium text-gray-800">Document Reminders</FormLabel>
                                          <FormDescription className="text-xs text-gray-500">
                                            Receive reminders about upcoming document deadlines
                                          </FormDescription>
                                        </div>
                                        <FormControl>
                                          <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                          />
                                        </FormControl>
                                      </FormItem>
                                    )}
                                  />
                                  <FormField
                                    control={notificationForm.control}
                                    name="paymentNotifications"
                                    render={({ field }) => (
                                      <FormItem className="flex items-center justify-between space-x-2 p-4 rounded-lg border border-gray-100 bg-white shadow-sm">
                                        <div className="space-y-0.5">
                                          <FormLabel className="font-medium text-gray-800">Payment Notifications</FormLabel>
                                          <FormDescription className="text-xs text-gray-500">
                                            Receive notifications about payment status changes and due dates
                                          </FormDescription>
                                        </div>
                                        <FormControl>
                                          <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                          />
                                        </FormControl>
                                      </FormItem>
                                    )}
                                  />
                                </div>
                              </div>
                              
                              <Separator />
                              
                              <div className="space-y-4">
                                <h3 className="font-medium text-gray-800">Notification Channels</h3>
                                <div className="grid grid-cols-1 gap-4">
                                  <FormField
                                    control={notificationForm.control}
                                    name="browserNotifications"
                                    render={({ field }) => (
                                      <FormItem className="flex items-center justify-between space-x-2 p-4 rounded-lg border border-gray-100 bg-white shadow-sm">
                                        <div className="space-y-0.5">
                                          <FormLabel className="font-medium text-gray-800">Browser Notifications</FormLabel>
                                          <FormDescription className="text-xs text-gray-500">
                                            Receive notifications in your browser when you're using the platform
                                          </FormDescription>
                                        </div>
                                        <FormControl>
                                          <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                          />
                                        </FormControl>
                                      </FormItem>
                                    )}
                                  />
                                  <FormField
                                    control={notificationForm.control}
                                    name="mobileNotifications"
                                    render={({ field }) => (
                                      <FormItem className="flex items-center justify-between space-x-2 p-4 rounded-lg border border-gray-100 bg-white shadow-sm">
                                        <div className="space-y-0.5">
                                          <FormLabel className="font-medium text-gray-800">Mobile Notifications</FormLabel>
                                          <FormDescription className="text-xs text-gray-500">
                                            Receive push notifications on your mobile device
                                          </FormDescription>
                                        </div>
                                        <FormControl>
                                          <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                          />
                                        </FormControl>
                                      </FormItem>
                                    )}
                                  />
                                </div>
                              </div>
                              
                              <div className="flex justify-end space-x-2">
                                <Button variant="outline" type="button" className="border-gray-200">
                                  Cancel
                                </Button>
                                <Button
                                  type="submit"
                                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                                >
                                  <Save className="h-4 w-4 mr-2" />
                                  Save Preferences
                                </Button>
                              </div>
                            </form>
                          </Form>
                        </CardContent>
                      </Card>
                    )}
                    
                    {/* Security Settings */}
                    {activeSection === "security" && (
                      <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden">
                        <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
                        <CardHeader>
                          <CardTitle className="text-lg font-semibold text-gray-800">Security Settings</CardTitle>
                          <CardDescription>Manage your account security and authentication</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-8">
                            <div>
                              <h3 className="font-medium text-gray-800 mb-4">Change Password</h3>
                              <Form {...securityForm}>
                                <form onSubmit={securityForm.handleSubmit(onSecuritySubmit)} className="space-y-4">
                                  <FormField
                                    control={securityForm.control}
                                    name="currentPassword"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Current Password</FormLabel>
                                        <FormControl>
                                          <Input type="password" placeholder="Enter your current password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  <FormField
                                    control={securityForm.control}
                                    name="newPassword"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>New Password</FormLabel>
                                        <FormControl>
                                          <Input type="password" placeholder="Enter your new password" {...field} />
                                        </FormControl>
                                        <FormDescription className="text-xs">
                                          Password must be at least 8 characters and include a mix of letters, numbers, and symbols.
                                        </FormDescription>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  <FormField
                                    control={securityForm.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                          <Input type="password" placeholder="Confirm your new password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  <div className="flex justify-end space-x-2 pt-2">
                                    <Button
                                      type="submit"
                                      className="bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                                    >
                                      Update Password
                                    </Button>
                                  </div>
                                </form>
                              </Form>
                            </div>
                            
                            <Separator />
                            
                            <div>
                              <h3 className="font-medium text-gray-800 mb-4">Two-Factor Authentication</h3>
                              <div className="p-4 rounded-lg border border-gray-100 bg-white shadow-sm flex items-center justify-between">
                                <div className="space-y-1">
                                  <p className="font-medium text-gray-800">Two-Factor Authentication</p>
                                  <p className="text-sm text-gray-500">
                                    Add an extra layer of security to your account by requiring a verification code
                                  </p>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Switch
                                    checked={twoFactorEnabled}
                                    onCheckedChange={setTwoFactorEnabled}
                                  />
                                  <span className="text-sm font-medium text-gray-600">
                                    {twoFactorEnabled ? "Enabled" : "Disabled"}
                                  </span>
                                </div>
                              </div>
                              
                              {twoFactorEnabled && (
                                <div className="mt-4 p-4 rounded-lg bg-blue-50 border border-blue-100">
                                  <h4 className="font-medium text-gray-800 mb-2 flex items-center">
                                    <ShieldAlert className="h-4 w-4 mr-1.5 text-blue-600" />
                                    Recovery Options
                                  </h4>
                                  <p className="text-sm text-gray-600 mb-3">
                                    Download backup codes to access your account if you lose your authentication device.
                                  </p>
                                  <Button variant="outline" size="sm" className="h-8 text-xs border-blue-200 text-blue-700">
                                    <Download className="h-3.5 w-3.5 mr-1.5" />
                                    Download Backup Codes
                                  </Button>
                                </div>
                              )}
                            </div>
                            
                            <Separator />
                            
                            <div>
                              <h3 className="font-medium text-gray-800 mb-4">Login Sessions</h3>
                              <div className="space-y-3">
                                <div className="p-4 rounded-lg border border-gray-100 bg-white shadow-sm">
                                  <div className="flex justify-between items-center mb-2">
                                    <div className="flex items-center">
                                      <div className="bg-green-100 p-1.5 rounded-full mr-3">
                                        <Computer className="h-4 w-4 text-green-600" />
                                      </div>
                                      <div>
                                        <p className="font-medium text-gray-800">Current Session</p>
                                        <p className="text-xs text-gray-500">Jakarta, Indonesia • Chrome on Windows</p>
                                      </div>
                                    </div>
                                    <Badge className="bg-green-100 text-green-700 border border-green-200">Active</Badge>
                                  </div>
                                  <div className="flex justify-between items-center text-xs text-gray-500">
                                    <div className="flex items-center">
                                      <Clock className="h-3.5 w-3.5 mr-1" />
                                      <span>Started: Today at 09:15 AM</span>
                                    </div>
                                    <Button variant="ghost" size="sm" className="h-7 text-xs text-gray-500">
                                      <LogOut className="h-3.5 w-3.5 mr-1" />
                                      Sign Out
                                    </Button>
                                  </div>
                                </div>
                                
                                <div className="p-4 rounded-lg border border-gray-100 bg-white shadow-sm">
                                  <div className="flex justify-between items-center mb-2">
                                    <div className="flex items-center">
                                      <div className="bg-gray-100 p-1.5 rounded-full mr-3">
                                        <Smartphone className="h-4 w-4 text-gray-600" />
                                      </div>
                                      <div>
                                        <p className="font-medium text-gray-800">Mobile App</p>
                                        <p className="text-xs text-gray-500">Jakarta, Indonesia • Exvorta App on iPhone</p>
                                      </div>
                                    </div>
                                    <Badge className="bg-gray-100 text-gray-700 border border-gray-200">Inactive</Badge>
                                  </div>
                                  <div className="flex justify-between items-center text-xs text-gray-500">
                                    <div className="flex items-center">
                                      <Clock className="h-3.5 w-3.5 mr-1" />
                                      <span>Last active: Yesterday at 4:30 PM</span>
                                    </div>
                                    <Button variant="ghost" size="sm" className="h-7 text-xs text-red-500">
                                      <XCircle className="h-3.5 w-3.5 mr-1" />
                                      Revoke
                                    </Button>
                                  </div>
                                </div>
                              </div>
                              <div className="mt-3">
                                <Button variant="outline" size="sm" className="h-8 text-xs border-gray-200 text-gray-700">
                                  <LogOut className="h-3.5 w-3.5 mr-1.5" />
                                  Sign Out of All Devices
                                </Button>
                              </div>
                            </div>
                            
                            <Separator />
                            
                            <div>
                              <h3 className="font-medium text-gray-800 mb-4">Session Settings</h3>
                              <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 rounded-lg border border-gray-100 bg-white shadow-sm">
                                  <div className="space-y-0.5">
                                    <p className="font-medium text-gray-800">Auto Login</p>
                                    <p className="text-xs text-gray-500">
                                      Stay logged in after you close the browser
                                    </p>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Switch
                                      checked={autoLoginEnabled}
                                      onCheckedChange={setAutoLoginEnabled}
                                    />
                                    <span className="text-sm font-medium text-gray-600">
                                      {autoLoginEnabled ? "Enabled" : "Disabled"}
                                    </span>
                                  </div>
                                </div>
                                
                                <div className="p-4 rounded-lg border border-gray-100 bg-white shadow-sm">
                                  <div className="flex justify-between items-center mb-2">
                                    <div className="space-y-0.5">
                                      <p className="font-medium text-gray-800">Session Timeout</p>
                                      <p className="text-xs text-gray-500">
                                        Automatically log out after a period of inactivity
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-center space-x-3 mt-2">
                                    <Select value={sessionTimeout} onValueChange={setSessionTimeout}>
                                      <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select timeout period" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="15">15 minutes</SelectItem>
                                        <SelectItem value="30">30 minutes</SelectItem>
                                        <SelectItem value="60">1 hour</SelectItem>
                                        <SelectItem value="120">2 hours</SelectItem>
                                        <SelectItem value="never">Never timeout</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                    
                    {/* Team Settings */}
                    {activeSection === "team" && (
                      <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden">
                        <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
                        <CardHeader className="flex flex-row items-center justify-between">
                          <div>
                            <CardTitle className="text-lg font-semibold text-gray-800">Team Management</CardTitle>
                            <CardDescription>Manage team members and permissions</CardDescription>
                          </div>
                          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                            <UserPlus className="h-4 w-4 mr-2" />
                            Invite Member
                          </Button>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-6">
                            <div className="overflow-x-auto">
                              <table className="w-full border-collapse">
                                <thead className="bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  <tr>
                                    <th className="px-6 py-3 text-left">User</th>
                                    <th className="px-6 py-3 text-left">Role</th>
                                    <th className="px-6 py-3 text-left">Status</th>
                                    <th className="px-6 py-3 text-left">Last Active</th>
                                    <th className="px-6 py-3 text-left">Actions</th>
                                  </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                  {mockTeamMembers.map((member) => (
                                    <tr key={member.id} className="hover:bg-gray-50">
                                      <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                          <Avatar className="h-8 w-8 mr-3">
                                            <CircleUserRound className="h-full w-full text-gray-300" />
                                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                          </Avatar>
                                          <div>
                                            <div className="font-medium text-gray-800">{member.name}</div>
                                            <div className="text-xs text-gray-500">{member.email}</div>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap">
                                        <Select defaultValue={member.role.toLowerCase()}>
                                          <SelectTrigger className="w-32 h-8 text-xs bg-transparent border-none shadow-none focus:ring-0">
                                            <SelectValue placeholder="Select role" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="admin">Admin</SelectItem>
                                            <SelectItem value="manager">Manager</SelectItem>
                                            <SelectItem value="specialist">Specialist</SelectItem>
                                            <SelectItem value="viewer">Viewer</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap">
                                        <Badge className={
                                          member.status === 'active' 
                                            ? 'bg-green-100 text-green-700 border border-green-200' 
                                            : 'bg-amber-100 text-amber-700 border border-amber-200'
                                        }>
                                          {member.status === 'active' ? 'Active' : 'Invited'}
                                        </Badge>
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {member.lastActive}
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <DropdownMenu>
                                          <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                              <span className="sr-only">Open menu</span>
                                              <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                          </DropdownMenuTrigger>
                                          <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuItem>
                                              <PencilLine className="h-4 w-4 mr-2" />
                                              Edit User
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                              <Mail className="h-4 w-4 mr-2" />
                                              Send Email
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="text-red-600">
                                              <Trash2 className="h-4 w-4 mr-2" />
                                              Remove User
                                            </DropdownMenuItem>
                                          </DropdownMenuContent>
                                        </DropdownMenu>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                            
                            <Separator />
                            
                            <div>
                              <h3 className="font-medium text-gray-800 mb-4">Access Control Settings</h3>
                              <div className="space-y-4">
                                <div className="p-4 rounded-lg border border-gray-100 bg-white shadow-sm">
                                  <div className="flex items-center justify-between mb-3">
                                    <h4 className="font-medium text-gray-800">Role Permissions</h4>
                                    <Button variant="outline" size="sm" className="h-8 text-xs border-gray-200 text-gray-700">
                                      <PencilLine className="h-3.5 w-3.5 mr-1.5" />
                                      Edit Roles
                                    </Button>
                                  </div>
                                  
                                  <div className="space-y-3">
                                    <div className="p-3 bg-gray-50 rounded-lg">
                                      <div className="flex justify-between items-center mb-2">
                                        <h5 className="font-medium text-gray-800">Admin</h5>
                                        <Badge className="bg-gray-100 text-gray-700 border border-gray-200">Full Access</Badge>
                                      </div>
                                      <p className="text-xs text-gray-600">
                                        Can manage team members, billing, and all platform features.
                                      </p>
                                    </div>
                                    
                                    <div className="p-3 bg-gray-50 rounded-lg">
                                      <div className="flex justify-between items-center mb-2">
                                        <h5 className="font-medium text-gray-800">Manager</h5>
                                        <Badge className="bg-gray-100 text-gray-700 border border-gray-200">Limited Access</Badge>
                                      </div>
                                      <p className="text-xs text-gray-600">
                                        Can manage projects, documents, and view reports, but cannot change billing or team settings.
                                      </p>
                                    </div>
                                    
                                    <div className="p-3 bg-gray-50 rounded-lg">
                                      <div className="flex justify-between items-center mb-2">
                                        <h5 className="font-medium text-gray-800">Specialist</h5>
                                        <Badge className="bg-gray-100 text-gray-700 border border-gray-200">Limited Access</Badge>
                                      </div>
                                      <p className="text-xs text-gray-600">
                                        Can create and edit documents, update project status, but cannot manage users.
                                      </p>
                                    </div>
                                    
                                    <div className="p-3 bg-gray-50 rounded-lg">
                                      <div className="flex justify-between items-center mb-2">
                                        <h5 className="font-medium text-gray-800">Viewer</h5>
                                        <Badge className="bg-gray-100 text-gray-700 border border-gray-200">Read Only</Badge>
                                      </div>
                                      <p className="text-xs text-gray-600">
                                        Can only view projects, documents, and reports without editing capabilities.
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                    
                    {/* Preferences Settings */}
                    {activeSection === "preferences" && (
                      <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden">
                        <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
                        <CardHeader>
                          <CardTitle className="text-lg font-semibold text-gray-800">Preferences</CardTitle>
                          <CardDescription>Customize your language and regional settings</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-3">
                                <Label htmlFor="language" className="font-medium text-gray-800">Language</Label>
                                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                                  <SelectTrigger id="language" className="w-full">
                                    <SelectValue placeholder="Select language" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="en">English</SelectItem>
                                    <SelectItem value="id">Bahasa Indonesia</SelectItem>
                                    <SelectItem value="zh">Chinese (Simplified)</SelectItem>
                                    <SelectItem value="ja">Japanese</SelectItem>
                                    <SelectItem value="ko">Korean</SelectItem>
                                  </SelectContent>
                                </Select>
                                <p className="text-xs text-gray-500">
                                  This will change the language of the user interface
                                </p>
                              </div>
                              
                              <div className="space-y-3">
                                <Label htmlFor="currency" className="font-medium text-gray-800">Currency</Label>
                                <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
                                  <SelectTrigger id="currency" className="w-full">
                                    <SelectValue placeholder="Select currency" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="usd">USD - US Dollar</SelectItem>
                                    <SelectItem value="idr">IDR - Indonesian Rupiah</SelectItem>
                                    <SelectItem value="sgd">SGD - Singapore Dollar</SelectItem>
                                    <SelectItem value="eur">EUR - Euro</SelectItem>
                                    <SelectItem value="jpy">JPY - Japanese Yen</SelectItem>
                                  </SelectContent>
                                </Select>
                                <p className="text-xs text-gray-500">
                                  Default currency for prices and financial calculations
                                </p>
                              </div>
                            </div>
                            
                            <Separator />
                            
                            <div className="space-y-6">
                              <h3 className="font-medium text-gray-800">Date & Time Format</h3>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                  <Radio className="peer sr-only" id="dateformat-1" name="dateformat" value="mdy" defaultChecked />
                                  <Label
                                    htmlFor="dateformat-1"
                                    className="flex flex-col items-center justify-between rounded-lg border-2 border-gray-100 p-4 hover:bg-gray-50 hover:border-gray-200 peer-checked:border-blue-500 peer-checked:bg-blue-50"
                                  >
                                    <div className="font-medium text-gray-800">MM/DD/YYYY</div>
                                    <div className="text-xs text-gray-500 mt-1">04/20/2024</div>
                                  </Label>
                                </div>
                                
                                <div>
                                  <Radio className="peer sr-only" id="dateformat-2" name="dateformat" value="dmy" />
                                  <Label
                                    htmlFor="dateformat-2"
                                    className="flex flex-col items-center justify-between rounded-lg border-2 border-gray-100 p-4 hover:bg-gray-50 hover:border-gray-200 peer-checked:border-blue-500 peer-checked:bg-blue-50"
                                  >
                                    <div className="font-medium text-gray-800">DD/MM/YYYY</div>
                                    <div className="text-xs text-gray-500 mt-1">20/04/2024</div>
                                  </Label>
                                </div>
                                
                                <div>
                                  <Radio className="peer sr-only" id="dateformat-3" name="dateformat" value="ymd" />
                                  <Label
                                    htmlFor="dateformat-3"
                                    className="flex flex-col items-center justify-between rounded-lg border-2 border-gray-100 p-4 hover:bg-gray-50 hover:border-gray-200 peer-checked:border-blue-500 peer-checked:bg-blue-50"
                                  >
                                    <div className="font-medium text-gray-800">YYYY-MM-DD</div>
                                    <div className="text-xs text-gray-500 mt-1">2024-04-20</div>
                                  </Label>
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <div>
                                  <Radio className="peer sr-only" id="timeformat-1" name="timeformat" value="12" defaultChecked />
                                  <Label
                                    htmlFor="timeformat-1"
                                    className="flex flex-col items-center justify-between rounded-lg border-2 border-gray-100 p-4 hover:bg-gray-50 hover:border-gray-200 peer-checked:border-blue-500 peer-checked:bg-blue-50"
                                  >
                                    <div className="font-medium text-gray-800">12-hour</div>
                                    <div className="text-xs text-gray-500 mt-1">3:30 PM</div>
                                  </Label>
                                </div>
                                
                                <div>
                                  <Radio className="peer sr-only" id="timeformat-2" name="timeformat" value="24" />
                                  <Label
                                    htmlFor="timeformat-2"
                                    className="flex flex-col items-center justify-between rounded-lg border-2 border-gray-100 p-4 hover:bg-gray-50 hover:border-gray-200 peer-checked:border-blue-500 peer-checked:bg-blue-50"
                                  >
                                    <div className="font-medium text-gray-800">24-hour</div>
                                    <div className="text-xs text-gray-500 mt-1">15:30</div>
                                  </Label>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex justify-end space-x-2 pt-4">
                              <Button variant="outline" type="button" className="border-gray-200">
                                Cancel
                              </Button>
                              <Button
                                type="button"
                                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                                onClick={() => alert("Preferences saved successfully!")}
                              >
                                <Save className="h-4 w-4 mr-2" />
                                Save Preferences
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              </TabsContent>
              
              {/* Appearance Settings Tab */}
              <TabsContent value="appearance" className="mt-6">
                <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden">
                  <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-800">Appearance</CardTitle>
                    <CardDescription>Customize how Exvorta looks and feels</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-medium text-gray-800">Theme</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Radio className="peer sr-only" id="theme-1" name="theme" value="light" checked={selectedTheme === "light"} onChange={() => setSelectedTheme("light")} />
                          <Label
                            htmlFor="theme-1"
                            className="flex flex-col items-center justify-between rounded-lg border-2 border-gray-100 p-4 hover:bg-gray-50 hover:border-gray-200 peer-checked:border-blue-500 peer-checked:bg-blue-50"
                          >
                            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-white border border-gray-200 mb-3">
                              <Sun className="h-6 w-6 text-amber-500" />
                            </div>
                            <div className="font-medium text-gray-800">Light</div>
                            <div className="text-xs text-gray-500 mt-1">Bright mode</div>
                          </Label>
                        </div>
                        
                        <div>
                          <Radio className="peer sr-only" id="theme-2" name="theme" value="dark" checked={selectedTheme === "dark"} onChange={() => setSelectedTheme("dark")} />
                          <Label
                            htmlFor="theme-2"
                            className="flex flex-col items-center justify-between rounded-lg border-2 border-gray-100 p-4 hover:bg-gray-50 hover:border-gray-200 peer-checked:border-blue-500 peer-checked:bg-blue-50"
                          >
                            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-800 border border-gray-700 mb-3">
                              <Moon className="h-6 w-6 text-gray-100" />
                            </div>
                            <div className="font-medium text-gray-800">Dark</div>
                            <div className="text-xs text-gray-500 mt-1">Dark mode</div>
                          </Label>
                        </div>
                        
                        <div>
                          <Radio className="peer sr-only" id="theme-3" name="theme" value="system" checked={selectedTheme === "system"} onChange={() => setSelectedTheme("system")} />
                          <Label
                            htmlFor="theme-3"
                            className="flex flex-col items-center justify-between rounded-lg border-2 border-gray-100 p-4 hover:bg-gray-50 hover:border-gray-200 peer-checked:border-blue-500 peer-checked:bg-blue-50"
                          >
                            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br from-gray-800 to-white border border-gray-300 mb-3">
                              <SunMoon className="h-6 w-6 text-blue-500" />
                            </div>
                            <div className="font-medium text-gray-800">System</div>
                            <div className="text-xs text-gray-500 mt-1">Follow system</div>
                          </Label>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="font-medium text-gray-800">Layout</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Radio className="peer sr-only" id="sidebar-1" name="sidebar" value="expanded" checked={selectedSidebarMode === "expanded"} onChange={() => setSelectedSidebarMode("expanded")} />
                          <Label
                            htmlFor="sidebar-1"
                            className="flex flex-col items-center justify-between rounded-lg border-2 border-gray-100 p-4 hover:bg-gray-50 hover:border-gray-200 peer-checked:border-blue-500 peer-checked:bg-blue-50"
                          >
                            <div className="flex items-center justify-center w-full h-24 bg-white border border-gray-200 rounded-lg mb-3">
                              <div className="h-full w-1/4 bg-gray-100 flex items-center justify-center">
                                <PanelLeft className="h-5 w-5 text-gray-500" />
                              </div>
                              <div className="h-full w-3/4 bg-white p-2">
                                <div className="w-3/4 h-3 bg-gray-200 rounded mb-2"></div>
                                <div className="w-1/2 h-3 bg-gray-200 rounded"></div>
                              </div>
                            </div>
                            <div className="font-medium text-gray-800">Expanded Sidebar</div>
                            <div className="text-xs text-gray-500 mt-1">Always show sidebar text</div>
                          </Label>
                        </div>
                        
                        <div>
                          <Radio className="peer sr-only" id="sidebar-2" name="sidebar" value="compact" checked={selectedSidebarMode === "compact"} onChange={() => setSelectedSidebarMode("compact")} />
                          <Label
                            htmlFor="sidebar-2"
                            className="flex flex-col items-center justify-between rounded-lg border-2 border-gray-100 p-4 hover:bg-gray-50 hover:border-gray-200 peer-checked:border-blue-500 peer-checked:bg-blue-50"
                          >
                            <div className="flex items-center justify-center w-full h-24 bg-white border border-gray-200 rounded-lg mb-3">
                              <div className="h-full w-12 bg-gray-100 flex items-center justify-center">
                                <Layout className="h-5 w-5 text-gray-500" />
                              </div>
                              <div className="h-full flex-1 bg-white p-2">
                                <div className="w-3/4 h-3 bg-gray-200 rounded mb-2"></div>
                                <div className="w-1/2 h-3 bg-gray-200 rounded"></div>
                              </div>
                            </div>
                            <div className="font-medium text-gray-800">Compact Sidebar</div>
                            <div className="text-xs text-gray-500 mt-1">Show only icons when collapsed</div>
                          </Label>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="font-medium text-gray-800">Table Density</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Radio className="peer sr-only" id="density-1" name="density" value="compact" checked={selectedTableDensity === "compact"} onChange={() => setSelectedTableDensity("compact")} />
                          <Label
                            htmlFor="density-1"
                            className="flex flex-col items-center justify-between rounded-lg border-2 border-gray-100 p-4 hover:bg-gray-50 hover:border-gray-200 peer-checked:border-blue-500 peer-checked:bg-blue-50"
                          >
                            <div className="w-full h-16 border border-gray-200 rounded overflow-hidden">
                              <div className="w-full h-1/3 bg-gray-100 flex items-center px-2">
                                <div className="w-3/4 h-2 bg-gray-200 rounded"></div>
                              </div>
                              <div className="w-full h-1/3 bg-white flex items-center px-2">
                                <div className="w-2/3 h-2 bg-gray-200 rounded"></div>
                              </div>
                              <div className="w-full h-1/3 bg-gray-50 flex items-center px-2">
                                <div className="w-1/2 h-2 bg-gray-200 rounded"></div>
                              </div>
                            </div>
                            <div className="font-medium text-gray-800 mt-2">Compact</div>
                            <div className="text-xs text-gray-500 mt-1">Less space between rows</div>
                          </Label>
                        </div>
                        
                        <div>
                          <Radio className="peer sr-only" id="density-2" name="density" value="default" checked={selectedTableDensity === "default"} onChange={() => setSelectedTableDensity("default")} />
                          <Label
                            htmlFor="density-2"
                            className="flex flex-col items-center justify-between rounded-lg border-2 border-gray-100 p-4 hover:bg-gray-50 hover:border-gray-200 peer-checked:border-blue-500 peer-checked:bg-blue-50"
                          >
                            <div className="w-full h-20 border border-gray-200 rounded overflow-hidden">
                              <div className="w-full h-1/3 bg-gray-100 flex items-center px-2">
                                <div className="w-3/4 h-2 bg-gray-200 rounded"></div>
                              </div>
                              <div className="w-full h-1/3 bg-white flex items-center px-2">
                                <div className="w-2/3 h-2 bg-gray-200 rounded"></div>
                              </div>
                              <div className="w-full h-1/3 bg-gray-50 flex items-center px-2">
                                <div className="w-1/2 h-2 bg-gray-200 rounded"></div>
                              </div>
                            </div>
                            <div className="font-medium text-gray-800 mt-2">Default</div>
                            <div className="text-xs text-gray-500 mt-1">Standard spacing</div>
                          </Label>
                        </div>
                        
                        <div>
                          <Radio className="peer sr-only" id="density-3" name="density" value="comfortable" checked={selectedTableDensity === "comfortable"} onChange={() => setSelectedTableDensity("comfortable")} />
                          <Label
                            htmlFor="density-3"
                            className="flex flex-col items-center justify-between rounded-lg border-2 border-gray-100 p-4 hover:bg-gray-50 hover:border-gray-200 peer-checked:border-blue-500 peer-checked:bg-blue-50"
                          >
                            <div className="w-full h-24 border border-gray-200 rounded overflow-hidden">
                              <div className="w-full h-1/3 bg-gray-100 flex items-center px-2">
                                <div className="w-3/4 h-2 bg-gray-200 rounded"></div>
                              </div>
                              <div className="w-full h-1/3 bg-white flex items-center px-2">
                                <div className="w-2/3 h-2 bg-gray-200 rounded"></div>
                              </div>
                              <div className="w-full h-1/3 bg-gray-50 flex items-center px-2">
                                <div className="w-1/2 h-2 bg-gray-200 rounded"></div>
                              </div>
                            </div>
                            <div className="font-medium text-gray-800 mt-2">Comfortable</div>
                            <div className="text-xs text-gray-500 mt-1">More space between rows</div>
                          </Label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 flex justify-end">
                      <Button
                        type="button"
                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                        onClick={() => alert("Appearance settings saved successfully!")}
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save Appearance Settings
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Billing Settings Tab */}
              <TabsContent value="billing" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden">
                      <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
                      <CardHeader>
                        <CardTitle className="text-lg font-semibold text-gray-800">Billing Information</CardTitle>
                        <CardDescription>Manage your subscription and payment methods</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
                            <div className="flex items-start justify-between">
                              <div className="space-y-1">
                                <p className="text-sm text-gray-500">Current Plan</p>
                                <h3 className="text-lg font-semibold text-gray-800">Business Plan</h3>
                                <div className="flex items-center">
                                  <Badge className="bg-green-100 text-green-700 border border-green-200">Active</Badge>
                                  <span className="text-sm text-gray-500 ml-2">$99/month</span>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-gray-500">Next billing date</p>
                                <p className="font-medium text-gray-800">May 10, 2024</p>
                              </div>
                            </div>
                            <div className="mt-4 flex">
                              <Button variant="default" className="mr-2">
                                Change Plan
                              </Button>
                              <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
                                Cancel Subscription
                              </Button>
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="font-medium text-gray-800 mb-4">Payment Methods</h3>
                            <div className="space-y-3">
                              <div className="p-4 rounded-lg border border-gray-100 bg-white shadow-sm">
                                <div className="flex justify-between items-center">
                                  <div className="flex items-center">
                                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                                      <CreditCard className="h-4 w-4 text-blue-700" />
                                    </div>
                                    <div>
                                      <p className="font-medium text-gray-800">Visa ending in 4242</p>
                                      <p className="text-xs text-gray-500">Expires 05/2025</p>
                                    </div>
                                  </div>
                                  <Badge className="bg-green-100 text-green-700 border border-green-200">Default</Badge>
                                </div>
                                <div className="flex justify-end mt-2 space-x-2">
                                  <Button variant="ghost" size="sm" className="h-8 text-xs text-gray-500">
                                    <PencilLine className="h-3.5 w-3.5 mr-1" />
                                    Edit
                                  </Button>
                                  <Button variant="ghost" size="sm" className="h-8 text-xs text-red-500">
                                    <Trash2 className="h-3.5 w-3.5 mr-1" />
                                    Remove
                                  </Button>
                                </div>
                              </div>
                            </div>
                            <div className="mt-3">
                              <Button variant="outline" size="sm" className="h-9 border-gray-200">
                                <PlusCircle className="h-4 w-4 mr-2" />
                                Add Payment Method
                              </Button>
                            </div>
                          </div>
                          
                          <div className="pt-4">
                            <h3 className="font-medium text-gray-800 mb-4">Add New Payment Method</h3>
                            <Form {...paymentMethodForm}>
                              <form onSubmit={paymentMethodForm.handleSubmit(onPaymentMethodSubmit)} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  <FormField
                                    control={paymentMethodForm.control}
                                    name="cardName"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Name on Card</FormLabel>
                                        <FormControl>
                                          <Input placeholder="John Doe" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  <FormField
                                    control={paymentMethodForm.control}
                                    name="cardNumber"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Card Number</FormLabel>
                                        <FormControl>
                                          <Input placeholder="1234 5678 9012 3456" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  <FormField
                                    control={paymentMethodForm.control}
                                    name="expiryDate"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Expiry Date</FormLabel>
                                        <FormControl>
                                          <Input placeholder="MM/YY" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  <FormField
                                    control={paymentMethodForm.control}
                                    name="cvv"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>CVV</FormLabel>
                                        <FormControl>
                                          <Input placeholder="123" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </div>
                                <div className="flex justify-end">
                                  <Button
                                    type="submit"
                                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                                  >
                                    Add Payment Method
                                  </Button>
                                </div>
                              </form>
                            </Form>
                          </div>
                          
                          <Separator />
                          
                          <div>
                            <h3 className="font-medium text-gray-800 mb-4">Billing History</h3>
                            <div className="overflow-x-auto">
                              <table className="w-full border-collapse">
                                <thead className="bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  <tr>
                                    <th className="px-4 py-3 text-left">Invoice</th>
                                    <th className="px-4 py-3 text-left">Date</th>
                                    <th className="px-4 py-3 text-left">Amount</th>
                                    <th className="px-4 py-3 text-left">Status</th>
                                    <th className="px-4 py-3 text-right">Actions</th>
                                  </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                  {mockPaymentHistory.map((invoice) => (
                                    <tr key={invoice.id} className="hover:bg-gray-50">
                                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-800">
                                        {invoice.id}
                                      </td>
                                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                        {invoice.date}
                                      </td>
                                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                        {invoice.amount}
                                      </td>
                                      <td className="px-4 py-3 whitespace-nowrap">
                                        <Badge className="bg-green-100 text-green-700 border border-green-200">
                                          {invoice.status}
                                        </Badge>
                                      </td>
                                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right">
                                        <Button variant="ghost" size="sm" className="h-8 text-xs text-gray-500">
                                          <Download className="h-3.5 w-3.5 mr-1" />
                                          Download
                                        </Button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="space-y-6">
                    <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden">
                      <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg font-semibold text-gray-800">Plan Details</CardTitle>
                        <CardDescription>Your current subscription</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                            <h3 className="text-center font-semibold text-lg text-gray-800 mb-2">Business Plan</h3>
                            <p className="text-center text-3xl font-bold text-gray-900 mb-1">$99<span className="text-sm font-normal text-gray-500">/month</span></p>
                            <p className="text-center text-xs text-gray-500 mb-4">Billed monthly</p>
                            <Separator className="my-3" />
                            <ul className="space-y-2">
                              <li className="flex items-start">
                                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                                <span className="text-sm text-gray-600">Unlimited export projects</span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                                <span className="text-sm text-gray-600">AI-powered documentation</span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                                <span className="text-sm text-gray-600">Market analysis reports</span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                                <span className="text-sm text-gray-600">Up to 10 team members</span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                                <span className="text-sm text-gray-600">Priority support</span>
                              </li>
                            </ul>
                          </div>
                          
                          <Button className="w-full">
                            Upgrade to Enterprise
                          </Button>
                          
                          <div className="text-center">
                            <p className="text-xs text-gray-500">
                              Need more features? <span className="text-blue-600 cursor-pointer">Contact sales</span>
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden">
                      <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg font-semibold text-gray-800">Usage Overview</CardTitle>
                        <CardDescription>Current billing cycle</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <p className="text-sm font-medium text-gray-800">Export Projects</p>
                              <p className="text-sm text-gray-500">6 / Unlimited</p>
                            </div>
                            <Progress value={60} className="h-2" />
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <p className="text-sm font-medium text-gray-800">Storage</p>
                              <p className="text-sm text-gray-500">2.4 GB / 10 GB</p>
                            </div>
                            <Progress value={24} className="h-2" />
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <p className="text-sm font-medium text-gray-800">Team Members</p>
                              <p className="text-sm text-gray-500">3 / 10</p>
                            </div>
                            <Progress value={30} className="h-2" />
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <p className="text-sm font-medium text-gray-800">AI Credits</p>
                              <p className="text-sm text-gray-500">350 / 1000</p>
                            </div>
                            <Progress value={35} className="h-2" />
                          </div>
                        </div>
                        
                        <div className="mt-6 text-center">
                          <Button variant="outline" size="sm" className="h-8 text-xs border-blue-200 text-blue-700">
                            <Download className="h-3.5 w-3.5 mr-1.5" />
                            Download Usage Report
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              
              {/* Developer Settings Tab */}
              <TabsContent value="developer" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden">
                      <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
                      <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                          <CardTitle className="text-lg font-semibold text-gray-800">API Keys</CardTitle>
                          <CardDescription>Manage your API access tokens</CardDescription>
                        </div>
                        <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                          <Key className="h-4 w-4 mr-2" />
                          Create API Key
                        </Button>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                              <thead className="bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <tr>
                                  <th className="px-6 py-3 text-left">Name</th>
                                  <th className="px-6 py-3 text-left">Key</th>
                                  <th className="px-6 py-3 text-left">Created</th>
                                  <th className="px-6 py-3 text-left">Last Used</th>
                                  <th className="px-6 py-3 text-left">Status</th>
                                  <th className="px-6 py-3 text-left">Actions</th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {mockApiKeys.map((apiKey) => (
                                  <tr key={apiKey.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                      {apiKey.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                      <div className="flex items-center">
                                        <span className="font-mono">{apiKey.id.substring(0, 8)}•••••••••</span>
                                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 ml-1">
                                          <Copy className="h-3.5 w-3.5 text-gray-400" />
                                        </Button>
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                      {apiKey.created}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                      {apiKey.lastUsed}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <Badge className="bg-green-100 text-green-700 border border-green-200">
                                        {apiKey.status}
                                      </Badge>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                      <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                          <Button variant="ghost" className="h-8 w-8 p-0">
                                            <span className="sr-only">Open menu</span>
                                            <MoreHorizontal className="h-4 w-4" />
                                          </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                          <DropdownMenuItem>
                                            <PencilLine className="h-4 w-4 mr-2" />
                                            Rename
                                          </DropdownMenuItem>
                                          <DropdownMenuItem>
                                            <Eye className="h-4 w-4 mr-2" />
                                            View Usage
                                          </DropdownMenuItem>
                                          <DropdownMenuSeparator />
                                          <DropdownMenuItem className="text-red-600">
                                            <RefreshCcw className="h-4 w-4 mr-2" />
                                            Regenerate
                                          </DropdownMenuItem>
                                          <DropdownMenuItem className="text-red-600">
                                            <Trash2 className="h-4 w-4 mr-2" />
                                            Delete
                                          </DropdownMenuItem>
                                        </DropdownMenuContent>
                                      </DropdownMenu>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                          
                          <Separator />
                          
                          <div>
                            <h3 className="font-medium text-gray-800 mb-4">API Documentation</h3>
                            <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
                              <p className="text-sm text-gray-600 mb-3">
                                Integrate Exvorta's export management capabilities into your own applications using our RESTful APIs.
                              </p>
                              <div className="flex space-x-3">
                                <Button variant="outline" className="border-blue-200 text-blue-700">
                                  <FileText className="h-4 w-4 mr-2" />
                                  View API Docs
                                </Button>
                                <Button variant="outline" className="border-purple-200 text-purple-700">
                                  <Code className="h-4 w-4 mr-2" />
                                  View Code Examples
                                </Button>
                              </div>
                            </div>
                          </div>
                          
                          <Separator />
                          
                          <div>
                            <h3 className="font-medium text-gray-800 mb-4">API Usage</h3>
                            <div className="p-4 rounded-lg border border-gray-100 bg-white shadow-sm">
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="p-3 bg-blue-50 rounded-lg text-center">
                                  <p className="text-sm text-gray-500 mb-1">Total API Calls</p>
                                  <p className="text-2xl font-bold text-gray-800">24,521</p>
                                  <p className="text-xs text-gray-500 mt-1">This month</p>
                                </div>
                                <div className="p-3 bg-green-50 rounded-lg text-center">
                                  <p className="text-sm text-gray-500 mb-1">Success Rate</p>
                                  <p className="text-2xl font-bold text-gray-800">99.7%</p>
                                  <p className="text-xs text-gray-500 mt-1">Last 7 days</p>
                                </div>
                                <div className="p-3 bg-purple-50 rounded-lg text-center">
                                  <p className="text-sm text-gray-500 mb-1">Average Response</p>
                                  <p className="text-2xl font-bold text-gray-800">145ms</p>
                                  <p className="text-xs text-gray-500 mt-1">Last 24 hours</p>
                                </div>
                              </div>
                              <div className="mt-4 text-center">
                                <Button variant="link" className="text-blue-600">
                                  View Detailed Usage Analytics <ArrowRight className="h-3.5 w-3.5 ml-1" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden mt-6">
                      <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
                      <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                          <CardTitle className="text-lg font-semibold text-gray-800">Integrations</CardTitle>
                          <CardDescription>Connect with external services</CardDescription>
                        </div>
                        <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                          <Link className="h-4 w-4 mr-2" />
                          Connect Service
                        </Button>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {mockIntegrations.map((integration) => (
                            <div key={integration.id} className="p-4 rounded-lg border border-gray-100 bg-white shadow-sm">
                              <div className="flex items-start justify-between">
                                <div className="flex items-center">
                                  <div className="h-10 w-10 rounded-md bg-gray-100 flex items-center justify-center mr-4">
                                    <img 
                                      src={integration.icon} 
                                      alt={integration.name} 
                                      className="h-8 w-8 object-contain" 
                                      onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.onerror = null;
                                        target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23888888' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='2' y='2' width='20' height='20' rx='5' ry='5'%3E%3C/rect%3E%3Cpath d='M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z'%3E%3C/path%3E%3Cline x1='17.5' y1='6.5' x2='17.51' y2='6.5'%3E%3C/line%3E%3C/svg%3E";
                                      }}
                                    />
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-gray-800">{integration.name}</h4>
                                    <p className="text-sm text-gray-500">{integration.description}</p>
                                  </div>
                                </div>
                                <div>
                                  <Badge className={
                                    integration.status === 'connected' 
                                      ? 'bg-green-100 text-green-700 border border-green-200' 
                                      : 'bg-gray-100 text-gray-700 border border-gray-200'
                                  }>
                                    {integration.status === 'connected' ? 'Connected' : 'Disconnected'}
                                  </Badge>
                                </div>
                              </div>
                              <div className="mt-3 flex justify-between items-center">
                                <div className="text-xs text-gray-500">
                                  {integration.status === 'connected' ? (
                                    <span className="flex items-center">
                                      <Clock className="h-3.5 w-3.5 mr-1" />
                                      Last synced: {integration.lastSync}
                                    </span>
                                  ) : 'Not connected'}
                                </div>
                                <div>
                                  {integration.status === 'connected' ? (
                                    <Button variant="outline" size="sm" className="h-8 text-xs border-gray-200">
                                      <RefreshCcw className="h-3.5 w-3.5 mr-1.5" />
                                      Sync Now
                                    </Button>
                                  ) : (
                                    <Button variant="outline" size="sm" className="h-8 text-xs border-gray-200">
                                      <Link className="h-3.5 w-3.5 mr-1.5" />
                                      Connect
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="space-y-6">
                    <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden">
                      <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg font-semibold text-gray-800">Developer Tools</CardTitle>
                        <CardDescription>Resources for API integration</CardDescription>
                      </CardHeader>
                      <CardContent className="p-0">
                        <div className="divide-y divide-gray-100">
                          <div className="p-4 hover:bg-gray-50 cursor-pointer">
                            <div className="flex items-center">
                              <div className="bg-purple-100 p-2 rounded-full mr-3">
                                <Code className="h-4 w-4 text-purple-700" />
                              </div>
                              <div>
                                <h3 className="font-medium text-gray-800">API Documentation</h3>
                                <p className="text-xs text-gray-500 mt-0.5">Comprehensive API reference and guides</p>
                              </div>
                            </div>
                          </div>
                          <div className="p-4 hover:bg-gray-50 cursor-pointer">
                            <div className="flex items-center">
                              <div className="bg-blue-100 p-2 rounded-full mr-3">
                                <BookOpen className="h-4 w-4 text-blue-700" />
                              </div>
                              <div>
                                <h3 className="font-medium text-gray-800">SDKs & Libraries</h3>
                                <p className="text-xs text-gray-500 mt-0.5">Client libraries for various languages</p>
                              </div>
                            </div>
                          </div>
                          <div className="p-4 hover:bg-gray-50 cursor-pointer">
                            <div className="flex items-center">
                              <div className="bg-green-100 p-2 rounded-full mr-3">
                                <TerminalSquare className="h-4 w-4 text-green-700" />
                              </div>
                              <div>
                                <h3 className="font-medium text-gray-800">API Playground</h3>
                                <p className="text-xs text-gray-500 mt-0.5">Interactive API testing environment</p>
                              </div>
                            </div>
                          </div>
                          <div className="p-4 hover:bg-gray-50 cursor-pointer">
                            <div className="flex items-center">
                              <div className="bg-amber-100 p-2 rounded-full mr-3">
                                <Webhook className="h-4 w-4 text-amber-700" />
                              </div>
                              <div>
                                <h3 className="font-medium text-gray-800">Webhooks</h3>
                                <p className="text-xs text-gray-500 mt-0.5">Configure real-time event notifications</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden">
                      <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg font-semibold text-gray-800">API Limits & Usage</CardTitle>
                        <CardDescription>Current billing cycle</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <p className="text-sm font-medium text-gray-800">API Calls</p>
                              <p className="text-sm text-gray-500">24,521 / 50,000</p>
                            </div>
                            <Progress value={49} className="h-2" />
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <p className="text-sm font-medium text-gray-800">Webhooks</p>
                              <p className="text-sm text-gray-500">1,253 / 10,000</p>
                            </div>
                            <Progress value={12} className="h-2" />
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <p className="text-sm font-medium text-gray-800">Rate Limit</p>
                              <p className="text-sm text-gray-500">120 / 120 req/min</p>
                            </div>
                            <Progress value={100} className="h-2" />
                            <p className="text-xs text-gray-500">Automatic throttling occurs if exceeded</p>
                          </div>
                          
                          <Separator />
                          
                          <div className="p-3 bg-blue-50 rounded-lg">
                            <h4 className="font-medium text-gray-800 mb-1">Need Higher Limits?</h4>
                            <p className="text-xs text-gray-600 mb-3">
                              Upgrade to Enterprise plan or contact us for custom quotas tailored to your integration needs.
                            </p>
                            <Button size="sm" className="h-8 text-xs w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                              Contact Sales
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden">
                      <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg font-semibold text-gray-800">Developer Support</CardTitle>
                        <CardDescription>Get help with integration</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                            <MessageSquareText className="h-5 w-5 text-gray-500 mr-3" />
                            <div>
                              <h4 className="font-medium text-gray-800">Developer Forum</h4>
                              <p className="text-xs text-gray-500">Community & support</p>
                            </div>
                          </div>
                          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                            <HelpCircle className="h-5 w-5 text-gray-500 mr-3" />
                            <div>
                              <h4 className="font-medium text-gray-800">Integration Support</h4>
                              <p className="text-xs text-gray-500">Direct technical assistance</p>
                            </div>
                          </div>
                          <Button variant="outline" className="w-full border-gray-200">
                            <Mail className="h-4 w-4 mr-2" />
                            Contact Developer Support
                          </Button>
                        </div>
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