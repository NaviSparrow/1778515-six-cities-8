import {BrowserRouter, Route, RouteComponentProps, Switch} from 'react-router-dom';
import MainScreen from '../main-screen/main-screen';
import AuthScreen from '../auth-screen/auth-screen';
import FavoritesScreen from '../favorites-screen/favorites-screen';
import PropertyScreen from '../property-screen/property-screen';
import NotFoundPage from '../not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';
import {AppRoute, AuthorizationStatus} from '../../const';
import {Offer} from '../../types/offer';

type AppScreenProps = {
  offersCount: number;
  offers: Offer[];
}

function App({offersCount, offers}: AppScreenProps): JSX.Element {

  return(
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.Root}>
          <MainScreen offersCount={offersCount} offers={offers} />;
        </Route>
        <Route exact path={AppRoute.Auth}>
          <AuthScreen />
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.Favorites}
          render={() => <FavoritesScreen offers={offers} />}
          authorizationStatus={AuthorizationStatus.Auth}
        >
        </PrivateRoute>
        <Route
          exact
          path={'/offer/:id'}
          render={(routeProps: RouteComponentProps<{id: string}>) => {
            const id =  routeProps.match.params.id;
            const offer = offers.find((item) => item.id === parseInt(id, 10));
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

export default App;
