import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { X } from "lucide-react";
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
} from "lucide-react";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    name?: string;
    username: string;
    companyName: string;
    email: string;
  };
  exportReadiness: number;
}

export function MobileNav({ isOpen, onClose, user, exportReadiness }: MobileNavProps) {
  const [location] = useLocation();

  const navigationItems = [
    {
      name: "Dashboard",
      href: "/",
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
      href: "/logistics",
      icon: TruckIcon,
    },
    {
      name: "Compliance & Docs",
      href: "/compliance-docs",
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
    <div
      className={cn(
        "mobile-nav bg-white shadow-lg sm:hidden w-full h-screen fixed top-0 z-50 transition-all duration-300",
        isOpen ? "left-0" : "-left-full"
      )}
    >
      <div className="p-4 border-b border-neutral-200 flex justify-between items-center">
        <div className="flex items-center">
          <svg className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8,3L3,8v8l5,5h8l5-5V8l-5-5H8z M16,16h-8V8h8V16z M15,10h-6v4h6V10z" />
          </svg>
          <span className="ml-2 text-xl font-semibold font-poppins text-primary">Exvorta</span>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5 text-neutral-600" />
        </Button>
      </div>

      <div className="p-4">
        <div className="flex items-center space-x-3 mb-6">
          <Avatar className="w-10 h-10">
            <AvatarFallback className="bg-emerald-600 text-white">
              {(user.name || user.companyName || user.username)
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-neutral-800">{user.name || user.companyName}</p>
            <p className="text-sm text-neutral-500">{user.email}</p>
          </div>
        </div>

        <div className="bg-primary-50 text-primary-700 p-3 rounded-lg mb-4">
          <div className="flex items-center">
            <RocketIcon className="mr-2 h-5 w-5" />
            <div>
              <p className="text-sm font-medium">Export Readiness</p>
              <Progress value={exportReadiness} className="h-1.5 mt-1 bg-primary-100" />
            </div>
            <p className="ml-2 text-sm font-semibold">{exportReadiness}%</p>
          </div>
        </div>
      </div>

      <nav className="px-4 py-2">
        <ul className="space-y-2">
          {navigationItems.map((item) => (
            <li key={item.name}>
              <Link href={item.href}>
                <div
                  className={cn(
                    "flex items-center px-3 py-3 text-sm font-medium rounded-md cursor-pointer",
                    location === item.href
                      ? "bg-primary-50 text-primary-700"
                      : "text-neutral-700 hover:bg-neutral-50"
                  )}
                  onClick={onClose}
                >
                  <item.icon
                    className={cn(
                      "mr-3 h-5 w-5",
                      location === item.href ? "text-primary-600" : "text-neutral-500"
                    )}
                  />
                  {item.name}
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div className="border-t border-neutral-200 mt-4 pt-4">
          <ul className="space-y-2">
            {secondaryNavigationItems.map((item) => (
              <li key={item.name}>
                <Link href={item.href}>
                  <div
                    className={cn(
                      "flex items-center px-3 py-3 text-sm font-medium rounded-md cursor-pointer",
                      location === item.href
                        ? "bg-primary-50 text-primary-700"
                        : "text-neutral-700 hover:bg-neutral-50"
                    )}
                    onClick={onClose}
                  >
                    <item.icon
                      className={cn(
                        "mr-3 h-5 w-5",
                        location === item.href ? "text-primary-600" : "text-neutral-500"
                      )}
                    />
                    {item.name}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
}
