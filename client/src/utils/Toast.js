import { toast } from "react-toastify"

export const errorHandler = async (
    error,
    position = 'top-left',
    autoClose = 2000,
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
    position = 'top-left',
    autoClose = 2000,
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