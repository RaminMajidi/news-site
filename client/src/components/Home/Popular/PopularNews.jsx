import { Link } from "react-router-dom"
import "./PopularNews.css"
import pImg from '@src/assets/images/1.jpeg'
import travel from '@src/assets/images/traveling.jpg'

const PopularNews = () => {
  return (
    <div className="container mt-6">
      <div className="columns">
        <div className="column is-four-fifths has-background-white p-4">
          <div className="popular mb-5">
            <h1>محبوبتری اخبار</h1>
          </div>
          <div className="columns">


            <div className="column popular-news">
              <div className="popular-img is-relative">
                <Link to={'/'}>
                  <img
                    className="is-fullwidth popular-image"
                    src={pImg} alt="" />
                </Link>
                <div className="num-views is-flex is-align-items-center is-justify-content-space-between">
                  <box-icon name='show-alt' color="#fff" size="sm"></box-icon>
                  <span className="mx-2">
                    167
                  </span>
                </div>
              </div>
              <div className="popular-title">
                <h6 className="is-flex has-text-weight-bold is-size-5">
                  <Link to={'/'}>
                    تست عنوان
                  </Link>
                </h6>
              </div>
              <div className="author mt-4">
                <span className="is-size-6 has-text-grey ml-2">
                  1402/08/15
                </span>
                <span className="is-size-6 has-text-grey mr-2">
                  رامین مجیدی
                </span>
              </div>
            </div>

            <div className="column popular-news">
              <div className="popular-img is-relative">
                <Link to={'/'}>
                  <img
                    className="is-fullwidth popular-image"
                    src={pImg} alt="" />
                </Link>
                <div className="num-views is-flex is-align-items-center is-justify-content-space-between">
                  <box-icon name='show-alt' color="#fff" size="sm"></box-icon>
                  <span className="mx-2">
                    167
                  </span>
                </div>
              </div>
              <div className="popular-title">
                <h6 className="is-flex has-text-weight-bold is-size-5">
                  <Link to={'/'}>
                    تست عنوان
                  </Link>
                </h6>
              </div>
              <div className="author mt-4">
                <span className="is-size-6 has-text-grey ml-2">
                  1402/08/15
                </span>
                <span className="is-size-6 has-text-grey mr-2">
                  رامین مجیدی
                </span>
              </div>
            </div>


            <div className="column popular-news">
              <div className="popular-img is-relative">
                <Link to={'/'}>
                  <img
                    className="is-fullwidth popular-image"
                    src={pImg} alt="" />
                </Link>
                <div className="num-views is-flex is-align-items-center is-justify-content-space-between">
                  <box-icon name='show-alt' color="#fff" size="sm"></box-icon>
                  <span className="mx-2">
                    167
                  </span>
                </div>
              </div>
              <div className="popular-title">
                <h6 className="is-flex has-text-weight-bold is-size-5">
                  <Link to={'/'}>
                    تست عنوان
                  </Link>
                </h6>
              </div>
              <div className="author mt-4">
                <span className="is-size-6 has-text-grey ml-2">
                  1402/08/15
                </span>
                <span className="is-size-6 has-text-grey mr-2">
                  رامین مجیدی
                </span>
              </div>
            </div>

         
          </div>
        </div>
        <div className="column is-one-fifth has-text-centered">
          <img src={travel} alt="" />
        </div>
      </div>
    </div>
  )
}

export default PopularNews