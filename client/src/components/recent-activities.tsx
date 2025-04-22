import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FileTextIcon, CheckCircleIcon, AlertTriangleIcon, UsersIcon, CalendarIcon } from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface Activity {
  id: number;
  type: "document" | "completion" | "warning" | "buyer" | "deadline";
  title: string;
  description: string;
  timestamp: string;
}

interface RecentActivitiesProps {
  activities: Activity[];
  onViewAll: () => void;
}

export function RecentActivities({ activities, onViewAll }: RecentActivitiesProps) {
  const getActivityIcon = (type: Activity["type"]): LucideIcon => {
    switch (type) {
      case "document":
        return FileTextIcon;
      case "completion":
        return CheckCircleIcon;
      case "warning":
        return AlertTriangleIcon;
      case "buyer":
        return UsersIcon;
      case "deadline":
        return CalendarIcon;
      default:
        return FileTextIcon;
    }
  };

  const getIconColorClass = (type: Activity["type"]) => {
    switch (type) {
      case "document":
        return "bg-primary-100 text-primary-600";
      case "completion":
        return "bg-green-50 text-green-600";
      case "warning":
        return "bg-amber-50 text-amber-600";
      case "buyer":
        return "bg-primary-100 text-primary-600";
      case "deadline":
        return "bg-neutral-100 text-neutral-600";
      default:
        return "bg-neutral-100 text-neutral-600";
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold font-poppins text-neutral-900">Recent Activities</h2>
        <Button
          variant="link"
          className="text-sm text-primary-600 hover:text-primary-700 font-medium p-0 h-auto"
          onClick={onViewAll}
        >
          View All
        </Button>
      </div>

      <Card className="border border-neutral-100">
        <CardContent className="p-5">
          <div className="space-y-4">
            {activities.map((activity) => {
              const Icon = getActivityIcon(activity.type);
              return (
                <div key={activity.id} className="flex">
                  <div className={cn(
                    "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
                    getIconColorClass(activity.type)
                  )}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-neutral-800">
                      <span className="font-medium">{activity.title}</span> {activity.description}
                    </p>
                    <p className="text-xs text-neutral-500 mt-1">{activity.timestamp}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
