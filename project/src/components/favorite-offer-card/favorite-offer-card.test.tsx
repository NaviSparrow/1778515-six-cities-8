import {render, screen} from '@testing-library/react';
import FavoriteOfferCard from './favorite-offer-card';
import {makeFakeOffer} from '../../utils/mocks';
import * as Redux from 'react-redux';
import {Route, Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import userEvent from '@testing-library/user-event';

const fakeOffer = makeFakeOffer();
const history = createMemoryHistory();

describe('Component: FavoriteOfferCard', () => {
  it('should render correctly', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    render(
      <Router history={history}>
        <Route render={() => <FavoriteOfferCard offer={fakeOffer}/>}>
        </Route>
      </Router>);

    expect(screen.getByText(/Premium/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Place image/i)).toBeInTheDocument();
    expect(screen.getAllByRole('link').length).toBe(2);
    expect(screen.getByText('/ night')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText(/To bookmarks/i)).toBeInTheDocument();
    expect(screen.getByText(/Rating/i)).toBeInTheDocument();
    expect(screen.getByText(`${fakeOffer.title}`)).toBeInTheDocument();
  });

  it('should dispatch on button click', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    render(
      <Router history={history}>
        <Route render={() => <FavoriteOfferCard offer={fakeOffer}/>}>
        </Route>
      </Router>);

    userEvent.click(screen.getByRole('button'));
    expect(useDispatch).toBeCalledTimes(1);
    expect(dispatch).toBeCalled();
  });

  it('should redirect to OpenedOffer', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    render(
      <Router history={history}>
        <Route render={() => <FavoriteOfferCard offer={fakeOffer}/>}>
        </Route>
        <Route exact path={`/offer/${fakeOffer.id}`} render={() => <h1>This is opened offer</h1>}>
        </Route>
      </Router>);

    userEvent.click(screen.getByText(`${fakeOffer.title}`));
    expect(screen.getByText(/This is opened offer/i)).toBeInTheDocument();
  });
});
