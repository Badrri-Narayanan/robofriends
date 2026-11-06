import { AnyAction } from 'redux';
import { RobotDetails } from '../containers/App/App.types';
import {
  CHANGE_SEARCH_QUERY,
  REQUEST_ROBOTS_FAILURE,
  REQUEST_ROBOTS_PENDING,
  REQUEST_ROBOTS_SUCCESS,
} from './constants';

export type SearchState = { searchQuery: string };

const initialStateSearch: SearchState = {
  searchQuery: '',
};

export const searchRobots = (state = initialStateSearch, action: AnyAction): SearchState => {
  switch (action.type) {
    case CHANGE_SEARCH_QUERY:
      return { ...state, searchQuery: action.payload };
    default:
      return state;
  }
};

export type RobotsState = {
  isPending: boolean;
  robotsList: RobotDetails[];
  error: string;
};

const initialStateRobots: RobotsState = {
  isPending: false,
  robotsList: [],
  error: '',
};

export const requestRobots = (state = initialStateRobots, action: AnyAction): RobotsState => {
  switch (action.type) {
    case REQUEST_ROBOTS_PENDING:
      return { ...state, isPending: true, error: '' };
    case REQUEST_ROBOTS_SUCCESS:
      return { ...state, isPending: false, robotsList: action.payload };
    case REQUEST_ROBOTS_FAILURE:
      return { ...state, isPending: false, error: action.payload };
    default:
      return state;
  }
};
