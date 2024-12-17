import React from 'react';
import { City, CityData } from '../../types';

const CITY_ACTIVE = 'tabs__item--active';

type ListCitiesProps = {
  currentCity: City;
  cities: CityData[];
  onUserSelect: (cityName: City) => void;
}

export const ListCities: React.FC<ListCitiesProps> = ({
  currentCity,
  cities,
  onUserSelect,
}) => (
  <ul className="locations__list tabs__list">
    {cities.map((city) => (
      <li
        className="locations__item"
        key={city.title}
        onClick={() => {
          onUserSelect(city.title);
        }}
      >
        <div className={`
          locations__item-link 
          tabs__item
          ${currentCity === city.title ? CITY_ACTIVE : ''}
          `}
        >
          <span>{city.title}</span>
        </div>
      </li>
    )
    )}
  </ul>
);
