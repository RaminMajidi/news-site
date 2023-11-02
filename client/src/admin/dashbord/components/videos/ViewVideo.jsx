import Dashbord from "../../Dashbord"
import BtnAdd from "@src/components/Btns/BtnAdd"
import Modal from "@src/components/Modal"
import Table from "@src/components/Table"
import { useContext, useEffect, useState } from "react"
import { AdminContext } from "../../../context/context"


const ViewVideo = () => {
    const [showModal, setShowModal] = useState(false)
    const [videoId, setVideoId] = useState(null)
    const { deleteVideo, getAllVideo, videoList } = useContext(AdminContext)


    const deleteHandler = (id) => {
        deleteVideo(id)
        setShowModal(false)
    }

    useEffect(() => {
        getAllVideo()
    }, [])


    return (
        <Dashbord title={'مدیریت ویدیوها'}>
            {/* start btn add */}
            <BtnAdd
                text={'افزودن ویدیو'}
                url={'/add-video'} />
            {/* end btn add */}



            {/* start  table */}
            {videoList &&
                < Table titles={['شماره', 'ویدیو', 'عملیات']}>
                    {
                        videoList.map((item, index) => (
                            <tr key={item?.id}>
                                <td>{index + 1}</td>
                                <td>
                                    <video
                                        controls
                                        style={{ width: "100%", height: "80px" }}
                                        src={item.url}>
                                    </video>
                                </td>
                                <td>
                                    <button
                                        onClick={() => setVideoId(item.id)}
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
                        onClick={() => deleteHandler(videoId)}
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

export default ViewVideo