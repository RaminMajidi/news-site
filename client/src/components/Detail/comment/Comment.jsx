import Input from '@src/components/formInputs/Input'
import Textarea from '@src/components/formInputs/Textarea'
import BtnSubmit from "@src/components/btns/BtnSubmit"
import { useFormik } from "formik"
import ViewComment from './ViewComment'
import { useParams } from "react-router-dom"
import { useContext, useState } from 'react'
import { HomeContext } from '@src/context/context'
import { formSchema } from './core'
import BtnLoading from "@src/components/Btns/BtnLoading"


const Comment = () => {

    const { id } = useParams()
    const { createComment } = useContext(HomeContext)
    const [isLoading, setIsloading] = useState(false)

    // start ********************
    const formik = useFormik({
        initialValues: {
            newsId: id,
            description: "",
            name: "",
            email: "",
        },
        onSubmit: (values, formik) => {
            createComment(values, formik,setIsloading)
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
                        value={formik.values.description}
                        onChange={formik.handleChange('description')}
                        onBlur={formik.handleBlur('description')}
                        className='textarea has-background-grey-lighter'
                        placeholder='متن نظر شما'
                        errorCondition={formik.touched.description}
                        errorMessage={formik.errors.description}
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
                    {isLoading ? (
                        <BtnLoading />
                    ) : (
                        <BtnSubmit text="ارسال" />
                    )
                    }
                </form>
            </article>
            <ViewComment />
        </>
    )
}

export default Comment