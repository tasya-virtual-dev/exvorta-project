import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { MobileNav } from "@/components/mobile-nav";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/use-auth";
import {
  Settings as SettingsIcon,
  User as UserIcon,
  Palette,
  CreditCard,
  Key,
  UserCog,
  Bell,
  Shield,
  Users,
  Globe,
  Save
} from "lucide-react";

export default function Settings() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [activeSettingsTab, setActiveSettingsTab] = useState("account");
  const { user } = useAuth();
  const [location] = useLocation();
  
  // Set active tab based on URL path
  useEffect(() => {
    if (location === "/billing") {
      setActiveSettingsTab("billing");
    } else if (location === "/profile") {
      setActiveSettingsTab("account");
    }
  }, [location]);
  
  // Default values in case user is not fully loaded
  const userData = {
    username: user?.username || "",
    // Use companyName as name since User schema doesn't have a name field
    name: user?.companyName || "",
    companyName: user?.companyName || "",
    email: user?.email || "",
    exportReadiness: user?.exportReadiness || 0,
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
                        <div className="p-4 flex items-start cursor-pointer bg-blue-50 border-l-4 border-blue-500">
                          <div className="p-2 mr-4 rounded-lg bg-blue-100">
                            <UserCog className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-medium text-blue-700">Profile</h3>
                            <p className="text-sm text-gray-500 mt-0.5">Manage your personal information</p>
                          </div>
                        </div>
                        <div className="p-4 flex items-start cursor-pointer hover:bg-gray-50">
                          <div className="p-2 mr-4 rounded-lg bg-gray-100">
                            <Bell className="h-5 w-5 text-gray-500" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-800">Notifications</h3>
                            <p className="text-sm text-gray-500 mt-0.5">Configure your notification preferences</p>
                          </div>
                        </div>
                        <div className="p-4 flex items-start cursor-pointer hover:bg-gray-50">
                          <div className="p-2 mr-4 rounded-lg bg-gray-100">
                            <Shield className="h-5 w-5 text-gray-500" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-800">Security</h3>
                            <p className="text-sm text-gray-500 mt-0.5">Manage your account security</p>
                          </div>
                        </div>
                        <div className="p-4 flex items-start cursor-pointer hover:bg-gray-50">
                          <div className="p-2 mr-4 rounded-lg bg-gray-100">
                            <Users className="h-5 w-5 text-gray-500" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-800">Team</h3>
                            <p className="text-sm text-gray-500 mt-0.5">Manage your team members</p>
                          </div>
                        </div>
                        <div className="p-4 flex items-start cursor-pointer hover:bg-gray-50">
                          <div className="p-2 mr-4 rounded-lg bg-gray-100">
                            <Globe className="h-5 w-5 text-gray-500" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-800">Preferences</h3>
                            <p className="text-sm text-gray-500 mt-0.5">Set language and regional preferences</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div className="md:col-span-3">
                    <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden">
                      <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
                      <CardHeader>
                        <CardTitle className="text-lg font-semibold text-gray-800">Profile Settings</CardTitle>
                        <CardDescription>Update your personal and company information</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-md font-medium text-gray-900 mb-4">Personal Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Company Name</label>
                                <input 
                                  type="text" 
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  defaultValue={userData.companyName}
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Username</label>
                                <input 
                                  type="text" 
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  defaultValue={userData.username}
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Email Address</label>
                                <input 
                                  type="email" 
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  defaultValue={userData.email}
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Phone Number</label>
                                <input 
                                  type="tel" 
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  placeholder="Enter your phone number"
                                />
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-md font-medium text-gray-900 mb-4">Company Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Industry</label>
                                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                  <option>Agriculture & Food</option>
                                  <option>Textiles & Apparel</option>
                                  <option>Electronics & Technology</option>
                                  <option>Manufacturing</option>
                                  <option>Healthcare & Pharmaceuticals</option>
                                  <option>Retail & Consumer Goods</option>
                                  <option>Other</option>
                                </select>
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Company Size</label>
                                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                  <option>1-10 employees</option>
                                  <option>11-50 employees</option>
                                  <option>51-200 employees</option>
                                  <option>201-500 employees</option>
                                  <option>501+ employees</option>
                                </select>
                              </div>
                              <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-medium text-gray-700">Company Address</label>
                                <textarea 
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                  rows={3}
                                  placeholder="Enter your company address"
                                ></textarea>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-md font-medium text-gray-900 mb-4">Export Preferences</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Primary Export Product</label>
                                <input 
                                  type="text" 
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  placeholder="Enter your primary export product"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Target Markets</label>
                                <input 
                                  type="text" 
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  placeholder="e.g., United States, Europe, Asia"
                                />
                              </div>
                            </div>
                          </div>
                          
                          <div className="pt-4">
                            <Button
                              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                            >
                              <Save className="h-4 w-4 mr-2" />
                              Save Changes
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
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
                  <CardContent>
                    <div className="text-center py-10">
                      <p className="text-gray-500 mb-4">Appearance settings would be displayed here.</p>
                      <p className="text-gray-600 mb-6">
                        Options for theme (light/dark/system), layout preferences, and display density.
                      </p>
                      <Button
                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white"
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
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden lg:col-span-2">
                    <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-gray-800">Current Subscription</CardTitle>
                      <CardDescription>Manage your subscription plan and payment methods</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-6">
                      <div className="mb-6 border border-gray-100 rounded-lg p-4 bg-blue-50">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium text-blue-800">Professional Plan</p>
                            <p className="text-sm text-gray-600 mt-1">Billed annually</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-lg text-gray-900">$99<span className="text-sm font-normal text-gray-500">/month</span></p>
                            <p className="text-xs text-gray-500">$1,188 billed annually</p>
                          </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Next billing date</span>
                            <span className="font-medium text-gray-800">April 20, 2026</span>
                          </div>
                          <div className="flex items-center justify-between text-sm mt-2">
                            <span className="text-gray-600">Status</span>
                            <span className="bg-green-100 text-green-800 font-medium px-2 py-0.5 rounded-full text-xs">Active</span>
                          </div>
                        </div>
                      </div>
                      
                      <h3 className="font-medium text-gray-800 mb-4">Payment Methods</h3>
                      <div className="border border-gray-100 rounded-lg divide-y divide-gray-100 mb-6">
                        <div className="p-4 flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="bg-white p-2 border border-gray-200 rounded-md mr-3">
                              <CreditCard className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-800">Visa ending in 4242</p>
                              <p className="text-xs text-gray-500">Expires 12/2025</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full mr-2">Default</span>
                            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-800">Edit</Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                          Update Payment Method
                        </Button>
                        <Button variant="outline">
                          Change Plan
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden">
                    <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-gray-800">Billing History</CardTitle>
                      <CardDescription>View and download your invoices</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="border border-gray-100 rounded-lg divide-y divide-gray-100">
                        <div className="p-4 flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-800">April 20, 2025</p>
                            <p className="text-xs text-gray-500">Professional Plan (Annual)</p>
                          </div>
                          <div className="flex items-center">
                            <span className="text-sm font-medium text-gray-800 mr-4">$1,188.00</span>
                            <Button variant="ghost" size="sm" className="text-blue-600">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                              PDF
                            </Button>
                          </div>
                        </div>
                        <div className="p-4 flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-800">April 20, 2024</p>
                            <p className="text-xs text-gray-500">Professional Plan (Annual)</p>
                          </div>
                          <div className="flex items-center">
                            <span className="text-sm font-medium text-gray-800 mr-4">$1,188.00</span>
                            <Button variant="ghost" size="sm" className="text-blue-600">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                              PDF
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              {/* Developer Settings Tab */}
              <TabsContent value="developer" className="mt-6">
                <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden">
                  <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-800">Developer Settings</CardTitle>
                    <CardDescription>API keys, webhook configurations, and integrations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-10">
                      <p className="text-gray-500 mb-4">Developer settings would be displayed here.</p>
                      <p className="text-gray-600 mb-6">
                        API key management, webhook configurations, and third-party integrations.
                      </p>
                      <Button
                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save API Settings
                      </Button>
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