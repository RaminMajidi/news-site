import * as Yup from 'yup'

export const formSchema = Yup.object({
    name: Yup.string()
        .min(3, "تعداد کاراکتر نباید کمتر از 3 باشد")
        .max(15, 'تعداد کاراکتر نباید بیشتر از 15 باشد')
        .required('نام دسته بندی الزامی است')
})