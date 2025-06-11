import { Request, Response, NextFunction } from "express";
import DailyDataModel from "../models/DailyData.js";

export const saveDailyEntry = async (
  req: Request & { user?: { _id: string } },
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const userId = req.user._id;

    const { date, mood, productivity, sleepHours, expenses, tasks } = req.body;

    const dayStart = new Date(date);
    dayStart.setHours(0, 0, 0, 0);

    const dayEnd = new Date(date);
    dayEnd.setHours(23, 59, 59, 999);

    const existingEntry = await DailyDataModel.findOne({
      user: userId,
      date: { $gte: dayStart, $lte: dayEnd },
    });

    if (existingEntry) {
      existingEntry.mood = mood;
      existingEntry.productivity = productivity;
      existingEntry.sleepHours = sleepHours;
      existingEntry.expenses = expenses;
      existingEntry.tasks = tasks;

      await existingEntry.save();
      res.status(200).json({ message: "Daily entry updated", entry: existingEntry });
      return;
    }

    const newEntry = new DailyDataModel({
      user: userId,   
      date,
      mood,
      productivity,
      sleepHours,
      expenses,
      tasks,
    });

    await newEntry.save();

    res.status(201).json({ message: "Daily entry saved", entry: newEntry });
    return;
  } catch (error) {
    console.error("Error saving daily entry:", error);
    next(error);
  }
};
