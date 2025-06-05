import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const generateToken = (userId:string, res:any) => {
  const jwt_secret = process.env.JWT_SECRET;
  let token;
  if (jwt_secret) {
    const token = jwt.sign({ userId }, jwt_secret, { expiresIn: "7d" });
    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSize: "strict",
      secure: process.env.NODE_ENV !== "development",
    });
  }
  return token
};
