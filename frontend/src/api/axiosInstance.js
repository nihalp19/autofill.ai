import axios from "axios"


const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL;

export const axiosInstance = axios.create({
    baseURL: FRONTEND_URL,
    withCredentials: true
})