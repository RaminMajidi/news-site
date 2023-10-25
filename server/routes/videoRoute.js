import express from "express"
import { verifyToken } from "../middleware/VerifyToken.js"
import { createVideo, deleteVideo, getAllVideo, getSingleVideo } from "../controllers/video.js"

const router = express.Router()


router.get('/api/allVideo', verifyToken, getAllVideo)
router.post('/api/craete-video', verifyToken, createVideo)
router.get('/api/getSingleVideo', getSingleVideo)
router.delete('/api/deleteVideo/:id', verifyToken, deleteVideo)


export default router
