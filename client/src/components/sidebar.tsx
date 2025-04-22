import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  RocketIcon,
  LayoutDashboardIcon,
  PackageIcon,
  GlobeIcon,
  UsersIcon,
  TruckIcon,
  GavelIcon,
  BanknoteIcon,
  LineChartIcon,
  GraduationCapIcon,
  HeadphonesIcon,
  SettingsIcon,
  LightbulbIcon,
} from "lucide-react";

interface SidebarProps {
  exportReadiness: number;
}

export function Sidebar({ exportReadiness }: SidebarProps) {
  const [location] = useLocation();

  const navigationItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboardIcon,
    },
    {
      name: "Product Catalog",
      href: "/product-catalog",
      icon: PackageIcon,
    },
    {
      name: "Market Research",
      href: "/market-research",
      icon: GlobeIcon,
    },
    {
      name: "Buyer Matching",
      href: "/buyer-matching",
      icon: UsersIcon,
    },
    {
      name: "Logistics Management",
      href: "/logistics-management",
      icon: TruckIcon,
    },
    {
      name: "Compliance & Docs",
      href: "/compliance-documentation",
      icon: GavelIcon,
    },
    {
      name: "Financing Options",
      href: "/financing",
      icon: BanknoteIcon,
    },
    {
      name: "Analytics",
      href: "/analytics",
      icon: LineChartIcon,
    },
  ];

  const secondaryNavigationItems = [
    {
      name: "Learning Center",
      href: "/learning",
      icon: GraduationCapIcon,
    },
    {
      name: "Support",
      href: "/support",
      icon: HeadphonesIcon,
    },
    {
      name: "Settings",
      href: "/settings",
      icon: SettingsIcon,
    },
  ];

  return (
    <aside className="bg-white shadow-md w-64 min-h-full hidden sm:block border-r border-neutral-200">
      <div className="h-full flex flex-col">
        <div className="p-4">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl mb-4 shadow-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-gradient-to-r from-blue-500 to-blue-600 text-white p-2 rounded-lg mr-3">
                <RocketIcon className="h-5 w-5" />
              </div>
              <div className="flex-grow">
                <p className="text-sm font-medium text-gray-800">Export Readiness</p>
                <div className="relative mt-1.5">
                  <Progress 
                    value={exportReadiness} 
                    className="h-2 mt-1 bg-blue-100" 
                    indicatorClassName="bg-gradient-to-r from-blue-500 to-indigo-600"
                  />
                  <div className="absolute -right-1 -top-1 bg-white text-xs font-semibold text-blue-700 px-1.5 py-0.5 rounded-full border border-blue-200 shadow-sm">
                    {exportReadiness}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-2">
          <ul className="space-y-1.5">
            {navigationItems.map((item) => {
              const isActive = location === item.href;
              const iconColors = {
                "Dashboard": "from-blue-500 to-blue-600",
                "Product Catalog": "from-emerald-500 to-emerald-600",
                "Market Research": "from-indigo-500 to-indigo-600",
                "Buyer Matching": "from-purple-500 to-purple-600",
                "Logistics Management": "from-amber-500 to-amber-600",
                "Compliance & Docs": "from-red-500 to-red-600",
                "Financing Options": "from-green-500 to-green-600",
                "Analytics": "from-cyan-500 to-cyan-600",
              };
              
              const gradientColor = iconColors[item.name as keyof typeof iconColors] || "from-blue-500 to-blue-600";
              
              return (
                <li key={item.name}>
                  <Link href={item.href}>
                    <div
                      className={cn(
                        "flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer",
                        isActive
                          ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 shadow-sm"
                          : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                      )}
                    >
                      <div className={cn(
                        "mr-3 h-8 w-8 rounded-lg flex items-center justify-center shadow-sm transition-all duration-200",
                        isActive 
                          ? `bg-gradient-to-r ${gradientColor} text-white` 
                          : "bg-gray-100 text-gray-500"
                      )}>
                        <item.icon className="h-4 w-4" />
                      </div>
                      {item.name}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="border-t border-gray-200 mt-5 pt-5">
            <ul className="space-y-1.5">
              {secondaryNavigationItems.map((item) => {
                const isActive = location === item.href;
                return (
                  <li key={item.name}>
                    <Link href={item.href}>
                      <div
                        className={cn(
                          "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer",
                          isActive
                            ? "bg-gradient-to-r from-gray-100 to-gray-50 text-gray-800"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        )}
                      >
                        <div className={cn(
                          "mr-3 h-6 w-6 rounded-md flex items-center justify-center transition-all duration-200",
                          isActive 
                            ? "bg-gradient-to-r from-gray-700 to-gray-800 text-white" 
                            : "bg-gray-100 text-gray-500"
                        )}>
                          <item.icon className="h-3.5 w-3.5" />
                        </div>
                        {item.name}
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-xl shadow-sm border border-amber-100">
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-gradient-to-r from-amber-500 to-orange-500 text-white p-1.5 rounded-lg mr-3">
                <LightbulbIcon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">Need assistance?</p>
                <p className="text-xs text-gray-600 mt-1">
                  Contact our export advisors for personalized guidance.
                </p>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="link"
                        className="mt-2 p-0 text-xs font-medium text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 h-auto"
                      >
                        Schedule a Call
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Connect with an export advisor</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
