import { createContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const AdminContext = createContext();

export const AdminContextProvider = ({ children }) => {

    const navigate = useNavigate()
    const [token, setToken] = useState('')
    const [userData, setUserData] = useState(null)
    const [expire, setExpire] = useState(null)
    const [newsData, setNewsData] = useState(null)
    const [categoryList, setCategoryList] = useState(null)
    const [singleNews, setSingleNews] = useState(null)



    // start ********************************************
    const axiosJWT = axios.create({
        baseURL: BASE_URL
    })
    axiosJWT.interceptors.request.use(
        async (config) => {
            if (!token) {
                return config
            }
            const currentDate = new Date();
            if (expire * 1000 < currentDate.getTime()) {
                const res = await axios.get(`http://localhost:5000/token`)
                if (res.status === 200) {
                    const token = await res.data.accessToken
                    config.headers.Authorization = `Bearer ${token}`
                    const decoded = jwtDecode(token)
                    setUserData({
                        id: decoded.id,
                        email: decoded.email,
                        name: decoded.name,
                        isAdmin: decoded.isAdmin,
                        url: res.data.url
                    })
                    setExpire(decoded.exp)
                    setToken(token)
                }
            }
            return config
        },
        (error) => {
            return Promise.reject(error)
        }
    )

    axiosJWT.interceptors.response.use(
        (response) => response,
        async (error) => {
            const pathname = window.location.pathname
            if (error.response.status === 404) {
                navigate('/404')
            }
            if ((error.response.status === 401 || error.response.status === 403) && pathname !== "/administrator") {
                navigate('/administrator')
            }
            return Promise.reject(error)
        }
    )
    // end ********************************************


    // start ********************************************
    const refreshToken = async () => {
        try {
            const res = await axiosJWT.get(`${prose}/token`)
            if (res.status === 200) {
                const token = res.data.accessToken
                const decoded = jwtDecode(token)
                setUserData({
                    id: decoded.id,
                    email: decoded.email,
                    name: decoded.name,
                    isAdmin: decoded.isAdmin,
                    url: res.data.url
                })
                setExpire(decoded.exp)
                setToken(token)
            }
        } catch (error) {
            toast.error(error?.response?.data?.message, {
                position: 'top-left',
                autoClose: 1500,
                closeOnClick: true,
                pauseOnHover: true
            })
        }
    }
    // end ********************************************


    // start ********************************************
    const login = async (inputs) => {
        try {
            const res = await axiosJWT.post(`/api/users/login`, inputs)
            if (res.status === 200) {
                const user = await res.data.user
                setToken(user.accessToken)
                setUserData({
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    isAdmin: user.isAdmin,
                    url: user.url
                })
                navigate('/main')
                toast.success(res.data.message, {
                    position: 'top-left',
                    autoClose: 1000,
                    closeOnClick: true,
                    pauseOnHover: true
                })
            }
        } catch (error) {
            toast.error(error.response.data.message, {
                position: 'top-left',
                autoClose: 1500,
                closeOnClick: true,
                pauseOnHover: true
            })
        }
    }
    // end ********************************************

    // start ********************************************
    const getAllUser = async () => {

        try {
            const res = await axiosJWT.get('/api/users', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(res);
        } catch (error) {
            toast.error(error.response.data.message, {
                position: 'top-left',
                autoClose: 1500,
                closeOnClick: true,
                pauseOnHover: true
            })
        }
    }
    // end ********************************************


    // start ********************************************
    const createNews = async (data) => {
        const formData = new FormData();
        formData.append('title', data.title)
        formData.append('desc', data.desc)
        formData.append('catId', data.catId)
        formData.append('file', data.file)
        formData.append('userId', userData.id)
        try {
            const res = await axiosJWT.post(`/api/news`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            if (res.status === 200) {
                toast.success(res.data.message, {
                    position: 'top-left',
                    autoClose: 1500,
                    closeOnClick: true,
                    pauseOnHover: true
                })
                navigate('/view-news')

            }
        } catch (error) {
            toast.error(error.response.data.message, {
                position: 'top-left',
                autoClose: 1500,
                closeOnClick: true,
                pauseOnHover: true
            })
        }

    }
    // end ********************************************

    // start ********************************************
    const getNewsHandler = async () => {
        try {
            const res = await axiosJWT(`/api/news`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            if (res.status === 200) {
                setNewsData(res.data.news)
            }
        } catch (error) {
            toast.error(error.response.data.message, {
                position: 'top-left',
                autoClose: 1500,
                closeOnClick: true,
                pauseOnHover: true
            })
        }
    }
    // end ********************************************

    // start ********************************************
    const deleteNews = async (id) => {
        try {
            const res = await axiosJWT.delete(`/api/news/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (res.status === 200) {
                setNewsData(newsData.filter(item => item.id != id))
                toast.success(res.data.message, {
                    position: 'top-left',
                    autoClose: 1500,
                    closeOnClick: true,
                    pauseOnHover: true
                })
            }

        } catch (error) {
            toast.error(error?.response?.data?.message, {
                position: 'top-left',
                autoClose: 1500,
                closeOnClick: true,
                pauseOnHover: true
            })
        }
    }
    // end ********************************************

    // start ********************************************
    const getNewsById = async (id) => {
        try {
            const res = await axiosJWT.get(`/api/news/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (res.status === 200) {
                setSingleNews(res.data.news)
            }
        } catch (error) {
            if (error.response.status === 404) {
                navigate("/404")
            }
            toast.error(error?.response?.data?.message, {
                position: 'top-left',
                autoClose: 1500,
                closeOnClick: true,
                pauseOnHover: true
            })
        }
    }
    // end ********************************************


    // start ********************************************
    const editNews = async (data) => {
        const formData = new FormData();
        formData.append('title', data.title)
        formData.append('desc', data.desc)
        formData.append('catId', data.catId)
        formData.append('file', data.file)
        formData.append('userId', userData.id)
        try {
            const res = await axiosJWT.put(`/api/news/${data.id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            if (res.status === 201) {
                toast.success(res.data.message, {
                    position: 'top-left',
                    autoClose: 2000,
                    closeOnClick: true,
                    pauseOnHover: true
                })
                navigate('/view-news')

            }
        } catch (error) {
            toast.error(error.response.data.message, {
                position: 'top-left',
                autoClose: 1500,
                closeOnClick: true,
                pauseOnHover: true
            })
        }
    }
    // end ********************************************


    // start ********************************************
    const getCategory = async () => {
        try {
            const res = await axiosJWT.get(`/api/get-category`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (res.status == 200) {
                setCategoryList(res.data.categories)
            }

        } catch (error) {
            toast.error(error.response.data.message, {
                position: 'top-left',
                autoClose: 1500,
                closeOnClick: true,
                pauseOnHover: true
            })
        }
    }
    // end ********************************************

    // start ********************************************
    useEffect(() => {
        refreshToken()
    }, [])
    // end ********************************************

    return (
        <AdminContext.Provider value={{
            login,
            userData,
            getAllUser,
            axiosJWT,
            token,
            createNews,
            newsData,
            getNewsHandler,
            deleteNews,
            getNewsById,
            getCategory,
            categoryList,
            singleNews,
            editNews
        }}>
            {children}
        </AdminContext.Provider>
    )
}