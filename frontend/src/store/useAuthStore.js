import { create } from "zustand"
import { axiosInstance } from "../api/axiosInstance"
import toast from "react-hot-toast"

export const useAuthStore = create((set, get) => ({
    user: null,
    isLoading: true,
    isSideBarOpen: false,

    toogleSideBar: () => set(state => ({isSideBarOpen: !state.isSideBarOpen})),


    signup: async (data) => {
        try {
            set({ loading: false })
            const res = await axiosInstance.post("/auth/signup", data)
            console.log("signup success")
            console.log(res.data)
            toast.success(res.data.message)
        } catch (error) {
            toast.error(error.response?.data?.message || "Signup failed. Please try again.")
            console.log("error while login api hit", error.message)
        } finally {
            set({ loading: true })
        }
    },

    login: async (data) => {
        try {
            set({ loading: false })
            const res = await axiosInstance.post("/auth/login", data)
            console.log("login success")
            set({ user: res.data.user })
            toast.success(res.data.message)
        } catch (error) {
            toast.error(error.response?.data?.message || "login failed")
            console.log("error while login api hit", error.message)
        } finally {
            set({ loading: true })
        }
    },

    checkAuth: async () => {
        try {
            set({ loading: false })
            const res = await axiosInstance.get("/auth/checkauth")
            console.log("checkAuth success")
            set({ user: res.data.user })
        } catch (error) {
            set({ user: null })
            // toast.error(error?.response?.data?.message || "CheckAuth Failed")
            console.log("error while login api hit", error.message)
        } finally {
            set({ loading: true })
        }
    }

})) 