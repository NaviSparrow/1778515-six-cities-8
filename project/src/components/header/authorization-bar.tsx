import {State} from '../../types/state';
import {connect, ConnectedProps} from 'react-redux';
import {AuthorizationStatus} from '../../const';
import LoggedBar from './logged-bar';
import NotLoggedBar from './not-logged-bar';
import React from 'react';
import {getAuthorizationStatus} from '../../store/user-process/selectors';

const mapStateToProps = (state: State) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function AuthorizationBar(props: PropsFromRedux): JSX.Element {
  const {authorizationStatus} = props;
  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        {authorizationStatus === AuthorizationStatus.Auth
          ? <LoggedBar />
          : <NotLoggedBar />}
      </ul>
    </nav>
  );
}

export {AuthorizationBar};
export default connector(AuthorizationBar);
