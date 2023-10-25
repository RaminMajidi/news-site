import express from "express";
import { createNews, getNews, getNewsById, updateNews } from "../controllers/news.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const router = express.Router()

router.get('/api/News/:id', verifyToken, getNewsById)
router.put('/api/News/:id', verifyToken, updateNews)
router.post('/api/News', verifyToken, createNews)
router.get('/api/News', verifyToken, getNews)


export default router