import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  CheckCircle2,
  Check, 
  BarChart4, 
  TrendingUp, 
  FileText, 
  ShieldCheck, 
  Users, 
  GlobeIcon, 
  Search,
  Truck,
  DollarSign,
  Clock,
  LayoutDashboard
} from "lucide-react";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen flex flex-col">
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
              <a href="/" className="text-neutral-800 hover:text-emerald-600 font-medium">Home</a>
              <a href="/features" className="text-neutral-800 font-medium border-b-2 border-emerald-600">Features</a>
              <a href="/pricing" className="text-neutral-800 hover:text-emerald-600 font-medium">Pricing</a>
              <a href="/about" className="text-neutral-800 hover:text-emerald-600 font-medium">About Us</a>
            </nav>
            <div className="flex items-center space-x-4">
              <a href="/auth" className="text-emerald-600 hover:text-emerald-700 font-medium">Login</a>
              <a href="/auth" className="hidden md:inline-flex">
                <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-md hover:shadow-lg transition-all duration-300">Get Started</Button>
              </a>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-24 relative overflow-hidden" style={{ 
          background: "linear-gradient(135deg, #e6f7f2 0%, #f2fef9 100%)"
        }}>
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400 rounded-full opacity-5 transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-600 rounded-full opacity-5 transform -translate-x-1/4 translate-y-1/4"></div>
          <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-emerald-300 rounded-full opacity-10 animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-16 h-16 bg-emerald-500 rounded-full opacity-10 animate-pulse" style={{ animationDelay: "1s" }}></div>

          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="inline-block bg-emerald-50 text-emerald-600 px-4 py-1 rounded-full text-sm font-medium mb-6 animate-bounce">
              Discover Our Platform
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Powerful Features for <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-400 text-transparent bg-clip-text">Global Trade</span>
            </h1>
            <p className="text-xl bg-gradient-to-r from-emerald-800 to-teal-700 text-transparent bg-clip-text font-medium max-w-3xl mx-auto mb-10">
              Exvorta provides an end-to-end solution for managing your international trade operations with AI-powered insights
            </p>
            <div className="flex justify-center gap-4">
              <a href="/auth">
                <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 px-8 py-6">
                  Join Exvorta Today
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
              <a href="/pricing">
                <Button size="lg" variant="outline" className="border-2 border-emerald-500 text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 px-8 py-6 font-semibold">
                  View Pricing
                </Button>
              </a>
            </div>
            <div className="mt-12 flex justify-center space-x-8">
              <div className="flex items-center text-emerald-700 font-medium">
                <CheckCircle2 className="h-5 w-5 mr-2 text-emerald-500" />
                <span>AI-Powered</span>
              </div>
              <div className="flex items-center text-emerald-700 font-medium">
                <CheckCircle2 className="h-5 w-5 mr-2 text-emerald-500" />
                <span>Global Reach</span>
              </div>
              <div className="flex items-center text-emerald-700 font-medium">
                <CheckCircle2 className="h-5 w-5 mr-2 text-emerald-500" />
                <span>Trade Compliance</span>
              </div>
            </div>
          </div>
        </section>

        {/* Overview Section */}
        <section className="py-16 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #ffffff 0%, #f9fffc 100%)" }}>
          <div className="absolute top-1/3 right-1/2 w-64 h-64 bg-emerald-100 rounded-full opacity-30 blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-emerald-50 rounded-full opacity-40 blur-3xl"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-block bg-emerald-50 text-emerald-600 px-4 py-1 rounded-full text-sm font-medium mb-3">
                Complete Solution
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                The Complete Export Platform for Global Businesses
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Exvorta combines AI-powered market intelligence, risk assessment, document management, 
                and step-by-step guidance to help you navigate international markets with confidence.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-emerald-500 group">
                    <div className="flex items-start">
                      <div className="mr-4 p-3 bg-emerald-100 rounded-full text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 shadow-sm">
                        <LayoutDashboard className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-gray-900 mb-2">
                          Streamlined Export Process
                        </h3>
                        <p className="text-gray-600">Navigate the export journey with clear, step-by-step guidance tailored to your products and target markets</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-blue-500 group">
                    <div className="flex items-start">
                      <div className="mr-4 p-3 bg-blue-100 rounded-full text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
                        <BarChart4 className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-gray-900 mb-2">
                          Data-Driven Decisions
                        </h3>
                        <p className="text-gray-600">Make informed choices based on real-time market analysis and AI-powered demand forecasts</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-purple-500 group">
                    <div className="flex items-start">
                      <div className="mr-4 p-3 bg-purple-100 rounded-full text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300 shadow-sm">
                        <ShieldCheck className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-gray-900 mb-2">
                          Compliance Assurance
                        </h3>
                        <p className="text-gray-600">Stay compliant with regulations across multiple international markets with automated documentation</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-xl border border-emerald-100 relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-full opacity-70"></div>
                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-tr from-emerald-100 to-teal-50 rounded-full opacity-70"></div>

                <div className="relative">
                  <div className="flex items-center justify-between mb-6">
                    <div className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-lg font-medium">Dashboard Preview</div>
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div className="h-3 bg-emerald-50 rounded-full w-full overflow-hidden">
                      <div className="h-3 bg-gradient-to-r from-emerald-600 to-teal-500 rounded-full transform transition-all duration-1000 group-hover:translate-x-2" style={{ width: "65%" }}></div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-gradient-to-br from-emerald-50 to-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105">
                        <div className="text-2xl font-bold text-emerald-700">65%</div>
                        <div className="text-xs text-emerald-600">Export Readiness</div>
                      </div>
                      <div className="bg-gradient-to-br from-teal-50 to-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105">
                        <div className="text-2xl font-bold text-teal-700">3</div>
                        <div className="text-xs text-teal-600">Active Markets</div>
                      </div>
                      <div className="bg-gradient-to-br from-emerald-50 to-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105">
                        <div className="text-2xl font-bold text-emerald-700">7</div>
                        <div className="text-xs text-emerald-600">Pending Orders</div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-emerald-50 to-white p-5 rounded-xl shadow-sm hover:shadow transition-all duration-300">
                      <div className="flex justify-between items-center mb-4">
                        <div className="font-medium text-emerald-800">Export Process</div>
                        <div className="text-xs px-2 py-1 bg-emerald-100 rounded-full text-emerald-700">3/6 completed</div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 mr-3">
                            <CheckCircle2 className="h-4 w-4" />
                          </div>
                          <span className="text-emerald-700 font-medium">Product Selection</span>
                        </div>
                        <div className="flex items-center">
                          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 mr-3">
                            <CheckCircle2 className="h-4 w-4" />
                          </div>
                          <span className="text-emerald-700 font-medium">Market Research</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-600 mr-3 flex items-center justify-center border-2 border-amber-200">
                            <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
                          </div>
                          <span className="text-amber-700 font-medium">Documentation</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gradient-to-br from-amber-50 to-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105">
                        <div className="text-sm font-medium text-amber-700 mb-2">Risk Score</div>
                        <div className="flex items-center">
                          <div className="text-2xl font-bold text-amber-600">64</div>
                          <div className="text-xs ml-2 px-2 py-0.5 bg-amber-100 rounded-full text-amber-700">Medium</div>
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-blue-50 to-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105">
                        <div className="text-sm font-medium text-blue-700 mb-2">Documents</div>
                        <div className="flex items-center">
                          <div className="text-2xl font-bold text-blue-600">2/5</div>
                          <div className="text-xs ml-2 px-2 py-0.5 bg-blue-100 rounded-full text-blue-700">In Progress</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Market Intelligence Feature */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-white"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-block bg-teal-50 text-teal-600 px-4 py-1 rounded-full text-sm font-medium mb-3 animate-pulse">
                AI-Powered Insights
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Market Intelligence
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Make data-driven decisions with comprehensive market analysis and demand forecasting powered by AI.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="bg-white p-6 rounded-2xl shadow-lg order-2 md:order-1 group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center">
                    <div className="mr-3">
                      <TrendingUp className="h-5 w-5 text-teal-500" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-teal-600">Global Import Trends</h3>
                      <p className="text-xs text-gray-500">Monthly import volume analysis</p>
                    </div>
                  </div>
                  <div className="px-2.5 py-0.5 bg-teal-50 text-teal-600 rounded-full text-xs font-medium">Live Data</div>
                </div>

                <div className="bg-white rounded-lg mb-6 overflow-hidden">
                  {/* Bar chart with varied colors */}
                  <div className="relative h-48 border-b border-l border-gray-100">
                    <div className="absolute bottom-0 left-0 right-0 h-full flex items-end justify-around px-4">
                      <div className="w-7 bg-teal-400 rounded-t" style={{ height: "60%" }}></div>
                      <div className="w-7 bg-emerald-400 rounded-t" style={{ height: "35%" }}></div>
                      <div className="w-7 bg-blue-400 rounded-t" style={{ height: "75%" }}></div>
                      <div className="w-7 bg-indigo-400 rounded-t" style={{ height: "55%" }}></div>
                      <div className="w-7 bg-purple-400 rounded-t" style={{ height: "70%" }}></div>
                      <div className="w-7 bg-cyan-400 rounded-t" style={{ height: "65%" }}></div>
                      <div className="w-7 bg-teal-500 rounded-t" style={{ height: "85%" }}></div>
                    </div>

                    {/* Horizontal grid lines */}
                    <div className="absolute inset-0 flex flex-col justify-between p-2">
                      <div className="border-b border-gray-100"></div>
                      <div className="border-b border-gray-100"></div>
                      <div className="border-b border-gray-100"></div>
                      <div className="border-b border-gray-100"></div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div className="bg-white p-4 rounded-xl border border-gray-100">
                    <div className="flex items-center text-gray-700 mb-3">
                      <TrendingUp className="h-4 w-4 mr-2 text-teal-500" />
                      <h4 className="font-medium text-sm">Key Insights</h4>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="w-1 h-8 bg-emerald-500 rounded-full mr-2.5 self-center"></div>
                        <div>
                          <p className="font-medium text-sm text-gray-800">Strong Growth</p>
                          <p className="text-xs text-emerald-600">Furniture +12%</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="w-1 h-8 bg-purple-500 rounded-full mr-2.5 self-center"></div>
                        <div>
                          <p className="font-medium text-sm text-gray-800">Market Potential</p>
                          <p className="text-xs text-purple-600">Japan: $850M annually</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-gray-100">
                    <div className="flex items-center text-gray-700 mb-3">
                      <BarChart4 className="h-4 w-4 mr-2 text-blue-500" />
                      <h4 className="font-medium text-sm">Forecasted Trends</h4>
                    </div>

                    <div className="space-y-2.5">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-gray-600">Q3 2025</span>
                          <span className="text-xs font-medium text-blue-600">+8%</span>
                        </div>
                        <div className="h-1.5 bg-gray-100 rounded-full">
                          <div className="h-1.5 bg-blue-400 rounded-full" style={{ width: "58%" }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-gray-600">Q4 2025</span>
                          <span className="text-xs font-medium text-purple-600">+15%</span>
                        </div>
                        <div className="h-1.5 bg-gray-100 rounded-full">
                          <div className="h-1.5 bg-purple-400 rounded-full" style={{ width: "75%" }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-gray-600">Q1 2026</span>
                          <span className="text-xs font-medium text-teal-600">+12%</span>
                        </div>
                        <div className="h-1.5 bg-gray-100 rounded-full">
                          <div className="h-1.5 bg-teal-400 rounded-full" style={{ width: "65%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="order-1 md:order-2">
                <div className="flex items-center mb-8">
                  <div className="w-16 h-16 bg-teal-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                    <GlobeIcon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-teal-600">
                    Data-Driven Market Insights
                  </h3>
                </div>

                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-emerald-500 group">
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mr-4 group-hover:bg-emerald-500 transition-all duration-300 shadow-sm">
                        <Search className="h-6 w-6 text-emerald-600 group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-gray-900 mb-2">
                          Target Market Identification
                        </h3>
                        <p className="text-gray-600">
                          Identify the most promising markets for your products based on demand patterns, competition analysis, and regulatory landscape factors
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-blue-500 group">
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 group-hover:bg-blue-500 transition-all duration-300 shadow-sm">
                        <TrendingUp className="h-6 w-6 text-blue-600 group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-gray-900 mb-2">
                          Demand Forecasting
                        </h3>
                        <p className="text-gray-600">
                          Predict future demand trends with AI-powered analysis of historical data, economic indicators, and global market conditions
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-purple-500 group">
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4 group-hover:bg-purple-500 transition-all duration-300 shadow-sm">
                        <Users className="h-6 w-6 text-purple-600 group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-gray-900 mb-2">
                          Competitor Benchmarking
                        </h3>
                        <p className="text-gray-600">
                          Analyze competitors' strengths, weaknesses, and market strategies to position your products effectively in global markets
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-amber-500 group">
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mr-4 group-hover:bg-amber-500 transition-all duration-300 shadow-sm">
                        <BarChart4 className="h-6 w-6 text-amber-600 group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-gray-900 mb-2">
                          Regional Market Share Analysis
                        </h3>
                        <p className="text-gray-600">
                          Understand your potential market share across different regions and identify strategies to maximize your global presence
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>





        {/* Risk Assessment Feature */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-teal-50 opacity-70"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-block bg-emerald-50 text-emerald-600 px-4 py-1 rounded-full text-sm font-medium mb-3 animate-pulse">
                Safety First
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Risk Assessment
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Identify and mitigate potential risks in your export operations with comprehensive risk analysis and actionable mitigation strategies
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-emerald-500 group">
                    <div className="flex items-start">
                      <div className="mr-4 p-3 bg-emerald-100 rounded-full text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 shadow-md">
                        <Truck className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-gray-900 mb-2">
                          Shipping & Logistics Risk Analysis
                        </h3>
                        <p className="text-gray-600">Evaluate potential delays, route disruptions, and shipping costs to ensure smooth delivery of your products</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-amber-500 group">
                    <div className="flex items-start">
                      <div className="mr-4 p-3 bg-amber-100 rounded-full text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-all duration-300 shadow-md">
                        <DollarSign className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-gray-900 mb-2">
                          Payment Security Assessment
                        </h3>
                        <p className="text-gray-600">Analyze payment methods and identify potential risks in financial transactions across borders</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-cyan-500 group">
                    <div className="flex items-start">
                      <div className="mr-4 p-3 bg-cyan-100 rounded-full text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white transition-all duration-300 shadow-md">
                        <TrendingUp className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-gray-900 mb-2">
                          Currency Fluctuation Modeling
                        </h3>
                        <p className="text-gray-600">Forecast potential impact of exchange rate changes and develop hedging strategies to protect profits</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-purple-500 group">
                    <div className="flex items-start">
                      <div className="mr-4 p-3 bg-purple-100 rounded-full text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300 shadow-md">
                        <ShieldCheck className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-gray-900 mb-2">
                          Proactive Mitigation Strategies
                        </h3>
                        <p className="text-gray-600">Get AI-generated recommendations to minimize identified risks before they affect your exports</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-xl border border-gray-100">
                <div className="mb-5">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-gray-900">Overall Risk Score</h3>
                    <div className="text-xs bg-amber-50 text-amber-600 px-2 py-1 rounded-full">Updated Today</div>
                  </div>
                  <div className="flex justify-center">
                    <div className="relative w-32 h-32">
                      <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <p className="text-3xl font-bold text-amber-600">64</p>
                        <p className="text-xs text-gray-500">Medium Risk</p>
                      </div>
                      <div className="absolute inset-0 border-4 border-amber-100 rounded-full"></div>
                      <div className="absolute inset-0 rounded-full" style={{
                        borderTop: '4px solid #D97706',
                        borderRight: '4px solid #D97706',
                        borderBottom: '4px solid #D97706',
                        borderLeft: '4px solid transparent',
                        transform: 'rotate(50deg)',
                      }}></div>
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <h3 className="font-semibold mb-3 text-gray-900">Risk Breakdown</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-sm font-medium text-gray-800">Shipping Delays</p>
                        <p className="text-sm font-medium text-red-600">High</p>
                      </div>
                      <div className="h-2 bg-red-50 rounded-full overflow-hidden">
                        <div className="h-2 bg-gradient-to-r from-red-500 to-red-600 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Congestion reported at destination port</p>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-sm font-medium text-gray-800">Currency Fluctuation</p>
                        <p className="text-sm font-medium text-amber-600">Medium</p>
                      </div>
                      <div className="h-2 bg-amber-50 rounded-full overflow-hidden">
                        <div className="h-2 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full" style={{ width: '60%' }}></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">JPY/IDR moderate volatility observed</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3 text-gray-900">Mitigation Suggestions</h3>
                  <div className="space-y-3">
                    <div className="flex items-start bg-gradient-to-r from-emerald-50 to-teal-50 p-2 rounded-lg">
                      <div className="text-emerald-600 h-5 w-5 mt-0.5 mr-2 bg-white rounded-full flex items-center justify-center shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">Consider alternate shipping routes</p>
                        <p className="text-xs text-gray-600 mt-0.5">Use air freight for initial samples</p>
                      </div>
                    </div>
                    <div className="flex items-start bg-gradient-to-r from-blue-50 to-cyan-50 p-2 rounded-lg">
                      <div className="text-blue-600 h-5 w-5 mt-0.5 mr-2 bg-white rounded-full flex items-center justify-center shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">Hedge against currency fluctuations</p>
                        <p className="text-xs text-gray-600 mt-0.5">Lock in forward contracts</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Documentation Feature */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="bg-gradient-to-br from-white to-teal-50 p-6 rounded-xl shadow-lg border border-teal-100 order-2 md:order-1 hover:shadow-xl transition-all duration-300">
                <div className="mb-4">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-gray-900">Required Documents: <span className="text-teal-600 font-bold">Japan Furniture Export</span></p>
                    <div className="text-xs bg-teal-100 text-teal-600 font-medium px-2 py-1 rounded-full">Export All</div>
                  </div>
                  <div className="flex items-center mt-1">
                    <div className="h-1.5 bg-gray-100 rounded-full w-24 overflow-hidden mr-2">
                      <div className="h-1.5 bg-gradient-to-r from-teal-400 to-emerald-500 rounded-full" style={{ width: '40%' }}></div>
                    </div>
                    <div className="text-xs text-gray-500">2/5 Complete</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="py-3 flex items-center justify-between bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg px-3 shadow-sm hover:shadow transition-all duration-300">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mr-3 shadow-sm">
                        <FileText className="h-4 w-4 text-emerald-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Commercial Invoice</div>
                        <div className="text-xs text-gray-600">Details of goods and price</div>
                      </div>
                    </div>
                    <div className="text-sm bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded-full font-medium">Completed</div>
                  </div>

                  <div className="py-3 flex items-center justify-between bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg px-3 shadow-sm hover:shadow transition-all duration-300">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center mr-3 shadow-sm">
                        <FileText className="h-4 w-4 text-amber-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Certificate of Origin</div>
                        <div className="text-xs text-gray-600">Confirms product origin</div>
                      </div>
                    </div>
                    <div className="text-sm bg-amber-100 text-amber-600 px-2 py-0.5 rounded-full font-medium">In Progress</div>
                  </div>

                  <div className="py-3 flex items-center justify-between bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg px-3 shadow-sm hover:shadow transition-all duration-300">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3 shadow-sm">
                        <FileText className="h-4 w-4 text-gray-500" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Shipping Bill</div>
                        <div className="text-xs text-gray-600">Export declaration document</div>
                      </div>
                    </div>
                    <div className="text-sm bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">Not Started</div>
                  </div>
                </div>

                <div className="mt-6">
                  <button className="w-full bg-gradient-to-r from-teal-500 to-emerald-600 text-white py-3 rounded-lg hover:from-teal-600 hover:to-emerald-700 transition-all duration-300 font-medium text-sm flex items-center justify-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                    <FileText className="w-4 h-4 mr-2" />
                    Generate Missing Documents
                  </button>
                </div>
              </div>

              <div className="order-1 md:order-2">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-emerald-400 rounded-xl flex items-center justify-center mr-4 shadow-md">
                    <FileText className="h-7 w-7 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    Documentation
                  </h2>
                </div>
                <p className="text-lg text-gray-600 mb-8">
                  Simplify the documentation process with AI-generated export documents that ensure regulatory compliance in target markets.
                </p>
                <div className="space-y-5">
                  <div className="flex p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5">
                    <div className="mr-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm text-emerald-500">
                      <Check className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Automated Document Generation</h4>
                      <p className="text-sm text-gray-600">Create accurate, compliant export documents in minutes, not days</p>
                    </div>
                  </div>

                  <div className="flex p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5">
                    <div className="mr-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm text-blue-500">
                      <Check className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Regulatory Compliance</h4>
                      <p className="text-sm text-gray-600">Ensure all documents meet the specific requirements of your target markets</p>
                    </div>
                  </div>

                  <div className="flex p-3 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5">
                    <div className="mr-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm text-purple-500">
                      <Check className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Document Templates</h4>
                      <p className="text-sm text-gray-600">Access a library of templates for all common export documents</p>
                    </div>
                  </div>

                  <div className="flex p-3 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5">
                    <div className="mr-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm text-amber-500">
                      <Check className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Progress Tracking</h4>
                      <p className="text-sm text-gray-600">Monitor the status of all required documents for each export project</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>



        {/* Interactive Compliance Tools Section */}
        <section className="py-16 bg-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full opacity-30 -translate-y-1/4 translate-x-1/3 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-50 rounded-full opacity-30 translate-y-1/4 -translate-x-1/3 blur-2xl"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
              <div className="inline-block bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-600 px-5 py-2 rounded-full text-sm font-medium mb-4 shadow-sm hover:shadow transition-all duration-300 transform hover:-translate-y-0.5">
                Export Compliance Suite
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Interactive Compliance Tools</h2>
              <p className="text-lg text-neutral-600 max-w-3xl mx-auto mb-8">
                Navigate complex international regulations with our easy-to-use compliance tools
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Document Generator Card */}
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-emerald-400 to-teal-500"></div>
                <div className="p-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center mb-4 shadow-md">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">Document Generator</h3>
                  <p className="text-neutral-600 mb-4">
                    AI-powered tool that creates export documentation tailored to your specific product and destination market.
                  </p>

                  {/* Interactive Preview */}
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg p-4 mb-4 shadow-sm overflow-hidden relative">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-medium text-sm text-gray-800">Document Preview</span>
                      <span className="text-xs px-2 py-1 bg-gradient-to-r from-emerald-500 to-teal-400 text-white rounded-full shadow-sm">Interactive Demo</span>
                    </div>
                    <div className="flex items-center space-x-2 mb-3">
                      <button className="bg-white shadow-sm text-gray-700 px-2 py-1 rounded text-xs hover:bg-gray-50 transition-colors duration-200">Certificate of Origin</button>
                      <button className="bg-gradient-to-r from-emerald-500 to-teal-400 text-white px-2 py-1 rounded text-xs shadow-sm">Packing List</button>
                      <button className="bg-white shadow-sm text-gray-700 px-2 py-1 rounded text-xs hover:bg-gray-50 transition-colors duration-200">Commercial Invoice</button>
                    </div>
                    <div className="bg-white rounded-lg p-3 text-xs text-neutral-600 shadow-sm">
                      <p className="font-medium mb-1 text-gray-900">Packing List</p>
                      <p className="mb-1">Product: Indonesian Teak Furniture</p>
                      <p className="mb-1">Destination: Japan</p>
                      <p className="mb-1">Quantity: 20 units</p>
                      <p>Net Weight: 400 kg</p>
                    </div>
                  </div>

                  <a href="/auth" className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-600 hover:to-teal-500 shadow-sm hover:shadow transition-all duration-300">
                    Access Document Tools
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>

              {/* Regulation Checker Card */}
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
                <div className="p-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center mb-4 shadow-md">
                    <GlobeIcon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">Regulation Checker</h3>
                  <p className="text-neutral-600 mb-4">
                    Instantly check if your products meet the regulatory requirements of your target export markets.
                  </p>

                  {/* Interactive Preview */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 mb-4 shadow-sm overflow-hidden relative">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-medium text-sm text-gray-800">Compliance Check</span>
                      <span className="text-xs px-2 py-1 bg-gradient-to-r from-blue-500 to-indigo-400 text-white rounded-full shadow-sm">Interactive Demo</span>
                    </div>
                    <div className="flex flex-col space-y-2 mb-1">
                      <div className="flex justify-between items-center bg-white p-2 rounded shadow-sm">
                        <span className="text-xs text-gray-700">Safety Standards</span>
                        <span className="text-xs bg-gradient-to-r from-emerald-400 to-teal-300 text-white px-2 py-0.5 rounded-full flex items-center">
                          <CheckCircle2 className="h-3 w-3 mr-1" /> Compliant
                        </span>
                      </div>
                      <div className="flex justify-between items-center bg-white p-2 rounded shadow-sm">
                        <span className="text-xs text-gray-700">Labeling Requirements</span>
                        <span className="text-xs bg-gradient-to-r from-emerald-400 to-teal-300 text-white px-2 py-0.5 rounded-full flex items-center">
                          <CheckCircle2 className="h-3 w-3 mr-1" /> Compliant
                        </span>
                      </div>
                      <div className="flex justify-between items-center bg-white p-2 rounded shadow-sm">
                        <span className="text-xs text-gray-700">Quality Certifications</span>
                        <span className="text-xs bg-gradient-to-r from-amber-400 to-yellow-300 text-white px-2 py-0.5 rounded-full flex items-center">
                          <div className="w-3 h-3 rounded-full border-2 border-white mr-1 flex items-center justify-center">
                            <div className="w-1 h-1 bg-white rounded-full"></div>
                          </div>
                          Pending
                        </span>
                      </div>
                    </div>
                  </div>

                  <a href="/auth" className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-400 hover:from-blue-600 hover:to-indigo-500 shadow-sm hover:shadow transition-all duration-300">
                    Access Compliance Tools
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>

              {/* Customs Duty Calculator Card */}
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-purple-400 to-pink-500"></div>
                <div className="p-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center mb-4 shadow-md">
                    <ShieldCheck className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">Customs Duty Calculator</h3>
                  <p className="text-neutral-600 mb-4">
                    Calculate exact customs duties and taxes for your products across different international markets.
                  </p>

                  {/* Interactive Preview */}
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 mb-4 shadow-sm overflow-hidden relative">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-medium text-sm text-gray-800">Duty Calculation</span>
                      <span className="text-xs px-2 py-1 bg-gradient-to-r from-purple-500 to-pink-400 text-white rounded-full shadow-sm">Interactive Demo</span>
                    </div>
                    <div className="bg-white rounded-lg p-3 mb-2 shadow-sm">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-medium text-gray-700">Product Value</span>
                        <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">USD 10,000</span>
                      </div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-medium text-gray-700">Import Duty (3.5%)</span>
                        <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded">USD 350</span>
                      </div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-medium text-gray-700">VAT (10%)</span>
                        <span className="text-xs bg-purple-50 text-purple-600 px-2 py-0.5 rounded">USD 1,000</span>
                      </div>
                      <div className="pt-1 mt-1 flex justify-between items-center">
                        <span className="text-xs font-medium text-gray-800">Total Landed Cost</span>
                        <span className="text-xs font-bold bg-gradient-to-r from-purple-500 to-pink-400 text-white px-2 py-0.5 rounded">USD 11,350</span>
                      </div>
                    </div>
                    <div className="text-xs text-purple-600 font-medium">Based on HS Code: 9403.60 for Japan</div>
                  </div>

                  <a href="/auth" className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-pink-400 hover:from-purple-600 hover:to-pink-500 shadow-sm hover:shadow transition-all duration-300">
                    Access Calculator Tools
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-16 text-center">
              <a href="/auth">
                <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-600 hover:to-teal-500 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 text-white font-medium px-8 py-3">
                  Explore All Compliance Tools
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Key Features Grid */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #f9fffc 0%, #f6f8ff 100%)" }}></div>
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-100 rounded-full opacity-30 blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-100 rounded-full opacity-20 blur-3xl"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-purple-600 mb-4">
                Everything You Need for Successful Exports
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Exvorta provides an integrated suite of tools to manage every aspect of your export operations
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Feature 1 - Unified Dashboard */}
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md p-5 transition-all duration-300 transform hover:-translate-y-1 group">
                <div className="w-12 h-12 mb-4 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
                  <LayoutDashboard className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-purple-600">
                  Unified Dashboard
                </h3>
                <p className="text-sm text-gray-600">
                  Monitor all your export activities in one centralized dashboard with intuitive visualizations
                </p>
              </div>

              {/* Feature 2 - Market Analysis */}
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md p-5 transition-all duration-300 transform hover:-translate-y-1 group">
                <div className="w-12 h-12 mb-4 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
                  <BarChart4 className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-purple-600">
                  Market Analysis
                </h3>
                <p className="text-sm text-gray-600">
                  Discover lucrative markets with AI-powered market intelligence and demand forecasting
                </p>
              </div>

              {/* Feature 3 - Logistics Planning */}
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md p-5 transition-all duration-300 transform hover:-translate-y-1 group">
                <div className="w-12 h-12 mb-4 rounded-lg bg-teal-100 text-teal-600 flex items-center justify-center">
                  <Truck className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-teal-600">
                  Logistics Planning
                </h3>
                <p className="text-sm text-gray-600">
                  Plan and track shipments with optimized routing suggestions and real-time tracking
                </p>
              </div>

              {/* Feature 4 - Financial Planning */}
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md p-5 transition-all duration-300 transform hover:-translate-y-1 group">
                <div className="w-12 h-12 mb-4 rounded-lg bg-teal-100 text-teal-600 flex items-center justify-center">
                  <DollarSign className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-teal-600">
                  Financial Planning
                </h3>
                <p className="text-sm text-gray-600">
                  Manage payments, currency exchange, and financial forecasting with advanced tools
                </p>
              </div>

              {/* Feature 5 - Risk Management */}
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md p-5 transition-all duration-300 transform hover:-translate-y-1 group">
                <div className="w-12 h-12 mb-4 rounded-lg bg-teal-100 text-teal-600 flex items-center justify-center">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-teal-600">
                  Risk Management
                </h3>
                <p className="text-sm text-gray-600">
                  Identify and mitigate risks before they impact your business with proactive strategies
                </p>
              </div>

              {/* Feature 6 - Auto Documentation */}
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md p-5 transition-all duration-300 transform hover:-translate-y-1 group">
                <div className="w-12 h-12 mb-4 rounded-lg bg-teal-100 text-teal-600 flex items-center justify-center">
                  <FileText className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-teal-600">
                  Auto Documentation
                </h3>
                <p className="text-sm text-gray-600">
                  Generate compliant export documents with a single click using intelligent templates
                </p>
              </div>

              {/* Feature 7 - Buyer Connections */}
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md p-5 transition-all duration-300 transform hover:-translate-y-1 group">
                <div className="w-12 h-12 mb-4 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-purple-600">
                  Buyer Connections
                </h3>
                <p className="text-sm text-gray-600">
                  Connect with verified buyers in your target markets through our trusted network
                </p>
              </div>

              {/* Feature 8 - Real-time Updates */}
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md p-5 transition-all duration-300 transform hover:-translate-y-1 group">
                <div className="w-12 h-12 mb-4 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
                  <Clock className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-purple-600">
                  Real-time Updates
                </h3>
                <p className="text-sm text-gray-600">
                  Get instant notifications about important export events and status changes
                </p>
              </div>
            </div>

            <div className="mt-16 text-center">
              <a href="/auth" className="inline-block">
                <button className="px-8 py-4 bg-purple-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:bg-purple-700">
                  <span className="flex items-center justify-center">
                    Get Started Today
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </a>
            </div>
          </div>
        </section>
      </main>

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
                    <div className="mr-3 p-2 bg-emerald-50 rounded-full flex-shrink-0 text-emerald-600 group-hover:bg-emerald-600 grouphover:text-white transition-all duration-300">
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
    </div>
  );
}