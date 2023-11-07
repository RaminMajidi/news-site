import sendImg from "@src/assets/images/sendnews.jpg"

const Baner = () => {
    return (
        <div className="column is-flex is-one-quarter-widescreen is-justify-content-center">
            <img
                src={sendImg}
                className="send-news"
                alt="بنر اطلاع رسانی" />
        </div>
    )
}

export default Baner