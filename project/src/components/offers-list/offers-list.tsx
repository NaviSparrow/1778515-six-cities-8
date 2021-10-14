import {Offer} from '../../types/offer';
import OfferCard from '../offer-card/offer-card';
import React from 'react';
import {useState} from 'react';
import {NOT_ACTIVE_STATE} from '../../const';

type OffersListProps = {
  offers: Offer[];
}

function OffersList({offers}:OffersListProps):JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeOfferid, setActiveOfferid] = useState(NOT_ACTIVE_STATE);
  function updateState (value:number): void {
    setActiveOfferid(value);
  }
  return (
    <React.Fragment>
      {offers.map((offer) => <OfferCard key={offer.id} offer={offer} updateState={updateState} />)}
    </React.Fragment>
  );
}

export default OffersList;
