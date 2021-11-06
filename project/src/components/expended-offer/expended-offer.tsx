import PropertyPhotos from '../property-photos/property-photos';
import PropertyGoodsList from '../property-goods-list/property-goods-list';
import Map from '../map/map';
import React from 'react';
import OfferReviewList from '../offer-review-list/offer-review-list';
import {AuthorizationStatus} from '../../const';
import ReviewsForm from '../reviews-form/reviews-form';
import {State} from '../../types/state';
import {connect, ConnectedProps} from 'react-redux';
import Spinner from '../spinner/spinner';
import NearbyOfferList from '../nearby-offer-list/nearby-offer-list';

const mapStateToProps = ({expendedOffer, reviewList, nearbyOfferList, authorizationStatus}: State) => ({
  expendedOffer,
  reviewList,
  nearbyOfferList,
  authorizationStatus,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

function ExpendedOffer(props: PropsFromRedux):JSX.Element {
  const {expendedOffer, reviewList, nearbyOfferList, authorizationStatus} = props;
  if (expendedOffer === null) {
    return <Spinner />;
  }
  const offersToMap = [...nearbyOfferList, expendedOffer];
  const {isPremium, rating, price, isFavorite, title, type, bedrooms, description, goods, host, maxAdults, images} = expendedOffer;
  const styleForMap = '579px';
  return (
    <>
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
              <button className={`property__bookmark-button ${isFavorite ? 'property__bookmark-button--active' : ''} button`} type="button">
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
        {nearbyOfferList.length !== 0
          ? <section className="property__map map"><Map offers={offersToMap} activeOffer={expendedOffer} styleForMap={styleForMap}/></section>
          : ''}
      </section>
      <NearbyOfferList />
    </>
  );
}

export {ExpendedOffer};
export default connector(ExpendedOffer);
