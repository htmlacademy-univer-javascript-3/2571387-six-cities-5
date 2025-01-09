import { ListCities } from './ListCities.tsx';
import { withHistory, withStore } from '../../utils/mocks/mockComponents.tsx';
import { render, screen, fireEvent } from '@testing-library/react';
import { CITIES } from '../../types/cities.ts';

describe('Component: ListCities', () => {
  it('should render correctly', () => {
    const expectedTestId = 'cities-list';
    const { withStoreComponent } = withStore(<ListCities onUserSelect={() => {}} currentCity={'Paris'} cities={CITIES} />);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    const testId = screen.getByTestId(expectedTestId);

    expect(testId).toBeInTheDocument();
  });

  it('should highlight the active city', () => {
    const { withStoreComponent } = withStore(<ListCities onUserSelect={() => {}} currentCity={'Paris'} cities={CITIES} />);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    const activeCity = screen.getByText('Paris').closest('div');
    expect(activeCity).toHaveClass('tabs__item--active');
  });

  it('should call onUserSelect when a city is clicked', () => {
    const mockOnUserSelect = vi.fn();
    const { withStoreComponent } = withStore(<ListCities onUserSelect={mockOnUserSelect} currentCity={'Paris'} cities={CITIES} />);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    const cityElement = screen.getByText('Amsterdam').closest('li')!;
    fireEvent.click(cityElement);

    expect(mockOnUserSelect).toHaveBeenCalledWith(CITIES.find((city) => city.name === 'Amsterdam'));
    expect(mockOnUserSelect).toHaveBeenCalledTimes(1);
  });

  it('should not highlight inactive cities', () => {
    const { withStoreComponent } = withStore(<ListCities onUserSelect={() => {}} currentCity={'Paris'} cities={CITIES} />);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    const inactiveCity = screen.getByText('Amsterdam').closest('div');
    expect(inactiveCity).not.toHaveClass('tabs__item--active');
  });
});
