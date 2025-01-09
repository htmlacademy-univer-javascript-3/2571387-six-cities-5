import { render, screen } from '@testing-library/react';
import useFilter from './use-fiter';
import { CityData, offerCard, SortName } from '../types';
import makeFakeCityData from '../utils/makeFakeCityData';
import makeFakeOffer from '../utils/makeFakeOffer';

type TestComponentProps = {
  offers: offerCard[];
};

const currentCity = {
  ...makeFakeCityData(),
  name: 'Paris',
} as CityData;

const fakeOffers = [
  {
    ...makeFakeOffer(),
    city: currentCity,
    price: 1,
    rating: 5,
  },
  {
    ...makeFakeOffer(),
    city: currentCity,
    price: 10,
    rating: 4,
  },
  {
    ...makeFakeOffer(),
    city: currentCity,
    price: 100,
    rating: 3,
  },
];

const TestComponent: React.FC<TestComponentProps> = ({ offers }) => {
  const filteredOfferByLowPrice = useFilter({offers, currentCity, sortType: SortName.lowToHigh});
  const filteredOfferByHighPrice = useFilter({offers, currentCity, sortType: SortName.highToLow});
  const filteredOfferByRating = useFilter({offers, currentCity, sortType: SortName.topRated});
  const filteredByDefault = useFilter({offers, currentCity, sortType: SortName.popular});

  return (
    <div>
      {(filteredOfferByLowPrice[0].price === 1) ? <p>Отрисован объект c наименьшей стоимостью </p> : null}
      {(filteredOfferByHighPrice[0].price === 100) ? <p>Отрисован объект c наибольшей стоимостью </p> : null}
      {(filteredOfferByRating[0].rating === 5) ? <p>Отрисован объект c наибольшим рейтингом </p> : null}
      {(JSON.stringify(filteredByDefault[0]) === JSON.stringify(offers[0])) ? <p>Отрисован объект переданный первым по умолчанию </p> : null}
    </div>
  );
};

export default TestComponent;

describe('useFilter', () => {
  it('should render component according to filter', () => {
    const expectedTextLowPrice = 'Отрисован объект c наименьшей стоимостью';
    const expectedTextHighPrice = 'Отрисован объект c наибольшей стоимостью';
    const expectedTextHighRating = 'Отрисован объект c наибольшим рейтингом';
    const expectedTextByDefault = 'Отрисован объект переданный первым по умолчанию';

    render(<TestComponent offers={fakeOffers} />);
    expect(screen.getByText(expectedTextLowPrice)).toBeInTheDocument();
    expect(screen.getByText(expectedTextHighPrice)).toBeInTheDocument();
    expect(screen.getByText(expectedTextHighRating)).toBeInTheDocument();
    expect(screen.getByText(expectedTextByDefault)).toBeInTheDocument();

  });
});
