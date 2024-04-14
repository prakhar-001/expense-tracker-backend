import mongoose from "mongoose";

export const connectDB = (uri) => {
    mongoose
      .connect(uri, {
        dbName: "ExpenseTracker",
      })
      .then((c) => console.log(`DB Connected to ${c.connection.host}`))
      .catch((e) => console.log(e));
  };