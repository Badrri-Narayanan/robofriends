import { CHANGE_SEARCH_QUERY, REQUEST_ROBOTS_FAILURE, REQUEST_ROBOTS_PENDING, REQUEST_ROBOTS_SUCCESS } from "./constants"

const initialStateSearch = {
    searchQuery: '',
}

export const searchRobots = (state=initialStateSearch, action={}) => {
    switch(action.type) {
        case CHANGE_SEARCH_QUERY:
            return { 
                ...state, 
                searchQuery: action.payload,
            }
            
        default: return state;
    }
}

const initialStateRobots = {
    isPending: false,
    robotsList: [],
    error: ''
}

export const requestRobots = (state=initialStateRobots, action={}) => {
    switch(action.type) {
        case REQUEST_ROBOTS_PENDING:
            return {
                ...state,
                isPending: true,
            }
        case REQUEST_ROBOTS_SUCCESS:
            return {
                ...state,
                isPending: false,
                robotsList: action.payload,
            }
        case REQUEST_ROBOTS_FAILURE:
            return {
                ...state,
                error: action.payload,
                isPending: false,
            }
        default:
            return state;
    }
}