import {CityType, Offer} from '../../types/offer';
import React from 'react';
import OfferCard from '../offer-card/offer-card';
import {useState} from 'react';
import OfferSortList from '../offer-sort-list/offer-sort-list';
import {SortType, getSortedOffers} from '../../const';

type OffersListProps = {
  city: CityType;
  offerList: Offer[];
  onActiveOfferChange: (value: Offer | null) => void;
}

function OffersList(props:OffersListProps):JSX.Element {
  const {city, offerList, onActiveOfferChange} = props;
  const [currentSort, setCurrentSort] = useState<string>(SortType.Popular);
  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{offerList.length} places to stay in {city}</b>
      <OfferSortList currentSort={currentSort} onChangeSort={setCurrentSort} />
      <div className="cities__places-list places__list tabs__content">
        {getSortedOffers(currentSort, offerList).map((offer) => (
          <OfferCard
            key={offer.id}
            offer={offer}
            onActiveOfferChange={onActiveOfferChange}
          />))}
      </div>
    </section>
  );
}

export default OffersList;
