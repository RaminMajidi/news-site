import { useContext, useEffect, useState } from "react"
import Dashbord from "../../Dashbord"
import { AdminContext } from "../../../context/context"
import Modal from "@src/components/Modal"
import BtnAdd from "@src/components/Btns/BtnAdd"
import Table from "@src/components/Table"
import { Link } from 'react-router-dom'


const ViewUsers = () => {

    const [showModal, setShowModal] = useState(false)
    const [userId, setUserId] = useState(null)
    const { userList, getAllUser, deleteUser } = useContext(AdminContext)


    const deleteHandler = (id) => {
        deleteUser(id)
        setShowModal(false)
    }

    useEffect(() => {
        getAllUser()
    }, [])


    return (
        <Dashbord title="مدیریت کاربران">
            {/* start btn add */}
            <BtnAdd
                text={'افزودن کاربر جدید'}
                url={'/add-user'} />
            {/* end btn add */}


            {/* start  table */}
            {userList &&
                < Table titles={['شماره', 'نام', 'ایمیل', 'نقش', 'عکس', 'عملیات']}>
                    {
                        userList.map((item, index) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.isAdmin ? "مدیر" : "نویسنده"}</td>
                                <td>
                                    {
                                        item.url ? (
                                            <img
                                                className="table-image"
                                                src={item.url}
                                                alt={"img_" + item.name}
                                            />
                                        ) :
                                            (
                                                <span>فاقد عکس</span>
                                            )
                                    }

                                </td>
                                <td>
                                    <Link state={item}
                                        to={`/edit-user/${item.id}`}
                                        className="button m-1 is-info">
                                        ویرایش
                                    </Link>
                                    {
                                        item.isAdmin ?
                                            (
                                                <button className="button m-1 is-danger" disabled>
                                                    <span>حذف</span>
                                                </button>
                                            )
                                            :
                                            (
                                                <button
                                                    onClick={() => setUserId(item.id)}
                                                    className="button m-1 is-danger">
                                                    <span onClick={() => setShowModal(true)}>
                                                        حذف
                                                    </span>
                                                </button>
                                            )
                                    }
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
                        onClick={() => deleteHandler(userId)}
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

export default ViewUsers