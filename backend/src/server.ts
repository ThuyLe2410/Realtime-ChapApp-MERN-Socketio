import express from "express";
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
import { testCloudinaryConnection } from "./lib/cloudinary";

import authRoutes from "./routes/auth.route";
import messageRoutes from "./routes/message.route";
import { connectDB } from "./lib/db";
dotenv.config()

const app = express()
const PORT=process.env.PORT

app.use(express.json({limit:'50mb'}))
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials:true
}))
app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
    connectDB()
    testCloudinaryConnection()
})