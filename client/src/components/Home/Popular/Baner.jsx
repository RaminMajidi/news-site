import travel from '@src/assets/images/traveling.jpg'

const Baner = () => {
    return (
        <div className="column is-one-fifth has-text-centered">
            <img
                className="popular_tarvel_img"
                src={travel}
                alt="بنر تبلیغ" />
        </div>
    )
}

export default Baner