import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import { connectDB } from "./utils/connectDB.js"
import userRoutes from "./router/user.routes.js"
import urlRoutes from "./router/form.routes.js"

dotenv.config()

const PORT = process.env.PORT || PORT
const app = express()

app.use(cors({
    origin: ["http://localhost:5173/"],
    methods: ["GET", "PUT", "POST", "DELETE", "PATCH"],
    allowedHeaders: true,
}))

app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",userRoutes)
app.use("/api/url",urlRoutes)

app.all("/", (req, res) => {
    res.send("BACKEND IS RUNNING")
})


app.listen(PORT, () => {
    connectDB()
    console.log(`SERVER STARTED AT PORT NO ${PORT}`)
})
