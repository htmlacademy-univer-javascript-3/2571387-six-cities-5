import { useAppSelector } from '../../hooks';
import { Main } from '../../pages/Main/main';
import { AppRoute} from '../../types/index';
import { Login } from '../../pages/Login/login';
import { Favorites } from '../../pages/Favorites/favorites';
import { Offer } from '../../pages/Offer/offer';
import Error404 from '../../pages/Error/404';
import { PrivateRoute } from '../../components/private-router/PrivateRouter';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { REVIEWS } from '../../mocks/reviews';
import { useInitApp } from '../../hooks/use-init-app';

// import { CityData, offerCard } from '../../types';

// interface IAppProps {
//   offers: offerCard[];
//   currentCity: CityData;
// }

export const App: React.FC = () => {
  useInitApp();

  const currentCity = useAppSelector((state) => state.currentCity);
  const offers = useAppSelector((state) => state.offers);
  const cities = useAppSelector((state) => state.cities);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

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
          path={AppRoute.Offer}
          element={<Offer reviews={REVIEWS} offers={offers} currentCity={currentCity}/>}
        />
        <Route
          path='*'
          element={<Error404 />}
        />
      </Routes>
    </BrowserRouter>
  );
};

