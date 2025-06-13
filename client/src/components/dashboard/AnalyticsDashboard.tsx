import { useEffect, useState } from 'react';
import { fetchDashboardSummary } from '../../utils/dashboardApi';
import type { AggregationResponse } from '../../../../shared/types/aggregation.types';
import { ProductivityLineChart } from '../charts/ProductivityLineChart';
import { MoodRadarChart } from '../charts/MoodRadarChart';
import { SleepBarChart } from '../charts/SleepBarChart';
import { ExpensesAreaChart } from '../charts/ExpensesAreaChart';

export function AnalyticsDashboard() {
  const [data, setData] = useState<AggregationResponse | null>(null);
  const [period, setPeriod] = useState<'weekly' | 'monthly'>('weekly');
  const token = localStorage.getItem('token') || '';

  useEffect(() => {
    if (!token) return;
    fetchDashboardSummary(period, token)
      .then(setData)
      .catch(err => console.error("Error fetching dashboard data:", err));
  }, [period]);

  if (!data) {
    return <div className="text-center text-xl text-white p-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen w-screen w-full p-6 bg-gradient-to-r from-pink-50 via-white to-white">
      <h1 className="text-3xl font-bold mb-8 text-[var(--color-ink)]">Analytics Dashboard</h1>

      <div className="flex gap-4 mb-8">
        <button onClick={() => setPeriod("weekly")} className={`px-4 py-2 rounded ${period === 'weekly' ? 'bg-blue-600' : 'bg-gray-700'}`}>Weekly</button>
        <button onClick={() => setPeriod("monthly")} className={`px-4 py-2 rounded ${period === 'monthly' ? 'bg-blue-600' : 'bg-gray-700'}`}>Monthly</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProductivityLineChart data={data.productivity} />
        <MoodRadarChart data={data.mood} />
        <SleepBarChart data={data.sleep} />
        <ExpensesAreaChart data={data.expenses} />
      </div>
    </div>
  );
}

