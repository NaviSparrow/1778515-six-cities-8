import {render, screen} from '@testing-library/react';
import OfferReview from './offer-review';
import {makeFakeReview} from '../../utils/mocks';
import dayjs from 'dayjs';

const fakeReview = makeFakeReview();
const formatDate = (date:string, format:string) => dayjs(date).format(format).toString();
const {comment, date, user} = fakeReview;


describe('Component: OfferReview', () => {
  it('should render correctly', () => {
    render(
      <OfferReview review={fakeReview} />);

    expect(screen.getByRole('listitem')).toBeInTheDocument();
    expect(screen.getByAltText(/Reviews avatar/i)).toBeInTheDocument();
    expect(screen.getByText(`${user.name}`)).toBeInTheDocument();
    expect(screen.getByText(/Rating/i)).toBeInTheDocument();
    expect(screen.getByText(`${comment}`)).toBeInTheDocument();
    expect(screen.getByText(`${formatDate(date, 'MMMM YYYY')}`)).toBeInTheDocument();
  });
});
