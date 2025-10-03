import { DashboardLayout } from "@/components/dashboard-layout";
import { ReportList } from "@/components/report-list";
import { mockReports } from "@/lib/data";

export default function NGODashboardPage() {
  const reports = mockReports; // In a real app, this would be a database call.
  
  return (
    <DashboardLayout>
      <ReportList reports={reports} />
    </DashboardLayout>
  );
}
