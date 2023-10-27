import "./Login.css"

const Login = () => {
    return (
        <section className="hero has-background-grey-light is-fullheight is-fullwidth">
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered ">
                        <div className="column is-4 ">
                            <form className="box has-background-black-ter is-rounded ">
                                <h1 className="tile has-text-centered mb-5 has-text-grey-lighter">
                                    ورود به پنل مدیریت
                                </h1>
                                <div className="field ">
                                    <label className="label has-text-grey-light">ایمیل</label>
                                    <div className="field">
                                        <p className="control has-icons-left ">
                                            <input
                                                className="input"
                                                type="email"
                                                placeholder="Email"
                                            />
                                            <span className="icon is-small is-left">
                                                <box-icon name='envelope'></box-icon>
                                            </span>
                                        </p>
                                    </div>
                                    <div className="field">
                                        <label className="label has-text-grey-light">رمز عبور</label>
                                        <p className="control has-icons-left">
                                            <input
                                                className="input"
                                                type="password"
                                                placeholder="Password"
                                            />
                                            <span className="icon is-small is-left">
                                                <box-icon name='lock-alt'></box-icon>
                                            </span>
                                        </p>
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