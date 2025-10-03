
'use client';

import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { collection, serverTimestamp } from 'firebase/firestore';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Terminal } from 'lucide-react';
import { useUser, useFirestore, addDocumentNonBlocking } from '@/firebase';
import { prioritizeUrgentReports } from '@/ai/flows/prioritize-urgent-reports';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';

const ReportSchema = z.object({
  conditionReport: z.string().min(10, { message: 'Please provide a detailed description.' }),
  locationDetails: z.string().min(5, { message: 'Please provide specific location details.' }),
  reporterContact: z.string().email({ message: 'Please provide a valid email.' }),
  image: z.any().optional(),
});

type ReportFormValues = z.infer<typeof ReportSchema>;

export function ReportForm() {
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const form = useForm<ReportFormValues>({
    resolver: zodResolver(ReportSchema),
    defaultValues: {
      conditionReport: '',
      locationDetails: '',
      reporterContact: user?.email || '',
      image: undefined,
    },
  });

  const onSubmit = async (values: ReportFormValues) => {
    if (!user || !firestore) {
      setSubmissionError('You must be logged in to submit a report.');
      return;
    }
    setSubmissionError(null);
    form.clearErrors();

    try {
      // 1. Get AI Assessment
      const aiResponse = await prioritizeUrgentReports({
        conditionReport: values.conditionReport,
        locationDetails: values.locationDetails,
        reporterContact: values.reporterContact,
      });

      // 2. Prepare data for Firestore
      const reportData = {
        userId: user.uid,
        userContact: values.reporterContact,
        animalType: 'Unknown', // TODO: Add animal type detection or a dropdown
        conditionReport: values.conditionReport,
        locationDetails: values.locationDetails,
        imageUrl: 'https://picsum.photos/seed/' + Date.now() + '/600/400', // TODO: Implement actual image upload
        imageHint: 'animal', // TODO: Extract from animal type
        timestamp: serverTimestamp(),
        status: 'Reported',
        needsHumanAttention: aiResponse.needsHumanAttention,
        reason: aiResponse.reason,
      };

      // 3. Save to Firestore using the non-blocking helper
      const reportsCollection = collection(firestore, 'animal_condition_reports');
      addDocumentNonBlocking(reportsCollection, reportData);

      // 4. Show success and reset form
      toast({
        title: 'Success!',
        description: `Report submitted! AI assessment: ${aiResponse.reason}`,
      });
      form.reset({
        conditionReport: '',
        locationDetails: '',
        reporterContact: user.email || '',
        image: undefined,
      });
      
    } catch (error: any) {
      console.error('Error submitting report:', error);
      setSubmissionError(error.message || 'An error occurred while submitting the report. The error has been logged.');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="font-headline text-3xl">Report an Animal in Need</CardTitle>
            <CardDescription>Your report can save a life. Please provide as much detail as possible.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="conditionReport"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Condition Report</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the animal's condition, species (if known), and behavior."
                      rows={5}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="locationDetails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location Details</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Near City Park fountain, behind the bench" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                  <FormItem>
                  <FormLabel>Upload Photo</FormLabel>
                    <FormControl>
                        <Input type="file" {...field} />
                    </FormControl>
                    <p className="text-xs text-muted-foreground">A photo greatly helps our rescue teams.</p>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="reporterContact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Contact Email</FormLabel>
                  <FormControl>
                    <Input 
                      key={user?.email || 'guest'}
                      type="email" 
                      placeholder="you@example.com" 
                      {...field}
                      defaultValue={user?.email || ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {submissionError && (
              <Alert variant="destructive">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Submission Error</AlertTitle>
                <AlertDescription>{submissionError}</AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Submitting...' : 'Submit Report'}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
