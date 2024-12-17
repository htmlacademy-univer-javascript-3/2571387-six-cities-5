import React, { useState } from 'react';
import { SortName } from '../../types';

type FilterOfferProps = {
  currentSort: SortName;
  onSortChange: (sortType: SortName) => void;
}

const SORT_TYPES = [
  { label: 'Popular', value: SortName.popular },
  { label: 'Price: low to high', value: SortName.lowToHigh },
  { label: 'Price: high to low', value: SortName.highToLow },
  { label: 'Top rated first', value: SortName.topRated },
];

const SORT_ACTIVE = 'places__option--active';

export const FilterOffer: React.FC<FilterOfferProps> = ({
  currentSort,
  onSortChange,
}) => {
  const [isActive, setActive] = useState(false);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type"
        tabIndex={0}
        onClick={() => setActive((prevstate) => !prevstate)}
      >
        {SORT_TYPES.find((sort) => sort.value === currentSort)?.label || ''}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      {isActive &&
        <ul className="places__options places__options--custom places__options--opened">
          {SORT_TYPES.map((sort) => (
            <li
              key={sort.value}
              className={`places__option ${currentSort === sort.value ? SORT_ACTIVE : ''}`}
              tabIndex={0}
              onClick={() => onSortChange(sort.value)}
            >
              {sort.label}
            </li>
          ))}
        </ul>}
    </form>
  );
};
