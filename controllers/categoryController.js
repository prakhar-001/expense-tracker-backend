import { CategorySchema } from "../models/categoryModel.js";
import ErrorHandler from "../utils/utility-class.js";
import { TryCatch } from "../middlewares/error.js";

export const addCategory = TryCatch(async (req, res, next) => {
    // console.log(req.body)
    
    const{type,title,user} = req.body;

    if (!title || !type|| !user)
        return next(new ErrorHandler("Please Enter All Fields", 400));

    // Check if a category with the same title and type already exists
    const categoryExists = await CategorySchema.exists({ title, type });

    if (categoryExists) {
        // If a category with the same title and type exists, return an error
        return next(new ErrorHandler("A category with the same title and type already exists", 400));
    }

    const category = CategorySchema.create({
        title,
        type,
        user,
    })

    return res.status(201).json({
        success: true,
        message: "Category Added Successfully",
    });
})

export const getCategories = TryCatch(async(req, res ,next) => {

    const { id: user, type} = req.query;

    let query = { user };

    if (type) {
        if(type !== "all") query.type = type;
    }
    console.log(query)
    let categories = await CategorySchema.find(query);

    return res.status(200).json({
        success: true,
        categories,
    });
})

export const deleteCategory = TryCatch(async(req, res, next)=> {
    const {id} = req.params;
    const category = await CategorySchema.findById(id)
    if (!category) return next(new ErrorHandler("Category Not Found", 404));

    await category.deleteOne();
    return res.status(200).json({
        success: true,
        message: "Category Deleted Successfully",
    });
})