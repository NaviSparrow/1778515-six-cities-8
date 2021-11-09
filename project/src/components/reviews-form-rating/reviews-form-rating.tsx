import React, {ChangeEvent} from 'react';
import RatingStar from './rating-star';
import {StarRating} from '../../const';

type ReviewsRatingProps = {
  reviewRating: number
  onRatingChange: (value: number) => void;
}

function ReviewsFormRating({reviewRating, onRatingChange}: ReviewsRatingProps): JSX.Element {
  const handleRatingChange = (evt: ChangeEvent<HTMLInputElement>) =>
    onRatingChange(parseInt(evt.target.value, 10));
  return (
    <div className="reviews__rating-form form__rating">
      {Object.entries(StarRating).map(([key, value]) => (
        <RatingStar
          key={value}
          rating={value}
          ratingName={key}
          reviewRating={reviewRating}
          onChange={handleRatingChange}
        />),
      )}
    </div>
  );
}

export default ReviewsFormRating;
