import {render, screen} from '@testing-library/react';
import Map from './map';
import {makeFakeOffer} from '../../utils/mocks';

const fakeOfferList = new Array(4).fill(null).map(() => makeFakeOffer());
const fakeOffer = fakeOfferList[0];

describe('Component: Map', () => {
  it('should render correctly', () => {
    render(
      <Map offers={fakeOfferList} activeOffer={fakeOffer} styleForMap={'762px'} />,
    );

    expect(screen.getByText(/OpenStreetMap/i)).toBeInTheDocument();
  });
});
