import { NavLink } from "react-router-dom"
import "./Sidbar.css"
import logo from '@src/assets/images/logo.png'
import { useContext } from "react"
import { AdminContext } from "../../../context/context"
const Sidbar = () => {

    const { logOut } = useContext(AdminContext)

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
                        className={({ isActive }) =>
                            isActive ? "nav_linK active" : "nav_linK"
                        }
                        to={'/main'}>
                        داشبورد
                    </NavLink>
                </li>

                <li className="">
                    <NavLink
                        className={({ isActive }) =>
                            isActive ? "nav_linK active" : "nav_linK"
                        }
                        to={'/view-news'}>
                        اخبار
                    </NavLink>
                </li>

                <li className="">
                    <NavLink
                        className={({ isActive }) =>
                            isActive ? "nav_linK active" : "nav_linK"
                        }
                        to={'/view-category'}>
                        دسته بندی
                    </NavLink>
                </li>

                <li className="">
                    <NavLink
                        className={({ isActive }) =>
                            isActive ? "nav_linK active" : "nav_linK"
                        }
                        to={'/view-video'}>
                        ویدیو
                    </NavLink>
                </li>

                <li className="">
                    <NavLink
                        className={({ isActive }) =>
                            isActive ? "nav_linK active" : "nav_linK"
                        }
                        to={'/view-users'}>
                        کاربران
                    </NavLink>
                </li>

                {/* <li className="">
                    <NavLink
                        className={({ isActive }) =>
                            isActive ? "nav_linK active" : "nav_linK"
                        }
                        to={''}>
                        نظرات
                    </NavLink>
                </li> */}

                <li className="">
                    <span
                        onClick={logOut}
                        className='nav_linK'
                    >
                        خروج
                    </span>
                </li>
            </ul>
        </div>
    )
}

export default Sidbar