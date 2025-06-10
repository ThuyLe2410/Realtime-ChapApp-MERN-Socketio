import express from "express"
import { protectRoute } from "../middleware/auth.middleware";
import { getUsersForSidebar, getMessages, sendMessages } from "../controllers/message.controller";
const messageRoutes = express.Router()

messageRoutes.get("/users", protectRoute, getUsersForSidebar)

messageRoutes.get("/:id", protectRoute, getMessages)

messageRoutes.post("/send/:id", protectRoute, sendMessages)

export default messageRoutes;