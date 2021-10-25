import {CityType, Offer} from '../../types/offer';
import React from 'react';
import FavoriteOfferCard from '../favorite-offer-card/favorite-offer-card';

type FavoritesOffersListProps = {
  offersList: Offer[];
}

function FavoritesOffersList({offersList}:FavoritesOffersListProps):JSX.Element {
  const setOfCities = new Set<CityType>();
  offersList.map((offer) => setOfCities.add(offer.city.name));
  const citiesArray = Array.from(setOfCities);
  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        {citiesArray.map((city) => {
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
