import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppRoute, AuthorizationStatus } from './types';
import { App } from './components/App/app';
import { Login } from './pages/Login/login';
import { Favorites } from './pages/Favorites/favorites';
import { Offer } from './pages/Offer/offer';
import Error404 from './pages/Error/404';
import { PrivateRoute } from './components/private-router/PrivateRouter';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { OFFERS_CARDS, CITY } from './mocks/offers';
import { REVIEWS } from './mocks/reviews';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={
            <App
              offers={OFFERS_CARDS}
              currentCity={CITY}
            />
          }
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
              <Favorites offers={OFFERS_CARDS}/>
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Login}
          element={<Login />}
        />
        <Route
          path={AppRoute.Offer}
          element={<Offer reviews={REVIEWS} offers={OFFERS_CARDS} currentCity={CITY}/>}
        />
        <Route
          path='*'
          element={<Error404 />}
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
