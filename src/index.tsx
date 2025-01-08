import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/App/app';
import { Provider } from 'react-redux';
import { store } from './store';
import ErrorMessage from './components/error-message/Error-message';
import HistoryRouter from './components/history-router/HistoryRouter';
import browserHistory from './services/browserHistory';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <ErrorMessage />
        <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>
);
