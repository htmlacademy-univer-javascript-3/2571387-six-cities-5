import React from 'react';
import { offerCard, CardClassNameList } from '../../types';
import { CityCard } from '../card/Card';

type ListOffersProps = {
  offers: offerCard[];
  cardClassName: CardClassNameList;
  setActiveOffer?: (id: number | null) => void;
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
