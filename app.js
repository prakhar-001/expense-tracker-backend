import express from "express"
import {config} from "dotenv" // to use env variables
import cors from "cors"
import { errorMiddleware } from "./middlewares/error.js";

import { connectDB } from "./db/db.js"

// IMPORTING ROUTES
import transactionRoute from "./routes/transactionRoute.js";
// import userRoute from "./routes/userRoute.js";
import userRoute from "./routes/userRoute.js"


// Dealing with env variables
config({
    path: "./.env"
})
const port = process.env.PORT || 7000;
const mongoURI = process.env.MONGO_URI || "";

connectDB(mongoURI);



const app = express();

// MIDDLEWARES
app.use(express.json()) // to provide api data in json format
app.use(cors()) //to be able to use api without problem


// USING ROUTES
app.use("/api/v1/transaction", transactionRoute)
app.use("/api/v1/user", userRoute)


app.get("/",(req,res)=>{
    res.send("API Working")
})

app.use(errorMiddleware)

app.listen(port, () => {
    console.log(`Server is working on port ${port}`)
})