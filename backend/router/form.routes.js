import express from "express"
import { protectRoute } from "../middleware/protectRoute.js"
import { extractQuestions } from "../controllers/form.controllers.js"

const router = express.Router()


router.post("/generateAnswers",protectRoute, extractQuestions)



export default router