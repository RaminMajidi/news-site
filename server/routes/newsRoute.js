import express from "express";
import { createNews, deleteNews, getCategoryNews, getDetailNews, getLastnews, getNews, getNewsById, getPopularNews, updateNews } from "../controllers/news.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const router = express.Router()

router.get('/api/News/last-news', getLastnews)
router.get('/api/News/category', getCategoryNews)
router.get('/api/News/popular-news', getPopularNews)
router.get('/api/News/detail/:id', getDetailNews)

router.get('/api/News/:id', verifyToken, getNewsById)
router.put('/api/News/:id', verifyToken, updateNews)
router.delete('/api/News/:id', verifyToken, deleteNews)
router.post('/api/News', verifyToken, createNews)
router.get('/api/News', verifyToken, getNews)



export default router