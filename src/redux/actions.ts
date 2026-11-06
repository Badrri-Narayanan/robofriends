import { Dispatch } from 'redux';
import { RobotDetails } from '../containers/App/App.types';
import {
  CHANGE_SEARCH_QUERY,
  REQUEST_ROBOTS_FAILURE,
  REQUEST_ROBOTS_PENDING,
  REQUEST_ROBOTS_SUCCESS,
} from './constants';

const ROBOTS_URL = 'https://jsonplaceholder.typicode.com/users';

export const setSearchQuery = (text: string) => ({
  type: CHANGE_SEARCH_QUERY,
  payload: text,
});

export const requestRobots = () => async (dispatch: Dispatch) => {
  dispatch({ type: REQUEST_ROBOTS_PENDING });
  try {
    const resp = await fetch(ROBOTS_URL);
    if (!resp.ok) {
      throw new Error(`Request failed with status ${resp.status}`);
    }
    const data: RobotDetails[] = await resp.json();
    dispatch({ type: REQUEST_ROBOTS_SUCCESS, payload: data });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    dispatch({ type: REQUEST_ROBOTS_FAILURE, payload: message });
  }
};
