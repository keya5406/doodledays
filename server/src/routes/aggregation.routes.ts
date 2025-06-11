import express from 'express';
import { getSummary } from '../controllers/aggregationController';
import { protect } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/summary', protect, getSummary);

export default router;