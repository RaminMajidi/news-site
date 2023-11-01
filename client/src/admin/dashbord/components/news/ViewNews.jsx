import { Link } from "react-router-dom"
import Dashbord from "../../Dashbord"
import './News.css'
import { useContext, useEffect, useState } from "react"
import { AdminContext } from "../../../context/context"
import Modal from "../../../../components/Modal"


const ViewNews = () => {
    const [showModal, setShowModal] = useState(false)
    const { newsData, getNewsHandler, deleteNews } = useContext(AdminContext)
    const [newsId, setNewsId] = useState(null)

    useEffect(() => {
        getNewsHandler()
    }, [])

    return (
        <Dashbord>
            <div className="is-flex is-justify-content-end px-4">
                <Link to={'/add-news'} className="button is-info px-6  mb-6">
                    افزودن خبر
                </Link>
            </div>

            {newsData &&
                <article className="px-4">
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
                                            <Link state={news}
                                                to={`/edit-news/${news.id}`}
                                                className="button mx-1 is-info">
                                                ویرایش
                                            </Link>
                                            <button
                                                onClick={() => setNewsId(news.id)}
                                                className="button mx-1 is-danger">
                                                <span onClick={() => setShowModal(true)}>
                                                    حذف
                                                </span>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </article>

            }
            {showModal &&
                <Modal
                    isOpen={setShowModal}
                    title={"آیا از حذف اطمینان دارید؟"} >
                    <button
                        onClick={() => deleteNews(newsId)}
                        className="button is-danger mx-1"
                        type="button">
                        <span onClick={() => setShowModal(false)}>
                            تایید
                        </span>
                    </button>
                </Modal>
            }

        </Dashbord>
    )
}

export default ViewNews