"use client"

import type { HospitalTreatment } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "./ui/badge";
import { format } from "date-fns";

interface TreatmentListProps {
  treatments: HospitalTreatment[];
}

const statusVariantMap: { [key in HospitalTreatment['status']]: "default" | "secondary" | "destructive" | "outline" } = {
    Admitted: "secondary",
    "Under Treatment": "default",
    Recovered: "outline",
    Released: "outline",
};

export function TreatmentList({ treatments }: TreatmentListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-3xl">Current Patients</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Case ID</TableHead>
              <TableHead>Animal</TableHead>
              <TableHead>Condition</TableHead>
              <TableHead>Admitted</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {treatments.map((treatment) => (
              <TableRow key={treatment.id}>
                <TableCell className="font-medium">{treatment.reportId}</TableCell>
                <TableCell>{treatment.animalType}</TableCell>
                <TableCell>{treatment.condition}</TableCell>
                <TableCell>{format(new Date(treatment.admissionDate), 'MMM d, yyyy')}</TableCell>
                <TableCell>
                  <Select defaultValue={treatment.status}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Update Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Admitted">Admitted</SelectItem>
                      <SelectItem value="Under Treatment">Under Treatment</SelectItem>
                      <SelectItem value="Recovered">Recovered</SelectItem>
                      <SelectItem value="Released">Released</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
