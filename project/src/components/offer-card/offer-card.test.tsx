import {makeFakeOffer} from '../../utils/mocks';
import {AuthorizationStatus} from '../../const';
import * as Redux from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {Route, Router} from 'react-router-dom';
import OfferCard from './offer-card';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const fakeOffer = makeFakeOffer();
const dispatch = jest.fn();
const useDispatch = jest.spyOn(Redux, 'useDispatch');
useDispatch.mockReturnValue(dispatch);
const fakeCallBack = jest.fn();
const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.Auth},
});

describe('Component: OfferCard', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Route exact path={`/offer/${fakeOffer.id}`} render={() => <h1>This is opened offer</h1>}>
          </Route>
          <Route render={() => <OfferCard onActiveOfferChange={fakeCallBack} offer={fakeOffer} />}>
          </Route>
        </Router>
      </Provider>);

    expect(screen.getByText(/Premium/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Place image/i)).toBeInTheDocument();
    expect(screen.getAllByRole('link').length).toBe(2);
    expect(screen.getByText('/ night')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText(/To bookmarks/i)).toBeInTheDocument();
    expect(screen.getByText(/Rating/i)).toBeInTheDocument();
    expect(screen.getByText(`${fakeOffer.title}`)).toBeInTheDocument();

    userEvent.click(screen.getByText(`${fakeOffer.title}`));
    expect(screen.getByText(/This is opened offer/i)).toBeInTheDocument();
  });
});
