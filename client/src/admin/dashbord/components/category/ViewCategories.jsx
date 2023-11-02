import React from 'react'
import Dashbord from '../../Dashbord'
import { useContext, useEffect, useState } from "react"
import { AdminContext } from "../../../context/context"
import Modal from "@src/components/Modal"
import BtnAdd from "@src/components/Btns/BtnAdd"
import Table from "@src/components/Table"
import { Link } from 'react-router-dom'

const ViewCategories = () => {

    const [showModal, setShowModal] = useState(false)
    const { getCategory, categoryList, deleteCategory } = useContext(AdminContext)
    const [catId, setCatId] = useState(null)


    const deleteHandler = (id) => {
        deleteCategory(id)
        setShowModal(false)
    }

    useEffect(() => {
        getCategory()
    }, [])


    return (
        <Dashbord title={"مدیریت دسته بندی ها"}>
            {/* start btn add */}
            <BtnAdd
                text={'افزودن دسته بندی'}
                url={'/add-category'} />
            {/* end btn add */}

            {/* start  table */}
            {categoryList &&
                < Table titles={['شماره', 'نام', 'عملیات']}>
                    {
                        categoryList.map((item, index) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>
                                    <Link state={item}
                                        to={`/edit-category/${item.id}`}
                                        className="button m-1 is-info">
                                        ویرایش
                                    </Link>
                                    <button
                                        onClick={() => setCatId(item.id)}
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
                        onClick={() => deleteHandler(catId)}
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

export default ViewCategories