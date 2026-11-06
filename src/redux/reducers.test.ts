import { describe, expect, it } from 'vitest';
import {
  CHANGE_SEARCH_QUERY,
  REQUEST_ROBOTS_FAILURE,
  REQUEST_ROBOTS_PENDING,
  REQUEST_ROBOTS_SUCCESS,
} from './constants';
import { requestRobots, searchRobots } from './reducers';

const robot = { id: 1, name: 'Leanne Graham', username: 'Bret', email: 'a@b.c' };

describe('searchRobots', () => {
  it('returns the initial state', () => {
    expect(searchRobots(undefined, { type: '@@INIT' })).toEqual({ searchQuery: '' });
  });

  it('stores the search query', () => {
    expect(searchRobots(undefined, { type: CHANGE_SEARCH_QUERY, payload: 'bre' })).toEqual({
      searchQuery: 'bre',
    });
  });
});

describe('requestRobots', () => {
  it('returns the initial state', () => {
    expect(requestRobots(undefined, { type: '@@INIT' })).toEqual({
      isPending: false,
      robotsList: [],
      error: '',
    });
  });

  it('sets isPending and clears a previous error on PENDING', () => {
    const failed = { isPending: false, robotsList: [], error: 'boom' };
    expect(requestRobots(failed, { type: REQUEST_ROBOTS_PENDING })).toEqual({
      isPending: true,
      robotsList: [],
      error: '',
    });
  });

  it('stores robots on SUCCESS', () => {
    const pending = { isPending: true, robotsList: [], error: '' };
    expect(requestRobots(pending, { type: REQUEST_ROBOTS_SUCCESS, payload: [robot] })).toEqual({
      isPending: false,
      robotsList: [robot],
      error: '',
    });
  });

  it('stores the error message on FAILURE', () => {
    const pending = { isPending: true, robotsList: [], error: '' };
    expect(requestRobots(pending, { type: REQUEST_ROBOTS_FAILURE, payload: 'boom' })).toEqual({
      isPending: false,
      robotsList: [],
      error: 'boom',
    });
  });
});
