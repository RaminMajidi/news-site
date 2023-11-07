import { CATEGORY_NEWS_FAIL,CATEGORY_NEWS_REQUEST,CATEGORY_NEWS_SUCCESS} from "../constants/categoryNewsConstans"


export const categoryNewsRaducer = (state = { news: [] }, action) => {

    switch (action.type) {
        case CATEGORY_NEWS_REQUEST:
            return {
                loading: true,
                news: [],
            }

        case CATEGORY_NEWS_SUCCESS:
            return {
                loading: false,
                news: action.payload,
            }

        case CATEGORY_NEWS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }

}