import News from "../models/newsModel.js";
import path from 'path'
import fs from 'fs'


export const getNews = async (req, res) => {
    try {
        const news = await News.findAll({})
        res.status(200).json({ message: 'عملیات با موفقیت انجام شد', data: news })
    } catch (err) {
        res.status(500).json({ error: "خطایی رخ داده است" })
    }
}


export const createNews = async (req, res) => {

    if (req.files == null) {
        return res.status(401).json({ error: "انتخاب عکس الزامی است" })
    }
    const { title, desc, catId, userId } = req.body;
    const file = req.files.file
    const fileSize = file.data.length
    const ext = path.extname(file.name)
    let dateNow = Math.round(Date.now())
    const fileName = dateNow + ext
    const url = `${req.protocol}://${req.get('host')}/images/${fileName}`;
    const allowedType = ['.jpg', '.jpeg', '.png']

    if (!allowedType.includes(ext.toLowerCase())) {
        return res.status(401).json({ message: 'فرمت فایل نامعتبر است فقط فرمت * .jpg .png .jpeg' })
    }
    if (fileSize > 1000000) {
        return res.status(401).json({ message: 'حجم عکس نباید بیشتر از 1 مگابایت باشد' })
    }
    file.mv(`./public/images/${fileName}`, async (err) => {
        if (err) return res.status(500).json({ error: err.message })

        try {
            const news = await News.create({
                title: title,
                catId: catId,
                userId: userId,
                desc: desc,
                image: fileName,
                url: url
            })

            res.status(200).json({ data: news })
        } catch (err) {
            res.status(500).json({ error: "خطایی رخ داده است" })
        }
    })
}


export const getNewsById = async (req, res) => {

    try {
        const news = await News.findOne({ where: { id: req.params.id } })
        res.status(200).json({ data: news })

    } catch (err) {
        res.status(500).json({ error: "خطایی رخ داده است" })
    }
}


export const updateNews = async (req, res) => {

    const news = await News.findOne({ where: { id: req.params.id } })

    if (!news) {
        return res.status(403).json({ error: "دیتایی یافت نشد" })
    }
    let fileName = '';
    if (req.files === null) {
        fileName = news.image
    } else {
        const file = req.files.file
        const fileSize = file.data.length
        const ext = path.extname(file.name)
        let dateNow = Math.round(Date.now())
        fileName = dateNow + ext
        const allowedType = ['.jpg', '.jpeg', '.png']

        if (!allowedType.includes(ext.toLowerCase())) {
            return res.status(401).json({ message: 'فرمت فایل نامعتبر است فقط فرمت * .jpg .png .jpeg' })
        }
        if (fileSize > 1000000) {
            return res.status(401).json({ message: 'حجم عکس نباید بیشتر از 1 مگابایت باشد' })
        }
        const filePath = `./public/images/${news.image}`
        fs.unlinkSync(filePath)
        file.mv(`./public/images/${fileName}`, async (err) => {
            if (err) return res.status(500).json({ error: err.message })
        })
    }

    const { title, desc, userId, catId } = req.body
    const url = `${req.protocol}://${req.get('host')}/images/${fileName}`;

    try {
        await News.update({
            title: title,
            desc: desc,
            userId: userId,
            catId: catId,
            image: fileName,
            url: url
        },
            {
                where: { id: req.params.id }
            }
        )

        res.status(201).json({ message: 'عملیات با موفقیت انجام شد' })
    } catch (err) {
        res.status(500).json({ error: err.message || "خطایی رخ داده است" })
    }
} 
