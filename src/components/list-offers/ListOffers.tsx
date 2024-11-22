import React from 'react';
import { offerCard, CardClassNameList } from '../../types';
import { CityCard } from '../card/Card';

type ListOffersProps = {
  offers: offerCard[];
}

export const ListOffers: React.FC<ListOffersProps> = ({
  offers,
  cardClassName,
}) => (
  offers.map((offer: offerCard) => <CityCard key={offer.id} offer={offer} cardClassName={cardClassName} />)
);
