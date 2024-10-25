//

import { createError } from "../middleware/errorHandler.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs"; //hash pass
import jwt from "jsonwebtoken";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

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

    generateTokenAndSetCookie(res, validUser._id);
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

export const google = async (req, res, next) => {
  const { name, email, googlePhotoUrl } = req.body;
  try {
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      generateTokenAndSetCookie(res, userAlreadyExists._id);
      return res.status(200).json({
        success: true,
        message: "Logged in successfully",
        user: {
          ...userAlreadyExists._doc,
          password: undefined,
        },
      });
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });
      await newUser.save();
      generateTokenAndSetCookie(res, newUser._id);

      return res.status(200).json({
        success: true,
        message: "Logged in successfully",
        user: {
          ...newUser._doc,
          password: undefined,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};
