import jwt from "jsonwebtoken"
import redis from "./redis.js"

const setRefreshToken = (refreshToken, userId) => {
    redis.set(`refreshToken-${userId}`, refreshToken)
}


export const generateToken = async (userId) => {

    const refreshToken = jwt.sign({ userId }, process.env.REFRESH_SECRET_KEY,{expiresIn : '7d'})
    const accessToken = jwt.sign({ userId }, process.env.ACCESS_SECRET_KEY,{expiresIn : '15m'})

    setRefreshToken(refreshToken, userId)

    return (refreshToken, accessToken)
} 