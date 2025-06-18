import cron from 'node-cron';
import { sendMorningTaskReminder, sendEveningEntryReminder } from '../services/reminders.service';

export function startReminderScheduler() {
  
  cron.schedule('0 9 * * *', () => {
    console.log("Running morning reminder scheduler...");
    sendMorningTaskReminder();
  });

  
  cron.schedule('0 20 * * *', () => {
    console.log("Running evening reminder scheduler...");
    sendEveningEntryReminder();
  });

  console.log("Daily reminder scheduler started");
}
