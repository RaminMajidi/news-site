import Dashbord from "../../Dashbord"
import BtnPrevPage from "@src/components/Btns/BtnPrevPage"
import BtnSubmit from '@src/components/Btns/BtnSubmit'
import Input from '@src/components/formInputs/Input'
import Select from '@src/components/formInputs/Select'
import { formSchema, userRols } from "./core"
import { useFormik } from "formik"
import { useContext, useEffect, useState } from "react"
import { AdminContext } from "../../../context/context"
import { useLocation, useParams } from "react-router-dom"

const AddOrEditUser = () => {
    const { id } = useParams()
    const { state } = useLocation()
    const { addNewUser, updateUser } = useContext(AdminContext)

    // start ***************************
    const formik = useFormik({
        initialValues: {
            name: state?.name || '',
            email: state?.email || '',
            isAdmin: state?.isAdmin ? 1 : 0,
            password: "",
            confPassword: "",
        },
        onSubmit: (values) => {
            if (state && id) {
                updateUser(values, id);
            } else {
                addNewUser(values)
            }
        },
        validationSchema: formSchema
    })
    // end ***************************




    return (
        <Dashbord title={state ? "ویرایش کاربر" : "افزودن کاربر جدید"}>
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
                    label="ایمیل"
                    value={formik.values.email}
                    onChange={formik.handleChange('email')}
                    onBlur={formik.handleBlur('email')}
                    name='email'
                    type="email"
                    placeholder="مثال * example@gmail.com"
                    errorCondition={formik.touched.email}
                    errorMessage={formik.errors.email}
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
                {userRols &&
                    <Select
                        label="نقش کاربر"
                        value={formik.values.isAdmin}
                        onChange={formik.handleChange('isAdmin')}
                        onBlur={formik.handleBlur('isAdmin')}
                        name="isAdmin"
                        errorCondition={formik.touched.isAdmin}
                        errorMessage={formik.errors.isAdmin}
                        optionList={userRols}
                    />

                }


                <BtnSubmit />
            </form>

        </Dashbord>
    )
}

export default AddOrEditUser