import Layout from "./Layout"
import contactImg from "@src/assets/images/contact.webp"

const Contact = () => {
    return (
        <Layout>
            <div className="contact pt-6">
                <div className="container">
                    <div className="columns">
                        <div className="column">
                            <img src={contactImg} alt="" />
                        </div>
                        <div className="column"></div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Contact