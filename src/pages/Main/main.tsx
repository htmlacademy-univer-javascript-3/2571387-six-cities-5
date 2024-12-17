import React, { useState } from 'react';
import { offerCard, CityData, City } from '../../types';
import { ListOffers } from '../../components/list-offers/ListOffers';
import { Map } from '../../components/map/Map';
import { CardClassNameList, SortName } from '../../types';
import { useAppDispatch } from '../../hooks';
import { changeSelectedCity } from '../../store/action';
import { ListCities } from '../../components/list-cities/ListCities';
import { FilterOffer } from '../../components/filter-offers/FilterOffer';
import { useAppSelector } from '../../hooks';
import LoadingScreen from '../../components/loader-screen/LoadingScreen';
import { UserInfoHeader } from '../../components/user-info-header/UserInfoHeader';

type MainProps = {
  offers: offerCard[];
  currentCity: CityData;
  cities: CityData[];
};

export const Main: React.FC<MainProps> = ({
  offers,
  currentCity,
  cities,
}:MainProps) => {
  const dispatch = useAppDispatch();
  const isOfferLoading = useAppSelector((state) => state.offersLoading);

  const handleUserSelectCity = (cityName: City) => {
    dispatch(changeSelectedCity(cityName));
  };

  const [activeOffer, setActiveOffer] = useState<number | null>(null);

  const [sortType, setSortType] = useState<SortName>(SortName.popular);
  const sortedOffers = offers
    .filter((offer) =>
      offer.city.name === currentCity.name)
    .sort((a, b) => {
      switch (sortType) {
        case SortName.lowToHigh:
          return a.price - b.price;
        case SortName.highToLow:
          return b.price - a.price;
        case SortName.topRated:
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  return (
    <div className="page page--gray page--main">
      <UserInfoHeader />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ListCities currentCity={currentCity.name} cities={cities} onUserSelect={handleUserSelectCity}/>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {sortedOffers.length} places to stay in {currentCity.name}
              </b>
              <FilterOffer currentSort={sortType} onSortChange={setSortType} />
              <div className="cities__places-list places__list tabs__content">
                { isOfferLoading ?
                  <LoadingScreen /> :
                  <ListOffers offers={sortedOffers} cardClassName={CardClassNameList.citiesList} setActiveOffer={setActiveOffer} /> }
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map currentCity={currentCity} offers={sortedOffers} activeOffer={activeOffer} />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
