import { Request, Response } from "express";
import { spawn } from "child_process";
import DailyDataModel from "../models/DailyData";
import mongoose from "mongoose";

export const getWeeklySummary = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required." });
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);

    const entries = await DailyDataModel.find({ user: userObjectId })
      .sort({ date: -1 })
      .limit(7)
      .lean();

    if (!entries || entries.length === 0) {
      return res.status(404).json({ message: "No data available for this user." });
    }

    // Format data for Python
    const formattedData = entries.map((entry) => ({
      date: entry.date.toISOString().split("T")[0],
      mood: Array.isArray(entry.mood)
        ? Math.round(entry.mood.length ? entry.mood.reduce((acc, cur) => acc + Number(cur), 0) / entry.mood.length : 5)
        : 5,
      productivity: entry.productivity,
      sleep_hours: entry.sleepHours,
      expenses: entry.expenses.map((e) => ({ label: e.description, amount: e.amount })),
      tasks_completed: entry.tasks.filter((t) => t.completed).length
    }));

    const python = spawn("python", ["src/rulebasedAi/reports/generate_weekly.py"]);

    let result = "";
    let error = "";

    python.stdout.on("data", (data) => (result += data.toString()));
    python.stderr.on("data", (data) => (error += data.toString()));

    python.on("close", (code) => {
      if (code !== 0) {
        console.error("Python exited with code", code);
        console.error("Python stderr:", error);
        return res.status(500).json({ error: "Python script failed.", details: error });
      }

      res.status(200).json({ summary: result.trim() });
    });


    // Send data to Python
    python.stdin.write(JSON.stringify(formattedData));
    python.stdin.end();
  } catch (err) {
    console.error("Node error in getWeeklySummary:", err);
    res.status(500).json({ error: "Internal server error." });
  }
};
