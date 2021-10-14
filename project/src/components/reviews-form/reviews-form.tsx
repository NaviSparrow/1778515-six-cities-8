import React, {ChangeEvent} from 'react';
import {useState} from 'react';
import ReviewsFormRating from '../reviews-form-rating/reviews-form-rating';

function ReviewsForm():JSX.Element {
  const [reviewRating, setReviewRating] = useState('0');
  const [reviewText, setReviewText] = useState('');
  // eslint-disable-next-line no-console
  console.log(reviewRating, reviewText);
  function updateReviewRating (value:string):void {
    setReviewRating(value);
  }
  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <ReviewsFormRating updateReviewRating={updateReviewRating} />
      <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={({target}: ChangeEvent<HTMLTextAreaElement>) => setReviewText(target.value)}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and
          describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled>Submit</button>
      </div>
    </form>
  );
}

export default ReviewsForm;
