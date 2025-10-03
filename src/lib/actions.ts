
"use server";

import { z } from "zod";
import { prioritizeUrgentReports } from "@/ai/flows/prioritize-urgent-reports";
import { revalidatePath } from "next/cache";
import { getFirestore, addDoc, collection, serverTimestamp } from "firebase/firestore";
import { initializeFirebase } from "@/firebase";

const ReportSchema = z.object({
  conditionReport: z.string().min(10, { message: "Please provide a detailed description." }),
  locationDetails: z.string().min(5, { message: "Please provide specific location details." }),
  reporterContact: z.string().email({ message: "Please provide a valid email." }),
  userId: z.string().min(1, { message: "User ID is required." }),
});

export type State = {
  errors?: {
    conditionReport?: string[];
    locationDetails?: string[];
    reporterContact?: string[];
    userId?: string[];
  };
  message?: string | null;
};

export async function submitReport(prevState: State, formData: FormData) {
  const validatedFields = ReportSchema.safeParse({
    conditionReport: formData.get("conditionReport"),
    locationDetails: formData.get("locationDetails"),
    reporterContact: formData.get("reporterContact"),
    userId: formData.get("userId"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Submit Report.",
    };
  }

  const { conditionReport, locationDetails, reporterContact, userId } = validatedFields.data;

  try {
    const aiResponse = await prioritizeUrgentReports({
      conditionReport,
      locationDetails,
      reporterContact,
    });
    
    // In a real application, you would save the report and the AI response to your database here.
    const { firestore } = initializeFirebase();
    const reportData = {
        userId,
        userContact: reporterContact,
        animalType: "Unknown", // Placeholder, could be extracted by another AI call
        conditionReport,
        locationDetails,
        imageUrl: "https://picsum.photos/seed/1/600/400", // Placeholder for uploaded image
        imageHint: "animal",
        timestamp: serverTimestamp(),
        status: 'Reported',
        needsHumanAttention: aiResponse.needsHumanAttention,
        reason: aiResponse.reason,
    };

    await addDoc(collection(firestore, 'animal_condition_reports'), reportData);
    
    revalidatePath("/ngo-dashboard");

    return { message: `Report submitted successfully! Priority assessment: ${aiResponse.reason}` };
  } catch (error) {
    console.error("Error during report submission:", error);
    return { message: "An error occurred while submitting the report. Please try again." };
  }
}
