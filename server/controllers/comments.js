import Comments from "../models/commentModel.js";


export const getAllComment = async (req, res) => {

    try {
        const comments = await Comments.findAll({})
        res.status(200).json({ data: comments })
    } catch (err) {
        res.json({ error: err.message || 'خطایی رخ داده است' })
    }
}

export const createComment = async (req, res) => {

    const { newsId, description, name, email, subject } = req.body

    try {
        await Comments.create({
            newsId,
            description,
            name,
            email,
            subject
        })

        res.status(200).json({ message: "نظر شما ثبت شد و بعد از تایید مدیریت قابل مشاهده خواهد بود" })
    } catch (err) {
        res.json({ error: err.message || 'خطایی رخ داده است' })
    }
}


export const updateComment = async (req, res) => {

    const { description, name, subject } = req.body
    try {
        const comment = await Comments.update({
            description,
            name,
            subject
        },
            {
                where: { id: req.params.id }
            })

        if (comment == 1) {
            return res.status(200).json({ message: 'عملیات با موفقیت انجام شد', data: comment })
        }
        const error = new Error()
        error.message = "آیتمی یافت نشد ، عملیات ناموفق"
        error.status = 404
        throw error

    } catch (err) {
        res.status(err.status || 500).json({ error: err.message || 'خطایی رخ داده است' })
    }
}


export const deleteComment = async (req, res) => {
    try {
        const comment = await Comments.destroy({ where: { id: req.params.id } })
        if (comment) {
            return res.status(200).json({ message: "عملیات با موفقیت انجام شد", data: comment })
        }
        const error = new Error()
        error.message = "آیتمی یافت نشد ، عملیات ناموفق"
        error.status = 404
        throw error
    } catch (err) {
        res.status(err.status || 500).json({ error: err.message || 'خطایی رخ داده است' })
    }
}

export const activeComment = async (req, res) => {

    const { isActive } = req.body
    try {
        const comment = await Comments.update({ isActive: isActive },
            {
                where: { id: req.params.id }
            })
        if (comment == 1) {
            return res.status(200).json({ message: "عملیات با موفقیت انجام شد" })
        }
        const error = new Error()
        error.message = "آیتمی یافت نشد ، عملیات ناموفق"
        error.status = 404
        throw error
    } catch (err) {
        res.status(err.status || 500).json({ error: err.message || 'خطایی رخ داده است' })
    }
}

export const getNewsComment = async (req, res) => {

    try {
        const newsId = req.params.newsId
        const comments = await Comments.findAll({ where: { newsId: newsId } })
        res.status(200).json({ data: comments })

    } catch (err) {
        res.status(err.status || 500).json({ error: err.message || 'خطایی رخ داده است' })
    }
}

