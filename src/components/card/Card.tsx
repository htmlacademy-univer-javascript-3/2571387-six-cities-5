import React, { useMemo } from 'react';
import { offerCard, AppRoute, AuthorizationStatus } from '../../types';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectAuthStatus, selectUserFavoritesData } from '../../store/user-slice/selectors';
import { changeFavoriteOfferAction } from '../../store/api-actions';

type CityCardProps = {
  offer: offerCard;
  cardClassName: string;
  setActiveOffer?: (id: string | null) => void;
};

const ACTIVE_MARK_BUTTON_CLASS = 'place-card__bookmark-button--active';

export const CityCard: React.FC<CityCardProps> = ({
  offer,
  cardClassName,
  setActiveOffer,
}) => {
  const [ isActiveCard, setActiveCard ] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authStatus = useAppSelector(selectAuthStatus);
  const authorizationStatus = useMemo(() => authStatus, [authStatus]);

  const userFavoritesOffer = useAppSelector(selectUserFavoritesData);
  const userFavourite = useMemo(() => userFavoritesOffer, [userFavoritesOffer]);

  const isFavourite = userFavourite.map((favourite) => favourite.id).includes(offer.id);

  const handleClick = () => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
    }

    const pathOption = isFavourite ?
      `${offer.id}/0` :
      `${offer.id}/1`;

    dispatch(changeFavoriteOfferAction(pathOption));
  };
  return (
    <article
      className={`${cardClassName} place-card`}
      onMouseEnter={() => setActiveOffer && setActiveOffer(offer.id)}
      onMouseLeave={() => setActiveOffer && setActiveOffer(null)}
      onMouseOver={() => setActiveCard(!isActiveCard)}
    >
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={AppRoute.Offer + offer.id}>
          <img
            className="place-card__image"
            src={offer.previewImage}
            width={260}
            height={200}
            alt="Place image"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">{offer.price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button button 
            ${ isFavourite ? ACTIVE_MARK_BUTTON_CLASS : ''}`}
            type="button"
            onClick={handleClick}
          >
            <svg className="place-card__bookmark-icon" width={18} height={19}>
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${offer.rating * 20}%`}} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={AppRoute.Offer + offer.id}>
            {offer.title}
          </Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
};
