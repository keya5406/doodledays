import mongoose, { Schema, Document, Types} from "mongoose";

export interface Expense {
    description: string;
    amount: number;
}

export interface Task{
    title: string;
    completed: boolean;
}

export interface DailyData extends Document {
    user: Types.ObjectId;
    date: Date;
    mood: string;
    productivity: number;
    expenses: Expense[];
    sleepHours: number;
    tasks: Task[];
}

const ExpenseSchema: Schema = new Schema({
    description: { type: String, required: true },
    amount: { type: Number, required: true }
});

const TaskSchema: Schema = new Schema({
    title: { type: String, required: true },
    completed: { type: Boolean, default: false }
});

const DailyDataSchema: Schema = new Schema({
    user: { type: Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    mood: { type: String, required: true },
    productivity: { type: Number, required: true },
    expenses: [ExpenseSchema],
    sleepHours: { type: Number, required: true },
    tasks: [TaskSchema]
}, {
    timestamps: true
});

const DailyDataModel = mongoose.model<DailyData>('DailyData', DailyDataSchema);
export default DailyDataModel;
