import TopMenu from "@src/components/Home/TopMenu/TopMenu"
import Navbar from "@src/components/Home/Navbar/Navbar"
import HomeWrapper from "@src/components/Home/HomeWrapper/HomeWrapper"
import WhatsNews from "../components/Home/WhatsNews/WhatsNews"
import PopularNews from "../components/Home/Popular/PopularNews"

const Home = () => {
    return (
        <div className="wrapper">
            <TopMenu />
            <Navbar />
            <HomeWrapper />
            <WhatsNews />
            <PopularNews />
        </div>
    )
}

export default Home