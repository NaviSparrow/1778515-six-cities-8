import {CityType, Offer} from '../../types/offer';
import React from 'react';
import OfferCard from '../offer-card/offer-card';
import {useState} from 'react';
import Map from '../map/map';
import OfferSortList from '../offer-sort-list/offer-sort-list';
import {SortType, getSortedOffers} from '../../const';

type OffersListProps = {
  city: CityType;
  offersList: Offer[];
}

function OffersList(props:OffersListProps):JSX.Element {
  const {city, offersList} = props;
  const [activeOffer, setActiveOffer] = useState<Offer | null>(null);
  const [currentSort, setCurrentSort] = useState<string>(SortType.Popular);
  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{offersList.length} places to stay in {city}</b>
        <OfferSortList currentSort={currentSort} onChangeSort={setCurrentSort} />
        <div className="cities__places-list places__list tabs__content">
          {getSortedOffers(currentSort, offersList).map((offer) => (
            <OfferCard
              key={offer.id}
              offer={offer}
              onActiveOfferChange={setActiveOffer}
              activeOffer={activeOffer}
            />))}
        </div>
      </section>
      <div className="cities__right-section">
        <section className="cities__map map">
          <Map offers={offersList} activeOffer={activeOffer} />
        </section>
      </div>
    </div>
  );
}

export default OffersList;
