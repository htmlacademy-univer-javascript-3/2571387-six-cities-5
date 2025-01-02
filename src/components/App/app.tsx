import { useAppSelector } from '../../hooks';
import { useMemo } from 'react';
import Main from '../../pages/Main/main';
import {AppRoute} from '../../types/index';
import Login from '../../pages/Login/login';
import Favorites from '../../pages/Favorites/favorites';
import Offer from '../../pages/Offer/offer';
import Error404 from '../../pages/Error/404';
import { PrivateRoute } from '../../components/private-router/PrivateRouter';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useInitApp } from '../../hooks/use-init-app';
import { selectCities, selectCurrentCity, selectOffersData } from '../../store/offerSlice';
import { selectAuthStatus } from '../../store/userSlice';

export const App: React.FC = () => {
  useInitApp();

  const city = useAppSelector(selectCurrentCity);
  const currentCity = useMemo(() => city, [city]);

  const offersList = useAppSelector(selectOffersData);
  const offers = useMemo(() => offersList, [offersList]);

  const citiesList = useAppSelector(selectCities);
  const cities = useMemo(() => citiesList, [citiesList]);

  const authStatus = useAppSelector(selectAuthStatus);
  const authorizationStatus = useMemo(() => authStatus, [authStatus]);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={
            <Main offers={offers} currentCity={currentCity} cities={cities}/>
          }
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <Favorites offers={offers}/>
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Login}
          element={<Login />}
        />
        <Route
          path={`${AppRoute.Offer}:id`}
          element={<Offer />}
        />
        <Route
          path='*'
          element={<Error404/>}
        />
      </Routes>
    </BrowserRouter>
  );
};
