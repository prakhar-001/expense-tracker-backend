import express from "express";
import { addIncome, deleteIncome, getIncomes } from "../controllers/incomeController.js";
import { addExpense, deleteExpense, getExpenses } from "../controllers/expenseController.js";

const app = express.Router();

app.get("/", (req, res) => {
    res.send("Transaction Api working")
});

// INCOME ROUTES
app.post("/add-income", addIncome)
app.get("/get-incomes", getIncomes)
app.delete("/delete-income/:id", deleteIncome)

// EXPENSE ROUTES
app.post("/add-expense", addExpense)
app.get("/get-expenses", getExpenses)
app.delete("/delete-expense/:id", deleteExpense)

export default app;
