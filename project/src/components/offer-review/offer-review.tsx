import dayjs from 'dayjs';
import {ReviewType} from '../../types/review-type';

type OfferReviewProps = {
  review: ReviewType;
}

const formatDate = (date:string, format:string) => dayjs(date).format(format).toString();

function OfferReview({review}: OfferReviewProps):JSX.Element {
  const {comment, date, rating, user} = review;
  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={user.avatarUrl} width="54" height="54"
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">
          {user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${rating * 20}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment}
        </p>
        <time className="reviews__time" dateTime={formatDate(date, 'YYYY-MM-DD')}>{formatDate(date, 'MMMM YYYY')}</time>
      </div>
    </li>
  );
}

export default OfferReview;
