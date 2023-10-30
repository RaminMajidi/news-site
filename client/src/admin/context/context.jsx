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


    const refreshToken = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/token`)
            if (res.status === 200) {
                const token = res.data.accessToken
                const decoded = jwtDecode(token)
                setUserData({
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

    useEffect(() => {
        refreshToken()
    }, [])

    const axiosJWT = axios.create()
    axiosJWT.interceptors.request.use(
        async (config) => {
            const currentDate = new Date();
            if (expire * 1000 < currentDate.getTime()) {
                const res = await axios.get(`http://localhost:5000/token`)
                if (res.status === 200) {
                    console.log(res);
                    const token = await res.data.accessToken
                    config.headers.Authorization = `Bearer ${token}`
                    const decoded = jwtDecode(token)
                    setUserData({
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


    const login = async (inputs) => {
        try {
            const res = await axios.post(`http://localhost:5000/api/users/login`, inputs)
            if (res.status === 200) {
                const user = await res.data.user
                setToken(user.accessToken)
                setUserData({
                    email: user.email,
                    name: user.name,
                    isAdmin: user.isAdmin,
                    url: user.url
                })
                navigate('/dashbord')
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



    const getAllUser = async () => {

        try {
            const res = await axiosJWT.get('http://localhost:5000/api/users', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <AdminContext.Provider value={{ login, userData, getAllUser }}>
            {children}
        </AdminContext.Provider>
    )
}