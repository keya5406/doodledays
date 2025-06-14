import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Resolver } from "react-hook-form";
import { z } from "zod";
import { submitDailyEntry } from "@/utils/dailyEntryApi";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { HoverButton } from "@/components/ui/HoverButton";

// Mood options
const moodOptions = [
  "Happy",
  "Sad",
  "Anxious",
  "Energetic",
  "Stressed",
  "Relaxed",
];

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

const resolver: Resolver<DailyEntry> = zodResolver(DailyEntrySchema) as Resolver<DailyEntry>;

export default function DailyDataForm() {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DailyEntry>({
    resolver,
    defaultValues: {
      date: new Date(),
      mood: [],
      productivity: 5,
      sleepHours: 0,
      expenses: [{ amount: 0, description: "" }],
      tasks: [{ title: "", completed: false }],
    },
  });

  const {
    fields: expenseFields,
    append: appendExpense,
    remove: removeExpense,
  } = useFieldArray({ control, name: "expenses" });

  const {
    fields: taskFields,
    append: appendTask,
    remove: removeTask,
  } = useFieldArray({ control, name: "tasks" });

  const onSubmit = async (data: DailyEntry) => {
    try {
      await submitDailyEntry(data);
      alert("Daily entry submitted successfully!");
      reset();
    } catch (error: any) {
      alert(error.message || "Submission failed.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-screen bg-gradient-to-r from-pink-100 via-white to-white px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-2xl w-full p-6 bg-[var(--color-sand)] rounded-2xl shadow-md"
      >
        <h1 className="text-3xl font-bold text-[var(--color-peach)] mb-6 text-center">
          Today’s Doodle
        </h1>

        {/* Date */}
        <div className="mb-4">
          <Label htmlFor="date" className="font-semibold text-[var(--color-ink)]">
            Date
          </Label>
          <Input
            id="date"
            type="date"
            {...register("date", { valueAsDate: true })}
            className="mt-1 bg-white rounded-lg border border-[var(--color-cloud)]"
          />
          {errors.date && <p className="text-[var(--color-rose)] text-sm">{errors.date.message}</p>}
        </div>

        {/* Mood (Checkbox group) */}
        <div className="mb-4">
          <Label className="font-semibold text-[var(--color-ink)] mb-2">Mood</Label>
          <div className="grid grid-cols-2 gap-2">
            {moodOptions.map((mood) => (
              <label key={mood} className="flex items-center gap-2 text-[var(--color-ink)]">
                <input type="checkbox" value={mood} {...register("mood")} className="cursor-pointer" />
                {mood}
              </label>
            ))}
          </div>
          {errors.mood && <p className="text-[var(--color-rose)] text-sm">{errors.mood.message}</p>}
        </div>

        {/* Productivity */}
        <div className="mb-4">
          <Label className="font-semibold text-[var(--color-ink)]">Productivity</Label>
          <Controller
            control={control}
            name="productivity"
            render={({ field }) => (
              <>
                <Slider
                  value={[Number(field.value)]}
                  max={10}
                  step={1}
                  onValueChange={(value) => field.onChange(Number(value[0]))}
                  className="mt-3 rounded-full accent-[var(--color-peach)]"
                />
                {errors.productivity && (
                  <p className="text-[var(--color-rose)] text-sm">
                    {errors.productivity.message}
                  </p>
                )}
              </>
            )}
          />
        </div>

        {/* Sleep Hours */}
        <div className="mb-4">
          <Label htmlFor="sleepHours" className="font-semibold text-[var(--color-ink)]">
            Sleep Hours
          </Label>
          <Input
            id="sleepHours"
            type="number"
            min={0}
            step={0.5}
            {...register("sleepHours", { valueAsNumber: true })}
            placeholder="e.g., 6.5"
            className="mt-1 bg-white rounded-lg border border-[var(--color-cloud)] no-spinner"
          />
          {errors.sleepHours && <p className="text-[var(--color-rose)] text-sm">{errors.sleepHours.message}</p>}
        </div>

        {/* Expenses */}
        <div className="mb-6">
          <Label className="font-semibold text-[var(--color-ink)] mb-2 block">Expenses</Label>
          {expenseFields.map((field, index) => (
            <div key={field.id} className="flex gap-2 items-center mb-2">
              <Input
                type="number"
                step="0.01"
                placeholder="Amount"
                {...register(`expenses.${index}.amount`, { valueAsNumber: true })}
                className="flex-1 bg-white rounded-lg border border-[var(--color-cloud)]"
              />
              <Input
                placeholder="Description"
                {...register(`expenses.${index}.description`)}
                className="flex-3 bg-white rounded-lg border border-[var(--color-cloud)] no-spinner"
              />
              <HoverButton
                label="Remove"
                hoverLabel="Remove Expense"
                onClick={() => removeExpense(index)}
                type="button"
                size="sm"
                className="text-[var(--color-rose)] font-bold px-2"
              />
            </div>
          ))}
          <HoverButton
            label="+ Add Expense"
            hoverLabel="Add New Expense"
            onClick={() => appendExpense({ amount: 0, description: "" })}
            type="button"
            size="sm"
            className="text-[var(--color-sky)] font-semibold"
          />
        </div>

        {/* Tasks */}
        <div className="mb-6">
          <Label className="font-semibold text-[var(--color-ink)] mb-2 block">Tasks</Label>
          {taskFields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-2 mb-2">
              <Input
                placeholder="Task Title"
                {...register(`tasks.${index}.title`)}
                className="flex-1 bg-white rounded-lg border border-[var(--color-cloud)]"
              />
              <label className="flex items-center gap-1 text-[var(--color-ink)]">
                <input type="checkbox" {...register(`tasks.${index}.completed`)} className="cursor-pointer" />
                Completed
              </label>
              <HoverButton
                label="Remove"
                hoverLabel="Remove Task"
                onClick={() => removeTask(index)}
                type="button"
                size="sm"
                className="text-[var(--color-rose)] font-bold px-2"
              />
            </div>
          ))}
          <HoverButton
            label="+ Add Task"
            hoverLabel="Add New Task"
            onClick={() => appendTask({ title: "", completed: false })}
            type="button"
            size="sm"
            className="text-[var(--color-sky)] font-semibold"
          />
        </div>

        {/* Submit */}
        <HoverButton label="Submit Entry" hoverLabel="Ready to Submit" isSubmitting={isSubmitting} type="submit" size="lg" />
      </form>
    </div>
  );
}
