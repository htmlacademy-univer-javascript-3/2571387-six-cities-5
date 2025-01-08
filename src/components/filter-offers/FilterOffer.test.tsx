import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { FilterOffer } from './FilterOffer';
import { SortName } from '../../types';

describe('FilterOffer Component', () => {
  const mockOnSortChange = vi.fn();

  beforeEach(() => {
    mockOnSortChange.mockClear();
  });

  it('renders with the current sort label', () => {
    render(
      <FilterOffer
        currentSort={SortName.popular}
        onSortChange={mockOnSortChange}
      />
    );

    expect(screen.getByText(/Sort by/i)).toBeInTheDocument();
    expect(screen.getByText('Popular')).toBeInTheDocument();
  });

  it('opens and closes the sort options dropdown on click', () => {
    render(
      <FilterOffer
        currentSort={SortName.popular}
        onSortChange={mockOnSortChange}
      />
    );

    expect(screen.queryByRole('list')).not.toBeInTheDocument();

    const sortToggle = screen.getByText('Popular');
    fireEvent.click(sortToggle);

    expect(screen.getByRole('list')).toBeInTheDocument();

    fireEvent.click(sortToggle);
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('calls onSortChange with the correct value when an option is clicked', () => {
    render(
      <FilterOffer
        currentSort={SortName.popular}
        onSortChange={mockOnSortChange}
      />
    );

    const sortToggle = screen.getByText('Popular');
    fireEvent.click(sortToggle);

    const option = screen.getByText('Price: low to high');
    fireEvent.click(option);

    expect(mockOnSortChange).toHaveBeenCalledTimes(1);
    expect(mockOnSortChange).toHaveBeenCalledWith(SortName.lowToHigh);
  });
});
