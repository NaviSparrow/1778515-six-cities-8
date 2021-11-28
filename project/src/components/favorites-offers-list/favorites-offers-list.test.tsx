import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import * as Redux from 'react-redux';
import {Provider} from 'react-redux';
import {render, screen} from '@testing-library/react';
import {AppRoute, AuthorizationStatus} from '../../const';
import {makeFakeOffer} from '../../utils/mocks';
import {Route, Router} from 'react-router-dom';
import FavoritesOffersList from './favorites-offers-list';
import userEvent from '@testing-library/user-event';
import {ActionType} from '../../types/action';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const fakeFavoritesOffers = new Array(1).fill(null).map(() => makeFakeOffer());

describe('Component: FavoritesOffersList', () => {
  it('should render correctly', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.Auth},
      FAVORITE: {favoritesOfferList: fakeFavoritesOffers},
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <Route render={() => <FavoritesOffersList offersList={fakeFavoritesOffers} />} >
          </Route>
        </Router>
      </Provider>);

    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getByText(fakeFavoritesOffers[0].city.name)).toBeInTheDocument();
  });

  it('should call changeCity and redirectToRoot', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.Auth},
      FAVORITE: {favoritesOfferList: fakeFavoritesOffers},
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <Route render={() => <FavoritesOffersList offersList={fakeFavoritesOffers} />} >
          </Route>
          <Route exact path={AppRoute.Root}>
            <h1>This is Root</h1>
          </Route>
        </Router>
      </Provider>);

    const fakeCity = screen.queryAllByText(`${fakeFavoritesOffers[0].city.name}`);
    expect(fakeCity.length).toBe(1);
    userEvent.click(fakeCity[0]);
    expect(useDispatch).toBeCalledTimes(2);
    expect(dispatch).toBeCalledWith({payload: fakeFavoritesOffers[0].city.name, type: ActionType.ChangeCity});
    expect(dispatch).toBeCalledWith({payload: '/', type: ActionType.RedirectToRoute});
    expect(screen.getByText(/This is Root/i)).toBeInTheDocument();
  });
});
