import Input from '@src/components/formInputs/Input'
import Textarea from '@src/components/formInputs/Textarea'
import BtnSubmit from "@src/components/btns/BtnSubmit"
import * as Yup from 'yup'
import { useFormik } from "formik"
import ViewComment from './ViewComment'


const formSchema = Yup.object({
    comment: Yup.string()
        .required('پر کردن فیلد الزامی است')
    ,
    name: Yup.string()
        .required('پر کردن فیلد الزامی است')
    ,
    email: Yup.string()
        .email("لطفا فرمت ایمیل را رعایت کنید")
        .required('پر کردن فیلد الزامی است')
    ,
    subject: Yup.string()
        .required('پر کردن فیلد الزامی است')

})


const Comment = () => {


    // start ********************
    const formik = useFormik({
        initialValues: {
            comment: "",
            name: "",
            email: "",
            subject: ""
        },
        onSubmit: (values) => {
            console.log(values);
        },
        validationSchema: formSchema
    })
    // end ********************


    return (
        <>
            <article className='my-6 '>
                <form className='lable_black ' onSubmit={formik.handleSubmit}>
                    <Textarea
                        label="نظر شما"
                        value={formik.values.comment}
                        onChange={formik.handleChange('comment')}
                        onBlur={formik.handleBlur('comment')}
                        className='textarea has-background-grey-lighter'
                        placeholder='متن نظر شما'
                        errorCondition={formik.touched.comment}
                        errorMessage={formik.errors.comment}
                    />
                    <div className='columns'>
                        <div className="column">
                            <Input
                                label="نام شما"
                                value={formik.values.name}
                                onChange={formik.handleChange('name')}
                                onBlur={formik.handleBlur('name')}
                                name='name'
                                type="text"
                                placeholder="مثال * رامین "
                                errorCondition={formik.touched.name}
                                errorMessage={formik.errors.name}
                            />
                        </div>

                        <div className="column">
                            <Input
                                label="ایمیل شما"
                                value={formik.values.email}
                                onChange={formik.handleChange('email')}
                                onBlur={formik.handleBlur('email')}
                                name='email'
                                type="email"
                                placeholder="مثال * exampel@gmail.com "
                                errorCondition={formik.touched.email}
                                errorMessage={formik.errors.email}
                            />
                        </div>
                    </div>

                    <Input
                        label="موضوع"
                        value={formik.values.subject}
                        onChange={formik.handleChange('subject')}
                        onBlur={formik.handleBlur('subject')}
                        name='subject'
                        type="text"
                        placeholder="مثال * عنوان "
                        errorCondition={formik.touched.subject}
                        errorMessage={formik.errors.subject}
                    />
                    <BtnSubmit text="ارسال" />
                </form>
            </article>
            <ViewComment />
        </>
    )
}

export default Comment