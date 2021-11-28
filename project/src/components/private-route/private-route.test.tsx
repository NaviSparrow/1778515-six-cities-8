import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import {AppRoute, AuthorizationStatus} from '../../const';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {Route, Router} from 'react-router-dom';
import PrivateRoute from './private-route';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: PrivateRoute', () => {
  it('should render Public Route when authorizationStatus !== Auth',  () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.Unknown},
    });
    history.push(AppRoute.Favorites);
    render(
      <Provider store={store}>
        <Router history={history}>
          <Route exact path={AppRoute.Auth}><h1>Public Route</h1></Route>
          <PrivateRoute exact path={AppRoute.Favorites} render={() => <h1>Private Route</h1>}/>
        </Router>
      </Provider>);

    expect(screen.getByText(/Public Route/i)).toBeInTheDocument();
    expect(screen.queryByText(/Private Route/i)).not.toBeInTheDocument();
  });

  it('should render Private Route when authorizationStatus === Auth',  () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.Auth},
    });
    history.push(AppRoute.Favorites);
    render(
      <Provider store={store}>
        <Router history={history}>
          <Route exact path={AppRoute.Auth}><h1>Public Route</h1></Route>
          <PrivateRoute exact path={AppRoute.Favorites} render={() => <h1>Private Route</h1>}/>
        </Router>
      </Provider>);

    expect(screen.getByText(/Private Route/i)).toBeInTheDocument();
    expect(screen.queryByText(/Public Route/i)).not.toBeInTheDocument();
  });
});
