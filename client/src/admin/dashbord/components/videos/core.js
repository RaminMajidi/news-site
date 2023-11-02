import * as Yup from 'yup'

export const formSchema = Yup.object({
    file: Yup.string()
        .required('عنوان الزامی است')
})