import { afterEach, describe, expect, it, vi } from 'vitest';
import { createAppStore } from './store';
import { fetchRobots } from './robotsSlice';

const robots = [{ id: 1, name: 'Leanne Graham', username: 'Bret', email: 'a@b.c' }];

const mockFetch = (impl: () => Promise<unknown>) => {
  vi.stubGlobal('fetch', vi.fn(impl));
};

describe('robots slice', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('starts empty', () => {
    expect(createAppStore().getState().robots).toEqual({
      isPending: false,
      robotsList: [],
      error: '',
    });
  });

  it('is pending while the request is in flight', () => {
    mockFetch(() => new Promise(() => {}));
    const store = createAppStore();

    store.dispatch(fetchRobots());

    expect(store.getState().robots.isPending).toBe(true);
  });

  it('stores robots on success', async () => {
    mockFetch(() => Promise.resolve({ ok: true, json: () => Promise.resolve(robots) }));
    const store = createAppStore();

    await store.dispatch(fetchRobots());

    expect(store.getState().robots).toEqual({ isPending: false, robotsList: robots, error: '' });
  });

  it('stores an error message when the response is not ok', async () => {
    mockFetch(() => Promise.resolve({ ok: false, status: 500, json: () => Promise.resolve({}) }));
    const store = createAppStore();

    await store.dispatch(fetchRobots());

    expect(store.getState().robots).toMatchObject({
      isPending: false,
      error: 'Request failed with status 500',
    });
  });

  it('stores the message on a network error', async () => {
    mockFetch(() => Promise.reject(new Error('Network down')));
    const store = createAppStore();

    await store.dispatch(fetchRobots());

    expect(store.getState().robots.error).toBe('Network down');
  });

  it('clears a previous error when a new request starts', async () => {
    mockFetch(() => Promise.reject(new Error('Network down')));
    const store = createAppStore();
    await store.dispatch(fetchRobots());

    mockFetch(() => new Promise(() => {}));
    store.dispatch(fetchRobots());

    expect(store.getState().robots).toMatchObject({ isPending: true, error: '' });
  });
});
