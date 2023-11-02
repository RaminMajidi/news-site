import { createContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { jwtDecode } from "jwt-decode";
import { errorHandler, successHandler } from "@src/utils/toast";

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
    const [videoList, setVideoList] = useState(null)


    //Axios code start ***************
    const axiosJWT = axios.create({
        baseURL: BASE_URL
    })
    axiosJWT.interceptors.request.use(
        async (config) => {
            const currentDate = new Date();
            if (expire * 1000 < currentDate.getTime()) {
                const res = await axios.get(`${BASE_URL}/token`)
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
            } else if (token) {
                config.headers.Authorization = `Bearer ${token}`
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
            if (error.response.status === 404) {
                navigate('/404')
            }
            return Promise.reject(error)
        }
    )
    //Axios code end ******


    // Authentication APIs code satrt

    // start **************************
    const refreshToken = async () => {
        try {
            const res = await axiosJWT.get(`/token`)
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
            errorHandler(error)
        }
    }
    // end *******

    // start ***********************
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
                successHandler(res?.data?.message)
            }
        } catch (error) {
            errorHandler(error)
        }
    }
    // end ********

    // Authentication APIs code end


    // News APIs code start 

    // start *********************
    const createNews = async (data) => {
        const formData = new FormData();
        formData.append('title', data.title)
        formData.append('desc', data.desc)
        formData.append('catId', data.catId)
        formData.append('file', data.file)
        formData.append('userId', userData.id)
        try {
            const res = await axiosJWT.post(`/api/news`, formData)
            if (res.status === 200) {
                successHandler(res?.data?.message)
                navigate('/view-news')
            }
        } catch (error) {
            errorHandler(error)
        }

    }
    // end *********

    // start ************************
    const getAllNews = async () => {
        try {
            const res = await axiosJWT(`/api/news`)
            if (res.status === 200) {
                setNewsData(res.data.news)
            }
        } catch (error) {
            errorHandler(error)
        }
    }
    // end **********

    // start *************************
    const deleteNews = async (id) => {
        try {
            const res = await axiosJWT.delete(`/api/news/${id}`)
            if (res.status === 200) {
                setNewsData(newsData.filter(item => item.id != id))
                successHandler(res?.data?.message)
            }

        } catch (error) {
            errorHandler(error)
        }
    }
    // end ********

    // start *************************
    const getNewsById = async (id) => {
        try {
            const res = await axiosJWT.get(`/api/news/${id}`)
            if (res.status === 200) {
                setSingleNews(res.data.news)
            }
        } catch (error) {
            errorHandler(error)
        }
    }
    // end *******


    // start **************************
    const editNews = async (data) => {
        const formData = new FormData();
        formData.append('title', data.title)
        formData.append('desc', data.desc)
        formData.append('catId', data.catId)
        formData.append('file', data.file)
        formData.append('userId', userData.id)
        try {
            const res = await axiosJWT.put(`/api/news/${data.id}`, formData)
            if (res.status === 201) {
                successHandler(res?.data?.message)
                navigate('/view-news')
            }
        } catch (error) {
            errorHandler(error)
        }
    }
    // end *********

    // News APIs code end



    // Ctegories APIs start

    // start *******************
    const getCategory = async () => {
        try {
            const res = await axiosJWT.get(`/api/get-category`)
            if (res.status == 200) {
                setCategoryList(res.data.categories)
            }

        } catch (error) {
            errorHandler(error)
        }
    }
    // end *******

    // start *******************

    const addCategory = async (value) => {
        try {
            const res = await axiosJWT.post('/api/craete-category', value)
            if (res.status === 200) {
                successHandler(res?.data?.message)
                navigate('/view-category')
            }
        } catch (error) {
            errorHandler(error)
        }
    }
    // end *******

    // start *******************
    const editCategory = async (value) => {
        try {
            const res = await axiosJWT.put(`/api/update-category/${value.id}`, value)
            if (res.status === 200) {
                successHandler(res?.data?.message)
                navigate('/view-category')
            }
        } catch (error) {
            errorHandler(error)
        }
    }
    // end *******

    // start *******************
    const deleteCategory = async (id) => {
        try {
            const res = await axiosJWT.delete(`/api/delete-category/${id}`)
            if (res.status === 200) {
                setCategoryList(categoryList.filter(item => item.id != id))
                successHandler(res?.data?.message)
                navigate('/view-category')
            }
        } catch (error) {
            errorHandler(error)
        }
    }
    // end *******


    // Ctegories APIs end



    // Videos APIs start

    // start *******************
    const getAllVideo = async () => {
        try {
            const res = await axiosJWT(`/api/allVideo`)
            if (res.status === 200) {
                setVideoList(res.data.videos)
            }
        } catch (error) {
            errorHandler(error)
        }
    }
    // end ********

    // start **********************
    const createVideo = async (data) => {
        const formData = new FormData()
        formData.append('file', data.file)
        try {
            const res = await axiosJWT.post(`/api/craete-video`, formData)
            if (res.status === 200) {
                successHandler(res.data.message)
                navigate('view-video')
            }
        } catch (error) {
            errorHandler(error)
        }
    }
    // end *********

    // start **********************
    const deleteVideo = async (id) => {

        try {
            const res = await axiosJWT.delete(`/api/deleteVideo/${id}`)
            if (res.status === 201) {
                setVideoList(videoList.filter(item => item.id != id))
                successHandler(res?.data?.message)
            }
        } catch (error) {
            errorHandler(error)
        }
    }
    // end *********




    // Videos APIs end


    // Users APIs start

    // start **********************
    const getAllUser = async () => {

        try {
            const res = await axiosJWT.get('/api/users')
            console.log(res);
        } catch (error) {
            errorHandler(error)
        }
    }
    // end *********

    // Users APIs end



    // start ***************
    useEffect(() => {
        refreshToken()
    }, [])
    // end ******

    return (
        <AdminContext.Provider value={{
            login,
            userData,
            getAllUser,
            axiosJWT,
            token,
            createNews,
            newsData,
            getAllNews,
            deleteNews,
            getNewsById,
            getCategory,
            categoryList,
            singleNews,
            editNews,
            addCategory,
            editCategory,
            deleteCategory,
            getAllVideo,
            videoList,
            deleteVideo,
            createVideo
        }}>
            {children}
        </AdminContext.Provider>
    )
}