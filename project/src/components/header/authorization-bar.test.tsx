import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AuthorizationStatus} from '../../const';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import AuthorizationBar from './authorization-bar';

const history = createMemoryHistory();
const mockStore = configureMockStore();


describe('Component: AuthorizationBar', () => {
  it('should render Sign in when AuthorizationStatus is Unknown', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.Unknown},
    });
    render(
      <Provider store={store}>
        <Router history={history}>
          <AuthorizationBar/>
        </Router>
      </Provider>);

    expect(screen.queryByRole('list')).toBeInTheDocument();
    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
    expect(screen.queryByText(/Sign out/i)).not.toBeInTheDocument();
  });

  it('should render Sign out when AuthorizationStatus is Auth', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.Auth},
    });
    render(
      <Provider store={store}>
        <Router history={history}>
          <AuthorizationBar/>
        </Router>
      </Provider>);

    expect(screen.queryByRole('list')).toBeInTheDocument();
    expect(screen.queryByText(/Sign in/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
  });
});
