import Loader from "@src/components/Loader/Loader"
import { convertDateToJalali } from '@src/utils/convertDate'
import { HomeContext } from "@src/context/context"
import { useContext } from "react"
import { Link } from "react-router-dom"



const PopularNews = () => {

    const { loadingPopularNews, popularNewsData } = useContext(HomeContext)
    
    return (
        <div className="column is-one-third">
            <h1 className="subtitle has-text-white-bis mb-5">محبوبترین خبرها</h1>
            <ul>
                {loadingPopularNews &&
                    <Loader />
                }
                {(!loadingPopularNews && popularNewsData) &&
                    popularNewsData.map(item => (
                        <li className="mt-4">
                            <div className="post-footer is-flex is-align-items-center">
                                <div className="post-footer-image">
                                    <Link to={`/detail/${item.id}`}>
                                        <img
                                            src={item?.url}
                                            alt={"img" + item.id}
                                        />
                                    </Link>
                                </div>
                                <div className="post-footer-title pr-3">
                                    <Link
                                        className="has-text-white-bis"
                                        to={`/detail/${item.id}`}
                                    >
                                        <h2>{item.title}</h2>
                                    </Link>
                                    <h2 className="post-footer-name mt-1">
                                        {convertDateToJalali(item?.updatedAt)}
                                    </h2>
                                </div>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default PopularNews