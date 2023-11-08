import Dashbord from "../../Dashbord"
import Modal from "@src/components/Modal"
import Table from "@src/components/Table"
import { useContext, useEffect, useState } from "react"
import { AdminContext } from "../../../context/context"
import "./ViewComments.css"

const ViewComments = () => {

    const { getAllComment, commentList, deleteComment, changeActiveComment } = useContext(AdminContext)
    const [showModal, setShowModal] = useState(false)
    const [commentId, setCommentId] = useState(null)



    const deleteHandler = (id) => {
        deleteComment(id)
        setShowModal(false)
    }


    useEffect(() => {
        getAllComment()
    }, [])

    return (
        <Dashbord title="مدیریت نظرها">

            {/* start  table */}
            {commentList &&
                < Table titles={['شماره', 'موضوع', 'ایمیل', 'متن', 'وضعیت', 'عملیات']}>
                    {
                        commentList.map((item, index) => (
                            <tr key={item?.id}>
                                <td>{index + 1}</td>
                                <td>{item?.subject}</td>
                                <td>{item?.email}</td>
                                <td className="td_smal_desc">
                                    <p>{item?.description}</p>
                                </td>
                                <td>
                                    {
                                        item.isActive ? (
                                            <button
                                                onClick={() => changeActiveComment(item.id, 0)}
                                                className="button is-success">
                                                فعال
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => changeActiveComment(item.id, 1)}
                                                className="button is-warning">
                                                غیرفعال
                                            </button>
                                        )
                                    }
                                </td>
                                <td>
                                    <button
                                        onClick={() => setCommentId(item?.id)}
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
                        onClick={() => deleteHandler(commentId)}
                        className="button is-danger mx-1"
                        type="button">
                        تایید
                    </button>
                </Modal>
            }
            {/* end delete  moda */}

        </Dashbord>
    )
}

export default ViewComments