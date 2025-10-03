

'use client';
import { DashboardLayout } from "@/components/dashboard-layout";
import { ReportList } from "@/components/report-list";
import { useCollection, useFirestore } from "@/firebase";
import { collection, query, orderBy } from "firebase/firestore";
import type { Report } from "@/lib/types";
import { useMemoFirebase } from "@/firebase/provider";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FileText } from "lucide-react";

export default function NGODashboardPage() {
  const firestore = useFirestore();

  const reportsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, "animal_condition_reports"), orderBy("timestamp", "desc"));
  }, [firestore]);
  
  const { data: reports, isLoading, error } = useCollection<Report>(reportsQuery);

  const formattedReports = reports?.map(report => ({
    ...report,
    // Convert Firestore Timestamp to ISO string if it's not already
    timestamp: report.timestamp ? new Date((report.timestamp as any).seconds * 1000).toISOString() : new Date().toISOString(),
  })) || [];

  return (
    <DashboardLayout>
      {isLoading && (
         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4">
            {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-96 w-full" />)}
         </div>
      )}
      {error && (
        <Alert variant="destructive">
            <FileText className="h-4 w-4" />
            <AlertTitle>Error loading reports</AlertTitle>
            <AlertDescription>
                Could not load reports. Please try again later.
            </AlertDescription>
        </Alert>
      )}
      {!isLoading && !error && (
        <ReportList reports={formattedReports} />
      )}
    </DashboardLayout>
  );
}
