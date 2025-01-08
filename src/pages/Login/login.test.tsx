import { describe, it, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from './login';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { withHistory, withStore } from '../../mocks/mockComponents';

vi.mock('../../hooks', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

describe('Component: Login', () => {
  const mockDispatch = vi.fn();
  beforeEach(() => {
    vi.clearAllMocks();
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useAppSelector as jest.Mock).mockImplementation();
  });

  it('renders correctly', () => {
    const { withStoreComponent } = withStore(<Login />);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId('login-title')).toBeInTheDocument();
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
  });

  it('allows typing into email and password fields', () => {
    const { withStoreComponent } = withStore(<Login />);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    const emailInput: HTMLInputElement = screen.getByTestId('email-input');
    const passwordInput: HTMLInputElement = screen.getByTestId('password-input');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });
});
