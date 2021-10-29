import {Offer} from '../../types/offer';
import React from 'react';
import FavoriteOfferCard from '../favorite-offer-card/favorite-offer-card';

type FavoritesOffersListProps = {
  offersList: Offer[];
}

function FavoritesOffersList({offersList}:FavoritesOffersListProps):JSX.Element {
  const cities = new Set(offersList.map((offer) => offer.city.name));
  const uniqueCities = Array.from(cities);
  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        {uniqueCities.map((city) => {
          const offersForCity = offersList.filter((offer) => offer.city.name === city);
          return (
            <li className="favorites__locations-items" key={city}>
              <div className="favorites__locations locations locations--current">
                <div className="locations__item">
                  <a className="locations__item-link" href="#">
                    <span>{city}</span>
                  </a>
                </div>
              </div>
              <div className="favorites__places">
                {offersForCity.map((offer) => <FavoriteOfferCard key={offer.id} offer={offer}/>)}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default FavoritesOffersList;
