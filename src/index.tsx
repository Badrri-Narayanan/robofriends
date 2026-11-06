import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import 'tachyons/css/tachyons.min.css';
import App from './containers/App/App';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { createAppStore } from './redux/store';

const store = createAppStore();

const container = document.getElementById('root')

if (!container) throw new Error('Failed to find the root element');

const root = ReactDOM.createRoot(container)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>
)

