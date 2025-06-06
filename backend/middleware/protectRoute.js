import jwt from "jsonwebtoken"
import USER from "../models/user.models.js"
import redis from "../utils/redis.js"
import dotenv from "dotenv"

dotenv.config()

export const protectRoute = async (req, res, next) => {

    try {
        const accessToken = req.cookies.accessToken
        const refreshToken = req.cookies.refreshToken

        if (!accessToken || !refreshToken) {
            return res.status(400).json({ success: false, message: "token expired" })
        }

        const decodeAccess = jwt.verify(accessToken, process.env.ACCESS_SECRET_KEY)
        const decodeRefresh = jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY)



        if (!decodeAccess.userId && !decodeRefresh.userId) {
            return res.status(400).json({ success: false, message: "token expired" })
        }

        const redisRefreshToken = await redis.get(`refreshToken-${decodeRefresh.userId}`)


        if (refreshToken !== redisRefreshToken) {
            return res.status(400).json({ success: false, message: "authorized user" })
        }

        const user = await USER.findOne({ _id: decodeAccess.userId })

        if (!user) {
            return res.status(400).json({ success: false, message: "token expired" })
        }

        req.user = user
        next()
    } catch (error) {
        console.log("error while protecting route", error.message)
    }

}