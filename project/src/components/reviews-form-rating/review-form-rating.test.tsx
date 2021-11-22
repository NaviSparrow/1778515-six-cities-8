import ReviewsFormRating from './reviews-form-rating';
import {render, screen} from '@testing-library/react';

const fakeReviewRating = 5;
const fakeOnRatingChange = jest.fn();
const fakeDisableForm = false;
describe('Component: ReviewFormRating', () => {
  it('should render correctly',  () => {
    render(
      <ReviewsFormRating reviewRating={fakeReviewRating}
        onRatingChange={fakeOnRatingChange}
        disableForm={fakeDisableForm}
      />);

    expect(screen.getAllByRole('radio').length).toBe(5);
  });
});
