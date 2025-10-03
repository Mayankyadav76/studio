'use client';
import { TreatmentList } from "@/components/treatment-list";
import { mockTreatments } from "@/lib/data";

export default function HospitalDashboardPage() {
    const treatments = mockTreatments; // In a real app, fetch from a database.

    return (
        <TreatmentList treatments={treatments} />
    );
}
