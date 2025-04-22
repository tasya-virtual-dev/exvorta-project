import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  HelpCircleIcon,
  CheckIcon,
  EditIcon,
  UsersIcon,
  TruckIcon,
  ReceiptCent,
  ArrowRightIcon,
} from "lucide-react";
import { Link } from "wouter";

export interface ProcessStep {
  id: number;
  name: string;
  description: string;
  status: "completed" | "in_progress" | "upcoming";
  order: number;
}

interface ExportProcessGuidanceProps {
  projectName: string;
  progress: number;
  steps: ProcessStep[];
}

export function ExportProcessGuidance({ projectName, progress, steps }: ExportProcessGuidanceProps) {
  const getStepIcon = (step: ProcessStep) => {
    switch (step.name.toLowerCase()) {
      case "product selection":
        return CheckIcon;
      case "market research":
        return CheckIcon;
      case "compliance & documentation":
        return EditIcon;
      case "buyer matchmaking":
        return UsersIcon;
      case "logistics planning":
        return TruckIcon;
      case "payment processing":
        return ReceiptCent;
      default:
        return CheckIcon;
    }
  };

  const getStepStatusClasses = (status: ProcessStep["status"]) => {
    switch (status) {
      case "completed":
        return "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md shadow-green-100";
      case "in_progress":
        return "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md shadow-blue-100";
      case "upcoming":
        return "bg-gradient-to-r from-gray-200 to-gray-300 text-gray-500";
    }
  };

  const getStatusText = (status: ProcessStep["status"]) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "in_progress":
        return "In Progress";
      case "upcoming":
        return "Upcoming";
    }
  };

  const getStatusTextClasses = (status: ProcessStep["status"]) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-50 px-2 py-0.5 rounded-full text-xs";
      case "in_progress":
        return "text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full text-xs";
      case "upcoming":
        return "text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full text-xs";
    }
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg p-2 text-white shadow-md mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Export Process Guidance
            </h2>
            <p className="text-sm text-gray-600">Track your progress through the export process</p>
          </div>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                <HelpCircleIcon className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-white border border-gray-200 shadow-lg p-3 rounded-lg">
              <p className="text-xs text-gray-700">Step-by-step guidance to help you navigate the export process</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <Card className="border border-gray-100 rounded-xl shadow-sm overflow-hidden">
        <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600"></div>
        <CardContent className="p-6">
          <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-gradient-to-r from-blue-600 to-indigo-700 h-10 w-10 rounded-full flex items-center justify-center text-white shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
                </svg>
              </div>
              <div className="ml-4 flex-grow">
                <div className="flex justify-between items-center mb-1">
                  <p className="font-semibold text-gray-900">
                    Project: <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">{projectName}</span>
                  </p>
                  <span className="text-sm font-medium px-2.5 py-0.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                    {progress}% Complete
                  </span>
                </div>
                <div className="relative">
                  <Progress 
                    value={progress} 
                    className="h-2.5 flex-grow bg-blue-100 rounded-full" 
                    indicatorClassName="bg-gradient-to-r from-blue-500 to-indigo-600"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {steps.map((step, index) => {
              const StepIcon = getStepIcon(step);
              const isLast = index === steps.length - 1;
              return (
                <div key={step.id} className="process-step pl-12 relative">
                  {/* Vertical line connection */}
                  {!isLast && (
                    <div className="absolute left-4 top-8 w-0.5 h-full bg-gradient-to-b from-blue-100 to-gray-100 -z-10"></div>
                  )}
                  
                  <div className="flex items-start mb-2">
                    <div
                      className={cn(
                        "absolute left-0 w-8 h-8 rounded-full flex items-center justify-center z-10",
                        getStepStatusClasses(step.status)
                      )}
                    >
                      <StepIcon className="h-4 w-4" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-center">
                        <h3 className={cn(
                          "font-semibold",
                          step.status === "upcoming" ? "text-gray-500" : "text-gray-800"
                        )}>
                          {step.name}
                        </h3>
                        <span className={cn(
                          getStatusTextClasses(step.status)
                        )}>
                          {getStatusText(step.status)}
                        </span>
                      </div>
                      <p className={cn(
                        "text-sm mt-1",
                        step.status === "upcoming" ? "text-gray-500" : "text-gray-600"
                      )}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                  
                  {step.status === "in_progress" && (
                    <div className="mt-3">
                      <Link href={`/process/${step.id}`}>
                        <a className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 rounded-full shadow-sm transition-all duration-200 hover:shadow">
                          Continue {step.name}
                          <ArrowRightIcon className="ml-1.5 h-3.5 w-3.5" />
                        </a>
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
