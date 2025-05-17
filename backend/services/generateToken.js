import jwt from "jsonwebtoken";
import redis from "../utils/redis.js"; 

const setRefreshToken = async (refreshToken, userId) => {
    await redis.set(`refreshToken-${userId}`, refreshToken, { ex: 7 * 24 * 60 * 60 });
};

export const generateToken = async (userId) => {
    const refreshToken = jwt.sign(
        { userId },
        process.env.REFRESH_SECRET_KEY,
        { expiresIn: "7d" }
    );

    const accessToken = jwt.sign(
        { userId },
        process.env.ACCESS_SECRET_KEY,
        { expiresIn: "15m" }
    );

    await setRefreshToken(refreshToken, userId);

    return { refreshToken, accessToken };
};
