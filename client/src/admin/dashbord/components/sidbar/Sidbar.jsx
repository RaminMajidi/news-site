import { NavLink } from "react-router-dom"
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
                    <NavLink
                        className=""
                        to={'/main'}>
                        داشبورد
                    </NavLink>
                </li>

                <li className="">
                    <NavLink
                        className=""
                        to={'/view-news'}>
                        اخبار
                    </NavLink>
                </li>

                <li className="">
                    <NavLink
                        className=""
                        to={''}>
                        دسته بندی
                    </NavLink>
                </li>

                <li className="">
                    <NavLink
                        className=""
                        to={''}>
                        ویدیو
                    </NavLink>
                </li>

                <li className="">
                    <NavLink
                        className=""
                        to={''}>
                        کاربران
                    </NavLink>
                </li>

                <li className="">
                    <NavLink
                        className=""
                        to={''}>
                        نظرات
                    </NavLink>
                </li>

                <li className="">
                    <NavLink
                        className=""
                        to={''}>
                        خروج
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}

export default Sidbar