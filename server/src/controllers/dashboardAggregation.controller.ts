import { Request, Response } from "express";
import { getDashboardAggregation } from "../services/dashboardAggregationService";
import { getDateRange } from "../utils/dateUtils";
import { AggregationResponse } from "../../../shared/types/aggregation.types";

export const getDashboardData = async (req: Request & { user?: { _id: string } }, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const userId = req.user._id;  
    const period = (req.query.period as "weekly" | "monthly") || "weekly";  
    const { startDate, endDate } = getDateRange(period);

    const data: AggregationResponse = await getDashboardAggregation(userId, startDate, endDate);

    res.json({ success: true, data });
  } catch (error) {
    console.error("Dashboard aggregation error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
