import Category from "../models/categoryModels.js";


export const getCategory = async (req, res) => {
    try {
        const categories = await Category.findAll({})
        res.status(200).json({ data: categories })

    } catch (err) {
        res.status(500).json({ error: err })
    }
}

export const createCategory = async (req, res) => {
    const { name } = req.body

    try {
        const category = await Category.create({
            name: name
        })
        res.status(200).json({ message: "دسته بندی افزوده شد", data: category })

    } catch (err) {
        console.log(err)
    }
}

export const updateCategory = async (req, res) => {

    const { name } = req.body
    try {
        await Category.update(
            { name: name },
            { where: { id: req.params.id } }
        )
        res.status(200).json({
            message: "عملیات با موفقیت انجام شد",
            data: { id: req.params.id, name: name }
        })

    } catch (err) {
        res.status(400).json({ message: "خطا ! عملیات انجام نشد" })
    }
}

export const deleteCategory = async (req, res) => {

    try {
        const category = await Category.destroy({ where: { id: req.params.id } })
        if (category) {
            return res.status(200).json({
                message: "عملیات با موفقیت انجام شد"
            })
        }
        res.status(400).json({ message: "خطا ! عملیات انجام نشد" })

    } catch (err) {
        res.status(500).json({ error: "خطا ! عملیات انجام نشد" })
    }
}