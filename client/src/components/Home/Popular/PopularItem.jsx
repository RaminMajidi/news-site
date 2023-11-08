import React from 'react'
import { Link } from 'react-router-dom'
import { convertDateToJalali } from '@src/utils/convertDate'

const PopularItem = ({ news }) => {
    return (
        <div className="column popular-news">
            <div className="popular-img is-relative">
                <Link to={`/detail/${news.id}`} state={news}>
                    <img
                        className="is-fullwidth popular-image"
                        src={news?.url} alt={news?.title} />
                </Link>
                <div className="num-views is-flex is-align-items-center is-justify-content-space-between">
                    <box-icon name='show-alt' color="#fff" size="sm"></box-icon>
                    <span className="mx-2">
                        {news?.numViews}
                    </span>
                </div>
            </div>
            <div className="popular-title">
                <h6 className="is-flex has-text-weight-bold is-size-6">
                    <Link to={`/detail/${news.id}`}>
                        {news?.title}
                    </Link>
                </h6>
            </div>
            <div className="author mt-4">
                <span className="is-size-6 has-text-grey mr-2">
                    {convertDateToJalali(news?.updatedAt)}
                </span>
            </div>
        </div>
    )
}

export default PopularItem