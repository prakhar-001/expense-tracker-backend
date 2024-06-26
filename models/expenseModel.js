import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true,
            trim: true,
            maxLength: 80,
        },
        amount: {
            type: Number,
            required: true,
            maxLength: 20,
            trim: true,
        },
        amount: {
            type: String,
            default: "income"
        },
        date: {
            type: Date,
            required: true,
            trim: true
        },
        category: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        mode:{
            type:String,
            required: true
        },
        // here we are passing the user id, but this user id is not in the format of mongodb id becaue this id is provided by us or provided by firebase hence we are uysing its type as string and not mongoose.types...
        user: {
            type: String,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

export const ExpenseSchema = mongoose.model("Expense", expenseSchema);