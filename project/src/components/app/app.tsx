import {BrowserRouter, Route, Switch, useParams} from 'react-router-dom';
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
  const { id } = useParams<{id: string}>();
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
        <Route exact path={'/offer/:id'}>
          render={() => {
            const offer = offers.find((item) => item.id === parseInt(id, 10));
            if (offer === undefined) {
              return <NotFoundPage/>;
            }
            return <PropertyScreen offer={offer} />;
          }}
        </Route>
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
