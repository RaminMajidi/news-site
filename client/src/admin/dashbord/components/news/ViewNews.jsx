import { Link } from "react-router-dom"
import Dashbord from "../../Dashbord"
import './News.css'
import { useContext, useEffect, useState } from "react"
import { AdminContext } from "../../../context/context"
import Modal from "@src/components/Modal"
import BtnAdd from "@src/components/Btns/BtnAdd"
import Table from "@src/components/Table"


const ViewNews = () => {
    const [showModal, setShowModal] = useState(false)
    const { newsData, getNewsHandler, deleteNews } = useContext(AdminContext)
    const [newsId, setNewsId] = useState(null)


    const deleteHandler = (id) => {
        deleteNews(id)
        setShowModal(false)
    }

    useEffect(() => {
        getNewsHandler()
    }, [])

    return (
        <Dashbord title={"مدیریت اخبار"}>
            {/* start btn add */}
            <BtnAdd
                text={'افزودن خبر'}
                url={'/add-news'} />
            {/* end btn add */}

            {/* start  table */}
            {newsData &&
                < Table titles={['شماره', 'عنوان', 'تصویر', 'نویسنده', 'عملیات']}>
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
                                        className="button m-1 is-info">
                                        ویرایش
                                    </Link>
                                    <button
                                        onClick={() => setNewsId(news.id)}
                                        className="button m-1 is-danger">
                                        <span onClick={() => setShowModal(true)}>
                                            حذف
                                        </span>
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </Table>
            }
            {/* end  table */}

            {/* start delete  modal */}
            {
                showModal &&
                <Modal
                    isOpen={setShowModal}
                    title={"آیا از حذف اطمینان دارید؟"} >
                    <button
                        onClick={() => deleteHandler(newsId)}
                        className="button is-danger mx-1"
                        type="button">
                        تایید
                    </button>
                </Modal>
            }
            {/* end delete  moda */}

        </Dashbord >
    )
}

export default ViewNews