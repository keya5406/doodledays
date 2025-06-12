import { useEffect, useState } from "react";
import { fetchSummary } from "../utils/aggregationApi";
import SummaryView from "../components/summaryView";
import DoodleSelect from "@/components/ui/DoodleSelect";

export default function SummaryPage() {
  const [period, setPeriod] = useState<"weekly" | "monthly">("weekly");
  const [summaryData, setSummaryData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const data = await fetchSummary(period, token);
        setSummaryData(data);
      } catch (error) {
        console.error("Error fetching summary:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [period]);

  return (
    <div className="min-h-screen w-full w-screen bg-gradient-to-r from-pink-100 via-white to-white flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-[var(--color-peach)] mb-12 drop-shadow-lg text-center">
        Your DoodleDays Summary
      </h1>

      <div className="w-80 mb-10">
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

      {loading ? (
        <p className="text-lg text-[var(--color-ink)]">Loading...</p>
      ) : summaryData ? (
        <SummaryView data={summaryData} />
      ) : (
        <p className="text-lg text-[var(--color-ink)]">No summary data available.</p>
      )}
    </div>
  );
}
