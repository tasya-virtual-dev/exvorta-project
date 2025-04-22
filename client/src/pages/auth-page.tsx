import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAuth } from "@/hooks/use-auth";

const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<string>("login");
  const [location, navigate] = useLocation();
  const { toast } = useToast();
  const { user, loginMutation, registerMutation } = useAuth();

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      companyName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onLoginSubmit(data: LoginFormValues) {
    loginMutation.mutate(data, {
      onSuccess: () => {
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
        });
        navigate("/dashboard");
      },
      onError: (error: Error) => {
        toast({
          title: "Login failed",
          description: error.message || "Please check your credentials and try again.",
          variant: "destructive",
        });
      },
    });
  }

  function onRegisterSubmit(data: RegisterFormValues) {
    // Remove confirmPassword as it's not in the API schema
    const { confirmPassword, ...registerData } = data;

    registerMutation.mutate(registerData, {
      onSuccess: () => {
        toast({
          title: "Registration successful!",
          description: "Your account has been created.",
        });
        navigate("/dashboard");
      },
      onError: (error: Error) => {
        toast({
          title: "Registration failed",
          description: error.message || "Please try again with different credentials.",
          variant: "destructive",
        });
      },
    });
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="bg-white">
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
                  <span className="ml-2 text-xl font-medium text-gray-900">Exvorta</span>
                </div>
              </a>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="/" className="text-neutral-800 hover:text-emerald-600 font-medium">Home</a>
              <a href="/features" className="text-neutral-800 hover:text-emerald-600 font-medium">Features</a>
              <a href="/pricing" className="text-neutral-800 hover:text-emerald-600 font-medium">Pricing</a>
              <a href="/about" className="text-neutral-800 hover:text-emerald-600 font-medium">About Us</a>
            </nav>
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left side - Form */}
        <div className="w-full md:w-1/2 p-6 md:p-12 flex items-center justify-center">
          <Card className="w-full max-w-md shadow-lg border-0 bg-white">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center text-gray-900">
                {activeTab === "login" ? "Welcome Back" : "Create Account"}
              </CardTitle>
              <CardDescription className="text-center text-gray-600">
                {activeTab === "login" 
                  ? "Login to access your export dashboard" 
                  : "Register to start your global export journey"}
              </CardDescription>
            </CardHeader>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-2 mb-4 mx-6 bg-gray-100">
                <TabsTrigger value="login" className="data-[state=active]:bg-white data-[state=active]:text-emerald-600">Login</TabsTrigger>
                <TabsTrigger value="register" className="data-[state=active]:bg-white data-[state=active]:text-emerald-600">Register</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <CardContent>
                  <Form {...loginForm}>
                    <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                      <FormField
                        control={loginForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700">Username</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Enter your username" 
                                className="bg-gray-50 border-gray-200 focus:bg-white" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={loginForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700">Password</FormLabel>
                            <FormControl>
                              <Input 
                                type="password" 
                                placeholder="Enter your password" 
                                className="bg-gray-50 border-gray-200 focus:bg-white" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white transition-all duration-300 shadow-md hover:shadow-lg" 
                        disabled={loginMutation.isPending}
                      >
                        {loginMutation.isPending ? "Logging in..." : "Login"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <div className="text-sm text-center text-neutral-600">
                    <a href="#" className="text-emerald-600 hover:underline">Forgot password?</a>
                  </div>
                </CardFooter>
              </TabsContent>

              <TabsContent value="register">
                <CardContent>
                  <Form {...registerForm}>
                    <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                      <FormField
                        control={registerForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700">Username</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Choose a username" 
                                className="bg-gray-50 border-gray-200 focus:bg-white" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={registerForm.control}
                        name="companyName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700">Company Name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Enter your company name" 
                                className="bg-gray-50 border-gray-200 focus:bg-white" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={registerForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700">Email</FormLabel>
                            <FormControl>
                              <Input 
                                type="email" 
                                placeholder="Enter your email" 
                                className="bg-gray-50 border-gray-200 focus:bg-white" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={registerForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700">Password</FormLabel>
                            <FormControl>
                              <Input 
                                type="password" 
                                placeholder="Create a password" 
                                className="bg-gray-50 border-gray-200 focus:bg-white" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={registerForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700">Confirm Password</FormLabel>
                            <FormControl>
                              <Input 
                                type="password" 
                                placeholder="Confirm your password" 
                                className="bg-gray-50 border-gray-200 focus:bg-white" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white transition-all duration-300 shadow-md hover:shadow-lg" 
                        disabled={registerMutation.isPending}
                      >
                        {registerMutation.isPending ? "Creating account..." : "Create Account"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-center w-full text-neutral-600">
                    By registering, you agree to our 
                    <a href="#" className="text-emerald-600 hover:underline mx-1">Terms of Service</a>
                    and
                    <a href="#" className="text-emerald-600 hover:underline mx-1">Privacy Policy</a>
                  </p>
                </CardFooter>
              </TabsContent>
            </Tabs>
          </Card>
        </div>

        {/* Right side - Hero Section */}
        <div className="w-full md:w-1/2 bg-white p-12 flex items-center">
          <div className="max-w-lg mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-black">Simplifying Global Trade</span> 
              <span className="text-emerald-600 block font-bold mt-1">for Businesses Worldwide</span>
            </h1>
            <p className="text-lg mb-8 text-neutral-600">
              Exvorta streamlines international trade with AI-powered insights, 
              connecting businesses worldwide to global market opportunities.
            </p>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="mr-3 bg-emerald-100 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-xl text-emerald-600">Risk Assessment & Mitigation</h3>
                  <p className="text-neutral-600">AI-powered analysis of export risks with actionable mitigation strategies</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-3 bg-emerald-100 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-xl text-emerald-600">Compliance Documentation</h3>
                  <p className="text-neutral-600">Automated generation of export documentation with regulatory compliance</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-3 bg-emerald-100 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-xl text-emerald-600">Market Intelligence</h3>
                  <p className="text-neutral-600">Data-driven insights into global markets and export forecasting</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
              </ul>
            </div>

            <div className="ml-0 md:ml-6">
              <h4 className="text-emerald-600 text-lg font-semibold mb-6">Support</h4>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="text-neutral-600 hover:text-emerald-600 transition-colors flex items-center group">
                    <div className="h-1 w-0 bg-emerald-500 rounded mr-0 group-hover:w-4 group-hover:mr-2 transition-all duration-300"></div>
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-neutral-600 hover:text-emerald-600 transition-colors flex items-center group">
                    <div className="h-1 w-0 bg-emerald-500 rounded mr-0 group-hover:w-4 group-hover:mr-2 transition-all duration-300"></div>
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-neutral-600 hover:text-emerald-600 transition-colors flex items-center group">
                    <div className="h-1 w-0 bg-emerald-500 rounded mr-0 group-hover:w-4 group-hover:mr-2 transition-all duration-300"></div>
                    API Status
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