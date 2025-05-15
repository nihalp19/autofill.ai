import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

dotenv.config()

const PORT = process.env.PORT || PORT 
const app = express()

app.use(cors({
    origin : ["http://localhost:5000/"],
    methods : ["GET","PUT","POST","DELETE","PATCH"],
    allowedHeaders : true,
}))

app.use(express())
app.use(cookieParser())


app.all("/",(req,res) => {
    res.send("BACKEND IS RUNNING")
})


app.listen(PORT,() => {
    console.log(`SERVER STARTED AT PORT NO ${PORT}`)
})
