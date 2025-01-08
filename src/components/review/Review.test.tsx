import { render, screen } from '@testing-library/react';
import { Review } from './Review';
import makeFakeReview from '../../mocks/makeFakeReviews';

describe('Component: Review', () => {
  it('should render correctly', () => {
    const userNameTestId = 'review-user-name';
    const userImageTestId = 'review-user-img';
    const reviewRatingTestId = 'review-rating';
    const reviewTimeTestId = 'review-time';
    const reviewCommentTestId = 'review-comment';
    const fakeReview = makeFakeReview();

    render(<Review review={fakeReview}/>);
    const userName = screen.getByTestId(userNameTestId);
    const userImage = screen.queryByTestId(userImageTestId);
    const reviewRating = screen.queryByTestId(reviewRatingTestId);
    const reviewTime = screen.queryByTestId(reviewTimeTestId);
    const reviewComment = screen.queryByTestId(reviewCommentTestId);

    expect(userName).toHaveTextContent(fakeReview.user.name);
    expect(userImage).toHaveAttribute('src', fakeReview.user.avatarUrl);
    expect(reviewRating).toHaveStyle({
      width: `${fakeReview.rating * 20}%`
    });
    expect(reviewTime).toHaveTextContent(new Date(fakeReview.date).toLocaleDateString('en-EN', {
      year: 'numeric',
      month: 'long',
    }));
    expect(reviewComment).toHaveTextContent(fakeReview.comment);
  });
});
