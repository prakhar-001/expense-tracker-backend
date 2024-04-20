import { TryCatch } from "../middlewares/error.js";
import { User } from "../models/userModel.js";
import ErrorHandler from "../utils/utility-class.js"

export const newUser = TryCatch(
    async (req,res,next) => {
      const { name, email, _id, password } = req.body;
  
      // let user = await User.findById(_id);
      let existingUser = await User.findOne({ email});;
      // console.log(existingUser)
      if (existingUser){
        return res.status(400).json({
          success: false,
          message: `User already exists with the same Email ID`,
        });
      }

      let user = await User.findById(_id);
      if (user)
        return res.status(200).json({
          success: true,
          message: `Welcome Back, ${user.name}`,
        });
  
      if (!_id || !name || !email || !password)
        return next(new ErrorHandler("Please add all fields", 400));
  
      user = await User.create({
        name,
        email,
        _id,
        password,
      });
  
      return res.status(201).json({
        success: true,
        message: `Registered Successfully, ${user.name}`,
      });
    }
  );

// export const getAllUsers = TryCatch(async (req, res, next) => {
//     const users = await User.find({});
  
//     return res.status(200).json({
//       success: true,
//       users,
//     });
//   });


export const getUser = TryCatch(async (req, res, next) => {
    const id = req.params.id;
    const user = await User.findById(id);
  
    // console.log(user)
  
    if (!user) return next(new ErrorHandler("Invalid Id", 400));
  
    return res.status(200).json({
      success: true,
      message: `Welcome ${user.name}`,
      user,
    });
});
  
// export const deleteUser = TryCatch(async (req, res, next) => {
//     const id = req.params.id;
//     const user = await User.findById(id);
  
//     if (!user) return next(new ErrorHandler("Invalid Id", 400));
  
//     await user.deleteOne();
  
//     return res.status(200).json({
//       success: true,
//       message: "User Deleted Successfully",
//     });
// });
  
