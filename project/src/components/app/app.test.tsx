import {configureMockStore} from '@jedmao/redux-mock-store';
import {AppRoute, AuthorizationStatus} from '../../const';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import App from './app';
import {render, screen} from '@testing-library/react';
import * as Redux from 'react-redux';
import {makeFakeOfferList} from '../../utils/mocks';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('App Routing', () => {
  it('should render Spinner when auth status is unknown', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.Unknown},
      MAIN: {isDataLoaded: false},
    });
    render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>);

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it('should render AuthScreen when user navigate to "/login"', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.Auth},
      MAIN: {isDataLoaded: true},
    });
    history.push(AppRoute.Auth);
    render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>);
    expect(screen.getByLabelText('E-mail')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('should render FavoriteScreen when user navigate to "/favorite"', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.Auth},
      FAVORITE: {favoritesOfferList: []},
      MAIN: {isDataLoaded: true},
    });
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    history.push(AppRoute.Favorites);
    render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>);

    expect(screen.getAllByAltText(/6 cities logo/i).length).toBe(2);
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
    expect(screen.getByText(/Favorites/i)).toBeInTheDocument();
    expect(screen.getByText(/Nothing yet saved./i)).toBeInTheDocument();
    expect(screen.getByText(/Save properties to narrow down search or plan your future trips./i)).toBeInTheDocument();
  });

  it('should render PropertyScreen when user navigate to "/offer/:id"', () => {
    const fakeOfferList = makeFakeOfferList();
    const fakeOpenedOffer = fakeOfferList[0];
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.Auth},
      MAIN: {isDataLoaded: true, offerList: fakeOfferList},
      PROPERTY: {openedOffer: fakeOpenedOffer, reviewList: [], nearbyOfferList: []},
    });
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    history.push(`/offer/${fakeOpenedOffer.id}`);
    render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>);

    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
    expect(screen.getByText(/Bedrooms/i)).toBeInTheDocument();
    expect(screen.getByText('Rating')).toBeInTheDocument();
    expect(screen.getByText(`Max ${fakeOpenedOffer.maxAdults} adults`)).toBeInTheDocument();
    expect(useDispatch).toBeCalledTimes(5);
  });

  it('should render NotFoundPage when user navigate to non-existent route', () => {
    const fakeOfferList = makeFakeOfferList();
    const fakeOpenedOffer = fakeOfferList[0];
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.Auth},
      MAIN: {isDataLoaded: true, offerList: fakeOfferList},
      PROPERTY: {openedOffer: fakeOpenedOffer, reviewList: [], nearbyOfferList: []},
    });
    history.push('/route is not exist');
    render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>);

    expect(screen.getByText(/404. Page not found/i)).toBeInTheDocument();
    expect(screen.getByText(/Вернуться на главную/i)).toBeInTheDocument();
  });
});
