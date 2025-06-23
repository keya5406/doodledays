import { Router, Request, Response, NextFunction } from "express";
import { protect } from "../middleware/auth.middleware";
import { getWeeklySummary } from "../controllers/rulebased-ai.controller";

const router = Router();

router.get("/weekly-summary",protect, (req: Request, res: Response, next: NextFunction) => {
  getWeeklySummary(req, res).catch(next);
});

export default router;
