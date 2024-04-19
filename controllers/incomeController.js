import { IncomeSchema } from "../models/incomeModel.js";
import ErrorHandler from "../utils/utility-class.js";
import { TryCatch } from "../middlewares/error.js";

export const addIncome = TryCatch(async (req, res, next) => {
    // console.log(req.body)
    const{title, amount, description, date, category, user, mode} = req.body;

    if (!title || !amount || !description || !date || !category || !user || !mode)
        return next(new ErrorHandler("Please Enter All Fields", 400));
    if(amount <= 0) return next(new ErrorHandler("Amount Can Not Be Negative"))

    const income = IncomeSchema.create({
        title,
        amount,
        description,
        category,
        mode,
        user,
        date
    })

    console.log(income)

    return res.status(201).json({
        success: true,
        message: "Income Added Successfully",
    });
})

export const getIncomes = TryCatch(async(req, res ,next) => {
    const { id: user, month, year, mode } = req.query;

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
        const lastDayOfMonth = new Date(year, monthNumber, 0).getDate();

        query.date = {
            $gte: new Date(year, monthNumber - 1, 1), // Start of the month
            $lt: new Date(year, monthNumber - 1, lastDayOfMonth + 1)
        };
    }
    // Handle mode filtering
    if (mode && mode !== "all") {
        query.mode = mode;
    }


    let incomes = await IncomeSchema.find(query).sort({ date: 1 });
    return res.status(200).json({
        success: true,
        incomes,
    });
})

export const deleteIncome = TryCatch(async(req, res, next)=> {
    const {id} = req.params;
    const income = await IncomeSchema.findById(id)
    if (!income) return next(new ErrorHandler("Income Not Found", 404));

    await income.deleteOne();
    return res.status(200).json({
        success: true,
        message: "Income Deleted Successfully",
    });
})