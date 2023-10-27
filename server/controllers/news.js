import News from "../models/newsModel.js";
import path from 'path'
import fs from 'fs'
import Category from "../models/categoryModels.js";
import Users from "../models/userModel.js";




export const getNews = async (req, res) => {
    try {
        const news = await News.findAll({})
        res.status(200).json({ data: news })
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

            res.status(200).json({ message: "عملیات با موفقیت انجام شد", data: news })
        } catch (err) {
            res.status(500).json({ error: err.message || "خطایی رخ داده است" })
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

export const deleteNews = async (req, res) => {

    const id = req.params.id
    const news = await News.findByPk(id)
    if (!news) {
        return res.status(403).json({ error: 'آیتمی یافت نشد' })
    }

    try {
        const filePath = `./public/images/${news.image}`
        fs.unlinkSync(filePath)
        await News.destroy({ where: { id: id } })
        res.status(200).json({ message: 'عملیات با موفقیت انجام شد', data: news })
    } catch (err) {
        res.status(500).json({ error: err.message || "خطایی رخ داده است" })
    }
}

export const getLastnews = async (req, res) => {

    try {
        const news = await News.findAll({
            limit: 2,
            order: [['id', 'DESC']],
            include: [Category],
        })
        res.status(200).json({ data: news })
    } catch (err) {
        res.status(500).json({ error: err.message || "خطایی رخ داده است" })
    }
}

export const getDetailNews = async (req, res) => {

    try {
        const news = await News.findOne({ where: { id: req.params.id } })
        if (news) {
            const numViews = news.numViews + 1;
            await News.update({ numViews }, { where: { id: req.params.id } })
            return res.status(200).json({ data: news })
        }
        throw new Error("آیتمی یافت نشد")
    } catch (err) {
        res.status(500).json({ error: err.message || "خطایی رخ داده است" })
    }
}

export const getPopularNews = async (req, res) => {

    try {
        const news = await News.findAll({
            limit: 3,
            order: [['numViews', 'DESC']],
            include: [{
                model: Users,
                attributes: ['id', 'name', 'email', 'url']
            }]
        })

        res.status(200).json({ data: news })

    } catch (err) {
        res.status(500).json({ error: err.message || "خطایی رخ داده است" })
    }
}

export const getCategoryNews = async (req, res) => {

    try {
        const hasCategory = req.query.cat
        const news = hasCategory ?
            await News.findAll({
                where: { catId: hasCategory },
                order: ['id', 'DESC']
            }) :
            await News.findAll({ order: ['id', "DESC"] })

        res.status(200).json({ data: news })
    } catch (err) {
        res.status(500).json({ error: err.message || "خطایی رخ داده است" })
    }
}


