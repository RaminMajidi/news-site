import Dashbord from "../../Dashbord"
import InputFile from "@src/components/formInputs/InputFile"
import BtnSubmit from "@src/components/Btns/BtnSubmit"
import BtnPrevPage from "@src/components/Btns/BtnPrevPage"
import { useContext, useState } from "react"
import { useFormik } from "formik"
import { formSchema } from './core'
import { AdminContext } from "../../../context/context"


const AddVideo = () => {

    const [file, setFile] = useState(null)
    const { createVideo } = useContext(AdminContext)


    const loadVideo = (e) => {
        setFile(e.target.files[0])
    }


    // start ***************************
    const formik = useFormik({
        initialValues: {
            file: null
        },
        onSubmit: (values) => {
            const data = {
                ...values,
                file: file
            }
            createVideo(data)
        },
        // validationSchema: formSchema
    })
    // end ***************************

    return (
        <Dashbord title={'افزودن ویدیو'}>
            <BtnPrevPage />
            <form onSubmit={formik.handleSubmit}>
                <InputFile
                    label="ویدیو"
                    name="file"
                    onChange={(e) => loadVideo(e)}
                    preview={null}
                />
                <BtnSubmit />
            </form>
        </Dashbord>
    )
}

export default AddVideo