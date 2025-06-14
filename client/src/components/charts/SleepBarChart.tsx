import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

type SleepData = {
  date: string;
  sleepHours: number;
};

type Props = {
  data: SleepData[];
};

export function SleepBarChart({ data }: Props) {
  return (
    <div className="p-4 bg-[var(--color-sand)] rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-[var(--color-ink)]">Sleep Hours</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="sleepHours" fill="#c4f39b" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
