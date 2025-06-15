import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import dailyRoutes from "./routes/daily.route.js"; 
import aggregationRoutes from "./routes/aggregation.routes.js";
import notificationsRouter from "./routes/notifications.route.js";
import cors from "cors";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,              
}));

app.use("/api/auth", authRoutes);

app.use("/api/daily", dailyRoutes);
app.use("/api/aggregation", aggregationRoutes);
app.use('/api/notifications', notificationsRouter);


mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
