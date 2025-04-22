import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowRight, CheckCircle2, Globe, BarChart4, FileText, Zap, Shield, Users, 
  ChevronRight, Check, ArrowUpRight, ArrowDownRight, ChevronDown, Star, Search,
  Plus, MessageSquare, Building2
} from "lucide-react";

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [activeTab, setActiveTab] = useState("monthly");

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header - Made sticky with higher z-index */}
      <header className="sticky top-0 z-50 shadow-md bg-white border-b border-gray-100 transition-all duration-300">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <a href="/" className="text-2xl font-bold flex items-center">
                <div className="flex items-center">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-emerald-600">
                    <path d="M10.2857 5.14286C10.2857 4.51023 10.5368 3.90315 10.9834 3.45657C11.43 3.00999 12.0371 2.75886 12.6697 2.75886H19.3304C19.963 2.75886 20.5701 3.00999 21.0166 3.45657C21.4632 3.90315 21.7143 4.51023 21.7143 5.14286V8C21.7143 8.21217 21.6291 8.41566 21.4769 8.56569C21.3247 8.71571 21.1183 8.8 20.9036 8.8H19.0964C18.8817 8.8 18.6753 8.71571 18.5231 8.56569C18.3709 8.41566 18.2857 8.21217 18.2857 8V6.10057C18.2857 5.88841 18.2006 5.68491 18.0484 5.53489C17.8961 5.38486 17.6897 5.30057 17.475 5.30057H14.525C14.3103 5.30057 14.1039 5.38486 13.9516 5.53489C13.7994 5.68491 13.7143 5.88841 13.7143 6.10057V8C13.7143 8.21217 13.6291 8.41566 13.4769 8.56569C13.3247 8.71571 13.1183 8.8 12.9036 8.8H11.0964C10.8817 8.8 10.6753 8.71571 10.5231 8.56569C10.3709 8.41566 10.2857 8.21217 10.2857 8V5.14286Z" fill="currentColor"/>
                    <path d="M8 10.2857H24V13.7143H8V10.2857Z" fill="currentColor"/>
                    <path d="M26.2857 15.4286V23.0171C26.2857 24.3455 25.7594 25.6193 24.8212 26.5575C23.883 27.4957 22.6092 28.022 21.2809 28.022H10.7191C9.39077 28.022 8.11697 27.4957 7.17878 26.5575C6.24059 25.6193 5.71429 24.3455 5.71429 23.0171V15.4286H26.2857Z" fill="currentColor"/>
                    <path d="M10.2857 22.8571C10.2857 23.5028 10.5413 24.1219 10.9964 24.5771C11.4515 25.0322 12.0707 25.2878 12.7164 25.2878C13.3621 25.2878 13.9813 25.0322 14.4364 24.5771C14.8915 24.1219 15.1471 23.5028 15.1471 22.8571C15.1471 22.2114 14.8915 21.5923 14.4364 21.1371C13.9813 20.682 13.3621 20.4264 12.7164 20.4264C12.0707 20.4264 11.4515 20.682 10.9964 21.1371C10.5413 21.5923 10.2857 22.2114 10.2857 22.8571Z" fill="currentColor"/>
                    <path d="M16.853 22.8571C16.853 23.5028 17.1086 24.1219 17.5637 24.5771C18.0188 25.0322 18.638 25.2878 19.2837 25.2878C19.9294 25.2878 20.5486 25.0322 21.0037 24.5771C21.4588 24.1219 21.7144 23.5028 21.7144 22.8571C21.7144 22.2114 21.4588 21.5923 21.0037 21.1371C20.5486 20.682 19.9294 20.4264 19.2837 20.4264C18.638 20.4264 18.0188 20.682 17.5637 21.1371C17.1086 21.5923 16.853 22.2114 16.853 22.8571Z" fill="currentColor"/>
                  </svg>
                  <span className="ml-3 text-neutral-900 font-bold text-xl">Exvorta</span>
                </div>
              </a>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="/" className="text-neutral-800 font-medium border-b-2 border-emerald-600">Home</a>
              <a href="/features" className="text-neutral-800 hover:text-emerald-600 font-medium">Features</a>
              <a href="/pricing" className="text-neutral-800 hover:text-emerald-600 font-medium">Pricing</a>
              <a href="/about" className="text-neutral-800 hover:text-emerald-600 font-medium">About Us</a>
            </nav>
            <div className="flex items-center space-x-4">
              <a href="/auth" className="text-emerald-600 hover:text-emerald-700 font-medium hidden sm:inline-block">Login</a>
              <a href="/auth" className="hidden md:inline-flex">
                <Button className="bg-emerald-600 hover:bg-emerald-700">Get Started</Button>
              </a>
              <button className="md:hidden text-neutral-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section style={{ backgroundColor: "#f0f7ff" }} className="py-10 md:py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iLjAyIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0tNCAwdi00aDJ2NGgtMnptLTIgMGgtNHYtNGg0djR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40"></div>
          <div className="container mx-auto px-4 relative">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-12 md:mb-0">
                <div className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-medium mb-6">
                  #1 AI-Powered Export Management Platform
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  <span className="text-gray-800">Simplifying Global Trade</span> 
                  <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-violet-600 bg-clip-text text-transparent block mt-2 font-bold">for Businesses Worldwide</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Exvorta empowers businesses of all sizes to navigate international markets with AI-powered insights, streamlining the entire export process from research to delivery
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <a href="/auth">
                    <Button size="lg" className="w-full sm:w-auto group bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
                      Get Started Free
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </a>
                  <a href="/features">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto border-blue-300 text-blue-700 hover:bg-blue-50 bg-blue-100">
                      <span>See How It Works</span>
                    </Button>
                  </a>
                </div>
                <div className="mt-8 flex items-center text-sm text-neutral-500">
                  <div className="flex items-center px-4 py-2 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg shadow-sm">
                    <div className="flex items-center text-blue-600 mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                    </div>
                    <span className="font-medium text-gray-700">Trusted by <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Global Exporters</span></span>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <div className="w-full max-w-lg bg-white p-6 rounded-xl shadow-2xl border border-neutral-200 transform md:translate-y-8 hover:translate-y-0 transition-transform duration-300">
                  <div className="flex justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">Export Readiness Dashboard</h3>
                      <p className="text-neutral-500 text-sm">Teak Furniture to Japan</p>
                    </div>
                    <div className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-xs font-medium flex items-center">
                      <span className="w-2 h-2 rounded-full mr-1 bg-emerald-600"></span> Active
                    </div>
                  </div>

                  <div style={{ backgroundColor: "#F2FEF9" }} className="mb-4 p-4 rounded-lg">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Export Readiness</span>
                      <span className="text-sm font-medium">65%</span>
                    </div>
                    <div className="w-full bg-neutral-200 rounded-full h-2.5">
                      <div className="bg-emerald-600 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                    <div className="flex justify-between mt-3">
                      <div className="flex flex-col items-center">
                        <span className="text-sm font-medium text-emerald-600">Completed</span>
                        <span className="text-xs text-neutral-500">2 Steps</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-sm font-medium text-amber-600">In Progress</span>
                        <span className="text-xs text-neutral-500">1 Step</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-sm font-medium text-neutral-600">Upcoming</span>
                        <span className="text-xs text-neutral-500">3 Steps</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center text-sm bg-emerald-50 px-3 py-2 rounded-lg">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-emerald-600" />
                      <span>Product Selection</span>
                      <span className="ml-auto font-medium text-emerald-600">Completed</span>
                    </div>
                    <div className="flex items-center text-sm bg-emerald-50 px-3 py-2 rounded-lg">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-emerald-600" />
                      <span>Market Research</span>
                      <span className="ml-auto font-medium text-emerald-600">Completed</span>
                    </div>
                    <div className="flex items-center text-sm bg-amber-50 px-3 py-2 rounded-lg">
                      <div className="w-4 h-4 rounded-full border-2 border-amber-500 mr-2 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
                      </div>
                      <span>Documentation</span>
                      <span className="ml-auto text-amber-600 font-medium">In Progress</span>
                    </div>
                    <div className="flex items-center text-sm bg-neutral-50 px-3 py-2 rounded-lg">
                      <div className="w-4 h-4 rounded-full border-2 border-neutral-300 mr-2"></div>
                      <span>Buyer Matchmaking</span>
                      <span className="ml-auto font-medium">Upcoming</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Highlighted Clients */}
        <section className="py-10 bg-gradient-to-r from-purple-50 via-fuchsia-50 to-pink-50 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iLjAyIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0tNCAwdi00aDJ2NGgtMnptLTIgMGgtNHYtNGg0djR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40"></div>
          <div className="container mx-auto px-6 lg:px-12 relative">
            <div className="flex flex-col items-center justify-center">
              <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-600 rounded-full px-4 py-2 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                <span className="text-sm font-semibold">Our Clients</span>
              </div>
              <h2 className="text-4xl font-bold mb-3 text-center">
                <span className="text-gray-900">Trusted by</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 ml-2">Businesses Worldwide</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl text-center mb-5">
                Join the growing network of businesses using Exvorta to transform their global trade operations
              </p>

              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 text-white px-6 mt-2">
                Join Our Client Network
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iLjAyIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0tNCAwdi00aDJ2NGgtMnptLTIgMGgtNHYtNGg0djR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40"></div>
          <div className="container mx-auto px-4 relative">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-600 rounded-full px-4 py-2 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                <span className="text-sm font-semibold">Powerful AI-Powered Features</span>
              </div>
              <h2 className="text-4xl font-bold mb-6 text-gray-900">
                Everything You Need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Export Successfully</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Exvorta provides all the tools businesses worldwide need to navigate international markets with confidence
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {/* Feature 1: Market Intelligence */}
              <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden relative p-6">
                {/* Subtle top accent */}
                <div className="absolute inset-x-0 top-0 h-1 bg-amber-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>

                <div className="w-14 h-14 bg-amber-50 rounded-lg flex items-center justify-center mb-5 group-hover:bg-amber-100 transition-colors">
                  <Globe className="h-7 w-7 text-amber-600" />
                </div>

                <h3 className="text-xl font-bold mb-3 group-hover:text-amber-600 transition-colors">
                  Market Intelligence
                </h3>

                <p className="text-neutral-600 mb-4">
                  AI-powered analysis of global markets, demand trends, and competitive landscapes
                </p>

                <ul className="space-y-2 mb-5">
                  <li className="flex items-center text-sm">
                    <Check className="mr-2 h-4 w-4 text-amber-500" />
                    <span>Target market identification</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <Check className="mr-2 h-4 w-4 text-amber-500" />
                    <span>Demand forecasting</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <Check className="mr-2 h-4 w-4 text-amber-500" />
                    <span>Competitor benchmarking</span>
                  </li>
                </ul>

                <a href="/features" className="inline-flex items-center text-amber-600 font-medium group-hover:text-amber-700 transition-colors">
                  <span>Learn more</span>
                  <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Feature 2: Risk Assessment */}
              <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden relative p-6">
                {/* Subtle top accent */}
                <div className="absolute inset-x-0 top-0 h-1 bg-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>

                <div className="w-14 h-14 bg-purple-50 rounded-lg flex items-center justify-center mb-5 group-hover:bg-purple-100 transition-colors">
                  <BarChart4 className="h-7 w-7 text-purple-600" />
                </div>

                <h3 className="text-xl font-bold mb-3 group-hover:text-purple-600 transition-colors">
                  Risk Assessment
                </h3>

                <p className="text-neutral-600 mb-4">
                  Comprehensive analysis of export risks with actionable mitigation strategies
                </p>

                <ul className="space-y-2 mb-5">
                  <li className="flex items-center text-sm">
                    <Check className="mr-2 h-4 w-4 text-purple-500" />
                    <span>Shipping & logistics risks</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <Check className="mr-2 h-4 w-4 text-purple-500" />
                    <span>Payment security analysis</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <Check className="mr-2 h-4 w-4 text-purple-500" />
                    <span>Currency fluctuation modeling</span>
                  </li>
                </ul>

                <a href="/features" className="inline-flex items-center text-purple-600 font-medium group-hover:text-purple-700 transition-colors">
                  <span>Learn more</span>
                  <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Feature 3: Documentation */}
              <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden relative p-6">
                {/* Subtle top accent */}
                <div className="absolute inset-x-0 top-0 h-1 bg-teal-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>

                <div className="w-14 h-14 bg-teal-50 rounded-lg flex items-center justify-center mb-5 group-hover:bg-teal-100 transition-colors">
                  <FileText className="h-7 w-7 text-teal-600" />
                </div>

                <h3 className="text-xl font-bold mb-3 group-hover:text-teal-600 transition-colors">
                  Documentation
                </h3>

                <p className="text-neutral-600 mb-4">
                  Automated generation of export documentation with regulatory compliance
                </p>

                <ul className="space-y-2 mb-5">
                  <li className="flex items-center text-sm">
                    <Check className="mr-2 h-4 w-4 text-teal-500" />
                    <span>Commercial invoices</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <Check className="mr-2 h-4 w-4 text-teal-500" />
                    <span>Certificates of origin</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <Check className="mr-2 h-4 w-4 text-teal-500" />
                    <span>Customs declarations</span>
                  </li>
                </ul>

                <a href="/features" className="inline-flex items-center text-teal-600 font-medium group-hover:text-teal-700 transition-colors">
                  <span>Learn more</span>
                  <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Feature 4: Process Guidance */}
              <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden relative p-6">
                {/* Subtle top accent */}
                <div className="absolute inset-x-0 top-0 h-1 bg-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>

                <div className="w-14 h-14 bg-green-50 rounded-lg flex items-center justify-center mb-5 group-hover:bg-green-100 transition-colors">
                  <Zap className="h-7 w-7 text-green-600" />
                </div>

                <h3 className="text-xl font-bold mb-3 group-hover:text-green-600 transition-colors">
                  Process Guidance
                </h3>

                <p className="text-neutral-600 mb-4">
                  Step-by-step export process guidance tailored to your product and target market
                </p>

                <ul className="space-y-2 mb-5">
                  <li className="flex items-center text-sm">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Customized export roadmap</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Progress tracking</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Task automation</span>
                  </li>
                </ul>

                <a href="/features" className="inline-flex items-center text-green-600 font-medium group-hover:text-green-700 transition-colors">
                  <span>Learn more</span>
                  <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Feature 5: Compliance */}
              <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden relative p-6">
                {/* Subtle top accent */}
                <div className="absolute inset-x-0 top-0 h-1 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>

                <div className="w-14 h-14 bg-blue-50 rounded-lg flex items-center justify-center mb-5 group-hover:bg-blue-100 transition-colors">
                  <Shield className="h-7 w-7 text-blue-600" />
                </div>

                <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">
                  Compliance
                </h3>

                <p className="text-neutral-600 mb-4">
                  Ensure regulatory compliance across multiple international markets
                </p>

                <ul className="space-y-2 mb-5">
                  <li className="flex items-center text-sm">
                    <Check className="mr-2 h-4 w-4 text-blue-500" />
                    <span>Regulatory updates</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <Check className="mr-2 h-4 w-4 text-blue-500" />
                    <span>Trade agreement analysis</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <Check className="mr-2 h-4 w-4 text-blue-500" />
                    <span>Product certification guidance</span>
                  </li>
                </ul>

                <a href="/features" className="inline-flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                  <span>Learn more</span>
                  <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Feature 6: Buyer Matching */}
              <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden relative p-6">
                {/* Subtle top accent */}
                <div className="absolute inset-x-0 top-0 h-1 bg-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>

                <div className="w-14 h-14 bg-pink-50 rounded-lg flex items-center justify-center mb-5 group-hover:bg-pink-100 transition-colors">
                  <Users className="h-7 w-7 text-pink-600" />
                </div>

                <h3 className="text-xl font-bold mb-3 group-hover:text-pink-600 transition-colors">
                  Buyer Matching
                </h3>

                <p className="text-neutral-600 mb-4">
                  Connect with qualified buyers in your target markets based on AI-matching
                </p>

                <ul className="space-y-2 mb-5">
                  <li className="flex items-center text-sm">
                    <Check className="mr-2 h-4 w-4 text-pink-500" />
                    <span>Buyer profile database</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <Check className="mr-2 h-4 w-4 text-pink-500" />
                    <span>Matching algorithm</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <Check className="mr-2 h-4 w-4 text-pink-500" />
                    <span>Direct communication tools</span>
                  </li>
                </ul>

                <a href="/features" className="inline-flex items-center text-pink-600 font-medium group-hover:text-pink-700 transition-colors">
                  <span>Learn more</span>
                  <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* View all features button */}
            <div className="text-center mt-12">
              <a href="/features">
                <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-md group transform hover:scale-[1.02] transition-all" size="lg">
                  Explore All Features
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-gradient-to-r from-indigo-50 to-blue-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-block bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full text-sm font-medium mb-4">
                Simple 4-Step Process
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How Exvorta Works</h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                Our platform guides you through the entire export journey with AI assistance at every step
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-md border border-neutral-100 hover:shadow-lg transition-shadow group hover:bg-blue-50 cursor-pointer">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                  <Search className="h-7 w-7" />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-3 mt-2 group-hover:text-blue-600 transition-colors">Define Your Product</h3>
                  <p className="text-neutral-600">
                    Tell us about your product, production capacity, and export goals
                  </p>
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <a href="/auth" className="text-blue-600 font-medium inline-flex items-center">
                      Get started <ArrowRight className="ml-1 h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-md border border-neutral-100 hover:shadow-lg transition-shadow group hover:bg-purple-50 cursor-pointer">
                <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                  <Globe className="h-7 w-7" />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-3 mt-2 group-hover:text-purple-600 transition-colors">Analyze Markets</h3>
                  <p className="text-neutral-600">
                    Our AI identifies the best markets for your product based on demand
                  </p>
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <a href="/auth" className="text-purple-600 font-medium inline-flex items-center">
                      Explore markets <ArrowRight className="ml-1 h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-md border border-neutral-100 hover:shadow-lg transition-shadow group hover:bg-amber-50 cursor-pointer">
                <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-200 transition-colors">
                  <FileText className="h-7 w-7" />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-3 mt-2 group-hover:text-amber-600 transition-colors">Prepare Documentation</h3>
                  <p className="text-neutral-600">
                    Generate all required export documents with our AI tools
                  </p>
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <a href="/auth" className="text-amber-600 font-medium inline-flex items-center">
                      Create documents <ArrowRight className="ml-1 h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-md border border-neutral-100 hover:shadow-lg transition-shadow group hover:bg-pink-50 cursor-pointer">
                <div className="w-16 h-16 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-pink-200 transition-colors">
                  <Users className="h-7 w-7" />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-3 mt-2 group-hover:text-pink-600 transition-colors">Connect with Buyers</h3>
                  <p className="text-neutral-600">
                    Get matched with qualified buyers and finalize your export deals
                  </p>
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <a href="/auth" className="text-pink-600 font-medium inline-flex items-center">
                      Find buyers <ArrowRight className="ml-1 h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-14">
              <a href="/auth">
                <Button size="lg" className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-md group transform hover:scale-[1.02] transition-all">
                  Start Your Export Journey
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-24 bg-gradient-to-br from-cyan-50 to-blue-50 relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-40 left-10 w-96 h-96 bg-green-100 rounded-full mix-blend-multiply opacity-30"></div>
            <div className="absolute top-20 right-0 w-80 h-80 bg-green-100 rounded-full mix-blend-multiply opacity-30"></div>
            <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-green-100 rounded-full mix-blend-multiply opacity-30"></div>
          </div>

          <div className="container mx-auto px-6 lg:px-12 relative z-10">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-black">Plans That Fit Your Business</h2>
              <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                Choose the perfect plan for your export business needs
              </p>

              <div className="flex justify-center mt-10 mb-12">
                <div className="bg-white p-2 rounded-full inline-flex shadow-sm">
                  <Tabs 
                    value={activeTab} 
                    onValueChange={setActiveTab}
                    className="inline-flex"
                  >
                    <TabsList className="grid grid-cols-3 w-72 bg-white rounded-full p-1 border border-gray-100">
                      <TabsTrigger 
                        value="monthly" 
                        className="rounded-full data-[state=active]:bg-green-500 data-[state=active]:text-white data-[state=active]:shadow-sm transition-all duration-300"
                      >
                        Monthly
                      </TabsTrigger>
                      <TabsTrigger 
                        value="yearly" 
                        className="rounded-full data-[state=active]:bg-green-500 data-[state=active]:text-white data-[state=active]:shadow-sm transition-all duration-300"
                      >
                        Yearly
                      </TabsTrigger>
                      <div className="text-green-500 text-xs rounded-full flex items-center justify-center bg-white">
                        Save 20%
                      </div>
                    </TabsList>
                  </Tabs>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Starter Plan */}
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden relative">
                <div className="p-8">
                  <div className="w-14 h-14 rounded-full bg-green-50 mb-6 flex items-center justify-center">
                    <svg className="h-7 w-7 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>

                  <h3 className="text-xl font-bold mb-2 text-black">Starter</h3>
                  <p className="text-neutral-600 mb-4">
                    Perfect for new exporters getting started
                  </p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-green-500">
                      ${activeTab === "monthly" ? "49" : "39"}
                    </span>
                    <span className="text-neutral-500">/month</span>
                  </div>

                  <Button className="w-full mb-6 bg-green-500 hover:bg-green-600">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>

                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="mr-3 flex-shrink-0 mt-1">
                        <Check className="h-4 w-4 text-green-500" />
                      </div>
                      <span>1 export project</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 flex-shrink-0 mt-1">
                        <Check className="h-4 w-4 text-green-500" />
                      </div>
                      <span>Basic market analysis</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 flex-shrink-0 mt-1">
                        <Check className="h-4 w-4 text-green-500" />
                      </div>
                      <span>Essential documentation templates</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 flex-shrink-0 mt-1">
                        <Check className="h-4 w-4 text-green-500" />
                      </div>
                      <span>Email support</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Pro Plan - Highlighted */}
              <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden z-10">
                {/* Decorative ribbon */}
                <div className="absolute -right-12 top-7 bg-green-500 text-white px-12 py-1 text-sm font-medium transform rotate-45 shadow-md">
                  Most Popular
                </div>

                <div className="p-8">
                  <div className="w-14 h-14 rounded-lg bg-green-500 mb-6 flex items-center justify-center text-white">
                    <Check className="h-7 w-7" />
                  </div>

                  <h3 className="text-xl font-bold mb-2 text-black">Professional</h3>
                  <p className="text-neutral-600 mb-4">
                    For growing businesses expanding globally
                  </p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-green-500">
                      ${activeTab === "monthly" ? "99" : "79"}
                    </span>
                    <span className="text-neutral-500">/month</span>
                  </div>

                  <Button className="w-full mb-6 bg-green-500 hover:bg-green-600 shadow-md">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>

                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="mr-3 flex-shrink-0 mt-1">
                        <Check className="h-4 w-4 text-green-500" />
                      </div>
                      <span>5 export projects</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 flex-shrink-0 mt-1">
                        <Check className="h-4 w-4 text-green-500" />
                      </div>
                      <span>Advanced market analysis with AI insights</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 flex-shrink-0 mt-1">
                        <Check className="h-4 w-4 text-green-500" />
                      </div>
                      <span>Full documentation automation</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 flex-shrink-0 mt-1">
                        <Check className="h-4 w-4 text-green-500" />
                      </div>
                      <span>Risk assessment tools</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 flex-shrink-0 mt-1">
                        <Check className="h-4 w-4 text-green-500" />
                      </div>
                      <span>Priority support</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Enterprise Plan */}
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden relative">
                <div className="p-8">
                  <div className="w-14 h-14 rounded-full bg-blue-50 mb-6 flex items-center justify-center">
                    <Building2 className="h-7 w-7 text-blue-500" />
                  </div>

                  <h3 className="text-xl font-bold mb-2 text-black">Enterprise</h3>
                  <p className="text-neutral-600 mb-4">
                    Custom solutions for large exporters
                  </p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-green-500">
                      Contact us
                    </span>
                    <p className="text-sm text-neutral-500 mt-1">Custom pricing</p>
                  </div>

                  <Button className="w-full mb-6 bg-green-500 hover:bg-green-600">
                    Contact Sales
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>

                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="mr-3 flex-shrink-0 mt-1">
                        <Check className="h-4 w-4 text-green-500" />
                      </div>
                      <span>Unlimited export projects</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 flex-shrink-0 mt-1">
                        <Check className="h-4 w-4 text-green-500" />
                      </div>
                      <span>Custom market research</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 flex-shrink-0 mt-1">
                        <Check className="h-4 w-4 text-green-500" />
                      </div>
                      <span>Advanced buyer matching</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 flex-shrink-0 mt-1">
                        <Check className="h-4 w-4 text-green-500" />
                      </div>
                      <span>Dedicated account manager</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 flex-shrink-0 mt-1">
                        <Check className="h-4 w-4 text-green-500" />
                      </div>
                      <span>API access</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 flex-shrink-0 mt-1">
                        <Check className="h-4 w-4 text-green-500" />
                      </div>
                      <span>SLA support</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Removed FAQ Section */}
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-24 bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iLjAyIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0tNCAwdi00aDJ2NGgtMnptLTIgMGgtNHYtNGg0djR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40"></div>
          <div className="container mx-auto px-6 lg:px-12 relative">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 rounded-full px-4 py-2 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z"></path><polyline points="12 8 12.01 8"></polyline><polyline points="12 12 12 16"></polyline></svg>
                <span className="text-sm font-semibold">Customer Success Stories</span>
              </div>
              <h2 className="text-4xl font-bold mb-6 text-gray-900">
                How Businesses Are <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Transforming</span> With Exvorta
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                See how leading companies are achieving global success with our AI-powered export management platform
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 bg-blue-50 rounded-full mr-4 flex items-center justify-center">
                    <div className="text-blue-600 font-bold text-xl">AB</div>
                  </div>
                  <div>
                    <h4 className="font-semibold">Artisan Batik Co.</h4>
                    <p className="text-sm text-neutral-500">Indonesian Textile Exporter</p>
                  </div>
                </div>
                <div className="flex text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="text-neutral-600 mb-4">
                  "Exvorta's market intelligence tools helped us identify new target markets for our premium batik products."
                </p>
                <div className="flex items-center text-sm text-blue-600 font-medium">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  <span>New market expansion</span>
                </div>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow md:transform md:translate-y-4">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 bg-indigo-50 rounded-full mr-4 flex items-center justify-center">
                    <div className="text-indigo-600 font-bold text-xl">TF</div>
                  </div>
                  <div>
                    <h4 className="font-semibold">Teak Furniture Inc.</h4>
                    <p className="text-sm text-neutral-500">Furniture Manufacturing</p>
                  </div>
                </div>
                <div className="flex text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="text-neutral-600 mb-4">
                  "The documentation automation features saved us countless hours of paperwork and reduced compliance risks significantly."
                </p>
                <div className="flex items-center text-sm text-indigo-600 font-medium">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  <span>Streamlined compliance</span>
                </div>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 bg-emerald-50 rounded-full mr-4 flex items-center justify-center">
                    <div className="text-emerald-600 font-bold text-xl">SP</div>
                  </div>
                  <div>
                    <h4 className="font-semibold">Spice Producers Co.</h4>
                    <p className="text-sm text-neutral-500">Agricultural Exports</p>
                  </div>
                </div>
                <div className="flex text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="text-neutral-600 mb-4">
                  "Exvorta's risk assessment tools helped us navigate complex shipping and logistics challenges during our market expansion."
                </p>
                <div className="flex items-center text-sm text-emerald-600 font-medium">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  <span>Risk mitigation success</span>
                </div>
              </div>
            </div>

            <div className="mt-16 text-center">
              <a href="/features">
                <Button className="bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 transition-all duration-300 text-white px-8">
                  See How We Help Exporters
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Partnership Opportunities */}
        <section className="pt-24 pb-16 bg-white">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-600 rounded-full px-4 py-2 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                <span className="text-sm font-semibold">Partnership Opportunities</span>
              </div>
              <h2 className="text-4xl font-bold mb-6 text-gray-900">
                Join Our <span className="text-teal-500">Partner Network</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We're building partnerships with logistics providers, trade organizations, and government agencies before our launch
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 mb-12">
              {/* Partner Type 1 */}
              <div className="p-8 rounded-xl text-center bg-green-50 transition-all duration-300 border border-green-100">
                <div className="flex justify-center mb-6">
                  <Globe className="h-10 w-10 text-teal-500" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Logistics Partners</h3>
                <p className="text-gray-600 mb-8">
                  Join our network of shipping and logistics providers to offer seamless services to our users
                </p>
                <Button className="bg-teal-100 hover:bg-teal-200 text-teal-600 border-none">
                  Learn More
                </Button>
              </div>

              {/* Partner Type 2 */}
              <div className="p-8 rounded-xl text-center bg-green-50 transition-all duration-300 border border-green-100">
                <div className="flex justify-center mb-6">
                  <Building2 className="h-10 w-10 text-teal-500" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Regulatory Agencies</h3>
                <p className="text-gray-600 mb-8">
                  We're seeking partnerships with customs and regulatory authorities to ensure compliance
                </p>
                <Button className="bg-teal-100 hover:bg-teal-200 text-teal-600 border-none">
                  Contact Us
                </Button>
              </div>

              {/* Partner Type 3 */}
              <div className="p-8 rounded-xl text-center bg-blue-50 transition-all duration-300 border border-blue-100">
                <div className="flex justify-center mb-6">
                  <Users className="h-10 w-10 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Trade Organizations</h3>
                <p className="text-gray-600 mb-8">
                  Collaborate with us to provide industry-specific expertise and networking opportunities
                </p>
                <Button className="bg-blue-100 hover:bg-blue-200 text-blue-600 border-none">
                  Partner With Us
                </Button>
              </div>
            </div>

            <div className="text-center mb-8">
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Join our global network of partners and help shape the future of international trade for businesses worldwide
              </p>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="py-16 bg-white mx-6 lg:mx-12 mb-16" style={{ backgroundColor: "#ffffff", borderRadius: "1.5rem" }}>
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-600 rounded-full px-4 py-2 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="15"></line></svg>
                <span className="text-sm font-semibold">What Makes Us Different</span>
              </div>
              <h2 className="text-4xl font-bold mb-6 text-gray-900">
                Designed for <span className="text-indigo-600">Future-Focused</span> Exporters
              </h2>
            </div>

            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div className="p-6 border border-gray-100 rounded-xl hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-blue-50 mx-auto mb-4 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">Personalized</h3>
                <p className="text-gray-600 text-sm">Custom export plans based on your business needs</p>
              </div>

              <div className="p-6 border border-gray-100 rounded-xl hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-purple-50 mx-auto mb-4 rounded-full flex items-center justify-center">
                  <Globe className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">Global</h3>
                <p className="text-gray-600 text-sm">Access to markets across the entire world</p>
              </div>

              <div className="p-6 border border-gray-100 rounded-xl hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-pink-50 mx-auto mb-4 rounded-full flex items-center justify-center">
                  <BarChart4 className="h-6 w-6 text-pink-600" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">Data-Driven</h3>
                <p className="text-gray-600 text-sm">AI-powered insights for informed decisions</p>
              </div>

              <div className="p-6 border border-gray-100 rounded-xl hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-green-50 mx-auto mb-4 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">Compliant</h3>
                <p className="text-gray-600 text-sm">Always up-to-date with regulations worldwide</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-24" style={{ 
          backgroundImage: "linear-gradient(135deg, #e6f7f2 0%, #f2fef9 100%)",
          borderRadius: "1.5rem",
          margin: "0 1.5rem",
          overflow: "hidden",
          position: "relative"
        }}>
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400 rounded-full opacity-10 -translate-y-1/2 translate-x-1/4"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-600 rounded-full opacity-10 translate-y-1/3 -translate-x-1/4"></div>

          <div className="container mx-auto px-6 lg:px-12 relative z-10">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="grid md:grid-cols-2">
                {/* Left side with decorative background */}
                <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 p-10 text-white flex flex-col justify-center">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-6">
                      <Globe className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Ready to Go Global?</h3>
                    <p className="text-white/90 mb-8">
                      Join thousands of businesses already using Exvorta's AI-powered platform for international trade.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <Check className="h-5 w-5 mr-3 mt-1 text-emerald-300" />
                        <p className="text-white/90">AI-powered market analysis</p>
                      </div>
                      <div className="flex items-start">
                        <Check className="h-5 w-5 mr-3 mt-1 text-emerald-300" />
                        <p className="text-white/90">Automated documentation compliance</p>
                      </div>
                      <div className="flex items-start">
                        <Check className="h-5 w-5 mr-3 mt-1 text-emerald-300" />
                        <p className="text-white/90">Connections to qualified buyers</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right side with form */}
                <div className="p-10">
                  <div className="mb-6">
                    <div className="inline-block bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-sm font-medium mb-3">
                      Get Started
                    </div>
                    <h2 className="text-2xl font-bold mb-4">Start Exporting Today</h2>
                    <p className="text-neutral-600 mb-6">
                      Enter your email to learn more about Exvorta
                    </p>
                  </div>

                  <form className="space-y-4">
                    <div className="relative">
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 py-6 bg-gray-50 focus:bg-white transition-colors"
                      />
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                          <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                      </div>
                    </div>
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700 transition-all duration-300 transform hover:scale-[1.02] py-6" size="lg">
                      Get More Information
                    </Button>
                    <p className="text-xs text-neutral-500 text-center">
                      By signing up, you agree to our Terms of Service and Privacy Policy
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="max-w-4xl mx-auto text-center rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 p-12 shadow-lg text-white relative overflow-hidden">
              {/* Background decorative elements */}
              <div className="absolute -right-16 -top-16 w-64 h-64 bg-white/10 rounded-full"></div>
              <div className="absolute -left-8 -bottom-8 w-40 h-40 bg-white/5 rounded-full"></div>
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Transform Your Export Business Today</h2>
                <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                  Join thousands of businesses worldwide using our revolutionary AI-powered export management platform
                </p>
                <div className="flex justify-center mt-4">
                  <a href="/features">
                    <Button className="bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-600 hover:via-emerald-700 hover:to-teal-700 text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-emerald-100/50" size="lg">
                      Explore Features
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white py-20">
          <div className="container mx-auto px-6 lg:px-12">
            {/* Top decorative ribbon */}
            <div className="h-1 w-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 rounded-full mb-16"></div>

            <div className="grid md:grid-cols-4 gap-10 mb-16">
              <div>
                <a href="/" className="text-2xl font-bold mb-8 flex items-center">
                  <div className="bg-emerald-600 p-2 rounded-lg text-white">
                    <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                      <path d="M10.2857 5.14286C10.2857 4.51023 10.5368 3.90315 10.9834 3.45657C11.43 3.00999 12.0371 2.75886 12.6697 2.75886H19.3304C19.963 2.75886 20.5701 3.00999 21.0166 3.45657C21.4632 3.90315 21.7143 4.51023 21.7143 5.14286V8C21.7143 8.21217 21.6291 8.41566 21.4769 8.56569C21.3247 8.71571 21.1183 8.8 20.9036 8.8H19.0964C18.8817 8.8 18.6753 8.71571 18.5231 8.56569C18.3709 8.41566 18.2857 8.21217 18.2857 8V6.10057C18.2857 5.88841 18.2006 5.68491 18.0484 5.53489C17.8961 5.38486 17.6897 5.30057 17.475 5.30057H14.525C14.3103 5.30057 14.1039 5.38486 13.9516 5.53489C13.7994 5.68491 13.7143 5.88841 13.7143 6.10057V8C13.7143 8.21217 13.6291 8.41566 13.4769 8.56569C13.3247 8.71571 13.1183 8.8 12.9036 8.8H11.0964C10.8817 8.8 10.6753 8.71571 10.5231 8.56569C10.3709 8.41566 10.2857 8.21217 10.2857 8V5.14286Z" fill="currentColor"/>
                      <path d="M8 10.2857H24V13.7143H8V10.2857Z" fill="currentColor"/>
                      <path d="M26.2857 15.4286V23.0171C26.2857 24.3455 25.7594 25.6193 24.8212 26.5575C23.883 27.4957 22.6092 28.022 21.2809 28.022H10.7191C9.39077 28.022 8.11697 27.4957 7.17878 26.5575C6.24059 25.6193 5.71429 24.3455 5.71429 23.0171V15.4286H26.2857Z" fill="currentColor"/>
                      <path d="M10.2857 22.8571C10.2857 23.5028 10.5413 24.1219 10.9964 24.5771C11.4515 25.0322 12.0707 25.2878 12.7164 25.2878C13.3621 25.2878 13.9813 25.0322 14.4364 24.5771C14.8915 24.1219 15.1471 23.5028 15.1471 22.8571C15.1471 22.2114 14.8915 21.5923 14.4364 21.1371C13.9813 20.682 13.3621 20.4264 12.7164 20.4264C12.0707 20.4264 11.4515 20.682 10.9964 21.1371C10.5413 21.5923 10.2857 22.2114 10.2857 22.8571Z" fill="currentColor"/>
                      <path d="M16.853 22.8571C16.853 23.5028 17.1086 24.1219 17.5637 24.5771C18.0188 25.0322 18.638 25.2878 19.2837 25.2878C19.9294 25.2878 20.5486 25.0322 21.0037 24.5771C21.4588 24.1219 21.7144 23.5028 21.7144 22.8571C21.7144 22.2114 21.4588 21.5923 21.0037 21.1371C20.5486 20.682 19.9294 20.4264 19.2837 20.4264C18.638 20.4264 18.0188 20.682 17.5637 21.1371C17.1086 21.5923 16.853 22.2114 16.853 22.8571Z" fill="currentColor"/>
                    </svg>
                  </div>
                  <span className="ml-3 text-emerald-600 font-bold text-2xl">Exvorta</span>
                </a>
                <p className="text-neutral-600 mb-6 max-w-xs">
                  Simplifying global trade for businesses worldwide with AI-powered solutions
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </a>
                  <a href="#" className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                    </svg>
                  </a>
                  <a href="#" className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </a>
                  <a href="#" className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </a>
                </div>
              </div>

              <div className="ml-0 md:ml-6">
                <h4 className="text-emerald-600 text-lg font-semibold mb-6">Company</h4>
                <ul className="space-y-4">
                  <li>
                    <a href="/about" className="text-neutral-600 hover:text-emerald-600 transition-colors flex items-center group">
                      <div className="h-1 w-0 bg-emerald-500 rounded mr-0 group-hover:w-4 group-hover:mr-2 transition-all duration-300"></div>
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-neutral-600 hover:text-emerald-600 transition-colors flex items-center group">
                      <div className="h-1 w-0 bg-emerald-500 rounded mr-0 group-hover:w-4 group-hover:mr-2 transition-all duration-300"></div>
                      Careers
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-neutral-600 hover:text-emerald-600 transition-colors flex items-center group">
                      <div className="h-1 w-0 bg-emerald-500 rounded mr-0 group-hover:w-4 group-hover:mr-2 transition-all duration-300"></div>
                      Press
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-neutral-600 hover:text-emerald-600 transition-colors flex items-center group">
                      <div className="h-1 w-0 bg-emerald-500 rounded mr-0 group-hover:w-4 group-hover:mr-2 transition-all duration-300"></div>
                      Blog
                    </a>
                  </li>
                </ul>
              </div>

              <div className="ml-0 md:ml-6">
                <h4 className="text-emerald-600 text-lg font-semibold mb-6">Resources</h4>
                <ul className="space-y-4">
                  <li>
                    <a href="#" className="text-neutral-600 hover:text-emerald-600 transition-colors flex items-center group">
                      <div className="h-1 w-0 bg-emerald-500 rounded mr-0 group-hover:w-4 group-hover:mr-2 transition-all duration-300"></div>
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-neutral-600 hover:text-emerald-600 transition-colors flex items-center group">
                      <div className="h-1 w-0 bg-emerald-500 rounded mr-0 group-hover:w-4 group-hover:mr-2 transition-all duration-300"></div>
                      Export Guides
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-neutral-600 hover:text-emerald-600 transition-colors flex items-center group">
                      <div className="h-1 w-0 bg-emerald-500 rounded mr-0 group-hover:w-4 group-hover:mr-2 transition-all duration-300"></div>
                      Market Reports
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-neutral-600 hover:text-emerald-600 transition-colors flex items-center group">
                      <div className="h-1 w-0 bg-emerald-500 rounded mr-0 group-hover:w-4 group-hover:mr-2 transition-all duration-300"></div>
                      Compliance Library
                    </a>
                  </li>
                </ul>
              </div>

              <div className="ml-0 md:ml-6">
                <h4 className="text-emerald-600 text-lg font-semibold mb-6">Contact</h4>
                <ul className="space-y-4">
                  <li>
                    <a href="#" className="text-neutral-600 hover:text-emerald-600 transition-colors flex items-start group">
                      <div className="mr-3 p-2 bg-emerald-50 rounded-full flex-shrink-0 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                      </div>
                      Global Headquarters | Jakarta Office
                    </a>
                  </li>
                  <li>
                    <a href="mailto:contact@exvorta.com" className="text-neutral-600 hover:text-emerald-600 transition-colors flex items-start group">
                      <div className="mr-3 p-2 bg-emerald-50 rounded-full flex-shrink-0 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                          <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                      </div>
                      contact@exvorta.com
                    </a>
                  </li>
                  <li>
                    <a href="tel:+18881234567" className="text-neutral-600 hover:text-emerald-600 transition-colors flex items-start group">
                      <div className="mr-3 p-2 bg-emerald-50 rounded-full flex-shrink-0 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                      </div>
                      +1 (888) 123-4567
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-10 mt-10 flex flex-col md:flex-row justify-between items-center border-t border-gray-100">
              <div className="mb-6 md:mb-0 text-neutral-600">
                &copy; {new Date().getFullYear()} Exvorta. All rights reserved.
              </div>
              <div className="flex flex-wrap justify-center space-x-8">
                <a href="#" className="text-neutral-600 hover:text-emerald-600 transition-colors mb-3 md:mb-0">Terms of Service</a>
                <a href="#" className="text-neutral-600 hover:text-emerald-600 transition-colors mb-3 md:mb-0">Privacy Policy</a>
                <a href="#" className="text-neutral-600 hover:text-emerald-600 transition-colors mb-3 md:mb-0">Cookie Policy</a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}