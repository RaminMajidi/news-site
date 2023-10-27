// zjeo frtr dmcm okmn

import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: 'ramin1475@gmail.com',
        pass: 'zjeo frtr dmcm okmn'
    }
})

export const senEmailMsg = async (req, res) => {

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
        res.status(200).json({ message: "ایمیل ارسال شد" })
    } catch (err) {
        res.status(500).json({ error: err.message || 'خطایی رخ داد' })
    }
}