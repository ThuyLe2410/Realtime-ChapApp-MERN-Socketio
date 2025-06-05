import jwt from "jsonwebtoken";
import User from "../models/user.model";
import dotenv from "dotenv";
dotenv.config();

export const protectRoute = async (req:any, res:any, next:any) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized- No Token Provided" });
    }
    const jwt_secret = process.env.JWT_SECRET;
    if (!jwt_secret) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }
    const decoded = jwt.verify(token, jwt_secret);
    if (typeof decoded !== "object" || !("userId" in decoded)) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectRoute middleware");
    res.status(500).json({ message: "Internal server error" });
  }
};
