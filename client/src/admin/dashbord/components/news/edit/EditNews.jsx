import React, { useContext, useEffect, useState } from 'react'
import Dashbord from '@src/admin/dashbord/Dashbord'
import { useFormik } from "formik"
import { formSchema } from './core'
import HelpMessage from '@src/components/HelpMessage'
import { AdminContext } from '@src/admin/context/context'
import { useLocation, useParams } from 'react-router-dom'

const EditNews = () => {
    const { id } = useParams()
    const { state } = useLocation()
    const { categoryList, getCategory, getNewsById, editNews } = useContext(AdminContext)
    const [file, setFile] = useState([])
    const [preview, setPreview] = useState(state?.url || "")

    // start ***************************************
    const loadImage = (e) => {
        if (e.target.files[0]) {
            const image = e.target.files[0]
            setFile(image)
            setPreview(URL.createObjectURL(image))
        } else {
            setFile(null)
            setPreview(state?.url || "")
        }
    }
    // end ***************************************

    // start ***************************************
    const formik = useFormik({
        initialValues: {
            id: id,
            title: state?.title,
            desc: state?.desc,
            catId: state?.catId,
            file: null
        },
        onSubmit: (values) => {
            const data = {
                ...values,
                file: file
            }
            editNews(data)
        },
        validationSchema: formSchema
    })
    // end ***************************************

    useEffect(() => {
        getCategory()
        getNewsById(id)

    }, [])

    return (
        <Dashbord>
            <>
                {state &&
                    <form onSubmit={formik.handleSubmit} className='container'>
                        <div className="field ">
                            <label className='label has-text-light'>عنوان خبر</label>
                            <div className="control ">
                                <input
                                    defaultValue={state?.title}
                                    onChange={formik.handleChange('title')}
                                    onBlur={formik.handleBlur('title')}
                                    name='title'
                                    className='input has-background-grey-lighter'
                                    type="text"
                                    placeholder='مثال * خبر جدید'
                                />
                            </div>
                            <HelpMessage textColor={'has-text-danger'}>
                                {formik.touched.title && formik.errors.title}
                            </HelpMessage>
                        </div>

                        <div className="field">
                            <label className='label has-text-light'>متن خبر</label>
                            <div className="control">
                                <textarea
                                    defaultValue={state?.desc}
                                    onChange={formik.handleChange('desc')}
                                    onBlur={formik.handleBlur('desc')}
                                    className='textarea has-background-grey-lighter'
                                    placeholder='مثال * توضیح خبر جدید'></textarea>
                            </div>
                            <HelpMessage textColor={'has-text-danger'}>
                                {formik.touched.desc && formik.errors.desc}
                            </HelpMessage>
                        </div>

                        <div className="field">
                            <label className='label has-text-light'>دسته بندی خبر</label>
                            <div className="control">
                                <div className="select is-fullwidth ">
                                    <select
                                        defaultValue={state?.catId}
                                        onChange={formik.handleChange('catId')}
                                        onBlur={formik.handleBlur('catId')}
                                        className='has-background-grey-lighter'>
                                        <option >انتخاب کنید</option>
                                        {categoryList &&
                                            categoryList.map(item => (
                                                <option
                                                    key={item.id}
                                                    value={item.id}
                                                >
                                                    {item.name}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                            <HelpMessage textColor={'has-text-danger'}>
                                {formik.touched.catId && formik.errors.catId}
                            </HelpMessage>
                        </div>

                        <div className="field">
                            <label className='label has-text-light'> عکس خبر</label>
                            <div className="control ">
                                <input
                                    onChange={loadImage}
                                    type="file"
                                    className='input has-background-grey-lighter' />
                                {
                                    preview ? (
                                        <figure className='mt-3'>
                                            <img
                                                width={200}
                                                src={preview}
                                                alt="news_image"
                                            />
                                        </figure>
                                    ) : null
                                }
                            </div>
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
                }
            </>

        </Dashbord>
    )
}

export default EditNews