import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {Route, Router} from 'react-router-dom';
import {AppRoute} from '../../const';
import AuthScreen from './auth-screen';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const fakeCallback = jest.fn();

describe('Component: AuthScreen', () => {
  const store = mockStore({});
  it('should render correctly when user navigate to "/login"',  () => {
    history.push(AppRoute.Auth);
    render(
      <Provider store={store}>
        <Router history={history}>
          <Route exact path={AppRoute.Auth}>
            <AuthScreen onRandomCityClick={fakeCallback} />
          </Route>
        </Router>
      </Provider>);

    expect(screen.getAllByText(/Sign in/i).length).toBe(2);
    expect(screen.getByLabelText('E-mail')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    userEvent.type(screen.getByTestId('login'), 'test');
    userEvent.type(screen.getByTestId('password'), '123456');
    expect(screen.getByDisplayValue(/test/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/123456/i)).toBeInTheDocument();
  });
});
