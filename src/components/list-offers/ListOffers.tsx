import React from 'react';
import { offerCard, CardClassNameList } from '../../types';
import CityCard from '../card/CityCard';

type ListOffersProps = {
  offers: offerCard[];
  cardClassName: CardClassNameList;
  setActiveOffer?: (id: string | null) => void;
}

export const ListOffers: React.FC<ListOffersProps> = ({
  offers,
  cardClassName,
  setActiveOffer
}) => (
  offers.map((offer: offerCard) => (
    <CityCard
      key={offer.id}
      offer={offer}
      cardClassName={cardClassName}
      {...(setActiveOffer && {setActiveOffer})}
    />)
  )
);
