import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  HelpCircleIcon,
  FileDownIcon,
  FileIcon,
} from "lucide-react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export interface Document {
  id: number;
  name: string;
  type: string;
  description: string;
  status: "completed" | "in_progress" | "not_started";
  dueDate: string;
}

interface ComplianceDocumentationProps {
  projectName: string;
  progress: number;
  completedCount: number;
  totalCount: number;
  documents: Document[];
  onGenerateDocument: (documentId: number) => void;
  onViewDocument: (documentId: number) => void;
  onDownloadDocument: (documentId: number) => void;
}

export function ComplianceDocumentation({
  projectName,
  progress,
  completedCount,
  totalCount,
  documents,
  onGenerateDocument,
  onViewDocument,
  onDownloadDocument,
}: ComplianceDocumentationProps) {
  const getStatusBadgeClass = (status: Document["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-50 text-green-600";
      case "in_progress":
        return "bg-amber-50 text-amber-600";
      case "not_started":
        return "bg-neutral-100 text-neutral-600";
    }
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold font-poppins text-neutral-900">
          Compliance & Documentation
        </h2>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-neutral-500 hover:text-neutral-700"
              >
                <HelpCircleIcon className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">Required documents for your export project</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <Card className="border border-neutral-100">
        <CardContent className="p-5">
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <p className="font-medium text-neutral-800">
                Required Documents: <span className="text-primary-600">{projectName}</span>
              </p>
              <Button variant="ghost" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                <FileDownIcon className="h-4 w-4 mr-1" />
                Export All
              </Button>
            </div>
            <div className="flex items-center mt-2">
              <Progress value={progress} className="h-2 flex-grow" />
              <span className="ml-3 text-sm font-medium text-neutral-700">
                {completedCount}/{totalCount} Complete
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-neutral-50">
                <TableRow>
                  <TableHead className="text-xs font-medium text-neutral-500 uppercase">Document</TableHead>
                  <TableHead className="text-xs font-medium text-neutral-500 uppercase">Status</TableHead>
                  <TableHead className="text-xs font-medium text-neutral-500 uppercase">Required By</TableHead>
                  <TableHead className="text-xs font-medium text-neutral-500 uppercase">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell className="py-3">
                      <div className="flex items-center">
                        <FileIcon className="text-neutral-400 h-4 w-4 mr-2" />
                        <div>
                          <div className="text-sm font-medium text-neutral-800">{doc.name}</div>
                          <div className="text-xs text-neutral-500">{doc.description}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={cn(
                        "px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full",
                        getStatusBadgeClass(doc.status)
                      )}>
                        {doc.status === "completed" && "Completed"}
                        {doc.status === "in_progress" && "In Progress"}
                        {doc.status === "not_started" && "Not Started"}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-neutral-600">
                      {doc.dueDate}
                    </TableCell>
                    <TableCell className="text-sm font-medium">
                      {doc.status === "completed" && (
                        <>
                          <Button
                            variant="link"
                            className="text-primary-600 hover:text-primary-700 mr-3 p-0 h-auto"
                            onClick={() => onViewDocument(doc.id)}
                          >
                            View
                          </Button>
                          <Button
                            variant="link"
                            className="text-neutral-600 hover:text-neutral-700 p-0 h-auto"
                            onClick={() => onDownloadDocument(doc.id)}
                          >
                            Download
                          </Button>
                        </>
                      )}
                      {doc.status === "in_progress" && (
                        <>
                          <Button
                            variant="link"
                            className="text-primary-600 hover:text-primary-700 mr-3 p-0 h-auto"
                            onClick={() => onViewDocument(doc.id)}
                          >
                            Continue
                          </Button>
                          <Button
                            variant="link"
                            className="text-neutral-400 p-0 h-auto"
                            disabled
                          >
                            Download
                          </Button>
                        </>
                      )}
                      {doc.status === "not_started" && (
                        <>
                          <Button
                            variant="link"
                            className="text-primary-600 hover:text-primary-700 mr-3 p-0 h-auto"
                            onClick={() => onGenerateDocument(doc.id)}
                          >
                            Generate
                          </Button>
                          <Button
                            variant="link"
                            className="text-neutral-400 p-0 h-auto"
                            disabled
                          >
                            Download
                          </Button>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 pt-4 border-t border-neutral-100">
            <Button>
              Generate Missing Documents
            </Button>
            <Button variant="outline" className="ml-3">
              Upload Existing Document
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
