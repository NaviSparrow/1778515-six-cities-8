import {render, screen} from '@testing-library/react';
import OfferSortList from './offer-sort-list';
import userEvent from '@testing-library/user-event';

const fakeCurrentSort = 'fakeSort';
const fakeOnChangeSort = jest.fn();

describe('Component: OfferSortList',() => {
  it('should render correctly', () => {
    render(
      <OfferSortList currentSort={fakeCurrentSort} onChangeSort={fakeOnChangeSort} />);

    expect(screen.queryByText(/Sort by/i)).toBeInTheDocument();
    expect(screen.queryByText(`${fakeCurrentSort}`)).toBeInTheDocument();
    expect(screen.queryByRole('list')).toBeInTheDocument();
  });

  it('should called onChangeSort when user click on sort', () => {
    render(
      <OfferSortList currentSort={fakeCurrentSort} onChangeSort={fakeOnChangeSort} />);

    const listItems = screen.queryAllByRole('listitem');
    userEvent.click(listItems[0]);
    expect(fakeOnChangeSort).toBeCalled();
  });
});
