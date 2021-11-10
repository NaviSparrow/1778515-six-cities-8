import {Redirect, Route, RouteProps} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import {State} from '../../types/state';
import {connect, ConnectedProps} from 'react-redux';
import {History} from 'history';
import {getAuthorizationStatus} from '../../store/user-process/selectors';

type RenderFuncProps = {
  history: History<unknown>;
}

type PrivatRouteProps = RouteProps & {
  render: (props: RenderFuncProps) => JSX.Element;
  authorizationStatus: AuthorizationStatus;
}

const mapStateToProps = (state:State) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & PrivatRouteProps;

function PrivateRoute(props: ConnectedComponentProps): JSX.Element {
  const {exact, path, render, authorizationStatus} = props;
  return (
    <Route
      exact={exact}
      path={path}
      render={(routeProps) => (
        authorizationStatus === AuthorizationStatus.Auth
          ? render(routeProps)
          : <Redirect to={AppRoute.Auth} />
      )}
    />
  );
}

export {PrivateRoute};
export default connector(PrivateRoute);
