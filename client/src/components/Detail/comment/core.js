import * as Yup from 'yup'

export const formSchema = Yup.object({
    description: Yup.string()
        .required('پر کردن فیلد الزامی است')
    ,
    name: Yup.string()
        .required('پر کردن فیلد الزامی است')
    ,
    email: Yup.string()
        .email("لطفا فرمت ایمیل را رعایت کنید")
        .required('پر کردن فیلد الزامی است')
    ,
    subject: Yup.string()
        .required('پر کردن فیلد الزامی است')

})