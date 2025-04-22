import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CheckCircle2, 
  X, 
  HelpCircle, 
  CreditCard, 
  Clock, 
  Building, 
  Ban, 
  DollarSign
} from "lucide-react";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

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
              <a href="/features" className="text-neutral-800 hover:text-emerald-600 font-medium">Features</a>
              <a href="/pricing" className="text-neutral-800 font-medium border-b-2 border-emerald-600">Pricing</a>
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
        {/* Pricing Hero */}
        <section className="py-24 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #f3fcf8 0%, #edf7ff 100%)" }}></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400 rounded-full opacity-10 transform translate-x-1/3 -translate-y-1/3 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-400 rounded-full opacity-10 transform -translate-x-1/3 translate-y-1/3 blur-3xl"></div>
          <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-emerald-300 rounded-full opacity-20 animate-pulse blur-xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-16 h-16 bg-purple-400 rounded-full opacity-20 animate-pulse blur-xl" style={{ animationDelay: "1s" }}></div>

          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="inline-block bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-600 px-5 py-2 rounded-full text-sm font-medium mb-4 shadow-sm">
              Flexible Plans
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
              Simple, <span className="bg-gradient-to-r from-emerald-600 to-emerald-400 text-transparent bg-clip-text">Transparent</span> Pricing
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto mb-10">
              Choose the plan that fits your business needs and scale as you grow your international presence
            </p>

            <div className="flex justify-center mb-12">
              <div className="bg-gray-100 rounded-full p-1 shadow-sm w-64">
                {/* Custom switcher that looks like the screenshot */}
                <div className="relative flex h-9">
                  <button 
                    onClick={() => setBillingCycle('monthly')} 
                    className={`flex-1 text-center py-1.5 rounded-full z-10 font-medium transition-colors duration-150 text-sm ${billingCycle === 'monthly' ? 'text-gray-900' : 'text-gray-500'}`}
                  >
                    Monthly
                  </button>
                  <button 
                    onClick={() => setBillingCycle('yearly')} 
                    className={`flex-1 text-center py-1.5 rounded-full z-10 font-medium transition-colors duration-150 text-sm ${billingCycle === 'yearly' ? 'text-gray-900' : 'text-gray-500'}`}
                  >
                    Yearly <span className="ml-1 text-xs bg-green-50 text-green-600 px-1.5 py-0.5 rounded-full font-medium">Save 20%</span>
                  </button>
                  {/* This is the white background that moves */}
                  <div 
                    className={`absolute top-0 left-0 w-1/2 h-full bg-white rounded-full shadow-sm transition-transform duration-200 ease-in-out ${billingCycle === 'yearly' ? 'translate-x-full' : ''}`}
                  ></div>
                </div>
              </div>
            </div>



            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Starter Plan */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 h-24 w-24 bg-emerald-100 rounded-full opacity-30 transform translate-x-8 -translate-y-8 group-hover:scale-110 transition-transform duration-700"></div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-900 relative z-10">Starter</h3>
                  <p className="text-gray-600 mb-6 relative z-10">Perfect for small businesses exploring export opportunities</p>
                  <div className="mb-4 relative z-10">
                    <span className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 text-transparent bg-clip-text">
                      ${billingCycle === 'monthly' ? '49' : '39'}
                    </span>
                    <span className="text-gray-600 ml-1">/month per user</span>
                  </div>
                  {billingCycle === 'yearly' && (
                    <p className="text-sm text-emerald-600 mb-6 font-medium relative z-10">Billed annually (${39 * 12} per year)</p>
                  )}
                  <a href="/auth" className="block relative z-10 group">
                    <Button className="w-full text-white font-medium rounded-lg bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 transition-all duration-300 transform group-hover:scale-[1.02] shadow-md hover:shadow-lg py-5 text-lg">
                      Get Started
                    </Button>
                  </a>
                </div>
                <div className="px-6 pb-6 pt-6">
                  <p className="font-bold text-gray-900 mb-4">Includes:</p>
                  <ul className="space-y-3 text-left">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-left">Market research for 2 product categories</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-left">Basic export documentation</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-left">Export process guidance</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-left">1 active export project</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-left">3 target markets</span>
                    </li>
                    <li className="flex items-start">
                      <X className="h-5 w-5 text-neutral-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-500 text-left">Advanced risk assessment</span>
                    </li>
                    <li className="flex items-start">
                      <X className="h-5 w-5 text-neutral-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-500 text-left">Buyer matchmaking</span>
                    </li>
                    <li className="flex items-start">
                      <X className="h-5 w-5 text-neutral-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-500 text-left">Priority support</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Professional Plan */}
              <div className="bg-white rounded-xl shadow-xl border-2 border-emerald-100 overflow-hidden relative md:translate-y-[-12px] md:scale-[1.03] hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group z-20">
                <div className="absolute top-0 inset-x-0 bg-gradient-to-r from-emerald-600 to-teal-500 text-white text-sm font-medium text-center py-1.5">
                  Most Popular
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 pt-10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 h-32 w-32 bg-blue-100 rounded-full opacity-30 transform translate-x-8 -translate-y-8 group-hover:scale-110 transition-transform duration-700"></div>
                  <div className="absolute bottom-0 left-0 h-24 w-24 bg-indigo-100 rounded-full opacity-30 transform -translate-x-8 translate-y-8 group-hover:scale-110 transition-transform duration-700"></div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-900 relative z-10">Professional</h3>
                  <p className="text-gray-600 mb-6 relative z-10">Ideal for growing businesses with regular export activities</p>
                  <div className="mb-4 relative z-10">
                    <span className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-500 text-transparent bg-clip-text">
                      ${billingCycle === 'monthly' ? '99' : '79'}
                    </span>
                    <span className="text-gray-600 ml-1">/month per user</span>
                  </div>
                  {billingCycle === 'yearly' && (
                    <p className="text-sm text-blue-600 mb-6 font-medium relative z-10">Billed annually (${79 * 12} per year)</p>
                  )}
                  <a href="/auth" className="block relative z-10 group">
                    <Button className="w-full text-white font-medium rounded-lg bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-600 transition-all duration-300 transform group-hover:scale-[1.02] shadow-md hover:shadow-lg py-5 text-lg">
                      Get Started
                    </Button>
                  </a>
                </div>
                <div className="px-6 pb-6 pt-6">
                  <p className="font-bold text-gray-900 mb-4">Everything in Starter, plus:</p>
                  <ul className="space-y-3 text-left">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-left">Market research for unlimited product categories</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-left">Advanced export documentation</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-left">Advanced risk assessment with mitigation</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-left">3 active export projects</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-left">10 target markets</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-left">Basic buyer matchmaking</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-left">Email support</span>
                    </li>
                    <li className="flex items-start">
                      <X className="h-5 w-5 text-neutral-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-500 text-left">Custom branding</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Enterprise Plan */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 h-24 w-24 bg-purple-100 rounded-full opacity-30 transform translate-x-8 -translate-y-8 group-hover:scale-110 transition-transform duration-700"></div>
                  <div className="absolute bottom-0 left-0 h-20 w-20 bg-pink-100 rounded-full opacity-30 transform -translate-x-6 translate-y-6 group-hover:scale-110 transition-transform duration-700"></div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-900 relative z-10">Enterprise</h3>
                  <p className="text-gray-600 mb-6 relative z-10">For established exporters with complex international operations</p>
                  <div className="mb-4 relative z-10">
                    <span className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">
                      ${billingCycle === 'monthly' ? '249' : '199'}
                    </span>
                    <span className="text-gray-600 ml-1">/month per user</span>
                  </div>
                  {billingCycle === 'yearly' && (
                    <p className="text-sm text-purple-600 mb-6 font-medium relative z-10">Billed annually (${199 * 12} per year)</p>
                  )}
                  <a href="/auth" className="block relative z-10 group">
                    <Button className="w-full text-white font-medium rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-all duration-300 transform group-hover:scale-[1.02] shadow-md hover:shadow-lg py-5 text-lg">
                      Contact Sales
                    </Button>
                  </a>
                </div>
                <div className="px-6 pb-6 pt-6">
                  <p className="font-bold text-gray-900 mb-4">Everything in Professional, plus:</p>
                  <ul className="space-y-3 text-left">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-left">Unlimited active export projects</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-left">Unlimited target markets</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-left">Advanced buyer matchmaking and verification</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-left">Custom document templates</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-left">API integrations</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-left">Custom branding</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-left">Priority 24/7 support</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-left">Dedicated account manager</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature comparison */}
        <section className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
          <div className="absolute inset-0 bg-opacity-50 bg-grid-pattern"></div>
          <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-white to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-white to-transparent"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-block bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 px-5 py-2 rounded-full text-sm font-medium mb-4 shadow-sm">
                Compare Plans
              </div>
              <h2 className="text-4xl font-bold mb-6 text-gray-900">
                Detailed <span className="bg-gradient-to-r from-blue-600 to-indigo-500 text-transparent bg-clip-text">Feature</span> Comparison
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Compare our plans side by side to find the perfect fit for your export business needs
              </p>
            </div>

            <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-100">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left py-5 px-6 w-1/4 bg-gray-50 border-b border-gray-200"></th>
                    <th className="text-center py-4 px-6 bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-gray-200">
                      <span className="text-emerald-600 font-bold block text-lg">Starter</span>
                      <span className="text-gray-600 font-normal text-sm">For new exporters</span>
                    </th>
                    <th className="text-center py-4 px-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200 relative">
                      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
                      <span className="text-blue-600 font-bold block text-lg">Professional</span>
                      <span className="text-gray-600 font-normal text-sm">Popular choice</span>
                    </th>
                    <th className="text-center py-4 px-6 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-gray-200">
                      <span className="text-purple-600 font-bold block text-lg">Enterprise</span>
                      <span className="text-gray-600 font-normal text-sm">For established exporters</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="font-medium py-4 px-6 border-b border-gray-100">Users</td>
                    <td className="text-center py-4 px-2 border-b border-gray-100">
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full font-medium">Up to 2</span>
                    </td>
                    <td className="text-center py-4 px-2 border-b border-gray-100 bg-blue-50 bg-opacity-30">
                      <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full font-medium">Up to 5</span>
                    </td>
                    <td className="text-center py-4 px-2 border-b border-gray-100">
                      <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full font-medium">Unlimited</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="font-medium py-4 px-6 border-b border-gray-100">Active Export Projects</td>
                    <td className="text-center py-4 px-2 border-b border-gray-100">
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full font-medium">1</span>
                    </td>
                    <td className="text-center py-4 px-2 border-b border-gray-100 bg-blue-50 bg-opacity-30">
                      <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full font-medium">3</span>
                    </td>
                    <td className="text-center py-4 px-2 border-b border-gray-100">
                      <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full font-medium">Unlimited</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="font-medium py-4 px-6 border-b border-gray-100">Target Markets</td>
                    <td className="text-center py-4 px-2 border-b border-gray-100">
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full font-medium">3</span>
                    </td>
                    <td className="text-center py-4 px-2 border-b border-gray-100 bg-blue-50 bg-opacity-30">
                      <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full font-medium">10</span>
                    </td>
                    <td className="text-center py-4 px-2 border-b border-gray-100">
                      <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full font-medium">Unlimited</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="font-medium py-4 px-6 border-b border-gray-100">
                      <div className="flex items-center gap-0.5">
                        Market Intelligence
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <HelpCircle className="h-4 w-4 text-blue-400" />
                            </TooltipTrigger>
                            <TooltipContent className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 shadow-lg">
                              <p className="w-56 text-xs text-gray-700">AI-powered analysis of global markets, demand trends, and competitive landscapes</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </td>
                    <td className="text-center py-4 px-2 border-b border-gray-100">
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full font-medium">Basic</span>
                    </td>
                    <td className="text-center py-4 px-2 border-b border-gray-100 bg-blue-50 bg-opacity-30">
                      <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full font-medium">Advanced</span>
                    </td>
                    <td className="text-center py-4 px-2 border-b border-gray-100">
                      <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full font-medium">Premium</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="font-medium py-4 px-6 border-b border-gray-100">
                      <div className="flex items-center gap-0.5">
                        Risk Assessment
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <HelpCircle className="h-4 w-4 text-blue-400" />
                            </TooltipTrigger>
                            <TooltipContent className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 shadow-lg">
                              <p className="w-56 text-xs text-gray-700">Comprehensive analysis of export risks with actionable mitigation strategies</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </td>
                    <td className="text-center py-4 px-2 border-b border-gray-100">
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full font-medium">Basic</span>
                    </td>
                    <td className="text-center py-4 px-2 border-b border-gray-100 bg-blue-50 bg-opacity-30">
                      <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full font-medium">Advanced</span>
                    </td>
                    <td className="text-center py-4 px-2 border-b border-gray-100">
                      <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full font-medium">Custom</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="font-medium py-4 px-6 border-b border-gray-100">
                      <div className="flex items-center gap-0.5">
                        Documentation Generation
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <HelpCircle className="h-4 w-4 text-blue-400" />
                            </TooltipTrigger>
                            <TooltipContent className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 shadow-lg">
                              <p className="w-56 text-xs text-gray-700">Automated generation of export documentation with regulatory compliance</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </td>
                    <td className="text-center py-4 px-2 border-b border-gray-100">
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full font-medium">Standard</span>
                    </td>
                    <td className="text-center py-4 px-2 border-b border-gray-100 bg-blue-50 bg-opacity-30">
                      <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full font-medium">Premium</span>
                    </td>
                    <td className="text-center py-4 px-2 border-b border-gray-100">
                      <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full font-medium">Custom</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="font-medium py-4 px-6 border-b border-gray-100">
                      <div className="flex items-center gap-0.5">
                        Buyer Matchmaking
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <HelpCircle className="h-4 w-4 text-blue-400" />
                            </TooltipTrigger>
                            <TooltipContent className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 shadow-lg">
                              <p className="w-56 text-xs text-gray-700">Connect with verified buyers in your target export markets</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </td>
                    <td className="text-center py-4 px-2 border-b border-gray-100">
                      <X className="h-5 w-5 text-red-400 mx-auto opacity-70" />
                    </td>
                    <td className="text-center py-4 px-2 border-b border-gray-100 bg-blue-50 bg-opacity-30">
                      <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full font-medium">Basic</span>
                    </td>
                    <td className="text-center py-4 px-2 border-b border-gray-100">
                      <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full font-medium">Advanced</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="font-medium py-4 px-6 border-b border-gray-100">
                      <div className="flex items-center gap-0.5">
                        API Access
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <HelpCircle className="h-4 w-4 text-blue-400" />
                            </TooltipTrigger>
                            <TooltipContent className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 shadow-lg">
                              <p className="w-56 text-xs text-gray-700">Integrate Exvorta with your existing systems and workflows</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </td>
                    <td className="text-center py-4 px-2 border-b border-gray-100">
                      <X className="h-5 w-5 text-red-400 mx-auto opacity-70" />
                    </td>
                    <td className="text-center py-4 px-2 border-b border-gray-100 bg-blue-50 bg-opacity-30">
                      <X className="h-5 w-5 text-red-400 mx-auto opacity-70" />
                    </td>
                    <td className="text-center py-4 px-2 border-b border-gray-100">
                      <CheckCircle2 className="h-5 w-5 text-purple-500 mx-auto" />
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="font-medium py-4 px-6 border-b border-gray-100">
                      <div className="flex items-center gap-0.5">
                        Custom Branding
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <HelpCircle className="h-4 w-4 text-blue-400" />
                            </TooltipTrigger>
                            <TooltipContent className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 shadow-lg">
                              <p className="w-56 text-xs text-gray-700">Apply your brand colors and logo to the platform and generated documents</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </td>
                    <td className="text-center py-4 px-2 border-b border-gray-100">
                      <X className="h-5 w-5 text-red-400 mx-auto opacity-70" />
                    </td>
                    <td className="text-center py-4 px-2 border-b border-gray-100 bg-blue-50 bg-opacity-30">
                      <X className="h-5 w-5 text-red-400 mx-auto opacity-70" />
                    </td>
                    <td className="text-center py-4 px-2 border-b border-gray-100">
                      <CheckCircle2 className="h-5 w-5 text-purple-500 mx-auto" />
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="font-medium py-4 px-6 border-b border-gray-100">
                      <div className="flex items-center gap-0.5">
                        Support
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <HelpCircle className="h-4 w-4 text-blue-400" />
                            </TooltipTrigger>
                            <TooltipContent className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 shadow-lg">
                              <p className="w-56 text-xs text-gray-700">Access to technical and expert assistance</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </td>
                    <td className="text-center py-4 px-2 border-b border-gray-100">
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full font-medium">Email</span>
                    </td>
                    <td className="text-center py-4 px-2 border-b border-gray-100 bg-blue-50 bg-opacity-30">
                      <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full font-medium">Priority</span>
                    </td>
                    <td className="text-center py-4 px-2 border-b border-gray-100">
                      <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full font-medium">24/7 Dedicated</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
          <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-gray-50 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-white to-transparent"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-block bg-gradient-to-r from-purple-50 to-pink-50 text-purple-600 px-5 py-2 rounded-full text-sm font-medium mb-4 shadow-sm">
                Common Questions
              </div>
              <h2 className="text-4xl font-bold mb-6 text-gray-900">
                Frequently <span className="bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">Asked</span> Questions
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Get quick answers to the most common questions about our platform and services
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 group hover:border-blue-100">
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 mr-4 group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Can I change plans later?</h3>
                </div>
                <p className="text-gray-600 pl-12">Yes, you can upgrade or downgrade your plan at any time. Upgrades take effect immediately, while downgrades are applied at the end of your current billing cycle.</p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 group hover:border-blue-100">
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-full bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-600 mr-4 group-hover:scale-110 transition-transform duration-300">
                    <Clock className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">How does the free trial work?</h3>
                </div>
                <p className="text-gray-600 pl-12">Our 14-day free trial gives you full access to all features of the Professional plan. No credit card is required to start your trial.</p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 group hover:border-blue-100">
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-full bg-gradient-to-r from-orange-50 to-amber-50 text-orange-600 mr-4 group-hover:scale-110 transition-transform duration-300">
                    <Building className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Do you offer discounts for startups?</h3>
                </div>
                <p className="text-gray-600 pl-12">Yes, we offer special pricing for startups and small businesses. Contact our sales team to learn more about our startup program.</p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 group hover:border-blue-100">
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-full bg-gradient-to-r from-purple-50 to-pink-50 text-purple-600 mr-4 group-hover:scale-110 transition-transform duration-300">
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">What payment methods do you accept?</h3>
                </div>
                <p className="text-gray-600 pl-12">We accept all major credit cards, PayPal, and bank transfers for Enterprise plans. All payments are processed securely.</p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 group hover:border-blue-100">
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-full bg-gradient-to-r from-red-50 to-rose-50 text-red-600 mr-4 group-hover:scale-110 transition-transform duration-300">
                    <Ban className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Can I cancel my subscription anytime?</h3>
                </div>
                <p className="text-gray-600 pl-12">Yes, you can cancel your subscription at any time. If you cancel, you'll have access to Exvorta until the end of your current billing period.</p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 group hover:border-blue-100">
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 mr-4 group-hover:scale-110 transition-transform duration-300">
                    <DollarSign className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Is there a setup fee?</h3>
                </div>
                <p className="text-gray-600 pl-12">No, there are no setup fees for any of our plans. You only pay the advertised subscription price.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden">
          {/* Light gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-emerald-50"></div>

          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="bg-white p-12 rounded-3xl max-w-4xl mx-auto shadow-lg border border-gray-100">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">
                Ready to <span className="bg-gradient-to-r from-emerald-600 to-teal-500 text-transparent bg-clip-text">Streamline</span> Your Export Operations?
              </h2>
              <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                Join thousands of businesses using Exvorta to expand their global reach
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-5 sm:space-y-0 sm:space-x-5">
                <a href="/auth" className="w-full sm:w-auto">
                  <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 hover:scale-105 text-white transition-all duration-300 w-full sm:w-auto px-8 py-5 text-lg font-semibold shadow-md hover:shadow-lg">
                    Contact Sales
                  </Button>
                </a>
                <a href="#" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="bg-white border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-500 hover:text-emerald-500 hover:scale-105 transition-all duration-300 w-full sm:w-auto px-8 py-5 text-lg font-semibold shadow-sm hover:shadow-md">
                    Request Demo
                  </Button>
                </a>
              </div>
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
                    <path d="M16.853 22.8571C16.853 23.5028 17.1086 24.1219 17.5637 24.5771C18.0188 25.0322 18.638 25.2878 19.2837 25.2878C19.9294 25.2878 20.5486 25.0322 21.0037 24.5771C21.4588 24.1219 21.7144 23.5028 21.7144 22.8571C21.7144 22.2114 21.4588 21.5923 21.0037 21.1371C20.5486 20.682 19.9294 20.4264 19.2837 20.4264C18.638 20.4264 18.0188 20.682 17.5637 21.1371C17.1086 21.5923 16.853 22.2114 16.85322.8571Z" fill="currentColor"/>
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
              &copy; 2025 Exvorta. All rights reserved.
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