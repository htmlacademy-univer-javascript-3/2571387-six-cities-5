import React from 'react';
import { City, CityData } from '../../types';

const CITY_ACTIVE = 'tabs__item--active';

type ListCitiesProps = {
  currentCity: City;
  cities: CityData[];
  onUserSelect: (city: CityData) => void;
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
        key={city.name}
        onClick={() => {
          onUserSelect(city);
        }}
      >
        <div className={`
          locations__item-link 
          tabs__item
          ${currentCity === city.name ? CITY_ACTIVE : ''}
          `}
        >
          <span>{city.name}</span>
        </div>
      </li>
    )
    )}
  </ul>
);
