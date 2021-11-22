import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import NotLoggedBar from './not-logged-bar';


const history = createMemoryHistory();

describe('Component: NotLoggedBar', () => {
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <NotLoggedBar/>
      </Router>);

    expect(screen.queryAllByRole('listitem').length).toBe(1);
    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });
});
