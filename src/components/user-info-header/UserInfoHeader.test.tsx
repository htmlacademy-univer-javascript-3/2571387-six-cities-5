import { fireEvent, render, screen } from '@testing-library/react';
import { vi, describe, it, beforeEach, expect } from 'vitest';
import UserInfoHeader from './UserInfoHeader';
import { AuthorizationStatus, AppRoute, NameSpace } from '../../types';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { withStore, withHistory } from '../../mocks/mockComponents';
import { mockUserInitialState, SelectorFunction } from '../../mocks/mocks';
import makeFakeUserData from '../../mocks/makeFakeUserData';
import makeFakeOffer from '../../mocks/makeFakeOffer';

vi.mock('../../hooks', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

const mockDispatch = vi.fn();
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Component: UserInfoHeader', () => {
  const mockUserData = makeFakeUserData();
  const mockFavorites = [makeFakeOffer(), makeFakeOffer()];

  beforeEach(() => {
    vi.clearAllMocks();
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useAppSelector as jest.Mock).mockImplementation((selector: SelectorFunction) => {
      if (selector.name === 'selectAuthStatus') {
        return AuthorizationStatus.Auth;
      }
      if (selector.name === 'selectUserData') {
        return mockUserData;
      }
      if (selector.name === 'selectUserFavoritesData') {
        return mockFavorites;
      }
      return null;
    });
  });

  it('should render correctly when user is authorized', () => {
    const { withStoreComponent } = withStore(<UserInfoHeader />, {
      [NameSpace.USER]: {
        ...mockUserInitialState,
        authorizationStatus: AuthorizationStatus.Auth,
        userData: mockUserData,
        favoriteOffers: mockFavorites,
      },
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId('user-email')).toHaveTextContent(mockUserData.email);
    expect(screen.getByTestId('user-favorites')).toHaveTextContent(mockFavorites.length.toString());
    expect(screen.getByText('Sign out')).toBeInTheDocument();
  });

  it('should render "Sign in" if user is not authorized', () => {
    (useAppSelector as jest.Mock).mockImplementation((selector: SelectorFunction) => {
      if (selector.name === 'selectAuthStatus') {
        return AuthorizationStatus.NoAuth;
      }
      return null;
    });
    const { withStoreComponent } = withStore(<UserInfoHeader />, {
      [NameSpace.USER]: {
        ...mockUserInitialState,
        authorizationStatus: AuthorizationStatus.NoAuth,
      },
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });

  it('should navigate to main page when clicking on logo', () => {
    const { withStoreComponent } = withStore(<UserInfoHeader />, {
      [NameSpace.USER]: {
        ...mockUserInitialState,
        authorizationStatus: AuthorizationStatus.Auth,
      },
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    const logo = screen.getByAltText('6 cities logo');
    fireEvent.click(logo);

    expect(mockNavigate).toHaveBeenCalledWith(AppRoute.Main);
  });
});
