import React from 'react';
import ScreenHeader from '../header/screen-header';
import {connect, ConnectedProps} from 'react-redux';
import {ThunkAppDispatch} from '../../types/action';
import {fetchExpendedOfferAction, fetchNearbyOffersAction, fetchReviewsAction} from '../../store/api-actions';
import ExpendedOffer from '../expended-offer/expended-offer';

type PropertyScreenProps = {
  id: number
}

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  fetchExpendedOffer(id: number) {
    dispatch(fetchExpendedOfferAction(id));
  },
  fetchReviews(id: number) {
    dispatch(fetchReviewsAction(id));
  },
  fetchNearbyOffers(id:number) {
    dispatch(fetchNearbyOffersAction(id));
  },
});

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & PropertyScreenProps;


function PropertyScreen(props: ConnectedComponentProps):JSX.Element {
  const {fetchExpendedOffer, fetchReviews, fetchNearbyOffers, id} = props;
  fetchExpendedOffer(id);
  fetchReviews(id);
  fetchNearbyOffers(id);
  return (
    <>
      <div style={{display: 'none'}}>
        <svg xmlns="http://www.w3.org/2000/svg">
          <symbol id="icon-arrow-select" viewBox="0 0 7 4">
            <path fillRule="evenodd" clipRule="evenodd" d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z"></path>
          </symbol>
          <symbol id="icon-bookmark" viewBox="0 0 17 18">
            <path
              d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z"
            >
            </path>
          </symbol>
          <symbol id="icon-star" viewBox="0 0 13 12">
            <path fillRule="evenodd" clipRule="evenodd"
              d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z"
            >
            </path>
          </symbol>
        </svg>
      </div>

      <div className="page">
        <ScreenHeader />
        <main className="page__main page__main--property">
          <ExpendedOffer />
        </main>
      </div>
    </>
  );
}

export {PropertyScreen};
export default connector(PropertyScreen);
