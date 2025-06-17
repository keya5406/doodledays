import webPush from 'web-push';

export function initializeWebPush(): void {
  const { VAPID_EMAIL, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY } = process.env;

  if (!VAPID_EMAIL || !VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY) {
    throw new Error("Missing VAPID configuration (EMAIL, PUBLIC_KEY, or PRIVATE_KEY)");
  }

  webPush.setVapidDetails(VAPID_EMAIL, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);

  console.log("WebPush initialized with VAPID keys");
}

export default webPush;
