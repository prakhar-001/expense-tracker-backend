import { ExpenseSchema } from "../models/expenseModel.js";
import ErrorHandler from "../utils/utility-class.js";
import { TryCatch } from "../middlewares/error.js";

export const addExpense = TryCatch(async (req, res, next) => {
    // console.log(req.body)
    
    const{title, amount, description, date, category, user} = req.body;

    // console.log(date)

    if (!title || !amount || !description || !date || !category || !user)
        return next(new ErrorHandler("Please Enter All Fields", 400));
    if(amount <= 0) return next(new ErrorHandler("Amount Can Not Be Negative"))
    
    // console.log("Printing.........")
    // console.log(date + "Normal")
    const dateA = new Date(date)
    // console.log(dateA + "Below")

    const income = ExpenseSchema.create({
        title,
        amount,
        description,
        category,
        user,
        date: dateA
    })

    // income.then(a => console.log(a))
    // console.log(income)

    return res.status(201).json({
        success: true,
        message: "Expense Added Successfully",
    });
})

export const getExpenses = TryCatch(async(req, res ,next) => {

    const { id: user, month, year } = req.query;

    let query = { user };

    // If both month and year are "all", return all entries without date filtering
    if (month === "all" && year === "all") {
        query = { user }; // No date filtering
    } else if (month === "all") {
        // If month is "all" but year is specified, filter by year only
        if (!year) {
            return res.status(400).json({
                success: false,
                message: "Year is required when month is 'all'",
            });
        }
        query.date = {
            $gte: new Date(year, 0, 1), // Start of the year
            $lt: new Date(parseInt(year, 10) + 1, 0, 1) // Start of the next year
        };
    } else if (month && year) {
        // If month and year are specified, filter by exact month and year
        const monthNumber = parseInt(month, 10);
        query.date = {
            $gte: new Date(year, monthNumber - 1, 1), // Start of the month
            $lt: new Date(year, monthNumber, 0) // End of the month
        };
    }

    let expenses = await ExpenseSchema.find(query).sort({ date: 1 });

    return res.status(200).json({
        success: true,
        expenses,
    });
})

export const deleteExpense = TryCatch(async(req, res, next)=> {
    const {id} = req.params;
    const income = await ExpenseSchema.findById(id)
    if (!income) return next(new ErrorHandler("Expense Not Found", 404));

    await income.deleteOne();
    return res.status(200).json({
        success: true,
        message: "Expense Deleted Successfully",
    });
})