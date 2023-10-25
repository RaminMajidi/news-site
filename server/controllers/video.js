import Video from "../models/videoModel.js";
import path from 'path'
import fs from 'fs'

export const getAllVideo = async (req, res) => {

    try {
        const videos = await Video.findAll({});
        res.status(200).json({ data: videos })

    } catch (err) {
        res.status(503).json({ error: "عملیات با خطا مواجه شد" })
    }
}

export const createVideo = async (req, res) => {

    if (req.files == null) {
        return res.status(401).json({ message: 'فایل ویدیو الزامی است' })
    }

    const file = req.files.file
    const fileSize = file.data.length
    const ext = path.extname(file.name)
    let dateNow = Math.round(Date.now())
    const fileName = dateNow + ext
    const url = `${req.protocol}://${req.get('host')}/videos/${fileName}`;
    const allowedType = ['.mp4']

    if (!allowedType.includes(ext.toLowerCase())) {
        return res.status(401).json({ message: 'فرمت فایل نامعتبر است فقط فرمت * .mp4' })
    }
    if (fileSize > 10000000) {
        return res.status(401).json({ message: 'حجم ویدیو نباید بیشتر از 10 مگابایت باشد' })
    }

    file.mv(`./public/videos/${fileName}`, async (err) => {
        if (err) return res.status(500).json({ error: err.message })

        try {
            const video = await Video.create({ video: fileName, url: url })
            res.status(200).json({ message: "عملیات با موفقیت انجام شد", data: video })

        } catch (err) {
            res.status(503).json({ error: "عملیات با خطا مواجه شد" })
        }
    })

}

export const getSingleVideo = async (req, res) => {

    try {
        // ASC or DESC
        const video = await Video.findOne({ order: [['createdAt', 'DESC']] })
        res.status(200).json({ data: video })

    } catch (err) {
        res.status(503).json({ error: "عملیات با خطا مواجه شد" })
    }
}

export const deleteVideo = async (req, res) => {

    const video = await Video.findOne({ where: { id: req.params.id } })
    if (!video) {
        return res.status(403).json({ error: "ویدیو یافت نشد" })
    }

    try {
        const filePath = `./public/videos/${video.video}`
        fs.unlinkSync(filePath)
        await Video.destroy({ where: { id: req.params.id } })
        res.status(201).json({ message: "عملیات حذف با موفقیت انجام شد", data: video })

    } catch (err) {
        res.status(503).json({ error: "عملیات با خطا مواجه شد" })
    }
}

