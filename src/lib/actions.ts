"use server";

import { z } from "zod";
import { prioritizeUrgentReports } from "@/ai/flows/prioritize-urgent-reports";
import { revalidatePath } from "next/cache";

const ReportSchema = z.object({
  conditionReport: z.string().min(10, { message: "Please provide a detailed description." }),
  locationDetails: z.string().min(5, { message: "Please provide specific location details." }),
  reporterContact: z.string().email({ message: "Please provide a valid email." }),
});

export type State = {
  errors?: {
    conditionReport?: string[];
    locationDetails?: string[];
    reporterContact?: string[];
  };
  message?: string | null;
};

export async function submitReport(prevState: State, formData: FormData) {
  const validatedFields = ReportSchema.safeParse({
    conditionReport: formData.get("conditionReport"),
    locationDetails: formData.get("locationDetails"),
    reporterContact: formData.get("reporterContact"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Submit Report.",
    };
  }

  const { conditionReport, locationDetails, reporterContact } = validatedFields.data;

  try {
    console.log("Submitting report to AI for prioritization...");
    const aiResponse = await prioritizeUrgentReports({
      conditionReport,
      locationDetails,
      reporterContact,
    });
    console.log("AI Prioritization complete:", aiResponse);

    // In a real application, you would save the report and the AI response to your database here.
    // For now, we'll just log it to the console.
    
    revalidatePath("/ngo-dashboard");

    return { message: `Report submitted successfully! Priority assessment: ${aiResponse.reason}` };
  } catch (error) {
    console.error("Error during report submission:", error);
    return { message: "An error occurred while submitting the report. Please try again." };
  }
}
