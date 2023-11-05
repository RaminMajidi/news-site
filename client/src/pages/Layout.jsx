import TopMenu from "@src/components/Home/TopMenu/TopMenu"
import Navbar from "@src/components/Home/Navbar/Navbar"
import Footer from "@src/components/Home/Footer/Footer"

const Layout = ({ children }) => {
    return (
        <div className="wrapper">
            <TopMenu />
            <Navbar />
            {children}
            <Footer />
        </div>
    )
}

export default Layout