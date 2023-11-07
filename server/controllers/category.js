import Category from "../models/categoryModels.js";

const error = new Error()

// start ********************************************
export const getCategoryHome = async (req, res, next) => {
    try {
        const categories = await Category.findAll({})
        res.status(200).json({ categories })
    } catch (err) {
        next(err)
    }
}
// end ********************************************


// start ********************************************
export const getCategory = async (req, res, next) => {
    try {
        const categories = await Category.findAll({})
        res.status(200).json({ categories })

    } catch (err) {
        next(err)
    }
}
// end ********************************************

// start ********************************************
export const createCategory = async (req, res, next) => {
    console.log(req.body);
    const { name } = req.body

    try {
        const category = await Category.create({
            name: name
        })
        res.status(200).json({ message: "دسته بندی افزوده شد", data: category })

    } catch (err) {
        next(err)
    }
}
// end ********************************************

// start ********************************************
export const updateCategory = async (req, res, next) => {

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
        error.status = 501
        error.message = err
        next(error)
    }
}
// end ********************************************

// start ********************************************
export const deleteCategory = async (req, res, next) => {

    try {
        const category = await Category.destroy({ where: { id: req.params.id } })
        if (category) {
            return res.status(200).json({
                message: "عملیات با موفقیت انجام شد"
            })
        }
        error.message = "خطا ! عملیات انجام نشد"
        error.statusCode = 501
        return next(error)

    } catch (err) {
        next(err)
    }
}
// end ********************************************