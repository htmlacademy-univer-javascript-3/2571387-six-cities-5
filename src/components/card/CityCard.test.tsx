import { fireEvent, render, screen } from '@testing-library/react';
import { vi, describe, it, beforeEach, expect } from 'vitest';
import CityCard from './CityCard';
import { useAppDispatch, useAppSelector } from '../../hooks';
import makeFakeOffer from '../../mocks/makeFakeOffer';
import { AuthorizationStatus, CardClassNameList, NameSpace } from '../../types';
import { withHistory, withStore } from '../../mocks/mockComponents';
import { mockOfferInitialState, mockUserInitialState, SelectorFunction } from '../../mocks/mocks';

vi.mock('../../hooks', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('CityCard', () => {
  const mockOffer = makeFakeOffer();
  const mockDispatch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useAppSelector as jest.Mock).mockImplementation((selector: SelectorFunction) => {
      if (selector.name === 'selectAuthStatus') {
        return AuthorizationStatus.Auth;
      }
      if (selector.name === 'selectUserFavoritesData') {
        return [];
      }
      return null;
    });
  });

  it('should render correctly with premium status', () => {
    const withHistoryComponent = withHistory(
      <CityCard
        offer={{ ...mockOffer, isPremium: true }}
        cardClassName={CardClassNameList.citiesList}
        setActiveOffer={vi.fn()}
      />
    );
    const { withStoreComponent } = withStore(withHistoryComponent, {
      [NameSpace.USER]: {
        ...mockUserInitialState,
        authorizationStatus: AuthorizationStatus.Auth,
        favoriteOffers: [],
      },
      [NameSpace.OFFER]: { ...mockOfferInitialState, offers: [mockOffer] },
    });

    render(withStoreComponent);

    expect(screen.getByText('Premium')).toBeInTheDocument();
    expect(screen.getByText(mockOffer.price)).toBeInTheDocument();
    expect(screen.getByAltText('Place image')).toHaveAttribute('src', mockOffer.previewImage);
  });

  it('should navigate to login if user is not authorized and clicks on favorite button', () => {
    (useAppSelector as jest.Mock).mockImplementation((selector: SelectorFunction) => {
      if (selector.name === 'selectAuthStatus') {
        return AuthorizationStatus.NoAuth;
      }
      if (selector.name === 'selectUserFavoritesData') {
        return [];
      }
      return null;
    });

    const withHistoryComponent = withHistory(
      <CityCard
        offer={mockOffer}
        cardClassName={CardClassNameList.citiesList}
        setActiveOffer={vi.fn()}
      />
    );
    const { withStoreComponent } = withStore(withHistoryComponent, {
      [NameSpace.USER]: {
        ...mockUserInitialState,
        authorizationStatus: AuthorizationStatus.NoAuth,
        favoriteOffers: [],
      },
    });

    render(withStoreComponent);

    const favoriteButton = screen.getByRole('button', { name: /in bookmarks/i });
    fireEvent.click(favoriteButton);

    expect(mockNavigate).toHaveBeenCalledWith('/login');
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it('should call setActiveOffer on mouse events', () => {
    const setActiveOfferMock = vi.fn();
    const withHistoryComponent = withHistory(
      <CityCard
        offer={mockOffer}
        cardClassName={CardClassNameList.citiesList}
        setActiveOffer={setActiveOfferMock}
      />
    );
    const { withStoreComponent } = withStore(withHistoryComponent, {});

    render(withStoreComponent);

    const card = screen.getByTestId('offer-card');
    fireEvent.mouseEnter(card);
    expect(setActiveOfferMock).toHaveBeenCalledWith(mockOffer.id);

    fireEvent.mouseLeave(card);
    expect(setActiveOfferMock).toHaveBeenCalledWith(null);
  });

  it('should dispatch favorite action if user is authorized', () => {
    const withHistoryComponent = withHistory(
      <CityCard
        offer={mockOffer}
        cardClassName={CardClassNameList.citiesList}
        setActiveOffer={vi.fn()}
      />
    );
    const { withStoreComponent } = withStore(withHistoryComponent, {
      [NameSpace.USER]: {
        ...mockUserInitialState,
        authorizationStatus: AuthorizationStatus.Auth,
        favoriteOffers: [],
      },
    });

    render(withStoreComponent);

    const favoriteButton = screen.getByRole('button', { name: /in bookmarks/i });
    fireEvent.click(favoriteButton);

    expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));
  });

  it('should display active class on bookmark button if offer is favorite', () => {
    (useAppSelector as jest.Mock).mockImplementation((selector: SelectorFunction) => {
      if (selector.name === 'selectUserFavoritesData') {
        return [mockOffer];
      }
      return null;
    });

    const withHistoryComponent = withHistory(
      <CityCard
        offer={mockOffer}
        cardClassName={CardClassNameList.citiesList}
        setActiveOffer={vi.fn()}
      />
    );
    const { withStoreComponent } = withStore(withHistoryComponent, {
      [NameSpace.USER]: {
        ...mockUserInitialState,
        authorizationStatus: AuthorizationStatus.Auth,
        favoriteOffers: [mockOffer],
      },
    });

    render(withStoreComponent);

    const favoriteButton = screen.getByRole('button', { name: /in bookmarks/i });
    expect(favoriteButton).toHaveClass('place-card__bookmark-button--active');
  });
});
