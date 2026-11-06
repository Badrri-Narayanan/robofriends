import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { createAppStore } from '../../redux/store';
import App from './App';

const robots = [
  { id: 1, name: 'Leanne Graham', username: 'Bret', email: 'bret@example.com' },
  { id: 2, name: 'Ervin Howell', username: 'Antonette', email: 'antonette@example.com' },
];

const renderApp = () =>
  render(
    <Provider store={createAppStore()}>
      <App />
    </Provider>
  );

describe('App', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('loads robots and filters them by search query, keeping each robot avatar', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve(robots) }))
    );
    const user = userEvent.setup();

    renderApp();

    expect(await screen.findByText('Bret')).toBeInTheDocument();
    expect(screen.getByText('Antonette')).toBeInTheDocument();

    await user.type(screen.getByRole('searchbox'), 'anto');

    expect(screen.queryByText('Bret')).not.toBeInTheDocument();
    expect(screen.getByText('Antonette')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      'https://robohash.org/2?size=200x200'
    );
  });

  it('matches the full name as well as the username', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve(robots) }))
    );
    const user = userEvent.setup();

    renderApp();
    await screen.findByText('Bret');

    await user.type(screen.getByRole('searchbox', { name: 'Search robots' }), 'leanne');

    expect(screen.getByText('Bret')).toBeInTheDocument();
    expect(screen.queryByText('Antonette')).not.toBeInTheDocument();
    expect(screen.getByAltText("Bret's robot avatar")).toBeInTheDocument();
  });

  it('shows an error with a retry button that refetches', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({ ok: false, status: 503, json: () => Promise.resolve({}) })
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(robots) });
    vi.stubGlobal('fetch', fetchMock);
    vi.spyOn(console, 'error').mockImplementation(() => {});
    const user = userEvent.setup();

    renderApp();

    expect(await screen.findByText('Something went wrong')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Try again' }));

    expect(await screen.findByText('Bret')).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});
