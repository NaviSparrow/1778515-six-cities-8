import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import * as Redux from 'react-redux';
import {makeFakeOffer} from '../../utils/mocks';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {Route, Router} from 'react-router-dom';
import ReviewsForm from './reviews-form';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const fakeOffer = makeFakeOffer();

describe('Component: ReviewForm', () => {
  it('should render correctly',  () => {
    const store = mockStore({
      PROPERTY: {openedOffer: fakeOffer},
    });
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    render(
      <Provider store={store}>
        <Router history={history}>
          <Route render={() => <ReviewsForm />}>
          </Route>
        </Router>
      </Provider>);

    expect(screen.getByLabelText(/Your review/i)).toBeInTheDocument();
    expect(screen.getByText(/To submit review please make sure to set/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();

    userEvent.click(screen.getByRole('button'));
    expect(useDispatch).toBeCalled();
  });
});
