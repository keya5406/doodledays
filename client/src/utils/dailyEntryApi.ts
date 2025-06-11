
import type { DailyEntry } from "../../../shared/schemas/daily.schema";

export async function submitDailyEntry(data: DailyEntry): Promise<void> {
  const token = localStorage.getItem("token");

  if (!token) throw new Error("No token found. Please log in again.");

  const response = await fetch("http://localhost:5000/api/daily", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, 
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to submit daily entry");
  }
}

