import React from 'react';
import {useDispatch} from 'react-redux';
import {fetchOpenedOfferAction, fetchNearbyOffersAction, fetchReviewsAction} from '../../store/api-actions';
import {Offer} from '../../types/offer';
import {fillOpenedOffer} from '../../store/action';
import OpenedOffer from '../opened-offer/opened-offer';

type PropertyScreenProps = {
  id: number
  offer?: Offer
}

function PropertyScreen(props: PropertyScreenProps):JSX.Element {
  const dispatch = useDispatch();

  const fetchOpenedOffer = (id: number) => {
    dispatch(fetchOpenedOfferAction(id));
  };

  const fetchReviews = (id: number) => {
    dispatch(fetchReviewsAction(id));
  };

  const fetchNearbyOffers = (id: number) => {
    dispatch(fetchNearbyOffersAction(id));
  };

  const sendToStateOfferFromProp = (offer: Offer) => {
    dispatch(fillOpenedOffer(offer));
  };
  const {offer, id} = props;

  if (offer === undefined) {
    fetchOpenedOffer(id);
  } else {
    sendToStateOfferFromProp(offer);
  }
  fetchReviews(id);
  fetchNearbyOffers(id);

  return (
    <OpenedOffer />
  );
}

export default PropertyScreen;
