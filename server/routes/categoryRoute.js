const express = require('express')
const { verifyToken } = require('../middleware/VerifyToken.js')
const {
    createCategory,
    deleteCategory,
    getCategory,
    getCategoryHome,
    updateCategory
} = require('../controllers/category.js')

const router = express.Router()

router.get('/api/category/home', getCategoryHome)
router.get('/api/get-category', verifyToken, getCategory)
router.post('/api/craete-category', verifyToken, createCategory)
router.put('/api/update-category/:id', verifyToken, updateCategory)
router.delete('/api/delete-category/:id', verifyToken, deleteCategory)

module.exports = router