import { Request, Response } from "express";
import { getAggregatedData } from "../services/aggregationService";
import { getDateRange } from "../utils/dateUtils";

export const getSummary = async (req: Request & { user?: { _id: string } }, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const userId = req.user._id;  
    const period = req.query.period as "weekly" | "monthly" || "weekly";  // default weekly
    const { startDate, endDate } = getDateRange(period);

    const data = await getAggregatedData(userId, startDate, endDate);

    res.json({ success: true, data });
  } catch (error) {
    console.error("Aggregation error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};