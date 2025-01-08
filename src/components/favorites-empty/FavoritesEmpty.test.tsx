import { render, screen } from '@testing-library/react';
import FavoritesEmpty from './Favorites-empty';

describe('Component: FavoritesEmpty', () => {
  it('should render correctly', () => {
    const expectedText = /Favorites \(empty\)/i;

    render(<FavoritesEmpty />);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
