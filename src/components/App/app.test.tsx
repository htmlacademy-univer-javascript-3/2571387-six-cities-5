import { createMemoryHistory, MemoryHistory } from 'history';
import { withHistory, withStore } from '../../mocks/mockComponents';
import { App } from './app';
import { makeFakeStore, mockOfferInitialState, mockUserInitialState } from '../../mocks/mocks';
import { datatype } from 'faker';
import { screen, render } from '@testing-library/react';
import { AppRoute, AuthorizationStatus, NameSpace } from '../../types';
import makeFakeUserData from '../../mocks/makeFakeUserData';
import makeFakeOffer from '../../mocks/makeFakeOffer';

describe('Application Routing', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render "MainPage" when user navigate to "/"', () => {
    const withHistoreComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoreComponent, makeFakeStore());
    const citiesListTestId = 'cities-list';
    const cityPlaceTestId = 'city-place';
    const expectedCity = 'Paris';
    mockHistory.push(AppRoute.Main);

    render(withStoreComponent);
    const citiesList = screen.getByTestId(citiesListTestId);
    const cityTextParagraf = screen.getByTestId(cityPlaceTestId);

    expect(citiesList).toBeInTheDocument();
    expect(cityTextParagraf).toHaveTextContent(expectedCity);
  });

  it('should render "FavouritesPage" when auth status is Auth', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const fakeUserData = makeFakeUserData();
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      [NameSpace.USER]: {
        ...mockUserInitialState,
        authorizationStatus:AuthorizationStatus.Auth,
        userData: fakeUserData,
      },
    }));
    mockHistory.push(AppRoute.Favorites);
    const userInfoTestId = 'user-email';
    const userFavoriteCountTestId = 'user-favorites';
    const expectedText = /Favorites \(empty\)/i;

    render(withStoreComponent);
    const userInfo = screen.getByTestId(userInfoTestId);
    const favouriteCountFooter = screen.getByTestId(userFavoriteCountTestId);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(userInfo).toHaveTextContent(fakeUserData.email);
    expect(favouriteCountFooter).toHaveTextContent('0');
  });

  it('should render "LoginPage" when auth status is NoAuth and route to Favourite Page', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const fakeUserData = makeFakeUserData();
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      [NameSpace.USER]: {
        ...mockUserInitialState,
        authorizationStatus:AuthorizationStatus.NoAuth,
        userData: fakeUserData,
      },
    }));
    mockHistory.push(AppRoute.Favorites);
    const loginFormTestId = 'login-form';
    const emailFormTestId = 'email-input';
    const passwordFormTestId = 'password-input';


    render(withStoreComponent);
    const loginForm = screen.getByTestId(loginFormTestId);
    const emailForm = screen.getByTestId(emailFormTestId);
    const passwordForm = screen.getByTestId(passwordFormTestId);


    expect(loginForm).toBeInTheDocument();
    expect(emailForm).toBeInTheDocument();
    expect(passwordForm).toBeInTheDocument();
  });

  it('should render "LoginPage" when user navigate to "/login"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(AppRoute.Login);
    const loginFormTestId = 'login-form';
    const emailFormTestId = 'email-input';
    const passwordFormTestId = 'password-input';


    render(withStoreComponent);
    const loginForm = screen.getByTestId(loginFormTestId);
    const emailForm = screen.getByTestId(emailFormTestId);
    const passwordForm = screen.getByTestId(passwordFormTestId);


    expect(loginForm).toBeInTheDocument();
    expect(emailForm).toBeInTheDocument();
    expect(passwordForm).toBeInTheDocument();
  });

  it('should render "MainPage" when authorized user navigates to "/login"', () => {
    const citiesListTestId = 'cities-list';
    const userInfoTestId = 'user-email';
    const userFavoriteCountTestId = 'user-favorites';
    const cityPlaceTestId = 'city-place';
    const expectedCity = 'Paris';
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const fakeUserData = makeFakeUserData();
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      [NameSpace.USER]: {
        ...mockUserInitialState,
        authorizationStatus:AuthorizationStatus.Auth,
        userData: fakeUserData,
      },
    }));
    mockHistory.push(AppRoute.Login);

    render(withStoreComponent);
    const userInfo = screen.getByTestId(userInfoTestId);
    const favouriteCountFooter = screen.getByTestId(userFavoriteCountTestId);
    const citiesList = screen.getByTestId(citiesListTestId);
    const cityTextParagraf = screen.getByTestId(cityPlaceTestId);

    expect(userInfo).toHaveTextContent(fakeUserData.email);
    expect(favouriteCountFooter).toHaveTextContent('0');
    expect(citiesList).toBeInTheDocument();
    expect(cityTextParagraf).toHaveTextContent(expectedCity);
  });


  it('should render "OfferPage" when offer is in offerList with form comment and authorization status is Auth', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const fakeUserData = makeFakeUserData();
    const expectedOffer = makeFakeOffer();
    const expectedOfferId = datatype.string();
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      [NameSpace.USER]: {
        ...mockUserInitialState,
        authorizationStatus:AuthorizationStatus.Auth,
        userData: fakeUserData,
      },
      [NameSpace.OFFER]: {
        ...mockOfferInitialState,
        offers: [expectedOffer, makeFakeOffer()],
        offer: expectedOffer,
      }
    }));
    mockHistory.push(`/offer/${expectedOfferId}`);
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

  it('should render "OfferPage" when offer is in offerList and without form comment authorization status is NoAuth', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const expectedTextHeader = /sign in/i;
    const fakeUserData = makeFakeUserData();
    const expectedOffer = makeFakeOffer();
    const expectedOfferId = datatype.string();
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
      }
    }));
    mockHistory.push(`/offer/${expectedOfferId}`);
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

  it('should render "NotFoundPage" when route is incorrect', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    const unknownRoute = datatype.string();
    mockHistory.push(`/${unknownRoute}`);
    const expectedText = 'Not Found 404.';

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
