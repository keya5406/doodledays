import { z } from "zod";

export const DailyEntrySchema = z.object({
 date: z.preprocess((arg) => {
    if (typeof arg === "string" || arg instanceof Date) {
      return new Date(arg);
    }
  }, z.date()),
  mood: z.array(z.string()),
  productivity: z.number(),
  sleepHours: z.number(),
  expenses: z.array(
    z.object({
      amount: z.number(),
      description: z.string(),
    })
  ),
  tasks: z.array(
    z.object({
      title: z.string(),
      completed: z.boolean(),
    })
  ),
});
export type DailyEntry = z.infer<typeof DailyEntrySchema>;