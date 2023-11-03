import Dashbord from '../../../Dashbord'
import { formSchema } from "./core"
import { useFormik } from "formik"
import { useContext, useState } from "react"
import { AdminContext } from "../../../../context/context"
import { useParams } from 'react-router-dom'
import BtnPrevPage from "@src/components/Btns/BtnPrevPage"
import BtnSubmit from '@src/components/Btns/BtnSubmit'
import Input from '@src/components/formInputs/Input'
import InputFile from '@src/components/formInputs/InputFile'

const ProfileUpdate = () => {
    const { id } = useParams()

    const { userData, updateProfile } = useContext(AdminContext)
    const [file, setFile] = useState(null)
    const [preview, setPreview] = useState(userData?.url || "")



    // start ***************************
    const loadImage = (e) => {
        const image = e.target.files[0]
        if (image) {
            setFile(image)
            setPreview(URL.createObjectURL(image))
        } else {
            setFile(null)
            setPreview(userData?.url || "")
        }

    }
    // end ***************************



    // start ***************************
    const formik = useFormik({
        initialValues: {
            name: userData?.name || "",
            password: "",
            confPassword: "",
            file: null
        },
        onSubmit: (values) => {
            const data = {
                ...values,
                file: file
            }
            updateProfile(data,id);
        },
        validationSchema: formSchema
    })
    // end ***************************


    return (
        <Dashbord title="ویرایش پروفایل">
            <BtnPrevPage />
            <form onSubmit={formik.handleSubmit}>
                <Input
                    label="نام"
                    value={formik.values.name}
                    onChange={formik.handleChange('name')}
                    onBlur={formik.handleBlur('name')}
                    name='name'
                    type="text"
                    placeholder='مثال * رامین مجیدی'
                    errorCondition={formik.touched.name}
                    errorMessage={formik.errors.name}
                />

                <Input
                    label="پسورد"
                    value={formik.values.password}
                    onChange={formik.handleChange('password')}
                    onBlur={formik.handleBlur('password')}
                    name='password'
                    type="password"
                    placeholder="password"
                    errorCondition={formik.touched.password}
                    errorMessage={formik.errors.password}
                />

                <Input
                    label="تکرار پسورد"
                    value={formik.values.confPassword}
                    onChange={formik.handleChange('confPassword')}
                    onBlur={formik.handleBlur('confPassword')}
                    name='confPassword'
                    type="Password"
                    placeholder="password"
                    errorCondition={formik.touched.confPassword}
                    errorMessage={formik.errors.confPassword}
                />
                <InputFile
                    onChange={loadImage}
                    preview={preview}
                />

                <BtnSubmit />
            </form>
        </Dashbord>
    )
}

export default ProfileUpdate