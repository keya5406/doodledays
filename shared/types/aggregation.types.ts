export type AggregationResponse = {
  productivity: { date: string; productivity: number }[];
  mood: { aspect: string; value: number }[];
  sleep: { date: string; sleepHours: number }[];
  expenses: { date: string; expenses: number }[];
};
