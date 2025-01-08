import { render, screen } from '@testing-library/react';
import { useRef } from 'react';
import {useMap} from './use-map';
import { CityData } from '../types';
import makeFakeCityData from '../mocks/makeFakeCityData';

const fakeCityData = makeFakeCityData();

const TestComponent = (currentCity : CityData) => {
  const mapRef = useRef(null);
  const map = useMap({mapRef, currentCity});

  return (
    <div>
      <div ref={mapRef}/>
      {map ? null : <p>Карта не инициализирована</p>}
    </div>
  );
};

export default TestComponent;

describe('useMap', () => {
  it('should render map correctly', () => {
    const notExpectedText = 'Карта не инициализирована';

    render(<TestComponent {...fakeCityData} />);

    const textElement = screen.queryByText(notExpectedText);
    expect(textElement).not.toBeInTheDocument();
  });
});
