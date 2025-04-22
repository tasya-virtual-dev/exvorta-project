import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { HelpCircleIcon, InfoIcon, LightbulbIcon } from "lucide-react";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

export interface RiskFactor {
  name: string;
  level: "High" | "Medium" | "Low";
  percentage: number;
  description: string;
}

export interface MitigationSuggestion {
  title: string;
  description: string;
}

interface ExportRiskAssessmentProps {
  overallRiskScore: number;
  riskLevel: string;
  riskFactors: RiskFactor[];
  mitigationSuggestions: MitigationSuggestion[];
}

export function ExportRiskAssessment({
  overallRiskScore,
  riskLevel,
  riskFactors,
  mitigationSuggestions,
}: ExportRiskAssessmentProps) {
  const getRiskLevelColor = (level: RiskFactor["level"]) => {
    switch (level) {
      case "High":
        return "text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-500";
      case "Medium":
        return "text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-500";
      case "Low":
        return "text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-500";
    }
  };

  const getRiskLevelBadgeColor = (level: RiskFactor["level"]) => {
    switch (level) {
      case "High":
        return "bg-red-50 text-red-600 border border-red-200";
      case "Medium":
        return "bg-amber-50 text-amber-600 border border-amber-200";
      case "Low":
        return "bg-green-50 text-green-600 border border-green-200";
    }
  };

  const getRiskBarColor = (level: RiskFactor["level"]) => {
    switch (level) {
      case "High":
        return "bg-gradient-to-r from-red-500 to-red-600";
      case "Medium":
        return "bg-gradient-to-r from-amber-500 to-amber-600";
      case "Low":
        return "bg-gradient-to-r from-green-500 to-green-600";
    }
  };

  const getOverallRiskColor = (score: number) => {
    if (score >= 80) return "text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-500";
    if (score >= 50) return "text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-500";
    return "text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-500";
  };

  const getDegrees = (score: number) => {
    // Convert score to degrees (0-100 scale to 0-360 degrees)
    return (score / 100) * 360;
  };

  const getBorderStyle = (score: number) => {
    const degrees = getDegrees(score);
    // For scores below 50%, we need a different approach to create the partial circle
    if (score <= 50) {
      return {
        borderTop: `4px solid ${score >= 80 ? "#DC2626" : score >= 50 ? "#D97706" : "#059669"}`,
        borderRight: `4px solid ${score >= 80 ? "#DC2626" : score >= 50 ? "#D97706" : "#059669"}`,
        borderBottom: "4px solid transparent",
        borderLeft: "4px solid transparent",
        transform: `rotate(${degrees}deg)`,
      };
    }
    // For scores above 50%, we have a different approach
    return {
      borderTop: `4px solid ${score >= 80 ? "#DC2626" : score >= 50 ? "#D97706" : "#059669"}`,
      borderRight: `4px solid ${score >= 80 ? "#DC2626" : score >= 50 ? "#D97706" : "#059669"}`,
      borderBottom: `4px solid ${score >= 80 ? "#DC2626" : score >= 50 ? "#D97706" : "#059669"}`,
      borderLeft: "4px solid transparent",
      transform: `rotate(${degrees - 180}deg)`,
    };
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg p-2 text-white shadow-md mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Risk Assessment
            </h2>
            <p className="text-sm text-gray-600">Identify and mitigate potential export risks</p>
          </div>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <HelpCircleIcon className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-white border border-gray-200 shadow-lg p-3 rounded-lg">
              <p className="text-xs text-gray-700">Assessment of risks associated with your current export project</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <Card className="border border-gray-100 rounded-xl shadow-sm overflow-hidden">
        <div className="h-1.5 w-full bg-gradient-to-r from-red-500 via-red-600 to-red-500"></div>
        <CardContent className="p-6">
          <div className="mb-6 bg-gradient-to-r from-red-50 to-pink-50 p-5 rounded-lg border border-red-100">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Overall Risk Score</h3>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 p-0 text-gray-500 hover:text-gray-700 hover:bg-white/80"
                    >
                      <InfoIcon className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-white border border-gray-200 shadow-lg p-3 rounded-lg">
                    <p className="text-xs text-gray-700">Score calculated based on multiple risk factors</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className="mt-4 flex justify-center">
              <div className="relative w-40 h-40 bg-white rounded-full shadow-sm border border-gray-100 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <p className={`text-4xl font-bold ${getOverallRiskColor(overallRiskScore)}`}>
                    {overallRiskScore}
                  </p>
                  <div className={`mt-1 px-3 py-1 rounded-full text-xs font-medium ${getRiskLevelBadgeColor(overallRiskScore >= 80 ? "High" : overallRiskScore >= 50 ? "Medium" : "Low")}`}>
                    {riskLevel}
                  </div>
                </div>
                {/* Circular background */}
                <div className="absolute inset-[5px] border-[6px] border-gray-50 rounded-full"></div>
                {/* Circular progress indicator */}
                <div
                  className="absolute inset-[5px] rounded-full shadow-inner"
                  style={getBorderStyle(overallRiskScore)}
                ></div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center mb-4">
              <div className="h-6 w-6 bg-gradient-to-r from-red-600 to-red-700 rounded-md text-white flex items-center justify-center mr-2 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Risk Breakdown</h3>
            </div>
            <div className="space-y-5">
              {riskFactors.map((risk, index) => (
                <div key={index} className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm font-semibold text-gray-800">{risk.name}</p>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getRiskLevelBadgeColor(risk.level)}`}>
                      {risk.level}
                    </span>
                  </div>
                  <div className="relative pt-1">
                    <div className="overflow-hidden h-2 text-xs flex rounded-full bg-gray-100">
                      <div 
                        className={`${getRiskBarColor(risk.level)} shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center rounded-full transition-all duration-500`}
                        style={{ width: `${risk.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">{risk.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center mb-4">
              <div className="h-6 w-6 bg-gradient-to-r from-amber-500 to-amber-600 rounded-md text-white flex items-center justify-center mr-2 shadow-sm">
                <LightbulbIcon className="h-3.5 w-3.5" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Mitigation Suggestions</h3>
            </div>
            <div className="space-y-3 bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-lg border border-amber-100 mb-5">
              {mitigationSuggestions.map((suggestion, index) => (
                <div key={index} className="flex items-start bg-white p-3 rounded-lg border border-amber-100/70 shadow-sm">
                  <div className="flex-shrink-0 bg-gradient-to-r from-amber-500 to-orange-500 h-6 w-6 rounded-full flex items-center justify-center text-white shadow-sm mr-3">
                    <LightbulbIcon className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{suggestion.title}</p>
                    <p className="text-xs text-gray-600 mt-1">{suggestion.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-md hover:shadow-lg transition-all duration-300">
              Generate Full Risk Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
