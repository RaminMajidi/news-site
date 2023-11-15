const Video = require("../models/videoModel");
const path = require('path')
const fs = require('fs')


const error = new Error()

// start ********************************************
async function getAllVideo(req, res, next) {

    try {
        const videos = await Video.findAll({});
        res.status(200).json({ videos })

    } catch (err) {
        next(err)
    }
}
// end ********************************************


// start ********************************************
async function createVideo(req, res, next) {

    if (req.files == null) {
        error.message = 'فایل ویدیو الزامی است'
        error.statusCode = 406
        return next(error)
    }

    const file = req.files.file
    const fileSize = file.data.length
    const ext = path.extname(file.name)
    let dateNow = Math.round(Date.now())
    const fileName = dateNow + ext
    const url = `${req.protocol}://${req.get('host')}/videos/${fileName}`;
    const allowedType = ['.mp4']

    if (!allowedType.includes(ext.toLowerCase())) {
        error.message = 'فرمت فایل نامعتبر است فقط فرمت * .mp4'
        error.statusCode = 406
        return next(error)
    }

    if (fileSize > 10000000) {
        error.message = 'حجم ویدیو نباید بیشتر از 10 مگابایت باشد'
        error.statusCode = 406
        return next(error)
    }

    file.mv(`./public/videos/${fileName}`, (err) => {
        if (err) {
            error.message = err
            error.statusCode = 501
            return next(error)
        }
    })
    try {
        const video = await Video.create({ video: fileName, url: url })
        res.status(200).json({ message: "عملیات با موفقیت انجام شد", data: video })

    } catch (err) {
        next(err)
    }

}
// end ********************************************

// start ********************************************
async function getSingleVideo(req, res, next) {

    try {
        // ASC or DESC
        const video = await Video.findOne({ order: [['createdAt', 'DESC']] })
        res.status(200).json({ video })

    } catch (err) {
        next(err)
    }
}
// end ********************************************

// start ********************************************
async function deleteVideo(req, res, next) {

    const video = await Video.findOne({ where: { id: req.params.id } })
    if (!video) {
        error.statusCode = 404
        error.message = "ویدیو یافت نشد"
        return next(error)
    }

    try {
        const filePath = `./public/videos/${video.video}`
        fs.unlinkSync(filePath)
        await Video.destroy({ where: { id: req.params.id } })
        res.status(201).json({ message: "عملیات حذف با موفقیت انجام شد", data: video })

    } catch (err) {
        next(err)
    }
}
// end ********************************************

module.exports = {
    getAllVideo,
    getSingleVideo,
    createVideo,
    deleteVideo
}