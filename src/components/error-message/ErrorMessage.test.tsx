import { withStore } from '../../mocks/mockComponents';
import { NameSpace } from '../../types';
import ErrorMessage from './error-message';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { TIMEOUT_SHOW_ERROR } from '../../types/constant';
import { mockOfferInitialState, mockUserInitialState } from '../../mocks/mocks';

describe('Component: Error Message', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.restoreAllMocks();
  });

  it('renders an error message for user error correctly', () => {
    const fakeExpectedError = 'User error message';
    const { withStoreComponent } = withStore(<ErrorMessage />, {
      [NameSpace.USER]: { ...mockUserInitialState, error: fakeExpectedError },
      [NameSpace.OFFER]: { ...mockOfferInitialState, error: null },
    });

    render(withStoreComponent);

    const errorMessage = screen.getByText(fakeExpectedError);
    expect(errorMessage).toBeInTheDocument();
  });

  it('renders an error message for offer error correctly', () => {
    const fakeExpectedError = 'Offer error message';
    const { withStoreComponent } = withStore(<ErrorMessage />, {
      [NameSpace.USER]: { ...mockUserInitialState, error: null },
      [NameSpace.OFFER]: { ...mockOfferInitialState, error: fakeExpectedError },
    });

    render(withStoreComponent);

    const errorMessage = screen.getByText(fakeExpectedError);
    expect(errorMessage).toBeInTheDocument();
  });

  it('renders no error message if both errors are null', () => {
    const { withStoreComponent } = withStore(<ErrorMessage />, {
      [NameSpace.USER]: mockUserInitialState,
      [NameSpace.OFFER]: mockOfferInitialState,
    });

    render(withStoreComponent);

    const errorMessage = screen.queryByText(/error/i);
    expect(errorMessage).not.toBeInTheDocument();
  });

  it('clears the user error after the timeout', () => {
    const fakeExpectedError = 'User error message';
    const { withStoreComponent, mockStore } = withStore(<ErrorMessage />, {
      [NameSpace.USER]: { ...mockUserInitialState, error: fakeExpectedError },
      [NameSpace.OFFER]: { ...mockOfferInitialState, error: null },
    });

    render(withStoreComponent);

    const errorMessage = screen.getByText(fakeExpectedError);
    expect(errorMessage).toBeInTheDocument();

    vi.advanceTimersByTime(TIMEOUT_SHOW_ERROR);

    const actions = mockStore.getActions();
    expect(actions).toContainEqual({ type: `${NameSpace.USER}/setUserError`, payload: null });
  });

  it('clears the offer error after the timeout', () => {
    const fakeExpectedError = 'Offer error message';
    const { withStoreComponent, mockStore } = withStore(<ErrorMessage />, {
      [NameSpace.USER]: { ...mockUserInitialState, error: null },
      [NameSpace.OFFER]: { ...mockOfferInitialState, error: fakeExpectedError },
    });

    render(withStoreComponent);

    const errorMessage = screen.getByText(fakeExpectedError);
    expect(errorMessage).toBeInTheDocument();

    vi.advanceTimersByTime(TIMEOUT_SHOW_ERROR);

    const actions = mockStore.getActions();
    expect(actions).toContainEqual({ type: `${NameSpace.OFFER}/setOfferError`, payload: null });
  });
});
