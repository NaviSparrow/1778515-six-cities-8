import {Offer} from '../../types/offer';
import React from 'react';
import FavoriteOfferCard from '../favorite-offer-card/favorite-offer-card';

type FavoritesOffersListProps = {
  offersList: Offer[];
}

function FavoritesOffersList({offersList}:FavoritesOffersListProps):JSX.Element {
  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        <li className="favorites__locations-items">
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </div>
          <div className="favorites__places">
            {offersList.map((offer) => <FavoriteOfferCard key={offer.id} offer={offer} />)}
          </div>
        </li>
      </ul>
    </section>
  );
}

export default FavoritesOffersList;
