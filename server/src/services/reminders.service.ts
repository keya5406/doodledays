import DailyData from '../models/DailyData';
import PushSubscription from '../models/PushSubscription';
import { sendPushNotification } from '../utils/sendPushNotification';
import mongoose from 'mongoose';

const getYesterdayDate = () => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0]; 
};

const getTodayDate = () => {
  return new Date().toISOString().split('T')[0];
};

export async function sendMorningTaskReminder() {
  const yesterday = getYesterdayDate();
  console.log("Sending morning reminders for:", yesterday);

  try {
    const entries = await DailyData.find({ date: yesterday });
    const incompleteUserIds = entries
      .filter((entry) => entry.tasks.some((task) => !task.completed))
      .map((entry) => entry.user);

    const uniqueUserIds = [...new Set(incompleteUserIds.map(id => id.toString()))];

    const subs = await PushSubscription.find({ userId: { $in: uniqueUserIds.map(id => new mongoose.Types.ObjectId(id)) } });

    await Promise.all(subs.map((sub) =>
      sendPushNotification(sub.toObject(), {
        title: 'Morning Reminder',
        body: 'You have unfinished tasks from yesterday. Get them done!',
      })
    ));

    console.log("Morning reminders sent");
  } catch (error) {
    console.error("Error sending morning reminder:", error);
  }
}

export async function sendEveningEntryReminder() {
  const today = getTodayDate();
  console.log("Sending evening reminders for:", today);

  try {
    const entries = await DailyData.find({ date: today });
    const submittedUserIds = entries.map((entry) => entry.user.toString());

    const allSubs = await PushSubscription.find();
    const reminderSubs = allSubs.filter((sub) => !submittedUserIds.includes(sub.userId.toString()));

    await Promise.all(reminderSubs.map((sub) =>
      sendPushNotification(sub.toObject(), {
        title: 'Evening Reminder',
        body: 'You haven’t submitted today’s entry. Don’t forget!',
      })
    ));

    console.log("Evening reminders sent");
  } catch (error) {
    console.error("Error sending evening reminder:", error);
  }
}
