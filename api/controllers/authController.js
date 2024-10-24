//

import { createError, errorHandler } from "../middleware/errorHandler.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs"; //hash pass

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    if (
      !username ||
      !email ||
      !password ||
      username === "" ||
      email === "" ||
      password === ""
    ) {
      next(createError(400, "Please enter all fields"));
    }
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      return next(createError(409, "User already exists"));
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        ...newUser._doc,
        password: undefined,
      },
    });
  } catch (error) {
    next(error);
  }
};
