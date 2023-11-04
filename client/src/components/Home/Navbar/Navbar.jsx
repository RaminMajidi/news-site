import { Link } from "react-router-dom"
import "./Navbar.css"

const Navbar = () => {
    return (
        <div>
            <header className="has-background-danger py-5 my-4">
                <div className="container">
                    <div className="nav">
                        <ul className="nav-ul is-flex">
                            <li><Link>خانه</Link></li>
                            <li><Link>درباره ما</Link></li>
                            <li><Link>تماس با ما</Link></li>
                        </ul>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Navbar