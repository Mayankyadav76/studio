'use server';

/**
 * @fileOverview A flow that prioritizes animal condition reports based on urgency.
 *
 * - prioritizeUrgentReports - A function that determines if a report needs human attention.
 * - PrioritizeUrgentReportsInput - The input type for the prioritizeUrgentReports function.
 * - PrioritizeUrgentReportsOutput - The return type for the prioritizeUrgentReports function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PrioritizeUrgentReportsInputSchema = z.object({
  conditionReport: z.string().describe('The animal condition report.'),
  locationDetails: z.string().describe('The location details of the animal.'),
  reporterContact: z.string().describe('The contact details of the person reporting.'),
});
export type PrioritizeUrgentReportsInput = z.infer<typeof PrioritizeUrgentReportsInputSchema>;

const PrioritizeUrgentReportsOutputSchema = z.object({
  needsHumanAttention: z.boolean().describe('Whether the report needs immediate human attention.'),
  reason: z.string().describe('The reason for the urgency assessment.'),
});
export type PrioritizeUrgentReportsOutput = z.infer<typeof PrioritizeUrgentReportsOutputSchema>;

export async function prioritizeUrgentReports(input: PrioritizeUrgentReportsInput): Promise<PrioritizeUrgentReportsOutput> {
  return prioritizeUrgentReportsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'prioritizeUrgentReportsPrompt',
  input: {schema: PrioritizeUrgentReportsInputSchema},
  output: {schema: PrioritizeUrgentReportsOutputSchema},
  prompt: `You are an AI assistant helping an animal rescue NGO prioritize incoming reports.

  Based on the animal condition report, location details, and reporter contact information, determine if the report needs immediate human attention.

  Condition Report: {{{conditionReport}}}
  Location Details: {{{locationDetails}}}
  Reporter Contact: {{{reporterContact}}}

  Consider factors such as the severity of the condition, the accessibility of the location, and the availability of contact information.

  Output a JSON object with 'needsHumanAttention' set to true if the report requires immediate action, and false otherwise. Provide a brief 'reason' for your assessment.
  `,
});

const prioritizeUrgentReportsFlow = ai.defineFlow(
  {
    name: 'prioritizeUrgentReportsFlow',
    inputSchema: PrioritizeUrgentReportsInputSchema,
    outputSchema: PrioritizeUrgentReportsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
