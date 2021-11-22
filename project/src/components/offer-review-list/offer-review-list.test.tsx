import {render, screen} from '@testing-library/react';
import OfferReviewList from './offer-review-list';
import {makeFakeReviewList} from '../../utils/mocks';

const fakeReviews = makeFakeReviewList();

describe('Component: OfferReviewList',() => {
  it('should render correctly', () => {
    render(
      <OfferReviewList reviews={fakeReviews} />);

    const listItems = screen.queryAllByRole('listitem');

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(listItems.length).toBe(fakeReviews.length);
  });
});
