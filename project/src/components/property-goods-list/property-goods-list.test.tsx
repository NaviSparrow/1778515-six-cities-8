import {render, screen} from '@testing-library/react';
import PropertyGoodsList from './property-goods-list';
import {datatype} from 'faker';

const fakeGoods = new Array(5).fill(null).map(() => datatype.string(4));

describe('Component: PropertyGoodsList',() => {
  it('should render correctly', () => {
    render(
      <PropertyGoodsList goods={fakeGoods} />);

    expect(screen.queryByRole('list')).toBeInTheDocument();
  });
});
