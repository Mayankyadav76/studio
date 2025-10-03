'use client';

import { DashboardLayout } from "@/components/dashboard-layout";
import { ReportForm } from "@/components/report-form";
import { useUser } from "@/firebase";

export default function UserDashboardPage() {
  const { user, loading } = useUser();

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <div>Please log in to view this page.</div>
  }

  return (
    <DashboardLayout>
      <ReportForm />
    </DashboardLayout>
  );
}