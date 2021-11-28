import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import {makeFakeOfferList} from '../../utils/mocks';
import {Provider} from 'react-redux';
import {Route, Router} from 'react-router-dom';
import NearbyOfferList from './nearby-offer-list';
import {render, screen} from '@testing-library/react';


const mockStore = configureMockStore();
const history = createMemoryHistory();
const fakeOfferList = makeFakeOfferList();

describe('Component: NearbyOfferList', () => {
  it('should render correctly', () => {
    const store = mockStore({
      PROPERTY: {nearbyOfferList: fakeOfferList},
    });
    render(
      <Provider store={store}>
        <Router history={history}>
          <Route render={() => <NearbyOfferList />}>
          </Route>
        </Router>
      </Provider>);

    expect(screen.getByText(/Other places in the neighbourhood/i)).toBeInTheDocument();
    expect(screen.getByText(`${fakeOfferList[0].title}`)).toBeInTheDocument();
  });
});
