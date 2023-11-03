import * as Yup from 'yup'


export const formSchema = Yup.object({
    name: Yup.string()
        .min(3, "حداقل نام باید 3 کاراکتر باشد")
        .max(15, "حداکثر نام باید 15 کاراکتر باشد")
        .required('نام الزامی است')
    ,
    email: Yup.string()
        .email("ساختار ایمیل معتبر نیست")
        .required('ایمیل الزامی است'),
    password: Yup.string()
        .min(4, "حداقل رمزعبور باید 4 کاراکتر باشد")
        .max(20, "حداکثر رمزعبور باید 20 کاراکتر باشد")
        .required('رمزعبور الزامی است')
    ,
    confPassword: Yup.string()
        .matches()
        .min(4, "حداقل تکرار رمزعبور باید 4 کاراکتر باشد")
        .max(20, "حداکثر تکرار رمزعبور باید 20 کاراکتر باشد")
        .required('رمزعبور الزامی است')
    ,
    isAdmin: Yup.string().required("مشخص کردن نقش کاربر الزامی است")
})

export const userRols = [
    {
        id: 0,
        name: "نویسنده"
    },
    {
        id: 1,
        name: "مدیر"
    }
]