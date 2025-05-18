import { create } from "zustand"
import { axiosInstance } from "../api/axiosInstance"
import toast from "react-hot-toast"

export const useUrlStore = create((set, get) => ({
    currentForm: null,
    forms: [],
    isProcessing: false,
    currentUrl: null,

    setCurrentUrl: (url) => {
        set({ currentUrl: url })
    },



    autoFillForm: async (data) => {
        try {
            set({ isProcessing: true })
            const res = await axiosInstance.post("/url/generateAnswers", data)
            set({ currentForm: res.data.questions })
            toast.success(res.data.message)
        } catch (error) {
            console.log(error?.response?.data?.message || "Autofilling failed")
        } finally {
            set({ isProcessing: false })
        }
    }

})) 