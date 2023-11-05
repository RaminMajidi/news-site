import "./WhatsNews.css"
import sendImg from "@src/assets/images/sendnews.jpg"
import testImg from '@src/assets/images/1.jpeg'
import { Link, NavLink } from "react-router-dom"

const WhatsNews = () => {
    return (
        <div id="whats-news" className="py-5">
            <div className="container">
                <div className="columns is-flex-widescreen is-block-tablet">
                    <div className="column is-flex is-one-quarter-widescreen is-justify-content-center">
                        <img src={sendImg} className="send-news" alt="" />
                    </div>
                    <div className="column is-three-quarters-widescreen is-justify-content-center">
                        <div className="whats-news has-background-white p-5">
                            <div className="whats-news-title is-flex is-justify-content-space-between is-align-items-center">
                                <div className="whats-news-nav">
                                    <ul className="is-flex">
                                        <li className="ml-5 has-text-weight-bold">
                                            <NavLink to={'/'}>همه</NavLink>
                                        </li>
                                        <li className="ml-5 has-text-weight-bold">
                                            <NavLink to={'/'}>طنز</NavLink>
                                        </li>
                                        <li className="ml-5 has-text-weight-bold">
                                            <NavLink to={'/'}>اجتماعی</NavLink>
                                        </li>
                                    </ul>
                                </div>
                                <div className="whats-news-name">
                                    <h1 className="is-size-2 title">چه خبر !؟</h1>
                                </div>
                            </div>

                            <div className="whats-news-post mt-6">
                                <div className="whats-news-post-item">
                                    <div className="whats-news-post-item-img">
                                        <Link to={'/'}>
                                            <img src={testImg} alt="" />
                                        </Link>
                                    </div>
                                    <div className="whats-news-post-item-desc">
                                        <Link to={'/'}>
                                        <p>لورم ایپسوم متن فارسی برای تست است .ورم ایپسوم متن فارسی برای تست است .ورم ایپسوم متن فارسی برای تست است .</p>
                                        </Link>
                                        <div className="whats-news-post-item-date">
                                            <p>1402/08/15</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="whats-news-post-item">
                                    <div className="whats-news-post-item-img">
                                        <Link to={'/'}>
                                            <img src={testImg} alt="" />
                                        </Link>
                                    </div>
                                    <div className="whats-news-post-item-desc">
                                        <Link to={'/'}>
                                        <p>لورم ایپسوم متن فارسی برای تست است .ورم ایپسوم متن فارسی برای تست است .ورم ایپسوم متن فارسی برای تست است .</p>
                                        </Link>
                                        <div className="whats-news-post-item-date">
                                            <p>1402/08/15</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="whats-news-post-item">
                                    <div className="whats-news-post-item-img">
                                        <Link to={'/'}>
                                            <img src={testImg} alt="" />
                                        </Link>
                                    </div>
                                    <div className="whats-news-post-item-desc">
                                        <Link to={'/'}>
                                            <p>لورم ایپسوم متن فارسی برای تست است .ورم ایپسوم متن فارسی برای تست است .ورم ایپسوم متن فارسی برای تست است .</p>
                                        </Link>
                                        <div className="whats-news-post-item-date">
                                            <p>1402/08/15</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default WhatsNews