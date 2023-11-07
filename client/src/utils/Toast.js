import { toast } from "react-toastify"

export const errorHandler = async (
    error,
    autoClose = 2000,
    position = 'top-left',
    closeOnClick = true,
    pauseOnHover = true
) => {
    const message = await error?.response?.data?.message || error?.message || 'خطایی رخ داد ، عملیات ناموفق'
    toast.error(message, {
        position,
        autoClose,
        closeOnClick,
        pauseOnHover,
    })
}

export const successHandler = async (
    message = "عملیات موفقیت آمیز بود",
    autoClose = 2000,
    position = 'top-left',
    closeOnClick = true,
    pauseOnHover = true
) => {
    toast.success(message, {
        position,
        autoClose,
        closeOnClick,
        pauseOnHover
    })
}