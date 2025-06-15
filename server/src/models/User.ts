import { match } from "assert";
import mongoose, { Schema, Document} from "mongoose";

export interface User extends Document {
    username: string;
    email: string;
    passwordHash: string;
    notificationPreferences: {
        emailNotifications: boolean;
        pushNotifications: boolean;
    };
}

const UserSchema: Schema = new Schema({
    username: { type: String, required: true, unique: true, trim: true },
    email: { 
        type: String, 
        required: true, 
        unique: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
    passwordHash: { type: String, required: true },
    notificationPreferences: {
        emailNotifications: { type: Boolean, default: false },
        pushNotifications: { type: Boolean, default: false }
    }
}, {
    timestamps: true
});

const UserModel = mongoose.model<User>('User', UserSchema);

export default UserModel;