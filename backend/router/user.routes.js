import express from "express"

import { signup,login,logout,checkAuth, userProfileUpdate } from "../controllers/user.controllers.js"
import { protectRoute } from "../middleware/protectRoute.js"

const router = express.Router()

router.post("/signup",signup)
router.post("/login",login)
router.post("/logout",logout)
router.get("/checkauth",protectRoute,checkAuth)
router.patch("/update/:id",protectRoute,userProfileUpdate)


export default router