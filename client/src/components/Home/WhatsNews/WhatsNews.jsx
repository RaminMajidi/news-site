import "./WhatsNews.css"
import { useContext } from "react"
import { HomeContext } from "@src/context/context"
import Loader from "@src/components/Loader/Loader"
import Baner from "./Baner"
import FilterNavs from "./FilterNavs"
import WhatsNewsTitle from "./WhatsNewsTitle"
import NewsItem from "./NewsItem"
import NotNews from "../NotNews"

const WhatsNews = () => {

    const { categories, loadingCatNews, catNewsData } = useContext(HomeContext)

    return (
        <div id="whats-news" className="py-5">
            <div className="container">
                <div className="columns is-flex-widescreen is-block-tablet">
                    <Baner />
                    <div className="column is-three-quarters-widescreen is-justify-content-center">

                        {loadingCatNews &&
                            <div className="whats-news has-background-white p-5">
                                <Loader />
                            </div>
                        }

                        {(!loadingCatNews && catNewsData) &&
                            <div className="whats-news has-background-white p-5">
                                <article className="whats-news-title is-flex is-flex-wrap-wrap is-justify-content-space-between is-align-items-center">
                                    <FilterNavs items={categories} />
                                    <WhatsNewsTitle />
                                </article>
                                <article className="whats-news-post mt-6">
                                    {catNewsData?.length > 0 ? (
                                        catNewsData?.map(item => (
                                            <NewsItem key={item.id} news={item} />
                                        ))
                                    )
                                        :
                                        (
                                            <NotNews/>
                                        )
                                    }
                                </article>
                            </div>
                        }

                    </div>
                </div>
            </div>

        </div>
    )
}

export default WhatsNews