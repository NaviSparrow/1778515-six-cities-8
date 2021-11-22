import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {Route, Router} from 'react-router-dom';
import Header from './header';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import {AppRoute, AuthorizationStatus} from '../../const';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Component: Header', () => {
  it('should render not loggedBar in header', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.Unknown},
    });
    render(
      <Provider store={store}>
        <Router history={history}>
          <Header />
        </Router>
      </Provider>);

    expect(screen.getByAltText(/6 cities logo/i)).toBeInTheDocument();
    expect(screen.queryByRole('list')).toBeInTheDocument();
    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
    expect(screen.getAllByRole('link').length).toBe(2);
  });

  it('should redirect to AuthScreen when user click on Sign in', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.Unknown},
    });
    render(
      <Provider store={store}>
        <Router history={history}>
          <Header />
          <Route exact path={AppRoute.Auth}>
            <h1>This is AuthScreen</h1>
          </Route>
        </Router>
      </Provider>);

    userEvent.click(screen.getByText(/Sign in/i));
    expect(screen.getByText(/This is AuthScreen/i)).toBeInTheDocument();
  });

  it('should render loggedBar when authorizationStatus is Auth', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.Auth},
    });
    render(
      <Provider store={store}>
        <Router history={history}>
          <Header />
        </Router>
      </Provider>);

    expect(screen.getByAltText(/6 cities logo/i)).toBeInTheDocument();
    expect(screen.queryByRole('list')).toBeInTheDocument();
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
    expect(screen.getAllByRole('link').length).toBe(3);
  });
});
