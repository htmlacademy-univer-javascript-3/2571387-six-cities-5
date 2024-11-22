import { Main } from '../../pages/Main/main';
import { City, offerCard } from '../../types';


interface IAppProps {
  offers: offerCard[];
  currentCity: City;
}

// eslint-disable-next-line react/prop-types
export const App: React.FC<IAppProps> = ({ offers, currentCity }) => (
  <Main offers={offers} currentCity={currentCity} />
);
