import React from 'react';
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
  afterEach(() => jest.restoreAllMocks());

  it('loads robots and filters them by search query, keeping each robot avatar', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({ ok: true, json: () => Promise.resolve(robots) })
    ) as unknown as typeof fetch;

    renderApp();

    expect(await screen.findByText('Bret')).toBeInTheDocument();
    expect(screen.getByText('Antonette')).toBeInTheDocument();

    await userEvent.type(screen.getByRole('searchbox'), 'anto');

    expect(screen.queryByText('Bret')).not.toBeInTheDocument();
    expect(screen.getByText('Antonette')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      'https://robohash.org/2?size=200x200'
    );
  });

  it('shows an error message when the request fails', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({ ok: false, status: 503, json: () => Promise.resolve({}) })
    ) as unknown as typeof fetch;
    jest.spyOn(console, 'error').mockImplementation(() => {});

    renderApp();

    expect(await screen.findByText('Something went wrong')).toBeInTheDocument();
  });
});
