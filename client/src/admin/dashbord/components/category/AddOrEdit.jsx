import React, { useContext } from 'react'
import Dashbord from '../../Dashbord'
import { useFormik } from "formik"
import { formSchema } from './core'
import HelpMessage from '@src/components/HelpMessage'
import { AdminContext } from '@src/admin/context/context'
import { useLocation, useParams } from 'react-router-dom'

const AddOrEdit = () => {
    const { id } = useParams()
    const { state } = useLocation()
    const { addCategory, editCategory } = useContext(AdminContext)


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
    // end ***************************************


    return (
        <Dashbord title={id ? "ویرایش دسته بندی" : "افزودن دسته بندی"}>
            <form onSubmit={formik.handleSubmit} className='container'>
                <div className="field ">
                    <label className='label has-text-light'>عنوان خبر</label>
                    <div className="control ">
                        <input
                            value={formik.values.name}
                            onChange={formik.handleChange('name')}
                            onBlur={formik.handleBlur('name')}
                            name='name'
                            className='input has-background-grey-lighter'
                            type="text"
                            placeholder='مثال *  اجتماعی یا ورزشی'
                        />
                    </div>
                    <HelpMessage textColor={'has-text-danger'}>
                        {formik.touched.name && formik.errors.name}
                    </HelpMessage>
                </div>

                <div className="field">
                    <div className="control">
                        <button
                            type='submit'
                            className='button is-success px-6 mt-6'
                        >ثبت</button>
                    </div>
                </div>
            </form>
        </Dashbord>
    )
}

export default AddOrEdit