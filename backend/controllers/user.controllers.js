import USER from "../models/user.models.js";
import bcrypt from "bcrypt"
import { z } from "zod"
import { generateToken } from "../services/generateToken.js";
import redis from "../utils/redis.js";
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
            const errors = result.error.errors.map((e) => `${e.path.join(".")}: ${e.message}`)
            return res.status(400).json({ success: false, message: "Validation failed", error: errors })
        }

        const { name, email, password } = result.data;

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

        const { email, password } = result.data;

        const user = await USER.findOne({ email })

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid credentails" })
        }


        const isPasswordMatched = await bcrypt.compare(password, user.password)

        if (!isPasswordMatched) {
            return res.status(400).json({ success: false, message: "Invalid credentails" })
        }

        const { refreshToken, accessToken } = await generateToken(user._id)

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // send cookie only over HTTPS in production
            sameSite: "none",
            maxAge: 1000 * 60 * 15, // 15 minutes
        })
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none",
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        })

        return res.status(200).json({
            success: true, message: "user is logined successfully", user: {
                ...user.toObject(),
                password: undefined
            }
        })

    } catch (error) {
        console.log("error while login", error.message)
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message })
    }

}


export const logout = async (req, res) => {

    try {

        const refreshToken = req.cookies.refreshToken

        if (!refreshToken) {
            return res.status(400).json({ success: false, message: "refreshToken is not provided" })
        }

        const decode = jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY)

        const redisRefreshToken = await redis.get(`refreshToken-${decode.userId}`)

        if (refreshToken !== redisRefreshToken) {
            return res.status(400).json({ success: false, message: "user is unauthorized" })
        }

        await redis.del(`refreshToken-${decode.userId}`)
        res.clearCookie("refreshToken")
        res.clearCookie("accessToken")
        return res.status(200).json({ success: true, message: "logout successfully" })

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message })
    }

}


export const checkAuth = async (req, res) => {
    try {

        if (!req.user) {
            return res.status(400).json({ success: false, message: "user is unauthtorized" })
        }
        const refreshToken = req.cookies.refreshToken

        const decode = jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY)

        const redisRefreshToken = await redis.get(`refreshToken-${decode.userId}`)

        if (refreshToken !== redisRefreshToken) {
            return res.status(400).json({ success: false, message: "user is unauthorized", })
        }

        const accessToken = jwt.sign({ userId: decode.userId }, process.env.ACCESS_SECRET_KEY)

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // send cookie only over HTTPS in production
            sameSite: "none",
            maxAge: 1000 * 60 * 15, // 15 minutes
        })
        return res.status(200).json({ success: true, message: "user is authorized", user: req.user })
    } catch (error) {
        console.log("error while checkingAuth", error.message)
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message })
    }
}


const profileSchema = z.object({
    id: z.string("Id is required"),
    collegeName: z.string().min(1, "College Name is Required"),
    collegeDegree: z.string().min(1, "College Degree is Required"),
    graduation: z.boolean("graudion is required")
})



export const userProfileUpdate = async (req, res) => {


    try {
        const result = profileSchema.safeParse(req.body)

        if (!result.success) {
            const errors = result.error.errors.map((e) => e.message)
            return res.status(400).json({ success: false, message: "validation failed", errors })
        }

        const { id, collegeName, collegeDegree, graduation } = result.data

        const user = await USER.findOne({ _id: id })

        if (!user) {
            return res.status(400).json({ success: false, message: "user not exits" })
        }

        user.collegeName = collegeName
        user.collegeDegree = collegeDegree
        user.graduation = graduation

        await user.save()
        return res.status(200).json({ success: true, message: "" })

    } catch (error) {
        console.log("error while updating profile", error.message)
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message })
    }

}
