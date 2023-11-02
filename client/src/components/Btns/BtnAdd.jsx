import { Link } from "react-router-dom"


const BtnAdd = ({ url, text }) => {
    return (
        <div className="is-flex is-justify-content-end px-4">
            <Link to={`${url}`} className="button is-info px-6  mb-6">
                {text}
            </Link>
        </div>
    )
}

export default BtnAdd