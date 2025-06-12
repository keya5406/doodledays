import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SummaryData {
  totalExpenses: number;
  avgProductivity: number;
  avgSleep: number;
  minSleep: number;
  maxSleep: number;
  minProductivity: number;
  maxProductivity: number;
}

export default function SummaryView({ data }: { data: SummaryData }) {
  return (
    <Card className="bg-[var(--color-sand)] text-[var(--color-ink)] shadow-2xl rounded-3xl p-6 border-0 w-[90%] max-w-xl transition-transform hover:scale-105 duration-300">
      <CardHeader className="pb-4">
        <CardTitle className="text-3xl text-[var(--color-peach)] font-semibold drop-shadow-md text-center">
          Summary Report
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-lg">
        <div className="flex justify-between">
          <span>Total Expenses:</span>
          <span>₹{data.totalExpenses}</span>
        </div>
        <div className="flex justify-between">
          <span>Avg Productivity:</span>
          <span>{data.avgProductivity}</span>
        </div>
        <div className="flex justify-between">
          <span>Avg Sleep:</span>
          <span>{data.avgSleep} hrs</span>
        </div>
        <div className="flex justify-between">
          <span>Sleep Range:</span>
          <span>{data.minSleep} - {data.maxSleep} hrs</span>
        </div>
        <div className="flex justify-between">
          <span>Productivity Range:</span>
          <span>{data.minProductivity} - {data.maxProductivity}</span>
        </div>
      </CardContent>
    </Card>
  );
}
