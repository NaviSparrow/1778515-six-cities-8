import {Offer} from '../../types/offer';
import React from 'react';
import OfferCard from '../offer-card/offer-card';
import {useState} from 'react';

type OffersListProps = {
  offers: Offer[];
  onOffersListItemHover: (activeItemid: number| null) => void;
}

function OffersList({offers, onOffersListItemHover}:OffersListProps):JSX.Element {
  const [activeOfferid, setActiveOfferid] = useState<number | null>(null);
  function updateState (value: number | null): void {
    setActiveOfferid(value);
    onOffersListItemHover(value);
  }
  return (
    <React.Fragment>
      {offers.map((offer) => <OfferCard key={offer.id} offer={offer} updateState={updateState} activeOfferid={activeOfferid} />)}
    </React.Fragment>
  );
}

export default OffersList;
