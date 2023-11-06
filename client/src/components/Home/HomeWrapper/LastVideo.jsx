import Loader from "../../Loader/Loader"
import { useContext } from "react"
import { HomeContext } from "../../../context/context"

const LastVideo = () => {
    const { videos, loading } = useContext(HomeContext)
    return (
        <article className="column is-three-quarters-widescreen is-full-tablet">
            <div className="post-left-side">
                {
                    loading ?
                        (
                            <Loader />
                        )
                        :
                        (
                            <video
                                width="100%"
                                height="100%"
                                src={videos.url}
                                controls>
                            </video>
                        )
                }
            </div>
        </article>
    )
}

export default LastVideo