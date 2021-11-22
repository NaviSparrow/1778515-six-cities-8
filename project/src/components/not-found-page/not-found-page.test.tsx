import {render, screen} from '@testing-library/react';
import NotFoundPage from './not-found-page';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';

const history = createMemoryHistory();

describe('Component: NotFoundPage', () => {
  it('should render correctly',  () => {
    render(
      <Router history={history}>
        <NotFoundPage />
      </Router>);

    expect(screen.getByAltText(/6 cities logo/i)).toBeInTheDocument();
    expect(screen.getAllByRole('link').length).toBe(2);
    expect(screen.getByText(/404. Page not found/i)).toBeInTheDocument();
    expect(screen.getByText(/Вернуться на главную/i)).toBeInTheDocument();
  });
});
