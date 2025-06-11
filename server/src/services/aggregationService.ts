import mongoose from "mongoose";
import DailyDataModel from "../models/DailyData";

export async function getAggregatedData(userId: string, startDate: Date, endDate: Date) {
    const userObjectId = new mongoose.Types.ObjectId(userId);

    const aggregation = await DailyDataModel.aggregate([
        {
            $match: {
                user: userObjectId,
                date: { $gte: startDate, $lte: endDate }
            }
        },
        {
            $unwind: {
                path: "$expenses",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $group: {
                _id: null,
                totalExpenses: { $sum: "$expenses.amount" },
                avgProductivity: { $avg: "$productivity" },
                avgSleep: { $avg: "$sleepHours" },
                minSleep: { $min: "$sleepHours" },
                maxSleep: { $max: "$sleepHours" },
                minProductivity: { $min: "$productivity" },
                maxProductivity: { $max: "$productivity" }
            }
        }
    ]);

    if (!aggregation.length) {
        return {
            totalExpenses: 0,
            avgProductivity: 0,
            avgSleep: 0,
            minSleep: 0,
            maxSleep: 0,
            minProductivity: 0,
            maxProductivity: 0
        };
    }

    return aggregation[0];
}
