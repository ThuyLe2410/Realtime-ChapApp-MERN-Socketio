import express from "express";
import { login, signup, logout, updateProfile, checkAuth } from "../controllers/auth.controller";
import { protectRoute } from "../middleware/auth.middleware";

const authRoutes = express.Router();

authRoutes.post("/signup", signup);

authRoutes.post("/login", login);

authRoutes.post("/logout", logout);

authRoutes.put("/update-profile", protectRoute, updateProfile)

authRoutes.get("/check", protectRoute, checkAuth)

export default authRoutes;
