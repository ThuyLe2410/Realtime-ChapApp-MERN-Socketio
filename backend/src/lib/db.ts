import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is not defined in environment variables.");
  }

  try {
    await mongoose.connect(uri);
    console.log(" MongoDB connected successfully.");
  } catch (error) {
    console.error(" MongoDB connection error:", error);
    process.exit(1);
  }
};
