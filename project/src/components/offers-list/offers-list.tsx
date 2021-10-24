import {CityType, Offer} from '../../types/offer';
import React from 'react';
import OfferCard from '../offer-card/offer-card';
import {useState} from 'react';
import Map from '../map/map';

type OffersListProps = {
  city: CityType;
  offersList: Offer[];
}

function OffersList(props:OffersListProps):JSX.Element {
  const {city, offersList} = props;
  // eslint-disable-next-line no-console
  console.log(props);
  const [activeOffer, setActiveOffer] = useState<Offer | null>(null);
  function updateState (value: Offer | null): void {
    setActiveOffer(value);
  }
  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{offersList.length} places to stay in {city}</b>
        <form className="places__sorting" action="#" method="get">
          <span className="places__sorting-caption">Sort by</span>
          <span className="places__sorting-type" tabIndex={0}>
                  Popular
            <svg className="places__sorting-arrow" width="7" height="4">
              <use xlinkHref="#icon-arrow-select"></use>
            </svg>
          </span>
          <ul className="places__options places__options--custom places__options--opened">
            <li className="places__option places__option--active" tabIndex={0}>Popular</li>
            <li className="places__option" tabIndex={0}>Price: low to high</li>
            <li className="places__option" tabIndex={0}>Price: high to low</li>
            <li className="places__option" tabIndex={0}>Top rated first</li>
          </ul>
        </form>
        <div className="cities__places-list places__list tabs__content">
          {offersList.map((offer) => <OfferCard key={offer.id} offer={offer} updateState={updateState} activeOffer={activeOffer} />)}
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
