import mongoose from "mongoose";
import DailyDataModel from "../models/DailyData";
import { AggregationResponse } from "../../../shared/types/aggregation.types";

export async function getDashboardAggregation(userId: string, startDate: Date, endDate: Date): Promise<AggregationResponse> {
    const userObjectId = new mongoose.Types.ObjectId(userId);

    const dailyData = await DailyDataModel.find({
        user: userObjectId,
        date: { $gte: startDate, $lte: endDate }
    });

    const productivity = dailyData.map(entry => ({
        date: entry.date.toISOString().split('T')[0],
        productivity: entry.productivity ?? 0
    }));

    const sleep = dailyData.map(entry => ({
        date: entry.date.toISOString().split('T')[0],
        sleepHours: entry.sleepHours ?? 0
    }));

    const expenses = dailyData.map(entry => ({
        date: entry.date.toISOString().split('T')[0],
        expenses: (entry.expenses ?? []).reduce((sum, expense) => sum + expense.amount, 0)
    }));

   
    const moodAggregation = await DailyDataModel.aggregate([
        {
            $match: {
                user: userObjectId,
                date: { $gte: startDate, $lte: endDate }
            }
        },
        { $unwind: "$mood" },
        { 
            $group: {
                _id: "$mood",
                count: { $sum: 1 }
            }
        },
        { 
            $project: {
                aspect: "$_id",
                value: "$count",
                _id: 0
            }
        }
    ]);

    const mood: AggregationResponse["mood"] = moodAggregation;

    return {
        productivity,
        sleep,
        expenses,
        mood
    };
}
