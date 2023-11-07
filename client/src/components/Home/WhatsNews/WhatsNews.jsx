import "./WhatsNews.css"
import sendImg from "@src/assets/images/sendnews.jpg"
import { Link, NavLink } from "react-router-dom"
import { useContext } from "react"
import { HomeContext } from "@src/context/context"
import Loader from "@src/components/Loader/Loader"
import { convertDateToJalali } from "@src/utils/convertDate"

const WhatsNews = () => {

    const { categories, loadingCatNews, catNewsData } = useContext(HomeContext)

    return (
        <div id="whats-news" className="py-5">
            <div className="container">
                <div className="columns is-flex-widescreen is-block-tablet">
                    <div className="column is-flex is-one-quarter-widescreen is-justify-content-center">
                        <img src={sendImg} className="send-news" alt="" />
                    </div>
                    <div className="column is-three-quarters-widescreen is-justify-content-center">
                        <div className="whats-news has-background-white p-5">
                            <div className="whats-news-title is-flex is-flex-wrap-wrap is-justify-content-space-between is-align-items-center">
                                <div className="whats-news-nav">
                                    <ul className="is-flex">
                                        <li className="ml-5 has-text-weight-bold">
                                            <NavLink to={'/'}>همه</NavLink>
                                        </li>
                                        {
                                            categories?.map(item => (
                                                <li key={item.id} className="ml-5 has-text-weight-bold">
                                                    <NavLink to={'/'}>{item?.name}</NavLink>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                                <div className="whats-news-name">
                                    <h1 className="is-size-2 title">چه خبر !؟</h1>
                                </div>
                            </div>
                            {loadingCatNews &&
                                <div className="">
                                    <Loader />
                                </div>
                            }
                            <article className="whats-news-post mt-6">
                                {(!loadingCatNews && catNewsData) &&
                                    catNewsData.map(item => (
                                        <div key={item.id} className="whats-news-post-item">
                                            <div className="whats-news-post-item-img">
                                                <Link to={'/'}>
                                                    <img src={item?.url} alt="" />
                                                </Link>
                                            </div>
                                            <div className="whats-news-post-item-desc">
                                                <Link to={'/'}>
                                                    <p className="has-text-justified">
                                                        {item?.desc}
                                                    </p>
                                                </Link>
                                                <div className="whats-news-post-item-date">
                                                    <p>
                                                        {convertDateToJalali(item?.updatededAt)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </article>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default WhatsNews