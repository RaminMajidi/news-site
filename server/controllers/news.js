const News = require("../models/newsModel");
const path = require('path')
const fs = require('fs')
const Category = require("../models/categoryModels");
const Users = require("../models/userModel");


const error = new Error()

// start ********************************************
async function getNews(req, res, next) {
    try {
        const news = await News.findAll({
            include: [{
                model: Users,
                attributes: ['name']
            }]
        })
        res.status(200).json({ news })
    } catch (err) {
        next(err)
    }
}
// end **********************************************

// start ********************************************
async function createNews(req, res, next) {
    if (req.files == null) {
        error.message = "انتخاب عکس الزامی است"
        error.statusCode = 406
        return next(error)
    }

    const { title, desc, categoryId, userId } = req.body;
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
        error.statusCode = 406
        error.message = 'حجم عکس نباید بیشتر از 1 مگابایت باشد'
        return next(error)
    }

    file.mv(`./public/images/${fileName}`, async (err) => {
        if (err) {
            error.message = err
            error.statusCode = 501
            return next(error)
        }

        try {
            const news = await News.create({
                title: title,
                categoryId: categoryId,
                userId: userId,
                desc: desc,
                image: fileName,
                url: url
            })

            res.status(200).json({ message: "عملیات با موفقیت انجام شد", data: news })
        } catch (err) {
            next(err)
        }
    })
}
// end ********************************************

// start ********************************************
async function getNewsById(req, res, next) {

    try {
        const news = await News.findOne({
            where: { id: req.params.id },
            include: [{
                model: Users,
                attributes: ['id', 'name', 'email', 'url']
            }]
        })
        if (!news) {
            error.message = "آیتمی یافت نشد"
            error.statusCode = 404
            return next(error)
        }
        res.status(200).json({ news })

    } catch (err) {
        next(err)
    }
}
// end ********************************************


// start ********************************************
async function updateNews(req, res, next) {

    const news = await News.findOne({ where: { id: req.params.id } })

    if (!news) {
        error.statusCode = 404
        error.message = "دیتایی یافت نشد"
        return next(error)
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
            if (err) {
                error.message = err
                error.statusCode = 501
                return next(error)
            }
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
        next(err)
    }
}
// end ********************************************


// start ********************************************
async function deleteNews(req, res, next) {

    const id = req.params.id
    const news = await News.findByPk(id)
    if (!news) {
        error.message = "آیتمی یافت نشد"
        error.statusCode = 404
        return next(error)
    }

    try {
        const filePath = `./public/images/${news.image}`
        fs.unlinkSync(filePath)
        await News.destroy({ where: { id: id } })
        res.status(200).json({ message: 'عملیات با موفقیت انجام شد' })
    } catch (err) {
        next(err)
    }
}
// end ********************************************

// start ********************************************
async function getLastnews(req, res, next) {

    try {
        const news = await News.findAll({
            limit: 2,
            order: [['id', 'DESC']],
            include: [Category],
        })
        res.status(200).json({ news })
    } catch (err) {
        next(err)
    }
}
// end ********************************************

// start ********************************************
async function getDetailNews(req, res, next) {

    try {
        const news = await News.findOne({ where: { id: req.params.id } })
        if (news) {
            const numViews = news.numViews + 1;
            await News.update({ numViews }, { where: { id: req.params.id } })
            return res.status(200).json({ news })
        }
        error.message = "آیتمی یافت نشد"
        error.statusCode = 404
        return next(error)
    } catch (err) {
        next(error)
    }
}
// end ********************************************

// start ********************************************
async function getPopularNews(req, res, next) {

    try {
        const news = await News.findAll({
            limit: 3,
            order: [['numViews', 'DESC']],
            include: [{
                model: Users,
                attributes: ['id', 'name', 'email', 'url']
            }]
        })

        res.status(200).json({ news })

    } catch (err) {
        next(err)
    }
}
// end ********************************************

// start ********************************************
async function getCategoryNews(req, res, next) {

    try {
        const hasCategory = req.query.cat
        const news = hasCategory ?
            await News.findAll({
                limit: 4,
                where: { categoryId: hasCategory },
                order: ['id', 'DESC']
            }) :
            await News.findAll({
                limit: 4,
                order: ['id', "DESC"]
            })

        res.status(200).json({ news })
    } catch (err) {
        next(err)
    }
}
// end ********************************************

module.exports = {
    getCategoryNews,
    getDetailNews,
    getPopularNews,
    getLastnews,
    getNews,
    getNewsById,
    createNews,
    deleteNews,
    updateNews
}