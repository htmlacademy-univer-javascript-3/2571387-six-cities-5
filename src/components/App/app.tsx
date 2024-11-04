import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from '../../pages/Main/main';
import {Login} from '../../pages/Login/login';
import {Offer} from '../../pages/Offer/offer';
import {Favorites} from '../../pages/Favorites/favorites';
import Error404 from '../../pages/Error/404';
import CheckAuth from '../../pages/CheckAuth/CheckAuth';

// Интерфейс для пропсов компонента App
interface AppProps {
  offersCount: number;
}

export const App: React.FC<AppProps> = ({ offersCount }) => (
  <BrowserRouter>
    <Routes>
      {/* Передаем данные из App в MainPage */}
      <Route path="/" element={<MainPage offersCount={offersCount} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/favorites" element={<CheckAuth element={<Favorites />} isAuthorized={false}></CheckAuth>} />
      <Route path="/offer/:id" element={<Offer />} />
      <Route path="/*" element={<Error404 />} />
    </Routes>
  </BrowserRouter>
);

//export default App;
