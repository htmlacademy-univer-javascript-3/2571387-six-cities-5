import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/app';

// Описываем данные для компонента главной страницы
const offersCount = 312; // Количество предложений для аренды

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    {/* Передаем данные в компонент App через пропсы */}
    <App offersCount={offersCount} />
  </React.StrictMode>,
);
