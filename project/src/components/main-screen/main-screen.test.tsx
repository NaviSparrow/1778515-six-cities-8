import {createMemoryHistory} from 'history';
import * as Redux from 'react-redux';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Route, Router} from 'react-router-dom';
import {AppRoute, AuthorizationStatus, City} from '../../const';
import MainScreen from './main-screen';
import {makeFakeOfferList} from '../../utils/mocks';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const fakeOfferList = makeFakeOfferList();

describe('Component: MainScreen', () => {
  const store = mockStore({
    MAIN: {offerList: fakeOfferList, city: City.Paris},
    USER: {authorizationStatus: AuthorizationStatus.Auth},
  });
  it('should render MainScreenEmpty', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    render(
      <Provider store={store}>
        <Router history={history}>
          <Route exact path={AppRoute.Root}>
            <MainScreen />
          </Route>
        </Router>
      </Provider>);

    expect(screen.getByAltText(/6 cities logo/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
    expect(screen.getByText(/Cities/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Paris/i).length).toBe(2);
    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
    expect(screen.getByText(/We could not find any property available at the moment in Paris/i)).toBeInTheDocument();
  });
});
