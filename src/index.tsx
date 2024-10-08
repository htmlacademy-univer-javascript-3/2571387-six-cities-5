import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <h1>Hello, World!</h1>
    <App />
  </React.StrictMode>,
);
