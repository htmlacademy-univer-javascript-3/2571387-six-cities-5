import React, { useState, useMemo, useCallback } from 'react';
import { offerCard, CityData } from '../../types';
import { ListOffers } from '../../components/list-offers/ListOffers';
import Map from '../../components/map/Map';
import useFilter from '../../hooks/use-fiter';
import { CardClassNameList, SortName } from '../../types';
import { useAppDispatch } from '../../hooks';
import { ListCities } from '../../components/list-cities/ListCities';
import { FilterOffer } from '../../components/filter-offers/FilterOffer';
import { useAppSelector } from '../../hooks';
import LoadingScreen from '../../components/loader-screen/LoadingScreen';
import UserInfoHeader from '../../components/user-info-header/UserInfoHeader';
import { selectOffersLoading, changeSelectedCity } from '../../store/offerSlice';

type MainProps = {
  offers: offerCard[];
  currentCity: CityData;
  cities: CityData[];
};

const Main: React.FC<MainProps> = ({
  offers,
  currentCity,
  cities,
}:MainProps) => {
  const dispatch = useAppDispatch();

  const OffersLoading = useAppSelector(selectOffersLoading);
  const isOffersLoading = useMemo(() => OffersLoading, [OffersLoading]);

  const handleUserSelectCity = useCallback((city: CityData) => {
    dispatch(changeSelectedCity(city));
  },
  [offers]);

  const [activeOffer, setActiveOffer] = useState<string | null>(null);
  const [sortType, setSortType] = useState<SortName>(SortName.popular);

  const sortedOffersList = useFilter({offers, currentCity, sortType});
  const sortedOffers = useMemo(() => sortedOffersList, [sortedOffersList]);

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
                { isOffersLoading ?
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

export default React.memo(Main);
