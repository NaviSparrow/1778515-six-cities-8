import {render, screen} from '@testing-library/react';
import FavoritesScreenEmpty from './favorites-screen-empty';

describe('Component: FavoritesScreenEmpty', () => {
  it('should render correctly', () => {
    render(
      <FavoritesScreenEmpty />);

    expect(screen.getByText(/Favorites/i)).toBeInTheDocument();
    expect(screen.getByText(/Nothing yet saved./i)).toBeInTheDocument();
    expect(screen.getByText(/Save properties to narrow down search or plan your future trips./i)).toBeInTheDocument();
  });
});
