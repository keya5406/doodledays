import express from 'express';
import { sendTestNotification } from '../controllers/notification.controller';

const router = express.Router();

router.post('/test', sendTestNotification);

export default router;