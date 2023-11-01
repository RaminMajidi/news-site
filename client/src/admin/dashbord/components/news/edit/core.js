import * as Yup from 'yup'


export const initialValues = {
    title: "",
    desc: "",
    catId: "",
    file: null
}

export const formSchema = Yup.object({
    title: Yup.string()
        .required('عنوان الزامی است')
    ,
    desc: Yup.string()
        .required('توضیحات الزامی است')
    ,
    catId: Yup.string()
        .required(' دسته بندی الزامی است'),
})