import { Link } from "react-router-dom"
import "./Sidbar.css"
import logo from '@src/assets/images/logo.png'
import { useState } from "react"
const Sidbar = () => {

    const [showNews, setShowNews] = useState(false)

    return (
        <div className='sidbar has-background-dark pt-6 '>
            <div className="logo mb-5 has-text-centered">
                <img
                    className="navbar-logo"
                    src={logo}
                    alt="logo" />
            </div>
            <ul>
                <li className="">
                    <Link
                        className=""
                        to={'/main'}>
                        داشبورد
                    </Link>
                </li>

                <li className="">
                    <span onClick={() => setShowNews(!showNews)} >اخبار</span>
                    {showNews &&
                        <ul >
                            <li>
                                <Link
                                    className=""
                                    to={'/add-news'}>
                                    افزودن خبر
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className=""
                                    to={'/view-news'}>
                                    مشاهده خبر
                                </Link>
                            </li>
                        </ul>
                    }

                </li>

                <li className="">
                    <Link
                        className=""
                        to={''}>
                        دسته بندی
                    </Link>
                </li>

                <li className="">
                    <Link
                        className=""
                        to={''}>
                        ویدیو
                    </Link>
                </li>

                <li className="">
                    <Link
                        className=""
                        to={''}>
                        کاربران
                    </Link>
                </li>

                <li className="">
                    <Link
                        className=""
                        to={''}>
                        نظرات
                    </Link>
                </li>

                <li className="">
                    <Link
                        className=""
                        to={''}>
                        خروج
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Sidbar