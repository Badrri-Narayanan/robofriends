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

  it('shows an error message when the request fails', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.resolve({ ok: false, status: 503, json: () => Promise.resolve({}) }))
    );
    vi.spyOn(console, 'error').mockImplementation(() => {});

    renderApp();

    expect(await screen.findByText('Something went wrong')).toBeInTheDocument();
  });
});
