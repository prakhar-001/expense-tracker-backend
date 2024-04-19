import express from "express";
import { addCategory, deleteCategory, getCategories } from "../controllers/categoryController.js";

const app = express.Router();

app.get("/", (req, res) => {
    res.send("Transaction Api working")
});

// INCOME ROUTES
app.post("/add", addCategory)
app.get("/get", getCategories)
app.delete("/delete/:id", deleteCategory)

export default app;
