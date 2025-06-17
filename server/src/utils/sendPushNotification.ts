import webPush from "./webPush";
import { IPushSubscription } from "../models/PushSubscription";

interface NotificationPayload {
  title: string;
  body: string;
  url?: string;
}

export async function sendPushNotification(
  subscription: IPushSubscription,
  payload: NotificationPayload
): Promise<void> {
  const pushPayload = {
    endpoint: subscription.endpoint,
    keys: {
      p256dh: subscription.keys.p256dh,
      auth: subscription.keys.auth,
    },
  };

  const options = {
    TTL: 60,
  };

  try {
    await webPush.sendNotification(pushPayload, JSON.stringify(payload), options);
    console.log(`Push notification sent to ${subscription.endpoint}`);
  } catch (error) {
    console.error(`Failed to send push notification to ${subscription.endpoint}:`, error);
  }
}
