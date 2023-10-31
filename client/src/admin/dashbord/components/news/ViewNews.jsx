import { Link } from "react-router-dom"
import Dashbord from "../../Dashbord"
import './News.css'

const ViewNews = () => {
    return (
        <Dashbord>
            <div className="is-flex is-justify-content-end">
                <Link to={'/add-news'} className="button is-info px-6  mb-6">
                    افزودن خبر
                </Link>
            </div>

            <table className="table is-fullwidth">
                <thead className="is-fullwidth">
                    <tr>
                        <th>شماره</th>
                        <th>عنوان</th>
                        <th>متن</th>
                        <th>تصویر</th>
                        <th>نویسنده</th>
                        <th>عملیات</th>
                    </tr>
                </thead>

                <tbody className="is-fullwidth">
                    <tr>
                        <td>1</td>
                        <td>تست</td>
                        <td>تست متن</td>
                        <td>عکس</td>
                        <td>رامین</td>
                        <td>
                            <button className="button mx-1 is-success">
                                ویرایش
                            </button>
                            <button className="button mx-1 is-danger">
                                حذف
                            </button>
                        </td>

                    </tr>
                </tbody>

            </table>
        </Dashbord>
    )
}

export default ViewNews