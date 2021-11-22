import {Route, Router, Switch} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import NearbyOfferCard from './nearby-offer-card';
import {makeFakeOffer} from '../../utils/mocks';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();
const fakeOffer = makeFakeOffer();
const {id, title} = fakeOffer;


describe('Component: NearbyOfferCard', () => {
  it('should render correctly',  () => {
    render(
      <Router history={history}>
        <NearbyOfferCard offer={fakeOffer} />
      </Router>);

    expect(screen.getByText(/Premium/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Place image/i)).toBeInTheDocument();
    expect(screen.getAllByRole('link').length).toBe(2);
    expect(screen.getByText('/ night')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText(/To bookmarks/i)).toBeInTheDocument();
    expect(screen.getByText(/Rating/i)).toBeInTheDocument();
    expect(screen.getByText(`${title}`)).toBeInTheDocument();
  });

  it('should redirect to OpenedOffer when user click to title',  () => {
    render(
      <Router history={history}>
        <Switch>
          <Route>
            <NearbyOfferCard offer={fakeOffer}/>
          </Route>
          <Route exact path={`/offer/${id}`}>
            <h1>This is opened offer</h1>
          </Route>
        </Switch>
      </Router>);

    expect(screen.queryByText(/This is component with full information about offer/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByText(`${title}`));
    expect(screen.getByText(/This is component with full information about offer/i)).toBeInTheDocument();
  });
});
