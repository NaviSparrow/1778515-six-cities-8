import {Offer} from '../../types/offer';
import OfferCard from '../offer-card/offer-card';
import React from 'react';
import {useState} from 'react';

type OffersListProps = {
  offers: Offer[];
}

function OffersList({offers}:OffersListProps):JSX.Element {
  const [activeOfferid, setActiveOfferid] = useState<number | null>(null);
  function updateState (value: number | null): void {
    setActiveOfferid(value);
  }
  return (
    <React.Fragment>
      {offers.map((offer) => <OfferCard key={offer.id} offer={offer} updateState={updateState} activeOfferid={activeOfferid} />)}
    </React.Fragment>
  );
}

export default OffersList;
