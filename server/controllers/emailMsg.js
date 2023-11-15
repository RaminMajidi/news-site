const nodemailer = require('nodemailer');
const dotenv = require("dotenv");

dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_PASSWORD
    }
})

async function sendEmailMsg(req, res, next) {
    const { subject, message, email } = req.body
    const userSubject = `شما پیامی از طرف ${email} - با موضوع : ${subject} دارید`
    try {
        let details = {
            from: email,
            to: "ramindev01@gmail.com",
            subject: userSubject,
            text: message,
        }
        await transporter.sendMail(details)
        res.status(200).json({ message: "پیام شما با موفقیت برای مدیریت سایت ارسال شد" })
    } catch (err) {
        next(err)
    }
}
module.exports ={
    sendEmailMsg
}