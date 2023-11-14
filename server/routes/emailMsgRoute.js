const express = require("express")
const { senEmailMsg } = require("../controllers/emailMsg")

const router = express.Router()

router.post('/api/sendEmial',senEmailMsg)


module.exports = router