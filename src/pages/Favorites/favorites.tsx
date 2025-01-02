import { offerCard } from '../../types';
import { ListOffers } from '../../components/list-offers/ListOffers';
import UserInfoHeader from '../../components/user-info-header/UserInfoHeader';
import { CardClassNameList } from '../../types';
import React from 'react';

type FavoritesProps = {
  offers: offerCard[];
}

const Favorites: React.FC<FavoritesProps> = ({
  offers
}) => (
  <div className="page">
    <UserInfoHeader />
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <ul className="favorites__list">
            <ListOffers offers={offers} cardClassName={CardClassNameList.favoritePlace}/>
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

export default React.memo(Favorites);
