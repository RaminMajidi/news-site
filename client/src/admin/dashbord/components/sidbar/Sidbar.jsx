import { Link } from "react-router-dom"
import "./Sidbar.css"
import logo from '@src/assets/images/logo.png'
const Sidbar = () => {
    return (
        <div className='sidbar has-background-light pt-6 '>
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
            </ul>
        </div>
    )
}

export default Sidbar