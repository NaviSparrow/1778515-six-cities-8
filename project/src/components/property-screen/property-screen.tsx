import React from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {Actions, ThunkAppDispatch} from '../../types/action';
import {fetchOpenedOfferAction, fetchNearbyOffersAction, fetchReviewsAction} from '../../store/api-actions';
import {Offer} from '../../types/offer';
import {fillOpenedOffer} from '../../store/action';
import OpenedOffer from '../opened-offer/opened-offer';
import {Dispatch} from '@reduxjs/toolkit';

type PropertyScreenProps = {
  id: number
  offer?: Offer
}

const mapDispatchToProps = (dispatch: ThunkAppDispatch | Dispatch<Actions>) => ({
  fetchOpenedOffer(id: number) {
    (dispatch as ThunkAppDispatch)(fetchOpenedOfferAction(id));
  },
  fetchReviews(id: number) {
    (dispatch as ThunkAppDispatch)(fetchReviewsAction(id));
  },
  fetchNearbyOffers(id:number) {
    (dispatch as ThunkAppDispatch)(fetchNearbyOffersAction(id));
  },
  sendToStateOfferFromProp(offer:Offer) {
    (dispatch as Dispatch<Actions>)(fillOpenedOffer(offer));
  },
});

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & PropertyScreenProps;


function PropertyScreen(props: ConnectedComponentProps):JSX.Element {
  const {fetchOpenedOffer, fetchReviews, fetchNearbyOffers, sendToStateOfferFromProp, offer, id} = props;
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

export {PropertyScreen};
export default connector(PropertyScreen);
