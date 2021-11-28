import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {makeFakeOffer} from '../../utils/mocks';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {Route, Router} from 'react-router-dom';
import FavoritesMainContent from './favorites-main-content';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const fakeFavoritesOffers = new Array(1).fill(null).map(() => makeFakeOffer());

describe('Component:FavoritesMainContent', () => {
  it('should render FavoritesEmptyScreen', () => {
    const store = mockStore({
      FAVORITE: {favoritesOfferList: []},
    });
    render(
      <Provider store={store}>
        <Router history={history}>
          <Route render={() => <FavoritesMainContent />} >
          </Route>
        </Router>
      </Provider>);

    expect(screen.getByText(/Favorites/i)).toBeInTheDocument();
    expect(screen.getByText(/Nothing yet saved./i)).toBeInTheDocument();
    expect(screen.getByText(/Save properties to narrow down search or plan your future trips./i)).toBeInTheDocument();
  });

  it('should render FavoritesOfferList',  () => {
    const store = mockStore({
      FAVORITE: {favoritesOfferList: fakeFavoritesOffers},
    });
    render(
      <Provider store={store}>
        <Router history={history}>
          <Route render={() => <FavoritesMainContent />} >
          </Route>
        </Router>
      </Provider>);

    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getByText(fakeFavoritesOffers[0].city.name)).toBeInTheDocument();
  });
});
