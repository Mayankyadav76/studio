
"use client";

import { useFormStatus } from "react-dom";
import { submitReport, type State } from "@/lib/actions";
import { useEffect, useRef } from "react";
import { useActionState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Terminal } from "lucide-react";
import { useUser } from "@/firebase";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Submitting..." : "Submit Report"}
    </Button>
  );
}

export function ReportForm() {
  const { user } = useUser();
  const formRef = useRef<HTMLFormElement>(null);
  const initialState: State = { message: null, errors: {} };
  const [state, dispatch] = useActionState(submitReport, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast({
          title: "Success!",
          description: state.message,
        });
        formRef.current?.reset();
      } else {
         toast({
          variant: "destructive",
          title: "Error submitting report",
          description: state.message,
        });
      }
    }
  }, [state, toast]);

  return (
    <form ref={formRef} action={dispatch}>
       <input type="hidden" name="userId" value={user?.uid || ''} />
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Report an Animal in Need</CardTitle>
          <CardDescription>
            Your report can save a life. Please provide as much detail as possible.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="conditionReport">Condition Report</Label>
            <Textarea
              id="conditionReport"
              name="conditionReport"
              placeholder="Describe the animal's condition, species (if known), and behavior."
              rows={5}
              required
            />
            {state.errors?.conditionReport && <p className="text-sm font-medium text-destructive">{state.errors.conditionReport}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="locationDetails">Location Details</Label>
            <Input
              id="locationDetails"
              name="locationDetails"
              placeholder="e.g., Near City Park fountain, behind the bench"
              required
            />
             {state.errors?.locationDetails && <p className="text-sm font-medium text-destructive">{state.errors.locationDetails}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">Upload Photo</Label>
            <Input id="image" name="image" type="file" />
            <p className="text-xs text-muted-foreground">A photo greatly helps our rescue teams.</p>
          </div>
           <div className="space-y-2">
            <Label htmlFor="reporterContact">Your Contact Email</Label>
            <Input
              id="reporterContact"
              name="reporterContact"
              type="email"
              placeholder="you@example.com"
              defaultValue={user?.email || ""}
              required
            />
             {state.errors?.reporterContact && <p className="text-sm font-medium text-destructive">{state.errors.reporterContact}</p>}
          </div>

          {state.message && !state.success && (
             <Alert variant="destructive">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Submission Error</AlertTitle>
                <AlertDescription>
                    {state.message}
                </AlertDescription>
            </Alert>
          )}

        </CardContent>
        <CardFooter>
          <SubmitButton />
        </CardFooter>
      </Card>
    </form>
  );
}
