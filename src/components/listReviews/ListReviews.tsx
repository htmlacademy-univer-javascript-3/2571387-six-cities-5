import { TReview } from '../../types';
import { Review } from '../review/Review';

type ListReviewProps = {
  reviews: TReview[];
}

export const ListReviews: React.FC<ListReviewProps> = ({
  reviews,
}) => (
  <ul className="reviews__list">
    {reviews.map((review)=> <Review key={review.id} review={review} />)}
  </ul>
);
