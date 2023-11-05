import "./HomeWrapper.css"
import testVideo from '@src/assets/images/newsvideo.mp4'
import testImg from '@src/assets/images/1.jpeg'


const HomeWrapper = () => {
    return (
        <div className="home-wrapper">
            <div className="container">
                <div className="columns is-flex-widescreen is-block-tablet is-align-items-start">
                    <article className="column is-one-quarter-widescreen is-full-desktop">
                        <div className="right-side-post">
                            <div className="right-side-top">
                                <div className="right-side-img">
                                    <div className="overlay"></div>
                                    <img src={testImg} alt="" />
                                </div>
                                <div className="post-info">
                                    <div className="post-cat">
                                        <span>دسته بندی</span>
                                    </div>
                                    <div className="post-title">عنوان تست</div>
                                    <div className="post-date">1402/08/15</div>
                                </div>
                            </div>
                        </div>
                    </article>
                    <article className="column is-three-quarters-widescreen is-full-tablet">
                        <div className="post-left-side">
                            <video
                                width="100%"
                                height="100%"
                                src={testVideo}
                                controls>
                            </video>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    )
}

export default HomeWrapper