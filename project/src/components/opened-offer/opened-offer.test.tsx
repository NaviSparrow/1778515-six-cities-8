import {makeFakeOfferList} from '../../utils/mocks';
import {AuthorizationStatus} from '../../const';
import * as Redux from 'react-redux';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {Route, Router} from 'react-router-dom';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import OpenedOffer from './opened-offer';

const mockStore = configureMockStore();
const history = createMemoryHistory();
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
describe('Component OpenedOffer', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Route exact path={`/offer/${fakeOpenedOffer.id}`}>
            <OpenedOffer />
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
    expect(useDispatch).toBeCalledTimes(3);

  });
});


