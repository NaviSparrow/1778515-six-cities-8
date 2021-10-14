import {Review} from '../../types/offer';
import OfferReview from '../offer-review/offer-review';
import React from 'react';

type OfferReviewsListProps = {
  reviews: Review[];
}

function OfferReviewList({reviews}: OfferReviewsListProps): JSX.Element {
  return (
    <ul className="reviews__list">
      {reviews.map((review) => <OfferReview key={review.id} review={review} />)}
    </ul>
  );
}

export default OfferReviewList;
