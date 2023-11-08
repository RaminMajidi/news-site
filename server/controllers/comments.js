import Comments from "../models/commentModel.js";

const error = new Error()

// start ********************************************
export const getAllComment = async (req, res, next) => {

    try {
        const comments = await Comments.findAll({})
        res.status(200).json({ comments })
    } catch (err) {
        next(err)
    }
}
// end ********************************************

// start ********************************************
export const createComment = async (req, res, next) => {

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
        next(err)
    }
}
// end ********************************************


// start ********************************************
export const deleteComment = async (req, res, next) => {
    try {
        const comment = await Comments.destroy({ where: { id: req.params.id } })
        if (comment) {
            return res.status(200).json({ message: "عملیات حذف با موفقیت انجام شد" })
        }
        error.message = "آیتمی یافت نشد ، عملیات ناموفق"
        error.status = 404
        return next(error)
    } catch (err) {
        next(err)
    }
}
// end ********************************************

// start ********************************************
export const activeComment = async (req, res, next) => {

    const { isActive } = req.body
    try {
        const comment = await Comments.update({ isActive: isActive },
            {
                where: { id: req.params.id }
            })
        if (comment == 1) {
            return res.status(200).json({ message: "عملیات با موفقیت انجام شد" })
        }
        error.message = "عملیات ناموفق"
        error.status = 404
        return next(error)

    } catch (err) {
        next(err)
    }
}
// end ********************************************

// start ********************************************
export const getNewsComment = async (req, res, next) => {

    try {
        const newsId = req.params.newsId
        const comments = await Comments.findAll({
            where: { newsId: newsId, isActive: true }
        })
        res.status(200).json({ comments })

    } catch (err) {
        next(err)
    }
}
// end ********************************************

