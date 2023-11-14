import * as Yup from 'yup'

export const formSchema = Yup.object({
    title: Yup.string()
        .required('عنوان الزامی است')
    ,
    desc: Yup.string()
        .required('توضیحات الزامی است')
    ,
    categoryId: Yup.string()
        .required(' دسته بندی الزامی است'),
})