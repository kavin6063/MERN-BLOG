import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const generateTokenAndSetCookie = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("access_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "production",
    sameSite: "strict",
    maxAge: 7 * 60 * 60 * 1000,
  });
  return token;
};
