import { withStore, withHistory } from '../../mocks/mockComponents';
import { screen, render } from '@testing-library/react';
import makeFakeOffer from '../../mocks/makeFakeOffer';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { makeFakeStore, SelectorFunction } from '../../mocks/mocks';
import Main from './main';
import makeFakeCityData from '../../mocks/makeFakeCityData';
import { CITIES } from '../../types/cities';

vi.mock('../../hooks', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

describe('Component: Main', () => {
  const mockDispatch = vi.fn();
  const fakeCurrentCityData = makeFakeCityData();
  const fakeOffersList = [makeFakeOffer()];
  beforeEach(() => {
    vi.clearAllMocks();
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useAppSelector as jest.Mock).mockImplementation((selector: SelectorFunction) => {
      if (selector.name === 'selectUserFavoritesData') {
        return [];
      }
    });
  });

  it('should render correctly with main when offers !== 0', () => {
    const withHistoryComponent = withHistory(<Main cities={CITIES} currentCity={fakeCurrentCityData} offers={fakeOffersList}/>);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    const citiesListTestId = 'cities-list';
    const cityPlaceTestId = 'city-place';
    const expectedCity = 'Paris';
    const offerCardTestId = 'offer-card';
    const expectedLength = fakeOffersList.length;

    render(withStoreComponent);
    const citiesList = screen.getByTestId(citiesListTestId);
    const cityTextParagraf = screen.getByTestId(cityPlaceTestId);
    const offersCard = screen.getAllByTestId(offerCardTestId);

    expect(offersCard).toHaveLength(expectedLength);
    expect(citiesList).toBeInTheDocument();
    expect(cityTextParagraf).toHaveTextContent(expectedCity);
  });

  it('should render correctly with main when offers === 0', () => {
    const withHistoryComponent = withHistory(<Main cities={CITIES} currentCity={fakeCurrentCityData} offers={[]}/>);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    const citiesListTestId = 'cities-list';
    const cityPlaceTestId = 'city-place';
    const expectedCity = 'Paris';
    const emptyMainTestId = 'empty-main-container';

    render(withStoreComponent);
    const citiesList = screen.getByTestId(citiesListTestId);
    const cityTextParagraf = screen.getByTestId(cityPlaceTestId);
    const emptyMainContainer = screen.getByTestId(emptyMainTestId);

    expect(emptyMainContainer).toBeInTheDocument();
    expect(citiesList).toBeInTheDocument();
    expect(cityTextParagraf).toHaveTextContent(expectedCity);
  });
});
