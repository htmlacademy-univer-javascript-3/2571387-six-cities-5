import { Main } from '../../pages/Main/main';
import { CityData, offerCard } from '../../types';


interface IAppProps {
  offers: offerCard[];
  currentCity: CityData;
}

export const App: React.FC<IAppProps> = ({ offers, currentCity }) => (
  <Main offers={offers} currentCity={currentCity} />
);
