import express from "express"

import { signup,login,logout,checkAuth } from "../controllers/user.controllers.js"

const router = express.Router()

router.post("/signup",signup)
router.post("/login",login)
router.post("/logout",logout)
router.get("/checkauth",checkAuth)


export default router