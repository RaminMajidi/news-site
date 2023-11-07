import { Link } from "react-router-dom"
import { convertDateToJalali } from "@src/utils/convertDate"

const NewsItem = ({ news }) => {
    return (
        <div className="whats-news-post-item">
            <div className="whats-news-post-item-img">
                <Link to={`/detail/${news.id}`} state={news}>
                    <img src={news?.url} alt="" />
                </Link>
            </div>
            <div className="whats-news-post-item-desc">
                <Link to={`/detail/${news.id}`} state={news}>
                    <p className="has-text-justified">
                        {news?.desc}
                    </p>
                </Link>
                <div className="whats-news-post-item-date">
                    <p>
                        {convertDateToJalali(news?.updatedAt)}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default NewsItem