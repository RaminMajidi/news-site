import "./Footer.css"
import Baner from "./Baner"
import PopularNews from "./PopularNews"
import AboutUs from "./AboutUs"
import CopyRight from "./CopyRight"

const Footer = () => {

    return (
        <footer className="mt-6 pt-6 has-background-black-bis has-text-white-bis">
            <div className="container">
                <div className="columns">
                    <Baner />
                    <PopularNews />
                    <AboutUs />
                </div>
            </div>
            <CopyRight />
        </footer>
    )
}

export default Footer