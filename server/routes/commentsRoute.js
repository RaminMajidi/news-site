const express = require('express');
const { verifyToken } = require('../middleware/VerifyToken');
const {
    activeComment,
    createComment,
    deleteComment,
    getAllComment,
    getNewsComment
} = require('../controllers/comments');


const router = express.Router()

router.get('/api/comment/:newsId', getNewsComment)
router.post('/api/create-comment', createComment)
router.get('/api/comments', verifyToken, getAllComment)
router.put('/api/comment/active/:id', verifyToken, activeComment)
router.delete('/api/comment/:id', verifyToken, deleteComment)

module.exports = router