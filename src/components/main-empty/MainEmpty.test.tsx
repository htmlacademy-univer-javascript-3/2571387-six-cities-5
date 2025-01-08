import { render, screen } from '@testing-library/react';
import MainEmpty from './MainEmpty';
import makeFakeCityData from '../../mocks/makeFakeCityData';
import { CityData } from '../../types';

describe('Component: MainEmpty', () => {
  it('should render correctly', () => {
    const emptyMainTestId = 'empty-main-container';
    const statusDescriptionTestId = 'status-description';
    const expectedText = /Paris/i;
    const mockCurrentCity = { ...makeFakeCityData(), name: 'Paris' } as CityData;

    render(<MainEmpty currentCity={mockCurrentCity}/>);
    const emptyMainContainer = screen.getByTestId(emptyMainTestId);
    const descriptionText = screen.getByTestId(statusDescriptionTestId);

    expect(emptyMainContainer).toBeInTheDocument();
    expect(descriptionText).toHaveTextContent(expectedText);
  });
});
