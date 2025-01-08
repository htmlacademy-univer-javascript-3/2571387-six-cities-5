import { AppRoute, City } from '../../types';
import { ListOffers } from '../../components/list-offers/ListOffers';
import UserInfoHeader from '../../components/user-info-header/UserInfoHeader';
import { CardClassNameList } from '../../types';
import React, { useMemo } from 'react';
import { useAppSelector } from '../../hooks';
import { selectUserFavoritesData } from '../../store/user-slice/selectors';
import { Link } from 'react-router-dom';
import FavoritesEmpty from '../../components/favorites-empty/Favorites-empty';

const Favorites: React.FC = () => {
  const userFavoritesOffer = useAppSelector(selectUserFavoritesData);
  const userFavourite = useMemo(() => userFavoritesOffer, [userFavoritesOffer]);

  const citiesSet = new Set<City>;
  userFavourite.forEach((favorite) => {
    citiesSet.add(favorite.city.name);
  });
  const cities = Array.from(citiesSet);

  return (
    <div className="page">
      <UserInfoHeader />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {userFavourite.length === 0 ?
                <FavoritesEmpty /> :
                cities.map((city) => (
                  <li className="favorites__locations-items" key={city}>
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <Link className="locations__item-link" to={AppRoute.Main}>
                          <span>{city}</span>
                        </Link>
                      </div>
                    </div>
                    <div className="favorites__places">
                      <ListOffers offers={userFavourite.filter((offerCity) => offerCity.city.name === city)} cardClassName={CardClassNameList.favoritePlace}/>
                    </div>
                  </li>
                ))}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width={64}
            height={33}
          />
        </a>
      </footer>
    </div>
  );
};

export default React.memo(Favorites);
