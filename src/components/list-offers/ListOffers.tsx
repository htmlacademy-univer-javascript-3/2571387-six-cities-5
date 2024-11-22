import React from 'react';
import { offerCard } from '../../types';
import { CityCard } from '../card/Card';

type ListOffersProps = {
  offers: offerCard[];
}

export const ListOffers: React.FC<ListOffersProps> = ({
  offers
}) => (
  offers.map((offer: offerCard) => <CityCard key={offer.id} offer={offer} />)
);