import express from 'express';
import { sendTestNotification } from '../controllers/notification.controller';
import { sendMorningTaskReminder, sendEveningEntryReminder } from '../services/reminders.service';

const router = express.Router();

router.post('/test', sendTestNotification);

// 🔧 Morning test route
router.post('/test/morning', async (req, res) => {
  try {
    await sendMorningTaskReminder();
    res.status(200).json({ message: "✅ Morning reminder sent manually." });
  } catch (err) {
    res.status(500).json({ error: "❌ Failed to send morning reminder." });
  }
});

// 🔧 Evening test route
router.post('/test/evening', async (req, res) => {
  try {
    await sendEveningEntryReminder();
    res.status(200).json({ message: "✅ Evening reminder sent manually." });
  } catch (err) {
    res.status(500).json({ error: "❌ Failed to send evening reminder." });
  }
});

export default router;