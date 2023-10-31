import { createContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

export const AdminContext = createContext();

export const AdminContextProvider = ({ children }) => {

    const navigate = useNavigate()
    const [token, setToken] = useState('')
    const [userData, setUserData] = useState(null)
    const [expire, setExpire] = useState(null)


    // start ********************************************
    const refreshToken = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/token`)
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
    const axiosJWT = axios.create()
    axiosJWT.interceptors.request.use(
        async (config) => {
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
    // end ********************************************

    // start ********************************************
    const login = async (inputs) => {
        try {
            const res = await axios.post(`http://localhost:5000/api/users/login`, inputs)
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
            const res = await axiosJWT.get('http://localhost:5000/api/users', {
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
            const res = await axiosJWT.post(`http://localhost:5000/api/news`, formData, {
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
    useEffect(() => {
        refreshToken()
    }, [])
    // end ********************************************

    return (
        <AdminContext.Provider value={{ login, userData, getAllUser, axiosJWT, token, createNews }}>
            {children}
        </AdminContext.Provider>
    )
}