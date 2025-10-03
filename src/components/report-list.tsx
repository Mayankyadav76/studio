import type { Report } from "@/lib/types";
import { ReportCard } from "./report-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { FileText } from "lucide-react";

interface ReportListProps {
  reports: Report[];
}

export function ReportList({ reports }: ReportListProps) {
  const urgentReports = reports.filter(r => r.needsHumanAttention && r.status === 'Reported');
  const otherReports = reports.filter(r => !r.needsHumanAttention && r.status === 'Reported');
  const closedReports = reports.filter(r => r.status !== 'Reported');

  return (
    <Tabs defaultValue="urgent">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="urgent">Urgent ({urgentReports.length})</TabsTrigger>
        <TabsTrigger value="new">New ({otherReports.length})</TabsTrigger>
        <TabsTrigger value="closed">Closed ({closedReports.length})</TabsTrigger>
      </TabsList>
      <TabsContent value="urgent">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4">
          {urgentReports.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
        {urgentReports.length === 0 && (
            <Alert className="mt-4">
                <FileText className="h-4 w-4" />
                <AlertTitle>All Clear!</AlertTitle>
                <AlertDescription>
                    There are no new urgent reports at this time.
                </AlertDescription>
            </Alert>
        )}
      </TabsContent>
      <TabsContent value="new">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4">
          {otherReports.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
        {otherReports.length === 0 && (
            <Alert className="mt-4">
                <FileText className="h-4 w-4" />
                <AlertTitle>All Caught Up!</AlertTitle>
                <AlertDescription>
                    There are no new non-urgent reports.
                </AlertDescription>
            </Alert>
        )}
      </TabsContent>
      <TabsContent value="closed">
         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4">
          {closedReports.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}
