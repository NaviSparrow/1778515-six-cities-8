import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import {Route, Router} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import FavoritesScreen from './favorites-screen';
import * as Redux from 'react-redux';
import {makeFakeOfferList} from '../../utils/mocks';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Component: FavoritesScreen', () => {
  beforeEach(() => {
    history.push(AppRoute.Favorites);
  });

  it('should render EmptyFavoritesScreen', () => {
    const store = mockStore({
      FAVORITE: {favoritesOfferList: []},
      USER: {authorizationStatus: AuthorizationStatus.Auth},
    });
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    render(
      <Provider store={store} >
        <Router history={history} >
          <Route exact path={AppRoute.Favorites}>
            <FavoritesScreen />
          </Route>
        </Router>
      </Provider>,
    );

    expect(screen.getAllByAltText(/6 cities logo/i).length).toBe(2);
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
    expect(screen.getByText(/Favorites/i)).toBeInTheDocument();
    expect(screen.getByText(/Nothing yet saved./i)).toBeInTheDocument();
    expect(screen.getByText(/Save properties to narrow down search or plan your future trips./i)).toBeInTheDocument();
  });

  it('should render FavoritesOfferList', () => {
    const fakeFavoritesOffers = makeFakeOfferList();
    const store = mockStore({
      FAVORITE: {favoritesOfferList: fakeFavoritesOffers},
      USER: {authorizationStatus: AuthorizationStatus.Auth},
    });
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    render(
      <Provider store={store} >
        <Router history={history} >
          <Route exact path={AppRoute.Favorites}>
            <FavoritesScreen />
          </Route>
        </Router>
      </Provider>,
    );

    expect(screen.getAllByAltText(/6 cities logo/i).length).toBe(2);
    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
    expect(screen.getByText(fakeFavoritesOffers[0].city.name)).toBeInTheDocument();
  });
});
