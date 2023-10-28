import "./Login.css"
import { useFormik } from "formik"
import { LoginFormSchema } from "./core"
import HelpMessage from "../../components/HelpMessage"
import { useContext } from "react"
import { AdminContext } from "../context/context"



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
                                <h1 className="tile has-text-centered mb-5 has-text-grey-lighter">
                                    ورود به پنل مدیریت
                                </h1>
                                <div className="field ">
                                    <label className="label has-text-grey-light">ایمیل</label>
                                    <div className="field">
                                        <p className="control has-icons-left ">
                                            <input
                                                value={formik.values.email}
                                                onChange={formik.handleChange('email')}
                                                onBlur={formik.handleBlur('email')}
                                                name="email"
                                                className="input"
                                                type="email"
                                                placeholder="Email"
                                            />
                                            <span className="icon is-small is-left">
                                                <box-icon name='envelope'></box-icon>
                                            </span>
                                        </p>
                                        <HelpMessage textColor={'has-text-danger'}>
                                            {formik.touched.email && formik.errors.email}
                                        </HelpMessage>
                                    </div>
                                    <div className="field">
                                        <label className="label has-text-grey-light">رمز عبور</label>
                                        <p className="control has-icons-left">
                                            <input
                                                value={formik.values.password}
                                                onChange={formik.handleChange('password')}
                                                onBlur={formik.handleBlur('password')}
                                                name="password"
                                                className="input"
                                                type="password"
                                                placeholder="Password"
                                            />
                                            <span className="icon is-small is-left">
                                                <box-icon name='lock-alt'></box-icon>
                                            </span>
                                        </p>
                                        <HelpMessage textColor={'has-text-danger'}>
                                            {formik.touched.password && formik.errors.password}
                                        </HelpMessage>
                                    </div>
                                    <div className="field mt-5">
                                        <button
                                            type="submit"
                                            className="button is-info is-fullwidth">
                                            ورود
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login