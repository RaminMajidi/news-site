import React, { useContext } from 'react'
import Dashbord from '../../Dashbord'
import { useFormik } from "formik"
import { formSchema } from './core'
import { AdminContext } from '@src/admin/context/context'
import { useLocation, useParams } from 'react-router-dom'
import BtnPrevPage from '@src/components/Btns/BtnPrevPage'
import BtnSubmit from "@src/components/Btns/BtnSubmit"
import Input from '@src/components/formInputs/Input'

const AddOrEditCategory = () => {
    const { id } = useParams()
    const { state } = useLocation()
    const { addCategory, editCategory } = useContext(AdminContext)

    // start ***************************************
    const formik = useFormik({
        initialValues: {
            id: id || null,
            name: state?.name || "",
        },
        onSubmit: (values) => {
            if (values.id) {
                editCategory(values)
            } else {
                addCategory(values)
            }
        },
        validationSchema: formSchema
    })
    // end **********


    return (
        <Dashbord title={id ? "ویرایش دسته بندی" : "افزودن دسته بندی"}>
            <BtnPrevPage />
            <form onSubmit={formik.handleSubmit}>
                <Input
                    label={"عنوان خبر"}
                    value={formik.values.name}
                    onChange={formik.handleChange('name')}
                    onBlur={formik.handleBlur('name')}
                    name='name'
                    type="text"
                    placeholder='مثال *  اجتماعی یا ورزشی'
                    errorCondition={formik.touched.name}
                    errorMessage={formik.errors.name}
                />
                <BtnSubmit />
            </form>
        </Dashbord>
    )
}

export default AddOrEditCategory