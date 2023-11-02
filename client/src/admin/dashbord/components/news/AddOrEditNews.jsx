import { useContext, useEffect, useState } from 'react'
import Dashbord from '@src/admin/dashbord/Dashbord'
import { useFormik } from "formik"
import { formSchema } from './core'
import { AdminContext } from '@src/admin/context/context'
import BtnPrevPage from "@src/components/Btns/BtnPrevPage"
import BtnSubmit from '@src/components/Btns/BtnSubmit'
import Input from '@src/components/formInputs/Input'
import Textarea from '@src/components/formInputs/Textarea'
import Select from '@src/components/formInputs/Select'
import InputFile from '@src/components/formInputs/InputFile'
import { useLocation, useParams } from 'react-router-dom'

const AddOrEditNews = () => {
    const { id } = useParams()
    const { state } = useLocation()
    const { categoryList, getCategory, createNews, editNews } = useContext(AdminContext)
    const [file, setFile] = useState([])
    const [preview, setPreview] = useState(state?.url || "")

    // start ***************************
    const loadImage = (e) => {
        const image = e.target.files[0]
        setFile(image)
        setPreview(URL.createObjectURL(image))
    }
    // end ***************************



    // start ***************************
    const formik = useFormik({
        initialValues: {
            id: id || null,
            title: state?.title || "",
            desc: state?.desc || "",
            catId: state?.catId || "",
            file: null
        },
        onSubmit: (values) => {
            const data = {
                ...values,
                file: file
            }
            if (values.id) {
                editNews(data)
            } else {
                createNews(data)
            }
        },
        validationSchema: formSchema
    })
    // end ***************************


    // start ***************************
    useEffect(() => {
        getCategory()
    }, [])
    // end ***************************

    return (
        <Dashbord title={"افزودن خبر"}>
            <BtnPrevPage />
            <form onSubmit={formik.handleSubmit}>
                <Input
                    label="عنوان خبر"
                    value={formik.values.title}
                    onChange={formik.handleChange('title')}
                    onBlur={formik.handleBlur('title')}
                    name='title'
                    type="text"
                    placeholder='مثال * خبر جدید'
                    errorCondition={formik.touched.title}
                    errorMessage={formik.errors.title}
                />
                <Textarea
                    value={formik.values.desc}
                    onChange={formik.handleChange('desc')}
                    onBlur={formik.handleBlur('desc')}
                    className='textarea has-background-grey-lighter'
                    placeholder='مثال * توضیح خبر جدید'
                    errorCondition={formik.touched.desc}
                    errorMessage={formik.errors.desc}
                />
                {categoryList &&
                    <Select
                        value={formik.values.catId}
                        onChange={formik.handleChange('catId')}
                        onBlur={formik.handleBlur('catId')}
                        className='has-background-grey-lighter'
                        errorCondition={formik.touched.catId}
                        errorMessage={formik.errors.catId}
                        optionList={categoryList}
                    />
                }
                <InputFile
                    onChange={loadImage}
                    preview={preview}
                />
                <BtnSubmit />
            </form>
        </Dashbord>
    )
}

export default AddOrEditNews