const express = require("express")
const { sendEmailMsg } = require("../controllers/emailMsg")

const router = express.Router()

router.post('/api/sendEmial',sendEmailMsg)


module.exports = router