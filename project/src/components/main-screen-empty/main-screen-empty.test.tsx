import {render, screen} from '@testing-library/react';
import MainScreenEmpty from './main-screen-empty';
import {address} from 'faker';

const fakeCity = address.city();

describe('Component: MainScreenEmpty', () => {
  it('should render correctly', () => {
    render(
      <MainScreenEmpty city={fakeCity} />);

    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
    expect(screen.getByText(`We could not find any property available at the moment in ${fakeCity}`)).toBeInTheDocument();
  });
});
