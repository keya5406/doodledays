import { Request, Response } from 'express';
import { Types } from 'mongoose';
import PushSubscription from '../models/PushSubscription';
import UserModel from '../models/User';

export const subscribe = async (req: Request, res: Response): Promise<void> => {
    const { userId, subscription } = req.body;

    if (!userId || !subscription?.endpoint || !subscription?.keys) {
        res.status(400).json({ message: 'Invalid subscription data' });
        return;
    }

    if (!Types.ObjectId.isValid(userId)) {
        res.status(400).json({ message: 'Invalid userId format' });
        return;
    }

    try {
        const objectUserId = new Types.ObjectId(userId);

        await PushSubscription.findOneAndUpdate(
            { userId: objectUserId, endpoint: subscription.endpoint },
            {
                userId: objectUserId,
                endpoint: subscription.endpoint,
                keys: {
                    p256dh: subscription.keys.p256dh,
                    auth: subscription.keys.auth,
                }
            },
            { upsert: true, new: true }
        );

        await UserModel.findByIdAndUpdate(objectUserId, {
            'notificationPreferences.pushNotifications': true
        });

        res.status(201).json({ message: 'Subscription saved and preferences updated' });
    } catch (err) {
        console.error('Error saving subscription:', err);
        res.status(500).json({ message: 'Server error' });
    }
};
