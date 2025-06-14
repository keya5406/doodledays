import { useState, useEffect } from "react";
import { ProductivityLineChart } from "@/components/charts/ProductivityLineChart";
import { MoodRadarChart } from "@/components/charts/MoodRadarChart";
import { SleepBarChart } from "@/components/charts/SleepBarChart";
import { ExpensesAreaChart } from "@/components/charts/ExpensesAreaChart";
import { fetchDashboardSummary } from "@/utils/dashboardApi";
import DoodleSelect from "@/components/ui/DoodleSelect";

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [period, setPeriod] = useState<'weekly' | 'monthly'>('weekly');

  const loadDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const data = await fetchDashboardSummary(period, token);
      setDashboardData(data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, [period]);


  if (!dashboardData) {
    return <div>Loading dashboard...</div>;
  }

  const productivityData = dashboardData.productivity;
  const moodData = dashboardData.mood;
  const sleepData = dashboardData.sleep;
  const expensesData = dashboardData.expenses;

  return (
    <div className="min-h-screen w-full w-screen p-6 bg-gradient-to-r from-pink-50 via-white to-white">

      {/* Title */}
      <h1 className="text-3xl font-bold text-center text-[var(--color-peach)] mb-4">
        Analytics Dashboard
      </h1>

      {/* Filters under title */}
      <div className="flex items-center justify-center mb-8">
        <div className="w-52">
          <DoodleSelect
            options={[
              { label: "Weekly", value: "weekly" },
              { label: "Monthly", value: "monthly" }
            ]}
            value={period}
            onChange={(val) => setPeriod(val as "weekly" | "monthly")}
            placeholder="Select Period"
          />
        </div>


      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="rounded-2xl p-4 bg-[var(--color-sand)] shadow-lg">
          <ProductivityLineChart data={productivityData} />
        </div>

        <div className="rounded-2xl p-4 bg-[var(--color-sand)] shadow-lg">
          <MoodRadarChart data={moodData} />
        </div>

        <div className="rounded-2xl p-4 bg-[var(--color-sand)] shadow-lg">
          <SleepBarChart data={sleepData} />
        </div>

        <div className="rounded-2xl p-4 bg-[var(--color-sand)] shadow-lg">
          <ExpensesAreaChart data={expensesData} />
        </div>
      </div>
    </div>
  );
}