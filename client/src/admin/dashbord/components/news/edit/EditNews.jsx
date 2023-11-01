import React, { useContext, useEffect, useState } from 'react'
import Dashbord from '@src/admin/dashbord/Dashbord'
import { useFormik } from "formik"
import { formSchema, initialValues } from './core'
import HelpMessage from '@src/components/HelpMessage'
import { AdminContext } from '@src/admin/context/context'
import { useParams } from 'react-router-dom'

const EditNews = () => {
    const { id } = useParams()
    const { categoryList, getCategory, getNewsById, singleNews } = useContext(AdminContext)
    const [file, setFile] = useState([])
    const [preview, setPreview] = useState("")

    const loadImage = (e) => {
        const image = e.target.files[0]
        setFile(image)
        setPreview(URL.createObjectURL(image))
    }

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: (values) => {
            const data = {
                ...values,
                file: file
            }
            createNews(data)
        },
        validationSchema: formSchema
    })

    console.log(singleNews);

    useEffect(() => {
        getCategory()
        getNewsById(id)

    }, [])

    return (
        <Dashbord>
            <form onSubmit={formik.handleSubmit} className='container'>
                <div className="field ">
                    <label className='label has-text-light'>عنوان خبر</label>
                    <div className="control ">
                        <input
                            value={formik.values.title}
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
                            value={formik.values.desc}
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
                                value={formik.values.catId}
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
        </Dashbord>
    )
}

export default EditNews