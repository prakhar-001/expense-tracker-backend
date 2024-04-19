import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
        type:{
            type: String,
            required:true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
            maxLength: 80,
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

export const CategorySchema = mongoose.model("Category", categorySchema);