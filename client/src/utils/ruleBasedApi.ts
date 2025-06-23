export const fetchWeeklySummary = async (token: string) => {
  const res = await fetch("http://localhost:5000/api/rulebased-ai/weekly-summary", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch weekly summary");
  return res.json();
};
