import React, {ChangeEvent} from 'react';

type RatingStarProps = {
  rating: number,
  ratingName: string,
  reviewRating: number
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void;
  disableForm: boolean;
}

function RatingStar(props: RatingStarProps):JSX.Element {
  const {rating, ratingName, reviewRating, onChange, disableForm} = props;
  return (
    <>
      <input className="form__rating-input visually-hidden" name="rating" value={rating} id={`${rating}-stars`}
        type="radio"
        checked={reviewRating === rating} onChange={onChange}
        disabled={disableForm}
      />
      <label htmlFor={`${rating}-stars`}
        className="reviews__rating-label form__rating-label"
        title={ratingName}
      >
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"/>
        </svg>
      </label>
    </>
  );
}

export default RatingStar;
