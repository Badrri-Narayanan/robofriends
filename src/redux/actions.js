import { CHANGE_SEARCH_QUERY, REQUEST_ROBOTS_FAILURE, REQUEST_ROBOTS_PENDING, REQUEST_ROBOTS_SUCCESS } from "./constants";

export const setSearchQuery = (text) => ({
    type: CHANGE_SEARCH_QUERY,
    payload: text,
});

export const requestRobots = () => (dispatch) => {
    dispatch({type: REQUEST_ROBOTS_PENDING});
    fetch("https://jsonplaceholder.typicode.com/users")
        .then(resp => resp.json())
        .then(data => dispatch({type: REQUEST_ROBOTS_SUCCESS, payload: data}))
        .catch(error => dispatch({type: REQUEST_ROBOTS_FAILURE, payload: error}) )
}