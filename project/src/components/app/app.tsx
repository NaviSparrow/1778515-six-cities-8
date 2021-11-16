import {Route, RouteComponentProps, Switch, Router as BrowserRouter} from 'react-router-dom';
import {useSelector} from 'react-redux';
import MainScreen from '../main-screen/main-screen';
import AuthScreen from '../auth-screen/auth-screen';
import FavoritesScreen from '../favorites-screen/favorites-screen';
import PropertyScreen from '../property-screen/property-screen';
import NotFoundPage from '../not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';
import {AppRoute, AuthorizationStatus} from '../../const';
import Spinner from '../spinner/spinner';
import browserHistory from '../../browser-history/browser-history';
import {getLoadedDataStatus, getOfferList} from '../../store/main-data/selectors';
import {getAuthorizationStatus} from '../../store/user-process/selectors';

const isCheckedAuth = (authorizationStatus: AuthorizationStatus): boolean =>
  authorizationStatus === AuthorizationStatus.Unknown;

function App(): JSX.Element {
  const offerList = useSelector(getOfferList);
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const isDataLoaded = useSelector(getLoadedDataStatus);
  if (isCheckedAuth(authorizationStatus) || !isDataLoaded) {
    return (
      <Spinner />
    );
  }
  return(
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path={AppRoute.Root}>
          <MainScreen />;
        </Route>
        <Route
          exact
          path={AppRoute.Auth}
          render={({history}) => (
            <AuthScreen
              onRandomCityClick={() => history.push(AppRoute.Root)}
            />
          )}
        >
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.Favorites}
          render={() => (
            <FavoritesScreen />
          )}
        >
        </PrivateRoute>
        <Route
          exact
          path={'/offer/:id'}
          render={(routeProps: RouteComponentProps<{id: string}>) => {
            const id: number =  parseInt(routeProps.match.params.id, 10);
            const offer = offerList?.find((item) => item.id === id);
            if (offer === undefined) {
              return <NotFoundPage />;
            }
            return (
              <PropertyScreen offer={offer} id={id} />
            );
          }}
        >
        </Route>
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
