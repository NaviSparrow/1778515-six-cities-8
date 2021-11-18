import PropertyPhotos from '../property-photos/property-photos';
import PropertyGoodsList from '../property-goods-list/property-goods-list';
import Map from '../map/map';
import React from 'react';
import OfferReviewList from '../offer-review-list/offer-review-list';
import {AppRoute, AuthorizationStatus} from '../../const';
import ReviewsForm from '../reviews-form/reviews-form';
import {useDispatch, useSelector} from 'react-redux';
import Spinner from '../spinner/spinner';
import NearbyOfferList from '../nearby-offer-list/nearby-offer-list';
import Header from '../header/header';
import {getNearbyOffersList, getOpenedOffer, getReviewsList} from '../../store/property-data/selectors';
import {getAuthorizationStatus} from '../../store/user-process/selectors';
import {addOfferToFavoritesAction, checkAuthAction, deleteOfferFromFavoriteAction} from '../../store/api-actions';
import {redirectToRoute} from '../../store/action';

function OpenedOffer():JSX.Element {
  const openedOffer = useSelector(getOpenedOffer);
  const reviewList = useSelector(getReviewsList);
  const nearbyOfferList = useSelector(getNearbyOffersList);
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const dispatch = useDispatch();

  const addToFavorites = (id: number) => {
    dispatch(addOfferToFavoritesAction(id));
  };

  const removeFromFavorites = (id: number) => {
    dispatch(deleteOfferFromFavoriteAction(id));
  };

  const redirectToAuthScreen = () => {
    dispatch(redirectToRoute(AppRoute.Auth));
  };

  const checkAuthorization = () => {
    dispatch(checkAuthAction());
  };

  if (openedOffer === null) {
    return <Spinner />;
  }

  const offersForMap = [...nearbyOfferList, openedOffer];
  const {id, isPremium, rating, price, isFavorite, title, type, bedrooms, description, goods, host, maxAdults, images} = openedOffer;
  const styleForMap = '579px';
  return (
    <>
      <div style={{display: 'none'}}>
        <svg xmlns="http://www.w3.org/2000/svg">
          <symbol id="icon-arrow-select" viewBox="0 0 7 4">
            <path fillRule="evenodd" clipRule="evenodd" d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z"></path>
          </symbol>
          <symbol id="icon-bookmark" viewBox="0 0 17 18">
            <path
              d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z"
            >
            </path>
          </symbol>
          <symbol id="icon-star" viewBox="0 0 13 12">
            <path fillRule="evenodd" clipRule="evenodd"
              d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z"
            >
            </path>
          </symbol>
        </svg>
      </div>

      <div className="page">
        <Header />
        <main className="page__main page__main--property">
          <section className="property">
            <div className="property__gallery-container container">
              <div className="property__gallery">
                <PropertyPhotos images={images} />
              </div>
            </div>
            <div className="property__container container">
              <div className="property__wrapper">
                <div className={`${isPremium ? 'property__mark' : 'visually-hidden'}`}>
                  <span>Premium</span>
                </div>
                <div className="property__name-wrapper">
                  <h1 className="property__name">
                    {title}
                  </h1>
                  <button className={`property__bookmark-button ${isFavorite ? 'property__bookmark-button--active' : ''} button`} type="button"
                    onClick={(evt) => {
                      evt.preventDefault();
                      checkAuthorization();
                      if (authorizationStatus !== AuthorizationStatus.Auth) {
                        return redirectToAuthScreen();
                      }
                      if (isFavorite) {
                        return removeFromFavorites(id);
                      }
                      return addToFavorites(id);
                    }}
                  >
                    <svg className="property__bookmark-icon" width="31" height="33">
                      <use xlinkHref="#icon-bookmark"></use>
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>
                </div>
                <div className="property__rating rating">
                  <div className="property__stars rating__stars">
                    <span style={{width: `${rating * 20}%`}}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="property__rating-value rating__value">{rating}</span>
                </div>
                <ul className="property__features">
                  <li className="property__feature property__feature--entire">
                    {type}
                  </li>
                  <li className="property__feature property__feature--bedrooms">
                    {bedrooms} Bedrooms
                  </li>
                  <li className="property__feature property__feature--adults">
                    Max {maxAdults} adults
                  </li>
                </ul>
                <div className="property__price">
                  <b className="property__price-value">&euro;{price}</b>
                  <span className="property__price-text">&nbsp;night</span>
                </div>
                <div className="property__inside">
                  <h2 className="property__inside-title">What&apos;s inside</h2>
                  <PropertyGoodsList goods={goods} />
                </div>
                <div className="property__host">
                  <h2 className="property__host-title">Meet the host</h2>
                  <div className="property__host-user user">
                    <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                      <img className="property__avatar user__avatar" src={host.avatarUrl} width="74" height="74" alt="Host avatar" />
                    </div>
                    <span className="property__user-name">{host.name}</span>
                    <span className="property__user-status">{host.isPro ? 'Pro' : ''}</span>
                  </div>
                  <div className="property__description">
                    <p className="property__text">
                      {description}
                    </p>
                  </div>
                </div>
                <section className="property__reviews reviews">
                  <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviewList.length}</span></h2>
                  {reviewList.length !== 0
                    ? <OfferReviewList reviews={reviewList} />
                    : ''}
                  {authorizationStatus === AuthorizationStatus.Auth
                    ? <ReviewsForm />
                    : ''}
                </section>
              </div>
            </div>
            <section className="property__map map"><Map offers={offersForMap} activeOffer={openedOffer} styleForMap={styleForMap}/></section>
          </section>
          <NearbyOfferList />
        </main>
      </div>
    </>
  );
}

export default OpenedOffer;
