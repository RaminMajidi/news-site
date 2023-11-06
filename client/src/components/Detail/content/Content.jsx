import testImg from '@src/assets/images/1.jpeg'
import Comment from '../comment/Comment'

const Content = () => {
    return (
        <section className='content-detail'>
            <div className="detail-image">
                <img src={testImg} alt="" />
            </div>
            <div className="detail-title">
                <h1 className="title mt-5">تست عنوان</h1>
            </div>
            <div className="detail-description">
                <p className="description mt-5">
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.
                </p>
            </div>
            <div className="comment">
                <Comment />
            </div>
        </section>
    )
}

export default Content