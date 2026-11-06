import { afterEach, describe, expect, it, vi } from 'vitest';
import { REQUEST_ROBOTS_FAILURE, REQUEST_ROBOTS_PENDING, REQUEST_ROBOTS_SUCCESS } from './constants';
import { requestRobots } from './actions';

const robots = [{ id: 1, name: 'Leanne Graham', username: 'Bret', email: 'a@b.c' }];

const mockFetch = (impl: () => Promise<unknown>) => {
  global.fetch = vi.fn(impl) as unknown as typeof fetch;
};

describe('requestRobots thunk', () => {
  afterEach(() => vi.restoreAllMocks());

  it('dispatches PENDING then SUCCESS with the robots', async () => {
    mockFetch(() => Promise.resolve({ ok: true, json: () => Promise.resolve(robots) }));
    const dispatch = vi.fn();

    await requestRobots()(dispatch);

    expect(dispatch.mock.calls).toEqual([
      [{ type: REQUEST_ROBOTS_PENDING }],
      [{ type: REQUEST_ROBOTS_SUCCESS, payload: robots }],
    ]);
  });

  it('dispatches FAILURE when the response is not ok', async () => {
    mockFetch(() => Promise.resolve({ ok: false, status: 500, json: () => Promise.resolve({}) }));
    const dispatch = vi.fn();

    await requestRobots()(dispatch);

    expect(dispatch).toHaveBeenLastCalledWith({
      type: REQUEST_ROBOTS_FAILURE,
      payload: 'Request failed with status 500',
    });
  });

  it('dispatches FAILURE with the message on a network error', async () => {
    mockFetch(() => Promise.reject(new Error('Network down')));
    const dispatch = vi.fn();

    await requestRobots()(dispatch);

    expect(dispatch).toHaveBeenLastCalledWith({
      type: REQUEST_ROBOTS_FAILURE,
      payload: 'Network down',
    });
  });
});
