import express from "express"

import { signup,login,logout,checkAuth, userProfileUpdate } from "../controllers/user.controllers.js"

const router = express.Router()

router.post("/signup",signup)
router.post("/login",login)
router.post("/logout",logout)
router.get("/checkauth",checkAuth)
router.patch("/update/:id",userProfileUpdate)


export default router