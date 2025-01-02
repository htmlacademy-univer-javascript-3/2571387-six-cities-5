import { CityData, offerCard, SortName } from '../types';

type useFilterProps = {
  offers: offerCard[];
  currentCity: CityData;
  sortType: SortName;
}


const useFilter = ({offers, currentCity, sortType}: useFilterProps) =>
  offers.filter((offer) =>
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
    }
    );

export default useFilter;
