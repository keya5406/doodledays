import { useEffect, useState } from "react";
import { fetchSummary } from "../utils/aggregationApi";
import SummaryView from "../components/summaryView";
import DoodleSelect from "@/components/ui/DoodleSelect";
import { fetchWeeklySummary } from "../utils/ruleBasedApi";
import { HoverButton } from "@/components/ui/HoverButton";

export default function SummaryPage() {
  const [period, setPeriod] = useState<"weekly" | "monthly">("weekly");
  const [summaryData, setSummaryData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);

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

  const handleFetchAISummary = async () => {
    setAiLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetchWeeklySummary(token);
      setAiSummary(response.summary);
    } catch (error) {
      console.error("Error fetching AI summary:", error);
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full w-screen bg-gradient-to-tr from-pink-100 via-white to-white px-6 py-10 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-[var(--color-peach)] mb-10 drop-shadow-sm text-center">
        Your DoodleDays Summary
      </h1>

      <div className="w-full max-w-sm mb-8">
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
        <p className="text-lg text-[var(--color-ink)] mb-6">Loading your summary...</p>
      ) : summaryData ? (
        <SummaryView data={summaryData} />
      ) : (
        <p className="text-lg text-[var(--color-ink)] mb-6">No summary data available.</p>
      )}

      <div className="mt-10 flex flex-col items-center gap-4">
        <HoverButton
          label="Get Weekly AI Summary"
          hoverLabel="Generate insights ✨"
          submittingLabel="Generating..."
          isSubmitting={aiLoading}
          onClick={handleFetchAISummary}
          size="md"
        />

        {aiSummary && (
          <div className="mt-4 max-w-2xl w-full bg-[var(--color-sand)] p-6 rounded-xl shadow-lg text-[var(--color-ink)] transition-all duration-300">
            <h2 className="text-2xl font-semibold mb-3 text-[var(--color-peach)] text-center">
              Weekly Insight ✨
            </h2>
            <p className="text-lg leading-relaxed text-center">{aiSummary}</p>
          </div>
        )}
      </div>
    </div>
  );
}
