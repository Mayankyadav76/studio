import type { Report } from "@/lib/types";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";
import { Clock, MapPin, Mail, AlertTriangle } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';


interface ReportCardProps {
  report: Report;
}

export function ReportCard({ report }: ReportCardProps) {
    // Ensure reportDate is a valid date string before creating a Date object.
    const timeAgo = report.reportDate ? formatDistanceToNow(new Date(report.reportDate), { addSuffix: true }) : 'Just now';

  return (
    <Card className="flex flex-col hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-2">
        <div className="relative aspect-video mb-4">
            <Image
                src={report.imageUrl}
                alt={`Report of a ${report.animalType}`}
                data-ai-hint={report.imageHint}
                fill
                className="rounded-lg object-cover"
            />
            {report.needsHumanAttention && report.status === 'Reported' && (
                <Badge variant="destructive" className="absolute top-2 right-2 flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    URGENT
                </Badge>
            )}
        </div>
        <CardTitle className="font-headline text-xl">{report.animalType}</CardTitle>
        <CardDescription className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="h-3 w-3"/> {timeAgo}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <p className="text-sm text-foreground line-clamp-3">{report.conditionReport}</p>
        <div className="text-sm text-muted-foreground space-y-2">
             <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>{report.locationDetails}</span>
            </div>
             <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" />
                <span>{report.userContact}</span>
            </div>
        </div>
        {report.needsHumanAttention && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-sm text-destructive-foreground">
                <p className="font-bold mb-1 flex items-center gap-2"><AlertTriangle className="h-4 w-4" /> AI Assessment: Urgent</p>
                <p className="text-xs">{report.reason}</p>
            </div>
        )}
      </CardContent>
      <CardFooter>
        <Button className="w-full font-bold">Coordinate Rescue</Button>
      </CardFooter>
    </Card>
  );
}
