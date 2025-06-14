import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

type ExpensesData = {
  date: string;
  expenses: number;
};

type Props = {
  data: ExpensesData[];
};

export function ExpensesAreaChart({ data }: Props) {
  return (
    <div className="p-4 bg-[var(--color-sand)] rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-[var(--color-ink)]">Expenses Over Time</h2>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="expenses" stroke="#FF6B81" fill="#FF6B81" fillOpacity={0.5} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
