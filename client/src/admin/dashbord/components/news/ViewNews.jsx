import { Link } from "react-router-dom"
import Dashbord from "../../Dashbord"
import './News.css'
import { useContext, useEffect, useState } from "react"
import { AdminContext } from "../../../context/context"
import { toast } from "react-toastify"

const ViewNews = () => {
    const [newsData, setNewsData] = useState(null)
    const { token, axiosJWT } = useContext(AdminContext)

    const getNewsHandler = async () => {
        try {
            const res = await axiosJWT(`http://localhost:5000/api/news`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            if (res.status === 200) {
                console.log(res.data);
                setNewsData(res.data.news)
            }
        } catch (error) {
            toast.error(error.response.data.message, {
                position: 'top-left',
                autoClose: 1500,
                closeOnClick: true,
                pauseOnHover: true
            })
        }
    }

    useEffect(() => {
        getNewsHandler()
    }, [])


    return (
        <Dashbord>
            <div className="is-flex is-justify-content-end">
                <Link to={'/add-news'} className="button is-info px-6  mb-6">
                    افزودن خبر
                </Link>
            </div>

            {newsData &&
                <table className="table is-fullwidth">
                    <thead className="is-fullwidth">
                        <tr>
                            <th>شماره</th>
                            <th>عنوان</th>
                            <th>تصویر</th>
                            <th>نویسنده</th>
                            <th>عملیات</th>
                        </tr>
                    </thead>
                    <tbody className="is-fullwidth">
                        {
                            newsData.map((news, index) => (
                                <tr key={news?.id}>
                                    <td>{index + 1}</td>
                                    <td>{news?.title}</td>
                                    <td>
                                        <img
                                            className="table-image"
                                            src={news?.url}
                                            alt={news?.title} />
                                    </td>
                                    <td>{news?.user?.name}</td>
                                    <td>
                                        <button className="button mx-1 is-success">
                                            ویرایش
                                        </button>
                                        <button className="button mx-1 is-danger">
                                            حذف
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            }
        </Dashbord>
    )
}

export default ViewNews