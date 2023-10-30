import { Link } from "react-router-dom"
import "./Sidbar.css"
import logo from '@src/assets/images/logo.png'
const Sidbar = () => {
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
                        to={'/dashbord'}>
                        داشبورد
                    </Link>
                </li>

                <li className="">
                    <Link
                        className=""
                        to={''}>
                        اخبار
                    </Link>
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