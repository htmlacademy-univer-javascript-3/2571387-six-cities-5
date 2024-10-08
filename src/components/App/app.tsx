// src/components/App/app.tsx
import React from 'react';
import MainPage from '../../pages/Main/main';

// Интерфейс для пропсов компонента App
interface AppProps {
  offersCount: number;
}

const App: React.FC<AppProps> = ({ offersCount }) => (
  <div>
    {/* Передаем данные из App в MainPage */}
    <MainPage offersCount={offersCount} />
  </div>
);

export default App;
