import { createContext, useEffect, useReducer, useState } from "react"
import { errorHandler, successHandler } from "@src/utils/toast"
import axios from 'axios'
import { VIDEO_REQUEST, VIDEO_SUCCESS, VIDEO_FAIL } from "./constants/videoConstans"
import { LAST_NEWS_REQUEST, LAST_NEWS_SUCCESS, LAST_NEWS_FAIL } from "./constants/lastNewsConstans"
import { CATEGORY_NEWS_REQUEST, CATEGORY_NEWS_SUCCESS, CATEGORY_NEWS_FAIL } from "./constants/categoryNewsConstans"
import { INITIAL_STATE, INITIAL_STATE_LAST_NEWS, INITIAL_STATE_CATEGORY_NEWS, INITIAL_STATE_POPULAR_NEWS } from "./InitialStates"
import { lastNewsRaducer } from "./reducer/lastNewsRaducer"
import { videoReducer } from "./reducer/videoReducer"
import { categoryNewsRaducer } from "./reducer/categoryNewsRaducer"
import { popularNewsRaducer } from "./reducer/popularNewsRaducer"
import { POPULAR_NEWS_FAIL, POPULAR_NEWS_REQUEST, POPULAR_NEWS_SUCCESS } from "./constants/popularNewsConstans"
import { useNavigate } from "react-router-dom"

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const HomeContext = createContext()


export const HomeContextProvider = ({ children }) => {
    const navigate = useNavigate()

    const [state, dispatch] = useReducer(videoReducer, INITIAL_STATE)
    const [stateCatNews, catNewsDispatch] = useReducer(categoryNewsRaducer, INITIAL_STATE_CATEGORY_NEWS)
    const [stateLastNews, lastNewsDispatch] = useReducer(lastNewsRaducer, INITIAL_STATE_LAST_NEWS)
    const [statePopularNews, popularNewsDispatch] = useReducer(popularNewsRaducer, INITIAL_STATE_POPULAR_NEWS)

    const [categories, setCategories] = useState(null);

    // start ******
    const loadVideo = async () => {
        try {
            dispatch({ type: VIDEO_REQUEST })
            const res = await axios(`${BASE_URL}/api/getSingleVideo`)
            if (res.status === 200) {
                const data = res.data.video
                dispatch({ type: VIDEO_SUCCESS, payload: data })
            }

        } catch (error) {
            dispatch({
                type: VIDEO_FAIL,
                payload: error?.response?.data?.message
            })
            errorHandler(error)
        }
    }
    // end ******

    // start ******
    const loadLastNews = async () => {
        try {
            lastNewsDispatch({ type: LAST_NEWS_REQUEST })
            const res = await axios(`${BASE_URL}/api/News/last-news`)
            if (res.status === 200) {
                const data = res.data.news
                lastNewsDispatch({
                    type: LAST_NEWS_SUCCESS,
                    payload: data
                })
            }

        } catch (error) {
            lastNewsDispatch({
                type: LAST_NEWS_FAIL,
                payload: error?.response?.data?.message
            })
            errorHandler(error)
        }
    }
    // end ******

    // start ******
    const loadCatNews = async (id) => {
        let url = `${BASE_URL}/api/News/category`
        if (id) {
            url = `${BASE_URL}/api/News/category/?cat=${id}`
        }
        try {
            catNewsDispatch({ type: CATEGORY_NEWS_REQUEST })
            const res = await axios.get(url)
            if (res.status === 200) {
                const data = await res.data.news
                catNewsDispatch({ type: CATEGORY_NEWS_SUCCESS, payload: data })
            }

        } catch (error) {
            catNewsDispatch({
                type: CATEGORY_NEWS_FAIL,
                payload: error?.response?.data?.message
            })
            errorHandler(error)
        }
    }
    // end ******

    // start ******
    const loadPopularNews = async () => {
        try {
            popularNewsDispatch({ type: POPULAR_NEWS_REQUEST })
            const res = await axios.get(`${BASE_URL}/api/News/popular-news`)
            if (res.status === 200) {
                const data = await res.data.news
                popularNewsDispatch({ type: POPULAR_NEWS_SUCCESS, payload: data })
            }

        } catch (error) {
            popularNewsDispatch({
                type: POPULAR_NEWS_FAIL,
                payload: error?.response?.data?.message
            })
            errorHandler(error)
        }
    }
    // end ******



    // start ******
    const createComment = async (vlalus, formik) => {
        try {
            const res = await axios.post(`${BASE_URL}/api/create-comment`, vlalus)
            if (res.status === 200) {
                formik.resetForm()
                successHandler(res.data?.message, 4000)
            }

        } catch (error) {
            errorHandler(error, 4000)
        }
    }
    // end ******



    // start ******
    const loadCategory = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/api/category/home`)
            if (res.status === 200) {
                const data = await res.data.categories
                setCategories(data)
            }

        } catch (error) {
            errorHandler(error)
        }
    }
    // end ******


    // start ******
    const sendEmailHandler = async (values, setIsloading) => {
        try {
            setIsloading(true)
            const res = await axios.post(`${BASE_URL}/api/sendEmial`, values)
            if (res.status === 200) {
                successHandler(res.data.message, 4000)
                navigate('/')
            }

        } catch (error) {
            errorHandler(error, 4000)
        } finally {
            setIsloading(false)
        }

    }
    // end ******


    useEffect(() => {
        loadVideo()
        loadLastNews()
        loadCategory()
        loadCatNews()
        loadPopularNews()
    }, [])


    return (
        <HomeContext.Provider value={{
            loading: state.loading,
            error: state.error,
            videos: state.videos,
            loadingLastNews: stateLastNews.loading,
            errorLastNews: stateLastNews.error,
            lastNewsData: stateLastNews.lastNews,
            loadingCatNews: stateCatNews.loading,
            errorCatNews: stateCatNews.error,
            catNewsData: stateCatNews.news,
            loadingPopularNews: statePopularNews.loading,
            errorPopularNews: statePopularNews.error,
            popularNewsData: statePopularNews.popularNews,

            categories: categories,
            createComment,
            loadPopularNews,
            sendEmailHandler,
            loadCatNews
        }}>
            {children}
        </HomeContext.Provider>
    )
}