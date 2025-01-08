import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { FormComments } from './FormComments';

describe('FormComments Component', () => {
  const mockHandleSubmit = vi.fn();

  beforeEach(() => {
    mockHandleSubmit.mockClear();
  });

  it('renders the form with all fields and a disabled submit button initially', () => {
    render(<FormComments handleSubmit={mockHandleSubmit} />);

    expect(screen.getByTestId('form-comment')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Tell how was your stay/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeDisabled();
  });

  it('enables the submit button when valid data is entered', () => {
    render(<FormComments handleSubmit={mockHandleSubmit} />);

    const reviewTextarea = screen.getByPlaceholderText(/Tell how was your stay/i);
    const stars = screen.getAllByRole('radio');

    fireEvent.change(reviewTextarea, { target: { value: 'This is a valid review with more than 50 characters.' } });
    fireEvent.click(stars[4]);

    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).not.toBeDisabled();
  });

  it('calls handleSubmit with the correct data on form submission', () => {
    render(<FormComments handleSubmit={mockHandleSubmit} />);

    const reviewTextarea = screen.getByPlaceholderText(/Tell how was your stay/i);
    const stars = screen.getAllByRole('radio');

    fireEvent.change(reviewTextarea, { target: { value: 'This is a valid review with more than 50 characters.' } });
    fireEvent.click(stars[0]);

    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
    expect(mockHandleSubmit).toHaveBeenCalledWith({
      rating: 5,
      review: 'This is a valid review with more than 50 characters.',
    });
  });

  it('resets the form after submission', () => {
    render(<FormComments handleSubmit={mockHandleSubmit} />);

    const reviewTextarea = screen.getByPlaceholderText(/Tell how was your stay/i);
    const stars = screen.getAllByRole('radio');

    fireEvent.change(reviewTextarea, { target: { value: 'This is a valid review with more than 50 characters.' } });
    fireEvent.click(stars[0]);

    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    expect(reviewTextarea).toHaveValue('');
    expect(stars[0]).not.toBeChecked();
  });

  it('does not call handleSubmit if the form is invalid', () => {
    render(<FormComments handleSubmit={mockHandleSubmit} />);

    const reviewTextarea = screen.getByPlaceholderText(/Tell how was your stay/i);
    fireEvent.change(reviewTextarea, { target: { value: 'Short review' } });

    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    expect(mockHandleSubmit).not.toHaveBeenCalled();
  });
});
