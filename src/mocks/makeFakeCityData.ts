import { CityData } from '../types';
import makeFakeLocation from './makeFakeLocation';

const makeFakeCityData = (): CityData => ({
  name: 'Paris',
  location: makeFakeLocation(),
});

export default makeFakeCityData;
