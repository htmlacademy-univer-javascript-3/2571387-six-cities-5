import Offer from '../../pages/Offer/offer';
import Main from '../../pages/Main/main';
import Login from '../../pages/Login/login';
import { useAppSelector } from '../../hooks';
import { useMemo } from 'react';
import { AppRoute } from '../../types/index';
import Favorites from '../../pages/Favorites/favorites';
import Error404 from '../../pages/Error/404';
import { PrivateRoute } from '../private-router/PrivateRouter';
import { Route, Routes } from 'react-router-dom';
import { useInitApp } from '../../hooks/use-init-app';
import { selectCities, selectCurrentCity, selectOffersData } from '../../store/offer-slice/selectors';
import { selectAuthStatus } from '../../store/user-slice/selectors';
import { HelmetProvider } from 'react-helmet-async';

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
    <HelmetProvider>
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
              <Favorites />
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
          element={<Error404 />}
        />
      </Routes>
    </HelmetProvider>
  );
};
