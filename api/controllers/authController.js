//

import { createError } from "../middleware/errorHandler.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs"; //hash pass
import jwt from "jsonwebtoken";
import { genrateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

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

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    next(createError(400, "Please enter all fields"));
  }
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(createError(404, "User not found"));
    }
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(createError(400, "Invalid credentials"));
    }
    const token = jwt.sign(
      {
        id: validUser._id,
      },
      process.env.JWT_SECRET
    );
    const { password: pass, ...rest } = validUser._doc; //removing pass for security on json

    genrateTokenAndSetCookie(res, validUser._id);
    await validUser.save();
    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: {
        ...validUser._doc,
        password: undefined,
      },
    });
  } catch (error) {
    next(error);
  }
};
