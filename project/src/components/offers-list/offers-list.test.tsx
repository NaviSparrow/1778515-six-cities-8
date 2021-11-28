import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import {makeFakeOfferList} from '../../utils/mocks';
import * as Redux from 'react-redux';
import {AuthorizationStatus} from '../../const';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {Route, Router} from 'react-router-dom';
import OffersList from './offers-list';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const fakeOfferList = makeFakeOfferList();
const dispatch = jest.fn();
const useDispatch = jest.spyOn(Redux, 'useDispatch');
useDispatch.mockReturnValue(dispatch);
const fakeCallBack = jest.fn();
const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.Auth},
});

describe('Component: OfferList', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Route render={() => <OffersList city={fakeOfferList[0].city.name} offerList={fakeOfferList} onActiveOfferChange={fakeCallBack} />}>
          </Route>
        </Router>
      </Provider>);

    expect(screen.getAllByText(/Places/i).length).toBe(2);
    expect(screen.getByText(`${fakeOfferList.length} places to stay in ${fakeOfferList[0].city.name}`)).toBeInTheDocument();
    expect(screen.queryByText(/Sort by/i)).toBeInTheDocument();
    expect(screen.getByText(`${fakeOfferList[0].title}`)).toBeInTheDocument();
  });
});
