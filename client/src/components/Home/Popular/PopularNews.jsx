import "./PopularNews.css"
import { useContext } from "react"
import { HomeContext } from "../../../context/context"
import Loader from "../../Loader/Loader"
import PopularItem from "./PopularItem"
import PopularTitle from "./PopularTitle"
import Baner from "./Baner"
import NotNews from "../NotNews"

const PopularNews = () => {

  const { loadingPopularNews, popularNewsData } = useContext(HomeContext)


  return (
    <div className="container mt-6">
      <div className="columns">
        {loadingPopularNews &&
          <div className="column is-four-fifths has-background-white p-4">
            <Loader />
          </div>
        }

        {(!loadingPopularNews && popularNewsData) &&

          <div className="column is-four-fifths has-background-white p-4">
            <PopularTitle />
            <div className="columns is-flex is-flex-wrap-wrap">
              {popularNewsData?.length > 0 ?
                (
                  popularNewsData.map(item => (
                    <PopularItem key={item.id} news={item} />
                  ))
                )
                :
                (
                  <NotNews />
                )

              }
            </div>
          </div>
        }
        <Baner />
      </div>
    </div>
  )
}

export default PopularNews