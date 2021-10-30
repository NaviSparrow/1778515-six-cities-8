import {BrowserRouter, Route, RouteComponentProps, Switch} from 'react-router-dom';
import {connect, ConnectedProps} from 'react-redux';
import MainScreen from '../main-screen/main-screen';
import AuthScreen from '../auth-screen/auth-screen';
import FavoritesScreen from '../favorites-screen/favorites-screen';
import PropertyScreen from '../property-screen/property-screen';
import NotFoundPage from '../not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';
import {AppRoute, AuthorizationStatus} from '../../const';
import {State} from '../../types/state';
<<<<<<< HEAD
import Spinner from '../spinner/spinner';

const mapStateToProps = ({offerList, authorizationStatus, isDataLoaded}: State) => ({
=======
import LoadingSpinner from '../loading-spinner/loading-spinner';

const mapStateToProps = ({offersList, authorizationStatus, isDataLoaded}: State) => ({
>>>>>>> 28163bb69472de78fdc1292089fd6a1404829d37
  offerList,
  authorizationStatus,
  isDataLoaded,
});


const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const isCheckedAuth = (authorizationStatus: AuthorizationStatus): boolean =>
  authorizationStatus === AuthorizationStatus.Unknown;

function App(props: PropsFromRedux): JSX.Element {
  const {offerList, authorizationStatus, isDataLoaded} = props;
  if (isCheckedAuth(authorizationStatus) || !isDataLoaded) {
    return (
<<<<<<< HEAD
      <Spinner />
=======
      <LoadingSpinner />
>>>>>>> 28163bb69472de78fdc1292089fd6a1404829d37
    );
  }
  return(
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.Root}>
          <MainScreen />;
        </Route>
        <Route exact path={AppRoute.Auth}>
          <AuthScreen />
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.Favorites}
          render={() => <FavoritesScreen />}
          authorizationStatus={AuthorizationStatus.Auth}
        >
        </PrivateRoute>
        <Route
          exact
          path={'/offer/:id'}
          render={(routeProps: RouteComponentProps<{id: string}>) => {
            const id =  routeProps.match.params.id;
            const offer = offerList?.find((item) => item.id === parseInt(id, 10));
            if (offer === undefined) {
              return <NotFoundPage />;
            }
            return (
              <PropertyScreen
                offer={offer}
                onSubmit={() => {
                  throw new Error('Function \'onSubmit\' isn\'t implemented.');
                }}
              />
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
export {App};
export default connector(App);
