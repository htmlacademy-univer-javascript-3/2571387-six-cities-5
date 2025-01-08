import { TReview } from '../../types';
import { Review } from '../review/Review';

type ListReviewProps = {
  reviews: TReview[];
}

export const ListReviews: React.FC<ListReviewProps> = ({
  reviews,
}) => (
  <>
    <h2 className="reviews__title" data-testid="reviews-title">
      Reviews · <span className="reviews__amount">{reviews.length}</span>
    </h2>
    <ul className="reviews__list" data-testid="reviews-list">
      {reviews.map((review) => <Review key={review.id} review={review} />)}
    </ul>
  </>
);
