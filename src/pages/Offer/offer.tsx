import { Navigate,useNavigate, useParams } from 'react-router-dom';
import { CardClassNameList, AuthorizationStatus, AppRoute } from '../../types';
import { commentData, FormComments } from '../../components/form-comments/FormComments';
import { ListReviews } from '../../components/listReviews/ListReviews';
import Map from '../../components/map/Map';
import { ListOffers } from '../../components/list-offers/ListOffers';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeFavoriteOfferAction, fetchNearOfferAction, fetchOfferAction, fetchReviewAction, postReviewAction } from '../../store/api-actions';
import UserInfoHeader from '../../components/user-info-header/UserInfoHeader';
import LoadingScreen from '../../components/loader-screen/LoadingScreen';
import { clearOffer, clearReviews, clearNearOffers } from '../../store/offer-slice/offerSlice';
import { selectCurrentCity, selectErrorOfferData, selectNearOffersData, selectNearOffersLoading, selectOfferData, selectOfferLoading, selectReviewsData, selectReviewsLoading } from '../../store/offer-slice/selectors';
import { selectAuthStatus, selectUserFavoritesData } from '../../store/user-slice/selectors';

const Offer: React.FC = () => {
  const navigate = useNavigate();

  const idParam = useParams().id;
  const id = useMemo(() => idParam, [idParam]);

  const [activeOffer, setActiveOffer] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  const city = useAppSelector(selectCurrentCity);
  const currentCity = useMemo(() => city, [city]);

  const OfferLoading = useAppSelector(selectOfferLoading);
  const isOfferLoading = useMemo(() => OfferLoading, [OfferLoading]);

  const offer = useAppSelector(selectOfferData);
  const offerData = useMemo(() => offer, [offer]);

  const offersFavorite = useAppSelector(selectUserFavoritesData);
  const offersFavoriteData = useMemo(() => offersFavorite, [offersFavorite]);

  const isFavorite = offersFavoriteData.some((item) => item.id === id);

  const reviewsData = useAppSelector(selectReviewsData);
  const reviews = useMemo(() => reviewsData, [reviewsData]);
  const ReviewsLoading = useAppSelector(selectReviewsLoading);
  const isReviewsLoading = useMemo(() => ReviewsLoading, [ReviewsLoading]);

  const nearOffersData = useAppSelector(selectNearOffersData);
  const nearOffers = useMemo(() => nearOffersData, [nearOffersData]);

  const NearOffersLoading = useAppSelector(selectNearOffersLoading);
  const isNearOffersLoading = useMemo(() => NearOffersLoading, [NearOffersLoading]);

  const authStatus = useAppSelector(selectAuthStatus);
  const authorizationStatus = useMemo(() => authStatus, [authStatus]);

  const error = useAppSelector(selectErrorOfferData);

  const handleSubmit = useCallback(({rating, review}: commentData) => {
    if (id) {
      dispatch(postReviewAction({id, review, rating}));
    }
  },
  [id]);

  const handleFavouriteClick = useCallback(() => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
      return;
    }
    let pathOption = offerData!.id;
    pathOption += isFavorite ?
      '/0' :
      '/1';
    dispatch(changeFavoriteOfferAction(pathOption));
  }, [offerData, authorizationStatus, isFavorite]);

  useEffect(() => {
    if (id) {
      dispatch(fetchOfferAction(id));
      setActiveOffer(id);
    }
    return () => {
      dispatch(clearOffer());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (id && offerData) {
      dispatch(fetchReviewAction(id));
      dispatch(fetchNearOfferAction(id));
    }
    return () => {
      dispatch(clearNearOffers());
      dispatch(clearReviews());
    };
  }, [dispatch, id, offerData]);

  if (error) {
    return <Navigate to={'/404'} />;
  }

  return (
    <div className="page">
      <UserInfoHeader />
      <main className="page__main page__main--offer">
        <section className="offer">
          {
            (isOfferLoading || !offerData) ?
              <LoadingScreen /> :
              (
                <>
                  <div className="offer__gallery-container container">
                    <div className="offer__gallery" data-testid="offer-gallery">
                      {
                        offerData.images.map((image) => (
                          <div className="offer__image-wrapper" key={image}>
                            <img
                              className="offer__image"
                              src={image}
                              alt="Photo studio"
                            />
                          </div>
                        )
                        )
                      }
                    </div>
                  </div>
                  <div className="offer__container container">
                    <div className="offer__wrapper">
                      {
                        offerData.isPremium && (
                          <div className="offer__mark">
                            <span>Premium</span>
                          </div>
                        )
                      }
                      <div className="offer__name-wrapper">
                        <h1 className="offer__name" data-testid="offer-title">
                          {offerData.title}
                        </h1>
                        <button className={isFavorite ? 'offer__bookmark-button offer__bookmark-button--active button' : 'offer__bookmark-button button'} type="button" onClick={handleFavouriteClick} data-testid = 'favourite-button'>
                          <svg className="offer__bookmark-icon" width={31} height={33}>
                            <use xlinkHref="#icon-bookmark" />
                          </svg>
                          <span className="visually-hidden">To bookmarks</span>
                        </button>
                      </div>
                      <div className="offer__rating rating">
                        <div className="offer__stars rating__stars">
                          <span style={{ width: `${offerData.rating * 20}%`}} />
                          <span className="visually-hidden">Rating</span>
                        </div>
                        <span className="offer__rating-value rating__value">{offerData.rating}</span>
                      </div>
                      <ul className="offer__features">
                        <li className="offer__feature offer__feature--entire">{offerData.type}</li>
                        <li className="offer__feature offer__feature--bedrooms">
                          {offerData.bedrooms} Bedrooms
                        </li>
                        <li className="offer__feature offer__feature--adults">
                          Max {offerData.maxAdults} adults
                        </li>
                      </ul>
                      <div className="offer__price">
                        <b className="offer__price-value">€{offerData.price}</b>
                        <span className="offer__price-text">&nbsp;night</span>
                      </div>
                      <div className="offer__inside">
                        <h2 className="offer__inside-title">What&apos;s inside</h2>
                        <ul className="offer__inside-list">
                          {
                            offerData.goods.map((good) => (
                              <li key={good} className="offer__inside-item">{good}</li>
                            ))
                          }
                        </ul>
                      </div>
                      <div className="offer__host">
                        <h2 className="offer__host-title">Meet the host</h2>
                        <div className="offer__host-user user">
                          <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                            <img
                              className="offer__avatar user__avatar"
                              src={offerData.host.avatarUrl}
                              width={74}
                              height={74}
                              alt="Host avatar"
                            />
                          </div>
                          <span className="offer__user-name">{offerData.host.name}</span>
                          {offerData.host.isPro && <span className="offer__user-status">Pro</span>}
                        </div>
                        <div className="offer__description">
                          {
                            Array.isArray(offerData.description) ?
                              offerData.description.map((descript) => (
                                <p key={descript} className="offer__text">{descript}</p>
                              )) :
                              <p className="offer__text">{offerData.description}</p>
                          }
                        </div>
                      </div>
                      <section className="offer__reviews reviews">
                        {
                          (isReviewsLoading || !reviews) ?
                            <LoadingScreen /> :
                            <ListReviews reviews={reviews} />
                        }
                        { authorizationStatus === AuthorizationStatus.Auth ?
                          <FormComments handleSubmit={handleSubmit} /> :
                          null }
                      </section>
                    </div>
                  </div>
                </>
              )
          }
          <section className="offer__map map">
            <Map currentCity={offerData ? offerData.city : currentCity} offers={(nearOffers && offerData) ? [ offerData, ...nearOffers] : []} activeOffer={activeOffer} />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list" data-testid="near-place">
              {
                (isNearOffersLoading || !nearOffers) ?
                  <LoadingScreen /> :
                  <ListOffers offers={nearOffers} cardClassName={CardClassNameList.neardPlace} />
              }
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default React.memo(Offer);
