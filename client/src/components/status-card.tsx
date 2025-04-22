import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpIcon, ArrowDownIcon, LucideIcon } from "lucide-react";

interface StatusCardProps {
  title: string;
  value: string | number;
  change: {
    value: number;
    trend: "up" | "down";
  };
  icon: LucideIcon;
  iconColor: 
    | "primary" 
    | "secondary" 
    | "accent" 
    | "success"
    | "blue"
    | "purple"
    | "amber"
    | "green"
    | "red"
    | "indigo"
    | "cyan";
  comparisonText?: string;
}

export function StatusCard({
  title,
  value,
  change,
  icon: Icon,
  iconColor,
  comparisonText = "vs. last month",
}: StatusCardProps) {
  const isPositiveTrend = change.trend === "up";
  
  const colorClasses = {
    primary: "bg-primary-50 text-primary-600",
    secondary: "bg-secondary-50 text-secondary-600",
    accent: "bg-amber-50 text-amber-600",
    success: "bg-green-50 text-green-600",
    // New enhanced colors
    blue: "bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600",
    purple: "bg-gradient-to-br from-purple-50 to-purple-100 text-purple-600",
    amber: "bg-gradient-to-br from-amber-50 to-amber-100 text-amber-600",
    green: "bg-gradient-to-br from-green-50 to-green-100 text-green-600", 
    red: "bg-gradient-to-br from-red-50 to-red-100 text-red-600",
    indigo: "bg-gradient-to-br from-indigo-50 to-indigo-100 text-indigo-600",
    cyan: "bg-gradient-to-br from-cyan-50 to-cyan-100 text-cyan-600"
  };
  
  const iconGradientClasses = {
    blue: "from-blue-500 to-blue-600",
    purple: "from-purple-500 to-purple-600",
    amber: "from-amber-500 to-amber-600", 
    green: "from-green-500 to-green-600",
    red: "from-red-500 to-red-600",
    indigo: "from-indigo-500 to-indigo-600",
    cyan: "from-cyan-500 to-cyan-600",
    primary: "from-primary-500 to-primary-600",
    secondary: "from-secondary-500 to-secondary-600",
    accent: "from-amber-500 to-amber-600",
    success: "from-green-500 to-green-600",
  };
  
  const valueColorClasses = {
    blue: "text-blue-700",
    purple: "text-purple-700",
    amber: "text-amber-700",
    green: "text-green-700",
    red: "text-red-700",
    indigo: "text-indigo-700",
    cyan: "text-cyan-700",
    primary: "text-primary-700",
    secondary: "text-secondary-700",
    accent: "text-amber-700",
    success: "text-green-700",
  };
  
  const trendColorClasses = isPositiveTrend 
    ? "text-green-600 bg-green-50 px-2 py-0.5 rounded-full" 
    : "text-red-600 bg-red-50 px-2 py-0.5 rounded-full";
  
  const TrendIcon = isPositiveTrend ? ArrowUpIcon : ArrowDownIcon;

  return (
    <Card className="border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      <div className="h-1 w-full bg-gradient-to-r" style={{ backgroundImage: `linear-gradient(to right, var(--${iconColor === 'primary' ? 'primary' : iconColor}-500), var(--${iconColor === 'primary' ? 'primary' : iconColor}-600))` }}></div>
      <CardContent className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className={cn("text-2xl font-bold mt-1", valueColorClasses[iconColor])}>{value}</p>
          </div>
          <div className="flex items-center justify-center w-12 h-12 rounded-xl shadow-sm bg-gradient-to-r text-white" style={{ backgroundImage: `linear-gradient(to right, var(--${iconColor === 'primary' ? 'primary' : iconColor}-500), var(--${iconColor === 'primary' ? 'primary' : iconColor}-600))` }}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
        <div className="flex items-center mt-4">
          <span className={cn("text-xs font-medium flex items-center", trendColorClasses)}>
            <TrendIcon className="h-3 w-3 mr-1" />
            {Math.abs(change.value)}%
          </span>
          <span className="text-xs text-gray-500 ml-2">{comparisonText}</span>
        </div>
      </CardContent>
    </Card>
  );
}
