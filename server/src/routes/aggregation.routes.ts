import express from 'express';
import { getSummary } from '../controllers/aggregation.controller';
import { protect } from '../middleware/auth.middleware';
import { getDashboardData } from '../controllers/dashboardAggregation.controller';

const router = express.Router();

router.get('/summary', protect, getSummary);
router.get("/dashboard", protect , getDashboardData);

export default router;