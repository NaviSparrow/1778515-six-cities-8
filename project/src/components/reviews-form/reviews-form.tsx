import React, {ChangeEvent, FormEvent} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useState} from 'react';
import ReviewsFormRating from '../reviews-form-rating/reviews-form-rating';
import {postNewReviewAction} from '../../store/api-actions';
import {ReviewPostType} from '../../types/review-post-type';
import {getOpenedOffer} from '../../store/property-data/selectors';

function ReviewsForm():JSX.Element {
  const openedOffer = useSelector(getOpenedOffer);
  const dispatch = useDispatch();

  const onSubmit = ({comment, rating, id}: ReviewPostType) => {
    dispatch(postNewReviewAction({comment, rating, id}));
  };
  const [reviewRating, setReviewRating] = useState<number>(0);
  const [reviewComment, setReviewComment] = useState<string>('');

  const handleSubmit = (evt:FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    onSubmit({
      comment: reviewComment,
      rating: reviewRating,
      id: openedOffer?.id,
    });
    setReviewRating(0);
    setReviewComment('');
  };

  const isReviewValid = (comment:string, rating: number):boolean => (comment.length > 50 && comment.length < 300) && rating !== 0;

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <ReviewsFormRating reviewRating={reviewRating} onRatingChange={setReviewRating} />
      <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved"
        value={reviewComment}
        onChange={({target}: ChangeEvent<HTMLTextAreaElement>) => setReviewComment(target.value)}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and
          describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={!isReviewValid(reviewComment, reviewRating)}>
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewsForm;
