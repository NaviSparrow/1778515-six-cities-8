import {ReviewType} from '../../types/review-type';
import OfferReview from '../offer-review/offer-review';
import React from 'react';

type OfferReviewsListProps = {
  reviews: ReviewType[];
}

function OfferReviewList({reviews}: OfferReviewsListProps): JSX.Element {
  return (
    <ul className="reviews__list">
      {reviews.map((review) => <OfferReview key={review.id} review={review} />)}
    </ul>
  );
}

export default React.memo(OfferReviewList, (prevProps, nextProps) => prevProps.reviews === nextProps.reviews);
