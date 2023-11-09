import "./Contact.css"
import Layout from "./Layout"
import contactImg from "@src/assets/images/contact.webp"
import Input from '@src/components/formInputs/Input'
import Textarea from '@src/components/formInputs/Textarea'
import BtnSubmit from "@src/components/btns/BtnSubmit"
import * as Yup from 'yup'
import { useFormik } from "formik"
import { useContext, useState } from "react"
import { HomeContext } from "../context/context"
import BtnLoading from "../components/Btns/BtnLoading"


const formSchema = Yup.object({
    email: Yup.string()
        .required('ایمیل الزامی است')
    ,
    subject: Yup.string()
        .required('عنوان الزامی است')
    ,
    message: Yup.string()
        .required('پیام الزامی است')
})

const Contact = () => {

    const { sendEmailHandler } = useContext(HomeContext)
    const [isLoading, setIsloading] = useState(false)

    // start ********************
    const formik = useFormik({
        initialValues: {
            email: "",
            subject: "",
            message: ""
        },
        onSubmit: (values) => {
            sendEmailHandler(values,setIsloading);
        },
        validationSchema: formSchema
    })
    // end ********************



    return (
        <Layout>
            <div className="contact pt-5">
                <div className="container">
                    <div className="columns">
                        <div className="column contact_image has-background-white">
                            <img src={contactImg} alt="" />
                        </div>
                        <div className="column has-background-white">
                            <h1 className="title mb-5">ارتباط با ما</h1>
                            <div className="phone-number mb-5 is-size-6 is-flex">
                                <box-icon name='phone' color='#008fff' size="sm"></box-icon>
                                <span>تلفن تماس : </span>
                                <span>03187654321</span>
                            </div>
                            <form onSubmit={formik.handleSubmit} className='lable_black'>
                                <Input
                                    label="ایمیل شما"
                                    value={formik.values.email}
                                    onChange={formik.handleChange('email')}
                                    onBlur={formik.handleBlur('email')}
                                    name='email'
                                    type="email"
                                    placeholder="exampel2gmail.com"
                                    errorCondition={formik.touched.email}
                                    errorMessage={formik.errors.email}
                                />
                                <Input
                                    label="موضوع ایمیل"
                                    value={formik.values.subject}
                                    onChange={formik.handleChange('subject')}
                                    onBlur={formik.handleBlur('subject')}
                                    name='subject'
                                    type="text"
                                    placeholder="موضوع"
                                    errorCondition={formik.touched.subject}
                                    errorMessage={formik.errors.subject}
                                />

                                <Textarea
                                    label="متن پیام شما"
                                    value={formik.values.message}
                                    onChange={formik.handleChange('message')}
                                    onBlur={formik.handleBlur('message')}
                                    className='textarea has-background-grey-lighter'
                                    placeholder='متن ایمیل شما'
                                    errorCondition={formik.touched.message}
                                    errorMessage={formik.errors.message}
                                />
                                {isLoading ? (
                                    <BtnLoading />
                                ) : (
                                    <BtnSubmit text="ارسال" />
                                )
                                }

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Contact