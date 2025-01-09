import { ListOffers } from './ListOffers.tsx';
import { withHistory, withStore } from '../../utils/mocks/mockcomponents.tsx';
import { render, screen } from '@testing-library/react';
import makeFakeOffer from '../../utils/makeFakeOffer';
import { CardClassNameList, NameSpace } from '../../types/index.ts';
import { mockUserInitialState } from '../../utils/mocks/mocks.ts';

describe('Component: ListOffers', () => {
  it('should render correctly', () => {
    const offerCardTestId = 'offer-card';
    const fakeOffers = new Array(3).fill(null).map(() => makeFakeOffer());
    const expectedLength = fakeOffers.length;
    const {withStoreComponent} = withStore(<ListOffers offers={fakeOffers} cardClassName={CardClassNameList.citiesList}/>, {
      [NameSpace.USER]: mockUserInitialState,
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    const offersCard = screen.getAllByTestId(offerCardTestId);

    expect(offersCard).toHaveLength(expectedLength);
  });
});
