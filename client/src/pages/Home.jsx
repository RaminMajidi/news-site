import Layout from "./Layout"
import HomeWrapper from "@src/components/Home/HomeWrapper/HomeWrapper"
import WhatsNews from "@src/components/Home/WhatsNews/WhatsNews"
import PopularNews from "@src/components/Home/Popular/PopularNews"


const Home = () => {
    return (
        <Layout>
            <HomeWrapper />
            <WhatsNews />
            <PopularNews />
        </Layout>
    )
}

export default Home