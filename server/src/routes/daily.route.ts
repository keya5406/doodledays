import { Router } from "express";
import { protect } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.js";
import { saveDailyEntry } from "../controllers/daily.controller.js";
import { DailyEntrySchema } from "../../../shared/schemas/daily.schema.js";

const router = Router();

router.post(
  "/",
  protect,
  validate(DailyEntrySchema),
  saveDailyEntry
);

export default router;

