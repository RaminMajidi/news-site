import "./Login.css"
import { useFormik } from "formik"
import { LoginFormSchema } from "./core"
import { useContext } from "react"
import { AdminContext } from "../context/context"
import Input from "@src/components/formInputs/Input"
import BtnSubmit from "@src/components/btns/BtnSubmit"



const Login = () => {

    const { login } = useContext(AdminContext)

    // start ********************
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        onSubmit: (values) => {
            login(values);
        },
        validationSchema: LoginFormSchema
    })
    // end ********************



    return (
        <section className="hero has-background-grey-light is-fullheight is-fullwidth">
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered ">
                        <div className="column is-4 ">
                            <form
                                onSubmit={formik.handleSubmit}
                                className="box has-background-black-ter is-rounded ">
                                <h3 className="tile has-text-centered mb-5 has-text-grey-lighter">
                                    ورود به پنل مدیریت
                                </h3>
                                <Input
                                    label="ایمیل"
                                    value={formik.values.email}
                                    onChange={formik.handleChange('email')}
                                    onBlur={formik.handleBlur('email')}
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                    errorCondition={formik.touched.email}
                                    errorMessage={formik.errors.email}
                                />
                                <Input
                                    label="رمز عبور"
                                    value={formik.values.password}
                                    onChange={formik.handleChange('password')}
                                    onBlur={formik.handleBlur('password')}
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    errorCondition={formik.touched.password}
                                    errorMessage={formik.errors.password}
                                />
                                <BtnSubmit />
                            </form>
                        </div>
                    </div>
                </div >
            </div >
        </section >
    )
}

export default Login