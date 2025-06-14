import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip, ResponsiveContainer
} from 'recharts';

type MoodData = {
  aspect: string;
  value: number;
};

type Props = {
  data: MoodData[];
};

export function MoodRadarChart({ data }: Props) {
  return (
    <div className="p-4 bg-[var(--color-sand)] rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-[var(--color-ink)]">Mood Distribution</h2>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="aspect" />
          <PolarRadiusAxis angle={30} domain={[0, 10]} />
          <Tooltip />
          <Radar name="Mood" dataKey="value" stroke="#CDB4DB" fill="#CDB4DB" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
