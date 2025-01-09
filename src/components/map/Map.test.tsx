import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import makeFakeOffer from '../../utils/makeFakeOffer';
import makeFakeCityData from '../../utils/makeFakeCityData';
import Map from './Map.tsx';

describe('Component: Map Component', () => {
  it('renders a map container correctly', () => {
    const fakeOffersList = new Array(3).fill(null).map(() => makeFakeOffer());
    const fakeCityData = makeFakeCityData();

    render(
      <Map
        offers={fakeOffersList}
        currentCity={fakeCityData}
        activeOffer={null}
      />
    );
    const mapElement = screen.getByTestId('map');
    expect(mapElement).toBeInTheDocument();
  });
});
