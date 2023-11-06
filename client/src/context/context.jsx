import { createContext, useReducer } from "react"
import { videoReducer } from "./reducer/reducerVideo"

export const HomeContext = createContext()


export const HomeContextProvider = ({ children }) => {
    const INITIAL_STATE = {
        loading: true,
        error: "",
        videos: []
    }
    const [state, dispatch] = useReducer(videoReducer, INITIAL_STATE)
    return (
        <HomeContext.Provider value={{}}>
            {children}
        </HomeContext.Provider>
    )
}