import { createContext, useEffect, useReducer, useState } from "react"
import { errorHandler } from "@src/utils/toast"
import axios from 'axios'
import { VIDEO_REQUEST, VIDEO_SUCCESS, VIDEO_FAIL } from "./constants/videoConstans"
import { LAST_NEWS_REQUEST, LAST_NEWS_SUCCESS, LAST_NEWS_FAIL } from "./constants/lastNewsConstans"
import { CATEGORY_NEWS_REQUEST, CATEGORY_NEWS_SUCCESS, CATEGORY_NEWS_FAIL } from "./constants/categoryNewsConstans"
import { INITIAL_STATE, INITIAL_STATE_LAST_NEWS, INITIAL_STATE_CATEGORY_NEWS } from "./InitialStates"
import { lastNewsRaducer } from "./reducer/lastNewsRaducer"
import { videoReducer } from "./reducer/videoReducer"
import { categoryNewsRaducer } from "./reducer/categoryNewsRaducer"


const BASE_URL = import.meta.env.VITE_BASE_URL;

export const HomeContext = createContext()


export const HomeContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(videoReducer, INITIAL_STATE)
    const [stateCatNews, catNewsDispatch] = useReducer(categoryNewsRaducer, INITIAL_STATE_CATEGORY_NEWS)
    const [stateLastNews, lastNewsDispatch] = useReducer(lastNewsRaducer, INITIAL_STATE_LAST_NEWS)

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
            dispatch({ type: VIDEO_FAIL, payload: error.response.data.message })
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
                payload: error.response.data.message
            })
            errorHandler(error)
        }
    }
    // end ******

    // start ******
    const loadCatNews = async () => {
        try {
            catNewsDispatch({ type: CATEGORY_NEWS_REQUEST })
            const res = await axios.get(`${BASE_URL}/api/News/category`)
            if (res.status === 200) {
                const data = await res.data.news
                catNewsDispatch({ type: CATEGORY_NEWS_SUCCESS, payload: data })
            }

        } catch (error) {
            catNewsDispatch({ type: CATEGORY_NEWS_FAIL, payload: error.response.data.message })
            errorHandler(error)
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


    useEffect(() => {
        loadVideo()
        loadLastNews()
        loadCategory()
        loadCatNews()
    }, [])


    return (
        <HomeContext.Provider value={{
            loading: state.loading,
            error: state.error,
            videos: state.videos,
            loadingLastNews: stateLastNews.loading,
            errorLastNews: stateLastNews.error,
            lastNewsData: stateLastNews.lastNews,
            loadingCatNews:stateCatNews.loading,
            errorCatNews:stateCatNews.error,
            catNewsData:stateCatNews.news,
            
            categories: categories

        }}>
            {children}
        </HomeContext.Provider>
    )
}