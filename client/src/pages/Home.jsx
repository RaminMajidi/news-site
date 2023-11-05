import TopMenu from "@src/components/Home/TopMenu/TopMenu"
import Navbar from "@src/components/Home/Navbar/Navbar"
import HomeWrapper from "@src/components/Home/HomeWrapper/HomeWrapper"
import WhatsNews from "@src/components/Home/WhatsNews/WhatsNews"
import PopularNews from "@src/components/Home/Popular/PopularNews"
import Footer from "@src/components/Home/Footer/Footer"

const Home = () => {
    return (
        <div className="wrapper">
            <TopMenu />
            <Navbar />
            <HomeWrapper />
            <WhatsNews />
            <PopularNews />
            <Footer/>
        </div>
    )
}

export default Home