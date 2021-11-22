import {render, screen} from '@testing-library/react';
import CitiesList from './cities-list';
import {address} from 'faker';
import userEvent from '@testing-library/user-event';

const fakeCity = address.city();
const fakeOnChangeCity = jest.fn();

describe('Component: CitiesList', () => {
  it('should render correctly', () => {
    render(
      <CitiesList activeCity={fakeCity} onChangeCity={fakeOnChangeCity} />);

    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('should call onChangeCity when user click on city', () => {
    render(
      <CitiesList activeCity={fakeCity} onChangeCity={fakeOnChangeCity} />);

    userEvent.click(screen.getByText(/Paris/i));
    expect(fakeOnChangeCity).toBeCalled();
  });
});
