import express from 'express';
import { activeComment, createComment, deleteComment, getAllComment, getNewsComment, updateComment } from '../controllers/comments.js';
import { verifyToken } from '../middleware/VerifyToken.js';


const router = express.Router()

router.get('/api/comment/:newsId', getNewsComment)
router.post('/api/create-comment', createComment)
router.get('/api/comments', verifyToken, getAllComment)
router.put('/api/comment/active/:id', verifyToken, activeComment)
router.put('/api/comment/:id', verifyToken, updateComment)
router.delete('/api/comment/:id', verifyToken, deleteComment)

export default router