import USER from "../models/user.models";
import bcrypt from "bcrypt"
import { z } from "zod"
import { generateToken } from "../utils/generateToken";
import redis from "../utils/redis";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()


const signupSchema = z.object({
    name: z.string().min(1, "name is required"),
    email: z.string().email("Invalid Email"),
    password: z.string().min(6, "Password must be at least 6 characters long")
})


export const signup = async (req, res) => {

    try {
        const result = signupSchema.safeParse(req.body)

        if (!result.success) {
            const errors = result.error.errors.map((e) => e.message)
            return res.status(400).json({ success: false, message: "Validation failed", errors })
        }


        const isUserExits = await USER.findOne({ email: email })
        if (isUserExits) {
            return res.status(400).json({ message: "user already exits" })
        }

        const hashpassword = await bcrypt.hash(password, 10)

        const user = await USER.create({
            name,
            email,
            password: hashpassword
        })

        return res.status(200).json({ success: true, message: "user is created successfully" })

    } catch (error) {
        console.log("error while signing up", error.message)
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message })
    }

}


const loginSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters long")
})

export const login = async (req, res) => {

    try {
        const result = loginSchema.safeParse(req.body)

        if (!result.success) {
            const errors = result.error.errors.map((e) => e.message)
            return res.status(400).json({ success: false, message: "Validation failed", errors })
        }

        const user = await USER.findOne({ email }).select("-password")

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid credentails" })
        }


        const isPasswordMatched = await bcrypt.compare(password, user.password)

        if (!isPasswordMatched) {
            return res.status(400).json({ success: false, message: "Invalid credentails" })
        }

        const { refreshToken, accessToken } = generateToken(user._id)

        res.setCookie("accessToken", accessToken)
        res.setCookie("refreshToken", refreshToken)
        return res.status(200).json({ success: true, message: "user is logined successfully", user })

    } catch (error) {
        console.log("error while login", error.message)
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message })
    }

}


export const logout = async (req, res) => {

    try {

        const refreshToken = req.cookie.refreshToken

        const redisRefreshToken = await redis.get(`refreshtoken-${req._id}`)


        if (refreshToken !== redisRefreshToken) {
            return res.status(400).json({ success: false, message: "user is unauthorized" })
        }

        await redis.del(`refreshtoken-${req._id}`)
        res.clearcookie("refreshToken")
        res.clearcookie("accessToken")
        return res.status(200).json({ success: true, message: "logout successfully" })

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message })
    }

}


export const checkAuth = async(req,res) => {


    try {
        
        if(!req.user){
            return res.status(400).json({success : false,message : "user is unauthtorized"})
        }
            const refreshToken = req.cookie.refreshToken 

            const decode = jwt.verify(refreshToken,process.env.REFRESH_SECRET_KEY)
            
            const redisRefreshToken = await redis.get(`refreshToken-${decode.userId}`)

            if(refreshToken !== redisRefreshToken){
                return res.status(400).json({success : false,message : "user is unauthorized"})
            }

            const accessToken = jwt.sign({userId : decode.userId},process.env.ACCESS_SECRET_KEY)

            res.setCookie("accessToken",accessToken)
            return res.status(200).json({success : true,message : "user is authorized"})
    } catch (error) {
        console.log("error while checkingAuth",error.message)
        return res.status(500).json({success : false, message : "Internal Server Error",error : error.message})
    }
}

