import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

type ProductivityData = {
  date: string;
  productivity: number;
};

type Props = {
  data: ProductivityData[];
};

export function ProductivityLineChart({ data }: Props) {
  return (
    <div className="p-4 bg-[var(--color-sand)] rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-[var(--color-ink)]">Productivity Over Time</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="productivity" stroke="#8cbcea" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
