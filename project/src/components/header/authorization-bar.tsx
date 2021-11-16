import {useSelector} from 'react-redux';
import {AuthorizationStatus} from '../../const';
import LoggedBar from './logged-bar';
import NotLoggedBar from './not-logged-bar';
import React from 'react';
import {getAuthorizationStatus} from '../../store/user-process/selectors';

function AuthorizationBar(): JSX.Element {
  const authorizationStatus = useSelector(getAuthorizationStatus);
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

export default AuthorizationBar;
