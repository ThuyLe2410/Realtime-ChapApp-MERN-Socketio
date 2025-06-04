import express from "express"

const authRoutes = express.Router()

authRoutes.get("/signup", (req, res) => {
    res.send("signup route")
})

authRoutes.get("/login", (req, res) => {
    res.send("login route")
})

authRoutes.get("/logout", (req, res) => {
    res.send("logout route")
})

export default authRoutes;