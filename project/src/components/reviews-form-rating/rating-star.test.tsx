import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import RatingStar from './rating-star';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();
const fakeRating = 5;
const fakeRatingName = 'perfect';
const fakeReviewRating = 5;


describe('Component: RatingStar',() => {
  it('should render correctly',() => {
    render(
      <Router history={history}>
        <RatingStar rating={fakeRating}
          ratingName={fakeRatingName}
          reviewRating={fakeReviewRating}
          onChange={jest.fn()}
          disableForm={false}
        />
      </Router>);

    expect(screen.getByRole('radio')).toBeInTheDocument();
    expect(screen.getByRole('radio')).toBeChecked();
  });

  it('should call onChange when user choose rating',  () => {
    const fakeOnChange = jest.fn();

    render(
      <RatingStar rating={3}
        ratingName={fakeRatingName}
        reviewRating={fakeReviewRating}
        onChange={fakeOnChange}
        disableForm={false}
      />);

    expect(screen.getByRole('radio')).not.toBeChecked();
    userEvent.click(screen.getByRole('radio'));
    expect(fakeOnChange).toBeCalled();
  });
});
