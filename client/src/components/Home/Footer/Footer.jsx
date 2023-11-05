import "./Footer.css"
import travel from '@src/assets/images/traveling.jpg'
import newsImg from '@src/assets/images/1.jpeg'
import logo from '@src/assets/images/logo.png'
import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <footer className="mt-6 pt-6 has-background-black-bis has-text-white-bis">
            <div className="container">
                <div className="columns">
                    <div className="column is-one-third">
                        <img src={travel} width='270' alt="" />
                    </div>
                    <div className="column is-one-third">
                        <h1 className="subtitle has-text-white-bis mb-5">محبوبترین خبرها</h1>
                        <ul>
                            <li className="mt-4">
                                <div className="post-footer is-flex is-align-items-center">
                                    <div className="post-footer-image">
                                        <Link to={'/'}>
                                            <img src={newsImg} alt="" />
                                        </Link>
                                    </div>
                                    <div className="post-footer-title pr-3">
                                        <Link className="has-text-white-bis" to={'/'}>
                                            <h2>تست عنوان</h2>
                                        </Link>
                                        <h2 className="post-footer-name mt-1">رامین مجیدی</h2>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="column is-one-third">
                        <div className="footer-logo">
                            <img src={logo} alt="" />
                        </div>
                        <div className="footer-address is-flex is-align-items-center mt-4">
                            <box-icon name='info-circle' color='#008fff' size="md"></box-icon>
                            <p className="mr-2">
                                ما یه سایت خبری هستیم که اخبار جعلی اما بروز دنیا رو پخش میکنیم
                            </p>
                        </div>
                        <div className="footer-address is-flex is-align-items-center mt-4">
                            <box-icon name='map-pin' color='#008fff' size="md"></box-icon>
                            <p className="mr-2">
                                ایران اصفهان مستقیم دست راست طبقه بالا واحد پایین
                            </p>
                        </div>

                        <div className="footer-address is-flex is-align-items-center mt-4">
                            <box-icon name='phone' color='#008fff' size="md"></box-icon>
                            <p className="mr-2">
                                تلفن : 09130004321
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="has-background-black has-text-white py-4 px-1 mt-4">
                <p className="column text_center">تمام حقوق مادی و معنوی این سایت متعلق به سایت خودمون می باشد</p>
                <h2 className="column text_center">کدنویسی سایت توسط <span className="has-text-info has-text-weight-bold"> ramindev01 </span>انجام شده است.</h2>
            </div>
        </footer>
    )
}

export default Footer