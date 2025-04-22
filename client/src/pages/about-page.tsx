import { Button } from "@/components/ui/button";
import { Sparkles, Globe, Users, ShieldCheck, HeartHandshake, Goal, BarChart3, Building, MousePointer2, LayoutGrid, Code, Laptop } from "lucide-react";
import { useState, useEffect } from "react";

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("about");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initially
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 overflow-hidden">


      {/* Header */}
      <header className={`sticky top-0 z-30 transition-all duration-300 ${isScrolled ? 'py-3 bg-white/95 backdrop-blur-md shadow-sm' : 'py-5 bg-transparent'}`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <a href="/" className="text-2xl font-bold flex items-center group">
                <div className="mr-3 transition-transform duration-300 group-hover:rotate-12">
                  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" className="text-emerald-600">
                    <g fill="currentColor">
                      <path d="M12,2 L12,4 L14,4 L14,5 L10,5 L10,4 L12,4 L12,2 Z" />
                      <path d="M9,6 L15,6 L15,7 L9,7 L9,6 Z" />
                      <path d="M7,8 L7,9 L6,9 L6,10 L7,10 L7,11 L8,11 L8,10 L9,10 L9,11 L15,11 L15,10 L16,10 L16,11 L17,11 L17,10 L18,10 L18,9 L17,9 L17,8 L7,8 Z" />
                      <path d="M4,12 L20,12 L20,14 L4,14 L4,12 Z" />
                      <path d="M6,15 L7,15 L8,15 L9,15 L10,15 L11,15 L12,15 L13,15 L14,15 L15,15 L16,15 L17,15 L18,15 C18,15.5 18,16 18,16.5 C18,17 17,18 16,18 L15,18 L14,18 L13,18 L12,18 L11,18 L10,18 L9,18 L8,18 C7,18 6,17 6,16.5 C6,16 6,15.5 6,15 Z" />
                      <circle cx="8" cy="17" r="1" />
                      <circle cx="16" cy="17" r="1" />
                    </g>
                  </svg>
                </div>
                <span className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 text-transparent bg-clip-text font-bold">Exvorta</span>
              </a>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="/" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors duration-300">Home</a>
              <a href="/features" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors duration-300">Features</a>
              <a href="/pricing" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors duration-300">Pricing</a>
              <a href="/about" className="text-emerald-600 font-semibold transition-colors duration-300 border-b-2 border-emerald-600">About Us</a>
            </nav>
            <div className="flex items-center space-x-4">
              <a href="/auth" className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors duration-300">Login</a>
              <a href="/auth" className="hidden md:block">
                <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">Get Started</Button>
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section id="hero" className="py-20 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 rounded-full px-4 py-2 mb-6">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm font-semibold">Transforming Global Trade</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                Empowering <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-400 text-transparent bg-clip-text">Indonesian SMEs</span> to 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400 block md:inline-block mt-2 md:mt-0"> Access Global Markets</span>
              </h1>
              <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
                We're bridging the gap between local businesses and global opportunities through
                AI-powered solutions designed specifically for small and medium enterprises.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <a href="/auth">
                  <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white hover:shadow-lg hover:shadow-emerald-100/50 transition-all duration-300 px-8 py-6 text-lg shadow-md">
                    Start Your Journey
                  </Button>
                </a>
                <a href="#vision-mission">
                  <Button size="lg" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white transition-all duration-300 px-8 py-6 text-lg shadow-md">
                    Learn Our Story
                  </Button>
                </a>
              </div>
            </div>
          </div>
          
          {/* Animated Highlight Cards */}
          <div className="container mx-auto px-4 mt-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 group overflow-hidden relative">
                <div className="absolute -right-10 -top-10 w-24 h-24 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-full opacity-70 group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                    <Globe className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">Global Reach</h3>
                  <p className="text-gray-600">Connecting Indonesian businesses to over <span className="font-semibold text-emerald-600">25+ countries</span> worldwide</p>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 group overflow-hidden relative">
                <div className="absolute -right-10 -top-10 w-24 h-24 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full opacity-70 group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                    <Users className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">SME Focused</h3>
                  <p className="text-gray-600">Empowering <span className="font-semibold text-blue-600">5,000+ SMEs</span> to compete on the global stage</p>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 group overflow-hidden relative">
                <div className="absolute -right-10 -top-10 w-24 h-24 bg-gradient-to-br from-purple-50 to-purple-100 rounded-full opacity-70 group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                    <BarChart3 className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">Trade Volume</h3>
                  <p className="text-gray-600">Facilitated over <span className="font-semibold text-purple-600">$120M in exports</span> for Indonesian businesses</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission Cards Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-600 rounded-full px-4 py-2 mb-6">
                <Goal className="h-4 w-4" />
                <span className="text-sm font-semibold">Our Guiding Principles</span>
              </div>
              <h2 className="text-4xl font-bold mb-6 text-gray-900">
                Vision & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Mission</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 p-0">
                <div className="h-3 w-full bg-gradient-to-r from-emerald-400 to-teal-500"></div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">Our Vision</h3>
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50/60 p-6 rounded-xl mb-6 relative overflow-hidden">
                    <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-emerald-100/30 rounded-full"></div>
                    <div className="relative z-10">
                      <p className="text-lg font-medium text-gray-800">
                        "To create a world where every business, regardless of size, can seamlessly participate in global trade and reach international markets without barriers."
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    We envision a future where geographical location, company size, and resource limitations are no longer obstacles to global business growth. Through technology and innovation, we're working to level the playing field for SMEs around the world.
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 p-0">
                <div className="h-3 w-full bg-gradient-to-r from-blue-400 to-indigo-500"></div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">Our Mission</h3>
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50/60 p-6 rounded-xl mb-6 relative overflow-hidden">
                    <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-blue-100/30 rounded-full"></div>
                    <div className="relative z-10">
                      <p className="text-lg font-medium text-gray-800">
                        "To democratize access to global markets by leveraging artificial intelligence and data science to simplify the complexities of international trade for small and medium enterprises."
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    Our mission is to build technology that makes exporting as simple as possible for SMEs. We break down complex regulations, automate documentation, and provide actionable market insights—all through our intuitive platform designed specifically for businesses new to international trade.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Story Section */}
        <section id="vision-mission" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-600 rounded-full px-4 py-2 mb-6">
                  <Building className="h-4 w-4" />
                  <span className="text-sm font-semibold">Founding Story</span>
                </div>
                <h2 className="text-4xl font-bold mb-6 text-gray-900">
                  Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-500">Journey</span>
                </h2>
              </div>
              
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-400 via-indigo-500 to-purple-600"></div>
                <div className="grid md:grid-cols-5 gap-8 items-center">
                  <div className="md:col-span-3">
                    <h3 className="text-2xl font-bold mb-6 text-gray-900">The Exvorta Story</h3>
                    <p className="text-gray-600 mb-4 text-lg">
                      Exvorta is a brand new startup founded in 2025 by Tasya Amanda Adinegara, a dedicated and passionate Data Scientist with over six years of experience, who recognized a critical gap in the export market for Indonesian SMEs.
                    </p>
                    <p className="text-gray-600 mb-4 text-lg">
                      Drawing on her expertise in Artificial Intelligence and her Computer Science background from Padjajaran University, Tasya launched Exvorta with a vision to democratize access to global markets for small businesses.
                    </p>
                    <p className="text-gray-600 text-lg">
                      As an innovative young company, Exvorta is leveraging cutting-edge AI technology to provide SMEs with professional-grade export tools and insights that were previously available only to large corporations with dedicated export departments.
                    </p>
                  </div>
                  
                  <div className="md:col-span-2">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-xl text-center">
                        <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-400">
                          2025
                        </div>
                        <p className="text-gray-600 mt-2">Founded</p>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-xl text-center">
                        <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-400">
                          5,000+
                        </div>
                        <p className="text-gray-600 mt-2">SMEs Served</p>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-xl text-center">
                        <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-400">
                          25+
                        </div>
                        <p className="text-gray-600 mt-2">Countries</p>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-xl text-center">
                        <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-400">
                          250+
                        </div>
                        <p className="text-gray-600 mt-2">Documents</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Founder Section */}
        <section id="founder" className="py-24 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-600 rounded-full px-4 py-2 mb-6">
                <Users className="h-4 w-4" />
                <span className="text-sm font-semibold">Leadership</span>
              </div>
              <h2 className="text-4xl font-bold mb-6 text-gray-900">
                Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-500">Founder</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Passionate about harnessing the power of data science and AI to solve real-world trade challenges
              </p>
            </div>
            
            <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-100/50 to-indigo-100/50 rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-emerald-100/50 to-teal-100/50 rounded-full transform -translate-x-1/3 translate-y-1/3"></div>
              
              <div className="relative z-10 p-12 flex flex-col md:flex-row items-center">
                <div className="md:w-1/3 mb-8 md:mb-0">
                  <div className="w-64 h-64 mx-auto relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-200 to-indigo-200 rounded-full opacity-70"></div>
                    <div className="absolute inset-2 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full"></div>
                    <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center overflow-hidden border-4 border-white">
                      <div className="w-full h-full bg-gray-200 rounded-full">
                        {/* Placeholder for profile photo */}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="md:w-2/3 md:pl-12 text-left">
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">Tasya Amanda Adinegara</h3>
                  <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 rounded-full px-4 py-2 mb-6">
                    <span className="text-sm font-semibold">Founder & CEO</span>
                  </div>
                  
                  <p className="text-gray-600 mb-6">
                    A dedicated and passionate Data Scientist with over six years of experience across Data Engineering, 
                    Business Intelligence, and AI fields. With a Bachelor's degree in Computer Science from Padjajaran 
                    University, Tasya combines deep technical expertise with a vision for transforming global trade.
                  </p>
                  
                  <p className="text-gray-600 mb-8">
                    Her expertise in artificial intelligence and data analytics has been instrumental in developing 
                    Exvorta's innovative solutions that help Indonesian SMEs navigate the complexities of international trade 
                    and expand their global footprint.
                  </p>
                  
                  <div className="flex space-x-4 mt-4">
                    <a 
                      href="https://www.linkedin.com/in/tasyaadinegara/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center gap-2 text-sm text-blue-600 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-full transition-colors duration-300"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      <span>LinkedIn Profile</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technology Section */}
        <section id="technology" className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 rounded-full px-4 py-2 mb-6">
                <Code className="h-4 w-4" />
                <span className="text-sm font-semibold">Technology</span>
              </div>
              <h2 className="text-4xl font-bold mb-6 text-gray-900">
                Powered by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500">Advanced Technology</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our platform combines artificial intelligence, data science, and industry expertise to transform the way SMEs approach international trade
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Card 1 */}
              <div className="group">
                <div className="bg-white rounded-3xl shadow-lg overflow-hidden transition-all duration-500 transform group-hover:-translate-y-2 group-hover:shadow-xl h-full flex flex-col">
                  <div className="h-3 w-full bg-gradient-to-r from-blue-400 to-blue-600"></div>
                  <div className="p-8 flex-grow">
                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                      <svg className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 21H4.6C4.03995 21 3.75992 21 3.54601 20.891C3.35785 20.7951 3.20487 20.6422 3.10899 20.454C3 20.2401 3 19.9601 3 19.4V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M7 15L10.2 11.4C10.2943 11.2931 10.3524 11.2397 10.419 11.2164C10.4776 11.1957 10.5412 11.1957 10.5998 11.2164C10.6664 11.2397 10.7245 11.2931 10.8407 11.3998L12.9593 13.6002C13.0755 13.7069 13.1336 13.7603 13.2002 13.7836C13.2588 13.8043 13.3224 13.8043 13.381 13.7836C13.4476 13.7603 13.5057 13.7069 13.622 13.6002L17 10.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-gray-900">AI-Powered Market Analytics</h3>
                    <p className="text-gray-600 mb-6">
                      Our platform analyzes vast amounts of global trade data to identify optimal export markets, predict demand trends, and highlight growth opportunities tailored to each business's products.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-gray-700">Real-time market opportunity assessment</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-gray-700">Competitor analysis</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-gray-700">Demand forecasting</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Card 2 */}
              <div className="group">
                <div className="bg-white rounded-3xl shadow-lg overflow-hidden transition-all duration-500 transform group-hover:-translate-y-2 group-hover:shadow-xl h-full flex flex-col">
                  <div className="h-3 w-full bg-gradient-to-r from-purple-400 to-purple-600"></div>
                  <div className="p-8 flex-grow">
                    <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-600 transition-colors duration-300">
                      <svg className="w-8 h-8 text-purple-600 group-hover:text-white transition-colors duration-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 2V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M16 2V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M3 8H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M19 4H5C3.89543 4 3 4.89543 3 6V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V6C21 4.89543 20.1046 4 19 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9 13H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 10L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-gray-900">Smart Documentation</h3>
                    <p className="text-gray-600 mb-6">
                      We simplify the most complex aspect of exporting—paperwork. Our intelligent system generates country-specific documentation and ensures compliance with ever-changing international regulations.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                        <span className="text-gray-700">Automated document generation</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                        <span className="text-gray-700">Regulatory compliance validation</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                        <span className="text-gray-700">Digital document management</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Card 3 */}
              <div className="group">
                <div className="bg-white rounded-3xl shadow-lg overflow-hidden transition-all duration-500 transform group-hover:-translate-y-2 group-hover:shadow-xl h-full flex flex-col">
                  <div className="h-3 w-full bg-gradient-to-r from-emerald-400 to-emerald-600"></div>
                  <div className="p-8 flex-grow">
                    <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 transition-colors duration-300">
                      <svg className="w-8 h-8 text-emerald-600 group-hover:text-white transition-colors duration-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 3V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8 8L5 11L8 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M16 8L19 11L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-gray-900">Risk Assessment & Mitigation</h3>
                    <p className="text-gray-600 mb-6">
                      Our platform continuously monitors global factors that could impact your exports, providing real-time risk assessment and actionable mitigation strategies to protect your business.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                        <span className="text-gray-700">Real-time risk monitoring</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                        <span className="text-gray-700">Geopolitical impact analysis</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                        <span className="text-gray-700">Customized mitigation strategies</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-teal-700 opacity-95"></div>
          <div className="absolute inset-0 bg-pattern-grid opacity-10"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="p-12 text-center">
                <h2 className="text-4xl font-bold mb-6 text-gray-900">
                  Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Go Global</span>?
                </h2>
                <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                  Be among the first Indonesian SMEs to use Exvorta's innovative platform to simplify your export operations and access new global markets.
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                  <a href="/auth">
                    <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white hover:shadow-lg transition-all duration-300 px-8 py-6 text-lg font-semibold shadow-md hover:scale-105">
                      Start Your Journey
                    </Button>
                  </a>
                  <a href="/pricing">
                    <Button size="lg" variant="outline" className="border-2 border-emerald-500 text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 hover:bg-emerald-50 transition-all duration-300 px-8 py-6 text-lg font-semibold hover:scale-105">
                      View Pricing
                    </Button>
                  </a>
                </div>
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
                    <path d="M16.853 22.8571C16.853 23.5028 17.1086 24.1219 17.5637 24.5771C18.0188 25.0322 18.638 25.2878 19.2837 25.2878C19.9294 25.2878 20.5486 25.0322 21.0037 24.5771C21.4588 24.1219 21.7144 23.5028 21.7144 22.8571C21.7144 22.2114 21.4588 21.5923 21.0037 21.1371C20.5486 20.682 19.9294 20.4264 19.2837 20.4264C18.638 20.4264 18.0188 20.682 17.5637 21.1371C17.1086 21.5923 16.853 22.2114 16.853 22.8571Z" fill="currentColor"/>
                  </svg>
                </div>
                <span className="ml-2 bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">Exvorta</span>
              </a>
              <p className="text-gray-500 mb-6">
                Simplifying global trade for businesses worldwide with AI-powered solutions
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-emerald-600 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-emerald-600 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-emerald-600 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-gray-900 font-semibold mb-4">Product</h4>
              <ul className="space-y-3">
                <li><a href="/features" className="text-gray-500 hover:text-emerald-600 transition-colors duration-300">Features</a></li>
                <li><a href="/pricing" className="text-gray-500 hover:text-emerald-600 transition-colors duration-300">Pricing</a></li>
                <li><a href="#" className="text-gray-500 hover:text-emerald-600 transition-colors duration-300">Case Studies</a></li>
                <li><a href="#" className="text-gray-500 hover:text-emerald-600 transition-colors duration-300">Documentation</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-gray-900 font-semibold mb-4">Company</h4>
              <ul className="space-y-3">
                <li><a href="/about" className="text-gray-500 hover:text-emerald-600 transition-colors duration-300">About Us</a></li>
                <li><a href="#" className="text-gray-500 hover:text-emerald-600 transition-colors duration-300">Blog</a></li>
                <li><a href="#" className="text-gray-500 hover:text-emerald-600 transition-colors duration-300">Careers</a></li>
                <li><a href="#" className="text-gray-500 hover:text-emerald-600 transition-colors duration-300">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-gray-900 font-semibold mb-4">Legal</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-500 hover:text-emerald-600 transition-colors duration-300">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-500 hover:text-emerald-600 transition-colors duration-300">Terms of Service</a></li>
                <li><a href="#" className="text-gray-500 hover:text-emerald-600 transition-colors duration-300">Cookie Policy</a></li>
                <li><a href="#" className="text-gray-500 hover:text-emerald-600 transition-colors duration-300">Data Processing</a></li>
              </ul>
            </div>
          </div>
          
          <div className="text-center text-sm text-gray-500 pt-8 border-t border-gray-100">
            <p>&copy; {new Date().getFullYear()} Exvorta. All rights reserved.</p>
          </div>
        </div>
      </footer>


    </div>
  );
}