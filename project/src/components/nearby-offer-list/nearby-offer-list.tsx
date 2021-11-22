import React from 'react';
import NearbyOfferCard from '../nearby-offer-card/nearby-offer-card';
import {useSelector} from 'react-redux';
import {getNearbyOffersList} from '../../store/property-data/selectors';

function NearbyOfferList():JSX.Element {
  const nearbyOfferList = useSelector(getNearbyOffersList);
  return (
    <div className="container">
      <section className="near-places places">
        <h2 className="near-places__title">Other places in the neighbourhood</h2>
        <div className="near-places__list places__list">
          {nearbyOfferList.map((offer) => <NearbyOfferCard key={offer.id} offer={offer} />)}
        </div>
      </section>
    </div>
  );
}

export default React.memo(NearbyOfferList);
