import express from "express"
import { senEmailMsg } from "../controllers/emailMsg.js"


const router = express.Router()

router.post('/api/sendEmial',senEmailMsg)


export default router