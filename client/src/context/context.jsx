import { createContext, useReducer } from "react"
import { videoReducer } from "./reducer/videoReducer"
import { VIDEO_REQUEST, VIDEO_SUCCESS, VIDEO_FAIL } from "./constants/videoConstans"
import axios from 'axios'
import { errorHandler } from "@src/utils/toast"
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const HomeContext = createContext()
const INITIAL_STATE = {
    loading: true,
    error: "",
    videos: []
}

export const HomeContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(videoReducer, INITIAL_STATE)


    const loadVideo = async () => {
        try {
            dispatch({ type: VIDEO_REQUEST })
            const res = await axios(`${BASE_URL}/api/getSingleVideo`)

            console.log(res);
            if (res.status === 200) {
                const data = res.data
                dispatch({ type: VIDEO_SUCCESS, payload: data })
            }

        } catch (error) {
            dispatch({ type: VIDEO_FAIL, payload: error.response.data.message })
            errorHandler(error.response.data.message)
        }
    }



    return (
        <HomeContext.Provider value={{
            loadVideo
        }}>
            {children}
        </HomeContext.Provider>
    )
}