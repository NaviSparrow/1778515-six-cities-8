import {Offer} from '../../types/offer';
import React from 'react';
import FavoriteOfferCard from '../favorite-offer-card/favorite-offer-card';

type FavoritesOffersListProps = {
  offers: Offer[];
}

function FavoritesOffersList({offers}:FavoritesOffersListProps):JSX.Element {
  return (
    <React.Fragment>
      {offers.map((offer) => <FavoriteOfferCard key={offer.id} offer={offer} />)}
    </React.Fragment>
  );
}

export default FavoritesOffersList;
