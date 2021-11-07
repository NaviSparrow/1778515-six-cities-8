import React from 'react';
import NearbyOferCard from '../nearby-offer-card/nearby-ofer-card';
import {State} from '../../types/state';
import {connect, ConnectedProps} from 'react-redux';

const mapStateToProps = ({nearbyOfferList}:State) => ({
  nearbyOfferList,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function NearbyOfferList(props: PropsFromRedux):JSX.Element {
  const {nearbyOfferList} = props;
  return (
    <div className="container">
      <section className="near-places places">
        <h2 className="near-places__title">Other places in the neighbourhood</h2>
        <div className="near-places__list places__list">
          {nearbyOfferList.map((offer) => <NearbyOferCard key={offer.id} offer={offer} />)}
        </div>
      </section>
    </div>
  );
}

export {NearbyOfferList};
export default connector(NearbyOfferList);