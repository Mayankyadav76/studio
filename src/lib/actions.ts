
"use server";

import { z } from "zod";

// This file is now mostly empty as the logic has been moved to the client-side component.
// We can keep it for future server actions if needed.

export type State = {
  errors?: {
    conditionReport?: string[];
    locationDetails?: string[];
    reporterContact?: string[];
    userId?: string[];
  };
  message?: string | null;
  success?: boolean;
};
