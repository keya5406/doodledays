import { Request, Response } from "express";
import PushSubscription, { IPushSubscription } from "../models/PushSubscription";
import { sendPushNotification } from "../utils/sendPushNotification";
import mongoose from "mongoose";

export const sendTestNotification = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.body;

    if (!userId) {
        res.status(400).json({ error: "User ID is required" });
        return;
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        res.status(400).json({ error: "Invalid userId format" });
        return;
    }

    try {
       
        const objectUserId = mongoose.Types.ObjectId.createFromHexString(userId);
        const subscriptions = await PushSubscription.find({ userId: objectUserId });

        if (!subscriptions.length) {
            res.status(404).json({ error: "Subscription not found" });
            return;
        }

        const payload = {
            title: "Test Notification",
            body: "This is a test notification from the server.",
            url: "https://example.com",
        };

        await Promise.all(
            subscriptions.map((sub: IPushSubscription) =>
                sendPushNotification(sub.toObject(), payload)
            )
        );

        res.status(200).json({ message: "Test notification sent successfully" });
    } catch (error) {
        console.error("Error sending test notification:", error);
        res.status(500).json({ error: "Failed to send test notification" });
    }
};
