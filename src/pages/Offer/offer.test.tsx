import { withStore, withHistory } from '../../utils/mocks/mockcomponents';
import { screen, render } from '@testing-library/react';
import makeFakeOffer from '../../utils/makeFakeOffer';
import makeFakeUserData from '../../utils/makeFakeUserData';
import { AuthorizationStatus, NameSpace } from '../../types/index';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { mockUserInitialState, mockOfferInitialState, makeFakeStore, SelectorFunction } from '../../utils/mocks/mocks';
import Offer from './offer';
import makeFakeCityData from '../../utils/makeFakeCityData';
import makeFakeReview from '../../utils/makeFakeReviews';

vi.mock('../../hooks', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

describe('Component: Offer', () => {
  const mockDispatch = vi.fn();
  const fakeCurrentCityData = makeFakeCityData();
  const fakeUserData = makeFakeUserData();
  const expectedOffer = makeFakeOffer();
  const fakeReviewsList = [makeFakeReview()];
  const fakeNearOffersList = [makeFakeOffer()];
  beforeEach(() => {
    vi.clearAllMocks();
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
  });

  it('should render correctly with offer when user not authorizated', () => {
    (useAppSelector as jest.Mock).mockImplementation((selector: SelectorFunction) => {
      if (selector.name === 'selectCurrentCity') {
        return fakeCurrentCityData;
      }
      if (selector.name === 'selectUserFavoritesData') {
        return [];
      }
      if (selector.name === 'selectOfferData') {
        return expectedOffer;
      }
      if (selector.name === 'selectUserData') {
        return fakeUserData;
      }
      if (selector.name === 'selectReviewsData') {
        return fakeReviewsList;
      }
      if (selector.name === 'selectNearOffersData') {
        return fakeNearOffersList;
      }
      if (selector.name === 'selectAuthStatus') {
        return AuthorizationStatus.NoAuth;
      }
      return null;
    });
    const withHistoryComponent = withHistory(<Offer />);
    const expectedTextHeader = /sign in/i;
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      [NameSpace.USER]: {
        ...mockUserInitialState,
        authorizationStatus:AuthorizationStatus.NoAuth,
        userData: fakeUserData,
      },
      [NameSpace.OFFER]: {
        ...mockOfferInitialState,
        offers: [expectedOffer, makeFakeOffer()],
        offer: expectedOffer,
        currentCity: fakeCurrentCityData,
      }
    }));
    const offerGalleryTestId = 'offer-gallery';
    const offerTitleTestId = 'offer-title';
    const reviewListTestId = 'reviews-list';
    const mapTestId = 'map';
    const nearbyTestId = 'near-place';

    render(withStoreComponent);
    const offerTitle = screen.getByTestId(offerTitleTestId);
    const offerGallery = screen.getByTestId(offerGalleryTestId);
    const reviewList = screen.getByTestId(reviewListTestId);
    const map = screen.getByTestId(mapTestId);
    const nearby = screen.getByTestId(nearbyTestId);

    expect(screen.getByText(expectedTextHeader)).toBeInTheDocument();
    expect(offerTitle).toHaveTextContent(expectedOffer.title);
    expect(offerGallery).toBeInTheDocument();
    expect(reviewList).toBeInTheDocument();
    expect(map).toBeInTheDocument();
    expect(nearby).toBeInTheDocument();
  });

  it('should render correctly with offer when user authorizated', () => {
    (useAppSelector as jest.Mock).mockImplementation((selector: SelectorFunction) => {
      if (selector.name === 'selectCurrentCity') {
        return fakeCurrentCityData;
      }
      if (selector.name === 'selectUserFavoritesData') {
        return [];
      }
      if (selector.name === 'selectOfferData') {
        return expectedOffer;
      }
      if (selector.name === 'selectUserData') {
        return fakeUserData;
      }
      if (selector.name === 'selectReviewsData') {
        return fakeReviewsList;
      }
      if (selector.name === 'selectNearOffersData') {
        return fakeNearOffersList;
      }
      if (selector.name === 'selectAuthStatus') {
        return AuthorizationStatus.Auth;
      }
      return null;
    });
    const withHistoryComponent = withHistory(<Offer />);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      [NameSpace.USER]: {
        ...mockUserInitialState,
        authorizationStatus: AuthorizationStatus.Auth,
        userData: fakeUserData,
      },
      [NameSpace.OFFER]: {
        ...mockOfferInitialState,
        offers: [expectedOffer, makeFakeOffer()],
        offer: expectedOffer,
      }
    }));
    const userInfoTestId = 'user-email';
    const formCommentTestId = 'form-comment';
    const offerGalleryTestId = 'offer-gallery';
    const offerTitleTestId = 'offer-title';
    const reviewListTestId = 'reviews-list';
    const mapTestId = 'map';
    const nearbyTestId = 'near-place';

    render(withStoreComponent);
    const userInfo = screen.getByTestId(userInfoTestId);
    const offerTitle = screen.getByTestId(offerTitleTestId);
    const offerGallery = screen.getByTestId(offerGalleryTestId);
    const formComment = screen.getByTestId(formCommentTestId);
    const reviewList = screen.getByTestId(reviewListTestId);
    const map = screen.getByTestId(mapTestId);
    const nearby = screen.getByTestId(nearbyTestId);

    expect(userInfo).toHaveTextContent(fakeUserData.email);
    expect(offerTitle).toHaveTextContent(expectedOffer.title);
    expect(offerGallery).toBeInTheDocument();
    expect(formComment).toBeInTheDocument();
    expect(reviewList).toBeInTheDocument();
    expect(map).toBeInTheDocument();
    expect(nearby).toBeInTheDocument();
  });
});
