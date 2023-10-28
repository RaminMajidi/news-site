import * as Yup from 'yup'


export const LoginFormSchema = Yup.object({
    email: Yup.string()
        .required('ایمیل الزامی است')
    ,
    password: Yup.string()
        .required('پسورد الزامی است')
})