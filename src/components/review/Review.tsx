
import React from 'react';
import { TReview } from '../../types';

type ReviewProps = {
  review: TReview;
}

export const Review: React.FC<ReviewProps> = ({
  review,
}) => (
  <li className="reviews__item">
    <div className="reviews__user user">
      <div className="reviews__avatar-wrapper user__avatar-wrapper">
        <img
          className="reviews__avatar user__avatar"
          data-testid="review-user-img"
          src={review.user.avatarUrl}
          width={54}
          height={54}
          alt="Reviews avatar"
        />
      </div>
      <span className="reviews__user-name" data-testid="review-user-name">{review.user.name}</span>
    </div>
    <div className="reviews__info">
      <div className="reviews__rating rating">
        <div className="reviews__stars rating__stars">
          <span style={{ width: `${review.rating * 20}%`}} data-testid="review-rating"/>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <p className="reviews__text" data-testid="review-comment">
        {review.comment}
      </p>
      <time className="reviews__time" dateTime="2019-04-24" data-testid="review-time">
        {new Date(review.date).toLocaleDateString('en-EN', {
          year: 'numeric',
          month: 'long',
        })}
      </time>
    </div>
  </li>
);

