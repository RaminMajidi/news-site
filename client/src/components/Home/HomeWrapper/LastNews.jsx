import testImg from '@src/assets/images/1.jpeg'
import { useContext } from 'react'
import { HomeContext } from '../../../context/context'
import Loader from "../../Loader/Loader"
import { convertDateToJalali } from '../../../utils/convertDate'

const LastNews = () => {
    const { lastNewsData, loadingLastNews } = useContext(HomeContext)
    console.log(lastNewsData);
    return (
        <article className="column is-one-quarter-widescreen is-full-desktop">
            <div className="right-side-post">
                {
                    loadingLastNews ?
                        (
                            <div div className="right-side-top has-text-centered mt-4">
                                <Loader />
                            </div>
                        )
                        :
                        (
                            <>
                                {
                                    lastNewsData.map((item) => (
                                        <div key={item.id} div className="right-side-top">
                                            <div className="right-side-img">
                                                <div className="overlay"></div>
                                                <img src={item.url} />
                                            </div>
                                            <div className="post-info">
                                                <div className="post-cat">
                                                    <span>{item.category.name}</span>
                                                </div>
                                                <div className="post-title">{item.title}</div>
                                                <div className="post-date">{convertDateToJalali(item.createdAt)}</div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </>
                        )
                }
            </div >
        </article >
    )
}

export default LastNews