import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
    {
      _id: {
        type: String,
        required: [true, "Please enter ID"],
      },
      name: {
        type: String,
        required: [true, "Please enter Name"],
      },
      email: {
        type: String,
        unique: [true, "Email already Exist"],
        required: [true, "Please enter Email"],
      },
      password: {
        type: String,
        required: [true, "Please enter Password"],
      },
      role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
      },
    },
    {
      timestamps: true,
    }
);


export const User = mongoose.model("User", userSchema);
