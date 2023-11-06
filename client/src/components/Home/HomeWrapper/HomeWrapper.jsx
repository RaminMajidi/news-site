import "./HomeWrapper.css"
import LastVideo from "./LastVideo"
import LastNews from "./LastNews"


const HomeWrapper = () => {

    return (
        <div className="home-wrapper">
            <div className="container">
                <div className="columns is-flex-widescreen is-block-tablet is-align-items-start">
                    <LastNews />
                    <LastVideo />
                </div>
            </div>
        </div>
    )
}

export default HomeWrapper