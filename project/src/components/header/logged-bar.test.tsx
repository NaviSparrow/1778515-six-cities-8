import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import LoggedBar from './logged-bar';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import * as Redux from 'react-redux';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Component: LoggedBar', () => {
  it('should render correctly', () => {
    const store = mockStore({});
    render(
      <Provider store={store}>
        <Router history={history}>
          <LoggedBar/>
        </Router>
      </Provider>);

    expect(screen.queryAllByRole('listitem').length).toBe(2);
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
    expect(screen.getAllByRole('link').length).toBe(2);
  });

  it('should call useDispatch', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore({});
    render(
      <Provider store={store}>
        <Router history={history}>
          <LoggedBar/>
        </Router>
      </Provider>);

    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/Sign out/i));
    expect(useDispatch).toBeCalledTimes(1);
    expect(dispatch).toBeCalledTimes(1);
  });
});
