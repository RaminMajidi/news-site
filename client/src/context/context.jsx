import { createContext, useEffect, useReducer } from "react"
import { errorHandler } from "@src/utils/toast"
import axios from 'axios'
import { VIDEO_REQUEST, VIDEO_SUCCESS, VIDEO_FAIL } from "./constants/videoConstans"
import { LAST_NEWS_REQUEST, LAST_NEWS_SUCCESS, LAST_NEWS_FAIL } from "./constants/lastNewsConstans"
import { INITIAL_STATE, INITIAL_STATE_LAST_NEWS } from "./InitialStates"
import { lastNewsRaducer } from "./reducer/lastNewsRaducer"
import { videoReducer } from "./reducer/videoReducer"


const BASE_URL = import.meta.env.VITE_BASE_URL;

export const HomeContext = createContext()


export const HomeContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(videoReducer, INITIAL_STATE)
    const [stateLastNews, lastNewsDispatch] = useReducer(lastNewsRaducer, INITIAL_STATE_LAST_NEWS)


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

            console.log(res);
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



    useEffect(() => {
        loadVideo()
        loadLastNews()
    }, [])


    return (
        <HomeContext.Provider value={{
            loading: state.loading,
            error: state.error,
            videos: state.videos,
            loadingLastNews: stateLastNews.loading,
            errorLastNews: stateLastNews.error,
            lastNewsData: stateLastNews.lastNews

        }}>
            {children}
        </HomeContext.Provider>
    )
}