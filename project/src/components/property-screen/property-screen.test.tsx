import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import {makeFakeOfferList} from '../../utils/mocks';
import {AuthorizationStatus} from '../../const';
import * as Redux from 'react-redux';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {Route, Router} from 'react-router-dom';
import PropertyScreen from './property-screen';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const fakeOfferList = makeFakeOfferList();
const fakeOpenedOffer = fakeOfferList[0];
const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.Auth},
  MAIN: {isDataLoaded: true, offerList: fakeOfferList},
  PROPERTY: {openedOffer: fakeOpenedOffer, reviewList: [], nearbyOfferList: []},
});

describe('Component: PropertyScreen', () => {
  it('should render correctly', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    history.push(`/offer/${fakeOpenedOffer.id}`);
    render(
      <Provider store={store}>
        <Router history={history}>
          <Route exact path={`/offer/${fakeOpenedOffer.id}`}>
            <PropertyScreen id={fakeOpenedOffer.id} offer={fakeOpenedOffer} />
          </Route>
        </Router>
      </Provider>);

    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
    expect(screen.getByText(/Bedrooms/i)).toBeInTheDocument();
    expect(screen.getByText('Rating')).toBeInTheDocument();
    expect(screen.getByText(`${fakeOpenedOffer.description}`)).toBeInTheDocument();
    expect(screen.getByText(`Max ${fakeOpenedOffer.maxAdults} adults`)).toBeInTheDocument();
    expect(screen.getByText(/OpenStreetMap/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
  });
});
