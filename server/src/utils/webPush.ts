import webPush from 'web-push';

const vapidKeys = {
  publicKey: process.env.VAPID_PUBLIC_KEY!,
  privateKey: process.env.VAPID_PRIVATE_KEY!,
};

webPush.setVapidDetails(
  process.env.VAPID_EMAIL!,
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

export default webPush;
