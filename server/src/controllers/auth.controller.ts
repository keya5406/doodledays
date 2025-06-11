import { Request, Response, NextFunction } from 'express';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import  User  from '../models/User.js'; 
import { registerSchema, loginSchema } from "../../../shared/schemas/auth.schema.js";


export const register = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const parsed = registerSchema.safeParse(req.body);
        if (!parsed.success) {
            res.status(400).json({ message: "Validation error", errors: parsed.error.flatten().fieldErrors });
            return;
        }

        const { username, email, password, notificationPreferences } = parsed.data;
        const existing = await User.findOne({ email });

        if (existing) {
            res.status(400).json({ message: "User already exists" });
            return
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            passwordHash: hashedPassword,
            notificationPreferences
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    console.log('Login route hit', req.body);
    try {

        const parsed = loginSchema.safeParse(req.body);
        if (!parsed.success) {
            res.status(400).json({ message: "Validation error", errors: parsed.error.flatten().fieldErrors });
            return;
        }

        const { email, password } = parsed.data;
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
            expiresIn: "7d"
        });

        res.json({ token, user: { id: user._id, username: user.username, email: user.email, notificationPreferences: user.notificationPreferences } });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};