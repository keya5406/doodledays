import express from 'express';
import { subscribe }  from '../controllers/notifications.controller';

const router = express.Router();

router.post('/subscribe', subscribe);

export default router;
