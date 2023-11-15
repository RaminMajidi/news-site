const express = require("express")
const { verifyToken } = require("../middleware/VerifyToken")
const {
    createVideo,
    deleteVideo,
    getAllVideo,
    getSingleVideo
} = require("../controllers/video")

const router = express.Router()


router.get('/api/getSingleVideo', getSingleVideo)
router.get('/api/allVideo', verifyToken, getAllVideo)
router.post('/api/craete-video', verifyToken, createVideo)
router.delete('/api/deleteVideo/:id', verifyToken, deleteVideo)

module.exports = router
