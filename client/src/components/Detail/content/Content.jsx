import Comment from '../comment/Comment'

const Content = ({ data }) => {
    return (
        <section className='content-detail'>
            <div className="detail-image">
                <img
                    style={{ borderRadius: "10px" }}
                    src={data?.url}
                    alt=""
                />
            </div>
            <div className="detail-title">
                <h1 className="title mt-5">{data?.title}</h1>
            </div>
            <div className="detail-description">
                <p className="description mt-5 has-text-justified">
                   {data?.desc}
                </p>
            </div>
            <div className="comment">
                <Comment />
            </div>
        </section>
    )
}

export default Content